"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import TeamManager from "./_components/TeamManager";
import { useLeadership } from "@/module/crm/team/hooks/useLeadership";

const TeamPage: React.FC = () => {
  const { members, loading, createMember, updateMember, deleteMember } =
    useLeadership();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Team Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage team members with VIP designation support
              </p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm">
            Live Data
          </Badge>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TeamManager
          members={members}
          loading={loading}
          onCreate={createMember}
          onUpdate={updateMember}
          onDelete={deleteMember}
        />
      </div>
    </div>
  );
};

export default TeamPage;
