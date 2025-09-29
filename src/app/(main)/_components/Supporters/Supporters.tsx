"use client";

import React from "react";
import Image from "next/image";
import { supporterImages } from "./SupporterInfo";

const Supporters = () => {
  const row1 = supporterImages.slice(0, 4);
  const row2 = supporterImages.slice(4, 8);

  return (
    <section className="py-8 lg:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-xl lg:text-3xl font-medium text-foreground mb-4 lg:mb-8">
            Supported by
          </h2>

          <div className="flex justify-center mb-6 lg:mb-12">
            <div className="w-24 lg:w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          </div>
        </div>

        <div className="space-y-8 lg:space-y-16">
          <div className="flex items-center justify-center gap-6 lg:gap-16">
            {row1.map((supporter) => (
              <div
                key={supporter.id}
                className="flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={supporter.imageUrl}
                  alt={supporter.alt}
                  width={180}
                  height={120}
                  className="object-contain w-16 h-12 lg:w-44 lg:h-28 filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 lg:gap-16">
            {row2.map((supporter) => (
              <div
                key={supporter.id}
                className="flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={supporter.imageUrl}
                  alt={supporter.alt}
                  width={180}
                  height={120}
                  className="object-contain w-16 h-12 lg:w-44 lg:h-28 filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Supporters;
