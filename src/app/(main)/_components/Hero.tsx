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
        toast.success("पंजीकरण सफल! अब कृपया अपनी सदस्यता पूरी करें");

        // Build query params for become-member page
        const params = new URLSearchParams({
          name: joinForm.name.trim(),
          email: joinForm.email.toLowerCase().trim(),
          phone: joinForm.phone.trim(),
          dob: format(joinForm.dateOfBirth, "yyyy-MM-dd"),
        });

        setJoinForm({ name: "", email: "", phone: "", dateOfBirth: undefined });

        setTimeout(() => {
          router.push(`/become-member?${params.toString()}`);
        }, 1500);
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
        <div className="bg-white rounded-t-3xl rounded-b-2xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] mx-auto border-t-[6px] border-primary w-full overflow-hidden relative group/container hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-500">
          <div className="flex text-xs sm:text-sm font-bold text-center border-b border-gray-100 lg:hidden shadow-sm">
            <button
              onClick={() => setActiveTab("join")}
              className={`py-4 px-6 flex-1 uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 relative ${
                activeTab === "join"
                  ? "text-primary bg-primary/5 font-black"
                  : "text-gray-400 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <UserPlus
                size={18}
                className={activeTab === "join" ? "animate-pulse" : ""}
              />
              <span>Join Now</span>
              {activeTab === "join" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("donate")}
              className={`py-4 px-6 whitespace-nowrap flex-1 uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 relative ${
                activeTab === "donate"
                  ? "text-primary bg-primary/5 font-black"
                  : "text-gray-400 hover:text-primary hover:bg-gray-50"
              }`}
            >
              <Heart
                size={18}
                className={activeTab === "donate" ? "animate-pulse" : ""}
              />
              <span>Donate Now</span>
              {activeTab === "donate" && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                />
              )}
            </button>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:divide-x lg:divide-gray-100 divide-y lg:divide-y-0">
            {/* JOIN FORM SECTION */}
            <div
              className={cn(
                "p-6 sm:p-8 lg:p-10 transition-all duration-500",
                activeTab !== "join" && "hidden lg:block",
                "bg-white"
              )}
            >
              {/* Desktop Header */}
              <div className="hidden lg:flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-hind tracking-tight uppercase">
                    Become a Member
                  </h2>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    Join our community today
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">
                      पूरा नाम
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
                        <User size={18} strokeWidth={2.5} />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Full Name"
                        value={joinForm.name}
                        onChange={(e) =>
                          setJoinForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">
                      ईमेल
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
                        <Mail size={18} strokeWidth={2.5} />
                      </div>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        value={joinForm.email}
                        onChange={(e) =>
                          setJoinForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">
                      मोबाइल नं.
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
                        <Phone size={18} strokeWidth={2.5} />
                      </div>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        value={joinForm.phone}
                        onChange={(e) =>
                          setJoinForm((prev) => ({
                            ...prev,
                            phone: formatPhoneNumber(e.target.value),
                          }))
                        }
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  {/* DOB Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">
                      जन्म तिथि
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-[46px] justify-start text-left font-medium text-sm rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100 py-3",
                            !joinForm.dateOfBirth && "text-slate-300"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                          {joinForm.dateOfBirth ? (
                            format(joinForm.dateOfBirth, "dd/MM/yyyy")
                          ) : (
                            <span>तारीख चुनें</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 rounded-2xl border-none shadow-2xl"
                        align="start"
                      >
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
                          className="rounded-2xl"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <button
                    onClick={handleJoinSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-black py-4 px-8 rounded-2xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 uppercase text-sm tracking-widest flex items-center justify-center gap-3 disabled:opacity-70 group/btn active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <span>पंजीकरण करें</span>
                        <ArrowRight
                          size={20}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed max-w-[280px] mx-auto">
                    Note: Your DOB (DDMMYYYY) will be your initial password.
                    e.g. 05012000 for Jan 5, 2000.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* DONATE FORM SECTION */}
            <div
              className={cn(
                "p-6 sm:p-8 lg:p-10 transition-all duration-500",
                activeTab !== "donate" && "hidden lg:block",
                "bg-gray-50/30"
              )}
            >
              {/* Desktop Header */}
              <div className="hidden lg:flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <Heart size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-hind tracking-tight uppercase">
                    Support Mission
                  </h2>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">
                    Contribution for a better Nation
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Amount Selection Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-3">
                  {impactAmounts.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleAmountSelect(item.amount)}
                      className={cn(
                        "p-3 rounded-2xl border transition-all text-center relative overflow-hidden group/amt",
                        selectedAmount === item.amount
                          ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                          : "border-slate-200 bg-white hover:border-primary/50 text-slate-600"
                      )}
                    >
                      <p className="text-sm font-black font-hind leading-none mb-1">
                        {item.label}
                      </p>
                      <p
                        className={cn(
                          "text-[9px] font-bold uppercase tracking-wider leading-none",
                          selectedAmount === item.amount
                            ? "text-white/80"
                            : "text-slate-400"
                        )}
                      >
                        {item.desc}
                      </p>
                    </button>
                  ))}
                  <button
                    onClick={() => handleAmountSelect(-1)}
                    className={cn(
                      "p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1",
                      isCustomAmount
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                        : "border-slate-200 bg-white hover:border-primary/50 text-slate-600"
                    )}
                  >
                    <Gift size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Custom
                    </span>
                  </button>
                </div>

                {isCustomAmount && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-primary transition-colors">
                        <IndianRupee size={18} strokeWidth={2.5} />
                      </div>
                      <input
                        type="number"
                        placeholder="अपनी राशि दर्ज करें"
                        value={donationForm.amount || ""}
                        onChange={(e) =>
                          setDonationForm((prev) => ({
                            ...prev,
                            amount: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group/input">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={donationForm.name}
                        onChange={(e) =>
                          setDonationForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="relative group/input">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        maxLength={10}
                        value={donationForm.phone}
                        onChange={(e) =>
                          setDonationForm((prev) => ({
                            ...prev,
                            phone: formatPhoneNumber(e.target.value),
                          }))
                        }
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <StateSelect
                      value={donationForm.state}
                      onStateChange={(stateName, stateId) => {
                        setDonationForm((prev) => ({
                          ...prev,
                          state: stateName,
                          district: "",
                        }));
                        if (stateId) fetchDistricts(stateId);
                      }}
                      className="w-full"
                    />
                    <DistrictSelect
                      value={donationForm.district}
                      onValueChange={(val) =>
                        setDonationForm((prev) => ({ ...prev, district: val }))
                      }
                      stateSelected={!!donationForm.state}
                      selectedStateId={
                        states.find((s) => s.name === donationForm.state)?.id
                      }
                      selectedStateName={donationForm.state}
                      className="w-full"
                    />
                  </div>

                  <button
                    onClick={handleDonationSubmit}
                    disabled={isProcessing}
                    className="w-full bg-slate-900 text-white font-black py-4 px-8 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-200 uppercase text-sm tracking-widest flex items-center justify-center gap-3 disabled:opacity-70 group/btn active:scale-[0.98]"
                  >
                    {isProcessing ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Heart size={20} className="fill-white" />
                        <span>
                          दान करें{" "}
                          {donationForm.amount > 0 && `₹${donationForm.amount}`}
                        </span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 py-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 opacity-50">
                      <Shield size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">
                        Secure
                      </span>
                    </div>
                    <div className="w-px h-3 bg-slate-200" />
                    <div className="flex items-center gap-1.5 opacity-50">
                      <Lock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tighter">
                        SSL Encrypted
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:hidden bg-orange-50 p-3 text-center text-xs text-gray-600 border-t border-gray-200">
            Have Questions? Call our Helpline{" "}
            <Link
              href="tel:+919429693593"
              className="font-bold text-primary text-sm block mt-1 hover:underline"
            >
              94296 93593
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
