import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import { createVolunteerAPI } from "../api";
import { Level, LevelFormData } from "../types";

export const useLevels = (wingName?: string) => {
  const axios = useAxios();
  const api = useMemo(() => createVolunteerAPI(axios), [axios]);

  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination and Search State
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLevels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getLevels(wingName, page, search);
      setLevels(data.results);
      setTotalCount(data.count);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to fetch levels:", err);
      }
      const errorResponse = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMsg =
        errorResponse.response?.data?.message || "Failed to fetch levels";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wingName, page, search]);

  const createLevel = useCallback(
    async (data: LevelFormData) => {
      try {
        const payload: LevelFormData = {
          ...data,
          name: Array.isArray(data.name)
            ? (data.name.map((n: string | Record<string, unknown>) =>
                typeof n === "string"
                  ? n
                  : (n as Record<string, unknown>)?.en ?? String(n)
              ) as string[])
            : [String(data.name as string)],
        };

        const newLevel = await api.createLevel(payload);
        await fetchLevels();
        toast.success("Level created successfully");
        return newLevel;
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to create level:", err);
        }
        const errorResponse = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        console.error("Failed to create level:", errorResponse);
        throw err;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [fetchLevels]
  );

  const updateLevel = useCallback(
    async (id: number, data: Partial<LevelFormData>) => {
      try {
        let payload: Partial<LevelFormData> = { ...data };
        if (data.name) {
          payload = {
            ...payload,
            name: Array.isArray(data.name)
              ? (data.name.map((n: string | Record<string, unknown>) =>
                  typeof n === "string"
                    ? n
                    : (n as Record<string, unknown>)?.en ?? String(n)
                ) as string[])
              : [String(data.name as string)],
          };
        }

        const updatedLevel = await api.updateLevel(id, payload);
        await fetchLevels();
        toast.success("Level updated successfully");
        return updatedLevel;
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to update level:", err);
        }
        const errorResponse = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        console.error("Failed to update level:", errorResponse);
        throw err;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchLevels]
  );

  const deleteLevel = useCallback(async (id: number) => {
    try {
      await api.deleteLevel(id);
      setLevels((prev) => prev.filter((level) => level.id !== id));
      toast.success("Level deleted successfully");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to delete level:", err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  return {
    levels,
    loading,
    error,
    refetch: fetchLevels,
    createLevel,
    updateLevel,
    deleteLevel,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    totalCount,
  };
};
