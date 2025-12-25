import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type {
  HolyBookItem,
  HolyBookFormData,
} from "../types";
import useAxios from "@/hooks/use-axios";


export const useHolyBooks = () => {
  const [holyBooks, setHolyBooks] = useState<HolyBookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  const fetchHolyBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<HolyBookItem[]>(
        `/admin/holy-books/list/`
      );
      setHolyBooks(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch holy books");
      console.error("Error fetching holy books:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createHolyBook = useCallback(async (data: HolyBookFormData) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.description) {
        formData.append("description", data.description);
      }
      if (data.file instanceof File) {
        formData.append("file", data.file);
      }

      const response = await axios.post<HolyBookItem>(
        `/admin/holy-books/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setHolyBooks((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create holy book");
      console.error("Error creating holy book:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateHolyBook = useCallback(
    async (id: number, data: HolyBookFormData) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        if (data.description) {
          formData.append("description", data.description);
        }
        if (data.file instanceof File) {
          formData.append("file", data.file);
        }

        const response = await axios.put<HolyBookItem>(
          `/admin/holy-books/${id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setHolyBooks((prev) =>
          prev.map((book) => (book.id === id ? response.data : book))
        );
        return response.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update holy book");
        console.error("Error updating holy book:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteHolyBook = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/admin/holy-books/${id}/`);
      setHolyBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete holy book");
      console.error("Error deleting holy book:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHolyBooks();
  }, [fetchHolyBooks]);

  return {
    holyBooks,
    loading,
    error,
    fetchHolyBooks,
    createHolyBook,
    updateHolyBook,
    deleteHolyBook,
  };
};
