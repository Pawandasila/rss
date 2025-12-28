import {
  LucideIcon,
  Home,
  Users,
  UserPlus,
  Heart,
  Newspaper,
  Target,
  Award,
  FileText,
  Users2,
  LogIn,
  UserCheck,
  BookOpen,
  Camera,
  Edit3,
  PhoneCall,
  Layout,
  MessageSquare,
  Scale,
  HeartHandshake,
  Store,
  Download,
  Book,
  Image as ImageIcon,
  Video,
  MapPin,
  Mail,
  Shield,
  Info,
  Archive,
  Flag,
} from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  submenu?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    id: "home",
    title: "मुख्य पृष्ठ | Home",
    href: "/",
    icon: Home,
    description: "राष्ट्रीय सेवा संघ का मुख्य पृष्ठ",
  },
  {
    id: "about-us",
    title: "संगठन के बारे में | About Us",
    href: "/about-us",
    icon: Users,
    submenu: [
      {
        id: "who-we-are",
        title: "हमारा परिचय (Who We Are)",
        href: "/about-us",
        icon: Info,
      },
      {
        id: "ongoing-service",
        title: "निरंतर सेवाकार्य (Ongoing Service)",
        href: "/#our-work",
        icon: HeartHandshake,
      },
      {
        id: "core-objective",
        title: "मुख्य उद्देश्य (Core Objective)",
        href: "/divine-mission",
        icon: Target,
      },
      {
        id: "leadership",
        title: "संरक्षक एवं नेतृत्व (Leadership)",
        href: "/founders-team-members",
        icon: Users2,
      },
      {
        id: "constitution",
        title: "संविधान एवं सिद्धांत (Constitution & Principals)",
        href: "/constitution",
        icon: Shield,
      },
    ],
  },
  {
    id: "for-public",
    title: "जन सेवा | For Public",
    href: "#",
    icon: Layout,
    submenu: [
      {
        id: "become-member",
        title: "सदस्य बनें (Become Member)",
        href: "/become-member",
        icon: UserPlus,
      },
      {
        id: "register-complaint",
        title: "जनशिकायत दर्ज करें (Register Complaint)",
        href: "/shikayat",
        icon: MessageSquare,
      },
      {
        id: "janmat",
        title: "जनमत: आपकी आवाज़ (Janmat: Your Voice)",
        href: "/janmat",
        icon: Scale,
      },
      {
        id: "donate-now",
        title: "धर्मार्थ दान करें (Donate Now)",
        href: "/donate-now",
        icon: Heart,
      },
      {
        id: "vyapari-portal",
        title: "हिंदू व्यापारी पोर्टल (Hindu Vyapari Portal)",
        href: "/vyapari",
        icon: Store,
      },
    ],
  },
  {
    id: "for-members",
    title: "सदस्य क्षेत्र | For Members",
    href: "#",
    icon: UserPlus,
    submenu: [
      {
        id: "worker-login",
        title: "कार्यकर्ता लॉगिन (Worker Login)",
        href: "https://app.joinrss.org.in/login",
        icon: LogIn,
      },
      {
        id: "volunteer-reg",
        title: "पद के लिए आवेदन करें (Volunteer Registration)",
        href: "/become-member",
        icon: UserCheck,
      },
      {
        id: "contribution",
        title: "योगदान/दान (Contribution)",
        href: "/donate-now",
        icon: Heart,
      },
      {
        id: "e-store",
        title: "ई-स्टोर (E-Store)",
        href: "/e-store",
        icon: Store,
      },
      {
        id: "member-complaint",
        title: "जनशिकायत (Register Public Complaint)",
        href: "/shikayat",
        icon: MessageSquare,
      },
      {
        id: "business-reg",
        title: "व्यापारी पंजीकरण (Business Registration)",
        href: "/vyapari",
        icon: UserPlus,
      },
    ],
  },
  {
    id: "resources",
    title: "संसाधन | Download",
    href: "#",
    icon: Download,
    submenu: [
      {
        id: "media-kits",
        title: "प्रचार सामग्री (Media Kits)",
        href: "/resources/media-kits",
        icon: Archive,
      },
      {
        id: "scriptures",
        title: "पावन धर्म ग्रंथ (Sacred Scriptures)",
        href: "/resources/scriptures",
        icon: Book,
      },
      {
        id: "forms",
        title: "प्रपत्र (Forms)",
        href: "/resources/forms",
        icon: FileText,
      },
      {
        id: "brand-assets",
        title: "लोगो एवं वॉलपेपर (Brand Assets)",
        href: "/resources/brand-assets",
        icon: ImageIcon,
      },
    ],
  },
  {
    id: "news-updates",
    title: "समाचार | News & Updates",
    href: "/news",
    icon: Newspaper,
    submenu: [
      {
        id: "press-releases",
        title: "प्रेस विज्ञप्ति (Press Releases)",
        href: "/press",
        icon: BookOpen,
      },
      {
        id: "gallery",
        title: "मीडिया गैलरी (Events Gallery)",
        href: "/gallery",
        icon: Camera,
      },
      {
        id: "blogs",
        title: "ब्लॉग/लेख (Blogs)",
        href: "/blog",
        icon: Edit3,
      },
      {
        id: "media-coverage",
        title: "समाचार कवरेज (Media Coverage)",
        href: "/media-coverage",
        icon: Video,
      },
    ],
  },
  {
    id: "contact",
    title: "संपर्क | Contact Us",
    href: "/contact-us",
    icon: PhoneCall,
    submenu: [
      {
        id: "headquarters",
        title: "मुख्यालय (Headquarters)",
        href: "/contact-us#hq",
        icon: Flag,
      },
      {
        id: "branches",
        title: "शाखाएं (Local Units)",
        href: "/contact-us#branches",
        icon: MapPin,
      },
      {
        id: "feedback",
        title: "फीडबैक (Feedback/Inquiry)",
        href: "/contact-us#feedback",
        icon: Mail,
      },
    ],
  },
];
