"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { galleryPageContent, formatDate } from "./gallery";
import { Play, Calendar } from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";

import {
  useImageGallery,
  useVideoGallery,
  useHolyBooks,
} from "@/module/crm/gallery/hooks";
import type {
  ImageGalleryItem,
  VideoGalleryItem,
} from "@/module/crm/gallery/types";
import { buildMediaUrl } from "@/lib/media";

const PDFPageFlip = dynamic(() => import("@/components/PDFPageFlip"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading PDF viewer...</p>
      </div>
    </div>
  ),
});

const GalleryPage = () => {
  const { images, loading: imagesLoading } = useImageGallery();
  const { videos, loading: videosLoading } = useVideoGallery();
  const { holyBooks, loading: booksLoading } = useHolyBooks();

  const [visibleImagesCount, setVisibleImagesCount] = useState(12);
  const [visibleVideosCount, setVisibleVideosCount] = useState(12);

  const [selectedPhoto, setSelectedPhoto] = useState<ImageGalleryItem | null>(
    null
  );
  const [selectedVideo, setSelectedVideo] = useState<VideoGalleryItem | null>(
    null
  );

  const handleLoadMoreImages = () => {
    setVisibleImagesCount((prev) => prev + 12);
  };

  const handleLoadMoreVideos = () => {
    setVisibleVideosCount((prev) => prev + 12);
  };

  return (
    <div className="min-h-screen bg-background pt-10">
      <section className="relative">
        <div className="absolute inset-0 h-[18rem] sm:h-[23rem]">
          <Image
            src={galleryPageContent.heroImage.url}
            alt={galleryPageContent.heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/95" />
        </div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <Badge
              variant="secondary"
              className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs bg-white/20 text-white border-white/30 backdrop-blur"
            >
              📸 फोटो और वीडियो संग्रह
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {galleryPageContent.title}
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto px-2">
            {galleryPageContent.description}
          </p>
        </div>
      </section>

      <section className="py-16 mt-12 sm:mt-20 lg:mt-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-6 sm:mb-8">
              <TabsList className="inline-flex h-10 sm:h-12 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground border">
                <TabsTrigger
                  value="photos"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  📸 <span className="hidden sm:inline ml-1">फोटो गैलरी</span>
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  🎬 <span className="hidden sm:inline ml-1">वीडियो गैलरी</span>
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  📖{" "}
                  <span className="hidden sm:inline ml-1">पवित्र पुस्तकें</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="photos" className="space-y-8 sm:space-y-12">
              {imagesLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="aspect-video bg-gray-200 rounded-xl animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    <AnimatePresence mode="popLayout">
                      {images
                        .slice(0, visibleImagesCount)
                        .map((photo, index) => (
                          <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card
                              className="cursor-pointer bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                              onClick={() => setSelectedPhoto(photo)}
                            >
                              <div className="relative aspect-video p-1">
                                <div className="relative w-full h-full bg-muted rounded-md overflow-hidden">
                                  {photo.image ? (
                                    <Image
                                      src={buildMediaUrl(photo.image)!}
                                      alt={photo.title}
                                      fill
                                      className="object-cover hover:scale-105 transition-transform duration-500"
                                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                      placeholder="blur"
                                      blurDataURL={IMAGE_BLUR_DATA_URL}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                      <span className="text-gray-400">
                                        No Image
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <CardContent className="p-2 sm:p-3 flex-grow flex flex-col justify-between">
                                <figure>
                                  <h3 className="font-semibold text-foreground mb-1.5 sm:mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
                                    {photo.title}
                                  </h3>
                                  {photo.description && (
                                    <figcaption className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
                                      {photo.description}
                                    </figcaption>
                                  )}
                                </figure>
                                <div className="mt-auto flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground flex-wrap">
                                  <div className="flex items-center gap-1 border px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-muted/30">
                                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                                    <span className="font-medium text-[10px] sm:text-xs">
                                      {formatDate(photo.uploaded_at)}
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>

                  {images.length > visibleImagesCount && (
                    <div className="flex justify-center mt-8 sm:mt-12">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleLoadMoreImages}
                        className="rounded-full px-8"
                      >
                        Load More Photos
                      </Button>
                    </div>
                  )}

                  {images.length === 0 && (
                    <div className="text-center py-12 sm:py-16 px-4">
                      <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 opacity-60">
                        📸
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                        कोई फोटो नहीं मिली
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                        अभी तक कोई फोटो अपलोड नहीं की गई है
                      </p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="videos" className="space-y-8 sm:space-y-12">
              {videosLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-video bg-gray-200 rounded-xl animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <AnimatePresence mode="popLayout">
                      {videos
                        .slice(0, visibleVideosCount)
                        .map((video, index) => (
                          <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card
                              className="cursor-pointer bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                              onClick={() => setSelectedVideo(video)}
                            >
                              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                                <div className="relative w-full h-full flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                                  {/* Improved Video Placeholder */}
                                  <div className="flex flex-col items-center justify-center text-muted-foreground group">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                                      <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                                    </div>
                                    <span className="text-xs font-medium">
                                      Click to play
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <CardContent className="p-2.5 sm:p-4 flex-grow flex flex-col justify-between">
                                <figure>
                                  <h3 className="font-semibold text-foreground mb-1.5 sm:mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
                                    {video.title}
                                  </h3>
                                  {video.description && (
                                    <figcaption className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-2 sm:mb-3 leading-relaxed">
                                      {video.description}
                                    </figcaption>
                                  )}
                                </figure>
                                <div className="mt-auto flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground flex-wrap">
                                  <div className="flex items-center gap-1 border px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-muted/30">
                                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                                    <span className="font-medium text-[10px] sm:text-xs">
                                      {formatDate(video.uploaded_at)}
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>

                  {videos.length > visibleVideosCount && (
                    <div className="flex justify-center mt-8 sm:mt-12">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleLoadMoreVideos}
                        className="rounded-full px-8"
                      >
                        Load More Videos
                      </Button>
                    </div>
                  )}

                  {videos.length === 0 && (
                    <div className="text-center py-12 sm:py-16 px-4">
                      <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 opacity-60">
                        🎬
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                        कोई वीडियो नहीं मिला
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                        अभी तक कोई वीडियो अपलोड नहीं किया गया है
                      </p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="books" className="space-y-8 sm:space-y-12">
              {booksLoading ? (
                <div className="flex justify-center h-64 items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="max-w-7xl mx-auto space-y-8">
                  {holyBooks.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 px-4">
                      <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 opacity-60">
                        📖
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                        कोई पवित्र पुस्तक नहीं मिली
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                        अभी तक कोई पुस्तक अपलोड नहीं की गई है
                      </p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {holyBooks.map((book, index) => (
                        <motion.div
                          key={book.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden border rounded-xl mb-8">
                            <div className="p-4 sm:p-6 border-b bg-muted/50">
                              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                                📖 {book.title}
                              </h2>
                              {book.description && (
                                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                                  {book.description}
                                </p>
                              )}
                            </div>

                            <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-b from-background to-muted/20">
                              {/* Only checking if file is PDF for the viewer, otherwise provide a download link or similar */}
                              {book.file.toLowerCase().endsWith(".pdf") ? (
                                <PDFPageFlip
                                  pdfUrl={
                                    book.file.startsWith("data:")
                                      ? book.file
                                      : buildMediaUrl(book.file)!
                                  }
                                  width={600}
                                  height={800}
                                />
                              ) : (
                                <div className="text-center py-10">
                                  <p className="mb-4">
                                    This file format cannot be previewed.
                                  </p>
                                  <Button asChild>
                                    <a
                                      href={buildMediaUrl(book.file)!}
                                      target="_blank"
                                      download
                                    >
                                      Download Book
                                    </a>
                                  </Button>
                                </div>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-5xl w-[calc(100%-2rem)] sm:w-full max-h-[95vh] p-0 bg-background text-foreground border rounded-xl overflow-hidden">
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <DialogHeader className="p-3 sm:p-4 md:p-6 pb-0 border-b">
                <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold text-foreground pr-8">
                  {selectedPhoto.title}
                </DialogTitle>
              </DialogHeader>
              <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                <div className="relative aspect-video mb-4 sm:mb-6 rounded-lg overflow-hidden bg-muted">
                  {selectedPhoto.image && (
                    <Image
                      src={buildMediaUrl(selectedPhoto.image)!}
                      alt={selectedPhoto.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1152px) 100vw, 1152px"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR_DATA_URL}
                    />
                  )}
                </div>
                <figure className="mb-6 sm:mb-8">
                  {selectedPhoto.description && (
                    <figcaption className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                      {selectedPhoto.description}
                    </figcaption>
                  )}
                  <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5 sm:gap-2 border px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-muted/30">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {formatDate(selectedPhoto.uploaded_at)}
                      </span>
                    </div>
                  </div>
                </figure>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-5xl w-[calc(100%-2rem)] sm:w-full max-h-[95vh] p-0 bg-background text-foreground border rounded-xl overflow-hidden">
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <DialogHeader className="p-3 sm:p-4 md:p-6 pb-0 border-b">
                <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold text-foreground pr-8">
                  {selectedVideo.title}
                </DialogTitle>
              </DialogHeader>
              <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                <div className="relative aspect-video mb-4 sm:mb-6 rounded-lg overflow-hidden bg-black">
                  {selectedVideo.type === "url" && selectedVideo.video_url ? (
                    <iframe
                      src={selectedVideo.video_url}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : selectedVideo.video_file ? (
                    <video
                      src={buildMediaUrl(selectedVideo.video_file)!}
                      controls
                      className="w-full h-full"
                      autoPlay
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <p>No video source available</p>
                    </div>
                  )}
                </div>
                <figure className="mb-4">
                  {selectedVideo.description && (
                    <figcaption className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                      {selectedVideo.description}
                    </figcaption>
                  )}
                  <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5 sm:gap-2 border px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-muted/30">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {formatDate(selectedVideo.uploaded_at)}
                      </span>
                    </div>
                  </div>
                </figure>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
