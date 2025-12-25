export interface ImageGalleryItem {
  id: number;
  title: string;
  image: string;
  description?: string | null;
  uploaded_at: string;
}

export interface VideoGalleryItem {
  id: number;
  type: "url" | "file";
  title: string;
  video_file?: string | null;
  video_url?: string | null;
  description?: string | null;
  uploaded_at: string;
}

export interface BannerItem {
  id: number;
  title: string;
  image: string;
  content?: string | null;
  link?: string | null;
  is_active: boolean;
  uploaded_at: string;
}

export interface HolyBookItem {
  id: number;
  title: string;
  file: string;
  description?: string | null;
  uploaded_at: string;
}

export interface ImageGalleryFormData {
  title: string;
  image: File | string;
  description?: string;
}

export interface VideoGalleryFormData {
  type: "url" | "file";
  title: string;
  video_file?: File | string;
  video_url?: string;
  description?: string;
}

export interface BannerFormData {
  title: string;
  image: File | string;
  content?: string;
  link?: string;
  is_active: boolean;
}

export interface HolyBookFormData {
  title: string;
  file: File | string;
  description?: string;
}

export type ISODateString = string;
