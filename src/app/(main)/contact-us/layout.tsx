import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'संपर्क करें | राष्ट्रीय सेवा संघ भारतवर्ष',
  description: 'राष्ट्रीय सेवा संघ भारतवर्ष से संपर्क करें। हमसे जुड़कर राष्ट्र सेवा में अपना योगदान दें। फोन, ईमेल या हमारे कार्यालयों में आकर हमसे मिलें।',
  keywords: 'RSS संपर्क, राष्ट्रीय सेवा संघ संपर्क, RSS कार्यालय, RSS फोन नंबर, RSS ईमेल',
  openGraph: {
    title: 'संपर्क करें | राष्ट्रीय सेवा संघ भारतवर्ष',
    description: 'राष्ट्रीय सेवा संघ भारतवर्ष से संपर्क करें और राष्ट्र सेवा में भागीदार बनें।',
    images: [
      {
        url: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-06-at-1.21.25-PM-e1756385010760.webp',
        width: 800,
        height: 600,
        alt: 'RSS Contact - Temple Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'संपर्क करें | राष्ट्रीय सेवा संघ भारतवर्ष',
    description: 'राष्ट्रीय सेवा संघ भारतवर्ष से संपर्क करें और राष्ट्र सेवा में भागीदार बनें।',
    images: ['https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-06-at-1.21.25-PM-e1756385010760.webp'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
