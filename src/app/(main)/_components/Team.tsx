"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Quote,
  Linkedin,
  Twitter,
  Mail,
  Plus,
  CircleDashed,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/common/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);

import yogiJi from "@/assets/people/yogi_ji.jpg";
import darshanJi from "@/assets/people/darshan.jpg";
import himanshuJi from "@/assets/people/himanshu_joshi.jpg";
import pawanJi from "@/assets/people/pawan_joshi.jpg";
import sunilJi from "@/assets/people/sunil_datt.jpg";
import vedmaniJi from "@/assets/people/vedmani.jpg";
import prashadJi from "@/assets/people/prashad.jpg";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "पू. योगी श्री आदित्यनाथ जी",
    role: "मुख्य प्रेरणा स्रोत",
    image: yogiJi,
  },
  {
    id: 2,
    name: "पू. स्वामी श्री दर्शन भारती जी",
    role: "मुख्य संरक्षक",
    image: darshanJi,
  },
  {
    id: 3,
    name: "श्री हिमांशु जोशी",
    role: "संस्थापक एवं राष्ट्रीय अध्यक्ष",
    image: himanshuJi,
  },
  {
    id: 4,
    name: "श्री पवन जोशी",
    role: "रा. वरिष्ठ उपाध्यक्ष",
    image: pawanJi,
  },
  {
    id: 5,
    name: "श्री सुनील दत्त पंत",
    role: "रा. संगठन मंत्री",
    image: sunilJi,
  },
  {
    id: 6,
    name: "श्री वेदमणि शुक्ला",
    role: "रा. महामंत्री",
    image: vedmaniJi,
  },
  {
    id: 7,
    name: "श्री बी. प्रसाद जोशी",
    role: "रा. सचिव",
    image: prashadJi,
  },
];

const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".team-swiper-container",
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ".team-header",
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          }
        );
      }, sectionRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-24 bg-gray-50 overflow-hidden min-h-[800px]"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          badgeTitle="The Visionaries"
          badgeIcon={CircleDashed}
          title="Key Initiatives"
          viewAll="View All Members"
          viewAllLink="#"
        />

        <div className="team-swiper-container opacity-0 pb-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
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
            pagination={{ clickable: true, el: ".team-pagination" }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!overflow-visible"
          >
            {TEAM_MEMBERS.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                  <div className="h-[280px] relative overflow-hidden shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                    <div className="absolute top-6 right-6 flex flex-col gap-3 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-apml-red hover:border-apml-red transition-all"
                      >
                        <Twitter size={16} />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-apml-red hover:border-apml-red transition-all"
                      >
                        <Linkedin size={16} />
                      </a>
                    </div>
                  </div>

                  <div className="p-8 text-center relative flex-grow flex flex-col">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-apml-red text-white flex items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                      <Quote size={20} fill="currentColor" />
                    </div>

                    <div className="mt-4 flex-grow">
                      <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-apml-red transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                        {member.role}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-apml-red transition-colors duration-500"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="team-pagination flex justify-center mt-12 gap-2"></div>
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 text-gray-400 hover:text-apml-red font-bold uppercase tracking-widest text-xs transition-all group">
            Explore Full Leadership Council
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-apml-red group-hover:text-white group-hover:border-apml-red transition-all">
              <Plus size={16} />
            </div>
          </button>
        </div>
      </div>
      <style>{`
        .team-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          border-radius: 99px;
          transition: all 0.3s ease;
        }
        .team-pagination .swiper-pagination-bullet-active {
          width: 32px;
          background: #E31E24;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
