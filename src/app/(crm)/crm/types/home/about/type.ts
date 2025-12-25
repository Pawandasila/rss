export interface AboutData {
  title: string;
  subtitle: string;
  conclusion: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  content: {
    quote: string;
    description: string[];
    conclusion: string;
  };
}
