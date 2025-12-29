"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  Users,
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

  // Fetch all missions for related content
  const { missions: allMissions } = useMissionApi();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "मिशन विवरण",
          text: "इस मिशन के बारे में जानें और इसमें शामिल हों!",
          url: window.location.href,
        })
        .then(() => "साझा किया गया")
        .catch((error) => console.log("साझा करने में त्रुटि:", error));
    } else {
      console.log("शेयरिंग आपके ब्राउज़र द्वारा समर्थित नहीं है।");
    }
  };

  const mission = useMemo(() => {
    if (!fetchedMission) return null;

    return {
      ...fetchedMission,
      image: buildMediaUrl(fetchedMission.image),
      postedDate: new Date(fetchedMission.created_at).toLocaleDateString(
        "hi-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      ),
      author: {
        name: "Admin",
        image: "",
        role: "Administrator",
      },
      images: (fetchedMission.images || []).map((img) => ({
        ...img,
        url: buildMediaUrl(img.image),
      })),
    };
  }, [fetchedMission]);

  if (isLoadingMission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">मिशन नहीं मिला</h1>
          <Button onClick={() => router.push("/divine-mission")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            सभी मिशन देखें
          </Button>
        </div>
      </div>
    );
  }

  const relatedMissions = (allMissions || [])
    .filter((m) => m.id !== mission.id)
    .slice(0, 3)
    .map((m) => ({
      ...m,
      image: buildMediaUrl(m.image),
      postedDate: new Date(m.created_at).toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 transition-all hover:shadow-xl duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            <div className="flex flex-col justify-center">
              <Badge className="bg-primary/10 text-primary border-none mb-6 w-fit px-4 py-1.5 rounded-full shadow-sm font-bold font-hind">
                <Clock className="w-3.5 h-3.5 mr-2" />
                दिव्य मिशन (Divine Mission)
              </Badge>

              <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-slate-900 mb-8 leading-[1.2] font-hind">
                {mission.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-10 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-primary/20 shadow-md">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold font-hind">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 font-hind">
                      प्रबंधक (Admin)
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Author
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{mission.postedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-3 rounded-full hover:bg-gray-50 border-gray-200 font-bold uppercase tracking-tighter text-xs"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  शेयर करें
                </Button>
                <Button
                  size="lg"
                  className="gap-3 rounded-full font-black uppercase tracking-widest text-xs bg-slate-900 hover:bg-slate-800 text-white"
                  onClick={() => (window.location.href = "/donate-now")}
                >
                  <Heart className="w-4 h-4 fill-current text-primary" />
                  सहयोग दें (Donate)
                </Button>
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src={buildMediaUrl(mission.image)!}
                alt={mission.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
                priority
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-20">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-0 opacity-50" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-10 bg-primary rounded-full shadow-lg shadow-primary/20" />
                <h2 className="text-3xl font-black text-slate-900 font-hind">
                  मिशन का विवरण (Mission Overview)
                </h2>
              </div>

              <div className="blog-content-container overflow-hidden break-words">
                <style jsx global>{`
                  .blog-content-container p {
                    margin-bottom: 2rem;
                    line-height: 1.9;
                    font-family: var(--font-hind), sans-serif;
                    font-size: 1.15rem;
                    color: #334155;
                    font-weight: 400;
                  }
                  .blog-content-container blockquote {
                    border-left: 6px solid var(--primary);
                    padding: 2.5rem 3rem;
                    margin: 4rem 0;
                    background: linear-gradient(
                      to right,
                      rgba(var(--primary-rgb), 0.05),
                      #ffffff
                    );
                    border-radius: 0 2rem 2rem 0;
                    font-style: italic;
                    color: #1e293b;
                    font-size: 1.4rem;
                    line-height: 1.8;
                    position: relative;
                  }
                  .blog-content-container blockquote::before {
                    content: "“";
                    position: absolute;
                    top: -20px;
                    left: 20px;
                    font-size: 6rem;
                    color: rgba(var(--primary-rgb), 0.1);
                    font-family: serif;
                  }
                  .blog-content-container ul {
                    margin-bottom: 3rem;
                    padding-left: 1.5rem;
                    list-style: none;
                  }
                  .blog-content-container li {
                    margin-bottom: 1.25rem;
                    line-height: 1.8;
                    font-family: var(--font-hind), sans-serif;
                    color: #475569;
                    font-size: 1.15rem;
                    position: relative;
                    padding-left: 2rem;
                  }
                  .blog-content-container li::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 12px;
                    width: 12px;
                    height: 12px;
                    background: var(--primary);
                    border-radius: 4px;
                    opacity: 0.6;
                  }
                  .blog-content-container strong {
                    color: #0f172a;
                    font-weight: 800;
                  }
                  .blog-content-container h2,
                  .blog-content-container h3 {
                    font-family: var(--font-hind), sans-serif;
                    font-weight: 900;
                    color: #0f172a;
                    margin: 3rem 0 1.5rem 0;
                    line-height: 1.3;
                  }
                  .blog-content-container h2 {
                    font-size: 2.25rem;
                  }
                  .blog-content-container h3 {
                    font-size: 1.75rem;
                  }
                `}</style>
                <div
                  className="prose prose-primary max-w-none mb-10"
                  dangerouslySetInnerHTML={{ __html: mission.description }}
                />

                {mission.mission_content &&
                  mission.mission_content.map((content: any) => (
                    <div key={content.id} className="mt-12 group">
                      <h3 className="text-2xl font-black text-slate-800 mb-6 font-hind flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-primary/40 rounded-full group-hover:bg-primary transition-colors" />
                        {content.title}
                      </h3>
                      <div
                        className="prose prose-slate max-w-none text-slate-600 font-hind leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: content.content }}
                      />
                    </div>
                  ))}
              </div>

              {mission.images && mission.images.length > 0 && (
                <div className="mt-24">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-1 bg-primary/20 rounded-full" />
                    <h2 className="text-2xl font-black text-slate-900 font-hind uppercase tracking-tight">
                      गैलरी (Image Gallery)
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {mission.images.map((img: any, index: number) => (
                      <Dialog key={img.id}>
                        <DialogTrigger asChild>
                          <div
                            className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border-4 border-white"
                            onClick={() => setActiveImageIndex(index)}
                          >
                            <Image
                              src={img.url}
                              alt={`Mission ${mission.title}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize2 className="text-white w-8 h-8 scale-75 group-hover:scale-100 transition-transform duration-500" />
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
                          <DialogHeader>
                            <DialogTitle className="sr-only">
                              Image Gallery View
                            </DialogTitle>
                          </DialogHeader>
                          <div className="relative aspect-[16/10] w-full">
                            <Image
                              src={
                                buildMediaUrl(
                                  mission.images[activeImageIndex].url
                                )!
                              }
                              alt="Gallery Preview"
                              fill
                              className="object-contain"
                            />
                            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                              {mission.images.map((_: any, i: number) => (
                                <button
                                  key={i}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    i === activeImageIndex
                                      ? "bg-white w-6"
                                      : "bg-white/40"
                                  }`}
                                  onClick={() => setActiveImageIndex(i)}
                                />
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                              onClick={() =>
                                setActiveImageIndex((prev) =>
                                  prev === 0
                                    ? mission.images!.length - 1
                                    : prev - 1
                                )
                              }
                            >
                              <ChevronLeft className="w-8 h-8" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-12 w-12"
                              onClick={() =>
                                setActiveImageIndex((prev) =>
                                  prev === mission.images!.length - 1
                                    ? 0
                                    : prev + 1
                                )
                              }
                            >
                              <ChevronRight className="w-8 h-8" />
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 shadow-2xl text-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge className="bg-primary/20 text-primary border-none mb-6 px-4 py-1.5 rounded-full font-bold font-hind">
                योगदान दें (Contribute)
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black mb-6 font-hind tracking-tight leading-tight text-white">
                इस पावन मिशन में हाथ बटाएं
              </h2>
              <p className="text-slate-400 mb-12 text-lg md:text-xl font-hind leading-relaxed">
                आपका छोटा सा योगदान समाज में विशाल सकारात्मक परिवर्तन ला सकता
                है। हमारे साथ जुड़ें और सेवा की इस अनूठी यात्रा का हिस्सा बनें।
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button
                  onClick={() => (window.location.href = "/donate-now")}
                  className="bg-primary hover:bg-primary/90 text-white transition-all px-10 py-7 rounded-full font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  दान करें (Donate Now)
                </Button>

                <Button
                  onClick={() => (window.location.href = "/auth/login")}
                  variant="outline"
                  className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 transition-all px-10 py-7 rounded-full font-black uppercase tracking-widest text-sm backdrop-blur-sm flex items-center justify-center gap-3"
                >
                  <Users className="w-5 h-5" />
                  सदस्य बनें
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-slate-200 rounded-full" />
                <h2 className="text-3xl font-black text-slate-900 font-hind">
                  अन्य दिव्य मिशन (Other Missions)
                </h2>
              </div>
              <Link
                href="/divine-mission"
                className="text-primary font-bold text-sm uppercase tracking-widest hover:underline flex items-center gap-2 group"
              >
                सभी अभियान देखें
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {relatedMissions.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem] text-gray-400 font-hind italic">
                कोई संबंधित मिशन इस समय उपलब्ध नहीं है।
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedMissions.map((relatedMission) => (
                  <Link
                    key={relatedMission.id}
                    href={`/divine-mission/${relatedMission.id}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col group/card">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={buildMediaUrl(relatedMission.image)!}
                          alt={relatedMission.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity" />
                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover/card:translate-y-0 transition-transform">
                          <h3 className="text-white font-black text-lg leading-tight line-clamp-2 drop-shadow-xl font-hind">
                            {relatedMission.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400 font-bold uppercase tracking-widest text-[9px]">
                          <div className="flex items-center gap-2">
                            <Calendar size={12} className="text-primary" />
                            <span>{relatedMission.postedDate}</span>
                          </div>
                          <span className="text-primary opacity-0 group-hover/card:opacity-100 transition-opacity inline-flex items-center gap-1">
                            देखें <ArrowLeft className="w-3 h-3 rotate-180" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-20 text-center">
          <Link href="/divine-mission">
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-primary transition-colors gap-2 font-bold uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              सभी मिशनों की सूची
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailPage;
