"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Loader2,
} from "lucide-react";
import { usePaymentStats } from "@/module/dashboard/Payments/hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";

export function PaymentStats({ date }: { date?: string }) {
  const { stats, loading, error, refetch } = usePaymentStats(date);
  const { isAdmin, isStaff } = useAuth();

  type PaymentStatsShape = {
    total_revenue?: number;
    today_transactions?: number;
    monthly_revenue?: number;
    total_transactions?: number;
    successful_transactions?: number;
    failed_transactions?: number;
    pending_transactions?: number;
    this_month_donations?: number;
    // alternate/camelCase fields used in some endpoints
    todayTransactions?: number;
    todayRevenue?: number;
    todayPendingTransactions?: number;
    todayFailedTransactions?: number;
    todaySuccessfulTransactions?: number;
    today_revenue?: number;
    today_pending_transactions?: number;
    today_failed_transactions?: number;
    today_successful_transactions?: number;
  };

  type StatCard = {
    title: string;
    value: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
    color: string;
    bgColor: string;
    change?: string;
  };

  const safeStats: PaymentStatsShape = (stats ?? {}) as PaymentStatsShape;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statsConfig: StatCard[] = [
    {
      title: "Total Revenue",
      value: formatCurrency((safeStats.total_revenue ?? 0) / 100),
      icon: DollarSign,
      description: "All-time revenue",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      change: "+12.5%",
    },
    {
      title: "Today's Payments",
      value: (safeStats.today_revenue || 0).toLocaleString(),
      icon: CreditCard,
      description: "Transactions today",
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "This Month",
      value: formatCurrency((safeStats.monthly_revenue ?? 0) / 100),
      icon: TrendingUp,
      description: "Current month revenue",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      change: "+8.2%",
    },
    {
      title: "Total Transactions",
      value: (safeStats.total_transactions || 0).toLocaleString(),
      icon: CreditCard,
      description: "All transactions",
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Successful",
      value: (safeStats.successful_transactions || 0).toLocaleString(),
      icon: CheckCircle2,
      description: "Completed payments",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      change: "95.1%",
    },
    {
      title: "Failed",
      value: (safeStats.failed_transactions || 0).toLocaleString(),
      icon: XCircle,
      description: "Failed transactions",
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      change: "4.9%",
    },
    {
      title: "Pending",
      value: (safeStats.pending_transactions || 0).toLocaleString(),
      icon: Clock,
      description: "Processing payments",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "This Month Donations",
      value: (safeStats.this_month_donations || 0).toLocaleString(),
      icon: Calendar,
      description: "One-time donations",
      color: "text-pink-600",
      bgColor: "bg-pink-500/10",
    },
  ];

  // Staff-specific stats (today's summary)
  const statsConfigStaff: StatCard[] = [
    {
      title: "Today's Transactions",
      value: (
        (safeStats.todayTransactions ?? safeStats.today_transactions) ||
        0
      ).toLocaleString(),
      icon: CreditCard,
      description: "Transactions today",
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(
        ((safeStats.todayRevenue ?? safeStats.today_revenue) || 0) / 100
      ),
      icon: DollarSign,
      description: "Revenue today",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Today's Pending",
      value: (
        (safeStats.todayPendingTransactions ??
          safeStats.today_pending_transactions) ||
        0
      ).toLocaleString(),
      icon: Clock,
      description: "Pending payments today",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Today's Failed",
      value: (
        (safeStats.todayFailedTransactions ??
          safeStats.today_failed_transactions) ||
        0
      ).toLocaleString(),
      icon: XCircle,
      description: "Failed payments today",
      color: "text-red-600",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Today's Successful",
      value: (
        (safeStats.todaySuccessfulTransactions ??
          safeStats.today_successful_transactions) ||
        0
      ).toLocaleString(),
      icon: CheckCircle2,
      description: "Successful payments today",
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Unable to load payment stats</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>{error}</span>
            <Button size="sm" variant="outline" onClick={refetch}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {(() => {
        const allStats = statsConfig;
        const visibleStats = isAdmin()
          ? allStats
          : isStaff()
          ? statsConfigStaff
          : [];

        if (visibleStats.length === 0) {
          return null;
        }

        return (
          <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {visibleStats.map((stat: StatCard, index: number) => {
              const Icon = stat.icon;
              const change: string | undefined = stat.change;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
                    <CardTitle className="text-xs sm:text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
                    <div className="text-lg sm:text-2xl font-bold">
                      {stat.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                      {change && (
                        <span
                          className={`text-xs font-medium ${
                            (change as string).startsWith("+")
                              ? "text-green-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          {change}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}
