"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import {
  User,
  AuthContextType,
  LoginResponse,
  RegisterRequest,
  AuthState,
} from "@/types/auth.types";
import { getApiBaseUrl } from "@/lib/env";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const baseURL = getApiBaseUrl();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    initialized: false,
  });

  // In production on HTTP (e.g., bare IP without TLS), setting the Secure attribute
  // prevents the browser from storing cookies at all. Detect protocol at runtime
  // and only add `Secure` when actually using HTTPS.
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";

  // Prefer Lax to allow normal same-site navigations and most requests.
  // If you deploy behind HTTPS and need cross-site usage, consider "None" with Secure.
  const sameSitePolicy = "Lax";
  const secureAttribute = isHttps ? "; Secure" : "";

  const getCookie = useCallback((name: string): string | undefined => {
    try {
      const raw = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
      return raw ? decodeURIComponent(raw) : undefined;
    } catch {
      return undefined;
    }
  }, []);

  const setAuthCookie = useCallback(
    (name: string, value: string) => {
      const encoded = encodeURIComponent(value);
      document.cookie = `${name}=${encoded}; Path=/; SameSite=${sameSitePolicy}${secureAttribute}`;
    },
    [sameSitePolicy, secureAttribute]
  );

  const clearAuthCookie = useCallback(
    (name: string) => {
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=${sameSitePolicy}${secureAttribute}`;
    },
    [sameSitePolicy, secureAttribute]
  );

  const apiCall = useCallback(
    async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers instanceof Headers
          ? Object.fromEntries(options.headers)
          : (options.headers as Record<string, string>) || {}),
      };

      const token = getCookie("access_token");
      if (token) headers.Authorization = `Bearer ${token}`;

      const doFetch = async (hdrs: Record<string, string>) =>
        fetch(`${baseURL}${endpoint}`, {
          ...options,
          credentials: "include",
          headers: hdrs,
        });

      let response = await doFetch(headers);

      if (response.status === 401 && !endpoint.startsWith("/account/token/")) {
        const refresh = getCookie("refresh_token");
        if (refresh) {
          try {
            const r = await fetch(`${baseURL}/account/token/refresh/`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh }),
            });
            if (r.ok) {
              const data = await r.json();
              if (data?.access) {
                setAuthCookie("access_token", data.access);
                const retryHeaders = {
                  ...headers,
                  Authorization: `Bearer ${data.access}`,
                };
                response = await doFetch(retryHeaders);
              }
            }
          } catch {}
        }
      }

      return response;
    },
    [baseURL, getCookie, setAuthCookie]
  );

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setAuthState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
    }));
  }, []);

  const setUserData = useCallback((userData: User | { user_info: User }) => {
    const user: User = "user_info" in userData ? userData.user_info : userData;

    localStorage.setItem("user_data", JSON.stringify({ user_info: user }));

    setAuthState((prev) => ({
      ...prev,
      user: user,
      isAuthenticated: true,
      loading: false,
      error: null,
      initialized: true,
    }));
  }, []);

  const refreshUserData = useCallback(async (): Promise<boolean> => {
    try {
      const response = await apiCall("/dashboard/");

      if (response.ok) {
        const data = await response.json();

        if (data && data.user_info) {
          localStorage.setItem("user_data", JSON.stringify(data));
          setUserData(data);
          return true;
        }
      }

      if (response.status !== 401) {
        console.error("Failed to refresh user data:", response.status);
      } else {
        console.warn("Token expired while refreshing user data (401)");
      }
      return false;
    } catch (error) {
      console.error("Error refreshing user data:", error);
      return false;
    }
  }, [apiCall, setUserData]);

  const createDefaultUser = useCallback(
    (): User => ({
      id: 1,
      user_id: "unknown",
      username: "user",
      name: "User",
      email: "user@example.com",
      phone: "",
      is_verified: false,
      is_blocked: false,
      is_volunteer: true,
      is_admin_account: false,
      is_business_account: false,
      is_staff_account: false,
      is_member_account: false,
      is_field_worker: false,
      is_staff: false,
      is_active: true,
      is_superuser: false,
      date_joined: new Date().toISOString(),
    }),
    []
  );

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const refreshTokenValue = getCookie("refresh_token");

      if (!refreshTokenValue) {
        console.log("❌ No refresh token found in cookies");
        return false;
      }

      console.log(
        "🔄 Attempting to refresh token with refresh_token from cookie"
      );

      // Direct fetch without Authorization header to avoid interference
      const response = await fetch(`${baseURL}/account/token/refresh/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshTokenValue }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.access) {
          setAuthCookie("access_token", data.access);
          console.log("✅ Token refreshed successfully");
          return true;
        } else {
          console.log("❌ No access token in refresh response");
          clearAuthCookie("access_token");
          clearAuthCookie("refresh_token");
          return false;
        }
      } else {
        console.log(`❌ Token refresh failed with status: ${response.status}`);
        clearAuthCookie("access_token");
        clearAuthCookie("refresh_token");
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Refresh token error:", error.message);
      }
      return false;
    }
  }, [baseURL, getCookie, clearAuthCookie, setAuthCookie]);

  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));

      const accessToken = getCookie("access_token");
      const refreshTokenValue = getCookie("refresh_token");

      // No tokens at all - user is logged out
      if (!accessToken && !refreshTokenValue) {
        const storedUserData = localStorage.getItem("user_data");
        if (storedUserData) {
          console.log(
            "No auth cookies found, removing stale user_data from localStorage"
          );
          localStorage.removeItem("user_data");
        }

        setAuthState((prev) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          loading: false,
          initialized: true,
        }));
        return;
      }

      // No access token but have refresh token - try to refresh
      if (!accessToken && refreshTokenValue) {
        console.log("Access token missing, attempting refresh...");
        const refreshSuccessful = await refreshToken();

        if (refreshSuccessful) {
          // Fetch fresh user data after successful refresh
          const dashboardResponse = await apiCall("/dashboard/");

          if (dashboardResponse.ok) {
            const dashboardData = await dashboardResponse.json();
            if (dashboardData.user_info) {
              localStorage.setItem("user_data", JSON.stringify(dashboardData));
              setAuthState((prev) => ({
                ...prev,
                user: dashboardData.user_info,
                isAuthenticated: true,
                loading: false,
                error: null,
                initialized: true,
              }));
              console.log("✅ Token refreshed and user data loaded");
              return;
            }
          }
        }

        // Refresh failed
        localStorage.removeItem("user_data");
        setAuthState((prev) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          loading: false,
          initialized: true,
        }));
        return;
      }

      // Have access token - verify it
      const response = await apiCall("/account/token/verify/", {
        method: "POST",
        body: JSON.stringify({ token: accessToken }),
      });

      if (response.ok) {
        // Token is valid - use stored user data or fetch fresh
        const storedUserData = localStorage.getItem("user_data");
        let userData: User;

        if (storedUserData) {
          try {
            const parsedData = JSON.parse(storedUserData);
            userData = parsedData.user_info || parsedData;
          } catch (parseErr) {
            if (parseErr instanceof Error) {
              console.error("Error parsing stored user data:", parseErr);
            }
            // Fetch fresh data if parsing fails
            const dashboardResponse = await apiCall("/dashboard/");
            if (dashboardResponse.ok) {
              const dashboardData = await dashboardResponse.json();
              userData = dashboardData.user_info || createDefaultUser();
              localStorage.setItem("user_data", JSON.stringify(dashboardData));
            } else {
              userData = createDefaultUser();
            }
          }
        } else {
          // No stored data - fetch fresh
          const dashboardResponse = await apiCall("/dashboard/");
          if (dashboardResponse.ok) {
            const dashboardData = await dashboardResponse.json();
            userData = dashboardData.user_info || createDefaultUser();
            localStorage.setItem("user_data", JSON.stringify(dashboardData));
          } else {
            userData = createDefaultUser();
          }
        }

        setAuthState((prev) => ({
          ...prev,
          user: userData,
          isAuthenticated: true,
          loading: false,
          error: null,
          initialized: true,
        }));
      } else {
        // Token verification failed - try to refresh
        console.log("Token verification failed, attempting refresh...");
        const refreshSuccessful = await refreshToken();

        if (refreshSuccessful) {
          // Fetch fresh user data after successful refresh
          const dashboardResponse = await apiCall("/dashboard/");

          if (dashboardResponse.ok) {
            const dashboardData = await dashboardResponse.json();
            if (dashboardData.user_info) {
              localStorage.setItem("user_data", JSON.stringify(dashboardData));
              setAuthState((prev) => ({
                ...prev,
                user: dashboardData.user_info,
                isAuthenticated: true,
                loading: false,
                error: null,
                initialized: true,
              }));
              return;
            }
          }
        }

        // Refresh failed - logout
        localStorage.removeItem("user_data");
        setAuthState((prev) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
          initialized: true,
        }));
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Auth check error:", err);
      }
      setAuthState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        initialized: true,
      }));
    }
  }, [apiCall, createDefaultUser, refreshToken, getCookie]);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResponse> => {
      try {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await apiCall("/account/token/", {
          method: "POST",
          body: JSON.stringify({ username: email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setAuthCookie("access_token", data.access);
          setAuthCookie("refresh_token", data.refresh);

          try {
            const dashboardResponse = await apiCall("/dashboard/");
            const dashboardData = await dashboardResponse.json();

            if (dashboardResponse.ok && dashboardData.user_info) {
              localStorage.setItem("user_data", JSON.stringify(dashboardData));
              setUserData(dashboardData);
            } else {
              await checkAuth();
            }
          } catch (dashboardErr) {
            if (dashboardErr instanceof Error) {
              console.error("Error fetching dashboard data:", dashboardErr);
            }
            await checkAuth();
          }

          const redirectUrl =
            typeof window !== "undefined"
              ? localStorage.getItem("redirectAfterLogin")
              : null;

          if (redirectUrl) {
            localStorage.removeItem("redirectAfterLogin");
            router.push(redirectUrl);
          } else {
            router.push("/dashboard");
          }

          return {
            success: true,
            message: "Login successful",
          };
        } else {
          const errorMessage =
            data.detail ||
            (data.non_field_errors && data.non_field_errors[0]) ||
            data.message ||
            "Login failed";
          setAuthState((prev) => ({
            ...prev,
            loading: false,
            error: errorMessage,
          }));

          console.log(data);
          return {
            success: false,
            message: errorMessage,
          };
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Login error:", err);
        }
        const errorMessage = "Network error. Please check your connection.";
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        return {
          success: false,
          message: errorMessage,
        };
      }
    },
    [apiCall, checkAuth, setUserData, router, setAuthCookie, getCookie]
  );

  const register = useCallback(
    async (data: RegisterRequest): Promise<LoginResponse> => {
      try {
        const response = await apiCall("/account/join/", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
          setAuthState((prev) => ({
            ...prev,
            error: null,
          }));

          return {
            success: true,
            message: "Registration successful. You can now login.",
          };
        } else {
          let errorMessage = responseData.error || responseData.detail;

          if (!errorMessage) {
            // Check for field-specific errors
            const firstKey = Object.keys(responseData)[0];
            if (firstKey && Array.isArray(responseData[firstKey])) {
              errorMessage = responseData[firstKey][0];
            } else if (responseData.message) {
              errorMessage = responseData.message;
            }
          }

          errorMessage = errorMessage || "Registration failed";

          setAuthState((prev) => ({
            ...prev,
            error: errorMessage,
          }));

          return {
            success: false,
            message: errorMessage,
          };
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Registration error:", err);
        }
        const errorMessage = "Network error. Please try again.";
        setAuthState((prev) => ({
          ...prev,
          error: errorMessage,
        }));

        return {
          success: false,
          message: errorMessage,
        };
      }
    },
    [apiCall]
  );

  const logout = useCallback(() => {
    // apiCall("/account/logout/", { method: "POST" }).catch(() => {});

    clearAuthCookie("access_token");
    clearAuthCookie("refresh_token");

    localStorage.removeItem("user_data");
    localStorage.removeItem("redirectAfterLogin");

    localStorage.clear();

    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      initialized: true,
    });

    router.push("/");
  }, [router, clearAuthCookie, getCookie]);

  const isAdmin = useCallback((): boolean => {
    return (
      authState.user?.is_admin_account || authState.user?.is_superuser || false
    );
  }, [authState.user]);

  const isStaff = useCallback((): boolean => {
    return (
      authState.user?.is_staff_account || authState.user?.is_staff || false
    );
  }, [authState.user]);

  const isVolunteer = useCallback((): boolean => {
    return authState.user?.is_volunteer || false;
  }, [authState.user]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const refreshInterval = setInterval(async () => {
      const refreshSuccessful = await refreshToken();

      if (!refreshSuccessful) {
        logout();
      }
    }, 25 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [authState.isAuthenticated, refreshToken, logout]);

  const verifyToken = useCallback(
    async (token?: string): Promise<boolean> => {
      try {
        const accessToken = token || getCookie("access_token");

        if (!accessToken) {
          return false;
        }

        const response = await apiCall("/account/token/verify/", {
          method: "POST",
          body: JSON.stringify({ token: accessToken }),
        });

        return response.ok;
      } catch (err) {
        if (err instanceof Error) {
          console.error("Token verification error:", err);
        }
        return false;
      }
    },
    [apiCall]
  );

  const contextValue: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
    setUserData,
    refreshUserData,
    clearError,
    checkAuth,
    verifyToken,
    isAdmin,
    isStaff,
    isVolunteer,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider };
