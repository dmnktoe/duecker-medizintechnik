import { strapiApiUrl } from '@/constant/env';

import { CategorizedDownloads, Download } from '@/types/Download';

export const sortDownloads = (
  documents: Download[] | null | undefined,
): CategorizedDownloads => {
  if (!documents?.length) return {};
  return documents.reduce((acc: CategorizedDownloads, document: Download) => {
    const categoryName = document.attributes.category.data.attributes.name;
    const fileData = document.attributes.files.data.map((file) => ({
      title: file.attributes.name,
      size: `${file.attributes.size} KB`,
      url: `${strapiApiUrl}${file.attributes.url}`,
      type: file.attributes.mime.split('/')[1],
    }));

    if (!acc[categoryName]) {
      acc[categoryName] = {
        sectionTitle: categoryName,
        items: [],
      };
    }

    acc[categoryName].items.push({
      title: document.attributes.name,
      files: fileData,
    });

    return acc;
  }, {});
};
