export interface Image {
  data: ImageAttribute;
}

interface ImageAttribute {
  url: string;
  width: number;
  height: number;
  name: string;
}
