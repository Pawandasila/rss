export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface OfficeInfo {
  location: string;
  address: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export const quickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Join Now",
    href: "https://app.joinrss.org.in/registration/join",
    external: true,
  },
  {
    label: "Donate",
    href: "https://app.joinrss.org.in/donate_now/donate",
    external: true,
  },
  { label: "Contact", href: "/contact" },
];

export const importantLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Press Releases", href: "/press" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

export const offices: OfficeInfo[] = [
  {
    location: "Delhi Office",
    address:
      "D BLOCK, POCKET-5 (Flat No. 34), DDA Flat, CRPF Flat, Bawana, New Delhi – 110040",
  },
  {
    location: "Uttarakhand Office",
    address:
      "Bareilly–Nainital Road, Near Motahaldu Bus Stop, Haldwani, Nainital – 263139",
  },
];

export const contactInfo = {
  phone: "+91 94296 93593",
  email: "help@joinrss.org.in",
};

export const socialLinks: SocialLink[] = [
  { platform: "Facebook", href: "https://facebook.com/joinrss", icon: "📘" },
  { platform: "Twitter", href: "https://twitter.com/joinrss", icon: "🐦" },
  { platform: "YouTube", href: "https://youtube.com/joinrss", icon: "📺" },
  { platform: "Instagram", href: "https://instagram.com/joinrss", icon: "📷" },
];

export const organizationInfo = {
  name: "Rashtriya Seva Sangh",
  tagline: "Nation First, Service is Duty, Sanatan is Life.",
  description:
    "Rashtriya Seva Sangh is a Sanatan-rooted, nation-devoted organization dedicated to the social, cultural, and spiritual upliftment of India. With a mission driven by service, values, education, women empowerment, cleanliness, and protection of Dharma and Gau Mata, we aim to build a stronger, united and awakened Bharat.",
  logo: "https://joinrss.org.in/wp-content/uploads/2025/06/cropped-rss-logo_page-0001.jpg",
  copyright: "© 2025 Rashtriya Seva Sangh | All Rights Reserved",
};
