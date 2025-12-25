"use client";

import React, { useEffect, useMemo, useState, forwardRef, useImperativeHandle } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, ArrowUpDown, Loader2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewPaymentModal } from "@/module/dashboard/Payments/components/view-payment-model";
import { usePayments, type Payment } from "@/module/dashboard/Payments/hooks";
import { EditPaymentModal } from "@/module/dashboard/Payments/components/edit-payment-modal";
import { DeletePaymentDialog } from "@/module/dashboard/Payments/components/delete-payment-dialog";
import useAuth from "@/hooks/use-auth";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";

const STATUS_FILTER_MAP = {
  all: undefined,
  success: "COMPLETED",
  failed: "FAILED",
  pending: "PENDING",
  refunded: "REFUNDED",
} as const;

const TYPE_FILTER_MAP = {
  all: undefined,
  donation: "donation",
  subscription: "subscription",
  membership: "membership",
  general: "general",
} as const;

type FilterStatus = keyof typeof STATUS_FILTER_MAP;
type FilterType = keyof typeof TYPE_FILTER_MAP;

export interface PaymentsFilters {
  search: string;
  status: FilterStatus;
  type: FilterType;
  date: "all" | "today";
}

interface TransactionTableProps {
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  filters?: PaymentsFilters;
}

export type TransactionTableHandle = {
  exportToCSV: () => void;
};

export const TransactionTable = forwardRef<TransactionTableHandle, TransactionTableProps>(function TransactionTable({
  page,
  pageSize,
  onPageChange,
  filters,
}: TransactionTableProps, ref) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingPaymentId, setLoadingPaymentId] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activePayment, setActivePayment] = useState<Payment | null>(null);

  const {
    payments,
    loading,
    error,
    pagination,
    getPaymentById,
    updateFilters,
    resetFilters,
    updatePayment,
    deletePayment,
  } = usePayments(page, pageSize);

  const { isAdmin } = useAuth();

  const isControlled = Boolean(filters);

  useEffect(() => {
    return () => {
      resetFilters();
    };
  }, [resetFilters]);

  useEffect(() => {
    if (!isControlled || !filters) return;
    updateFilters({
      search: filters.search?.trim() || undefined,
      status: STATUS_FILTER_MAP[filters.status],
      payment_for: TYPE_FILTER_MAP[filters.type],
      date: filters.date === "today"
        ? new Date().toISOString().slice(0, 10)
        : undefined,
    });
  }, [isControlled, filters, updateFilters]);

  const currentPage = pagination.current_page ?? page;
  const totalPages = Math.max(1, pagination.total_pages ?? 1);
  const totalCount = pagination.count ?? payments.length;
  const canGoToPrevious = currentPage > 1;
  const canGoToNext = currentPage < totalPages;
  const showPagination = totalPages >= 1;

  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem =
    totalCount === 0
      ? 0
      : Math.min(startItem + payments.length - 1, totalCount);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: Array<number | "ellipsis"> = [];
    const windowSize = 2;
    const firstPage = 1;
    const lastPage = totalPages;
    const windowStart = Math.max(firstPage + 1, currentPage - windowSize);
    const windowEnd = Math.min(lastPage - 1, currentPage + windowSize);

    pages.push(firstPage);

    if (windowStart > firstPage + 1) {
      pages.push("ellipsis");
    }

    for (
      let pageNumber = windowStart;
      pageNumber <= windowEnd;
      pageNumber += 1
    ) {
      pages.push(pageNumber);
    }

    if (windowEnd < lastPage - 1) {
      pages.push("ellipsis");
    }

    pages.push(lastPage);

    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (nextPage: number) => {
    if (loading) return;
    if (nextPage === currentPage) return;
    if (nextPage < 1 || nextPage > totalPages) return;
    onPageChange(nextPage);
  };

  const handleViewPayment = async (payment: Payment) => {
    if (payment.payment_details) {
      setSelectedPayment(payment);
      setIsModalOpen(true);
      return;
    }

    try {
      setLoadingPaymentId(payment.id);

      const paymentDetails = await getPaymentById(payment.id);

      if (paymentDetails) {
        setSelectedPayment(paymentDetails);
        setIsModalOpen(true);
      } else {
        toast("Failed to load payment details", {
          description: "Unable to fetch payment information. Please try again.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching payment details:", error);

        toast.error("Failed to load payment details", {
          description:
            error.message ||
            "An error occurred while fetching payment information.",
        });
      }
    } finally {
      setLoadingPaymentId(null);
    }
  };

  const handleEditClick = (payment: Payment) => {
    setActivePayment(payment);
    setEditOpen(true);
  };

  const handleDeleteClick = (payment: Payment) => {
    setActivePayment(payment);
    setDeleteOpen(true);
  };

  const getStatusBadge = (status: Payment["status"]) => {
    const variants = {
      COMPLETED: {
        variant: "default" as const,
        label: "Completed",
        class: "bg-green-500 hover:bg-green-600",
      },
      FAILED: { variant: "destructive" as const, label: "Failed", class: "" },
      PENDING: {
        variant: "secondary" as const,
        label: "Pending",
        class: "bg-orange-500 hover:bg-orange-600 text-white",
      },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.class}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    return (
      <Badge variant="outline" className="border-blue-500 text-blue-600">
        {typeLabel}
      </Badge>
    );
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sortedPayments = [...payments].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Payment ID",
      "Customer Name",
      "Email",
      "Phone",
      "Amount (INR)",
      "Status",
      "Payment Method",
      "Method Details",
      "Payment For",
      "Date",
      "Notes",
    ];

    const rows = sortedPayments.map((payment) => {
      const method = payment.payment_details?.method || payment.method || "N/A";
      let methodDetail = "";

      const details = payment.payment_details?.method_details;
      if (details?.card?.network) {
        methodDetail = `${details.card.network} ${details.card.type || ""} ****${details.card.last4 || ""}`.trim();
      } else if (details?.upi?.vpa) {
        methodDetail = details.upi.vpa;
      } else if (details?.netbanking?.bank) {
        methodDetail = details.netbanking.bank;
      } else if (details?.wallet?.wallet) {
        methodDetail = details.wallet.wallet;
      }

      return [
        payment.order_id,
        payment.payment_id,
        payment.name,
        payment.email,
        payment.phone,
        (payment.amount / 100).toFixed(2),
        payment.status,
        method,
        methodDetail,
        payment.payment_for,
        new Intl.DateTimeFormat("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(payment.timestamp)),
        payment.notes || "",
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            const cellStr = String(cell ?? "");
            if (cellStr.includes(",") || cellStr.includes('"') || cellStr.includes("\n")) {
              return '"' + cellStr.replace(/"/g, '""') + '"';
            }
            return cellStr;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const fileName = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useImperativeHandle(ref, () => ({
    exportToCSV,
  }));

  const getPaymentMethodIcon = (payment: Payment) => {
    const method = payment.payment_details?.method || payment.method;

    if (!method) {
      return <span className="text-sm text-muted-foreground">N/A</span>;
    }

    const methodLower = method.toLowerCase();

    if (methodLower === "upi") {
      const vpa = payment.payment_details?.method_details?.upi?.vpa;
      return (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 relative flex items-center justify-center">
            <Image
              src="/Svg/upi.svg"
              alt="UPI"
              width={24}
              height={24}
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">UPI</span>
            {vpa && (
              <span className="text-xs text-muted-foreground">{vpa}</span>
            )}
          </div>
        </div>
      );
    }

    if (methodLower === "card") {
      const cardDetails = payment.payment_details?.method_details?.card;
      const cardInfo = cardDetails
        ? `${cardDetails.network || ""} ${cardDetails.type || ""}`.trim()
        : "Card";
      const last4 = cardDetails?.last4;

      return (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 relative flex items-center justify-center">
            <Image
              src="/Svg/credit.svg"
              alt="Card"
              width={24}
              height={24}
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{cardInfo}</span>
            {last4 && (
              <span className="text-xs text-muted-foreground">
                •••• {last4}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (methodLower === "netbanking") {
      const bank = payment.payment_details?.method_details?.netbanking?.bank;
      return (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 relative flex items-center justify-center">
            <Image
              src="/Svg/netBanking.svg"
              alt="Net Banking"
              width={24}
              height={24}
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Net Banking</span>
            {bank && (
              <span className="text-xs text-muted-foreground capitalize">
                {bank}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (methodLower === "wallet") {
      const walletName =
        payment.payment_details?.method_details?.wallet?.wallet;
      return (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 relative flex items-center justify-center">
            <Image
              src="/Svg/wallet.svg"
              alt="Wallet"
              width={24}
              height={24}
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Wallet</span>
            {walletName && (
              <span className="text-xs text-muted-foreground capitalize">
                {walletName}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (methodLower === "cash") {
      return (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 relative flex items-center justify-center">
            <Image
              src="/Svg/cash.svg"
              alt="Cash"
              width={24}
              height={24}
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
          <span className="text-sm font-medium">CASH</span>
        </div>
      );
    }

    return <span className="text-sm capitalize">{method}</span>;
  };

  return (
    <div className="space-y-4 p-4 sm:p-0">

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">
                Transaction ID
              </TableHead>
              <TableHead className="text-xs sm:text-sm">User</TableHead>
              <TableHead className="text-xs sm:text-sm">Amount</TableHead>
              <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                Type
              </TableHead>
              <TableHead className="hidden lg:table-cell text-xs sm:text-sm">
                Payment Method
              </TableHead>
              <TableHead className="hidden sm:table-cell text-xs sm:text-sm">
                Status
              </TableHead>
              <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                <Button
                  variant="ghost"
                  onClick={toggleSortOrder}
                  className="h-8 p-0 hover:bg-transparent text-xs sm:text-sm"
                >
                  Date
                  <ArrowUpDown className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right text-xs sm:text-sm">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 sm:py-8">
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : sortedPayments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 sm:py-8 text-muted-foreground text-xs sm:text-sm"
                >
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              sortedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium font-mono text-xs">
                    <span className="flex flex-col truncate md:max-w-[150px] max-w-[160px]">
                      {payment.payment_id}
                      {payment.is_manual && (
                        <Badge
                          variant="destructive"
                          className="ml-2 text-[10px] py-0.5 px-1.5"
                        >
                          Manual
                        </Badge>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                        <AvatarFallback>
                          {getInitials(payment.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="font-medium truncate md:max-w-[100px] max-w-[160px]">
                          {payment.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate md:max-w-[180px] max-w-[160px]">
                          {payment.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-xs sm:text-sm">
                    {formatCurrency(payment.amount / 100, "INR")}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getTypeBadge(payment.payment_for)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell truncate md:max-w-[100px] max-w-[160px]">
                    {getPaymentMethodIcon(payment)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs sm:text-sm text-muted-foreground">
                    {formatDate(payment.timestamp)}
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleViewPayment(payment)}
                            disabled={
                              loading || loadingPaymentId === payment.id
                            }
                          >
                            {loadingPaymentId === payment.id ? (
                              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                            ) : (
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Details</p>
                        </TooltipContent>
                      </Tooltip>
                      {(isAdmin()) && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditClick(payment)}
                                disabled={loading}
                              >
                                <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteClick(payment)}
                                disabled={loading}
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-0">
        <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
          {totalCount > 0
            ? `Showing ${startItem.toLocaleString()} - ${endItem.toLocaleString()} of ${totalCount.toLocaleString()} results`
            : "No results to display"}
        </p>

        {showPagination && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    if (canGoToPrevious) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  aria-disabled={!canGoToPrevious || loading}
                  tabIndex={!canGoToPrevious || loading ? -1 : undefined}
                  className={cn(
                    !canGoToPrevious || loading
                      ? "pointer-events-none opacity-50"
                      : ""
                  )}
                />
              </PaginationItem>

              {pageNumbers.map((pageToken, index) => (
                <PaginationItem
                  key={
                    typeof pageToken === "number"
                      ? `page-${pageToken}`
                      : `ellipsis-${index}`
                  }
                >
                  {pageToken === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        handlePageChange(pageToken);
                      }}
                      isActive={pageToken === currentPage}
                      aria-disabled={loading}
                      tabIndex={loading ? -1 : undefined}
                      className={cn(
                        loading ? "pointer-events-none opacity-50" : ""
                      )}
                    >
                      {pageToken}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    if (canGoToNext) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  aria-disabled={!canGoToNext || loading}
                  tabIndex={!canGoToNext || loading ? -1 : undefined}
                  className={cn(
                    !canGoToNext || loading
                      ? "pointer-events-none opacity-50"
                      : ""
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <ViewPaymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPayment(null);
        }}
        payment={selectedPayment}
      />

      <EditPaymentModal
        open={editOpen}
        onOpenChange={(o) => {
          setEditOpen(o);
          if (!o) setActivePayment(null);
        }}
        payment={activePayment}
        onSave={async (id, data) => {
          const result = await updatePayment(id, data);
          if (result.success) {
            toast.success("Payment updated", { description: "Changes saved successfully" });
          } else {
            toast.error("Update failed", { description: result.message || "Unable to update right now" });
          }
          return result;
        }}
      />

      <DeletePaymentDialog
        open={deleteOpen}
        onOpenChange={(o) => {
          setDeleteOpen(o);
          if (!o) setActivePayment(null);
        }}
        payment={activePayment}
        onConfirm={async (id) => {
          const result = await deletePayment(id);
          if (result.success) {
            toast.success("Payment deleted", { description: "The transaction was removed" });
          } else {
            toast.error("Delete failed", { description: result.message || "Unable to delete right now" });
          }
          return result;
        }}
      />
    </div>
  );
});
