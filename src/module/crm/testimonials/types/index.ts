export interface Testimonial {
  id: number;
  name: string;
  content: string;
  image?: string;
  created_at?: string;
}

export interface TestimonialFormData {
  name: string;
  content: string;
  image?: File | null;
}
