export interface PressCoverage {
  id: number;
  title: string;
  link: string;
  image: string | null;
  description: string;
  published_at: string;
}

export interface PressCoverageFormData {
  title: string;
  link: string;
  description: string;
  published_at: string;
  image: File | null;
}
