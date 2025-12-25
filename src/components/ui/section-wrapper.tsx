"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  viewportAmount?: number | "some" | "all";
}

const SectionWrapper = ({
  children,
  delay = 0,
  className,
  viewportAmount = 0.2,
  ...props
}: SectionWrapperProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
