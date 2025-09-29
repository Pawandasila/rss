export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  titleHindi: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/hero/hero-01.png",
    title: "Reviving Values, Rebuilding Bharat",
    titleHindi: "संस्कारों का पुनर्जागरण, भारत का पुनर्निर्माण",
    description: "Join us in our mission to restore traditional values and build a stronger nation through dedicated service.",
    ctaText: "Join Now",
    ctaLink: "https://app.joinrss.org.in/registration"
  },
  {
    id: 2,
    image: "/hero/hero-02.png",
    title: "A Call to Serve, A Duty to Rise",
    titleHindi: "सेवा का आह्वान, उत्थान का कर्तव्य",
    description: "Answer the call of service and be part of the movement that uplifts our society.",
    ctaText: "Donate Now",
    ctaLink: "https://app.joinrss.org.in/donate_now"
  },
  {
    id: 3,
    image: "/hero/hero-03.png", 
    title: "Building a Vedic Nation, Together",
    titleHindi: "वैदिक राष्ट्र का निर्माण, हम सबका संकल्प",
    description: "United in our vision to create a nation rooted in ancient wisdom and modern progress.",
    ctaText: "Join Now",
    ctaLink: "https://app.joinrss.org.in/registration"
  },
  {
    id: 4,
    image: "/hero/hero-04.png",
    title: "Bharat First. Dharma Forever.",
    titleHindi: "भारत सर्वोपरि, धर्म शाश्वत",
    description: "Putting our nation first while upholding the eternal principles of dharma.",
    ctaText: "Donate Now",
    ctaLink: "https://app.joinrss.org.in/donate_now"
  },
  {
    id: 5,
    image: "/hero/hero-05.png",
    title: "From Service to Sacrifice",
    titleHindi: "सेवा से समर्पण तक",
    description: "Your small contribution can make a significant impact on our mission of national service.",
    ctaText: "Support Us",
    ctaLink: "https://app.joinrss.org.in/donate_now"
  },
  {
    id: 6,
    image: "/hero/hero-06.png",
    title: "One Vow - A Vedic Bharat",
    titleHindi: "एक संकल्प - वैदिक भारत",
    description: "United by one sacred vow to build a nation rooted in Vedic principles and values.",
    ctaText: "Click Here",
    ctaLink: "https://app.joinrss.org.in/registration"
  },
  {
    id: 7,
    image: "/hero/hero-07.png",
    title: "Together We Are Strong",
    titleHindi: "हम साथ हैं, हम सक्षम हैं",
    description: "When we unite with shared purpose and determination, we become an unstoppable force for positive change.",
    ctaText: "Click Here",
    ctaLink: "https://app.joinrss.org.in/registration"
  }
];
