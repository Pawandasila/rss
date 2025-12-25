import React from "react";
import Image from "next/image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { motion } from "motion/react";

interface PrimaryImageSectionProps {
  image: {
    url: string;
    alt: string;
    // ... other props
  };
}

const PrimaryImageSection: React.FC<PrimaryImageSectionProps> = ({ image }) => {
  return (
    <section className="py-6 sm:py-10 lg:py-12 mt-6 sm:-mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src={image.url}
            alt={image.alt}
            width={2048}
            height={1279}
            className="w-full h-[250px] sm:h-[350px] lg:h-[550px] object-contain"
            priority
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PrimaryImageSection;
