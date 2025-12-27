"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layout,
  Scroll,
  Users,
  Phone,
  Award,
  Target,
  Heart,
} from "lucide-react";
import HeroSectionManager from "./_components/HeroSectionManager";
import AboutSectionManager from "./_components/AboutSectionManager";
import RssOverviewSectionManager from "./_components/RssOverviewSectionManager";
import ContactSectionManager from "./_components/ContactSectionManager";
import TestimonialsSectionManager from "./_components/TestimonialsSectionManager";
import SupportersSectionManager from "./_components/SupportersSectionManager";
import { HeroSlide, HeroConfig } from "../types/home/hero/types";
import { AboutData } from "../types/home/about/type";
import { RSSOverviewData } from "../types/home/rss-overview/types";
import { ContactData } from "../types/home/contact/types";

import { SupportersData } from "../types/home/supporters/types";

interface SectionTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const HomeManagementPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: 1,
      image: "/hero/hero-01.png",
      title: "Reviving Values, Rebuilding Bharat",
      titleHindi: "संस्कारों का पुनर्जागरण, भारत का पुनर्निर्माण",
      description: "Join us in our mission to restore traditional values",
      ctaText: "Join Now",
      ctaLink: "#",
    },
  ]);

  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    badgeText: "For Dharma, For Nation, For Bharat!",
    titleLine1: "A Vedic Nation envisioned",
    titleLine2: "by Rashtriya Seva Sangh",
    subtitle: "धर्म से राष्ट्र, राष्ट्र से विश्व - यही वैदिक दृष्टि है।",
    paragraph:
      "Join us in our sacred mission to revive Sanatan values, strengthen national unity, and build a Vedic Nation rooted in Dharma, Service, and Culture.",
    stats: { members: "1Lakh+", states: "15+", projects: "50+" },
    ctaPrimaryText: "Join Now",
    ctaPrimaryLink: "/become-member",
    ctaSecondaryText: "Donate Now",
    ctaSecondaryLink: "/donate-now",
  });

  const [aboutData, setAboutData] = useState<AboutData>({
    title: "About Us",
    subtitle: "राष्ट्रीय सेवा संघ भारतवर्ष",

    conclusion: "हम सनातन की पुकार पर संगठित हुए हैं...",
    image: "/live/overview.jpg",
    ctaText: "Read More",
    ctaLink: "/about-us",
    content: {
      quote:
        '"धर्म की गरिमा, राष्ट्र की अखंडता और समाज की समरसता — यही हमारा पवित्र संकल्प है।"',
      description: [
        "राष्ट्रीय सेवा संघ भारतवर्ष कोई साधारण संगठन नहीं, बल्कि भारत की सनातन आत्मा का जीवंत रूप है। यह उन करोड़ों सनातनी भारतवासियों की आकांक्षाओं, पीड़ा और संकल्प का परिणाम है जो धर्म, संस्कृति और राष्ट्र की रक्षा के लिए आज भी तन-मन-धन से सक्रिय हैं।",
        "राष्ट्रीय सेवा संघ भारतवर्ष एक वैदिक सनातन धर्म पर आधारित राष्ट्रीय, धार्मिक एवं सांस्कृतिक संगठन है, जिसकी स्थापना 28 फरवरी 2024 (विक्रमी संवत 2081, फाल्गुन कृष्ण चतुर्थी) को भारतवर्ष के संत-महात्माओं एवं धर्मगुरुओं के आशीर्वाद से की गई। इस संघ की नींव उस पवित्र उद्देश्य के साथ रखी गई है, जिसमें भारत की सनातन परंपरा, सांस्कृतिक मूल्यों, और वैदिक जीवन पद्धति की पुनर्स्थापना को केंद्र में रखा गया है। हमारा विश्वास है कि पूर्वजों का संघर्ष, वर्तमान पीढ़ी का धर्माधिकार, और भावी पीढ़ियों का भविष्य – ये सभी केवल तभी सुरक्षित रह सकते हैं जब भारतवर्ष एक वैदिक, अखंड एवं आत्मनिर्भर राष्ट्र के रूप में जाग्रत हो। राष्ट्रीय सेवा संघ का प्रत्येक धर्म रक्षक, वेद और उपनिषदों में निहित सनातन सत्य को आत्मसात कर, भारतवर्ष की एकता, अखंडता और सांस्कृतिक गरिमा की रक्षा हेतु पूर्ण समर्पण भाव से सेवा कार्य में संलग्न है।",
        // "“हम संघर्षों से सीखे हैं, सेवा को जीवन बनाया है, और सनातन के लिए समर्पण को अपना धर्म।”"
      ],
      conclusion:
        "हम सनातन की पुकार पर संगठित हुए हैं, समाज की रक्षा के लिए प्रतिबद्ध हैं, और भारत की सांस्कृतिक धरोहर को सुरक्षित रखना ही हमारी सर्वोच्च साधना है।",
    },
  });

  const [rssOverviewData, setRssOverviewData] = useState<RSSOverviewData>({
    badgeText: "मूल सिद्धांत",
    mainTitle: "Core Values",
    mainSubtitle:
      "Discover How Our Values, Vision, and Mission Contribute to Nation Building.",
    tabs: [
      {
        id: "vision",
        title: "संकल्प",
        icon: "lotus",
        content:
          "राष्ट्रीय सेवा संघ का लक्ष्य धर्म और राष्ट्र के प्रति समर्पित नागरिक जीवन के माध्यम से एक सशक्त, समरस और अखंड भारत का निर्माण करना है।",
        points: [
          "धर्म और राष्ट्र के संगम से सशक्त, समरस, अखंड भारत का उदय।",
          "नागरिक जीवन को धर्म, सेवा और राष्ट्र के लिए पूर्णतः समर्पित करना।",
        ],
        image: "/live/overview.jpg",
      },
      {
        id: "mission",
        title: "उद्देश्य",
        icon: "flag",
        content:
          "राष्ट्रीय सेवा संघ का मिशन भारत को एक सशक्त, संगठित और समरस राष्ट्र के रूप में विकसित करना है।",
        points: [
          "भारतवर्ष को सशक्त, संगठित और समरस राष्ट्र के रूप में विकसित करना।",
          "प्रत्येक नागरिक को सत्य, धर्म, सेवा, त्याग और सहयोग जैसे सनातन सिद्धांतों से जोड़ना।",
        ],
        image: "/live/overview.jpg",
      },
      {
        id: "values",
        title: "मूल्य",
        icon: "dharma",
        content:
          "राष्ट्रीय सेवा संघ के मूल्य सनातन धर्म और राष्ट्र निर्माण की उच्चतम भावना से पोषित हैं।",
        points: [
          "धर्मनिष्ठा को जीवन का आधार मानना, हर कार्य ईश्वर और राष्ट्र के प्रति कर्तव्य भाव से करना।",
          "राष्ट्र सर्वोपरि की भावना के साथ कार्य करना, व्यक्तिगत हितों से ऊपर देश की उन्नति रखना।",
        ],
        image: "/live/overview.jpg",
      },
    ],
  });

  const [contactData, setContactData] = useState<ContactData>({
    contacts: [
      {
        type: "phone",
        label: "Phone Number",
        value: "+91 94296 93593",
        icon: "📞",
        link: "tel:+919429693593",
      },
      {
        type: "email",
        label: "Email Address",
        value: "help@joinrss.org.in",
        icon: "📧",
        link: "mailto:help@joinrss.org.in",
      },
    ],
    socialLinks: [
      {
        platform: "Facebook",
        url: "https://facebook.com/joinrss",
        icon: "📘",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/joinrss",
        icon: "🐦",
      },
    ],
  });

  const [supportersData, setSupportersData] = useState<SupportersData>({
    organizationName: "संगठन परिचय",
    mainSubtitle:
      "Explore Our Core Commitment to Service (Seva) and the Unbreakable Spirit of India.",
    videoInfo: {
      title: "संगठन परिचय वीडियो",
      duration: "अवधि: 2 मिनट 50 सेकंड",
      description: "हमारी यात्रा और दृष्टिकोण",
      videoSrc: "/live/video.mp4",
      posterSrc: "/hero/hero-01.png",
    },
    introSection: {
      title: "हमारा ध्येय: राष्ट्र निर्माण की नींव",
      description:
        "राष्ट्रीय सेवा संघ का लक्ष्य सेवा, समर्पण और राष्ट्रवाद के मूल सिद्धांतों के आधार पर एक मजबूत और समृद्ध वैदिक भारत का निर्माण करना है। हमारी कार्यप्रणाली संगठन,वैदिक शिक्षा और जमीनी सेवा के माध्यम से समाज के हर वर्ग को सशक्त बनाने पर केंद्रित है। हमारे उद्देश्यों, संचालन के तरीकों और भविष्य की विस्तृत योजनाओं को जानकर, आप समझ सकते हैं कि कैसे हम सभी मिलकर वैदिक राष्ट्र निर्माण की इस महान यात्रा को सफल बना सकते हैं।",
      joinButtonText: "Join Our Mission",
      learnMoreButtonText: "Learn More",
    },
    recognitionLogos: [
      {
        id: 1,
        name: "Government Recognition 1",
        imageUrl: "/logo/gov-01.png",
        alt: "RSS Supporter",
        order: 1,
      },
      {
        id: 2,
        name: "Government Recognition 2",
        imageUrl: "/logo/gov-02.jpg",
        alt: "RSS Supporter",
        order: 2,
      },
      {
        id: 3,
        name: "Government Recognition 3",
        imageUrl: "/logo/gov-03.png",
        alt: "RSS Supporter",
        order: 3,
      },
      {
        id: 4,
        name: "Government Recognition 4",
        imageUrl: "/logo/gov-04.png",
        alt: "RSS Supporter",
        order: 4,
      },
    ],
  });

  const sections: SectionTab[] = [
    // { id: "hero", label: "Hero Section", icon: <Layout className="w-4 h-4" /> },
    // {
    //   id: "about",
    //   label: "About Section",
    //   icon: <Scroll className="w-4 h-4" />,
    // },
    // {
    //   id: "rss-overview",
    //   label: "RSS Overview",
    //   icon: <Target className="w-4 h-4" />,
    // },
    // {
    //   id: "contact",
    //   label: "Contact Info",
    //   icon: <Phone className="w-4 h-4" />,
    // },
    // {
    //   id: "highlights",
    //   label: "Highlights",
    //   icon: <Award className="w-4 h-4" />
    // },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <Users className="w-4 h-4" />,
    },
    // {
    //   id: "supporters",
    //   label: "Supporters",
    //   icon: <Heart className="w-4 h-4" />,
    // },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Home Page Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all homepage sections - content, images, and settings
            </p>
          </div>
          <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm">
            All Changes Live
          </Badge>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              variant={activeSection === section.id ? "default" : "outline"}
              className={
                activeSection === section.id
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "hover:bg-gray-100"
              }
            >
              {section.icon}
              <span className="ml-2">{section.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {activeSection === "hero" && (
          <HeroSectionManager
            slides={heroSlides}
            setSlides={setHeroSlides}
            heroConfig={heroConfig}
            setHeroConfig={setHeroConfig}
          />
        )}

        {activeSection === "about" && (
          <AboutSectionManager data={aboutData} setData={setAboutData} />
        )}

        {activeSection === "rss-overview" && (
          <RssOverviewSectionManager
            data={rssOverviewData}
            setData={setRssOverviewData}
          />
        )}

        {activeSection === "contact" && (
          <ContactSectionManager data={contactData} setData={setContactData} />
        )}

        {activeSection === "testimonials" && <TestimonialsSectionManager />}

        {activeSection === "supporters" && (
          <SupportersSectionManager
            data={supportersData}
            setData={setSupportersData}
          />
        )}
      </div>
    </div>
  );
};

export default HomeManagementPage;
