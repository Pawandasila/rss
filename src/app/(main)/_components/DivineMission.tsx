"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star, Flag, Scale, Flower } from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

const MISSIONS = [
  {
    category: "IDEOLOGY",
    title: "संकल्प",
    description:
      "राष्ट्रीय सेवा संघ का लक्ष्य धर्म और राष्ट्र के प्रति समर्पित नागरिक जीवन के माध्यम से एक सशक्त, समरस और अखंड भारत का निर्माण करना है। हम सनातन संस्कृति को शाश्वत जीवन पद्धति मानते हैं।",
    image: "/hero/hero-05.png",
    icon: Flower,
    points: [
      "सशक्त, समरस और अखंड भारत का निर्माण",
      "सनातन संस्कृति - शाश्वत जीवन पद्धति",
      "जातिमुक्त और संगठित समाज का उदय",
    ],
    cta: "READ FULL SANKALP",
    color: "text-orange-600",
    bg: "bg-orange-100",
    bulletColor: "bg-orange-500",
  },
  {
    category: "MISSION",
    title: "उद्देश्य",
    description:
      "हमारा उद्देश्य समाज के हर वर्ग को जोड़कर एक राष्ट्रीय चेतना का निर्माण करना है। हम शिक्षा को चरित्र निर्माण का मार्ग और सेवा को राष्ट्र की शक्ति मानते हैं।",
    image: "/hero/hero-06.png",
    icon: Flag,
    points: [
      "संगठित और समरस राष्ट्र का विकास",
      "चरित्र निर्माण से राष्ट्र सेवा",
      "युवाओं का मार्गदर्शन और उत्थान",
    ],
    cta: "JOIN OUR MISSION",
    color: "text-blue-600",
    bg: "bg-blue-100",
    bulletColor: "bg-blue-500",
  },
  {
    category: "VALUES",
    title: "मूल्य",
    description:
      "हम राष्ट्र सर्वोपरि को सर्वोच्च ध्येय मानते हैं। निःस्वार्थ सेवा हमारा धर्म है। सत्य, अहिंसा और आत्मनिर्भरता को हम राष्ट्र की असली ताकत मानते हैं।",
    image: "/hero/hero-07.png",
    icon: Scale,
    points: [
      "राष्ट्र सर्वोपरि की भावना",
      "सामाजिक समरसता और निःस्वार्थ सेवा",
      "सत्य, अहिंसा और आत्मनिर्भरता",
    ],
    cta: "EXPLORE VALUES",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    bulletColor: "bg-emerald-500",
  },
];

const DivineMission: React.FC = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden w-full max-w-[100vw]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badgeTitle="Core Ideology"
          badgeIcon={Star}
          title="Our Divine Mission"
          description="Dedicated to the goal of Man Making and Nation Building through various dimensions of social work."
          viewAll="View all missions"
          viewAllLink="#"
        />

        <div className="flex flex-col gap-24">
          {MISSIONS.map((mission, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-20 items-center`}
              >
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full lg:w-1/2 relative group"
                >
                  <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-full rounded-sm overflow-hidden shadow-2xl">
                    <Image
                      src={mission.image}
                      alt={mission.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </motion.div>

                {/* Content Section - Redesigned to match new reference */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className={`p-3 sm:p-4 rounded-full ${mission.bg} ${mission.color} shadow-sm shrink-0`}
                    >
                      <mission.icon
                        size={28}
                        strokeWidth={2}
                        className="sm:w-8 sm:h-8"
                      />
                    </div>
                    <div className="pt-2">
                      <span className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] block mb-2">
                        {mission.category}
                      </span>
                      <h3 className="text-sm md:text-2xl lg:text-3xl font-black text-primary uppercase leading-none tracking-tight">
                        {mission.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 font-medium">
                    {mission.description}
                  </p>

                  <button className="group flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:text-primary/80 transition-colors mb-10">
                    {mission.cta}
                    <ArrowRight
                      size={14}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </button>

                  <div className="border-l-[3px] border-border pl-6 space-y-4">
                    {mission.points.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${mission.bulletColor} shrink-0`}
                        />
                        <span className="text-foreground/80 font-bold text-sm tracking-wide">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DivineMission;
