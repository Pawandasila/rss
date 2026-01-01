"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  HeartHandshake,
  ArrowLeft,
  Share2,
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { useServiceApi, useService } from "@/module/crm/services/hook";
import { buildMediaUrl } from "@/lib/media";
import { format } from "date-fns";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd MMMM yyyy");
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = parseInt(params.id as string);

  const { service, isLoadingService } = useService(serviceId);
  const { services } = useServiceApi();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const post = useMemo(() => {
    if (!service) return null;
    return {
      ...service,
      content:
        service.service_content?.content ||
        service.content ||
        "<p>विवरण उपलब्ध नहीं है।</p>",
      images: service.images || [],
    };
  }, [service]);

  const recentServices = useMemo(() => {
    if (!services || !post) return [];
    return services.filter((s) => s.id !== post.id).slice(0, 5);
  }, [services, post]);

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

  if (isLoadingService) {
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
          <HeartHandshake className="w-16 h-16 text-primary/20 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">सेवा नहीं मिली</h1>
          <Button onClick={() => router.push("/services")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            सभी सेवाएं देखें
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        {post.image ? (
          <Image
            src={buildMediaUrl(post.image) || ""}
            alt={post.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        ) : (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <HeartHandshake className="w-20 h-20 text-primary/20" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[5]" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 lg:p-24">
          <div className="max-w-6xl mx-auto w-full">
            <Badge className="bg-primary/90 backdrop-blur-md text-white text-[10px] md:text-sm px-4 py-1.5 rounded-full border-none shadow-lg mb-4 md:mb-6">
              <HeartHandshake className="w-3 md:w-4 h-3 md:h-4 mr-2" />
              सेवा
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 md:mb-8 font-hind drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] max-w-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 md:gap-8 text-white/90">
              <div className="flex items-center gap-2.5 text-sm font-bold">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <span className="opacity-90">
                  {formatDate(post.created_at)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-5 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <article className="blog-content-container overflow-hidden break-words">
              <style jsx global>{`
                .blog-content-container p {
                  margin-bottom: 2rem;
                  line-height: 1.9;
                  font-family: var(--font-hind), sans-serif;
                  font-size: 1.125rem;
                  color: #1f2937;
                }
                @media (max-width: 768px) {
                  .blog-content-container p {
                    font-size: 1.05rem;
                    line-height: 1.8;
                  }
                }
                .blog-content-container strong {
                  color: #111827;
                  font-weight: 800;
                }
                .blog-content-container h2 {
                  font-size: 1.75rem;
                  font-weight: 900;
                  color: #111827;
                  margin: 2.5rem 0 1.5rem;
                  font-family: var(--font-hind), sans-serif;
                }
                .blog-content-container img {
                  border-radius: 1.5rem;
                  margin: 3rem 0;
                  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }
              `}</style>
              <div
                className="prose prose-lg prose-primary max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Gallery Section */}
            {post.images && post.images.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-1.5 bg-primary rounded-full" />
                  <h3 className="text-2xl font-black text-gray-900 font-hind">
                    पहल की झलकियाँ
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {post.images.map((img, index) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 group"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={buildMediaUrl(img.image) || ""}
                        alt={`Gallery ${index}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                        <Plus
                          size={32}
                          className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Card */}
            <div className="mt-20 p-8 md:p-10 bg-primary rounded-[2.5rem] text-center text-white relative overflow-hidden">
              <h3 className="text-2xl font-black mb-4 font-hind relative z-10">
                इस सेवा में योगदान दें
              </h3>
              <p className="text-white/80 mb-8 max-w-xl mx-auto relative z-10">
                आपका छोटा सा योगदान समाज में विशाल सकारात्मक परिवर्तन ला सकता
                है।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/donate-now">
                  <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs">
                    दान करें
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    variant="outline"
                    className="border-white text-primary hover:text-white hover:bg-white/10 px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs"
                  >
                    संपर्क करें
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Share Section */}
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                Share
              </h4>
              <Button
                variant="outline"
                className="w-full rounded-xl py-5 font-bold"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share This Service
              </Button>
            </div>

            {/* Recent Services */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <h3 className="text-xl font-black text-gray-900 font-hind">
                  Other Services
                </h3>
              </div>
              <div className="space-y-6">
                {recentServices.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.id}`}
                    className="group flex gap-4"
                  >
                    <div className="relative size-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                      {s.image ? (
                        <Image
                          src={buildMediaUrl(s.image) || ""}
                          alt={s.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                          <HeartHandshake className="w-6 h-6 text-primary/20" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-hind leading-snug mb-2">
                        {s.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                        <Calendar size={10} className="text-primary" />
                        {formatDate(s.created_at)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/services" className="mt-8 block">
                <Button className="w-full bg-gray-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs py-6 rounded-2xl transition-all shadow-lg hover:shadow-primary/20 group">
                  View All Services
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === post.images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {post.images.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === lightboxIndex ? "bg-white w-6" : "bg-white/40"
                    }`}
                    onClick={() => setLightboxIndex(i)}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
