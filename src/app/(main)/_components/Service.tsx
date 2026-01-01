"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, CircleDashed, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

import { useServiceApi } from "@/module/crm/services/hook";
import { buildMediaUrl } from "@/lib/media";

interface DisplayService {
  id: string | number;
  title: string;
  icon: string | any;
  image: string;
  description: string;
  features?: string[];
}

const ServicesSection: React.FC = () => {
  const { services, isLoadingServices } = useServiceApi();

  const displayServices: DisplayService[] = React.useMemo(() => {
    if (!services || services.length === 0) return [];

    return services.map((s) => ({
      id: s.id,
      title: s.title,
      icon: s.icon,
      image: s.image || "",
      description: s.short_content || "",
      features: [],
    }));
  }, [services]);

  const [activeService, setActiveService] = useState<DisplayService | null>(
    null
  );

  useEffect(() => {
    if (displayServices.length > 0) {
      setActiveService(displayServices[0]);
    } else {
      setActiveService(null);
    }
  }, [displayServices]);

  if (isLoadingServices) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!displayServices || displayServices.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="w-full px-4 text-center">
          <SectionHeader
            badgeTitle="Key Initiatives"
            badgeIcon={CircleDashed}
            title="RSS in Service"
            // viewAll="Our services"
            // viewAllLink="#"
          />
          <div className="mt-10 p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
            <HeartHandshake className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">
              No services found at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-background overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10"
      >
        <SectionHeader
          badgeTitle="Key Initiatives"
          badgeIcon={CircleDashed}
          title="RSS in Service"
          // viewAll="View All Services"
          // viewAllLink="#"
        />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Grid Navigation (Changed to 2 cols) */}
          <div className="lg:w-[38%] grid grid-cols-2 gap-4 h-fit content-start">
            {displayServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveService(service)}
                className={`
                        group flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300 border text-center h-full
                        ${
                          activeService?.id === service.id
                            ? "bg-white border-apml-red shadow-lg scale-[1.03] z-10"
                            : "bg-white/60 border-transparent hover:bg-white hover:border-red-100 hover:shadow-md"
                        }
                    `}
              >
                <div
                  className={`
                        p-3 rounded-full mb-3 transition-colors duration-300
                        ${
                          activeService?.id === service.id
                            ? " text-apml-red"
                            : " text-gray-400 group-hover:text-apml-red"
                        }
                    `}
                >
                  {service.icon ? (
                    <Image
                      src={buildMediaUrl(service.icon) || ""}
                      alt={service.title}
                      width={25}
                      height={25}
                      className="object-contain"
                    />
                  ) : (
                    <HeartHandshake
                      size={25}
                      strokeWidth={1.5}
                      className="text-apml-red"
                    />
                  )}
                </div>
                <span
                  className={`block text-[9px] lg:text-xs font-bold uppercase tracking-wider leading-tight ${
                    activeService?.id === service.id
                      ? "text-gray-900"
                      : "text-gray-500 group-hover:text-gray-800"
                  }`}
                >
                  {service.title}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right: Detailed Content Area - Overlapping Layout */}
          <div className="lg:w-[62%] relative">
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService.id}
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Desktop Layout (Grid for overlap) */}
                  <div className="hidden lg:grid grid-cols-12 grid-rows-1 min-h-[500px] items-center">
                    {/* Image (Back) - Spans col 3 to 13 */}
                    <motion.div
                      className="col-start-3 col-end-13 row-start-1 h-full w-full relative rounded-2xl overflow-hidden shadow-2xl z-0 group"
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 20 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute inset-0 w-full h-full"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        {/* Explicitly using buildMediaUrl here */}
                        <Image
                          src={buildMediaUrl(activeService.image) || ""}
                          alt={activeService.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"></div>
                    </motion.div>

                    {/* Content Card (Front) - Spans col 1 to 6 */}
                    <motion.div
                      className="col-start-1 col-end-7 row-start-1 z-10 bg-apml-red text-white p-8 lg:p-10 shadow-[0_20px_50px_rgba(227,30,36,0.3)] min-h-[400px] flex flex-col justify-center relative my-auto rounded-xl backdrop-blur-sm bg-opacity-95 border border-red-400"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="absolute -right-2 top-10 w-4 h-4 bg-apml-red transform rotate-45 z-0"></div>
                      <motion.h3
                        className="text-2xl font-bold mb-4 relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {activeService.title}
                      </motion.h3>
                      <motion.div
                        className="text-white/90 text-sm leading-relaxed mb-6 font-medium relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        dangerouslySetInnerHTML={{
                          __html: activeService.description,
                        }}
                      />

                      <div className="space-y-3 mb-8 relative z-10">
                        {activeService.features?.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 text-white text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                          >
                            <Check
                              size={18}
                              className="text-white mt-0.5 shrink-0"
                              strokeWidth={3}
                            />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <Link href={`/services/${activeService.id}`}>
                        <motion.button
                          className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-apml-red transition-colors w-fit px-6 py-2.5 text-xs font-bold uppercase tracking-wider relative z-10 rounded"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View More Details
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Mobile/Tablet Layout (Stacked) */}
                  <motion.div
                    className="lg:hidden flex flex-col rounded-xl overflow-hidden shadow-lg mt-4 lg:mt-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {/* Explicitly using buildMediaUrl here */}
                      <Image
                        src={buildMediaUrl(activeService.image) || ""}
                        alt={activeService.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                    </div>
                    <div className="bg-apml-red text-white p-8">
                      <h3 className="text-2xl font-bold mb-4">
                        {activeService.title}
                      </h3>
                      <div
                        className="text-white/90 text-sm leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{
                          __html: activeService.description,
                        }}
                      />
                      <div className="space-y-3 mb-8">
                        {activeService.features?.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 text-white text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + idx * 0.1 }}
                          >
                            <Check
                              size={18}
                              className="text-white mt-0.5 shrink-0"
                              strokeWidth={3}
                            />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      <Link href={`/services/${activeService.id}`}>
                        <motion.button
                          className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-apml-red transition-colors w-fit px-6 py-2 text-xs font-bold uppercase tracking-wider rounded"
                          whileTap={{ scale: 0.95 }}
                        >
                          View More
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ServicesSection;
