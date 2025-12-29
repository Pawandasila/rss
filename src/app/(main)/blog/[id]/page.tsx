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
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
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
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent z-[5]" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-12 lg:p-20">
          <div className="max-w-4xl">
            <div className="mb-4">
              <Badge className="bg-primary text-white text-[10px] md:text-sm px-4 py-1.5 rounded-full border-none shadow-xl">
                <Tag className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                {post.category}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 md:mb-10 font-hind drop-shadow-2xl">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8 text-white/95">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 md:w-14 md:h-14 border-2 border-primary shadow-xl">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback className="bg-primary text-white text-xs md:text-sm">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black text-xs md:text-lg tracking-tight leading-none mb-1">
                    {post.author.name}
                  </p>
                  <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-80">
                    {post.author.role}
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/20 hidden sm:block" />

              <div className="flex items-center gap-5 text-[11px] md:text-sm font-bold tracking-widest uppercase">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-5 py-14 md:py-28">
        {post.excerpt && (
          <div className="relative mb-12 md:mb-16">
            <div className="absolute -left-3 md:-left-4 top-0 bottom-0 w-1 bg-primary rounded-full" />
            <p className="text-lg md:text-2xl text-gray-700 font-hind font-medium leading-relaxed pl-5 md:pl-6 italic">
              {post.excerpt}
            </p>
          </div>
        )}

        <div className="blog-content-container overflow-hidden break-words">
          <style jsx global>{`
            .blog-content-container p {
              margin-bottom: 2rem;
              line-height: 1.9;
              font-family: var(--font-hind), sans-serif;
              font-size: 1rem;
              color: #374151;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
            }
            @media (max-width: 768px) {
              .blog-content-container p {
                font-size: 1rem;
                line-height: 1.7;
                margin-bottom: 1.25rem;
              }
            }
            .blog-content-container blockquote {
              border-left: 5px solid var(--primary);
              padding: 1.5rem 2rem;
              margin: 3rem 0;
              background: #fdf2f0;
              border-radius: 0 1.5rem 1.5rem 0;
              font-style: italic;
              color: #1f2937;
              font-size: 1.25rem;
              line-height: 1.8;
              position: relative;
            }
            .blog-content-container blockquote p {
              margin-bottom: 0 !important;
              font-weight: 700 !important;
            }
            @media (max-width: 768px) {
              .blog-content-container blockquote {
                padding: 1rem 1.5rem;
                font-size: 1.1rem;
                margin: 2rem 0;
              }
            }
            .blog-content-container ul,
            .blog-content-container ol {
              margin-bottom: 2.5rem;
              padding-left: 1.5rem;
            }
            .blog-content-container li {
              margin-bottom: 1rem;
              line-height: 1.8;
              font-family: var(--font-hind), sans-serif;
              color: #4b5563;
              font-size: 1.125rem;
              position: relative;
            }
            .blog-content-container ul li::before {
              content: "•";
              color: var(--primary);
              font-weight: bold;
              display: inline-block;
              width: 1em;
              margin-left: -1em;
            }
            .blog-content-container strong {
              color: #111827;
              font-weight: 800;
            }
            .blog-content-container u {
              text-decoration-color: var(--primary);
              text-underline-offset: 4px;
            }
            .blog-content-container img {
              max-width: 100%;
              height: auto;
              border-radius: 2rem;
              margin: 3.5rem 0;
              box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.15);
            }
          `}</style>
          <div
            className="prose prose-primary max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-gray-500 font-bold uppercase tracking-widest text-xs">
            Share this article
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-sky-500 hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-green-600 hover:text-white transition-all"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {post.images && post.images.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 w-primary bg-primary rounded-full" />
              <h3 className="text-2xl font-black text-gray-900 font-hind">
                फोटो गैलरी
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {post.images.map((img, index) => (
                <div
                  key={img.id}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={buildMediaUrl(img.image) || ""}
                    alt={`Gallery ${index}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <Images className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-150" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 p-8 md:p-12 bg-gray-50 rounded-[3rem] border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0" />
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 relative z-10">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-xl">
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
              <p className="text-gray-600 leading-relaxed font-hind">
                राष्ट्रीय सेवा संघ के समर्पित सदस्य और लेखक। समाज सेवा और
                राष्ट्र निर्माण में सक्रिय योगदान देने हेतु संकल्पित। सनातन धर्म
                एवं संस्कृति के प्रचार-प्रसार में संलग्न।
              </p>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-gray-50/50 py-24 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-gray-900 font-hind">
                संबंधित लेख
              </h2>
              <Link
                href="/blog"
                className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
              >
                View All Posts
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-video">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <Badge
                        variant="outline"
                        className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-400"
                      >
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-2 md:text-lg font-hind mb-4">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <Calendar size={12} className="text-primary" />
                        {formatDate(relatedPost.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
