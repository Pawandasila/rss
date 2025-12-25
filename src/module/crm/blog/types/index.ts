export interface Blog {
  id: number;
  title: string;
  headline?: string;
  timestamp: string;
  banner?: string;
  category?: string;
  author?: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  featured: boolean;
  images?: BlogImage[]; // Available in detail view
  content?: BlogContent; // Available in detail view
}

export interface BlogImage {
  id: number;
  blog: number;
  image: string;
}

export interface BlogContent {
  id: number;
  blog: number;
  content: string;
}

export interface CreateBlogPayload {
  title: string;
  headline?: string;
  banner?: File | null;
  category?: string;
  author?: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  featured?: boolean;
}

export interface CreateBlogContentPayload {
  blog: number;
  content: string;
}
