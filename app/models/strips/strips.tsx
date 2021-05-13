export interface iStrip {
  id: string;
  uri: string;
  dimensions: {
    width: number,
    height: number,
  }
  goComicsUrl: string;
  description: string;
  hasDescription: boolean;
  displayDate: string;
  publishedDate: {
    year: number,
    month: number,
    day: number
  }
};