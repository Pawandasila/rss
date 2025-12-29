export interface PressCoverage {
  id: number;
  title: string;
  link: string;
  image: string | null;
  description: string; // Used in lists, or fallback
  published_at: string;
  images?: PressImage[];
  press_content?: PressContent;
}

export interface PressImage {
  id: number;
  press: number;
  image: string;
}

export interface PressContent {
  id: number;
  press: number;
  content: string;
}

export interface PressCoverageFormData {
  title: string;
  link: string;
  description: string;
  published_at: string;
  image: File | null;
}
