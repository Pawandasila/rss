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
      className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-border pb-4 md:pb-6 gap-4"
    >
      <div className="w-full md:w-auto">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
          <BadgeIcon size={14} /> {badgeTitle}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-muted-foreground max-w-2xl text-sm md:text-base lg:text-lg">
            {description}
          </p>
        )}
        <div className="w-16 h-1 bg-primary mt-3 rounded-full"></div>
      </div>

      {viewAll && (
        <Link
          href={viewAllLink}
          className="flex items-center gap-2 text-xs md:text-sm font-bold text-muted-foreground hover:text-primary transition-colors group px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-primary/5 whitespace-nowrap self-start md:self-auto"
        >
          {viewAll}{" "}
          <ArrowUpRight
            size={16}
            className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      )}
    </motion.div>
  );
};

export default SectionHeader;
