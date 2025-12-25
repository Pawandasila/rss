import useSWR, { mutate as globalMutate } from "swr";
import { useCallback, useState } from "react";

import {
  Blog,
  CreateBlogPayload,
  CreateBlogContentPayload,
  BlogContent,
  BlogImage,
} from "./../types";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
export function useBlogApi() {
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const axios = useAxios();

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const {
    data: blogs,
    error: blogsError,
    isLoading: isLoadingBlogs,
    mutate: mutateBlogs,
  } = useSWR<Blog[]>("/admin/blog/list/", fetcher);

  // Create Blog
  const createBlog = async (
    payload: CreateBlogPayload
  ): Promise<Blog | null> => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      if (payload.headline) formData.append("headline", payload.headline);
      if (payload.banner) formData.append("banner", payload.banner);
      if (payload.category) formData.append("category", payload.category);
      if (payload.author) formData.append("author", payload.author);
      if (payload.facebook_link)
        formData.append("facebook_link", payload.facebook_link);
      if (payload.twitter_link)
        formData.append("twitter_link", payload.twitter_link);
      if (payload.instagram_link)
        formData.append("instagram_link", payload.instagram_link);
      if (payload.featured !== undefined)
        formData.append("featured", String(payload.featured));

      const response = await axios.post("/admin/blog/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutateBlogs();
      toast.success("Blog created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog");
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  // Delete Blog
  const deleteBlog = async (id: number): Promise<boolean> => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/blog/${id}/`);
      await mutateBlogs();
      toast.success("Blog deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  // Create/Update Content
  const saveBlogContent = async (
    payload: CreateBlogContentPayload
  ): Promise<BlogContent | null> => {
    try {
      const response = await axios.post("/admin/blog/content/", payload);
      toast.success("Content saved");
      return response.data;
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
      return null;
    }
  };

  const updateBlogContent = async (
    blogId: number,
    content: string
  ): Promise<BlogContent | null> => {
    try {
      const response = await axios.put(`/admin/blog/content/${blogId}/`, {
        blog: blogId,
        content,
      });
      toast.success("Content updated");
      return response.data;
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Failed to update content");
      return null;
    }
  };

  // Create Image
  const uploadBlogImage = async (
    blogId: number,
    image: File
  ): Promise<BlogImage | null> => {
    try {
      const formData = new FormData();
      formData.append("blog", String(blogId));
      formData.append("image", image);
      const response = await axios.post("/admin/blog/images/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded");
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  // Delete Image
  const deleteBlogImage = async (imageId: number): Promise<boolean> => {
    try {
      await axios.delete(`/admin/blog/images/${imageId}/`);
      toast.success("Image deleted");
      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
      return false;
    }
  };

  // Update Blog
  const updateBlog = async (
    id: number,
    payload: Partial<CreateBlogPayload>
  ): Promise<Blog | null> => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      if (payload.title) formData.append("title", payload.title);
      if (payload.headline) formData.append("headline", payload.headline);
      if (payload.banner) formData.append("banner", payload.banner);
      if (payload.category) formData.append("category", payload.category);
      if (payload.author) formData.append("author", payload.author);
      if (payload.facebook_link)
        formData.append("facebook_link", payload.facebook_link);
      if (payload.twitter_link)
        formData.append("twitter_link", payload.twitter_link);
      if (payload.instagram_link)
        formData.append("instagram_link", payload.instagram_link);
      if (payload.featured !== undefined)
        formData.append("featured", String(payload.featured));

      const response = await axios.put(`/admin/blog/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutateBlogs(); // Refresh list
      toast.success("Blog updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    blogs: blogs || [],
    isLoadingBlogs,
    blogsError,
    createBlog,
    updateBlog,
    deleteBlog,
    saveBlogContent,
    updateBlogContent,
    uploadBlogImage,
    deleteBlogImage,
    isCreating,
    isDeleting,
  };
}

export function useBlog(id: number | null) {
  const axios = useAxios();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading, mutate } = useSWR<Blog>(
    id ? `/admin/blog/detail/${id}/` : null,
    fetcher
  );
  return {
    blog: data,
    isLoading,
    error,
    mutate,
  };
}
