"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Users } from "lucide-react";
import Member from "./_components/Member";
import VolunteerCard from "./_components/Volunteercards";

const VolunteerManagement = () => {
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Volunteer Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage volunteer hierarchy, designations, and assignments
          </p>
        </div>
      </div>

      <Tabs defaultValue="volunteers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1">
          <TabsTrigger value="volunteers" className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Volunteers
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Member />
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <VolunteerCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteerManagement;
