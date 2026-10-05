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

export interface NewsImageBlock {
  type: "image";
  url: string;
  width?: number;
  height?: number;
  caption?: string | null;
  altText?: string | null;
  copyrightHolder?: string | null;
}

export interface NewsTextBlock {
  type: "text";
  text: string;
}

export type NewsBodyBlock = NewsImageBlock | NewsTextBlock;

export interface NewsByline {
  name: string;
  role?: string | null;
}

export interface NewsTopic {
  id: string;
  name: string;
}

export interface NewsDetailsProps {
  id: string;
  title: string;
  description: {
    blocks: unknown[];
  };
  link: string;
  imageUrl: string;
  imageAlt?: string;
  category?: string;
  type?: string;
  isLive?: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
  sourceUrl: string;
  body: NewsBodyBlock[];
  byline: NewsByline[];
  tags: string[];
  text: string;
  topics: NewsTopic[];
  wordCount: number;
}
