import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type {
  BannerItem,
  BannerFormData,
} from "../types";
import useAxios from "@/hooks/use-axios";

export const useBanners = () => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const axios = useAxios();

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<BannerItem[]>(
        `/admin/banners/list/`
      );
      setBanners(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch banners");
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBanner = useCallback(async (data: BannerFormData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("is_active", String(data.is_active));
      if (data.link) {
        formData.append("link", data.link);
      }
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await axios.post<BannerItem>(
        `/admin/banners/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setBanners((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create banner");
      console.error("Error creating banner:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBanner = useCallback(
    async (id: number, data: BannerFormData) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("is_active", String(data.is_active));
        if (data.link) {
          formData.append("link", data.link);
        }
        if (data.image instanceof File) {
          formData.append("image", data.image);
        }

        const response = await axios.put<BannerItem>(
          `/admin/banners/${id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setBanners((prev) =>
          prev.map((banner) => (banner.id === id ? response.data : banner))
        );
        return response.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update banner");
        console.error("Error updating banner:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteBanner = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/admin/banners/${id}/`);
      setBanners((prev) => prev.filter((banner) => banner.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete banner");
      console.error("Error deleting banner:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return {
    banners,
    loading,
    error,
    fetchBanners,
    createBanner,
    updateBanner,
    deleteBanner,
  };
};
