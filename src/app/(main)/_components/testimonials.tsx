"use client";

import React from "react";
import Image from "next/image";
import { MessageSquareQuote, Quote, MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import SectionHeader from "@/components/common/SectionHeader";

import { useTestimonials } from "@/module/crm/testimonials/hooks/useTestimonials";
import { buildMediaUrl } from "@/lib/media";

interface DisplayTestimonial {
  id: number | string;
  name: string;
  role?: string;
  location?: string;
  content: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const { testimonials, loading } = useTestimonials();

  const displayTestimonials: DisplayTestimonial[] = React.useMemo(() => {
    if (!testimonials || testimonials.length === 0) return [];

    return testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      content: t.content || "",
      image: t.image || "",
    }));
  }, [testimonials]);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (!displayTestimonials || displayTestimonials.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 text-center">
          <SectionHeader
            badgeTitle="Impact"
            badgeIcon={MessageSquareQuote}
            title="Voices of the Community"
            description="Hear from individuals whose lives have been touched by our mission."
          />
          <div className="mt-10 p-10 border-2 border-dashed border-gray-200 rounded-xl bg-white text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">
              No testimonials found at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          badgeTitle="Impact"
          badgeIcon={MessageSquareQuote}
          title="Voices of the Community"
          description="Hear from individuals whose lives have been touched by our mission."
        />

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="pb-16 px-4"
          >
            {displayTestimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-grab active:cursor-grabbing">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-orange-100 group-hover:text-orange-200 transition-colors">
                    <Quote
                      size={48}
                      fill="currentColor"
                      className="opacity-50"
                    />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                      {item.image ? (
                        <Image
                          src={buildMediaUrl(item.image) || ""}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <MessageCircle size={24} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">
                        {item.name}
                      </h4>
                      {item.role && (
                        <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                          {item.role}
                        </p>
                      )}
                      {item.location && (
                        <p className="text-xs text-gray-400">{item.location}</p>
                      )}
                    </div>
                  </div>

                  <div
                    className="text-gray-600 leading-relaxed italic relative z-10"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
