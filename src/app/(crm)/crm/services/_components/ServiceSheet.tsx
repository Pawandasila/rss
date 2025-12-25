"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Service,
  CreateServicePayload,
  UpdateServicePayload,
} from "@/module/crm/services/types";
import { Save, Image as ImageIcon } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import { buildMediaUrl } from "@/lib/media";

interface ServiceSheetProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    payload: CreateServicePayload | UpdateServicePayload
  ) => Promise<void>;
}

export function ServiceSheet({
  service,
  open,
  onOpenChange,
  onSave,
}: ServiceSheetProps) {
  const [formData, setFormData] = useState<
    Partial<CreateServicePayload> & {
      id?: number;
      currentImage?: string;
      currentIcon?: string;
    }
  >({});

  // Dynamic import for Quill to avoid SSR issues
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ link: "link" }],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id,
        title: service.title,
        content: service.content,
        currentImage: service.image,
        currentIcon: service.icon,
      });
    } else {
      setFormData({
        title: "",
        content: "",
      });
    }
  }, [service, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content: content }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "icon"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (service && formData.id) {
      // Update
      await onSave({
        id: formData.id,
        title: formData.title,
        content: formData.content,
        image: formData.image,
        icon: formData.icon,
      } as UpdateServicePayload);
    } else {
      // Create
      await onSave({
        title: formData.title || "",
        content: formData.content || "",
        image: formData.image,
        icon: formData.icon,
      } as CreateServicePayload);
    }
    onOpenChange(false);
  };

  // Helper to render image preview
  const renderImagePreview = (
    file?: File | null,
    currentUrl?: string,
    placeholderText = "Click to upload"
  ) => {
    if (file) {
      return (
        <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
          <Image
            src={URL.createObjectURL(file)}
            alt="Preview"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate text-center">
            New: {file.name}
          </div>
        </div>
      );
    }
    if (currentUrl) {
      return (
        <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
          <Image
            src={buildMediaUrl(currentUrl) || ""}
            alt="Current"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
            Current Image
          </div>
        </div>
      );
    }
    return (
      <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
        <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
        <span className="text-sm font-medium">{placeholderText}</span>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[40vw] overflow-hidden flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle>{service ? "Edit Service" : "Create Service"}</SheetTitle>
          <SheetDescription>
            {service ? "Make changes to your service." : "Add a new service."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                required
                placeholder="Enter service title"
                className="text-lg font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label>Service Content</Label>
              <div className="border rounded-md overflow-hidden min-h-[200px] flex flex-col">
                <ReactQuill
                  theme="snow"
                  value={formData.content || ""}
                  onChange={handleEditorChange}
                  modules={modules}
                  className="flex-1 [&>.ql-container]:min-h-[150px] [&>.ql-container]:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Service Image</Label>
                <div className="border border-dashed rounded-lg p-1 hover:bg-accent/50 transition-colors relative group">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleFileChange(e, "image")}
                  />
                  {renderImagePreview(
                    formData.image as File,
                    formData.currentImage,
                    "Upload Main Image"
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service Icon (Optional)</Label>
                <div className="border border-dashed rounded-lg p-1 hover:bg-accent/50 transition-colors relative group">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleFileChange(e, "icon")}
                  />
                  {/* For icon, we might want standard display if it's small, but reusing preview for now */}
                  {renderImagePreview(
                    formData.icon as File,
                    formData.currentIcon,
                    "Upload Icon"
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-4 border-t bg-background shrink-0 sticky bottom-0 z-20">
          <Button
            type="submit"
            form="service-form"
            className="w-full h-11 text-base"
          >
            <Save className="mr-2 h-4 w-4" /> Save Service
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
