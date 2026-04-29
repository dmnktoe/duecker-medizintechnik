/**
 * Public, frontend-friendly shape for a download item. Built from the raw
 * Directus collection by `mapDownload` in `@/lib/downloads`.
 */
export type DownloadFile = {
  id: string;
  title: string;
  /** Pre-formatted size, e.g. `"284 KB"`. */
  size: string;
  /** Public asset URL. */
  url: string;
  /** Lower-case file extension or mime suffix, e.g. `"pdf"`. */
  type: string;
};

export type Download = {
  id: number | string;
  name: string;
  category: {
    id: number | string;
    name: string;
    slug?: string | null;
  } | null;
  files: DownloadFile[];
};

export type CategorizedDownloads = {
  [categoryName: string]: {
    sectionTitle: string;
    items: {
      title: string;
      files: {
        title: string;
        size: string;
        url: string;
        type: string;
      }[];
    }[];
  };
};
