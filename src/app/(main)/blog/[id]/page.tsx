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
    <div className="min-h-screen bg-background py-14">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ब्लॉग पर वापस जाएं
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {post.image && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
              priority
            />
            {post.featured && (
              <Badge className="absolute top-4 left-4 bg-primary text-white">
                Featured
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <div className="mb-6">
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm px-4 py-1">
            <Tag className="w-3.5 h-3.5 mr-1.5" />
            {post.category}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
          {/* Author */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {post.author.role}
              </p>
            </div>
          </div>

          <Separator orientation="vertical" className="h-10 hidden sm:block" />

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {post.readTime} पढ़ने का समय
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            शेयर करें
          </Button>
          <Button variant="outline" size="sm">
            <BookmarkPlus className="w-4 h-4 mr-2" />
            सहेजें
          </Button>

          {/* Social Links - Only show if they exist */}
          {post.facebook_link && (
            <a
              href={post.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <Facebook className="w-4 h-4" />
              </Button>
            </a>
          )}
          {post.twitter_link && (
            <a
              href={post.twitter_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
            </a>
          )}
          {post.instagram_link && (
            <a
              href={post.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <Instagram className="w-4 h-4" />
              </Button>
            </a>
          )}

          {/* Default share buttons if no social links */}
          {!hasSocialLinks && (
            <>
              <Button variant="outline" size="sm">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
            <p className="text-lg text-foreground italic leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Image Gallery */}
        {post.images && post.images.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Images className="w-5 h-5 text-primary" />
              फोटो गैलरी
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {post.images.map((img, index) => (
                <div
                  key={img.id}
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={buildMediaUrl(img.image) || ""}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-12" />

        {/* Author Card */}
        <div className="bg-muted/30 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/20">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {post.author.role}
              </p>
              <p className="text-sm text-muted-foreground">
                राष्ट्रीय सेवा संघ के समर्पित सदस्य और लेखक। समाज सेवा और
                राष्ट्र निर्माण में सक्रिय योगदान।
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">संबंधित लेख</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="block group"
                >
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video">
                      {relatedPost.image ? (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          placeholder="blur"
                          blurDataURL={IMAGE_BLUR_DATA_URL}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Images className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2 text-xs" variant="secondary">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(relatedPost.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Bottom CTA */}
      <div className="bg-primary/5 border-y py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">अधिक लेख पढ़ना चाहते हैं?</h2>
          <p className="text-muted-foreground mb-6">
            राष्ट्रीय सेवा संघ के सभी अपडेट और समाचार प्राप्त करें
          </p>
          <Link href="/blog">
            <Button size="lg">
              सभी लेख देखें
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox Dialog */}
      {post.images && post.images.length > 0 && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
            <div className="relative">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation buttons */}
              {post.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}

              {/* Image */}
              <div className="relative w-full aspect-video">
                <Image
                  src={buildMediaUrl(post.images[lightboxIndex]?.image) || ""}
                  alt={`Gallery image ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {lightboxIndex + 1} / {post.images.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
