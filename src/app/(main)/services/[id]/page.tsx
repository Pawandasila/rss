"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  HeartHandshake,
  ArrowLeft,
  Share2,
  Calendar,
  Images,
  Facebook,
  Twitter,
  Linkedin,
  CircleDashed,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { useServiceApi, useService } from "@/module/crm/services/hook";
import { buildMediaUrl } from "@/lib/media";
import { format } from "date-fns";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "MMMM dd, yyyy");
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = parseInt(params.id as string);

  const { service, isLoadingService } = useService(serviceId);
  const { services, isLoadingServices } = useServiceApi();

  const relatedServices = useMemo(() => {
    if (!services || !service) return [];
    return services.filter((s) => s.id !== service.id).slice(0, 3);
  }, [services, service]);

  if (isLoadingService) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartHandshake className="w-10 h-10 text-primary/40" />
          </div>
          <h1 className="text-2xl font-black mb-4 font-hind">
            सेवा नहीं मिली (Service Not Found)
          </h1>
          <p className="text-gray-500 mb-6 font-medium font-hind">
            यह सेवा रिकॉर्ड उपलब्ध नहीं है।
          </p>
          <Button
            onClick={() => router.push("/services")}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            सभी सेवाओं पर वापस जाएं
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Hero Header */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        {service.image ? (
          <Image
            src={buildMediaUrl(service.image) || ""}
            alt={service.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        ) : (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <Images className="w-20 h-20 text-primary/20" />
          </div>
        )}

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-[5]" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 lg:p-20">
          <div className="max-w-4xl">
            <div className="mb-4">
              <Badge className="bg-primary text-white text-[10px] md:text-sm px-4 py-1.5 rounded-full border-none shadow-xl">
                <HeartHandshake className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                Special Initiative
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 md:mb-10 font-hind drop-shadow-2xl">
              {service.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8 text-white/95">
              <div className="flex items-center gap-5 text-[11px] md:text-sm font-bold tracking-widest uppercase">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDate(service.created_at)}
                </div>
                <div className="flex items-center gap-2">
                  <CircleDashed className="w-4 h-4 text-primary animate-spin-slow" />
                  Active Membership Program
                </div>
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
          <div dangerouslySetInnerHTML={{ __html: service.content }} />
        </div>

        {/* Social Share Bar */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-xs">
            Help spread the mission
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

        {/* Related Services Grid */}
        {relatedServices.length > 0 && (
          <div className="mt-28">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-black font-hind">
                अन्य महत्वपूर्ण सेवाएँ (Other Services)
              </h2>
              <Link
                href="/services"
                className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
              >
                सभी देखें
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
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
                        <HeartHandshake className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors font-hind mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {formatDate(item.created_at)}
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
          <Link href="/services">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              सेवाएं पेज पर वापस जाएं
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
