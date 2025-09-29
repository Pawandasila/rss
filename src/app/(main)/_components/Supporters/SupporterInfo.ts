export interface SupporterInfo {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
}


export const supporterImages: SupporterInfo[] = [
  {
    id: 1,
    name: "Supporter 1",
    imageUrl: "https://joinrss.org.in/wp-content/uploads/2025/06/images-2.png",
    alt: "RSS Supporter"
  },
  {
    id: 2,
    name: "Supporter 2", 
    imageUrl: "https://joinrss.org.in/wp-content/uploads/2025/06/Picsart_25-06-21_23-35-59-409-1-scaled.jpg",
    alt: "RSS Supporter"
  },
  {
    id: 3,
    name: "Supporter 3",
    imageUrl: "https://joinrss.org.in/wp-content/uploads/2025/06/images.png", 
    alt: "RSS Supporter"
  },
  {
    id: 4,
    name: "Supporter 4",
    imageUrl: "https://joinrss.org.in/wp-content/uploads/2025/06/images-1.png",
    alt: "RSS Supporter"
  },
  {
    id: 5,
    name: "Supporter 5",
    imageUrl: "https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-26-at-6.20.21-PM-scaled.jpeg",
    alt: "RSS Supporter"
  },
  {
    id: 6,
    name: "Supporter 6",
    imageUrl: "https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-7.54.30-PM-1-scaled.jpeg",
    alt: "RSS Supporter"
  },
  {
    id: 7,
    name: "Supporter 7", 
    imageUrl: "https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-7.54.30-PM-scaled.jpeg",
    alt: "RSS Supporter"
  }
];


export const supporterRows = {
  row1: supporterImages.slice(0, Math.ceil(supporterImages.length / 3)),
  row2: supporterImages.slice(Math.ceil(supporterImages.length / 3), Math.ceil(supporterImages.length * 2 / 3)),
  row3: supporterImages.slice(Math.ceil(supporterImages.length * 2 / 3))
};
