"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ArrowLeft,
  Share2,
  ExternalLink,
  Newspaper,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { usePressCoverage } from "@/module/crm/press/hooks/usePressCoverage";
import { buildMediaUrl } from "@/lib/media";

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

  const { pressItems, loading } = usePressCoverage();

  const pressItem = useMemo(() => {
    if (!pressItems || pressItems.length === 0) return null;
    return pressItems.find((item) => item.id === pressId) || null;
  }, [pressItems, pressId]);

  const relatedItems = useMemo(() => {
    if (!pressItems || !pressItem) return [];
    return pressItems.filter((item) => item.id !== pressItem.id).slice(0, 3);
  }, [pressItems, pressItem]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pressItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Newspaper className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">समाचार नहीं मिला</h1>
          <p className="text-muted-foreground mb-6">
            यह समाचार लेख उपलब्ध नहीं है।
          </p>
          <Button onClick={() => router.push("/press")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            समाचार पर वापस जाएं
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Hero Header */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        {pressItem.image ? (
          <Image
            src={buildMediaUrl(pressItem.image) || ""}
            alt={pressItem.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        ) : (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <Newspaper className="w-20 h-20 text-primary/20" />
          </div>
        )}

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-[5]" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 lg:p-20">
          <div className="max-w-4xl">
            <div className="mb-4">
              <Badge className="bg-primary text-white text-[10px] md:text-sm px-4 py-1.5 rounded-full border-none shadow-xl">
                <Newspaper className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                Press Coverage
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 md:mb-10 font-hind drop-shadow-2xl">
              {pressItem.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8 text-white/95">
              <div className="flex items-center gap-5 text-[11px] md:text-sm font-bold tracking-widest uppercase">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDate(pressItem.published_at)}
                </div>
                {pressItem.link && (
                  <a
                    href={pressItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                    मूल लेख (Original Source)
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-5 py-14 md:py-28">
        <div className="blog-content-container overflow-hidden break-words">
          <style jsx global>{`
            .blog-content-container p {
              margin-bottom: 2rem;
              line-height: 1.9;
              font-family: var(--font-hind), sans-serif;
              font-size: 1.125rem;
              color: #374151;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
            }
            @media (max-width: 768px) {
              .blog-content-container p {
                font-size: 1.05rem;
                line-height: 1.7;
                margin-bottom: 1.25rem;
              }
            }
            .blog-content-container h2,
            .blog-content-container h3,
            .blog-content-container h4 {
              font-family: var(--font-hind), sans-serif;
              color: #111827;
              line-height: 1.3;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .blog-content-container h2 {
              font-size: 1.875rem;
              font-weight: 900;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
            }
            .blog-content-container h3 {
              font-size: 1.5rem;
              font-weight: 800;
              margin-top: 2.5rem;
              margin-bottom: 1.25rem;
            }
            .blog-content-container ul,
            .blog-content-container ol {
              margin-bottom: 2rem;
              padding-left: 1.5rem;
            }
            .blog-content-container li {
              margin-bottom: 0.75rem;
              line-height: 1.8;
              font-family: var(--font-hind), sans-serif;
              color: #4b5563;
              font-size: 1.125rem;
            }
            .blog-content-container img {
              max-width: 100%;
              height: auto;
              border-radius: 1.5rem;
              margin: 3rem 0;
              box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: pressItem.description }} />
        </div>

        {/* Social Share Bar */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-xs">
            Share this news
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Related News Section */}
        {relatedItems.length > 0 && (
          <div className="mt-28">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-black font-hind">
                संबंधित समाचार
              </h2>
              <Link
                href="/press"
                className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
              >
                सभी समाचार देखें
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/press/${item.id}`}
                  className="group block"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300">
                    {item.image ? (
                      <Image
                        src={buildMediaUrl(item.image) || ""}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Newspaper className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors font-hind mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {formatDate(item.published_at)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Footer Navigation */}
      <div className="bg-gray-50/50 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Link href="/press">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              समाचार पेज पर वापस जाएं
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
