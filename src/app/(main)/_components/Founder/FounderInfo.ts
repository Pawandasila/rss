export interface Member {
  id: number;
  name: string;
  designation: string;
  photo: string;
  quote?: string;
}

export interface FounderData {
  greeting: string;
  orgName: string;
  description: string;
  objective: string;
  quote: string;
  callToAction: string;
  members: Member[];
}

export const founderInfo: FounderData = {
  greeting: "🚩 वंदे मातरम्!",
  orgName: "राष्ट्रीय सेवा संघ",
  description: "भारत के हर नागरिक तक सेवा पहुँचाने, धर्म और संस्कृति की रक्षा करने के लिए समर्पित है।",
  objective: "राष्ट्रभावना, सेवा और एकता को मजबूत करना, और युवा शक्ति को राष्ट्र निर्माण में जोड़ना।",
  quote: "राष्ट्र प्रथम की भावना से ही भारत सशक्त और आत्मनिर्भर बनेगा।",
  callToAction: "आप भी इस पवित्र यात्रा में शामिल हों और सेवा के माध्यम से समाज को सशक्त बनाएं।",
  members: [
    {
      id: 1,
      name: "हिमांशु जोशी",
      designation: "संस्थापक, राष्ट्रीय अध्यक्ष",
      photo: "https://joinrss.org.in/wp-content/uploads/2025/07/Picsart_25-07-21_14-58-16-109-scaled.jpg",
      quote: "राष्ट्र प्रथम की भावना से ही भारत सशक्त और आत्मनिर्भर बनेगा।"
    },
    {
      id: 2,
      name: "राज कुमार",
      designation: "उपाध्यक्ष",
      photo: "https://joinrss.org.in/wp-content/uploads/2025/07/Picsart_25-07-21_14-58-16-109-scaled.jpg",
      quote: "सेवा ही सच्ची भक्ति है।"
    },
    {
      id: 3,
      name: "विक्रम सिंह",
      designation: "महासचिव",
      photo: "https://joinrss.org.in/wp-content/uploads/2025/07/Picsart_25-07-21_14-58-16-109-scaled.jpg",
      quote: "संगठन में ही शक्ति है।"
    },
    {
      id: 4,
      name: "अनिता शर्मा",
      designation: "महिला प्रभारी",
      photo: "https://joinrss.org.in/wp-content/uploads/2025/07/Picsart_25-07-21_14-58-16-109-scaled.jpg",
      quote: "नारी शक्ति से ही राष्ट्र शक्ति।"
    }
  ]
};