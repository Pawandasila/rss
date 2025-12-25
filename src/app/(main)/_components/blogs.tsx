"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleDashed, FileText } from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";
import { useBlogApi } from "@/module/crm/blog/hook";
import { buildMediaUrl } from "@/lib/media";

const Blog: React.FC = () => {
  const { blogs, isLoadingBlogs } = useBlogApi();

  if (isLoadingBlogs) {
    return (
      <section className="py-20 bg-background">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 text-center">
          <SectionHeader
            badgeTitle="Take Action"
            badgeIcon={CircleDashed}
            title="Get Involved"
            viewAll="View All Blog"
            viewAllLink="/blog"
          />
          <div className="mt-10 p-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">
              No blog posts found at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          badgeTitle="Take Action"
          badgeIcon={CircleDashed}
          title="Get Involved"
          viewAll="View All Blog"
          viewAllLink="/blog"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {blogs.map((blog, index) => {
            return (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative group overflow-hidden rounded-2xl h-[250px] md:h-[360px] shadow-lg border border-border bg-card cursor-pointer"
                >
                  <Image
                    src={buildMediaUrl(blog.banner) || ""}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 opacity-80 group-hover:opacity-100" />

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="text-white text-sm md:text-xl font-bold leading-tight mb-2"
                    >
                      {blog.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="text-gray-300 text-xs md:text-sm mb-6 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto"
                    >
                      {blog.headline}
                    </motion.p>
                    <button className="bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold md:py-3 md:px-6 px-4 py-2 rounded-lg w-fit transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(227,30,36,0.4)]">
                      <span>View blog</span> <ArrowRight size={14} />
                    </button>
                  </motion.div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blog;
