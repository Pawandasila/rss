"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Shield, Heart, Users, UserCircle, Play } from "lucide-react";
import { motion } from "motion/react";
import hero01 from "@/assets/hero/hero-01.png";
import SectionHeader from "@/components/common/SectionHeader";
import Model from "@/components/common/Model";
import { Button } from "@/components/ui/button";

const AboutSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="md:py-24 bg-white relative overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          title="About Us"
          badgeIcon={UserCircle}
          badgeTitle="हमारे बारे में"
          viewAll="About Us"
          viewAllLink="/about-us"
        />
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative about-image-group"
          >
            <div
              className="about-image-wrapper relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer group"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <Image
                  src={hero01}
                  alt="RSS Swayamsevaks"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-10">
                <p className="font-serif italic text-lg md:text-xl mb-1">
                  "Sanghe Shakti Kaliyuge"
                </p>
                <p className="text-[10px] md:text-xs opacity-80 uppercase tracking-widest font-medium">
                  Organization is power in this age
                </p>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-10 -right-10 bg-apml-red text-white p-6 rounded-full shadow-2xl flex-col items-center justify-center w-36 h-36 border-[6px] border-white hidden md:flex z-20"
            >
              <span className="text-4xl font-black tracking-tighter">2024</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-90">
                Est. Year
              </span>
            </motion.div>
          </motion.div>

          <div className="lg:w-1/2 about-content">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="about-title text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-8 leading-[1.1]"
            >
              The Silent Force of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-apml-red to-orange-600">
                National Resurgence
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-500 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 font-medium max-w-lg"
            >
              राष्ट्रीय सेवा संघ भारतवर्ष एक वैदिक सनातन धर्म पर आधारित
              राष्ट्रीय, धार्मिक एवं सांस्कृतिक संगठन है, जिसकी स्थापना 28 फरवरी
              2024 (विक्रमी संवत 2081, फाल्गुन कृष्ण चतुर्थी) को भारतवर्ष के
              संत-महात्माओं एवं धर्मगुरुओं के आशीर्वाद से की गई। इस संघ की नींव
              उस पवित्र उद्देश्य के साथ रखी गई है, जिसमें भारत की सनातन परंपरा,
              सांस्कृतिक मूल्यों, और वैदिक जीवन पद्धति की पुनर्स्थापना को केंद्र
              में रखा गया है
            </motion.p>

            <Button className="md:hidden block">About Us</Button>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 values-grid">
              {[
                {
                  icon: Users,
                  color: "text-apml-red",
                  bg: "bg-orange-100",
                  title: "Sangathan",
                  sub: "Uniting Society",
                },
                {
                  icon: Shield,
                  color: "text-blue-600",
                  bg: "bg-blue-100",
                  title: "Sanskar",
                  sub: "Character Building",
                },
                {
                  icon: Heart,
                  color: "text-red-600",
                  bg: "bg-red-100",
                  title: "Seva",
                  sub: "Selfless Service",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="value-card group p-2 sm:p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.bg} ${item.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      strokeWidth={2.5}
                    />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-0.5 sm:mb-1 text-[10px] sm:text-sm uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[8px] sm:text-xs text-gray-500 font-medium leading-tight">
                    {item.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Model
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title=" Rashtriya Seva Sangh - Introduction"
      >
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          <video
            src="/live/video.mp4"
            controls
            autoPlay
            className="w-full h-full object-contain"
            playsInline
          />
        </div>
      </Model>
    </section>
  );
};

export default AboutSection;
