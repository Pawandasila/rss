import useSWR from "swr";
import { useState } from "react";
import { Service, CreateServicePayload, UpdateServicePayload } from "../types";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";

export function useServiceApi() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const axios = useAxios();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const {
    data: services,
    error: servicesError,
    isLoading: isLoadingServices,
    mutate: mutateServices,
  } = useSWR<Service[]>("/admin/services/list/", fetcher);

  const createService = async (
    payload: CreateServicePayload
  ): Promise<Service | null> => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("content", payload.content);
      if (payload.image) formData.append("image", payload.image);
      if (payload.icon) formData.append("icon", payload.icon);

      const response = await axios.post("/admin/services/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutateServices();
      toast.success("Service created successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service");
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const updateService = async (
    payload: UpdateServicePayload
  ): Promise<Service | null> => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      if (payload.title) formData.append("title", payload.title);
      if (payload.content) formData.append("content", payload.content);
      if (payload.image) formData.append("image", payload.image);
      if (payload.icon) formData.append("icon", payload.icon);

      const response = await axios.put(
        `/admin/services/${payload.id}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await mutateServices();
      toast.success("Service updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteService = async (id: number): Promise<boolean> => {
    setIsDeleting(true);
    try {
      await axios.delete(`/admin/services/${id}/`);
      await mutateServices();
      toast.success("Service deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    services: services || [],
    isLoadingServices,
    servicesError,
    createService,
    updateService,
    deleteService,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
