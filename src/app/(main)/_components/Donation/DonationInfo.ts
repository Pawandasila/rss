export interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface QRCodeInfo {
  image: string;
  alt: string;
  description: string;
}

export interface DonationData {
  title: string;
  description: string;
  qrCode: QRCodeInfo;
  bankDetails: BankDetails;
}

export const donationData: DonationData = {
  title: "राष्ट्र निर्माण में सहयोग करें",
  description: "राष्ट्रीय सेवा संघ के सेवा कार्यों में आपका योगदान अमूल्य है। कृपया नीचे दिए गए QR कोड को स्कैन करें या सीधे बैंक खाते में दान करें।",
  qrCode: {
    image: "https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-19-at-10.33.23-PM.jpeg",
    alt: "दान हेतु QR कोड",
    description: "📲 स्कैन करें और दान करें"
  },
  bankDetails: {
    accountName: "Rashtriya Seva Sangh",
    bankName: "Uttarakhand Gramin Bank",
    accountNumber: "76032104282",
    ifscCode: "SBIN0RRUTGB"
  }
};