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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="block group h-full"
            >
              <div className="flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* 16:9 Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={buildMediaUrl(blog.banner) || ""}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight mb-3 font-hind line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6 font-hind line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {blog.headline}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-primary text-xs md:text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                    <span>Read More</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Blog;
