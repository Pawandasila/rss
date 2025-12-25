"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import { useReferrals } from "@/module/dashboard/referrals/hooks";
// import IDCardManagement from "./id-card-management/page";
import StatCard from "./_components/stat-card";
import UserTransactionHistory from "@/module/dashboard/Payments/components/transaction-history";
import useAxios from "@/hooks/use-axios";
import Link from "next/link";
import ProfileCompletionModal, {
  isProfileIncomplete,
} from "./_components/profile-completion-modal";
import EmailChangeModal, {
  hasRssIndiaEmail,
} from "./_components/email-change-modal";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useAuth();
  const axios = useAxios();
  const {
    referralData,
    loading: referralLoading,
    error: referralError,
  } = useReferrals();
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const data = async () => {
      try {
        await axios.get("/dashboard/referrals");
      } catch (error) {
        console.error("Error fetching referral data:", error);
      }
    };
    data();
  }, [axios]);

  useEffect(() => {
    if (user && !hasRssIndiaEmail(user) && isProfileIncomplete(user)) {
      setShowProfileModal(true);
    }
  }, [user]);

  return (
    <>
      {/* Email change modal - takes priority over profile completion */}
      <EmailChangeModal user={user} />

      <ProfileCompletionModal
        user={user}
        open={showProfileModal}
        onOpenChange={setShowProfileModal}
      />

      <div className="space-y-2 sm:space-y-6 sm:p-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome
              {user?.name
                ? `, ${
                    user.name.charAt(0).toUpperCase() +
                    user.name.slice(1).toLowerCase()
                  }`
                : " to Dashboard"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Welcome to the RASHTRIYA SEVA SANGH dashboard. Here you can view
              your activities and information.
            </p>
          </div>

          <div className="flex justify-center items-center gap-2">
            {user?.is_admin_account && (
              <Button className="flex gap-2">
                <Link href="/crm">CRM</Link>
              </Button>
            )}

            {!user?.is_member_account && (
              <Button className="flex gap-2">
                <Link href="/become-member">Become Member</Link>
              </Button>
            )}
          </div>
        </div>

        <StatCard
          user={user}
          referralData={referralData}
          loading={referralLoading}
          error={referralError}
        />

        <div className="grid grid-cols-1  gap-6">
          <UserTransactionHistory />

          {/* <Referral
          userData={user}
          referralCount={referralLoading ? 0 : referralCount}
        /> */}
        </div>
      </div>
    </>
  );
}
