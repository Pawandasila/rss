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
    <div className="min-h-screen bg-background py-14">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link href="/press">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              समाचार पर वापस जाएं
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {pressItem.image && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={buildMediaUrl(pressItem.image) || ""}
              alt={pressItem.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
              priority
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="mb-6">
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm px-4 py-1">
            <Newspaper className="w-3.5 h-3.5 mr-1.5" />
            Press Coverage
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {pressItem.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {formatDate(pressItem.published_at)}
          </div>

          {/* External Link */}
          {pressItem.link && (
            <a
              href={pressItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              मूल लेख पढ़ें
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            शेयर करें
          </Button>
          {pressItem.link && (
            <a href={pressItem.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                मूल स्रोत
              </Button>
            </a>
          )}
          <Button variant="outline" size="sm">
            <Facebook className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Twitter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Linkedin className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: pressItem.description }}
        />

        <Separator className="my-12" />

        {/* Related Press Items */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">संबंधित समाचार</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/press/${relatedItem.id}`}
                  className="block group"
                >
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video bg-gray-100">
                      {relatedItem.image ? (
                        <Image
                          src={buildMediaUrl(relatedItem.image) || ""}
                          alt={relatedItem.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Newspaper className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedItem.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(relatedItem.published_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Bottom CTA */}
      <div className="bg-primary/5 border-y py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            अधिक समाचार पढ़ना चाहते हैं?
          </h2>
          <p className="text-muted-foreground mb-6">
            राष्ट्रीय सेवा संघ की सभी मीडिया कवरेज देखें
          </p>
          <Link href="/press">
            <Button size="lg">
              सभी समाचार देखें
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
