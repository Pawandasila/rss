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
import birthdayFrame from "@/assets/birthday/frame.png";
import { format } from "date-fns";
import { hi } from "date-fns/locale";
import SectionHeader from "@/components/common/SectionHeader";

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
      className="py-16 md:py-24 overflow-hidden border-t border-orange-100"
      ref={sectionRef}
    >
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <SectionHeader
          badgeTitle="आज के जन्मदिन"
          badgeIcon={Cake}
          title="Today's Birthdays"
          description="Celebrate and congratulate our dedicated members on their special day."
        />

        <div className="relative mb-12 flex justify-end gap-3 px-4">
          {birthdays.length > 2 && (
            <>
              <button
                ref={prevRef}
                className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                ref={nextRef}
                className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </>
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
              spaceBetween={20}
              slidesPerView={1}
              loop={birthdays.length > 1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
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
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 2 },
              }}
              className="!overflow-visible max-w-5xl mx-auto"
            >
              {birthdays.map((person) => (
                <SwiperSlide key={person.id}>
                  <div className="relative w-full max-w-lg mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl group border border-orange-100/50">
                    {/* Background Frame */}
                    <Image
                      src={birthdayFrame}
                      alt="Birthday Frame"
                      fill
                      className="object-fill"
                      priority
                    />

                    {/* User Photo Overlay */}
                    <div className="absolute top-[19.8%] left-[32.6%] w-[34.8%] h-[36.8%] overflow-hidden rounded-[1.5rem] bg-gray-50">
                      {person.image ? (
                        <Image
                          src={buildMediaUrl(person.image) || ""}
                          alt={person.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <User className="w-1/2 h-1/2 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* User Name Overlay - Below Photo */}
                    <div className="absolute top-[55.5%] left-0 w-full h-[8%] flex items-center justify-center px-4 z-20">
                      <h3 className="text-[14px] sm:text-base md:text-lg lg:text-xl xl:text-3xl font-black text-blue-900 tracking-tight leading-normal font-hind truncate drop-shadow-sm">
                        {person.name}
                      </h3>
                    </div>

                    {/* Registration Number Value - Next to "पंजी सं :" */}
                    <div className="absolute bottom-[11.5%] left-[25.5%] w-[25%] z-10">
                      <p className="text-[10px] sm:text-lg md:text-xl font-black text-gray-800 font-hind">
                        {person.user_id || "N/A"}
                      </p>
                    </div>

                    {/* Birthday Date Value - Next to "जन्मदिन :" */}
                    <div className="absolute bottom-[11.5%] left-[66%] w-[25%] z-10">
                      <p className="text-[10px] sm:text-lg md:text-xl font-black text-gray-800 font-hind">
                        {format(new Date(person.dob), "dd MMMM", {
                          locale: hi,
                        })}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center bday-reveal">
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
