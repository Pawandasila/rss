"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/auth.types";
import useAxios from "@/hooks/use-axios";

interface PaginationData {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
}

export type UserUpdateData = 
  | Partial<User> 
  | FormData 
  | Record<string, string | number | boolean | null | undefined | File | Blob>;

export interface UserStats {
  total_user: number;
  verified_user: number;
  member_user: number;
  volunteer_user: number;
  business_user: number;
  staff_user: number;
  admin_user: number;
  blocked_user: number;
  today_total_user: number;
  today_verified_user: number;
  today_blocked_user: number;
  today_member_user: number;
  today_volunteer_user: number;
  today_business_user: number;
  today_unverified_member_user: number;
}

export interface searchUsersParams {
  search: string;
}

export function useUsers(page: number = 1, page_size: number = 30) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    count: 0,
    total_pages: 1,
    current_page: 1,
    next: null,
    previous: null,
  });
  const axios = useAxios();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/account/list/", {
        params: { page, page_size }
      });
      
      
      const userData = response.data;
      if (Array.isArray(userData)) {
        setUsers(userData);
        setPagination({
          count: userData.length,
          total_pages: 1,
          current_page: 1,
          next: null,
          previous: null,
        });
      } else if (userData && Array.isArray(userData.results)) {
        
        setUsers(userData.results);
        setPagination({
          count: userData.count || userData.results.length,
          total_pages: userData.total_pages || 1,
          current_page: userData.current_page || page,
          next: userData.next || null,
          previous: userData.previous || null,
        });
      } else if (userData && Array.isArray(userData.data)) {
        
        setUsers(userData.data);
        setPagination({
          count: userData.count || userData.data.length,
          total_pages: userData.total_pages || 1,
          current_page: userData.current_page || page,
          next: userData.next || null,
          previous: userData.previous || null,
        });
      } else {
        console.warn("Unexpected API response format:", userData);
        setUsers([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching users:", err);
      }
      const errorResponse = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        errorResponse.response?.data?.message ||
        errorResponse.message ||
        "Failed to fetch users";
      setError(errorMessage);
      setUsers([]); 
    } finally {
      setLoading(false);
    }
  }, [page, page_size, axios]);


  const updateUser = async (
    userId: number, 
    data: UserUpdateData,
    options?: { useFormData?: boolean }
  ) => {
    try {
      let payload: Partial<User> | FormData;
      let headers: Record<string, string> = {};

      
      if (data instanceof FormData) {
        payload = data;
        headers = { "Content-Type": "multipart/form-data" };
      } else if (options?.useFormData) {
        
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if ((value instanceof File) || (value instanceof Blob)) {
              formData.append(key, value);
            } else {
              formData.append(key, String(value));
            }
          }
        });
        payload = formData;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        
        const hasFile = Object.values(data).some(
          (value) => (value instanceof File) || (value instanceof Blob)
        );
        if (hasFile) {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              if ((value instanceof File) || (value instanceof Blob)) {
                formData.append(key, value);
              } else {
                formData.append(key, String(value));
              }
            }
          });
          payload = formData;
          headers = { "Content-Type": "multipart/form-data" };
        } else {
          payload = data as Partial<User>;
        }
      }

      const response = await axios.put(`/account/detail/${userId}/`, payload, {
        headers: Object.keys(headers).length > 0 ? headers : undefined,
      });
      
      setUsers(prevUsers => 
        prevUsers.map((user) => user.id === userId ? { ...user, ...response.data } : user)
      );
      return { success: true, message: "User updated successfully", data: response.data };
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error updating user:", err);
      }
      const errorResponse = err as {
        response?: { data?: { message?: string; error?: string; detail?: string } };
        message?: string;
      };
      const errorMessage =
        errorResponse.response?.data?.error ||
        errorResponse.response?.data?.message ||
        errorResponse.response?.data?.detail ||
        errorResponse.message ||
        "Failed to update user";
      return { success: false, error: errorMessage };
    }
  };

  const searchUser = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get("/account/list/", {
        params: { 
          search: searchTerm,
          page,
          page_size 
        }
      });
      
      const userData = response.data;
      
      if (Array.isArray(userData)) {
        setUsers(userData);
        setPagination({
          count: userData.length,
          total_pages: 1,
          current_page: 1,
          next: null,
          previous: null,
        });
      } else if (userData && Array.isArray(userData.results)) {
        setUsers(userData.results);
        setPagination({
          count: userData.count || userData.results.length,
          total_pages: userData.total_pages || 1,
          current_page: userData.current_page || page,
          next: userData.next || null,
          previous: userData.previous || null,
        });
      } else if (userData && Array.isArray(userData.data)) {
        setUsers(userData.data);
        setPagination({
          count: userData.count || userData.data.length,
          total_pages: userData.total_pages || 1,
          current_page: userData.current_page || page,
          next: userData.next || null,
          previous: userData.previous || null,
        });
      } else {
        console.warn("Unexpected search response format:", userData);
        setUsers([]);
      }
      
      return { success: true, message: "Search completed successfully" };
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error searching users:", err);
      }
      const errorResponse = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        errorResponse.response?.data?.message ||
        errorResponse.message ||
        "Failed to search users";
      setError(errorMessage);
      setUsers([]);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    pagination,
    refetch: fetchUsers,
    updateUser,
    searchUser,
  };
}

export function useUpdateCurrentUser() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  const updateCurrentUser = useCallback(
    async (
      userId: number,
      data: UserUpdateData,
      options?: { useFormData?: boolean }
    ) => {
      try {
        setIsUpdating(true);
        setError(null);

        
        const MAX_FILE_SIZE = 5 * 1024 * 1024; 

        let payload: Partial<User> | FormData;
        let headers: Record<string, string> = {};

        
        if (data instanceof FormData) {
          
          for (const [, value] of (data as FormData).entries()) {
            if (value instanceof File && value.size > MAX_FILE_SIZE) {
              setIsUpdating(false);
              return {
                success: false,
                error: `File "${value.name}" is too large. Maximum size is 5MB. Your file is ${(value.size / (1024 * 1024)).toFixed(2)}MB.`
              };
            }
          }
          payload = data;
          headers = { "Content-Type": "multipart/form-data" };
        } else if (options?.useFormData) {
          
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              if ((value instanceof File) || (value instanceof Blob)) {
                
                if ((value as File).size && (value as File).size > MAX_FILE_SIZE) {
                  throw new Error(`File is too large. Maximum size is 5MB. Your file is ${((value as File).size / (1024 * 1024)).toFixed(2)}MB.`);
                }
                formData.append(key, value);
              } else {
                formData.append(key, String(value));
              }
            }
          });
          payload = formData;
          headers = { "Content-Type": "multipart/form-data" };
        } else {
          
          const hasFile = Object.values(data).some(
            (value) => (value instanceof File) || (value instanceof Blob)
          );
          if (hasFile) {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              if (value !== null && value !== undefined) {
                if ((value instanceof File) || (value instanceof Blob)) {
                  if ((value as File).size && (value as File).size > MAX_FILE_SIZE) {
                    throw new Error(`File is too large. Maximum size is 5MB. Your file is ${((value as File).size / (1024 * 1024)).toFixed(2)}MB.`);
                  }
                  formData.append(key, value);
                } else {
                  formData.append(key, String(value));
                }
              }
            });
            payload = formData;
            headers = { "Content-Type": "multipart/form-data" };
          } else {
            payload = data as Partial<User>;
          }
        }
 

        const response = await axios.put(`/account/detail/${userId}/`, payload, {
          headers: Object.keys(headers).length > 0 ? headers : undefined,
        });

        return { 
          success: true, 
          message: "Profile updated successfully", 
          data: response.data 
        };
      } catch (err) {
        const errorResponse = err as {
          response?: { 
            data?: { 
              message?: string; 
              error?: string; 
              detail?: string;
              [key: string]: unknown;
            };
            status?: number;
            statusText?: string;
          };
          message?: string;
        };

        let errorMessage = "Failed to update profile";
        
        if (errorResponse.response) {
          const responseData = errorResponse.response.data;
          errorMessage = 
            responseData?.error ||
            responseData?.message ||
            responseData?.detail ||
            (typeof responseData === 'string' ? responseData : null) ||
            `Server error (${errorResponse.response.status})`;
          
          
          if (responseData && typeof responseData === 'object') {
            const fieldErrors = Object.entries(responseData)
              .filter(([key]) => !['error', 'message', 'detail'].includes(key))
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
              .join('; ');
            
            if (fieldErrors) {
              errorMessage += ` - ${fieldErrors}`;
            }
          }
        } else if (errorResponse.message) {
          errorMessage = errorResponse.message;
        }

        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsUpdating(false);
      }
    },
    [axios]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    updateCurrentUser,
    isUpdating,
    error,
    clearError,
  };
}

export function useUserById(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const axios = useAxios();

  const fetchUser = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/account/detail/${userId}/`);
      setUser(response.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching user:", err);
      }
      const errorResponse = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        errorResponse.response?.data?.message ||
        errorResponse.message ||
        "Failed to fetch user";
      setError(errorMessage);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [userId, axios]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const axios = useAxios();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/dashboard/user-count/`);
      setStats(response.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching user stats:", err);
      }
      const errorResponse = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        errorResponse.response?.data?.message ||
        errorResponse.message ||
        "Failed to fetch user stats";
      console.error("Error fetching user stats:", errorMessage);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    refetch: fetchStats,
  };
}