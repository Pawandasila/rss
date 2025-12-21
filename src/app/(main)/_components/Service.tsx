"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDashed,
  Flag,
  Flower,
  HandHeart,
  HeartHandshake,
  Home,
  Leaf,
  Sun,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

export const SERVICES = [
  {
    id: "Vision",
    title: "Vision",
    icon: Flower,
    image: "/hero/hero-01.png",
    description:
      "राष्ट्रीय सेवा संघ का लक्ष्य धर्म और राष्ट्र के प्रति समर्पित नागरिक जीवन के माध्यम से एक सशक्त, समरस और अखंड भारत का निर्माण करना है। हम सनातन संस्कृति को शाश्वत जीवन पद्धति मानते हैं और शिक्षा, सेवा तथा सहयोग के बल पर एक जाति-मुक्त, आत्मनिर्भर समाज के निर्माण के लिए संकल्पित हैं।",
    features: [
      "धर्म और राष्ट्र के संगम से सशक्त, अखंड भारत का उदय।",
      "सनातन संस्कृति को शाश्वत जीवन पद्धति मानते हैं।",
      "एक आत्मनिर्भर समाज के निर्माण के लिए संकल्पित।",
      "प्राचीन वैदिक परंपराओं के गौरव को पुनः स्थापित करना।",
    ],
  },
  {
    id: "Mission",
    title: "Mission",
    icon: Flag,
    image: "/hero/hero-02.png",
    description:
      "राष्ट्रीय सेवा संघ का मिशन भारत को एक सशक्त, संगठित और समरस राष्ट्र के रूप में विकसित करना है, जहाँ नागरिक सत्य, धर्म, सेवा, त्याग और सहयोग जैसे सनातन सिद्धांतों को आत्मसात करें। हमारा उद्देश्य समाज के हर वर्ग को जोड़कर एक राष्ट्रीय चेतना का निर्माण करना है।",
    features: [
      "संगठित और समरस राष्ट्र के रूप में विकसित करना।",
      "नागरिक सत्य, धर्म, सेवा, त्याग और सहयोग जैसे सनातन सिद्धांतों को आत्मसात करें।",
      "वंचित और उपेक्षित वर्गों का उत्थान कर उन्हें सेवा का केंद्र बनाना",
    ],
  },
  {
    id: "Value",
    title: "Value",
    icon: Leaf,
    image: "/hero/hero-03.png",
    description:
      "राष्ट्रीय सेवा संघ के मूल्य सनातन धर्म और राष्ट्र निर्माण की उच्चतम भावना से पोषित हैं। हम धर्मनिष्ठा को आधार, और राष्ट्र सर्वोपरि को सर्वोच्च ध्येय मानते हैं। हमारे लिए सामाजिक समरसता जीवन की अनिवार्यता है, जहाँ हर भारतीय समान है।",
    features: [
      "इन मूल्यों से भारत को धार्मिक, समरस और गौरवशाली विश्वगुरु बनाना",
      "सत्य, अहिंसा और आत्मनिर्भरता को राष्ट्र की असली ताकत मानते हैं।",
      "सामाजिक समरसता जीवन की अनिवार्यता है, जहाँ हर भारतीय समान है।",
    ],
  },
  {
    id: "Kutumb",
    title: "Kutumb Prabodhan",
    icon: Home,
    image: "/hero/hero-04.png",
    description:
      "Strengthening the family system to preserve values and culture. Regular family gatherings to discuss social and national.",
    features: [
      "Family Values",
      "Cultural Bonding",
      "Weekly Milan",
      "Social Awareness",
    ],
  },
  {
    id: "Samajik",
    title: "Samajik Sadbhav",
    icon: HeartHandshake,
    image: "/hero/hero-05.png",
    description:
      "Working towards eradicating caste-based discrimination and fostering a spirit of brotherhood and unity among all sections..",
    features: [
      "Social Equality",
      "Community Dinners",
      "Temple Entry",
      "Unity Conclaves",
    ],
  },
  {
    id: "Paryavaran",
    title: "Environment",
    icon: Sun,
    image: "/hero/hero-06.png",
    description:
      "Protecting nature is part of Bharatiya culture. Initiatives for tree plantation, water conservation, and reducing plastic usage.",
    features: [
      "Tree Plantation",
      "Water Management",
      "Plastic Free",
      "Green Lifestyle",
    ],
  },
];

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-background overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10"
      >
        <SectionHeader
          badgeTitle="Key Initiatives"
          badgeIcon={CircleDashed}
          title="RSS in Service"
          viewAll="View All Services"
          viewAllLink="#"
        />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Grid Navigation (Changed to 2 cols) */}
          <div className="lg:w-[38%] grid grid-cols-2 gap-4 h-fit content-start">
            {SERVICES.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveService(service)}
                className={`
                        group flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300 border text-center h-full
                        ${
                          activeService.id === service.id
                            ? "bg-white border-apml-red shadow-lg scale-[1.03] z-10"
                            : "bg-white/60 border-transparent hover:bg-white hover:border-red-100 hover:shadow-md"
                        }
                    `}
              >
                <div
                  className={`
                        p-3 rounded-full mb-3 transition-colors duration-300
                        ${
                          activeService.id === service.id
                            ? "bg-red-50 text-apml-red"
                            : "bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-apml-red"
                        }
                    `}
                >
                  <service.icon size={25} strokeWidth={1.5} />
                </div>
                <span
                  className={`block text-[9px] lg:text-xs font-bold uppercase tracking-wider leading-tight ${
                    activeService.id === service.id
                      ? "text-gray-900"
                      : "text-gray-500 group-hover:text-gray-800"
                  }`}
                >
                  {service.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right: Detailed Content Area - Overlapping Layout */}
          <div className="lg:w-[62%] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Desktop Layout (Grid for overlap) */}
                <div className="hidden lg:grid grid-cols-12 grid-rows-1 min-h-[500px] items-center">
                  {/* Image (Back) - Spans col 3 to 13 */}
                  <motion.div
                    className="col-start-3 col-end-13 row-start-1 h-full w-full relative rounded-2xl overflow-hidden shadow-2xl z-0 group"
                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Image
                        src={activeService.image}
                        alt={activeService.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"></div>
                  </motion.div>

                  {/* Content Card (Front) - Spans col 1 to 6 */}
                  <motion.div
                    className="col-start-1 col-end-7 row-start-1 z-10 bg-apml-red text-white p-8 lg:p-10 shadow-[0_20px_50px_rgba(227,30,36,0.3)] min-h-[400px] flex flex-col justify-center relative my-auto rounded-xl backdrop-blur-sm bg-opacity-95 border border-red-400"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="absolute -right-2 top-10 w-4 h-4 bg-apml-red transform rotate-45 z-0"></div>
                    <motion.h3
                      className="text-2xl font-bold mb-4 relative z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {activeService.title}
                    </motion.h3>
                    <motion.p
                      className="text-white/90 text-sm leading-relaxed mb-6 font-medium relative z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {activeService.description}
                    </motion.p>

                    <div className="space-y-3 mb-8 relative z-10">
                      {activeService.features?.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start gap-3 text-white text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                          <Check
                            size={18}
                            className="text-white mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-apml-red transition-colors w-fit px-6 py-2.5 text-xs font-bold uppercase tracking-wider relative z-10 rounded"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View More Details
                    </motion.button>
                  </motion.div>
                </div>

                {/* Mobile/Tablet Layout (Stacked) */}
                <motion.div
                  className="lg:hidden flex flex-col rounded-xl overflow-hidden shadow-lg mt-4 lg:mt-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-64 relative">
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                  </div>
                  <div className="bg-apml-red text-white p-8">
                    <h3 className="text-2xl font-bold mb-4">
                      {activeService.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-6">
                      {activeService.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      {activeService.features?.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start gap-3 text-white text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + idx * 0.1 }}
                        >
                          <Check
                            size={18}
                            className="text-white mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-apml-red transition-colors w-fit px-6 py-2 text-xs font-bold uppercase tracking-wider rounded"
                      whileTap={{ scale: 0.95 }}
                    >
                      View More
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ServicesSection;
