import React, { useRef } from "react";
import Image from "next/image";
import { Shield, Heart, Users, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

const AboutSection: React.FC = () => {
  return (
    <section className="md:py-24 bg-white relative overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          title="About Us"
          badgeIcon={UserCircle}
          badgeTitle="Who We Are"
          viewAll="About Us"
          viewAllLink="/about"
        />
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative about-image-group"
          >
            <div className="about-image-wrapper relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <Image
                  src="/hero/hero-01.png"
                  alt="RSS Swayamsevaks"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
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
              className="absolute -bottom-10 -right-10 bg-apml-red text-white p-6 rounded-full shadow-2xl flex flex-col items-center justify-center w-36 h-36 border-[6px] border-white hidden md:flex z-20"
            >
              <span className="text-4xl font-black tracking-tighter">1925</span>
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
              Rashtriya Swayamsevak Sangh (RSS) is not just an organization; it
              is a social movement. We forge character, instill patriotism, and
              unite society to build a glorious Bharat.
            </motion.p>

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
    </section>
  );
};

export default AboutSection;
