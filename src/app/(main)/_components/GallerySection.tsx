"use client";
import React, { useState } from "react";
import { Play, Image as ImageIcon, Maximize2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const CATEGORIES = ["All", "Seva", "Shakha", "Events", "Youth"];

const GALLERY_ITEMS = [
  {
    id: 1,
    type: "image",
    category: "Seva",
    title: "Flood Relief Operations",
    thumb:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: 2,
    type: "video",
    category: "Events",
    title: "Vijayadashami Utsav 2023",
    thumb:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    size: "wide",
  },
  {
    id: 3,
    type: "image",
    category: "Shakha",
    title: "Morning Drill Session",
    thumb:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    size: "small",
  },
  {
    id: 4,
    type: "image",
    category: "Youth",
    title: "Leadership Workshop",
    thumb:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: 5,
    type: "video",
    category: "Seva",
    title: "Medical Camp Documentary",
    thumb:
      "https://images.unsplash.com/photo-1584515606963-27265f78eeee?q=80&w=800&auto=format&fit=crop",
    size: "small",
  },
  {
    id: 6,
    type: "video",
    category: "Seva",
    title: "Medical Camp Documentary",
    thumb:
      "https://images.unsplash.com/photo-1584515606963-27265f78eeee?q=80&w=800&auto=format&fit=crop",
    size: "small",
  },
  {
    id: 7,
    type: "image",
    category: "Events",
    title: "National Integration Day",
    thumb:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=800&auto=format&fit=crop",
    size: "wide",
  },
  {
    id: 8,
    type: "video",
    category: "Seva",
    title: "Medical Camp Documentary",
    thumb:
      "https://images.unsplash.com/photo-1584515606963-27265f78eeee?q=80&w=800&auto=format&fit=crop",
    size: "small",
  },
];

const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const filteredItems =
    filter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center md:text-left">
            <span className="text-apml-red font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100 mb-3 inline-block">
              Visual Chronicles
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900">
              Media Gallery
            </h2>
            <div className="w-16 h-1 bg-apml-red mt-2 rounded hidden md:block"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200 shadow-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                  filter === cat
                    ? "bg-apml-red text-white shadow-md shadow-red-200"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  item.size === "tall"
                    ? "row-span-2"
                    : item.size === "wide"
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                <div className="absolute top-4 right-4 z-10">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    {item.type === "video" ? (
                      <Play size={18} fill="currentColor" />
                    ) : (
                      <ImageIcon size={18} />
                    )}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-bold text-apml-red bg-white px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">
                      {item.type === "video" ? "Watch Now" : "View Full Image"}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-apml-red flex items-center justify-center text-white">
                      <Plus size={14} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border-0 group-hover:border-[12px] border-white/10 transition-all duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-apml-red transition-all shadow-xl hover:shadow-red-200 group">
            Visit Official Archive
            <Maximize2
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
          <p className="mt-4 text-gray-400 text-xs font-medium">
            Over 5,000+ high-quality media assets available for download
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
