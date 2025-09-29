export interface DonationTickerRecord {
  id: string;
  donorName: string;
  amount: number;
  currency: string;
  location: string;
  state: string;
  donationDate: string;
  paymentMode: 'Online' | 'Bank Transfer' | 'Cash' | 'UPI' | 'Cheque' | 'Card';
  timeAgo: string;
  isAnonymous: boolean;
  message?: string;
}

export const tickerDonations: DonationTickerRecord[] = [
  {
    id: "TK001",
    donorName: "Nand Kishore Sharma",
    amount: 151,
    currency: "₹",
    location: "नई दिल्ली",
    state: "Delhi",
    donationDate: "2024-12-15",
    paymentMode: "UPI",
    timeAgo: "2 मिनट पहले",
    isAnonymous: false,
    message: "राष्ट्र सेवा हेतु"
  },
  {
    id: "TK002",
    donorName: "Ramdeb Singh",
    amount: 100,
    currency: "₹",
    location: "लखनऊ",
    state: "Uttar Pradesh",
    donationDate: "2024-12-15",
    paymentMode: "Online",
    timeAgo: "5 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK003",
    donorName: "Sushil Kumar Choudhary",
    amount: 151,
    currency: "₹",
    location: "जयपुर",
    state: "Rajasthan",
    donationDate: "2024-12-15",
    paymentMode: "Bank Transfer",
    timeAgo: "8 मिनट पहले",
    isAnonymous: false,
    message: "धर्म रक्षार्थ"
  },
  {
    id: "TK004",
    donorName: "Jaipal Singh Dasila",
    amount: 101,
    currency: "₹",
    location: "चंडीगढ़",
    state: "Chandigarh",
    donationDate: "2024-12-15",
    paymentMode: "UPI",
    timeAgo: "12 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK005",
    donorName: "Suryakant Vyas",
    amount: 21,
    currency: "₹",
    location: "अहमदाबाद",
    state: "Gujarat",
    donationDate: "2024-12-15",
    paymentMode: "Card",
    timeAgo: "15 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK006",
    donorName: "Soumya Prakash Dash",
    amount: 100,
    currency: "₹",
    location: "भुवनेश्वर",
    state: "Odisha",
    donationDate: "2024-12-15",
    paymentMode: "Online",
    timeAgo: "18 मिनट पहले",
    isAnonymous: false,
    message: "गौ सेवा हेतु"
  },
  {
    id: "TK007",
    donorName: "Priya Sharma",
    amount: 251,
    currency: "₹",
    location: "मुंबई",
    state: "Maharashtra",
    donationDate: "2024-12-15",
    paymentMode: "UPI",
    timeAgo: "22 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK008",
    donorName: "Amit Kumar Singh",
    amount: 501,
    currency: "₹",
    location: "पटना",
    state: "Bihar",
    donationDate: "2024-12-15",
    paymentMode: "Bank Transfer",
    timeAgo: "25 मिनट पहले",
    isAnonymous: false,
    message: "शिक्षा सेवा हेतु"
  },
  {
    id: "TK009",
    donorName: "Ravi Patel",
    amount: 201,
    currency: "₹",
    location: "सूरत",
    state: "Gujarat",
    donationDate: "2024-12-15",
    paymentMode: "Online",
    timeAgo: "28 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK010",
    donorName: "Deepak Agarwal",
    amount: 151,
    currency: "₹",
    location: "इंदौर",
    state: "Madhya Pradesh",
    donationDate: "2024-12-15",
    paymentMode: "UPI",
    timeAgo: "32 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK011",
    donorName: "Anita Verma",
    amount: 301,
    currency: "₹",
    location: "कोलकाता",
    state: "West Bengal",
    donationDate: "2024-12-15",
    paymentMode: "Card",
    timeAgo: "35 मिनट पहले",
    isAnonymous: false,
    message: "स्वास्थ्य सेवा हेतु"
  },
  {
    id: "TK012",
    donorName: "Vikash Gupta",
    amount: 101,
    currency: "₹",
    location: "कानपुर",
    state: "Uttar Pradesh",
    donationDate: "2024-12-15",
    paymentMode: "Online",
    timeAgo: "38 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK013",
    donorName: "Sunita Devi",
    amount: 251,
    currency: "₹",
    location: "रांची",
    state: "Jharkhand",
    donationDate: "2024-12-15",
    paymentMode: "UPI",
    timeAgo: "42 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK014",
    donorName: "Rajesh Jain",
    amount: 501,
    currency: "₹",
    location: "नागपुर",
    state: "Maharashtra",
    donationDate: "2024-12-15",
    paymentMode: "Bank Transfer",
    timeAgo: "45 मिनट पहले",
    isAnonymous: false,
    message: "धार्मिक कार्यों हेतु"
  },
  {
    id: "TK015",
    donorName: "Meera Shah",
    amount: 201,
    currency: "₹",
    location: "वडोदरा",
    state: "Gujarat",
    donationDate: "2024-12-15",
    paymentMode: "Online",
    timeAgo: "48 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK016",
    donorName: "Gopal Krishna",
    amount: 151,
    currency: "₹",
    location: "भोपाल",
    state: "Madhya Pradesh",
    donationDate: "2024-12-15",
    paymentMode: "UPI",
    timeAgo: "52 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK017",
    donorName: "Kavita Agarwal",
    amount: 301,
    currency: "₹",
    location: "पुणे",
    state: "Maharashtra",
    donationDate: "2024-12-15",
    paymentMode: "Card",
    timeAgo: "55 मिनट पहले",
    isAnonymous: false,
    message: "बच्चों की शिक्षा हेतु"
  },
  {
    id: "TK018",
    donorName: "Harish Sharma",
    amount: 101,
    currency: "₹",
    location: "देहरादून",
    state: "Uttarakhand",
    donationDate: "2024-12-15",
    paymentMode: "Online",
    timeAgo: "58 मिनट पहले",
    isAnonymous: false
  },
  {
    id: "TK019",
    donorName: "Rakesh Yadav",
    amount: 251,
    currency: "₹",
    location: "लुधियाना",
    state: "Punjab",
    donationDate: "2024-12-15",
    paymentMode: "UPI",
    timeAgo: "1 घंटा पहले",
    isAnonymous: false
  },
  {
    id: "TK020",
    donorName: "Anjali Singh",
    amount: 501,
    currency: "₹",
    location: "हैदराबाद",
    state: "Telangana",
    donationDate: "2024-12-15",
    paymentMode: "Bank Transfer",
    timeAgo: "1 घंटा 5 मिनट पहले",
    isAnonymous: false,
    message: "सामाजिक सेवा हेतु"
  }
];


export const createInfiniteScrollArray = (baseArray: DonationTickerRecord[]): DonationTickerRecord[] => {
  
  return [...baseArray, ...baseArray, ...baseArray];
};


export const formatTickerAmount = (amount: number, currency: string = "₹"): string => {
  return `${currency} ${amount.toLocaleString('en-IN')}`;
};


export const getPaymentModeIcon = (mode: string): string => {
  const icons = {
    'Online': '💻',
    'UPI': '📱',
    'Bank Transfer': '🏦',
    'Card': '💳',
    'Cash': '💵',
    'Cheque': '📝'
  };
  return icons[mode as keyof typeof icons] || '💰';
};


export const tickerConfig = {
  scrollSpeed: 30, 
  pauseOnHover: true,
  showItems: 6, 
  itemHeight: 80, 
};


export const liveStats = {
  totalDonationsToday: 156,
  totalAmountToday: 45678,
  activeDonors: 89,
  lastUpdate: "अभी अभी अपडेट हुआ"
};