"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  UserPlus,
  ArrowRight,
  Image as ImageIcon,
  Loader2,
  Calendar as CalendarIcon,
  Heart,
  IndianRupee,
  Gift,
  Shield,
  Lock,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { format } from "date-fns";
import heroImage from "@/assets/hero/01.jpeg";
import { useBanners } from "@/module/crm/gallery/hooks";
import { buildMediaUrl } from "@/lib/media";
import { useAuth } from "@/hooks/use-auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  useDonationPayment,
  useCurrency,
  type DonationFormData,
} from "@/module/donation";
import { useCountryApi } from "@/module/country/hooks";
import {
  StateSelect,
  DistrictSelect,
} from "@/module/country/components/country-select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DisplaySlide {
  id: number | string;
  title: string;
  content: string;
  image: string;
}

const impactAmounts = [
  { amount: 151, label: "₹151", desc: "भोजन दान" },
  { amount: 501, label: "₹501", desc: "सुरक्षा दान" },
  { amount: 1100, label: "₹1,100", desc: "यज्ञ सहयोग" },
  { amount: 5100, label: "₹5,100", desc: "विवाह सहयोग" },
];

const Hero = () => {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const { banners, loading } = useBanners();

  // Tab state
  const [activeTab, setActiveTab] = useState<"join" | "donate">("join");

  const displaySlides: DisplaySlide[] = useMemo(() => {
    if (!banners || banners.length === 0) return [];

    return banners
      .filter((b) => b.is_active)
      .map((b) => ({
        id: b.id,
        title: b.title,
        content: b.content || "",
        image: b.image || "",
      }));
  }, [banners]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Join form state
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: undefined as Date | undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Donation form state
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [donationForm, setDonationForm] = useState<DonationFormData>({
    name: "",
    email: "",
    phone: "",
    amount: 0,
    payment_for: "donation",
    notes: "",
    state: "",
    district: "",
    address: "",
  });

  const {
    processPayment,
    isProcessing,
    error: donationError,
    success: donationSuccess,
    currentStep,
    reset: resetDonation,
  } = useDonationPayment();
  const { formatCurrency } = useCurrency();
  const { states, fetchDistricts } = useCountryApi();

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displaySlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displaySlides.length]);

  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount = currentSlide * 340;
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  // Reset donation on success
  useEffect(() => {
    if (donationSuccess) {
      toast.success("दान सफल! आपका धन्यवाद!");
      setTimeout(() => {
        resetDonation();
        setDonationForm({
          name: "",
          email: "",
          phone: "",
          amount: 0,
          payment_for: "donation",
          notes: "",
          state: "",
          district: "",
          address: "",
        });
        setSelectedAmount(null);
        setIsCustomAmount(false);
      }, 3000);
    }
  }, [donationSuccess, resetDonation]);

  const formatPhoneNumber = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 10);
  };

  // Join form submit handler
  const handleJoinSubmit = async () => {
    if (!joinForm.name.trim()) {
      toast.error("कृपया अपना नाम दर्ज करें");
      return;
    }
    if (
      !joinForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(joinForm.email)
    ) {
      toast.error("कृपया वैध ईमेल दर्ज करें");
      return;
    }
    if (!joinForm.phone.trim() || joinForm.phone.length < 10) {
      toast.error("कृपया 10 अंकों का मोबाइल नंबर दर्ज करें");
      return;
    }
    if (!joinForm.dateOfBirth) {
      toast.error("कृपया अपनी जन्म तिथि चुनें");
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationData = {
        name: joinForm.name.trim(),
        email: joinForm.email.toLowerCase().trim(),
        phone: joinForm.phone.trim(),
        dob: format(joinForm.dateOfBirth, "yyyy-MM-dd"),
        referred_by: null,
      };

      const result = await registerUser(registrationData);

      if (result.success) {
        toast.success("पंजीकरण सफल! आपका पासवर्ड आपकी जन्म तिथि है (DDMMYYYY)");
        setJoinForm({ name: "", email: "", phone: "", dateOfBirth: undefined });

        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        toast.error(result.message || "पंजीकरण में त्रुटि हुई");
      }
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "पंजीकरण में त्रुटि हुई। कृपया पुनः प्रयास करें।";

      const errorResponse = error as {
        response?: { data?: Record<string, any> };
        message?: string;
      };

      if (errorResponse?.response?.data) {
        const data = errorResponse.response.data;
        if (Array.isArray(data.phone) && data.phone[0]) {
          errorMessage = data.phone[0];
        } else if (Array.isArray(data.email) && data.email[0]) {
          errorMessage = data.email[0];
        } else if (data.error && typeof data.error === "string") {
          errorMessage = data.error;
        } else if (data.detail && typeof data.detail === "string") {
          errorMessage = data.detail;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Donation amount selection
  const handleAmountSelect = (amount: number) => {
    if (amount === -1) {
      setIsCustomAmount(true);
      setSelectedAmount(null);
      setDonationForm((prev) => ({ ...prev, amount: 0 }));
    } else {
      setIsCustomAmount(false);
      setSelectedAmount(amount);
      setDonationForm((prev) => ({ ...prev, amount }));
    }
  };

  // Donation form submit handler
  const handleDonationSubmit = async () => {
    if (!donationForm.name.trim()) {
      toast.error("कृपया अपना नाम दर्ज करें");
      return;
    }
    if (
      !donationForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donationForm.email)
    ) {
      toast.error("कृपया वैध ईमेल दर्ज करें");
      return;
    }
    if (!donationForm.phone.trim() || donationForm.phone.length < 10) {
      toast.error("कृपया 10 अंकों का मोबाइल नंबर दर्ज करें");
      return;
    }
    if (!donationForm.amount || donationForm.amount < 1) {
      toast.error("कृपया दान राशि चुनें");
      return;
    }

    try {
      await processPayment({
        ...donationForm,
        amount: donationForm.amount * 100,
        address: `${donationForm.district}, ${donationForm.state}`,
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("भुगतान में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  return (
    <div className="relative font-sans overflow-hidden w-full ">
      <div className=" w-full md:bg-primary  text-white sm:pb-24 lg:pb-48 relative overflow-hidden transition-colors duration-500">
        <Image
          src={heroImage}
          alt="Rashtriya Seva Sangh"
          className="w-full h-auto md:hidden block"
          priority
          sizes="100vw"
          placeholder="blur"
        />
        <div className="w-full px-4 md:px-8 lg:px-16 pt-3 sm:pt-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between mt-4 sm:mt-6 lg:mt-12 gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="hidden md:flex flex-col lg:w-1/2 text-center lg:text-left z-20"
            >
              {/* Badge */}
              <div className="inline-flex items-center self-center lg:self-start gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/25 mb-6 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white">
                  For Dharma, For Nation, For Bharat!
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-[1.1] tracking-tight">
                <span className="text-white drop-shadow-lg">
                  A Vedic Nation envisioned by{" "}
                </span>
                <span className="inline-block mt-2 bg-white text-primary px-3 py-1 transform -skew-x-6 shadow-xl font-black">
                  <span className="inline-block skew-x-6 italic">
                    Rashtriya Seva Sangh
                  </span>
                </span>
              </h1>

              {/* Hindi Tagline */}
              <div className="relative mb-8">
                <h2 className="text-2xl md:text-3xl ont-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent drop-shadow-lg">
                    धर्म से राष्ट्र, राष्ट्र से विश्व - यही वैदिक दृष्टि है।
                  </span>
                </h2>
                <div className="hidden lg:block w-24 h-1 bg-gradient-to-r from-white to-transparent rounded-full mt-4"></div>
              </div>

              {/* Description */}
              <p className="hidden lg:block text-orange-50/90 text-base lg:text-lg max-w-lg font-medium leading-relaxed mb-8">
                Join us in our sacred mission to revive Sanatan values,
                strengthen national unity, and build a Vedic Nation rooted in
                Dharma, Service, and Culture.
              </p>

              {/* Stats Badge */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default shadow-lg group">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.5)]"></div>
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    15+ States
                  </span>
                </div>
                <div className="hidden lg:flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default shadow-lg group">
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    1Lakh+ Active Members
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Slides from Banners API */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:block relative h-[500px] lg:w-1/2 w-full"
            >
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              )}

              {!loading && displaySlides.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-10 border-2 border-dashed border-white/30 rounded-xl text-white/70">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No banners available</p>
                  </div>
                </div>
              )}

              {!loading && displaySlides.length > 0 && (
                <div
                  ref={sliderRef}
                  className="flex gap-6 overflow-x-hidden h-full items-center pl-4 py-8"
                >
                  {displaySlides.map((slide, index) => {
                    const isActive = index === currentSlide;
                    return (
                      <motion.div
                        key={slide.id}
                        animate={{
                          scale: isActive ? 1.05 : 0.95,
                          opacity: isActive ? 1 : 0.7,
                          filter: isActive ? "grayscale(0%)" : "grayscale(30%)",
                        }}
                        className={`flex-shrink-0 w-[320px] bg-white rounded-2xl border ${
                          isActive
                            ? "border-white/50 shadow-xl shadow-black/20"
                            : "border-white/10 shadow-lg"
                        } overflow-hidden h-[420px] flex flex-col transition-all duration-500`}
                      >
                        <div className="h-48 relative overflow-hidden">
                          {slide.image ? (
                            <Image
                              src={buildMediaUrl(slide.image) || ""}
                              alt={slide.title}
                              fill
                              className="object-cover transition-transform duration-700 hover:scale-110"
                              sizes="320px"
                              priority={index === 0}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow bg-white text-gray-800">
                          <h3 className="text-lg font-bold mb-2">
                            {slide.title}
                          </h3>
                          <p
                            className="text-sm text-gray-500 line-clamp-4 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: slide.content }}
                          />
                          <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              Read More
                            </span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary">
                              <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-30 -mt-12 sm:-mt-20 lg:-mt-30 mb-8 sm:mb-12 lg:mb-16"
      >
        <div className="bg-white rounded-t-xl rounded-b-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] mx-auto border-t-4 border-accent w-full overflow-hidden relative">
          {/* Tabs */}
          <div className="flex text-xs sm:text-sm font-bold text-center border-b border-gray-100">
            <button
              onClick={() => setActiveTab("join")}
              className={`py-3 px-4 sm:py-4 sm:px-8 flex-1 lg:flex-none lg:min-w-[180px] uppercase tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 relative overflow-hidden transition-all ${
                activeTab === "join"
                  ? "text-white bg-primary"
                  : "text-gray-500 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <UserPlus size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-[11px] sm:text-sm">Join Now</span>
            </button>
            <button
              onClick={() => setActiveTab("donate")}
              className={`py-3 px-4 sm:py-4 sm:px-8 flex-1 lg:flex-none lg:min-w-[180px] uppercase tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 relative overflow-hidden transition-all ${
                activeTab === "donate"
                  ? "text-white bg-primary"
                  : "text-gray-500 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-[11px] sm:text-sm">Donate Now</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 lg:p-8 bg-white min-h-[100px] sm:min-h-[120px] transition-all">
            {/* JOIN FORM */}
            {activeTab === "join" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {/* Name Field */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      पूरा नाम
                    </label>
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                      <UserPlus
                        size={18}
                        className="text-gray-400 group-focus-within:text-primary transition-colors flex-shrink-0"
                      />
                      <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                      <input
                        type="text"
                        aria-label="Full Name"
                        placeholder="Enter Full Name"
                        value={joinForm.name}
                        onChange={(e) =>
                          setJoinForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      ईमेल
                    </label>
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                      <Mail
                        size={18}
                        className="text-gray-400 group-focus-within:text-primary transition-colors flex-shrink-0"
                      />
                      <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                      <input
                        type="email"
                        aria-label="Email"
                        placeholder="example@mail.com"
                        value={joinForm.email}
                        onChange={(e) =>
                          setJoinForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      मोबाइल नं.
                    </label>
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                      <Phone
                        size={18}
                        className="text-gray-400 group-focus-within:text-primary transition-colors flex-shrink-0"
                      />
                      <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                      <input
                        type="tel"
                        aria-label="Mobile Number"
                        placeholder="9876543210"
                        maxLength={10}
                        value={joinForm.phone}
                        onChange={(e) =>
                          setJoinForm((prev) => ({
                            ...prev,
                            phone: formatPhoneNumber(e.target.value),
                          }))
                        }
                        className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Date of Birth Field */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      जन्म तिथि
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-9 sm:h-10 justify-start text-left font-medium text-xs sm:text-sm border-gray-300 hover:border-gray-400",
                            !joinForm.dateOfBirth && "text-gray-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                          {joinForm.dateOfBirth ? (
                            format(joinForm.dateOfBirth, "dd/MM/yyyy")
                          ) : (
                            <span>तारीख चुनें</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={joinForm.dateOfBirth}
                          onSelect={(date) =>
                            setJoinForm((prev) => ({
                              ...prev,
                              dateOfBirth: date,
                            }))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-center lg:justify-end">
                  <button
                    onClick={handleJoinSubmit}
                    disabled={isSubmitting}
                    className="bg-primary text-white font-bold py-3 sm:py-3.5 px-8 sm:px-12 rounded-lg hover:bg-red-700 transition w-full lg:w-auto shadow-lg uppercase text-xs sm:text-sm tracking-wide transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap lg:min-w-[200px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        पंजीकरण हो रहा है...
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        पंजीकरण करें
                      </>
                    )}
                  </button>
                </div>

                {/* Password Info */}
                <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-3">
                  पंजीकरण के बाद आपका पासवर्ड आपकी जन्म तिथि होगी (DDMMYYYY
                  प्रारूप में, जैसे: 5 जनवरी 2000 के लिए 05012000)
                </p>
              </motion.div>
            )}

            {/* DONATE FORM */}
            {activeTab === "donate" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Amount Selection */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 text-center">
                    दान राशि चुनें
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {impactAmounts.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAmountSelect(item.amount)}
                        className={`p-2 sm:p-3 rounded-lg border transition-all text-center ${
                          selectedAmount === item.amount
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-orange-300 bg-white hover:border-primary hover:shadow-sm"
                        }`}
                      >
                        <p className="text-sm sm:text-lg font-black text-primary">
                          {item.label}
                        </p>
                        <p className="text-[8px] sm:text-[10px] text-gray-500 leading-tight hidden sm:block">
                          {item.desc}
                        </p>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAmountSelect(-1)}
                      className={`p-2 sm:p-3 rounded-lg border transition-all flex flex-col items-center justify-center ${
                        isCustomAmount
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-orange-300 bg-white hover:border-primary hover:shadow-sm"
                      }`}
                    >
                      <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1" />
                      <p className="text-xs sm:text-sm font-bold text-primary">
                        Custom
                      </p>
                    </button>
                  </div>
                </div>

                {/* Custom Amount Input */}
                {isCustomAmount && (
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-xs">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-10 h-11 text-center text-lg font-semibold border-2 focus-ring rounded-lg"
                        type="number"
                        placeholder="राशि दर्ज करें"
                        min={1}
                        max={500000}
                        value={donationForm.amount || ""}
                        onChange={(e) =>
                          setDonationForm((prev) => ({
                            ...prev,
                            amount: parseInt(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      पूरा नाम *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-10 h-10 text-sm"
                        placeholder="Enter your name"
                        value={donationForm.name}
                        onChange={(e) =>
                          setDonationForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      मोबाइल नं. *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-10 h-10 text-sm"
                        placeholder="9876543210"
                        maxLength={10}
                        value={donationForm.phone}
                        onChange={(e) =>
                          setDonationForm((prev) => ({
                            ...prev,
                            phone: formatPhoneNumber(e.target.value),
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      ईमेल *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-10 h-10 text-sm"
                        type="email"
                        placeholder="example@mail.com"
                        value={donationForm.email}
                        onChange={(e) =>
                          setDonationForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* State & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <StateSelect
                    label="राज्य"
                    placeholder="राज्य चुनें"
                    value={donationForm.state}
                    onStateChange={(stateName, stateId) => {
                      setDonationForm((prev) => ({
                        ...prev,
                        state: stateName,
                        district: "",
                      }));
                      if (stateId) {
                        fetchDistricts(stateId);
                      }
                    }}
                    className="w-full"
                  />
                  <DistrictSelect
                    label="जिला"
                    placeholder="जिला चुनें"
                    value={donationForm.district}
                    onValueChange={(value) =>
                      setDonationForm((prev) => ({ ...prev, district: value }))
                    }
                    stateSelected={!!donationForm.state}
                    selectedStateId={
                      states.find((s) => s.name === donationForm.state)?.id
                    }
                    selectedStateName={donationForm.state}
                    className="w-full"
                  />
                </div>

                {/* Security Badge */}
                <div className="bg-gray-50 p-2.5 rounded-lg border flex items-center justify-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-medium text-gray-600">
                    100% Secure Payment
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary text-[10px]"
                  >
                    SSL
                  </Badge>
                  <Lock className="h-3 w-3 text-gray-400" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleDonationSubmit}
                    disabled={isProcessing}
                    className="w-full lg:w-auto lg:min-w-[250px] h-11 sm:h-12 text-sm sm:text-base font-semibold"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        <span className="text-xs sm:text-sm">
                          {currentStep === "creating-order" &&
                            "Creating Order..."}
                          {currentStep === "waiting-payment" &&
                            "Opening Payment..."}
                          {currentStep === "verifying" && "Verifying..."}
                          {!currentStep && "Processing..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <Heart className="h-5 w-5 mr-2" />
                        <span>
                          Donate{" "}
                          {donationForm.amount > 0
                            ? formatCurrency(donationForm.amount)
                            : "Now"}
                        </span>
                      </>
                    )}
                  </Button>
                </div>

                {donationError && (
                  <p className="text-xs text-red-500 text-center">
                    {donationError}
                  </p>
                )}
              </motion.div>
            )}
          </div>

          <div className="lg:hidden bg-orange-50 p-3 text-center text-xs text-gray-600 border-t border-gray-200">
            Have Questions? Call our Helpline{" "}
            <Link
              href="tel:+919429693593"
              className="font-bold text-primary text-sm block mt-1 hover:underline"
            >
              +91 94296 93593
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
