export interface ContactInfo {
  type: 'phone' | 'email' | 'address' | 'hours' | 'social';
  label: string;
  value: string;
  icon: string;
  link?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactData {
  contacts: ContactInfo[];
  socialLinks: SocialLink[];
}
