"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowUpRight, Newspaper } from "lucide-react";
import { motion } from "motion/react";
import { usePressCoverage } from "@/module/crm/press/hooks/usePressCoverage";
import { buildMediaUrl } from "@/lib/media";
import SectionHeader from "@/components/common/SectionHeader";
import { useRouter } from "next/navigation";

interface DisplayPressArticle {
  id: number | string;
  source?: string;
  date: string;
  title: string;
  image: string;
  category?: string;
}

const PressSection = () => {
  const { pressItems, loading } = usePressCoverage();
  const router = useRouter();

  const displayArticles: DisplayPressArticle[] = React.useMemo(() => {
    if (!pressItems || pressItems.length === 0) return [];

    return pressItems.map((article) => ({
      id: article.id,
      date: article.published_at,
      title: article.title,
      image: article.image || "",
    }));
  }, [pressItems]);

  if (loading) {
    return (
      <section className="py-24 bg-background border-t border-border">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (!displayArticles || displayArticles.length === 0) {
    return (
      <section className="py-24 bg-background border-t border-border">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 text-center">
          <SectionHeader
            badgeTitle="Press"
            badgeIcon={Newspaper}
            title="RSS in the Press"
            viewAll="View all News"
            viewAllLink="/press"
          />
          <div className="mt-10 p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">
              No press coverage found at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <SectionHeader
          badgeTitle="Press"
          badgeIcon={Newspaper}
          title="RSS In The News"
          viewAll="View all News"
          viewAllLink="/press"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayArticles.map((article, index) => (
            <motion.article
              onClick={() => router.push(`/press/${article.id}`)}
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col h-full cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                {article.image ? (
                  <Image
                    src={buildMediaUrl(article.image) || ""}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {article.category && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                    {article.category}
                  </div>
                )}

                {article.source && (
                  <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm border-l-2 border-primary">
                    {article.source}
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium">
                  <Calendar size={12} className="text-primary" />
                  <span>{article.date}</span>
                </div>

                <h3 className="text-sm font-bold text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {article.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Read Article</span>
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider border border-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
            View Archive <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
