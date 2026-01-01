"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  ArrowLeft,
  Share2,
  ExternalLink,
  Newspaper,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  Eye,
} from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import {
  usePressCoverage,
  usePressItem,
} from "@/module/crm/press/hooks/usePressCoverage";
import { buildMediaUrl } from "@/lib/media";
import { stripHtml } from "@/lib/utils";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function PressDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pressId = parseInt(params.id as string);

  const { pressItem, isLoadingItem } = usePressItem(pressId);
  const { pressItems } = usePressCoverage();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const post = useMemo(() => {
    if (!pressItem) return null;
    return {
      ...pressItem,
      content:
        pressItem.press_content?.content ||
        pressItem.description ||
        "<p>विवरण उपलब्ध नहीं है।</p>",
      images: pressItem.images || [],
    };
  }, [pressItem]);

  const recentItems = useMemo(() => {
    if (!pressItems || !post) return [];
    return pressItems.filter((item) => item.id !== post.id).slice(0, 4);
  }, [pressItems, post]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    }
  };

  if (isLoadingItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <Newspaper className="w-16 h-16 text-primary/20 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">समाचार नहीं मिला</h1>
          <Button onClick={() => router.push("/press")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            समाचार पर वापस जाएं
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/press"
              className="hover:text-primary transition-colors"
            >
              Press
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <Badge className="bg-primary text-white text-xs px-4 py-1.5 rounded-full border-none shadow-md">
                <Newspaper className="w-3.5 h-3.5 mr-2" />
                Press Coverage
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.15] font-hind">
                {post.title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed line-clamp-3">
                {stripHtml(post.description)}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Published
                    </p>
                    <p className="font-bold text-gray-900">
                      {formatDate(post.published_at)}
                    </p>
                  </div>
                </div>

                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full text-sm font-bold transition-all group"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Source
                  </a>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                {post.image ? (
                  <Image
                    src={buildMediaUrl(post.image) || ""}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                  />
                ) : (
                  <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                    <Newspaper className="w-16 h-16 text-primary/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="blog-content-container overflow-hidden break-words">
                <style jsx global>{`
                  .blog-content-container p {
                    margin-bottom: 1.75rem;
                    line-height: 1.9;
                    font-family: var(--font-hind), sans-serif;
                    font-size: 1.125rem;
                    color: #374151;
                  }
                  @media (max-width: 768px) {
                    .blog-content-container p {
                      font-size: 1.05rem;
                      line-height: 1.8;
                    }
                  }
                  .blog-content-container strong {
                    color: #111827;
                    font-weight: 700;
                  }
                  .blog-content-container h2 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #111827;
                    margin: 2.5rem 0 1.25rem;
                    font-family: var(--font-hind), sans-serif;
                  }
                  .blog-content-container img {
                    border-radius: 1rem;
                    margin: 2rem 0;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                  }
                  .blog-content-container blockquote {
                    border-left: 4px solid var(--primary);
                    padding: 1.25rem 1.5rem;
                    margin: 2rem 0;
                    background: linear-gradient(135deg, #fff7ed 0%, #fff 100%);
                    border-radius: 0 1rem 1rem 0;
                    font-style: italic;
                  }
                `}</style>
                <div
                  className="prose prose-lg prose-primary max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>

            {/* Gallery Section */}
            {post.images && post.images.length > 0 && (
              <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1.5 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                  <h3 className="text-2xl font-black text-gray-900 font-hind">
                    फोटो गैलरी
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.images.map((img, index) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 group"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={buildMediaUrl(img.image) || ""}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                          <Plus size={24} className="text-gray-900" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl py-5 font-semibold"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-3 text-primary" />
                  Share Article
                </Button>
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl py-5 font-semibold"
                    >
                      <ExternalLink className="w-4 h-4 mr-3 text-primary" />
                      Original Source
                    </Button>
                  </a>
                )}
                <Link href="/press">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl py-5 font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4 mr-3 text-primary" />
                    Back to Press
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <h3 className="text-lg font-black text-gray-900 font-hind">
                  More News
                </h3>
              </div>
              <div className="space-y-5">
                {recentItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/press/${item.id}`}
                    className="group flex gap-4"
                  >
                    <div className="relative size-16 md:size-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                      {item.image ? (
                        <Image
                          src={buildMediaUrl(item.image) || ""}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Newspaper className="w-5 h-5 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-hind leading-snug mb-1.5">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                        <Calendar size={10} className="text-primary" />
                        {formatDate(item.published_at)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/press" className="mt-6 block">
                <Button className="w-full bg-gray-900 hover:bg-primary text-white font-bold uppercase tracking-widest text-xs py-5 rounded-xl transition-all group">
                  View All News
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox Dialog */}
      {post.images && post.images.length > 0 && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95 border-none">
            <DialogHeader>
              <DialogTitle className="sr-only">Image Gallery</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={buildMediaUrl(post.images[lightboxIndex]?.image) || ""}
                alt={`Gallery Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12 backdrop-blur-sm"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === 0 ? post.images.length - 1 : prev - 1
                  )
                }
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12 backdrop-blur-sm"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === post.images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white/90 text-sm font-bold">
                  {lightboxIndex + 1} / {post.images.length}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
