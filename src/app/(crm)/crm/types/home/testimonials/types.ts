export interface Testimonial {
  id: number;
  name: string;
  nameHindi: string;
  role: string;
  roleHindi: string;
  image: string;
  quote: string;
  quoteHindi: string;
  location: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}
