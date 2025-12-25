import { useCallback, useEffect, useState, useMemo } from "react";
import useAxios from "@/hooks/use-axios";
import { createVolunteerAPI } from "../api";
import { VolunteerWithUser } from "../types";

interface PaginatedVolunteersResponse {
  count: number;
  total_pages?: number;
  current_page?: number;
  next: string | null;
  previous: string | null;
  results: VolunteerWithUser[];
}

export const useVolunteersList = () => {
  const axios = useAxios();
  const [volunteers, setVolunteers] = useState<VolunteerWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const api = useMemo(() => createVolunteerAPI(axios), [axios]);

  const fetchVolunteers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getVolunteers(page, search);
      setVolunteers(data.results || []);
      setTotalPages(data.total_pages || 1);
      setTotalCount(data.count || 0);
    } catch (err) {
      console.error("Failed to fetch volunteers:", err);
      setError("Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  }, [api, page, search]);

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  return {
    volunteers,
    loading,
    error,
    refetch: fetchVolunteers,
    page,
    setPage,
    search,
    setSearch,
    totalPages,
    totalCount,
  };
};
