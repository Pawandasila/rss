"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Cake, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBirthdays } from "@/module/crm/birthday";
import { buildMediaUrl } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);

const BirthdaySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { birthdays, isLoading, isError } = useBirthdays();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bday-reveal",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!isLoading && birthdays.length === 0) {
    return null;
  }

  return (
    <section
      className="py-20 bg-white overflow-hidden border-t border-gray-100"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 bday-reveal">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Cake className="w-6 h-6 text-apml-red" />
              <span className="text-xs font-bold text-apml-red uppercase tracking-wider">
                आज के जन्मदिन
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Today&apos;s <span className="text-apml-red">Birthdays</span>
            </h2>
            <div className="w-12 h-1 bg-apml-red mt-3 mx-auto md:mx-0 rounded-full"></div>
          </div>

          {birthdays.length > 4 && (
            <div className="flex gap-2">
              <button
                ref={prevRef}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-apml-red hover:text-white hover:border-apml-red transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                ref={nextRef}
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-apml-red hover:text-white hover:border-apml-red transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-apml-red"></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12 text-gray-500">
            Unable to load birthdays. Please try again later.
          </div>
        )}

        {/* Carousel */}
        {!isLoading && !isError && birthdays.length > 0 && (
          <div className="bday-reveal">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              loop={birthdays.length > 4}
              autoplay={
                birthdays.length > 4
                  ? { delay: 5000, disableOnInteraction: false }
                  : false
              }
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                768: { slidesPerView: 4 },
                1280: { slidesPerView: 6 },
              }}
              className="!overflow-visible"
            >
              {birthdays.map((person) => (
                <SwiperSlide key={person.id}>
                  <div className="group text-center">
                    <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500 border border-gray-100 bg-gray-50">
                      {person.image ? (
                        <Image
                          src={buildMediaUrl(person.image) || ""}
                          alt={person.name}
                          fill
                          className="object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
                          <User className="w-16 h-16 text-orange-200" />
                        </div>
                      )}
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Birthday Badge */}
                      <div className="absolute top-2 right-2 bg-apml-red text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Cake size={10} />
                        🎂
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-apml-red transition-colors duration-300 truncate px-2">
                      {person.name}
                    </h3>
                    {person.profession && (
                      <p className="text-xs text-gray-500 truncate px-2">
                        {person.profession}
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center bday-reveal">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">
            {birthdays.length > 0
              ? `${birthdays.length} जन्मदिन आज • Celebrating Our Dedicated Members`
              : "Celebrating Our Dedicated Members"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BirthdaySection;
