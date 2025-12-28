"use client";
import React from "react";
import {
  Store,
  Search,
  BadgeCheck,
  TrendingUp,
  MapPin,
  ArrowRight,
  ShoppingBag,
  Utensils,
  Wrench,
  CircleDashed,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";
import Image from "next/image";

const CATEGORIES = [
  {
    name: "खुदरा स्टोर",
    icon: ShoppingBag,
    count: "1.2k+",
    sub: "Retail Stores",
  },
  { name: "घरेलू सेवाएं", icon: Wrench, count: "850+", sub: "Home Services" },
  { name: "खान-पान", icon: Utensils, count: "2.4k+", sub: "Food & Dining" },
  { name: "वस्त्र एवं परिधान", icon: Store, count: "1.8k+", sub: "Apparel" },
];

const BUSINESS_IMAGES = [
  "https://images.unsplash.com/photo-1567634785834-031e45778a43?q=80&w=300&auto=format&fit=crop", // Pottery
  "https://images.unsplash.com/photo-1606914469725-e39c3ebc85db?q=80&w=300&auto=format&fit=crop", // Spices
  "https://images.unsplash.com/photo-1627918366974-9f79e8555e0f?q=80&w=300&auto=format&fit=crop", // Textiles
  "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=300&auto=format&fit=crop", // Jewelry
  "https://images.unsplash.com/photo-1590402494587-44b71d876534?q=80&w=300&auto=format&fit=crop", // Market
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=300&auto=format&fit=crop", // Indian Store
];

const MERCHANT_IMAGES = [
  "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=300&auto=format&fit=crop", // Meeting
  "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=300&auto=format&fit=crop", // Shopkeeper smiling
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=300&auto=format&fit=crop", // Store front
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=300&auto=format&fit=crop", // Traditional shop
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=300&auto=format&fit=crop", // Modern Office
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=300&auto=format&fit=crop", // Hands shaking
];

const VyapariSection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-orange-50/50 relative overflow-hidden w-full">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          badgeTitle="स्वदेशी हिंदू व्यापार नेटवर्क"
          badgeIcon={CircleDashed}
          title="Swadeshi Hindu Business Network"
          viewAll="View All Businesses"
        />

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
          {/* Left Card: Search */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 vyapari-card-left flex"
          >
            <div className="w-full bg-white rounded-2xl md:rounded-[2rem] shadow-xl shadow-orange-100/50 border border-orange-100 p-6 md:p-10 lg:p-12 relative overflow-hidden group hover:border-orange-200 transition-all duration-500 flex flex-col">
              {/* Background Images */}
              <div className="absolute top-0 right-0 w-[60%] h-full opacity-10 pointer-events-none mix-blend-multiply">
                <div className="grid grid-cols-2 gap-4 transform rotate-6 scale-125 -translate-y-12 translate-x-12">
                  {BUSINESS_IMAGES.map((src, i) => (
                    <Image
                      height={100}
                      width={100}
                      key={i}
                      src={src}
                      alt="Business"
                      className="biz-grid-img w-full h-32 md:h-48 object-cover rounded-2xl shadow-sm"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6 bg-orange-50 w-fit px-3 py-1 rounded-full border border-orange-100">
                  <Search size={14} /> 🔍 अपनों को खोजें, अपनों को बढ़ाएं (Local
                  Discovery)
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight leading-tight">
                  सत्यापित हिंदू <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    व्यवसायों से जुड़ें
                  </span>
                </h3>

                <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 font-medium max-w-md leading-relaxed">
                  अपने क्षेत्र के भरोसेमंद दुकानदारों, सेवा प्रदाताओं और स्वदेशी
                  ब्रांडों का समर्थन करके राष्ट्र की अर्थव्यवस्था में योगदान
                  दें।
                </p>

                {/* Search Bar */}
                <div className="bg-white p-2 rounded-xl md:rounded-2xl border border-gray-200 shadow-lg shadow-gray-100 flex flex-col sm:flex-row gap-2 mb-8 md:mb-10 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-50 transition-all duration-300">
                  <div className="flex-1 flex items-center px-3 md:px-4 py-2 md:py-3 gap-2 md:gap-3">
                    <MapPin size={22} className="text-orange-500 shrink-0" />
                    <input
                      type="text"
                      placeholder="Pincode, Area, or City"
                      className="bg-transparent text-sm w-full focus:outline-none text-gray-800 font-bold placeholder:font-medium placeholder:text-gray-400 h-full"
                    />
                  </div>
                  <button className="bg-gray-900 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm uppercase tracking-wide hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-200 shrink-0">
                    Search
                  </button>
                </div>

                {/* Categories - Pushed to bottom */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h4 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Popular Categories
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                    {CATEGORIES.map((cat, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-orange-200 rounded-xl p-3 md:p-4 transition-all duration-300 cursor-pointer group/cat hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 sm:block sm:text-center">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover/cat:text-orange-500 group-hover/cat:scale-110 sm:mx-auto mb-0 sm:mb-2 transition-all shrink-0">
                            <cat.icon
                              size={16}
                              className="md:w-[18px] md:h-[18px]"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 text-xs md:text-sm group-hover/cat:text-orange-700 transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-[10px] text-gray-400 font-bold hidden sm:block">
                              {cat.sub}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Register */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 vyapari-card-right flex"
          >
            <div className="w-full bg-[#0F1115] text-white rounded-2xl md:rounded-[2rem] shadow-2xl p-6 md:p-10 lg:p-12 relative overflow-hidden flex flex-col justify-center border border-gray-800 group h-full">
              {/* Background Images */}
              <div className="absolute top-0 right-0 w-[70%] h-full pointer-events-none transition-opacity duration-500 group-hover:opacity-40 opacity-20">
                <div className="grid grid-cols-2 gap-4 transform -rotate-6 scale-125 -translate-y-12 translate-x-20">
                  {MERCHANT_IMAGES.map((src, i) => (
                    <Image
                      height={100}
                      width={100}
                      key={i}
                      src={src}
                      alt="Merchant"
                      className="merchant-grid-img w-full h-32 md:h-48 object-cover rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/5"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/90 to-transparent"></div>
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6 bg-orange-500/10 w-fit px-3 py-1 rounded-full border border-orange-500/20 backdrop-blur-md">
                    <Store size={14} /> 💼 व्यापारियों के लिए: राष्ट्र के साथ
                    अपना व्यापार बढ़ाएं
                  </div>

                  <h3 className="text-3xl lg:text-5xl font-black mb-4 md:mb-6 leading-[1.1] tracking-tight text-white">
                    सनातनी व्यापारियों का <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">
                      सबसे बड़ा नेटवर्क
                    </span>
                  </h3>

                  <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-10 max-w-lg leading-relaxed">
                    करोड़ों जागरूक नागरिकों तक अपने उत्पादों और सेवाओं को
                    पहुँचाएँ। राष्ट्रीय सेवा संघ के इस मंच से जुड़कर अपने व्यवसाय
                    को एक नई पहचान और विस्तार दें।
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 relative">
                  <div className="flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group/feat cursor-default">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-900/40 group-hover/feat:scale-110 transition-transform">
                      <BadgeCheck size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base mb-0.5">
                        सत्यापित स्वदेशी बैज (Verified Swadeshi Badge)
                      </h4>
                      <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                        हमारे विशेष सत्यापन बैज के साथ ग्राहकों का अटूट विश्वास
                        जीतें।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group/feat cursor-default">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40 group-hover/feat:scale-110 transition-transform">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base mb-0.5">
                        हाइपर-लोकल विजिबिलिटी
                      </h4>
                      <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                        अपने पिनकोड में खोज करने वाले स्थानीय ग्राहकों की पहली
                        पसंद बनें।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group/feat cursor-default">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-green-900/40 group-hover/feat:scale-110 transition-transform">
                      <Shield size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base mb-0.5">
                        संगठित शक्ति
                      </h4>
                      <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">
                        राजनीतिक और व्यक्तिगत स्वार्थ से ऊपर उठकर निस्वार्थ भाव
                        से व्यापारिक हितों की रक्षा।
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-white text-gray-900 py-3 md:py-4 px-6 md:px-8 rounded-xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-orange-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 group">
                    आज ही निःशुल्क पंजीकरण करें (Register Free Now)
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform text-orange-600"
                    />
                  </button>
                  <p className="text-center text-[11px] text-gray-400 mt-4 font-bold uppercase tracking-wide">
                    छोटे व्यापारियों और कुटीर उद्योगों के लिए कोई शुल्क नहीं।
                  </p>
                  <p className="text-center text-[10px] text-orange-400/60 mt-2 font-medium italic">
                    "धर्म के मार्ग पर चलने वाला व्यापार ही राष्ट्र की असली
                    उन्नति है।"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VyapariSection;
