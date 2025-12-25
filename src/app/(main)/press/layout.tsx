import { Metadata } from "next";

export const metadata: Metadata = {
  title: "प्रेस कवरेज | राष्ट्रीय सेवा संघ",
  description:
    "राष्ट्रीय सेवा संघ की मीडिया कवरेज, समाचार पत्र लेख, पत्रिकाएं, पुरस्कार और मान्यताएं। हमारे समाज सेवा कार्यों और उपलब्धियों पर प्रेस रिपोर्ट।",
  keywords: [
    "RSS press",
    "राष्ट्रीय सेवा संघ प्रेस",
    "media coverage",
    "newspaper",
    "magazine",
    "awards",
    "recognition",
  ],
  openGraph: {
    title: "प्रेस कवरेज | राष्ट्रीय सेवा संघ",
    description:
      "राष्ट्रीय सेवा संघ की मीडिया कवरेज और पुरस्कारों के बारे में जानें",
    type: "website",
  },
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
