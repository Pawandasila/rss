"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowUpRight, Newspaper } from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

const ARTICLES = [
  {
    id: 1,
    source: "The Times of India",
    date: "12 Oct 2023",
    title: "RSS volunteers lead massive cleanliness drive across 500 cities",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    category: "Social Service",
  },
  {
    id: 2,
    source: "Hindustan Times",
    date: "28 Sep 2023",
    title:
      "Sarkaryavah highlights the importance of family values in modern era",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop",
    category: "Culture",
  },
  {
    id: 3,
    source: "The Hindu",
    date: "15 Aug 2023",
    title: "Independence Day celebrated with pomp at Nagpur headquarters",
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=600&auto=format&fit=crop",
    category: "National",
  },
  {
    id: 4,
    source: "Dainik Jagran",
    date: "05 Jul 2023",
    title: "New hostels inaugurated for tribal students in remote districts",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    category: "Education",
  },
];

const PressSection: React.FC = () => {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <SectionHeader
          badgeTitle="Press"
          badgeIcon={Newspaper}
          title="RSS in the Press"
          viewAll="View all News"
          viewAllLink="#"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                  {article.category}
                </div>

                {/* Source Label */}
                <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm border-l-2 border-primary">
                  {article.source}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium">
                  <Calendar size={12} className="text-primary" />
                  <span>{article.date}</span>
                </div>

                <h3 className="text-sm font-bold text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {article.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Read Article</span>
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider border border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
            View Archive <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
