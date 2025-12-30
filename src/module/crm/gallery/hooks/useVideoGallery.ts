import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { VideoGalleryItem, VideoGalleryFormData } from "../types";
import useAxios from "@/hooks/use-axios";

export const useVideoGallery = () => {
  const [videos, setVideos] = useState<VideoGalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<VideoGalleryItem[]>(
        `/admin/video-gallery/list/`
      );
      setVideos(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch videos");
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createVideo = useCallback(async (data: VideoGalleryFormData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("type", data.type);
      formData.append("title", data.title);
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.type === "file" && data.video_file instanceof File) {
        formData.append("video_file", data.video_file);
      }
      if (data.type === "url" && data.video_url) {
        formData.append("video_url", data.video_url);
      }

      const response = await axios.post<VideoGalleryItem>(
        `/admin/video-gallery/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setVideos((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create video");
      console.error("Error creating video:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateVideo = useCallback(
    async (id: number, data: VideoGalleryFormData) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("type", data.type);
        formData.append("title", data.title);
        if (data.description) {
          formData.append("description", data.description);
        }
        if (data.type === "file" && data.video_file instanceof File) {
          formData.append("video_file", data.video_file);
        }
        if (data.type === "url" && data.video_url) {
          formData.append("video_url", data.video_url);
        }

        const response = await axios.put<VideoGalleryItem>(
          `/admin/video-gallery/${id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setVideos((prev) =>
          prev.map((video) => (video.id === id ? response.data : video))
        );
        return response.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update video");
        console.error("Error updating video:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteVideo = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/admin/video-gallery/${id}/`);
      setVideos((prev) => prev.filter((video) => video.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete video");
      console.error("Error deleting video:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    fetchVideos,
    createVideo,
    updateVideo,
    deleteVideo,
  };
};
