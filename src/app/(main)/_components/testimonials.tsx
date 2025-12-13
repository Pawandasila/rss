"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  MessageSquareQuote,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import SectionHeader from "@/components/common/SectionHeader";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "The discipline and values I imbibed at the Shakha have been my guiding light. It taught me that service to the nation comes before self.",
    author: "Rajesh Kumar",
    role: "Social Worker",
    location: "Varanasi",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "During the floods, when we had lost all hope, RSS volunteers were the first to arrive with food and medicine. Their selflessness is inspiring.",
    author: "Sunita Devi",
    role: "Teacher",
    location: "Assam",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "RSS is not just an organization; it is a movement of character building. It moulds ordinary men into extraordinary patriots.",
    author: "Dr. Amit Singh",
    role: "Professor",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    quote:
      "The sense of brotherhood and unity I feel here is unmatched. It truly represents the spirit of 'Vasudhaiva Kutumbakam'.",
    author: "Priya Sharma",
    role: "Student",
    location: "Pune",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      className="py-24 bg-gray-50 relative overflow-hidden"
      ref={containerRef}
    >
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
            {TESTIMONIALS.map((item, index) => (
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
                      <Image
                        src={item.image}
                        alt={item.author}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">
                        {item.author}
                      </h4>
                      <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                        {item.role}
                      </p>
                      <p className="text-xs text-gray-400">{item.location}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed italic relative z-10">
                    "{item.quote}"
                  </p>
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
