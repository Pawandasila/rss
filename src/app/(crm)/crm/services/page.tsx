"use client";

import { useState } from "react";
import { ServiceTable } from "./_components/ServiceTable";
import { ServiceSheet } from "./_components/ServiceSheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useServiceApi } from "@/module/crm/services/hook";
import {
  Service,
  CreateServicePayload,
  UpdateServicePayload,
} from "@/module/crm/services/types";

export default function ServicesCRMPage() {
  const { services, createService, updateService, deleteService } =
    useServiceApi();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleCreate = () => {
    setEditingService(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
    }
  };

  const handleSave = async (
    payload: CreateServicePayload | UpdateServicePayload
  ) => {
    if ("id" in payload) {
      await updateService(payload as UpdateServicePayload);
    } else {
      await createService(payload as CreateServicePayload);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Services Management
          </h1>
          <p className="text-muted-foreground">Manage your services offered.</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <ServiceTable
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ServiceSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        service={editingService}
        onSave={handleSave}
      />
    </div>
  );
}
