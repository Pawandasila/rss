"use client";

import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Shield, UsersRound, Briefcase, UserX, UserCog } from "lucide-react";
import { useUserStats } from "@/module/dashboard/users/hooks";
import { useAuth } from '@/hooks/use-auth';

interface UserStatsData {
  title?: string;
  value?: number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  color?: string;
  role?: "admin" | "staff";
}

export const UserStats = memo(function UserStats() {
  const { stats, loading } = useUserStats();
  const { isAdmin, isStaff } = useAuth();

  if (!isAdmin() && !isStaff()) {
    return null;
  }

  if (loading) {
    return (
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
              <div className="h-3 w-20 sm:h-4 sm:w-24 bg-muted animate-pulse rounded" />
              <div className="h-3 w-3 sm:h-4 sm:w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
              <div className="h-6 w-12 sm:h-8 sm:w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-24 sm:w-32 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Failed to load statistics
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  // Admin view: global counts
  const statsConfigAdmin: UserStatsData[] = [
    {
      title: "Total Users",
      value: stats.total_user,
      icon: Users,
      description: "All registered users",
      color: "text-blue-500",
    },
    {
      title: "Verified Users",
      value: stats.verified_user,
      icon: UserCheck,
      description: "Users with verified accounts",
      color: "text-green-500",
    },
    {
      title: "Members",
      value: stats.member_user,
      icon: UsersRound,
      description: "Member accounts",
      color: "text-purple-500",
    },
    {
      title: "Volunteers",
      value: stats.volunteer_user,
      icon: UsersRound,
      description: "Active volunteers",
      color: "text-indigo-500",
    },
    {
      title: "Business Users",
      value: stats.business_user,
      icon: Briefcase,
      description: "Business accounts",
      color: "text-cyan-500",
    },
    {
      title: "Staff Members",
      value: stats.staff_user,
      icon: UserCog,
      description: "Staff accounts",
      color: "text-orange-500",
    },
    {
      title: "Administrators",
      value: stats.admin_user,
      icon: Shield,
      description: "Admin accounts",
      color: "text-red-500",
    },
    {
      title: "Blocked Users",
      value: stats.blocked_user,
      icon: UserX,
      description: "Blocked accounts",
      color: "text-gray-500",
    },
  ];

  // Staff view: today's counts (titles adjusted for staff)
  const statsConfigStaff: UserStatsData[] = [
    {
      title: "Today's Users",
      // value: (stats as any).today_total_user,
      value: (stats).today_total_user,
      icon: Users,
      description: "Users joined today",
      color: "text-blue-500",
      role: "staff",
    },
    {
      title: "Today's Verified",
      value: (stats).today_verified_user,
      icon: UserCheck,
      description: "Verified users today",
      color: "text-green-500",
      role: "staff",
    },
    {
      title: "Today's Blocked",
      value: (stats).today_blocked_user,
      icon: UserX,
      description: "Blocked accounts today",
      color: "text-gray-500",
      role: "staff",
    },
    {
      title: "Today's Members",
      value: (stats).today_member_user,
      icon: UsersRound,
      description: "Member accounts today",
      color: "text-purple-500",
      role: "staff",
    },
    {
      title: "Today's Volunteers",
      value: (stats).today_volunteer_user,
      icon: UsersRound,
      description: "Volunteers added today",
      color: "text-indigo-500",
      role: "staff",
    },
    {
      title: "Today's Business Users",
      value: (stats).today_business_user,
      icon: Briefcase,
      description: "Business accounts today",
      color: "text-cyan-500",
      role: "staff",
    },
    {
      title: "Today's Unverified Members",
      value: (stats).today_unverified_member_user,
      icon: UserCog,
      description: "Members (unverified) today",
      color: "text-orange-500",
      role: "staff",
    },
  ];

  const toRender = isAdmin() ? statsConfigAdmin : statsConfigStaff;

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {toRender.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
              <CardTitle className="text-xs sm:text-sm font-medium">
                {stat.title}
              </CardTitle>
              {Icon && <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />}
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0 sm:pt-0">
              <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});
