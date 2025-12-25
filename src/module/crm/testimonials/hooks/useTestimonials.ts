import { useState, useCallback, useEffect } from "react";
import useAxios from "@/hooks/use-axios";
import { toast } from "sonner";
import { Testimonial, TestimonialFormData } from "../types";

export const useTestimonials = () => {
  const axios = useAxios();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Testimonial[]>(
        "/admin/testimonials/list/"
      );
      setTestimonials(response.data);
    } catch (err) {
      const message = "Failed to load testimonials";
      console.error(message, err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  const createTestimonial = async (data: FormData) => {
    try {
      setLoading(true);
      await axios.post("/admin/testimonials/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Testimonial created successfully");
      await fetchTestimonials();
      return true;
    } catch (err) {
      console.error("Failed to create", err);
      toast.error("Failed to create testimonial");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonial = async (id: number, data: FormData) => {
    try {
      setLoading(true);
      await axios.put(`/admin/testimonials/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Testimonial updated successfully");
      await fetchTestimonials();
      return true;
    } catch (err) {
      console.error("Failed to update", err);
      toast.error("Failed to update testimonial");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?"))
      return false;
    try {
      setLoading(true);
      await axios.delete(`/admin/testimonials/${id}/`);
      toast.success("Testimonial deleted successfully");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error("Failed to delete testimonial");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};
