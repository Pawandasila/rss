"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  BookmarkPlus,
  Tag,
  User,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Images,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { useBlog, useBlogApi } from "@/module/crm/blog/hook";
import { buildMediaUrl } from "@/lib/media";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = parseInt(params.id as string);

  const { blog, isLoading: isLoadingBlog } = useBlog(blogId);
  const { blogs: allBlogs } = useBlogApi();

  // Lightbox state for gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const post = useMemo(() => {
    if (!blog) return null;
    return {
      id: blog.id,
      title: blog.title || "",
      image: blog.banner ? buildMediaUrl(blog.banner) || "" : "",
      category: blog.category || "General",
      date: blog.timestamp || "",
      readTime: "5 min read",
      author: {
        name: blog.author || "Admin",
        role: "Contributor",
        image: "",
      },
      content: blog.content?.content || "<p>No content available.</p>",
      excerpt: blog.headline || "",
      images: blog.images || [],
      facebook_link: blog.facebook_link || null,
      twitter_link: blog.twitter_link || null,
      instagram_link: blog.instagram_link || null,
      featured: blog.featured || false,
    };
  }, [blog]);

  const relatedPosts = useMemo(() => {
    if (!allBlogs || !post) return [];
    return allBlogs
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        title: p.title,
        image: p.banner ? buildMediaUrl(p.banner) || "" : "",
        category: p.category || "General",
        date: p.timestamp,
      }));
  }, [allBlogs, post]);

  const hasSocialLinks =
    post?.facebook_link || post?.twitter_link || post?.instagram_link;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    if (post?.images) {
      setLightboxIndex((prev) => (prev + 1) % post.images.length);
    }
  };

  const prevImage = () => {
    if (post?.images) {
      setLightboxIndex(
        (prev) => (prev - 1 + post.images.length) % post.images.length
      );
    }
  };

  if (isLoadingBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">लेख नहीं मिला</h1>
          <Button onClick={() => router.push("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            ब्लॉग पर वापस जाएं
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        ) : (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <Images className="w-20 h-20 text-primary/20" />
          </div>
        )}

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[5]" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 lg:p-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-4 md:mb-6">
              <Badge className="bg-primary/90 backdrop-blur-md text-white text-[10px] md:text-sm px-4 py-1.5 rounded-full border-none shadow-lg">
                <Tag className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                {post.category}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 md:mb-12 font-hind drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] max-w-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 md:gap-10 text-white/90">
              <div className="flex items-center gap-4 group cursor-pointer">
                <Avatar className="w-12 h-12 md:w-16 md:h-16 border-2 border-primary/50 shadow-2xl transition-transform group-hover:scale-110 duration-300">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback className="bg-primary text-white text-base md:text-xl font-bold">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-extrabold text-sm md:text-xl tracking-tight leading-none mb-1.5">
                    {post.author.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] font-black opacity-70">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-10 w-px bg-white/30 hidden sm:block" />

              <div className="flex items-center gap-8 text-[11px] md:text-sm font-black tracking-widest uppercase">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <span className="opacity-90">{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="opacity-90">{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {post.excerpt && (
              <div className="relative mb-12 md:mb-16">
                <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-primary rounded-full" />
                <p className="text-xl md:text-2xl text-gray-800 font-hind font-bold leading-relaxed pl-6 italic">
                  {post.excerpt}
                </p>
              </div>
            )}

            <article className="blog-content-container overflow-hidden break-words">
              <style jsx global>{`
                .blog-content-container p {
                  margin-bottom: 2rem;
                  line-height: 1.9;
                  font-family: var(--font-hind), sans-serif;
                  font-size: 1.125rem;
                  color: #1f2937;
                  overflow-wrap: break-word;
                }
                @media (max-width: 768px) {
                  .blog-content-container p {
                    font-size: 1.05rem;
                    line-height: 1.8;
                    margin-bottom: 1.5rem;
                  }
                }
                .blog-content-container strong {
                  color: #111827;
                  font-weight: 800;
                  font-size: 1.1em;
                }
                .blog-content-container h2 {
                  font-size: 1.75rem;
                  font-weight: 900;
                  color: #111827;
                  margin: 2.5rem 0 1.5rem;
                  font-family: var(--font-hind), sans-serif;
                }
                .blog-content-container img {
                  border-radius: 1.5rem;
                  margin: 3rem 0;
                  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }
              `}</style>
              <div
                className="prose prose-lg prose-primary max-w-none prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Gallery Section */}
            {post.images && post.images.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-1.5 bg-primary rounded-full" />
                  <h3 className="text-2xl font-black text-gray-900 font-hind">
                    फोटो गैलरी
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {post.images.map((img, index) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 group"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={buildMediaUrl(img.image) || ""}
                        alt={`Gallery ${index}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                        <Plus
                          size={32}
                          className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Card */}
            <div className="mt-20 p-8 md:p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0" />
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 relative z-10">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-2xl">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback className="bg-primary text-white text-3xl font-black">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-2xl font-black text-gray-900 mb-2 font-hind">
                    {post.author.name}
                  </h4>
                  <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4">
                    {post.author.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed font-hind text-base">
                    राष्ट्रीय सेवा संघ के समर्पित सदस्य और लेखक। समाज सेवा और
                    राष्ट्र निर्माण में सक्रिय योगदान देने हेतु संकल्पित। सनातन
                    धर्म एवं संस्कृति के प्रचार-प्रसार में संलग्न।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Social Share Sticky */}
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                Share Story
              </h4>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl hover:bg-blue-600 hover:text-white transition-all size-11 shadow-sm"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl hover:bg-sky-500 hover:text-white transition-all size-11 shadow-sm"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl hover:bg-green-600 hover:text-white transition-all size-11 shadow-sm"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Recent Posts - News Style */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <h3 className="text-xl font-black text-gray-900 font-hind">
                  Recent Posts
                </h3>
              </div>
              <div className="space-y-6">
                {allBlogs
                  ?.slice(0, 5)
                  .filter((b) => b.id !== post.id)
                  .map((b) => (
                    <Link
                      key={b.id}
                      href={`/blog/${b.id}`}
                      className="group flex gap-4"
                    >
                      <div className="relative size-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                        <Image
                          src={b.banner ? buildMediaUrl(b.banner) || "" : ""}
                          alt={b.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-hind leading-snug mb-2">
                          {b.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                          <Calendar size={10} className="text-primary" />
                          {formatDate(b.timestamp)}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <Link href="/blog" className="mt-8 block">
                <Button className="w-full bg-gray-900 hover:bg-primary text-white font-black uppercase tracking-widest text-xs py-6 rounded-2xl transition-all shadow-lg hover:shadow-primary/20 group">
                  View All Blogs
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Category Badge Cloud */}
            <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-6">
                Popular Topic
              </h4>
              <Badge className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md">
                {post.category}
              </Badge>
              <p className="mt-4 text-xs text-primary/60 font-medium leading-relaxed">
                Stay updated with our latest activities and updates from the{" "}
                {post.category} section.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {post.images && post.images.length > 0 && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none h-[80vh] flex items-center justify-center">
            <div className="relative w-full h-full p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              {post.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/20 hover:bg-white/20 rounded-full h-12 w-12"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/20 hover:bg-white/20 rounded-full h-12 w-12"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}

              <div className="relative w-full h-full">
                <Image
                  src={buildMediaUrl(post.images[lightboxIndex]?.image) || ""}
                  alt={`Gallery ${lightboxIndex}`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs font-bold uppercase tracking-widest">
                {lightboxIndex + 1} / {post.images.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
