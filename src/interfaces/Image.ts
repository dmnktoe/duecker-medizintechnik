export interface Image {
  id: number;
  data: {
    attributes: {
      url: string;
      width: number;
      height: number;
      name: string;
    };
  };
}
