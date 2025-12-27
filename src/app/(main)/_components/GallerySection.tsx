"use client";
import React, { useState } from "react";
import {
  Play,
  Image as ImageIcon,
  Maximize2,
  Plus,
  Film,
  Images,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

import { useImageGallery, useVideoGallery } from "@/module/crm/gallery/hooks";
import { buildMediaUrl } from "@/lib/media";
import Model from "@/components/common/Model";

type TabType = "images" | "videos";

interface DisplayGalleryItem {
  id: number | string;
  type: "image" | "video";
  title: string;
  thumb: string;
  videoSrc?: string;
  size: string;
}

const GallerySection: React.FC = () => {
  const { images, loading: loadingImages } = useImageGallery();
  const { videos, loading: loadingVideos } = useVideoGallery();

  const [activeTab, setActiveTab] = useState<TabType>("images");
  const [selectedItem, setSelectedItem] = useState<DisplayGalleryItem | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const sizes = [
    "tall",
    "wide",
    "small",
    "small",
    "tall",
    "wide",
    "small",
    "small",
  ];

  const displayImages: DisplayGalleryItem[] = React.useMemo(() => {
    if (!images || images.length === 0) return [];

    return images.map((img, index) => ({
      id: `img-${img.id}`,
      type: "image" as const,
      title: img.title,
      thumb: img.image || "",
      size: sizes[index % sizes.length],
    }));
  }, [images]);

  const displayVideos: DisplayGalleryItem[] = React.useMemo(() => {
    if (!videos || videos.length === 0) return [];

    return videos.map((vid, index) => ({
      id: `vid-${vid.id}`,
      type: "video" as const,
      title: vid.title,
      thumb: vid.video_file || "",
      videoSrc: vid.video_file ? vid.video_file : vid.video_url || "",
      size: sizes[index % sizes.length],
    }));
  }, [videos]);

  const currentItems = activeTab === "images" ? displayImages : displayVideos;
  const isLoading = activeTab === "images" ? loadingImages : loadingVideos;

  const openModal = (item: DisplayGalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const goToPrevious = () => {
    if (currentItems.length === 0) return;
    const newIndex =
      selectedIndex === 0 ? currentItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedItem(currentItems[newIndex]);
  };

  const goToNext = () => {
    if (currentItems.length === 0) return;
    const newIndex =
      selectedIndex === currentItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedItem(currentItems[newIndex]);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, selectedIndex, currentItems]);

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

          {/* Tabs for Images / Videos */}
          <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab("images")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                activeTab === "images"
                  ? "bg-apml-red text-white shadow-md shadow-red-200"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white"
              }`}
            >
              <Images size={16} />
              Images
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                activeTab === "videos"
                  ? "bg-apml-red text-white shadow-md shadow-red-200"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white"
              }`}
            >
              <Film size={16} />
              Videos
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && currentItems.length === 0 && (
          <div className="text-center p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
            {activeTab === "images" ? (
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            ) : (
              <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
            )}
            <p className="text-lg font-medium">
              No {activeTab} found at the moment.
            </p>
          </div>
        )}

        {!isLoading && currentItems.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
          >
            <AnimatePresence mode="popLayout">
              {currentItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => openModal(item, index)}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    item.size === "tall"
                      ? "row-span-2"
                      : item.size === "wide"
                      ? "md:col-span-2"
                      : ""
                  }`}
                >
                  <div className="relative w-full h-full">
                    {item.type === "video" ? (
                      <video
                        src={buildMediaUrl(item.videoSrc) || ""}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) =>
                          (e.target as HTMLVideoElement).play()
                        }
                        onMouseOut={(e) => {
                          const video = e.target as HTMLVideoElement;
                          video.pause();
                          video.currentTime = 0;
                        }}
                      />
                    ) : (
                      <Image
                        src={buildMediaUrl(item.thumb) || ""}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
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
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">
                        {item.type === "video"
                          ? "Watch Now"
                          : "View Full Image"}
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
        )}

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

      {/* Modal for Image/Video Preview */}
      <Model
        title={selectedItem?.title || "Preview"}
        isOpen={!!selectedItem}
        onClose={closeModal}
        actionButtons={
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {selectedIndex + 1} / {currentItems.length}
            </span>
          </div>
        }
      >
        <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-black">
          {selectedItem?.type === "video" ? (
            <video
              src={buildMediaUrl(selectedItem.videoSrc) || ""}
              className="max-w-full max-h-[70vh] object-contain"
              controls
              autoPlay
            />
          ) : (
            selectedItem && (
              <Image
                src={buildMediaUrl(selectedItem.thumb) || ""}
                alt={selectedItem.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            )
          )}

          {/* Navigation Arrows */}
          {currentItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all z-10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </Model>
    </section>
  );
};

export default GallerySection;
