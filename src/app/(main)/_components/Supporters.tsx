"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

import gov01 from "@/assets/logo/gov-01.png";
import gov02 from "@/assets/logo/gov-02.jpg";
import gov03 from "@/assets/logo/gov-03.png";
import gov04 from "@/assets/logo/gov-04.png";
import gov05 from "@/assets/logo/gov-05.jpeg";
import gov06 from "@/assets/logo/gov-06.jpeg";
import gov07 from "@/assets/logo/gov-07.jpeg";
import gov08 from "@/assets/logo/gov-08.png";

// Official Supporters Data
const SUPPORTERS = [
  { id: 1, name: "Ministry of MSME", logo: gov01 },
  { id: 2, name: "Government of India", logo: gov02 },
  { id: 3, name: "NITI Aayog", logo: gov03 },
  { id: 4, name: "Income Tax Department", logo: gov04 },
  { id: 5, name: "Uttarakhand Government", logo: gov05 },
  { id: 6, name: "Make In India", logo: gov06 },
  { id: 7, name: "Digital India", logo: gov07 },
  { id: 8, name: "Intellectual Property India", logo: gov08 },
];

const Supporters: React.FC = () => {
  return (
    <motion.section
      className="py-8 md:py-12 bg-white border-b border-gray-100 overflow-hidden w-full max-w-[100vw]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]"
        >
          Our Recognition
        </motion.p>
      </div>

      <div className="relative flex w-full overflow-hidden  ">
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Marquee Track */}
        <motion.div
          className="flex items-center gap-8 md:gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          style={{ width: "max-content" }}
        >
          {/* Render duplicated list for seamless loop */}
          {[...SUPPORTERS, ...SUPPORTERS].map((supporter, index) => (
            <div
              key={`${supporter.id}-${index}`}
              className="relative w-24 h-16 md:w-32 md:h-20 hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center shrink-0"
              title={supporter.name}
            >
              <Image
                src={supporter.logo}
                alt={supporter.name}
                fill
                className="object-contain grayscale-0"
                sizes="128px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Supporters;
