"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  ArrowLeft,
  Calendar,
  Share2,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { useMissionApi } from "@/module/crm/mission/hooks";
import { buildMediaUrl } from "@/lib/media";

const MissionDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const missionId = parseInt(params.id as string);
  const { mission: fetchedMission, isLoadingMissions: isLoadingMission } =
    useMissionApi(missionId);

  const { missions: allMissions } = useMissionApi();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "मिशन विवरण",
        text: "इस मिशन के बारे में जानें और इसमें शामिल हों!",
        url: window.location.href,
      });
    }
  };

  const mission = useMemo(() => {
    if (!fetchedMission) return null;

    return {
      ...fetchedMission,
      image: buildMediaUrl(fetchedMission.image),
      postedDate: formatDate(fetchedMission.created_at),
      images: (fetchedMission.images || []).map((img) => ({
        ...img,
        url: buildMediaUrl(img.image),
      })),
    };
  }, [fetchedMission]);

  const recentMissions = useMemo(() => {
    if (!allMissions) return [];
    return allMissions
      .filter((m) => m.id !== missionId)
      .slice(0, 5)
      .map((m) => ({
        ...m,
        image: buildMediaUrl(m.image),
        postedDate: formatDate(m.created_at),
      }));
  }, [allMissions, missionId]);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  if (isLoadingMission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">मिशन नहीं मिला</h1>
          <Button onClick={() => router.push("/divine-mission")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            सभी मिशन देखें
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={mission.image!}
          alt={mission.title}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[5]" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 lg:p-24">
          <div className="max-w-6xl mx-auto w-full">
            <Badge className="bg-primary/90 backdrop-blur-md text-white text-[10px] md:text-sm px-4 py-1.5 rounded-full border-none shadow-lg mb-4 md:mb-6">
              दिव्य मिशन
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 md:mb-8 font-hind drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] max-w-5xl">
              {mission.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 md:gap-8 text-white/90">
              <div className="flex items-center gap-2.5 text-sm font-bold">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <span className="opacity-90">{mission.postedDate}</span>
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
                  overflow-wrap: break-word;
                }
                @media (max-width: 768px) {
                  .blog-content-container p {
                    font-size: 1.05rem;
                    line-height: 1.8;
                    margin-bottom: 1.5rem;
                  }
                }
                .blog-content-container strong {
                  color: #111827;
                  font-weight: 800;
                  font-size: 1.1em;
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
                className="prose prose-lg prose-primary max-w-none prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: mission.description }}
              />
            </article>

            {/* Mission Content Sections */}
            {mission.mission_content && mission.mission_content.length > 0 && (
              <div className="mt-16 space-y-12">
                {mission.mission_content.map((content: any) => (
                  <div key={content.id}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-1 bg-primary rounded-full" />
                      <h3 className="text-xl font-black text-gray-900 font-hind">
                        {content.title}
                      </h3>
                    </div>
                    <div
                      className="prose prose-lg prose-primary max-w-none"
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Gallery Section */}
            {mission.images && mission.images.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-1.5 bg-primary rounded-full" />
                  <h3 className="text-2xl font-black text-gray-900 font-hind">
                    फोटो गैलरी
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {mission.images.map((img: any, index: number) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 group"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={img.url}
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
            <div className="mt-20 p-8 md:p-10 bg-gray-900 rounded-[2.5rem] text-center text-white relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
              <h3 className="text-2xl font-black mb-4 font-hind relative z-10">
                इस मिशन में योगदान दें
              </h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
                आपका छोटा सा योगदान समाज में विशाल सकारात्मक परिवर्तन ला सकता
                है।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/donate-now">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs">
                    <Heart className="w-4 h-4 mr-2 fill-current" />
                    दान करें
                  </Button>
                </Link>
                <Link href="/become-member">
                  <Button
                    variant="outline"
                    className="border-white/20 text-black hover:text-white hover:bg-white/10 px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-xs"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    सदस्य बनें
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
                Share Mission
              </h4>
              <Button
                variant="outline"
                className="w-full rounded-xl py-5 font-bold"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share This Mission
              </Button>
            </div>

            {/* Recent Missions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <h3 className="text-xl font-black text-gray-900 font-hind">
                  Other Missions
                </h3>
              </div>
              <div className="space-y-6">
                {recentMissions.map((m) => (
                  <Link
                    key={m.id}
                    href={`/divine-mission/${m.id}`}
                    className="group flex gap-4"
                  >
                    <div className="relative size-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                      <Image
                        src={m.image || ""}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-hind leading-snug mb-2">
                        {m.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                        <Calendar size={10} className="text-primary" />
                        {m.postedDate}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/divine-mission" className="mt-8 block">
                <Button className="w-full bg-gray-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs py-6 rounded-2xl transition-all shadow-lg hover:shadow-primary/20 group">
                  View All Missions
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox Dialog */}
      {mission.images && mission.images.length > 0 && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95 border-none">
            <DialogHeader>
              <DialogTitle className="sr-only">Image Gallery</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={mission.images[activeImageIndex]?.url || ""}
                alt={`Gallery Image ${activeImageIndex + 1}`}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
                onClick={() =>
                  setActiveImageIndex((prev) =>
                    prev === 0 ? mission.images!.length - 1 : prev - 1
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
                  setActiveImageIndex((prev) =>
                    prev === mission.images!.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {mission.images.map((_: any, i: number) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeImageIndex ? "bg-white w-6" : "bg-white/40"
                    }`}
                    onClick={() => setActiveImageIndex(i)}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MissionDetailPage;
