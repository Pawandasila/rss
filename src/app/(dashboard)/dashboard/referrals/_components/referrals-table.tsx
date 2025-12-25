"use client";

import React from "react";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { ReferralsTableProps } from "../referal";

export const ReferralsTable: React.FC<ReferralsTableProps> = ({
  referrals,
  loading,
  error,
  onReferralClick,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
          रेफरल की सूची
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          इस उपयोगकर्ता द्वारा रेफर किए गए सभी लोग
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : referrals.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-16 w-16 text-muted-foreground opacity-20" />
              <p className="mt-4 text-sm text-muted-foreground">
                इस उपयोगकर्ता के लिए कोई रेफरल नहीं मिला
              </p>
            </div>
          ) : (
            <div className="-mx-3 sm:mx-0 overflow-x-auto">
              <Table>
                <TableCaption className="text-xs sm:text-sm">कुल {referrals.length} रेफरल रिकॉर्ड</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">नाम</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">ईमेल</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden md:table-cell">पेशा</TableHead>
                    <TableHead className="text-xs sm:text-sm">रेफरल</TableHead>
                    <TableHead className="text-xs sm:text-sm w-[100px] sm:w-[120px]">जॉइनिंग</TableHead>
                  </TableRow>
                </TableHeader>
              <TableBody>
                {referrals.map((referral, idx) => {
                  const rowKey = referral.id ?? referral.email ?? `ref-${idx}`;
                  return (
                    <TableRow key={rowKey}>
                      <TableCell className="font-medium py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                            {referral.image && (
                              <AvatarImage
                                src={referral.image}
                                alt={referral.name}
                              />
                            )}
                            <AvatarFallback className="text-xs">
                              {getInitials(referral.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs sm:text-sm truncate">{referral.name || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                        <span className="truncate block max-w-[200px]">{referral.email || "-"}</span>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                        {referral.profession || "-"}
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-all hover:scale-105 text-xs"
                          onClick={() =>
                            referral.user_id &&
                            onReferralClick(
                              referral.user_id,
                              referral.name || "Unknown"
                            )
                          }
                        >
                          <Users className="mr-1 h-3 w-3" />
                          {referral.referral_count || 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm py-3 whitespace-nowrap">
                        {referral.date_joined
                          ? format(new Date(referral.date_joined), "dd MMM yyyy")
                          : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
