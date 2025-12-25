"use client";
import { useState, useEffect, useCallback } from "react";
import useAxios from "@/hooks/use-axios";
import type { TeamMember, TeamFormData } from "../types";

export const useLeadership = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<TeamMember[]>(`/admin/leadership/list/`);
      setMembers(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch team members"
      );
      console.error("Error fetching team members:", err);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  const createMember = useCallback(
    async (data: TeamFormData) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("position", data.position);
        if (data.bio) formData.append("bio", data.bio);
        if (data.joined_at) formData.append("joined_at", data.joined_at);

        if (data.photo instanceof File) {
          formData.append("photo", data.photo);
        }

        const response = await axios.post<TeamMember>(
          `/admin/leadership/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMembers((prev) => [...prev, response.data]);
        return response.data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create member"
        );
        console.error("Error creating member:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [axios]
  );

  const updateMember = useCallback(
    async (id: number, data: TeamFormData) => {
      setLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("position", data.position);
        // If bio is empty string, we might want to send it to clear it, or strict check
        if (data.bio !== undefined) formData.append("bio", data.bio);
        if (data.joined_at) formData.append("joined_at", data.joined_at);

        if (data.photo instanceof File) {
          formData.append("photo", data.photo);
        }

        const response = await axios.put<TeamMember>(
          `/admin/leadership/${id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setMembers((prev) =>
          prev.map((item) => (item.id === id ? response.data : item))
        );
        return response.data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update member"
        );
        console.error("Error updating member:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [axios]
  );

  const deleteMember = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await axios.delete(`/admin/leadership/${id}/`);
        setMembers((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete member"
        );
        console.error("Error deleting member:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [axios]
  );

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    loading,
    error,
    fetchMembers,
    createMember,
    updateMember,
    deleteMember,
  };
};
