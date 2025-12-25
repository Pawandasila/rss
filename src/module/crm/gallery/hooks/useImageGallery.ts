import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type {
  ImageGalleryItem,
  ImageGalleryFormData,
} from "../types";
import useAxios from "@/hooks/use-axios";

export const useImageGallery = () => {
  const [images, setImages] = useState<ImageGalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ImageGalleryItem[]>(
        `/admin/image-gallery/list`
      );
      setImages(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch images");
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createImage = useCallback(async (data: ImageGalleryFormData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await axios.post<ImageGalleryItem>(
        `/admin/image-gallery/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImages((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create image");
      console.error("Error creating image:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateImage = useCallback(
    async (id: number, data: ImageGalleryFormData) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        if (data.description) {
          formData.append("description", data.description);
        }
        if (data.image instanceof File) {
          formData.append("image", data.image);
        }

        const response = await axios.put<ImageGalleryItem>(
          `/admin/image-gallery/${id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setImages((prev) =>
          prev.map((img) => (img.id === id ? response.data : img))
        );
        return response.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update image");
        console.error("Error updating image:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteImage = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/admin/image-gallery/${id}/`);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image");
      console.error("Error deleting image:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    images,
    loading,
    error,
    fetchImages,
    createImage,
    updateImage,
    deleteImage,
  };
};
