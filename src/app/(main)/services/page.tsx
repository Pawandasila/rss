"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  ArrowRight,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServiceApi } from "@/module/crm/services/hook";
import { buildMediaUrl } from "@/lib/media";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { stripHtml } from "@/lib/utils";
import { format } from "date-fns";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd MMMM yyyy");
};

const ServicesPage = () => {
  const { services, isLoadingServices } = useServiceApi();

  const latestItem = services.length > 0 ? services[0] : null;
  const recentItems = services.slice(1, 5);

  if (isLoadingServices) {
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
                  सेवा क्षेत्र
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Our Services & Initiatives
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold text-gray-900">{services.length}</span>
              <span>initiatives</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Featured + Recent Grid */}
      {latestItem && (
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Featured Article */}
              <div className="lg:col-span-8">
                <Link
                  href={`/services/${latestItem.id}`}
                  className="group block"
                >
                  <article className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Image */}
                    <div className="relative aspect-[16/9] lg:aspect-[3/1] overflow-hidden">
                      {latestItem.image ? (
                        <Image
                          src={buildMediaUrl(latestItem.image) || ""}
                          alt={latestItem.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                          <HeartHandshake className="w-16 h-16 text-primary/20" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(latestItem.created_at)}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 font-hind group-hover:text-primary transition-colors">
                        {latestItem.title}
                      </h2>

                      <p className="text-base text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {stripHtml(latestItem.content)}
                      </p>

                      <span className="text-sm font-black text-primary uppercase tracking-widest inline-flex items-center group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              </div>

              {/* Recent Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-0.5 bg-primary rounded-full" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
                    More Services
                  </h3>
                </div>
                <div className="space-y-5">
                  {recentItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/services/${item.id}`}
                      className="group flex gap-4"
                    >
                      <div className="relative size-20 md:size-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                        {item.image ? (
                          <Image
                            src={buildMediaUrl(item.image) || ""}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                            <HeartHandshake className="w-6 h-6 text-primary/20" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-hind leading-snug mb-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                          <Calendar size={10} />
                          {formatDate(item.created_at)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="#all-services" className="block pt-4">
                  <Button
                    variant="outline"
                    className="w-full font-bold uppercase tracking-widest text-xs py-5 rounded-xl group"
                  >
                    View All Services
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* All Services Grid */}
      <section id="all-services" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900 font-hind">
                All Initiatives
              </h2>
            </div>
            <span className="text-sm text-gray-400 font-medium">
              {services.length} items
            </span>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-hind">
                कोई सेवा नहीं मिली
              </h3>
              <p className="text-gray-500">इस समय कोई सेवा उपलब्ध नहीं है</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="group block"
                >
                  <article className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      {item.image ? (
                        <Image
                          src={buildMediaUrl(item.image) || ""}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                          <HeartHandshake className="w-12 h-12 text-primary/20" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center gap-3 mb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                        <Calendar size={12} />
                        <span>{formatDate(item.created_at)}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors font-hind line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {stripHtml(item.content)}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50">
                        <span className="text-xs font-black text-primary uppercase tracking-widest inline-flex items-center group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-4 font-hind">
            Have a suggestion or need support?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            We are here to serve. Reach out to our regional coordinators for
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-us">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs">
                Contact Us
              </Button>
            </Link>
            <Link href="/donate-now">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs"
              >
                Support Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
