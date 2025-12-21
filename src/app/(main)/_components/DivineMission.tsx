"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Eye,
  Heart,
  CheckCircle2,
  UserCircle,
  Users,
  Anchor,
} from "lucide-react";
import Image from "next/image";
import hero01 from "@/assets/hero/hero-01.png";
import hero02 from "@/assets/hero/hero-02.png";
import hero03 from "@/assets/hero/hero-03.png";
import hero04 from "@/assets/hero/hero-04.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/common/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const MISSIONS = [
  {
    category: "Ideology",
    title: "Constructive Work",
    description:
      "The Sangh believes that the organized power of the society is the guarantee of national security and prosperity. Through its unique methodology of 'Man Making', RSS moulds individuals who are dedicated to the service of the nation.",
    image: hero01,
    icon: Users,
    cta: "Read Our Constitution",
    tags: ["Cultural Nationalism", "Integral Humanism", "Unity in Diversity"],
  },
  {
    category: "Methodology",
    title: "Man Making",
    description:
      "Shakha is the crucible where swayamsevaks are forged. It is not just physical exercise but a holistic development of personality, instilling discipline, patriotism, and a sense of duty towards society.",
    image: hero02,
    icon: Anchor,
    cta: "Join Shakha",
    tags: ["Character Building", "Discipline", "Physical Fitness"],
  },
  {
    category: "View Point",
    title: "Cultural Nationalism",
    description:
      "We believe that Bharat is not just a political entity but a cultural nation with a continuous history of thousands of years. Our identity is rooted in the values of Dharma and universal brotherhood.",
    image: hero03,
    icon: Eye,
    cta: "Explore Vision",
    tags: ["One Nation", "One People", "One Culture"],
  },
  {
    category: "Social Harmony",
    title: "Samajik Samarasata",
    description:
      "Eradicating caste distinctions and untouchability is a core mission. We strive for a harmonious society where every individual is treated with equal dignity and respect, irrespective of birth or occupation.",
    image: hero04,
    icon: Heart,
    cta: "Seva Activities",
    tags: ["Equality", "Brotherhood", "Justice"],
  },
];

const FeaturesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Animate image change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section className="py-12 md:py-20 bg-gray-50" ref={containerRef}>
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Our Mission"
          badgeIcon={UserCircle}
          badgeTitle="Divine Mission"
          viewAll="view all missions"
          viewAllLink="/"
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          {/* Left Column: Timeline Navigation */}
          <div className="lg:w-1/2 relative">
            {/* Vertical Line - Responsive positioning */}
            <div className="absolute left-[19px] md:left-[23px] top-6 bottom-10 w-0.5 bg-gray-200"></div>

            <div className="space-y-4">
              {MISSIONS.map((mission, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative pl-12 md:pl-16 py-3 md:py-4 cursor-pointer group transition-all duration-300 rounded-2xl ${
                    activeIndex === index
                      ? "bg-white shadow-xl shadow-gray-100 border border-gray-100 scale-[1.01] md:scale-[1.02]"
                      : "border border-transparent hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {/* Icon Marker - Responsive sizing */}
                  <div
                    className={`absolute left-0 top-6 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 transition-all duration-300 z-10 flex items-center justify-center
                                ${
                                  activeIndex === index
                                    ? "bg-apml-red border-red-100 text-white scale-110 shadow-lg"
                                    : "bg-white border-gray-200 text-gray-400 group-hover:border-red-200 group-hover:text-apml-red"
                                }`}
                  >
                    <mission.icon
                      size={18}
                      className="md:w-5 md:h-5"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Title Area */}
                  <div className="flex flex-col pr-2 md:pr-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                        activeIndex === index
                          ? "text-apml-red"
                          : "text-gray-400"
                      }`}
                    >
                      {mission.category}
                    </span>
                    <h3
                      className={`text-lg md:text-xl font-bold transition-colors ${
                        activeIndex === index
                          ? "text-gray-900"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {mission.title}
                    </h3>
                  </div>

                  {/* Collapsible Content */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      activeIndex === index
                        ? "grid-rows-[1fr] opacity-100 mt-3 md:mt-4"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden pr-2 md:pr-4">
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 md:mb-6 border-l-2 border-apml-red pl-3 md:pl-4">
                        {mission.description}
                      </p>

                      {/* Mobile Image (Visible only on small/medium screens) */}
                      <div className="lg:hidden mb-5 rounded-lg overflow-hidden h-40 sm:h-56 w-full shadow-md">
                        <Image
                          src={mission.image}
                          alt={mission.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                        {mission.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold uppercase tracking-wide flex items-center gap-1"
                          >
                            <CheckCircle2 size={10} className="text-apml-red" />{" "}
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className="text-xs font-bold bg-gray-900 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-apml-red transition-all flex items-center gap-2 uppercase tracking-wider shadow-lg w-fit group/btn">
                        {mission.cta}{" "}
                        <ArrowRight
                          size={14}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Image Preview (Desktop Only) */}
          <div className="lg:w-1/2 relative hidden lg:block">
            <div className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-[550px] bg-gray-100">
                {/* Background abstract decoration */}
                <div className="absolute inset-0 bg-gray-900/10 z-0"></div>

                <Image
                  ref={imageRef}
                  src={MISSIONS[activeIndex].image}
                  alt={MISSIONS[activeIndex].title}
                  fill
                  className="absolute inset-0 object-cover z-10"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay Card - "Story Behind It" Style */}
                <div className="absolute bottom-8 right-8 z-20 bg-apml-red text-white p-6 rounded-xl shadow-lg max-w-xs transform rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer group">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80 border-b border-white/20 pb-2">
                    In Focus
                  </div>
                  <div className="text-xl font-bold leading-tight mb-4">
                    {MISSIONS[activeIndex].title}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase">
                      Learn More
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white text-apml-red flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative dashed border behind */}
              <div className="absolute -z-10 -right-5 -bottom-5 w-full h-full border-2 border-dashed border-gray-300 rounded-2xl"></div>
              <div className="absolute -z-10 -left-5 -top-5 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
