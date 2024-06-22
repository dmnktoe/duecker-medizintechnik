interface FileAttributes {
  name: string;
  size: number;
  url: string;
  mime: string;
}

interface File {
  id: number;
  attributes: FileAttributes;
}

interface CategoryAttributes {
  name: string;
}

interface Category {
  id: number;
  attributes: CategoryAttributes;
}

interface DocumentAttributes {
  name: string;
  files: {
    data: File[];
  };
  category: {
    data: Category;
  };
}

export interface Download {
  id: number;
  attributes: DocumentAttributes;
}

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
