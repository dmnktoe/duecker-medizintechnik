interface File {
  url: string;
  title: string;
  size: string;
  type: string;
}

interface Item {
  title: string;
  files: File[];
}

export interface Download {
  sectionTitle: string;
  items: Item[];
}
