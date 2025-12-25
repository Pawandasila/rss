import useSWR from "swr";
import { useState } from "react";
import { Mission, CreateMissionPayload, UpdateMissionPayload } from "../types";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";

export function useMissionApi(id?: number | null) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const axios = useAxios();

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  // Fetch all missions list
  const {
    data: missions,
    error: missionsError,
    isLoading: isLoadingMissions,
    mutate: mutateMissions,
  } = useSWR<Mission[]>(id ? null : "/admin/missions/list/", fetcher);

  // Fetch single mission detail
  const {
    data: mission,
    error: missionError,
    isLoading: isLoadingMission,
    mutate: mutateMission,
  } = useSWR<Mission>(id ? `/admin/missions/${id}/` : null, fetcher);

  const createMission = async (
    payload: CreateMissionPayload
  ): Promise<Mission | null> => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      if (payload.image) formData.append("image", payload.image);
      if (payload.headline) formData.append("headline", payload.headline);
      if (payload.icon) formData.append("icon", payload.icon);
      if (payload.category) formData.append("category", payload.category);

      const response = await axios.post("/admin/missions/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutateMissions();
      toast.success("Mission created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating mission:", error);
      toast.error("Failed to create mission");
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const updateMission = async (
    payload: UpdateMissionPayload
  ): Promise<Mission | null> => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      if (payload.title) formData.append("title", payload.title);
      if (payload.description)
        formData.append("description", payload.description);
      if (payload.image) formData.append("image", payload.image);
      if (payload.headline) formData.append("headline", payload.headline);
      if (payload.icon) formData.append("icon", payload.icon);
      if (payload.category) formData.append("category", payload.category);

      const response = await axios.put(
        `/admin/missions/${payload.id}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await mutateMissions();
      toast.success("Mission updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating mission:", error);
      toast.error("Failed to update mission");
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteMission = async (id: number): Promise<boolean> => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/missions/${id}/`);
      await mutateMissions();
      toast.success("Mission deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting mission:", error);
      toast.error("Failed to delete mission");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    missions: missions || [],
    mission: mission || null,
    isLoadingMissions: id ? isLoadingMission : isLoadingMissions,
    missionsError: id ? missionError : missionsError,
    createMission,
    updateMission,
    deleteMission,
    isCreating,
    isUpdating,
    isDeleting,
    mutateMission,
  };
}
