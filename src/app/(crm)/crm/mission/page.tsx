"use client";

import { useState } from "react";
import { MissionTable } from "./_components/MissionTable";
import { MissionSheet } from "./_components/MissionSheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMissionApi } from "@/module/crm/mission/hooks";
import {
  Mission,
  CreateMissionPayload,
  UpdateMissionPayload,
} from "@/module/crm/mission/types";

export default function MissionCRMPage() {
  const { missions, createMission, updateMission, deleteMission } =
    useMissionApi();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);

  const handleCreate = () => {
    setEditingMission(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (mission: Mission) => {
    setEditingMission(mission);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this mission?")) {
      await deleteMission(id);
    }
  };

  const handleSave = async (
    payload: CreateMissionPayload | UpdateMissionPayload
  ) => {
    if ("id" in payload) {
      await updateMission(payload as UpdateMissionPayload);
    } else {
      await createMission(payload as CreateMissionPayload);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mission Management
          </h1>
          <p className="text-muted-foreground">
            Manage your organization&apos;s missions and goals.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <MissionTable
        missions={missions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MissionSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        mission={editingMission}
        onSave={handleSave}
      />
    </div>
  );
}
