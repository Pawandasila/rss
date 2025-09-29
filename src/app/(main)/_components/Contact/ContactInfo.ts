export interface ContactInfo {
  type: 'phone' | 'email' | 'address' | 'hours' | 'social';
  label: string;
  value: string;
  icon: string;
  link?: string;
}

export const contactData: ContactInfo[] = [
  {
    type: 'phone',
    label: 'Phone Number',
    value: '+91 94296 93593',
    icon: '📞',
    link: 'tel:+919429693593'
  },
  {
    type: 'email',
    label: 'Email Address',
    value: 'help@joinrss.org.in',
    icon: '📧',
    link: 'mailto:help@joinrss.org.in'
  },
  {
    type: 'address',
    label: 'Delhi Office',
    value: 'D BLOCK, POCKET-5 (Flat No. 34), DDA Flat, CRPF Flat, Bawana, New Delhi – 110040',
    icon: '📍',
    link: 'https://maps.google.com/?q=D+BLOCK+POCKET-5+Flat+No+34+DDA+Flat+CRPF+Flat+Bawana+New+Delhi+110040'
  },
  {
    type: 'address',
    label: 'Uttarakhand Office',
    value: 'Bareilly–Nainital Road, Near Motahaldu Bus Stop, Haldwani, Nainital – 263139',
    icon: '📍',
    link: 'https://maps.google.com/?q=Bareilly+Nainital+Road+Near+Motahaldu+Bus+Stop+Haldwani+Nainital+263139'
  },
  {
    type: 'hours',
    label: 'Office Hours',
    value: 'Mon - Fri: 9:00 AM - 6:00 PM',
    icon: '🕒'
  }
];

export const socialLinks = [
  {
    platform: 'Facebook',
    url: 'https://facebook.com/joinrss',
    icon: '📘'
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/joinrss',
    icon: '🐦'
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/joinrss',
    icon: '📷'
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/joinrss',
    icon: '💼'
  }
];