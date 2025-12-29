import useSWR from "swr";
import { useState, useCallback, useEffect } from "react";
import useAxios from "@/hooks/use-axios";
import { toast } from "sonner";
import { PressCoverage, PressCoverageFormData } from "../types";

export const usePressItem = (id: number | null) => {
  const axios = useAxios();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const {
    data: pressItem,
    error: pressError,
    isLoading: isLoadingItem,
    mutate: mutateItem,
  } = useSWR<PressCoverage>(
    id ? `/admin/press-coverage/detail/${id}/` : null,
    fetcher
  );

  return {
    pressItem,
    isLoadingItem,
    pressError,
    mutateItem,
  };
};

export const usePressCoverage = () => {
  const axios = useAxios();
  const [pressItems, setPressItems] = useState<PressCoverage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPressCoverage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<PressCoverage[]>(
        "/admin/press-coverage/list/"
      );
      setPressItems(response.data);
    } catch (err) {
      const message = "Failed to load press coverage";
      console.error(message, err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  const createPressCoverage = async (data: PressCoverageFormData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("link", data.link);
      formData.append("description", data.description);
      formData.append("published_at", data.published_at);
      if (data.image) {
        formData.append("image", data.image);
      }

      await axios.post("/admin/press-coverage/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Press coverage created successfully");
      await fetchPressCoverage();
      return true;
    } catch (err) {
      console.error("Failed to create", err);
      toast.error("Failed to create press coverage");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePressCoverage = async (
    id: number,
    data: Partial<PressCoverageFormData>
  ) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (data.title) formData.append("title", data.title);
      if (data.link) formData.append("link", data.link);
      if (data.description) formData.append("description", data.description);
      if (data.published_at) formData.append("published_at", data.published_at);
      if (data.image) {
        formData.append("image", data.image);
      }

      await axios.put(`/admin/press-coverage/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Press coverage updated successfully");
      await fetchPressCoverage();
      return true;
    } catch (err) {
      console.error("Failed to update", err);
      toast.error("Failed to update press coverage");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePressCoverage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return false;
    try {
      setLoading(true);
      await axios.delete(`/admin/press-coverage/${id}/`);
      toast.success("Press coverage deleted successfully");
      setPressItems((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error("Failed to delete press coverage");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPressCoverage();
  }, [fetchPressCoverage]);

  return {
    pressItems,
    loading,
    error,
    fetchPressCoverage,
    createPressCoverage,
    updatePressCoverage,
    deletePressCoverage,
  };
};
