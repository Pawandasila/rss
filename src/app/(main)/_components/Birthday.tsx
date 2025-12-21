"use client";
import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BIRTHDAY_STAFF = [
  {
    id: 1,
    name: "Rajesh K. Verma",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sunita Deshpande",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Amitabh Singh",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Prakash Iyer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Neha Kulkarni",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Vikas Malhotra",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Vikas Malhotra",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Vikas Malhotra",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Vikas Malhotra",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Vikas Malhotra",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Vikas Malhotra",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
];

const BirthdaySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

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

  return (
    <section
      className="py-20 bg-white overflow-hidden border-t border-gray-100"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 bday-reveal">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Today's <span className="text-apml-red">Birthdays</span>
            </h2>
            <div className="w-12 h-1 bg-apml-red mt-3 mx-auto md:mx-0 rounded-full"></div>
          </div>

          {/* Subtle Navigation */}
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
        </div>

        {/* Carousel - Minimalist Cards */}
        <div className="bday-reveal">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
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
              768: { slidesPerView: 4 },
              1280: { slidesPerView: 6 },
            }}
            className="!overflow-visible"
          >
            {BIRTHDAY_STAFF.map((staff) => (
              <SwiperSlide key={staff.id}>
                <div className="group text-center">
                  <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500 border border-gray-100">
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    {/* Subtle Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-apml-red transition-colors duration-300 truncate px-2">
                    {staff.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Minimalist Footer */}
        <div className="mt-12 text-center bday-reveal">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">
            Celebrating Our Dedicated Staff
          </p>
        </div>
      </div>
    </section>
  );
};

export default BirthdaySection;
