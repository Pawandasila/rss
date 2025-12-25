"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePressCoverage } from "@/module/crm/press/hooks/usePressCoverage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Newspaper,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Tag,
  Award,
  Monitor,
  FileText,
} from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { pressCategories } from "./pressData";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Newspaper":
      return <Newspaper className="w-5 h-5" />;
    case "Magazine":
      return <BookOpen className="w-5 h-5" />;
    case "Digital":
      return <Monitor className="w-5 h-5" />;
    case "Award":
      return <Award className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "newspaper":
      return "bg-blue-100 text-blue-700 hover:bg-blue-200";
    case "magazine":
      return "bg-purple-100 text-purple-700 hover:bg-purple-200";
    case "digital":
      return "bg-green-100 text-green-700 hover:bg-green-200";
    case "award":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "newspaper":
      return "समाचार पत्र";
    case "magazine":
      return "पत्रिका";
    case "digital":
      return "डिजिटल";
    case "award":
      return "पुरस्कार";
    default:
      return category;
  }
};

// Define interface locally or import
interface PressItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishDate: string;
  category: string;
  publication: string;
  tags: string[];
  slug: string;
  featured: boolean;
}

import { buildMediaUrl } from "@/lib/media";

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
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
      category: "newspaper", // Default
      publication: publication,
      tags: [],
      slug: item.id.toString(),
      featured: false,
    };
  });

  const filteredItems =
    selectedCategory === "All"
      ? pressItems
      : pressItems.filter((item) => {
          const categoryMap: { [key: string]: string } = {
            Newspaper: "newspaper",
            Magazine: "magazine",
            Digital: "digital",
            Award: "award",
          };
          return item.category === categoryMap[selectedCategory];
        });

  // Just pick the first item as featured if available
  const latestItem = pressItems.length > 0 ? pressItems[0] : null;

  const categoryStats = {
    total: pressItems.length,
    newspaper: pressItems.filter((item) => item.category === "newspaper")
      .length,
    magazine: pressItems.filter((item) => item.category === "magazine").length,
    digital: pressItems.filter((item) => item.category === "digital").length,
    award: pressItems.filter((item) => item.category === "award").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-20">
        <span className="loading loading-spinner loading-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background mt-10">
      <section className="relative overflow-hidden bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-700">
                  प्रेस कवरेज
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                मीडिया में{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                  हमारी उपस्थिति
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                राष्ट्रीय सेवा संघ की गतिविधियों, उपलब्धियों और प्रभाव पर मीडिया
                कवरेज और पुरस्कार
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {categoryStats.newspaper}
                    </div>
                    <div className="text-sm text-gray-600">समाचार पत्र</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {categoryStats.magazine}
                    </div>
                    <div className="text-sm text-gray-600">पत्रिकाएं</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {categoryStats.award}
                    </div>
                    <div className="text-sm text-gray-600">पुरस्कार</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-3xl blur-3xl"></div>

                <div className="relative space-y-4">
                  <div className="bg-white border shadow-lg rounded-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Newspaper className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          मीडिया कवरेज
                        </div>
                        <div className="text-sm text-gray-600">
                          राष्ट्रीय स्तर
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="bg-white border shadow-lg rounded-2xl p-6 transform -rotate-1 hover:rotate-0 transition-transform ml-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          सम्मान
                        </div>
                        <div className="text-sm text-gray-600">
                          प्रतिष्ठित पुरस्कार
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg"></div>
                      <div className="flex-1 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg"></div>
                      <div className="flex-1 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-lg"></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 border shadow-lg rounded-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform mr-8">
                    <div className="flex items-center justify-between text-white mb-2">
                      <span className="font-semibold">कुल कवरेज</span>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {categoryStats.total}+
                    </div>
                    <div className="text-sm text-blue-100">प्रेस और मीडिया</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {latestItem && (
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full mb-4">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">
                  Featured Coverage
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                विशेष प्रेस कवरेज
              </h2>
            </div>

            <Link href={`/press/${latestItem.slug}`}>
              <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-square md:aspect-auto overflow-hidden">
                    <Image
                      src={latestItem.imageUrl}
                      alt={latestItem.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR_DATA_URL}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <Badge
                      className={`absolute top-6 left-6 ${getCategoryColor(
                        latestItem.category
                      )} font-semibold text-sm px-4 py-1.5 shadow-lg`}
                    >
                      <Tag className="w-3.5 h-3.5 mr-1.5" />
                      {getCategoryLabel(latestItem.category)}
                    </Badge>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
                      {latestItem.title}
                    </h3>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                      {latestItem.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Newspaper className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">
                          {latestItem.publication}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <span>{formatDate(latestItem.publishDate)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {latestItem.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-fit bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-6 py-6 group-hover:shadow-lg transition-all">
                      पूरा पढ़ें
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-12 px-4 bg-white border-y">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {pressCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-5 font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg"
                    : "hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                <span className="mr-2">{getCategoryIcon(category)}</span>
                {category === "All" && "सभी"}
                {category === "Newspaper" && "समाचार पत्र"}
                {category === "Magazine" && "पत्रिकाएं"}
                {category === "Digital" && "डिजिटल"}
                {category === "Award" && "पुरस्कार"}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {selectedCategory === "All"
                ? "सभी प्रेस कवरेज"
                : selectedCategory === "Newspaper"
                ? "समाचार पत्र"
                : selectedCategory === "Magazine"
                ? "पत्रिकाएं"
                : selectedCategory === "Digital"
                ? "डिजिटल मीडिया"
                : "पुरस्कार"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {filteredItems.length} आइटम उपलब्ध हैं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {filteredItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/press/${item.slug}`}
                className="block h-full"
              >
                <article className="group h-full flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={IMAGE_BLUR_DATA_URL}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 z-10">
                      <Badge
                        className={`${getCategoryColor(
                          item.category
                        )} font-semibold shadow-sm backdrop-blur-md bg-opacity-90`}
                      >
                        {getCategoryLabel(item.category)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-5">
                    <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(item.publishDate)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Newspaper className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[120px]">
                          {item.publication}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs font-semibold text-orange-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                कोई प्रेस कवरेज नहीं मिली
              </h3>
              <p className="text-muted-foreground">
                इस श्रेणी में कोई आइटम उपलब्ध नहीं है
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
