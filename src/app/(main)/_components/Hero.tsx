"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Phone,
  Search,
  MapPin,
  Flag,
  UserPlus,
  Heart,
  IndianRupee,
  Mail,
  User,
  FileText,
  ChevronDown,
  ArrowRight,
  Award,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Seva: Service to Humanity",
    titleHindi: "नर सेवा नारायण सेवा",
    description:
      "RSS Swayamsevaks are always at the forefront during natural calamities, providing relief and rehabilitation to the affected.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop",
    ctaLink: "#",
  },
  {
    id: 2,
    title: "Character Building",
    titleHindi: "व्यक्ति निर्माण से राष्ट्र निर्माण",
    description:
      "Inculcating discipline, patriotism, and selfless service through daily Shakha to create dedicated citizens.",
    image:
      "https://images.unsplash.com/photo-1616766480749-060195c643b2?q=80&w=800&auto=format&fit=crop",
    ctaLink: "#",
  },
  {
    id: 3,
    title: "Preserving Culture",
    titleHindi: "संस्कृति रक्षण",
    description:
      "Protecting and promoting Bharatiya culture, traditions, and values for future generations.",
    image:
      "https://images.unsplash.com/photo-1623944890523-284c8c272bc7?q=80&w=800&auto=format&fit=crop",
    ctaLink: "#",
  },
  {
    id: 4,
    title: "Social Harmony",
    titleHindi: "सामाजिक समरसता",
    description:
      "Working towards a casteless society united by the bond of brotherhood and equality.",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800&auto=format&fit=crop",
    ctaLink: "#",
  },
  {
    id: 5,
    title: "Rural Development",
    titleHindi: "ग्राम विकास",
    description:
      "Empowering villages through organic farming, cow protection, and self-reliance initiatives.",
    image:
      "https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=800&auto=format&fit=crop",
    ctaLink: "#",
  },
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState<"join" | "donate">("join");
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Desktop slider sync
  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount = currentSlide * 340; // Approx card width + gap
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative font-sans overflow-hidden w-full max-w-[100vw]"
      ref={heroRef}
    >
      <div className="bg-primary w-full text-white pb-16 sm:pb-24 lg:pb-48 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 to-transparent"></div>

        <div className="container mx-auto px-4 pt-3 sm:pt-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between mt-4 sm:mt-6 lg:mt-12 gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="lg:w-1/2 text-center lg:text-left z-20"
              ref={textRef}
            >
              <div className="inline-block bg-accent/20 border border-accent/30 backdrop-blur-md px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3 text-orange-100">
                For Dharma, For Nation, For Bharat!
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight drop-shadow-lg"
              >
                RASHTRIYA SEVA{" "}
                <span className="bg-white text-primary px-1.5 sm:px-2 mx-0.5 sm:mx-1 transform -skew-x-12 inline-block shadow-lg text-xl sm:text-2xl md:text-3xl lg:text-7xl">
                  SANGH
                </span>
                <br />
                <span className="text-base sm:text-lg md:text-2xl lg:text-5xl mt-1 sm:mt-2 block font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-orange-100 opacity-90">
                  Organization for Nation
                </span>
              </motion.h1>
              <p className="hidden lg:block text-orange-50 text-lg max-w-xl font-medium leading-relaxed mb-8">
                Uniting Hindu society for the protection of Dharma and national
                reconstruction. Join the world's largest voluntary movement
                today.
              </p>

              <div className="mt-6 gap-4 justify-center lg:justify-start hidden lg:flex">
                <div className="flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition cursor-default shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                  <span className="text-sm font-bold uppercase tracking-wider">
                    50K+ Shakhas
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Automated Slider (Restored) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:block relative h-[500px] lg:w-1/2 w-full"
            >
              {/* Fade Overlay */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none" />

              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-hidden h-full items-center pl-4 py-8"
              >
                <AnimatePresence mode="popLayout">
                  {HERO_SLIDES.map((slide, index) => {
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
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-110"
                            sizes="320px"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow bg-white text-gray-800">
                          <h3 className="text-lg font-bold mb-1">
                            {slide.title}
                          </h3>
                          <p className="text-xs font-bold text-primary mb-3">
                            {slide.titleHindi}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-4 leading-relaxed">
                            {slide.description}
                          </p>
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
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-4 relative z-30 -mt-12 sm:-mt-16 lg:-mt-28 mb-8 sm:mb-12 lg:mb-16"
        ref={formRef}
      >
        <div className="bg-white rounded-t-xl rounded-b-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] mx-auto border-t-4 border-accent max-w-7xl overflow-hidden relative">
          <div className="flex text-xs sm:text-sm font-bold text-center border-b border-gray-100">
            <button
              onClick={() => setActiveTab("join")}
              className={`py-3 px-4 sm:py-4 sm:px-8 flex-1 lg:flex-none uppercase tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 relative overflow-hidden ${
                activeTab === "join"
                  ? "text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {activeTab === "join" && (
                <div className="absolute inset-0 bg-primary z-0"></div>
              )}
              <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <UserPlus size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-[11px] sm:text-sm">Join RSS</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("donate")}
              className={`py-3 px-4 sm:py-4 sm:px-8 flex-1 lg:flex-none uppercase tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 relative overflow-hidden ${
                activeTab === "donate"
                  ? "text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {activeTab === "donate" && (
                <div className="absolute inset-0 bg-primary z-0"></div>
              )}
              <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-[11px] sm:text-sm">Donate</span>
              </div>
            </button>
          </div>

          <div className="p-4 sm:p-5 lg:p-8 bg-white min-h-[100px] sm:min-h-[120px] transition-all">
            <AnimatePresence mode="wait">
              {activeTab === "join" ? (
                <motion.div
                  key="join"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 items-end"
                >
                  <div className="flex-1 w-full space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      Your Name
                    </label>
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                      <UserPlus
                        size={18}
                        className="text-gray-400 group-focus-within:text-primary transition-colors"
                      />
                      <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                      <input
                        type="text"
                        placeholder="Enter Full Name"
                        className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      City / District
                    </label>
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                      <MapPin
                        size={18}
                        className="text-gray-400 group-focus-within:text-primary transition-colors"
                      />
                      <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                      <input
                        type="text"
                        placeholder="Enter City"
                        className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      Mobile No.
                    </label>
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                      <Phone
                        size={18}
                        className="text-gray-400 group-focus-within:text-primary transition-colors"
                      />
                      <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                      <input
                        type="tel"
                        placeholder="+91"
                        className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <button className="bg-primary text-white font-bold py-3 sm:py-3.5 px-6 sm:px-10 rounded-lg hover:bg-red-700 transition w-full lg:w-auto shadow-lg uppercase text-xs sm:text-sm tracking-wide transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap lg:min-w-[200px]">
                    Join Us
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="donate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                        Your Name
                      </label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                        <User
                          size={18}
                          className="text-gray-400 group-focus-within:text-primary"
                        />
                        <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                        <input
                          type="text"
                          placeholder="Enter Full Name"
                          className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                        Phone Number
                      </label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                        <Phone
                          size={18}
                          className="text-gray-400 group-focus-within:text-primary"
                        />
                        <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                        <input
                          type="tel"
                          placeholder="+91"
                          className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                        Email ID
                      </label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                        <Mail
                          size={18}
                          className="text-gray-400 group-focus-within:text-primary"
                        />
                        <div className="w-px h-6 bg-gray-200 mx-3"></div>
                        <input
                          type="email"
                          placeholder="example@mail.com"
                          className="bg-transparent border-none text-gray-800 text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                        Amount (₹)
                      </label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                        <IndianRupee
                          size={18}
                          className="text-gray-400 group-focus-within:text-primary"
                        />
                        <div className="w-px h-6 bg-gray-200 mx-3"></div>
                        <input
                          type="number"
                          placeholder="Enter Amount"
                          className="bg-transparent border-none text-gray-800 text-sm w-full focus:outline-none placeholder-gray-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                        State
                      </label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                        <Flag
                          size={18}
                          className="text-gray-400 group-focus-within:text-primary"
                        />
                        <div className="w-px h-6 bg-gray-200 mx-3"></div>
                        <div className="relative w-full">
                          <select className="bg-transparent border-none text-gray-800 text-sm w-full focus:outline-none font-medium appearance-none cursor-pointer relative z-10">
                            <option value="">Select State</option>
                            <option value="MH">Maharashtra</option>
                            <option value="DL">Delhi</option>
                            <option value="UP">Uttar Pradesh</option>
                            <option value="KA">Karnataka</option>
                          </select>
                          <ChevronDown
                            size={14}
                            className="absolute right-0 top-1 text-gray-400 z-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                        District
                      </label>
                      <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                        <MapPin
                          size={18}
                          className="text-gray-400 group-focus-within:text-primary"
                        />
                        <div className="w-px h-5 sm:h-6 bg-gray-200 mx-2 sm:mx-3"></div>
                        <div className="relative w-full">
                          <select className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none font-medium appearance-none cursor-pointer relative z-10">
                            <option value="">Select District</option>
                            <option value="NGP">Nagpur</option>
                            <option value="PUN">Pune</option>
                            <option value="MUM">Mumbai</option>
                          </select>
                          <ChevronDown
                            size={14}
                            className="absolute right-0 top-1 text-gray-400 z-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                      Notes (Optional)
                    </label>
                    <div className="flex items-start bg-white border border-gray-300 rounded-lg p-2 sm:p-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-red-100 transition-all shadow-sm hover:border-gray-400 group">
                      <FileText
                        size={18}
                        className="text-gray-400 group-focus-within:text-primary mt-1"
                      />
                      <div className="w-px h-10 sm:h-12 bg-gray-200 mx-2 sm:mx-3"></div>
                      <textarea
                        placeholder="Any specific instructions or comments..."
                        className="bg-transparent border-none text-gray-800 text-xs sm:text-sm w-full focus:outline-none placeholder-gray-400 font-medium resize-none h-10 sm:h-12 py-1"
                      ></textarea>
                    </div>
                  </div>

                  <input type="hidden" name="payment_for" value="donation" />

                  <button className="bg-primary text-white font-bold py-3 sm:py-4 px-10 rounded-lg hover:bg-red-700 transition w-full shadow-lg uppercase text-xs sm:text-sm tracking-wide transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap mt-4">
                    Proceed to Donate
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:hidden bg-orange-50 p-3 text-center text-xs text-gray-600 border-t border-gray-200">
            Have Questions? <br /> Call our Helpline{" "}
            <span className="font-bold text-primary text-sm block mt-1">
              {+1101001}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
