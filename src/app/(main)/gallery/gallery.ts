export interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  category: 'religious' | 'social' | 'community' | 'training' | 'events';
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
  category: 'event' | 'training' | 'ceremony' | 'community' | 'religious';
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
  { key: 'all', label: 'सभी फोटो', icon: '🖼️', description: 'सभी गैलरी छवियां' },
  { key: 'religious', label: 'धार्मिक', icon: '🕉️', description: 'धार्मिक गतिविधियां और समारोह' },
  { key: 'social', label: 'सामाजिक', icon: '👥', description: 'सामाजिक सेवा और कार्यक्रम' },
  { key: 'community', label: 'सामुदायिक', icon: '🏛️', description: 'सामुदायिक कार्यक्रम और सभाएं' },
  { key: 'training', label: 'प्रशिक्षण', icon: '📚', description: 'प्रशिक्षण और शिक्षा कार्यक्रम' },
  { key: 'events', label: 'कार्यक्रम', icon: '🎉', description: 'विशेष कार्यक्रम और उत्सव' }
];

export const videoCategories: VideoCategory[] = [
  { key: 'all', label: 'सभी वीडियो', icon: '🎬', description: 'सभी वीडियो संग्रह' },
  { key: 'event', label: 'कार्यक्रम', icon: '🎉', description: 'कार्यक्रम और उत्सव के वीडियो' },
  { key: 'training', label: 'प्रशिक्षण', icon: '📚', description: 'प्रशिक्षण और शिक्षा वीडियो' },
  { key: 'ceremony', label: 'समारोह', icon: '🎭', description: 'धार्मिक और सामाजिक समारोह' },
  { key: 'community', label: 'सामुदायिक', icon: '🏛️', description: 'सामुदायिक गतिविधियां' },
  { key: 'religious', label: 'धार्मिक', icon: '🕉️', description: 'धार्मिक गतिविधियां और पूजा' }
];

export const photosData: PhotoItem[] = [
  // Religious Category
  {
    id: 'rel-1',
    title: 'धार्मिक समारोह - सामुदायिक पूजा',
    caption: 'राष्ट्रीय सेवा संघ के सदस्यों द्वारा आयोजित धार्मिक समारोह में सामुदायिक भागीदारी का दृश्य',
    category: 'religious',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-3.03.53-PM-min-scaled.webp',
    alt: 'सामुदायिक धार्मिक समारोह में लोगों की भागीदारी',
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    location: 'मुख्य मंदिर परिसर',
    date: '2025-08-05'
  },
  {
    id: 'rel-2',
    title: 'पवित्र अनुष्ठान - हवन समारोह',
    caption: 'पारंपरिक हवन समारोह में सभी आयु वर्ग के लोगों की सहभागिता',
    category: 'religious',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-3.03.54-PM-1-scaled.webp',
    alt: 'हवन समारोह में सामुदायिक भागीदारी',
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    location: 'संस्थान मुख्यालय',
    date: '2025-08-05'
  },
  {
    id: 'rel-3',
    title: 'मंदिर दर्शन - आध्यात्मिक यात्रा',
    caption: 'संघ सदस्यों की मंदिर यात्रा और दर्शन का पावन अवसर',
    category: 'religious',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-06-at-1.21.25-PM-e1756385010760.webp',
    alt: 'मंदिर दर्शन करते हुए श्रद्धालु',
    width: 1600,
    height: 1200,
    aspectRatio: 1600 / 1200,
    location: 'स्थानीय मंदिर',
    date: '2025-08-06'
  },
  {
    id: 'rel-4',
    title: 'संध्या आरती - दैनिक उपासना',
    caption: 'दैनिक संध्या आरती में सामूहिक प्रार्थना का मंत्रमुग्ध कर देने वाला दृश्य',
    category: 'religious',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-6.28.14-PM.webp',
    alt: 'संध्या आरती में सामूहिक प्रार्थना',
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    location: 'प्रार्थना हॉल',
    date: '2025-08-05'
  },

  // Social Category
  {
    id: 'soc-1',
    title: 'रक्तदान शिविर - जीवनदान कार्यक्रम',
    caption: 'राष्ट्रीय सेवा संघ द्वारा आयोजित रक्तदान शिविर में स्वयंसेवकों का उत्साहजनक सहयोग',
    category: 'social',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-01-at-10.08.01-PM-scaled.jpeg',
    alt: 'रक्तदान शिविर में स्वयंसेवक और दानकर्ता',
    width: 1920,
    height: 1280,
    aspectRatio: 1920 / 1280,
    location: 'सामुदायिक केंद्र',
    date: '2025-08-01'
  },
  {
    id: 'soc-2',
    title: 'सामुदायिक भोज - एकता का प्रतीक',
    caption: 'सभी जाति-धर्म के लोगों के साथ मिलकर खाना खाने का सामूहिक कार्यक्रम',
    category: 'social',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-3.03.54-PM-scaled.webp',
    alt: 'सामुदायिक भोज में एक साथ बैठे लोग',
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    location: 'संघ भवन',
    date: '2025-08-05'
  },

  // Community Category
  {
    id: 'com-1',
    title: 'राष्ट्रीय झंडा फहराना - गणतंत्र दिवस',
    caption: 'गणतंत्र दिवस पर तिरंगा फहराने का गौरवशाली क्षण और राष्ट्रगान',
    category: 'community',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/06/Picsart_25-01-11_02-12-39-485.webp',
    alt: 'गणतंत्र दिवस पर तिरंगा फहराते हुए',
    width: 1600,
    height: 533,
    aspectRatio: 1600 / 533,
    location: 'मुख्य परेड मैदान',
    date: '2025-01-26'
  },
  {
    id: 'com-2',
    title: 'स्वच्छता अभियान - साफ भारत मिशन',
    caption: 'स्वच्छ भारत अभियान के तहत सामुदायिक सफाई कार्यक्रम में सक्रिय भागीदारी',
    category: 'community',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-9.01.44-PM.webp',
    alt: 'स्वच्छता अभियान में भाग लेते स्वयंसेवक',
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    location: 'स्थानीय इलाका',
    date: '2025-08-09'
  },

  // Training Category
  {
    id: 'tra-1',
    title: 'युवा प्रशिक्षण शिविर - चरित्र निर्माण',
    caption: 'युवाओं के चरित्र निर्माण और व्यक्तित्व विकास के लिए विशेष प्रशिक्षण कार्यक्रम',
    category: 'training',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/1000935059-1-scaled.jpg',
    alt: 'युवा प्रशिक्षण शिविर में प्रतिभागी',
    width: 1920,
    height: 1280,
    aspectRatio: 1920 / 1280,
    location: 'प्रशिक्षण केंद्र',
    date: '2025-07-30'
  },
  {
    id: 'tra-2',
    title: 'शारीरिक प्रशिक्षण - योग और व्यायाम',
    caption: 'दैनिक योग और शारीरिक व्यायाम के माध्यम से स्वास्थ्य संवर्धन कार्यक्रम',
    category: 'training',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-6.36.33-PM.webp',
    alt: 'योग और व्यायाम करते प्रतिभागी',
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    location: 'व्यायामशाला',
    date: '2025-08-05'
  },

  // Events Category
  {
    id: 'eve-1',
    title: 'वार्षिक सम्मेलन - राष्ट्रीय एकता',
    caption: 'राष्ट्रीय सेवा संघ का वार्षिक सम्मेलन जहां देशभर से प्रतिनिधि एकत्रित होते हैं',
    category: 'events',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/1000983530-1.jpg',
    alt: 'वार्षिक सम्मेलन में एकत्रित प्रतिनिधि',
    width: 1920,
    height: 1280,
    aspectRatio: 1920 / 1280,
    location: 'मुख्य सभागार',
    date: '2025-07-30'
  },
  {
    id: 'eve-2',
    title: 'सांस्कृतिक उत्सव - परंपरा संरक्षण',
    caption: 'भारतीय संस्कृति और परंपरा के संरक्षण हेतु आयोजित सांस्कृतिक कार्यक्रम',
    category: 'events',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-3.03.53-PM-scaled.webp',
    alt: 'सांस्कृतिक कार्यक्रम में प्रदर्शन',
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    location: 'सांस्कृतिक केंद्र',
    date: '2025-08-05'
  }
];

export const videosData: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'राष्ट्रीय सेवा संघ - वार्षिक सम्मेलन 2025',
    description: 'RSS की वार्षिक गतिविधियों और उपलब्धियों का प्रदर्शन करने वाला सामुदायिक कार्यक्रम',
    caption: 'वार्षिक सम्मेलन में देशभर से आए प्रतिनिधियों का उत्साहजनक सहयोग और राष्ट्रीय एकता का प्रदर्शन',
    thumbnailUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/1000983530-1.jpg',
    videoUrl: 'https://www.youtube.com/embed/V4LKXYnsPS8',
    duration: '5:30',
    category: 'event',
    uploadDate: '2025-07-30',
    location: 'मुख्य सभागार, दिल्ली'
  },
  {
    id: 'vid-2',
    title: 'युवा प्रशिक्षण कार्यक्रम - चरित्र निर्माण',
    description: 'शिक्षा पहल - हमारे शैक्षणिक कार्यक्रमों के मुख्य क्षणों का संकलन',
    caption: 'युवाओं के व्यक्तित्व विकास और चरित्र निर्माण के लिए आयोजित विशेष प्रशिक्षण कार्यक्रम',
    thumbnailUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/1000935059-1-scaled.jpg',
    videoUrl: 'https://www.youtube.com/embed/0BeY2LfCaVM',
    duration: '8:15',
    category: 'training',
    uploadDate: '2025-07-30',
    location: 'प्रशिक्षण केंद्र'
  },
  {
    id: 'vid-3',
    title: 'धार्मिक समारोह - आध्यात्मिक गतिविधियां',
    description: 'धार्मिक समारोह प्रलेखन - आध्यात्मिक गतिविधियां और धार्मिक अनुष्ठान',
    caption: 'पारंपरिक धार्मिक अनुष्ठानों और आध्यात्मिक गतिविधियों का दिव्य संकलन',
    thumbnailUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-6.28.14-PM.webp',
    videoUrl: 'https://www.youtube.com/embed/6FUfr9Gp0bc',
    duration: '12:45',
    category: 'religious',
    uploadDate: '2025-08-05',
    location: 'मुख्य मंदिर परिसर'
  },
  {
    id: 'vid-4',
    title: 'सामुदायिक समारोह - पारंपरिक अनुष्ठान',
    description: 'सामुदायिक समारोह - पारंपरिक अनुष्ठान और सामुदायिक भागीदारी',
    caption: 'सामुदायिक एकजुटता और पारंपरिक मूल्यों का संरक्षण करने वाले समारोह का वृत्तांत',
    thumbnailUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-6.36.33-PM.webp',
    videoUrl: 'https://www.youtube.com/embed/3J1Os--UZ4w',
    duration: '6:20',
    category: 'ceremony',
    uploadDate: '2025-08-05',
    location: 'सामुदायिक केंद्र'
  },
  {
    id: 'vid-5',
    title: 'सांस्कृतिक उत्सव - विरासत उत्सव',
    description: 'सांस्कृतिक त्योहार के क्षण - हमारी समृद्ध विरासत और परंपराओं का उत्सव',
    caption: 'भारतीय संस्कृति की समृद्ध विरासत और पारंपरिक मूल्यों को संजोने वाला उत्सव',
    thumbnailUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-9.01.44-PM.webp',
    videoUrl: 'https://www.youtube.com/embed/KzJcrAx-l1c',
    duration: '7:45',
    category: 'event',
    uploadDate: '2025-08-09',
    location: 'सांस्कृतिक केंद्र'
  },
  {
    id: 'vid-6',
    title: 'सामाजिक सेवा - रक्तदान शिविर',
    description: 'जीवनदान कार्यक्रम - रक्तदान शिविर और स्वास्थ्य जागरूकता',
    caption: 'रक्तदान शिविर के माध्यम से समाज सेवा और जीवनदान का महान कार्य',
    thumbnailUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-01-at-10.08.01-PM-scaled.jpeg',
    videoUrl: 'https://www.youtube.com/embed/xyz123abc',
    duration: '4:30',
    category: 'community',
    uploadDate: '2025-08-01',
    location: 'स्वास्थ्य केंद्र'
  }
];

// Gallery page content
export const galleryPageContent = {
  title: 'फोटो और वीडियो गैलरी',
  subtitle: 'राष्ट्रीय सेवा संघ भारतवर्ष',
  description: 'हमारी गतिविधियों, समारोहों और सामुदायिक कार्यक्रमों की यादों का संकलन',
  heroImage: {
    url: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-05-at-3.03.54-PM-scaled.webp',
    alt: 'राष्ट्रीय सेवा संघ - सामुदायिक गतिविधियां'
  }
};

// Utility functions
export const getPhotosByCategory = (category: string): PhotoItem[] => {
  if (category === 'all') return photosData;
  return photosData.filter(photo => photo.category === category);
};

export const getVideosByCategory = (category: string): VideoItem[] => {
  if (category === 'all') return videosData;
  return videosData.filter(video => video.category === category);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('hi-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const formatDuration = (duration: string): string => {
  return duration;
};
