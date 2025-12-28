"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  ArrowRight,
  CircleDashed,
  Search,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { useServiceApi } from "@/module/crm/services/hook";
import { buildMediaUrl } from "@/lib/media";
import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";

const ServicesPage = () => {
  const { services, isLoadingServices } = useServiceApi();

  if (isLoadingServices) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Premium Hero Header */}
      <section className="relative pt-32 pb-20 bg-[#0A0C10] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-primary-400 text-xs font-black uppercase tracking-widest mb-6">
              <CircleDashed size={14} className="animate-spin-slow" />
              Impact & Initiatives
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tighter font-hind">
              How RSS is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                Serving the Nation
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed font-hind">
              From social welfare to crisis management, explore the various
              initiatives led by Rashtriya Seva Sangh in its mission for
              national reconstruction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {services.length === 0 ? (
          <div className="bg-white rounded-[2rem] shadow-xl p-20 text-center border border-gray-100">
            <HeartHandshake className="w-16 h-16 text-primary/20 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              No initiatives found
            </h2>
            <p className="text-gray-500 font-medium">
              We are currently updating our service records. Please check back
              later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/services/${service.id}`}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {service.image ? (
                        <Image
                          src={buildMediaUrl(service.image) || ""}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                          <HeartHandshake className="w-12 h-12 text-primary/20" />
                        </div>
                      )}

                      {/* Icon Overlay */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-primary border border-white/50">
                          {service.icon ? (
                            <Image
                              src={buildMediaUrl(service.icon) || ""}
                              alt="icon"
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                          ) : (
                            <HeartHandshake size={20} />
                          )}
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight font-hind">
                        {service.title}
                      </h3>

                      <div
                        className="text-gray-500 text-sm md:text-base font-medium mb-6 line-clamp-3 leading-relaxed font-hind flex-1"
                        dangerouslySetInnerHTML={{ __html: service.content }}
                      />

                      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-primary font-black uppercase tracking-widest text-[10px] md:text-xs">
                          Learn More
                        </span>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <section className="container mx-auto px-4 mt-32">
        <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/absurd-dad.png')] opacity-10" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-hind">
              Have a suggestion or need support?
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium font-hind">
              We are here to serve. Reach out to our regional coordinators for
              assistance or to contribute to our national initiatives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 rounded-full px-10 h-14 text-sm font-black uppercase tracking-widest"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/donate-now">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-full px-10 h-14 text-sm font-black uppercase tracking-widest"
                >
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
