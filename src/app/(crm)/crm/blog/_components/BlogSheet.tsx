"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Blog, CreateBlogPayload } from "@/module/crm/blog/types";
import { Save, Plus, X, Image as ImageIcon } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import { buildMediaUrl } from "@/lib/media";

import { useBlog } from "@/module/crm/blog/hook";

interface BlogSheetProps {
  blogId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveDetails: (data: CreateBlogPayload) => Promise<void>;
  onSaveContent: (content: string, isUpdate?: boolean) => Promise<void>;
  onSaveImages: (images: File[]) => Promise<void>;
  onDeleteImage: (id: number) => Promise<void>;
}

const blogCategories = ["News", "Event", "Notice", "General"];

export function BlogSheet({
  blogId,
  open,
  onOpenChange,
  onSaveDetails,
  onSaveContent,
  onSaveImages,
  onDeleteImage,
}: BlogSheetProps) {
  const { blog: post, mutate, isLoading } = useBlog(blogId);

  const [formData, setFormData] = useState<
    Partial<Blog> & { newBanner?: File }
  >({});
  const [newImages, setNewImages] = useState<File[]>([]);
  const [content, setContent] = useState("");

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ link: "link" }, { image: "image" }],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (post && open) {
      setFormData(post);
      // Ensure content is handled correctly whether it's object or string
      const contentValue =
        typeof post.content === "object" ? post.content?.content : post.content;
      setContent(contentValue || "");
    } else if (!blogId && open) {
      // Create mode
      setFormData({
        title: "",
        headline: "",
        category: "News",
        author: "Admin",
        featured: false,
        facebook_link: "",
        twitter_link: "",
        instagram_link: "",
      });
      setContent("");
    }
    setNewImages([]);
  }, [post, open, blogId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisplayImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, newBanner: file }));
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateBlogPayload = {
      title: formData.title || "",
      headline: formData.headline,
      banner: formData.newBanner || null,
      category: formData.category,
      author: formData.author,
      facebook_link: formData.facebook_link,
      twitter_link: formData.twitter_link,
      instagram_link: formData.instagram_link,
      featured: formData.featured,
    };
    await onSaveDetails(payload);
    mutate(); // Refresh data
  };

  const handleImagesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newImages.length === 0) {
      toast.error("No images selected");
      return;
    }
    await onSaveImages(newImages);
    setNewImages([]);
    mutate(); // Refresh data to show new images
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Pass true if content exists (update), false otherwise (create)
    await onSaveContent(content, !!post?.content);
    mutate(); // Refresh data
  };

  const handleDeleteImageWrapper = async (id: number) => {
    await onDeleteImage(id);
    mutate();
  };

  if (blogId && isLoading) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="min-w-[90vw] sm:max-w-[90vw] p-6 flex items-center justify-center h-screen">
          <SheetTitle className="sr-only">Loading Blog Details</SheetTitle>
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading blog details...</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[90vw] sm:max-w-[90vw] p-0 flex flex-col h-screen overflow-hidden">
        <SheetHeader className="px-6 py-4 border-b shrink-0 bg-background z-10">
          <SheetTitle>
            {post ? "Edit Blog Post" : "Create Blog Post"}
          </SheetTitle>
          <SheetDescription>
            {post ? "Make changes to your blog post." : "Add a new blog post."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 divide-x divide-border overflow-hidden">
          {/* Column 1: Details */}
          <form
            onSubmit={handleDetailsSubmit}
            className="flex flex-col h-full min-h-0"
          >
            <div className="p-4 border-b bg-muted/10 shrink-0">
              <h3 className="font-semibold text-lg">Details</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    required
                    placeholder="Enter title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Textarea
                    id="headline"
                    name="headline"
                    value={formData.headline || ""}
                    onChange={handleChange}
                    placeholder="Enter headline"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Banner Image</Label>
                  <div className="border border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-accent transition-colors relative">
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleDisplayImageUpload}
                    />
                    {formData.newBanner ? (
                      <div className="relative aspect-video w-full rounded-md overflow-hidden">
                        <Image
                          src={URL.createObjectURL(formData.newBanner)}
                          alt="New Banner"
                          fill
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate text-center">
                          New: {formData.newBanner.name}
                        </div>
                      </div>
                    ) : formData.banner ? (
                      <div className="relative aspect-video w-full rounded-md overflow-hidden">
                        <Image
                          src={buildMediaUrl(formData.banner)!}
                          alt="Banner"
                          fill
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="py-4">
                        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload banner
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => handleSelectChange("category", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author || ""}
                    onChange={handleChange}
                    placeholder="Author Name"
                  />
                </div>

                <div className="space-y-3 p-3 border rounded-md">
                  <h4 className="font-semibold text-sm">Social Links</h4>
                  <div className="space-y-2">
                    <Label className="text-xs">Facebook</Label>
                    <Input
                      name="facebook_link"
                      value={formData.facebook_link || ""}
                      onChange={handleChange}
                      placeholder="Facebook URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Twitter</Label>
                    <Input
                      name="twitter_link"
                      value={formData.twitter_link || ""}
                      onChange={handleChange}
                      placeholder="Twitter URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Instagram</Label>
                    <Input
                      name="instagram_link"
                      value={formData.instagram_link || ""}
                      onChange={handleChange}
                      placeholder="Instagram URL"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-background shrink-0 sticky bottom-0 z-20">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Details
              </Button>
            </div>
          </form>

          {/* Column 2: Gallery */}
          <form
            onSubmit={handleImagesSubmit}
            className="flex flex-col h-full min-h-0 bg-muted/5"
          >
            <div className="p-4 border-b bg-muted/10 shrink-0">
              <h3 className="font-semibold text-lg">Multi - Images</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {post?.images?.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-video rounded-md overflow-hidden group border bg-background"
                    >
                      <Image
                        src={buildMediaUrl(img.image)!}
                        alt={`Gallery ${img.id}`}
                        fill
                        className="object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteImageWrapper(img.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {newImages.map((file, idx) => (
                    <div
                      key={`new-${idx}`}
                      className="relative aspect-video rounded-md overflow-hidden group border bg-background"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="New"
                        fill
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate text-center">
                        {file.name}
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-100"
                        onClick={() =>
                          setNewImages((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <div className="relative flex flex-col items-center justify-center border border-dashed rounded-md aspect-video hover:bg-accent transition-colors">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleGalleryUpload}
                    />
                    <Plus className="h-6 w-6 mb-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Add Image
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-background shrink-0 sticky bottom-0 z-20">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Images
              </Button>
            </div>
          </form>

          {/* Column 3: Content */}
          <form
            onSubmit={handleContentSubmit}
            className="flex flex-col h-full min-h-0 bg-background"
          >
            <div className="p-4 border-b bg-muted/10 shrink-0">
              <h3 className="font-semibold text-lg">Content</h3>
            </div>

            <div className="flex-1 overflow-hidden p-6 flex flex-col">
              <div className="flex-1 border rounded-md overflow-hidden flex flex-col">
                <ReactQuill
                  key={post?.id || "new"}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  className="h-full flex flex-col [&>.ql-container]:flex-1 [&>.ql-container]:overflow-y-auto [&>.ql-toolbar]:shrink-0"
                />
              </div>
            </div>

            <div className="p-4 border-t bg-background shrink-0 sticky bottom-0 z-20">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Content
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
