export interface iStrip {
  id: number;
  uri: string;
  dimensions: {
    width: number,
    height: number,
  }
  goComicsUrl: string;
  description: string;
  hasDescription: boolean;
  publishedDate: Date;
};