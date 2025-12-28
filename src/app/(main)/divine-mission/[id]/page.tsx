"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  Users,
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookmarkPlus,
  Eye,
} from "lucide-react";
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
      id: fetchedMission.id,
      title: fetchedMission.title,
      description: fetchedMission.description,
      image: fetchedMission.image
        ? buildMediaUrl(fetchedMission.image) || ""
        : "",
      alt: fetchedMission.title,
      type: "ongoing", // Default
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
      id: m.id,
      title: m.title,
      image: m.image ? buildMediaUrl(m.image) || "" : "",
      alt: m.title,
      type: "ongoing",
      postedDate: new Date(m.created_at).toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      author: { name: "Admin", image: "" },
    }));

  return (
    <div className="min-h-screen bg-gray-50 mt-4 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col justify-center">
              <Badge
                className={`${
                  mission.type === "ongoing"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white mb-4 w-fit`}
              >
                {mission.type === "ongoing" ? (
                  <>
                    <Clock className="w-3 h-3 mr-1" />
                    चल रहा है
                  </>
                ) : (
                  <>
                    <Calendar className="w-3 h-3 mr-1" />
                    आगामी
                  </>
                )}
              </Badge>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {mission.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={mission.author.image}
                      alt={mission.author.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {mission.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900">
                    {mission.author.name}
                  </span>
                </div>

                <span className="text-gray-300">•</span>

                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{mission.postedDate}</span>
                </div>

                <span className="text-gray-300">•</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 hover:bg-gray-50 cursor-pointer hover:text-black"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  शेयर करें
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 hover:bg-gray-50 cursor-pointer hover:text-black"
                  onClick={() => (window.location.href = "/donate-now")}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  सहेजें
                </Button>
              </div>
            </div>

            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src={mission.image}
                alt={mission.alt}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
                priority
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            मिशन के बारे में
          </h2>
          <div className="prose prose-gray max-w-none">
            <div
              className="text-gray-600 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: mission.description }}
            />
            <p className="text-gray-600 leading-relaxed mb-4">
              यह मिशन राष्ट्रीय सेवा संघ के प्रमुख सेवा कार्यक्रमों में से एक
              है। हमारा उद्देश्य समाज के इस महत्वपूर्ण क्षेत्र में सकारात्मक
              परिवर्तन लाना और जरूरतमंदों की मदद करना है।
            </p>
            <p className="text-gray-600 leading-relaxed">
              इस मिशन के माध्यम से हम समाज के विभिन्न वर्गों तक पहुंचते हैं और
              उनके जीवन में सकारात्मक बदलाव लाने का प्रयास करते हैं। संघ के
              समर्पित स्वयंसेवक इस मिशन को सफल बनाने में अपना योगदान देते हैं।
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8 shadow-sm border border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            इस मिशन में शामिल हों
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            आपका योगदान समाज में सकारात्मक बदलाव ला सकता है। हमारे साथ जुड़ें और
            सेवा का हिस्सा बनें।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => (window.location.href = "/donate-now")}
            >
              <Heart className="w-5 h-5" />
              दान करें
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => (window.location.href = "/auth/login")}
            >
              <Users className="w-5 h-5" />
              सदस्य बनें
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">अन्य मिशन</h2>
          {relatedMissions.length === 0 ? (
            <div className="text-sm text-gray-500">
              कोई संबंधित मिशन उपलब्ध नहीं है।
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMissions.map((relatedMission) => (
                <Link
                  key={relatedMission.id}
                  href={`/divine-mission/${relatedMission.id}`}
                  aria-label={`${relatedMission.title} देखें`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                >
                  <div
                    role="article"
                    className="overflow-hidden border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full bg-white"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={relatedMission.image}
                        alt={relatedMission.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={IMAGE_BLUR_DATA_URL}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100" />
                      <Badge
                        className={`${
                          relatedMission.type === "ongoing"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        } text-white absolute left-3 top-3 shadow-md`}
                      >
                        {relatedMission.type === "ongoing"
                          ? "चल रहा है"
                          : "आगामी"}
                      </Badge>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="text-white font-semibold text-base leading-snug line-clamp-2 drop-shadow-sm">
                          {relatedMission.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-[11px] sm:text-xs text-white/90">
                          <Avatar className="w-5 h-5">
                            <AvatarImage
                              src={relatedMission.author.image}
                              alt={relatedMission.author.name}
                            />
                            <AvatarFallback className="bg-white/20 text-white text-[10px]">
                              {relatedMission.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {relatedMission.author.name}
                          </span>
                          <span className="opacity-70">•</span>
                          <span>{relatedMission.postedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionDetailPage;
