export interface NewsProps {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

export interface NewsSectionProps {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: NewsProps[];
}

export interface NewsResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  data: NewsSectionProps[];
}
