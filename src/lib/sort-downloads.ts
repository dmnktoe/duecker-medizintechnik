import type { CategorizedDownloads, Download } from '@/types/Download';

const UNCATEGORIZED_KEY = '__uncategorized';
const UNCATEGORIZED_LABEL = 'Sonstige';

export const sortDownloads = (
  documents: Download[] | null | undefined,
): CategorizedDownloads => {
  if (!documents?.length) return {};

  return documents.reduce((acc: CategorizedDownloads, document: Download) => {
    const categoryName = document.category?.name ?? UNCATEGORIZED_LABEL;
    const key = document.category?.name ?? UNCATEGORIZED_KEY;

    if (!acc[key]) {
      acc[key] = {
        sectionTitle: categoryName,
        items: [],
      };
    }

    acc[key].items.push({
      title: document.name,
      files: document.files.map((file) => ({
        title: file.title,
        size: file.size,
        url: file.url,
        type: file.type,
      })),
    });

    return acc;
  }, {});
};
