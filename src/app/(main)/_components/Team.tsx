"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Quote,
  Linkedin,
  Twitter,
  Plus,
  CircleDashed,
  Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/common/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

import { useLeadership } from "@/module/crm/team/hooks/useLeadership";
import { buildMediaUrl } from "@/lib/media";

interface DisplayTeamMember {
  id: number | string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamSection: React.FC = () => {
  const { members, loading } = useLeadership();

  const displayTeam: DisplayTeamMember[] = React.useMemo(() => {
    if (!members || members.length === 0) return [];

    return members.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.position,
      bio: member.bio || "",
      image: member.photo || "",
    }));
  }, [members]);

  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (loading || displayTeam.length === 0) return;

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
  }, [loading, displayTeam.length]);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 overflow-hidden min-h-[400px] sm:min-h-[600px] lg:min-h-[800px]">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (!displayTeam || displayTeam.length === 0) {
    return (
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <SectionHeader
            badgeTitle="नेतृत्व एवं मार्गदर्शन"
            badgeIcon={CircleDashed}
            title="Our core Team"
            viewAll="View All Members"
            viewAllLink="/team"
          />
          <div className="mt-10 p-10 border-2 border-dashed border-gray-200 rounded-xl bg-white text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">
              No team members found at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-12 sm:py-16 lg:py-24 bg-gray-50 overflow-hidden min-h-[400px] sm:min-h-[600px] lg:min-h-[800px]"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          badgeTitle="नेतृत्व एवं मार्गदर्शन"
          badgeIcon={CircleDashed}
          title="Our core Team"
          viewAll="View All Members"
          viewAllLink="/team"
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
            {displayTeam.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                  <div className="h-[280px] relative overflow-hidden shrink-0">
                    {member.image ? (
                      <Image
                        src={buildMediaUrl(member.image) || ""}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
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
                      <p>{member.bio}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-apml-red transition-colors duration-500"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="team-pagination flex justify-center mt-12 gap-2"></div>
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
