export interface Post {
  id: number;
  attributes: {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}
