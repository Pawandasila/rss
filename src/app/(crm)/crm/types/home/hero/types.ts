export interface HeroSlide {
  id: number;
  imageFile?: File | null;
  image?: string;
  imagePreview?: string;
  title: string;
  titleHindi: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface HeroConfig {
  badgeText: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  paragraph: string;
  stats: {
    members: string;
    states: string;
    projects: string;
  };
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}

export type HeroSlides = HeroSlide[];
