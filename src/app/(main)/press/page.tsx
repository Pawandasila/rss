"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePressCoverage } from "@/module/crm/press/hooks/usePressCoverage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Newspaper,
  ArrowRight,
  FileText,
  ChevronRight,
} from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { buildMediaUrl } from "@/lib/media";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

interface PressItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishDate: string;
  publication: string;
  slug: string;
}

export default function PressPage() {
  const { pressItems: rawPressItems, loading } = usePressCoverage();

  const pressItems: PressItem[] = rawPressItems.map((item) => {
    let publication = "Press";
    try {
      if (item.link) {
        publication = new URL(item.link).hostname.replace("www.", "");
      }
    } catch (e) {
      // ignore
    }

    return {
      id: item.id.toString(),
      title: item.title,
      description: item.description,
      imageUrl: buildMediaUrl(item.image) || "",
      publishDate: item.published_at,
      publication: publication,
      slug: item.id.toString(),
    };
  });

  const latestItem = pressItems.length > 0 ? pressItems[0] : null;
  const recentItems = pressItems.slice(1, 5);
  const allItems = pressItems;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-primary rounded-full" />
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 font-hind tracking-tight">
                  प्रेस कवरेज
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Press Coverage
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold text-gray-900">
                {pressItems.length}
              </span>
              <span>articles</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Featured + Recent Grid */}
      {latestItem && (
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Featured Article - Image ABOVE, Content BELOW */}
              <div className="lg:col-span-8">
                <Link
                  href={`/press/${latestItem.slug}`}
                  className="group block"
                >
                  <article className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Image - Reduced Height */}
                    <div className="relative aspect-[16/9] lg:aspect-[3/1] overflow-hidden">
                      <Image
                        src={latestItem.imageUrl}
                        alt={latestItem.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={IMAGE_BLUR_DATA_URL}
                        priority
                      />
                    </div>

                    {/* Content - Separate section below the image */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <Newspaper className="w-4 h-4 text-primary" />
                          <span>{latestItem.publication}</span>
                        </div>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(latestItem.publishDate)}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 font-hind group-hover:text-primary transition-colors">
                        {latestItem.title}
                      </h2>

                      <div
                        className="text-base text-gray-600 leading-relaxed mb-6 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: latestItem.description,
                        }}
                      />

                      <span className="text-sm font-black text-primary uppercase tracking-widest inline-flex items-center group-hover:gap-2 transition-all">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              </div>

              {/* Recent Articles Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-0.5 bg-primary rounded-full" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
                    Recent
                  </h3>
                </div>
                <div className="space-y-5">
                  {recentItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/press/${item.slug}`}
                      className="group flex gap-4"
                    >
                      <div className="relative size-20 md:size-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        8
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-hind leading-snug mb-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                          <Calendar size={10} />
                          {formatDate(item.publishDate)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="#all-press" className="block pt-4">
                  <Button
                    variant="outline"
                    className="w-full font-bold uppercase tracking-widest text-xs py-5 rounded-xl group"
                  >
                    View All Coverage
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* All Press Grid */}
      <section id="all-press" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900 font-hind">
                All Coverage
              </h2>
            </div>
            <span className="text-sm text-gray-400 font-medium">
              {allItems.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allItems.map((item) => (
              <Link
                key={item.id}
                href={`/press/${item.slug}`}
                className="group block"
              >
                <article className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR_DATA_URL}
                    />
                  </div>

                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      <span>{item.publication}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{formatDate(item.publishDate)}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors font-hind line-clamp-2">
                      {item.title}
                    </h3>

                    <div
                      className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <span className="text-xs font-black text-primary uppercase tracking-widest inline-flex items-center group-hover:gap-2 transition-all">
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {allItems.length === 0 && (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-hind">
                कोई प्रेस कवरेज नहीं मिली
              </h3>
              <p className="text-gray-500">
                इस श्रेणी में कोई आइटम उपलब्ध नहीं है
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
