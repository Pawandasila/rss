"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  ArrowRight,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { useMissionApi } from "@/module/crm/mission/hooks";
import { buildMediaUrl } from "@/lib/media";
import { stripHtml } from "@/lib/utils";
import type { StaticImageData } from "next/image";

interface DisplayMission {
  id: string | number;
  title: string;
  description: string;
  image: string | StaticImageData;
  alt: string;
  postedDate: string;
}

const DivineMissionPage = () => {
  const { missions: dynamicMissions, isLoadingMissions } = useMissionApi();

  const displayMissions: DisplayMission[] = useMemo(() => {
    if (!dynamicMissions) return [];

    return dynamicMissions.map((mission) => ({
      id: mission.id,
      title: mission.title,
      description: mission.description,
      image: mission.image ? buildMediaUrl(mission.image) || "" : "",
      alt: mission.title,
      postedDate: new Date(mission.created_at).toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));
  }, [dynamicMissions]);

  const latestItem = displayMissions.length > 0 ? displayMissions[0] : null;
  const recentItems = displayMissions.slice(1, 5);

  if (isLoadingMissions) {
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
                  दिव्य मिशन
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Divine Mission
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span className="font-bold text-gray-900">
                {displayMissions.length}
              </span>
              <span>missions</span>
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
                  href={`/divine-mission/${latestItem.id}`}
                  className="group block"
                >
                  <article className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Image - Reduced Height */}
                    <div className="relative aspect-[16/9] lg:aspect-[3/1] overflow-hidden">
                      <Image
                        src={latestItem.image}
                        alt={latestItem.alt}
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
                          <Calendar className="w-4 h-4" />
                          <span>{latestItem.postedDate}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 font-hind group-hover:text-primary transition-colors">
                        {latestItem.title}
                      </h2>

                      <p className="text-base text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {stripHtml(latestItem.description)}
                      </p>

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
                      href={`/divine-mission/${item.id}`}
                      className="group flex gap-4"
                    >
                      <div className="relative size-20 md:size-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                        />
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-hind leading-snug mb-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                          <Calendar size={10} />
                          {item.postedDate}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="#all-missions" className="block pt-4">
                  <Button
                    variant="outline"
                    className="w-full font-bold uppercase tracking-widest text-xs py-5 rounded-xl group"
                  >
                    View All Missions
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* All Missions Grid */}
      <section id="all-missions" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-gray-900 font-hind">
                All Missions
              </h2>
            </div>
            <span className="text-sm text-gray-400 font-medium">
              {displayMissions.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayMissions.map((item) => (
              <Link
                key={item.id}
                href={`/divine-mission/${item.id}`}
                className="group block"
              >
                <article className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR_DATA_URL}
                    />
                  </div>

                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      <Calendar size={12} />
                      <span>{item.postedDate}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors font-hind line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {stripHtml(item.description)}
                    </p>

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

          {displayMissions.length === 0 && (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-hind">
                कोई मिशन नहीं मिला
              </h3>
              <p className="text-gray-500">इस समय कोई मिशन उपलब्ध नहीं है</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 font-hind">
            इन मिशनों में शामिल हों
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            आपका छोटा सा योगदान समाज में विशाल सकारात्मक परिवर्तन ला सकता है।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/become-member">
              <Button className="bg-gray-900 hover:bg-primary text-white px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs">
                <Users className="w-4 h-4 mr-2" />
                सदस्य बनें
              </Button>
            </Link>
            <Link href="/donate-now">
              <Button
                variant="outline"
                className="px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs"
              >
                <Heart className="w-4 h-4 mr-2" />
                दान करें
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DivineMissionPage;
