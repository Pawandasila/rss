import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import { createVolunteerAPI } from "../api";
import { Wing, WingFormData } from "../types";

export const useWings = () => {
  const axios = useAxios();
  const api = useMemo(() => createVolunteerAPI(axios), [axios]);

  const [wings, setWings] = useState<Wing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination and Search State
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchWings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getWings(page, search);
      setWings(data.results);
      setTotalCount(data.count);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to fetch wings:", err);
      }
      const errorResponse = err as {
        response?: { data?: { message?: string; detail?: string } };
        message?: string;
      };
      const errorMsg =
        errorResponse.response?.data?.message ||
        errorResponse.response?.data?.detail ||
        errorResponse.message ||
        "Failed to fetch wings";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [api, page, search]);

  const createWing = useCallback(
    async (data: WingFormData) => {
      try {
        const newWing = await api.createWing(data);
        // Removed direct state update to rely on fetchWings for consistent pagination
        // setWings((prev) => [...prev, newWing]);
        toast.success("Wing created successfully");
        fetchWings(); // Refetch to look at right page
        return newWing;
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to create wing:", err);
        }
        const errorResponse = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        console.error("Failed to create wing:", errorResponse);
        throw err;
      }
    },
    [api]
  );

  const updateWing = useCallback(
    async (id: number, data: Partial<WingFormData>) => {
      try {
        const updatedWing = await api.updateWing(id, data);
        setWings((prev) =>
          prev.map((wing) => (wing.id === id ? updatedWing : wing))
        );
        toast.success("Wing updated successfully");
        return updatedWing;
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to update wing:", err);
        }
        const errorResponse = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        console.error("Failed to update wing:", errorResponse);
        throw err;
      }
    },
    [api]
  );

  const deleteWing = useCallback(
    async (id: number) => {
      try {
        await api.deleteWing(id);
        setWings((prev) => prev.filter((wing) => wing.id !== id));
        toast.success("Wing deleted successfully");
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to delete wing:", err);
        }
        const errorResponse = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        console.error("Failed to delete wing:", errorResponse);
        throw err;
      }
    },
    [api]
  );

  useEffect(() => {
    fetchWings();
  }, [fetchWings]);

  return {
    wings,
    loading,
    error,
    refetch: fetchWings,
    createWing,
    updateWing,
    deleteWing,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    totalCount,
  };
};
