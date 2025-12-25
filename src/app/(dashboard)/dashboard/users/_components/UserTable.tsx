"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { User } from "@/types/auth.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Edit,
  Search,
  CheckCircle2,
  Loader2,
  KeyRound,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import useAxios from "@/hooks/use-axios";
import useAuth from "@/hooks/use-auth";
import { getUserImageUrl } from "@/lib/media";

type UserFilterType =
  | "all"
  | "admin"
  | "staff"
  | "member"
  | "volunteer"
  | "business"
  | "verified"
  | "blocked"
  | "non-verified";

export interface UsersFilters {
  search: string;
  type: UserFilterType;
  types?: UserFilterType[];
  dateMode?: "none" | "today" | "custom";
  date?: string; // YYYY-MM-DD
}

type FilteredPagination = {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
};

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onResetPassword: (user: User) => void;
  onDelete: (user: User) => void;
  page: number;
  pageSize: number;
  filters?: UsersFilters;
  onPaginationChange?: (p: FilteredPagination | null) => void;
}

export function UserTable({
  users: initialUsers,
  onEdit,
  onView,
  onResetPassword,
  onDelete,
  page,
  pageSize,
  filters,
  onPaginationChange,
}: UserTableProps) {
  const axios = useAxios();
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<UserFilterType>("all");
  const [isSearching, setIsSearching] = useState(false);
  const [displayUsers, setDisplayUsers] = useState<User[]>(initialUsers);
  const hasSearchedRef = useRef(false);
  const hasFilteredRef = useRef(false);
  const [localPagination, setLocalPagination] = useState<FilteredPagination | null>(null);

  const isControlled = Boolean(filters);

  useEffect(() => {
    if (!hasSearchedRef.current && !hasFilteredRef.current) {
      setDisplayUsers(initialUsers);
    }
  }, [initialUsers]);

  const debounce = (fn: (value: string) => void, wait = 500) => {
    let t: ReturnType<typeof setTimeout> | null = null;
    return (value: string) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn(value), wait);
    };
  };

  const handleFilterChange = useCallback(
    async (filter: UserFilterType) => {
      // Determine if a date filter should be applied
      const dateMode = filters?.dateMode ?? "none";
      const dateVal = filters?.date;
      const hasDateFilter = dateMode === "today" || (dateMode === "custom" && Boolean(dateVal));

      if (filter === "all" && !hasDateFilter) {
        hasFilteredRef.current = false;
        setDisplayUsers(initialUsers);
        setLocalPagination(null);
        onPaginationChange?.(null);
        return;
      }

      setIsSearching(true);
      hasFilteredRef.current = filter !== "all" || hasDateFilter;

      try {
        // Prevent non-admins from requesting admin/staff lists explicitly
        if (!isAdmin() && (filter === "admin" || filter === "staff")) {
          setDisplayUsers([]);
          return;
        }

        const filterParams: Record<string, string | number | boolean | undefined> = {
          page,
          page_size: pageSize,
        };

        // Apply date filter if provided via controlled filters
        if (dateMode === "today") {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, "0");
          const dd = String(today.getDate()).padStart(2, "0");
          filterParams.date_joined = `${yyyy}-${mm}-${dd}`;
        } else if (dateMode === "custom" && dateVal) {
          filterParams.date_joined = dateVal;
        }

        if (!isAdmin()) {
          filterParams.is_admin_account = false;
          filterParams.is_staff_account = false;
        }

        switch (filter) {
          case "admin":
            filterParams.is_admin_account = true;
            break;
          case "staff":
            filterParams.is_staff_account = true;
            break;
          case "member":
            filterParams.is_member_account = true;
            break;
          case "volunteer":
            filterParams.is_volunteer = true;
            break;
          case "verified":
            filterParams.is_verified = true;
            break;
          case "non-verified":
            filterParams.is_verified = false;
            break;
          case "blocked":
            filterParams.is_blocked = true;
            break;
          case "business":
            filterParams.is_business_account = true;
            break;
        }

        const response = await axios.get("/account/list/", {
          params: filterParams,
        });

        const userData = response.data as
          | {
              count?: number;
              total_pages?: number;
              current_page?: number;
              next?: string | null;
              previous?: string | null;
              results?: User[];
              data?: User[];
            }
          | User[];
        let filterResults: User[] = [];

        if (Array.isArray(userData)) {
          filterResults = userData;
        } else if (userData && Array.isArray(userData.results)) {
          filterResults = userData.results;
        } else if (userData && Array.isArray(userData.data)) {
          filterResults = userData.data;
        }

        setDisplayUsers(filterResults);

        let nextLocal: FilteredPagination | null = null;
        if (userData && typeof userData === "object" && ("count" in userData || "total_pages" in userData)) {
          const count = Number(userData.count ?? filterResults.length ?? 0);
          const total_pages = Number(userData.total_pages ?? Math.max(1, Math.ceil(count / pageSize)));
          const current_page = Number(userData.current_page ?? page);
          nextLocal = {
            count,
            total_pages,
            current_page,
            next: userData.next ?? null,
            previous: userData.previous ?? null,
          };
        } else {
          const count = filterResults.length;
          nextLocal = {
            count,
            total_pages: Math.max(1, Math.ceil(count / pageSize)),
            current_page: page,
            next: null,
            previous: null,
          };
        }
        setLocalPagination(nextLocal);
        onPaginationChange?.(nextLocal);
      } catch (error) {
        console.error("Filter error:", error);
      } finally {
        setIsSearching(false);
      }
    },
    [axios, page, pageSize, isAdmin, filters, initialUsers, onPaginationChange]
  );

  const applyCombinedFilters = useCallback(
    async (selected: UserFilterType[]) => {
      const effective = selected.filter((t) => t !== "all");
      if (effective.length === 0) {
        hasFilteredRef.current = false;
        setDisplayUsers(initialUsers);
        setLocalPagination(null);
        onPaginationChange?.(null);
        return;
      }

      setIsSearching(true);
      hasFilteredRef.current = true;
      try {
        const params: Record<string, string | number | boolean | undefined> = {
          page,
          page_size: pageSize,
        };

        if (!isAdmin()) {
          params.is_admin_account = false;
          params.is_staff_account = false;
        }

        const dateMode = filters?.dateMode ?? "none";
        const dateVal = filters?.date;
        if (dateMode === "today") {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, "0");
          const dd = String(today.getDate()).padStart(2, "0");
          params.date_joined = `${yyyy}-${mm}-${dd}`;
        } else if (dateMode === "custom" && dateVal) {
          params.date_joined = dateVal;
        }

        let verifiedFlag: boolean | undefined = undefined;
        for (const filter of effective) {
          if (!isAdmin() && (filter === "admin" || filter === "staff")) {
            continue;
          }
          switch (filter) {
            case "admin":
              params.is_admin_account = true;
              break;
            case "staff":
              params.is_staff_account = true;
              break;
            case "member":
              params.is_member_account = true;
              break;
            case "volunteer":
              params.is_volunteer = true;
              break;
            case "verified":
              verifiedFlag = true;
              break;
            case "non-verified":
              verifiedFlag = false;
              break;
            case "blocked":
              params.is_blocked = true;
              break;
            case "business":
              params.is_business_account = true;
              break;
          }
        }

        if (verifiedFlag !== undefined) {
          params.is_verified = verifiedFlag;
        }

        const response = await axios.get("/account/list/", { params });
        const userData = response.data as
          | {
              count?: number;
              total_pages?: number;
              current_page?: number;
              next?: string | null;
              previous?: string | null;
              results?: User[];
              data?: User[];
            }
          | User[];

        let results: User[] = [];
        if (Array.isArray(userData)) results = userData;
        else if (userData && Array.isArray(userData.results)) results = userData.results as User[];
        else if (userData && Array.isArray(userData.data)) results = userData.data as User[];

        setDisplayUsers(results);

        // derive pagination from server when available
        let nextLocal: FilteredPagination | null = null;
        if (userData && typeof userData === "object" && ("count" in userData || "total_pages" in userData)) {
          const count = Number(userData.count ?? results.length ?? 0);
          const total_pages = Number(userData.total_pages ?? Math.max(1, Math.ceil(count / pageSize)));
          const current_page = Number(userData.current_page ?? page);
          nextLocal = {
            count,
            total_pages,
            current_page,
            next: userData.next ?? null,
            previous: userData.previous ?? null,
          };
        } else {
          const count = results.length;
          nextLocal = {
            count,
            total_pages: Math.max(1, Math.ceil(count / pageSize)),
            current_page: page,
            next: null,
            previous: null,
          };
        }
        setLocalPagination(nextLocal);
        onPaginationChange?.(nextLocal);
      } catch (e) {
        console.error("Combined filter error:", e);
      } finally {
        setIsSearching(false);
      }
    },
    [axios, isAdmin, page, pageSize, initialUsers, onPaginationChange]
  );

  const handleSearchChange = useCallback(
    async (searchValue: string) => {
      setIsSearching(true);

      try {
        if (searchValue.trim()) {
          hasSearchedRef.current = true;
          const params: Record<string, string | number | boolean | undefined> = {
            search: searchValue.trim(),
            page,
            page_size: pageSize,
          };
          const dateMode = filters?.dateMode ?? "none";
          const dateVal = filters?.date;
          if (dateMode === "today") {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, "0");
            const dd = String(today.getDate()).padStart(2, "0");
            params.date_joined = `${yyyy}-${mm}-${dd}`;
          } else if (dateMode === "custom" && dateVal) {
            params.date_joined = dateVal;
          }

          const response = await axios.get("/account/list/", { params });

          const userData = response.data as
            | {
                count?: number;
                total_pages?: number;
                current_page?: number;
                next?: string | null;
                previous?: string | null;
                results?: User[];
                data?: User[];
              }
            | User[];
          let searchResults: User[] = [];

          if (Array.isArray(userData)) {
            searchResults = userData;
          } else if (userData && Array.isArray(userData.results)) {
            searchResults = userData.results;
          } else if (userData && Array.isArray(userData.data)) {
            searchResults = userData.data;
          }

          setDisplayUsers(searchResults);
          // pagination from search
          let nextLocal: FilteredPagination | null = null;
          if (userData && typeof userData === "object" && ("count" in userData || "total_pages" in userData)) {
            const count = Number(userData.count ?? searchResults.length ?? 0);
            const total_pages = Number(userData.total_pages ?? Math.max(1, Math.ceil(count / pageSize)));
            const current_page = Number(userData.current_page ?? page);
            nextLocal = {
              count,
              total_pages,
              current_page,
              next: userData.next ?? null,
              previous: userData.previous ?? null,
            };
          } else {
            const count = searchResults.length;
            nextLocal = {
              count,
              total_pages: Math.max(1, Math.ceil(count / pageSize)),
              current_page: page,
              next: null,
              previous: null,
            };
          }
          setLocalPagination(nextLocal);
          onPaginationChange?.(nextLocal);
        } else if (searchValue.trim() === "" && hasSearchedRef.current) {
          hasSearchedRef.current = false;
          setDisplayUsers(initialUsers);
          setLocalPagination(null);
          onPaginationChange?.(null);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    },
    [axios, page, pageSize, initialUsers, filters, onPaginationChange]
  );

  const debouncedSearchRef = useRef(handleSearchChange);
  useEffect(() => {
    debouncedSearchRef.current = handleSearchChange;
  }, [handleSearchChange]);

  const debouncedInvokerRef = useRef<((value: string) => void) | null>(null);
  useEffect(() => {
    debouncedInvokerRef.current = debounce((value: string) => {
      debouncedSearchRef.current(value);
    }, 500);
  }, []);

  
  useEffect(() => {
    if (isControlled) return;
    if (searchTerm === "" && !hasSearchedRef.current) {
      return;
    }
    if (searchTerm !== "") {
      hasSearchedRef.current = true;
    }
    debouncedInvokerRef.current?.(searchTerm);
  }, [searchTerm, isControlled]);

  
  useEffect(() => {
    if (isControlled) return;
    handleFilterChange(filterType);
  }, [filterType, handleFilterChange, isControlled]);

  
  useEffect(() => {
    if (!isControlled || !filters) return;
    const nextSearch = filters.search ?? "";
    const selected = filters.types ?? [];
    const nextType: UserFilterType = filters.type ?? "all";

    if (nextSearch.trim()) {
      hasSearchedRef.current = true;
      debouncedSearchRef.current(nextSearch);
    } else {
      hasSearchedRef.current = false;
      // Do not reset here; filtering below will set the list
    }

    if (selected.length > 1) {
      applyCombinedFilters(selected);
    } else if (selected.length === 1) {
      handleFilterChange(selected[0]);
    } else {
      handleFilterChange(nextType);
    }
  }, [filters, isControlled, initialUsers, handleFilterChange, applyCombinedFilters]);

  const getUserRoles = (
    user: User
  ): Array<{
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }> => {
    const roles: Array<{
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
    }> = [];

    if (user.is_blocked) {
      roles.push({ label: "Blocked", variant: "destructive" });
    }

    if (user.is_admin_account || user.is_superuser) {
      roles.push({ label: "Admin", variant: "destructive" });
    }
    if (user.is_staff_account) {
      roles.push({ label: "Staff", variant: "default" });
    }
    if (user.is_volunteer) {
      roles.push({ label: "Volunteer", variant: "outline" });
    }
    if (user.is_member_account) {
      roles.push({ label: "Member", variant: "secondary" });
    }
    if (user.is_business_account) {
      roles.push({ label: "Business", variant: "outline" });
    }
    if (user.is_field_worker) {
      roles.push({ label: "Field Worker", variant: "outline" });
    }

    if (roles.length === 0) {
      roles.push({ label: "User", variant: "secondary" });
    }

    return roles;
  };


  const getInitials = (name: string | null | undefined) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  
  // Use displayUsers directly to maintain backend order (newest first)
  const sortedUsers = displayUsers;

  return (
    <div className="space-y-4">
      {!isControlled && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 text-sm"
              autoComplete="off"
              type="text"
              disabled={isSearching}
            />
            {isSearching && (
              <Loader2 className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground animate-spin" />
            )}
          </div>
          <Select value={filterType} onValueChange={(v: UserFilterType) => setFilterType(v)}>
            <SelectTrigger className="w-full sm:w-[160px] lg:w-[180px] h-9 sm:h-10 text-sm">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">User</TableHead>
              <TableHead className="text-xs sm:text-sm">
                {/* <Button
                  variant="ghost"
                  onClick={toggleSortOrder}
                  className="h-8 p-0 hover:bg-transparent text-xs sm:text-sm"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button> */}
                Name
              </TableHead>
              <TableHead className="hidden md:table-cell text-xs sm:text-sm">Email</TableHead>
              <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Phone</TableHead>
              <TableHead className="hidden lg:table-cell text-xs sm:text-sm">Profession</TableHead>
              <TableHead className="hidden xl:table-cell text-xs sm:text-sm">Gender</TableHead>
              <TableHead className="text-xs sm:text-sm">Roles</TableHead>
              <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 sm:py-8 text-xs sm:text-sm text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              sortedUsers.map((user) => {
                const userRoles = getUserRoles(user);
                const userImageUrl = getUserImageUrl(user.image);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        {userImageUrl && (
                          <AvatarImage src={userImageUrl} alt={user.name || "User"} />
                        )}
                        <AvatarFallback className="text-xs sm:text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium text-xs sm:text-sm">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="truncate md:max-w-[100px] max-w-[160px]"
                            title={user.name || ""}
                          >
                            {user.name}
                          </span>
                          {user.referred_by && (
                            <Badge 
                              variant="outline" 
                              className="bg-pink-50 text-pink-700 border-pink-200 text-xs px-1.5 py-0.5 hidden sm:inline-flex"
                            >
                              Referred
                            </Badge>
                          )}
                          {user.is_verified && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Verified User</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        {user.date_joined && (
                          <div className="text-[11px] sm:text-xs text-muted-foreground">
                            Joined on {new Date(user.date_joined).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
                          </div>
                        )}
                        <div className="md:hidden space-y-0.5">
                          <div className="text-xs text-muted-foreground truncate">
                            <Link href={`mailto:${user.email}`} className="hover:underline">
                              {user.email}
                            </Link>
                          </div>
                          <div className="sm:hidden text-xs text-muted-foreground">
                            {user.phone ? (
                              <a href={`tel:${user.phone}`} className="hover:underline">{user.phone}</a>
                            ) : "N/A"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs sm:text-sm text-muted-foreground">
                      <Link
                        href={`mailto:${user.email}`}
                        className="hover:text-blue-600 hover:underline truncate block"
                      >
                        {user.email}
                      </Link>
                        {user?.member_payment_status && (
                          <span className="font-bold text-black">
                          <Badge
                            variant="outline"
                          >
                            {user?.member_payment_status}
                          </Badge>
                        </span>
                        )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                      {user.phone ? (
                        <a
                          href={`tel:${user.phone}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {user.phone}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell capitalize text-xs sm:text-sm truncate md:max-w-[100px] max-w-[160px] ">
                      {user.profession || "N/A"}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell capitalize text-xs sm:text-sm">
                      {user.gender || "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {userRoles.map((role, index) => (
                          <Badge key={index} variant={role.variant} className="text-xs">
                            {role.label}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                                onClick={() => onView(user)}
                              >
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                                onClick={() => onEdit(user)}
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit User</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8 text-orange-600 hover:text-orange-700"
                                onClick={() => onResetPassword(user)}
                              >
                                <KeyRound className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Reset Password</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => onDelete(user)}
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete User</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
