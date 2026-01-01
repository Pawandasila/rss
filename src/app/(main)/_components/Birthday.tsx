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
                  <div className="relative w-full max-w-lg mx-auto aspect-[4/5] lg:aspect-[5/5] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-orange-200/50 bg-gradient-to-b from-orange-50 to-white">
                    {/* Premium Background Frame */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent opacity-60" />

                    <div className="absolute top-0 inset-x-0 h-24 lg:h-20 bg-gradient-to-b from-orange-500/10 to-transparent" />
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-700" />

                    {/* Content Container */}
                    <div className="relative h-full flex flex-col items-center pt-8 lg:pt-6 pb-6 lg:pb-4 px-6">
                      {/* Badge / Header */}
                      <div className="mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] font-hind">
                          जन्मदिन की शुभकामनाएँ
                        </span>
                      </div>

                      {/* User Photo with Double Border Frame */}
                      <div className="relative group/photo">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary via-orange-300 to-primary/40 rounded-full opacity-20 group-hover/photo:opacity-40 transition-opacity duration-500 blur-sm" />
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-primary/30 to-orange-200 border border-white shadow-xl overflow-hidden">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                            {person.image ? (
                              <Image
                                src={buildMediaUrl(person.image) || ""}
                                alt={person.name}
                                fill
                                className="object-cover group-hover/photo:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-orange-200">
                                <User size={80} strokeWidth={1} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Decorative Icon */}
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg border border-orange-100 flex items-center justify-center text-primary animate-bounce duration-[3000ms]">
                          <Cake size={24} />
                        </div>
                      </div>

                      {/* Information Section */}
                      <div className="mt-8 text-center space-y-4 w-full">
                        <div className="space-y-1">
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-hind tracking-tight">
                            {person.name}
                          </h3>
                          <div className="h-1 w-12 bg-primary/20 mx-auto rounded-full" />
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-orange-100/50 shadow-sm">
                            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 font-hind">
                              पंजी सं :
                            </span>
                            <span className="text-sm sm:text-base font-bold text-slate-700 font-hind">
                              {person.user_id || "N/A"}
                            </span>
                          </div>

                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-orange-100/50 shadow-sm">
                            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 font-hind">
                              जन्मदिन :
                            </span>
                            <span className="text-sm sm:text-base font-bold text-slate-700 font-hind">
                              {format(new Date(person.dob), "dd MMMM", {
                                locale: hi,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Corner Decorations */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />
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
