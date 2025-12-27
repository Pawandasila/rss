import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import Link from "next/link";

export interface SectionHeaderProps {
  badgeTitle: string;
  badgeIcon: LucideIcon;
  title: string;
  description?: string;
  viewAll?: string;
  viewAllLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeTitle,
  badgeIcon: BadgeIcon,
  title,
  description,
  viewAll,
  viewAllLink = "#",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-8 md:mb-12 border-b border-border pb-4 md:pb-6 text-left"
    >
      {/* Top row: Badge + View All Link */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <BadgeIcon size={14} /> {badgeTitle}
        </div>
        {(viewAll as string) && (
          <Link
            href={viewAllLink}
            className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-muted-foreground hover:text-primary transition-colors group px-2 py-1 md:px-3 md:py-1.5 rounded-lg hover:bg-primary/5 whitespace-nowrap"
          >
            {viewAll}{" "}
            <ArrowUpRight
              size={14}
              className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        )}
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-3 text-muted-foreground max-w-2xl text-sm md:text-base lg:text-lg">
          {description}
        </p>
      )}

      {/* Underline */}
      <div className="w-16 h-1 bg-primary mt-3 rounded-full"></div>
    </motion.div>
  );
};

export default SectionHeader;
