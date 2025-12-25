export interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  category: "religious" | "social" | "community" | "training" | "events";
  imageUrl: string;
  thumbnailUrl?: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: number;
  location?: string;
  date?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  caption: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: "event" | "training" | "ceremony" | "community" | "religious";
  uploadDate: string;
  location?: string;
}

export interface PhotoCategory {
  key: string;
  label: string;
  icon: string;
  description: string;
}

export interface VideoCategory {
  key: string;
  label: string;
  icon: string;
  description: string;
}

export const photoCategories: PhotoCategory[] = [
  {
    key: "all",
    label: "सभी फोटो",
    icon: "🖼️",
    description: "सभी गैलरी छवियां",
  },
  {
    key: "religious",
    label: "धार्मिक",
    icon: "🕉️",
    description: "धार्मिक गतिविधियां और समारोह",
  },
  {
    key: "social",
    label: "सामाजिक",
    icon: "👥",
    description: "सामाजिक सेवा और कार्यक्रम",
  },
  {
    key: "community",
    label: "सामुदायिक",
    icon: "🏛️",
    description: "सामुदायिक कार्यक्रम और सभाएं",
  },
  {
    key: "training",
    label: "प्रशिक्षण",
    icon: "📚",
    description: "प्रशिक्षण और शिक्षा कार्यक्रम",
  },
  {
    key: "events",
    label: "कार्यक्रम",
    icon: "🎉",
    description: "विशेष कार्यक्रम और उत्सव",
  },
];

export const videoCategories: VideoCategory[] = [
  {
    key: "all",
    label: "सभी वीडियो",
    icon: "🎬",
    description: "सभी वीडियो संग्रह",
  },
  {
    key: "event",
    label: "कार्यक्रम",
    icon: "🎉",
    description: "कार्यक्रम और उत्सव के वीडियो",
  },
  {
    key: "training",
    label: "प्रशिक्षण",
    icon: "📚",
    description: "प्रशिक्षण और शिक्षा वीडियो",
  },
  {
    key: "ceremony",
    label: "समारोह",
    icon: "🎭",
    description: "धार्मिक और सामाजिक समारोह",
  },
  {
    key: "community",
    label: "सामुदायिक",
    icon: "🏛️",
    description: "सामुदायिक गतिविधियां",
  },
  {
    key: "religious",
    label: "धार्मिक",
    icon: "🕉️",
    description: "धार्मिक गतिविधियां और पूजा",
  },
];

// Gallery page content
export const galleryPageContent = {
  title: "फोटो और वीडियो गैलरी",
  subtitle: "राष्ट्रीय सेवा संघ भारतवर्ष",
  description:
    "हमारी गतिविधियों, समारोहों और सामुदायिक कार्यक्रमों की यादों का संकलन",
  heroImage: {
    url: "/live/img-09.jpg",
    alt: "राष्ट्रीय सेवा संघ - सामुदायिक गतिविधियां",
  },
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("hi-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDuration = (duration: string): string => {
  return duration;
};
