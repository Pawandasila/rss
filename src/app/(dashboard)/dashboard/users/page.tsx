"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types/auth.types";
import { UserStats } from "./_components/UserStats";
import { UserTable } from "./_components/UserTable";
import { UserDetailModal } from "@/module/dashboard/users/components/user-detail-model";
import { EditUserDetailModal } from "@/module/dashboard/users/components/edit-user-detail-model";
import { useUsers, useUserById } from "@/module/dashboard/users/hooks";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RoleGuard } from "@/components/auth/RoleGuard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/use-axios";
import { Loader2 } from "lucide-react";
import useAuth from "@/hooks/use-auth";
import UsersSearchAndFilter, {
  UsersSearchFilters,
} from "./_components/SearchAndFilter";

function UsersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const pageSizeFromUrl = parseInt(searchParams.get("page_size") || "30", 10);

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [pageSize, setPageSize] = useState(pageSizeFromUrl);
  const { isAdmin, isStaff } = useAuth();
  const axios = useAxios();

  const { users, loading, error, pagination, updateUser } = useUsers(
    currentPage,
    pageSize
  );
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState<UsersSearchFilters>({
    search: "",
    type: "all",
    types: [],
    dateMode: "none",
  });
  const [filteredPagination, setFilteredPagination] = useState<{
    count: number;
    total_pages: number;
    current_page: number;
    next: string | null;
    previous: string | null;
  } | null>(null);

  const { user: selectedUser, loading: userLoading } = useUserById(
    selectedUserId || 0
  );

  const { user: editingUser } = useUserById(editingUserId || 0);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const hasPage = currentParams.has("page");
    const hasPageSize = currentParams.has("page_size");

    if (!hasPage || !hasPageSize) {
      currentParams.set("page", pageFromUrl.toString());
      currentParams.set("page_size", pageSizeFromUrl.toString());
      router.replace(`?${currentParams.toString()}`, { scroll: false });
    }
  }, [pageFromUrl, pageSizeFromUrl, router, searchParams]);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    setPageSize(pageSizeFromUrl);
  }, [pageFromUrl, pageSizeFromUrl]);

  if (!isStaff() && !isAdmin()) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            User Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("page_size", pageSize.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    setCurrentPage(newPage);
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setIsEditModalOpen(true);
  };

  const handleFiltersChange = (next: UsersSearchFilters) => {
    setFilters(next);
    if (currentPage !== 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      params.set("page_size", pageSize.toString());
      router.replace(`?${params.toString()}`, { scroll: false });
      setCurrentPage(1);
    }
    // reset filtered pagination; next fetch will set it again
    setFilteredPagination(null);
  };

  const handleSaveEdit = async (userId: number, data: any) => {
    setIsSaving(true);
    try {
      const result = await updateUser(userId, data);
      if (result.success) {
        toast.success("User updated successfully", {
          description: "The user information has been updated",
        });
        setIsEditModalOpen(false);
        setEditingUserId(null);
      } else {
        toast.error("Failed to update user", {
          description: result.error,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error("Failed to update user", {
          description: `An unexpected error occurred`,
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleView = (user: User) => {
    setSelectedUserId(user.id);
    setIsViewModalOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setResetPasswordUser(user);
    setNewPassword("");
    setIsResetPasswordOpen(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`/account/detail/${userToDelete.id}/`);

      toast.success("User deleted successfully", {
        description: `${userToDelete.name} has been removed from the system`,
      });

      setIsDeleteDialogOpen(false);
      setUserToDelete(null);

      // Refresh the page to update the user list
      window.location.reload();
    } catch (error: unknown) {
      console.error("Error deleting user:", error);
      const axiosError = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const errorMessage =
        axiosError?.response?.data?.error ||
        axiosError?.response?.data?.message ||
        "Failed to delete user";
      toast.error("Delete failed", {
        description: errorMessage,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetPasswordSubmit = async () => {
    if (!resetPasswordUser || !newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsResettingPassword(true);
    try {
      await axios.post(`/account/change-password/${resetPasswordUser.id}/`, {
        new_password: newPassword,
      });

      toast.success("Password reset successfully", {
        description: `Password for ${resetPasswordUser.name} has been updated`,
      });

      setIsResetPasswordOpen(false);
      setResetPasswordUser(null);
      setNewPassword("");
    } catch (error: unknown) {
      console.error("Error resetting password:", error);
      const axiosError = error as {
        response?: { data?: { error?: string; message?: string } };
      };
      const errorMessage =
        axiosError?.response?.data?.error ||
        axiosError?.response?.data?.message ||
        "Failed to reset password";
      toast.error("Password reset failed", {
        description: errorMessage,
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            User Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage all users, volunteers, staff, and administrators
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
              Loading users...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            User Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage all users, volunteers, staff, and administrators
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-sm sm:text-base text-destructive font-semibold">
              Error loading users
            </p>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          User Management
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage all users, volunteers, staff, and administrators
        </p>
      </div>

      <UserStats />

      <UsersSearchAndFilter
        value={filters}
        onChange={handleFiltersChange}
        loading={loading}
      />
      <UserTable
        users={safeUsers}
        onEdit={handleEdit}
        onView={handleView}
        onResetPassword={handleResetPassword}
        onDelete={handleDelete}
        page={currentPage}
        pageSize={pageSize}
        filters={filters}
        onPaginationChange={setFilteredPagination}
      />

      {(() => {
        const filtersActive =
          Boolean(filters.search?.trim()) ||
          (filters.types && filters.types.length > 0) ||
          (filters.type && filters.type !== "all") ||
          (filters.dateMode ?? "none") !== "none";
        const pg =
          filtersActive && filteredPagination ? filteredPagination : pagination;
        const totalPages = Math.max(1, Number(pg.total_pages || 1));
        const currPage = Number(pg.current_page || currentPage);
        const hasAny = Number(pg.count || 0) > 0;
        if (!hasAny) return null;
        return (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <span className="font-medium text-foreground whitespace-nowrap">
                Page {currPage} of {totalPages}
              </span>
              <span className="text-muted-foreground hidden sm:inline">•</span>
              <span className="text-muted-foreground whitespace-nowrap">
                {pg.count} total user{pg.count !== 1 ? "s" : ""}
              </span>
            </div>

            <Pagination>
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        filtersActive
                          ? filteredPagination?.previous
                          : pagination.previous
                      ) {
                        handlePageChange(currPage - 1);
                      }
                    }}
                    className={`
                    transition-all duration-200
                    ${
                      !(filtersActive
                        ? filteredPagination?.previous
                        : pagination.previous)
                        ? "pointer-events-none opacity-40 cursor-not-allowed"
                        : "cursor-pointer hover:bg-orange-500/10 hover:text-orange-600 hover:border-orange-200"
                    }
                  `}
                    aria-disabled={
                      !(filtersActive
                        ? filteredPagination?.previous
                        : pagination.previous)
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const showPage =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currPage - 1 && pageNum <= currPage + 1);

                    const showEllipsisBefore =
                      pageNum === currPage - 2 && currPage > 3;
                    const showEllipsisAfter =
                      pageNum === currPage + 2 && currPage < totalPages - 2;

                    if (showEllipsisBefore || showEllipsisAfter) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationEllipsis className="text-muted-foreground" />
                        </PaginationItem>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={pageNum === currPage}
                          className={`
                        cursor-pointer transition-all duration-200 min-w-[40px]
                        ${
                          pageNum === currPage
                            ? "bg-orange-500 text-white hover:bg-orange-600 border-orange-500 shadow-sm font-semibold"
                            : "hover:bg-orange-500/10 hover:text-orange-600 hover:border-orange-200"
                        }
                      `}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        filtersActive
                          ? filteredPagination?.next
                          : pagination.next
                      ) {
                        handlePageChange(currPage + 1);
                      }
                    }}
                    className={`
                    transition-all duration-200
                    ${
                      !(filtersActive
                        ? filteredPagination?.next
                        : pagination.next)
                        ? "pointer-events-none opacity-40 cursor-not-allowed"
                        : "cursor-pointer hover:bg-orange-500/10 hover:text-orange-600 hover:border-orange-200"
                    }
                  `}
                    aria-disabled={
                      !(filtersActive
                        ? filteredPagination?.next
                        : pagination.next)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <select
              value={pageSize}
              onChange={(e) => {
                const newSize = parseInt(e.target.value, 10);
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", "1");
                params.set("page_size", newSize.toString());
                router.push(`?${params.toString()}`, { scroll: false });
              }}
              className="text-xs sm:text-sm border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 bg-background hover:bg-accent transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full sm:w-auto sm:min-w-[140px]"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="30">30 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>
        );
      })()}

      <UserDetailModal
        user={selectedUser}
        open={isViewModalOpen}
        onOpenChange={(open) => {
          setIsViewModalOpen(open);
          if (!open) {
            setSelectedUserId(null);
          }
        }}
        loading={userLoading}
      />

      <EditUserDetailModal
        user={editingUser}
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) {
            setEditingUserId(null);
          }
        }}
        onSave={handleSaveEdit}
        loading={isSaving}
      />

      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset User Password</DialogTitle>
            <DialogDescription>
              Set a new password for {resetPasswordUser?.name}. The user will be
              able to log in with this new password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password (min 8 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newPassword.length >= 8) {
                    handleResetPasswordSubmit();
                  }
                }}
                disabled={isResettingPassword}
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsResetPasswordOpen(false);
                setNewPassword("");
              }}
              disabled={isResettingPassword}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleResetPasswordSubmit}
              disabled={isResettingPassword || newPassword.length < 8}
            >
              {isResettingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action
              cannot be undone and will permanently remove the user and all
              associated data from the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setUserToDelete(null);
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function UsersPage() {
  return (
    <RoleGuard allowedRoles="auto" showUnauthorized={true}>
      <Suspense
        fallback={
          <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                User Management
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage all users, volunteers, staff, and administrators
              </p>
            </div>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
                  Loading...
                </p>
              </div>
            </div>
          </div>
        }
      >
        <UsersPageContent />
      </Suspense>
    </RoleGuard>
  );
}
