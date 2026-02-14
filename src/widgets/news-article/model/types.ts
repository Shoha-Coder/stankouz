export type NewsItem = {
  id: number;
  title: string;
  date: string;
  href: string;
};

export type NewsArticle = {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string[];
  tags?: string[];
};
