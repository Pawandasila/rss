"use client";
import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Users,
  Image as ImageIcon,
  CircleDashed,
} from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

import hero01 from "@/assets/hero/hero-01.png";
import hero02 from "@/assets/hero/hero-02.png";
import hero03 from "@/assets/hero/hero-03.png";
import hero04 from "@/assets/hero/hero-04.png";

// Import divine images
import divine01 from "@/assets/live/divine-01.webp";
import divine02 from "@/assets/live/divine-02.webp";
import divine03 from "@/assets/live/divine-03.webp";
import divine04 from "@/assets/live/divine-04.webp";
import divine05 from "@/assets/live/divine-05.webp";
import divine06 from "@/assets/live/divine-06.webp";

const divineImages = [
  divine01,
  divine02,
  divine03,
  divine04,
  divine05,
  divine06,
];

const CARDS = [
  {
    title: "Want to Serve Nation?",
    subtitle: "Join the RSS Movement",
    btn: "Join Now",
    icon: Users,
    img: hero01,
  },
  {
    title: "Support the Cause",
    subtitle: "Contribute to Nation Building",
    btn: "Donate",
    icon: Heart,
    img: hero02,
  },
  {
    title: "RSS Literature",
    subtitle: "Books, Articles & Thoughts",
    btn: "Read More",
    icon: BookOpen,
    img: hero03,
  },
  {
    title: "Gallery & Events",
    subtitle: "Glimpses of recent events",
    btn: "View All",
    icon: ImageIcon,
    img: hero04,
  },
];

const Blog: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          badgeTitle="Take Action"
          badgeIcon={CircleDashed}
          title="Get Involved"
          viewAll="View All Blog"
          viewAllLink="#"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative group overflow-hidden rounded-2xl h-[250px] md:h-[360px] shadow-lg border border-border bg-card"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 opacity-80 group-hover:opacity-100" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="text-white text-sm md:text-xl font-bold leading-tight mb-2"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="text-gray-300 text-xs md:text-sm mb-6 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto"
                >
                  {card.subtitle}
                </motion.p>
                <button className="bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold md:py-3 md:px-6 px-4 py-2 rounded-lg w-fit transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(227,30,36,0.4)]">
                  {card.btn} <ArrowRight size={14} />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 flex flex-col lg:flex-row items-center gap-8 bg-card border border-border p-8 rounded-2xl shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:w-1/3 relative z-10"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-3"
            >
              Latest Updates
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl font-bold text-foreground mb-3"
            >
              Recent Highlights
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-muted-foreground leading-relaxed mb-6"
            >
              Sarsanghchalak Dr. Mohan Bhagwat addressed the gathering at the
              concluding ceremony of the Karyakarta Shivir, emphasizing the role
              of youth in nation building.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
            >
              Read Full Report <ArrowRight size={14} />
            </motion.button>
          </motion.div>

          <div className="lg:w-2/3 w-full overflow-hidden relative group/slider">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {[...[1, 2, 3], ...[1, 2, 3]].map((_, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-64 aspect-video rounded-xl overflow-hidden shadow-md group cursor-pointer"
                >
                  <Image
                    src={divineImages[i % 6]}
                    alt="Event"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="256px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blog;
