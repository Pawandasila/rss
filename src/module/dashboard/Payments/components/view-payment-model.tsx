"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CreditCard,
  Wallet,
  Calendar,
  DollarSign,
  FileText,
  Phone,
  Mail,
  User,
  Hash,
  CheckCircle2,
  XCircle,
  Clock,
  Receipt,
} from "lucide-react";
import Image from "next/image";
import { Payment } from "@/module/dashboard/Payments/hooks";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";

interface ViewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
}

export function ViewPaymentModal({
  isOpen,
  onClose,
  payment,
}: ViewPaymentModalProps) {
  if (!payment) return null;

  const paymentMethod =
    payment.payment_details?.method || payment.method || "Unknown";
  const methodDetails = payment.payment_details?.method_details;
  const acquirerData = payment.payment_details?.acquirer_data;
  const currency = payment.payment_details?.currency || "INR";

  const getStatusConfig = (status: Payment["status"]) => {
    const configs = {
      COMPLETED: {
        icon: CheckCircle2,
        label: "Completed",
        className: "bg-green-500 hover:bg-green-600",
        iconColor: "text-green-600",
      },
      FAILED: {
        icon: XCircle,
        label: "Failed",
        className: "bg-red-500 hover:bg-red-600",
        iconColor: "text-red-600",
      },
      PENDING: {
        icon: Clock,
        label: "Pending",
        className: "bg-orange-500 hover:bg-orange-600",
        iconColor: "text-orange-600",
      },
    };
    return configs[status] || configs.PENDING;
  };

  const getPaymentMethodDisplay = () => {
    const method = paymentMethod.toLowerCase();

    if (method === "card" && methodDetails?.card) {
      const card = methodDetails.card;
      return (
        <div className="flex items-center gap-3">
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
          <span>
            {card.network} {card.type ? `(${card.type})` : ""}
            {card.last4 ? ` •••• ${card.last4}` : ""}
          </span>
        </div>
      );
    } else if (method === "upi" && methodDetails?.upi) {
      return (
        <div className="flex items-center gap-3">
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
          <span>
            UPI {methodDetails.upi.vpa ? `(${methodDetails.upi.vpa})` : ""}
          </span>
        </div>
      );
    } else if (method === "netbanking" && methodDetails?.netbanking) {
      return (
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 relative flex items-center justify-center">
            <Image
              src="/Svg/building.svg"
              alt="Net Banking"
              width={24}
              height={24}
              className="object-contain"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
          <span>
            Net Banking{" "}
            {methodDetails.netbanking.bank
              ? `- ${methodDetails.netbanking.bank}`
              : ""}
          </span>
        </div>
      );
    } else if (method === "wallet" && methodDetails?.wallet) {
      return (
        <div className="flex items-center gap-3">
          <Wallet className="h-6 w-6 text-orange-600" />
          <span>
            Wallet{" "}
            {methodDetails.wallet.wallet
              ? `(${methodDetails.wallet.wallet})`
              : ""}
          </span>
        </div>
      );
    }

    return paymentMethod.toUpperCase();
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
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

  const statusConfig = getStatusConfig(payment.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Receipt className="h-5 w-5 sm:h-6 sm:w-6" />
                Payment Details
              </DialogTitle>
              <DialogDescription className="mt-2 text-xs sm:text-sm">
                Transaction ID: {payment.order_id}
              </DialogDescription>
            </div>
            <Badge className={`${statusConfig.className} text-white text-xs sm:text-sm`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-3 sm:mt-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Customer Information
            </h3>
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm sm:text-base">
                    {getInitials(payment.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-medium text-base sm:text-lg truncate">
                    {payment.name || "N/A"}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1 truncate">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{payment.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      {payment.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              Payment Summary
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1">Amount</div>
                <div className="text-lg sm:text-2xl font-bold text-green-600">
                  {formatCurrency(payment.amount/100, currency)}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1">
                  Payment For
                </div>
                <div className="text-base sm:text-lg font-semibold capitalize truncate">
                  {payment.payment_for}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Details */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              Payment Method
            </h3>
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                <span className="text-xs sm:text-sm text-muted-foreground">Method</span>
                <span className="font-medium text-sm sm:text-base">{getPaymentMethodDisplay()}</span>
              </div>

              {/* Card specific details */}
              {paymentMethod === "card" && methodDetails?.card && (
                <>
                  {methodDetails.card.issuer && (
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Issuing Bank
                      </span>
                      <span className="font-medium capitalize text-sm sm:text-base">
                        {methodDetails.card.issuer}
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Bank details for netbanking */}
              {paymentMethod === "netbanking" &&
                methodDetails?.netbanking?.bank && (
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-muted-foreground">Bank</span>
                    <span className="font-medium capitalize text-sm sm:text-base">
                      {methodDetails.netbanking.bank}
                    </span>
                  </div>
                )}
            </div>
          </div>

          {/* Transaction Details */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Hash className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              Transaction Details
            </h3>
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                <span className="text-xs sm:text-sm text-muted-foreground">Order ID</span>
                <span className="font-mono text-xs sm:text-sm break-all">{payment.order_id}</span>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Payment ID
                </span>
                <span className="font-mono text-xs sm:text-sm break-all">{payment.payment_id}</span>
              </div>

              {acquirerData?.bank_transaction_id && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Bank Transaction ID
                    </span>
                    <span className="font-mono text-xs sm:text-sm break-all">
                      {acquirerData.bank_transaction_id}
                    </span>
                  </div>
                </>
              )}

              {acquirerData?.rrn && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-muted-foreground">RRN</span>
                    <span className="font-mono text-xs sm:text-sm break-all">
                      {acquirerData.rrn}
                    </span>
                  </div>
                </>
              )}

              {acquirerData?.auth_code && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Auth Code
                    </span>
                    <span className="font-mono text-xs sm:text-sm break-all">
                      {acquirerData.auth_code}
                    </span>
                  </div>
                </>
              )}

              {acquirerData?.upi_transaction_id && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      UPI Transaction ID
                    </span>
                    <span className="font-mono text-xs sm:text-sm break-all">
                      {acquirerData.upi_transaction_id}
                    </span>
                  </div>
                </>
              )}

              <Separator />
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0">
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Date & Time
                </span>
                <span className="text-xs sm:text-sm">{formatDate(payment.timestamp)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {payment.notes && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                Notes
              </h3>
              <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-muted-foreground">{payment.notes}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
