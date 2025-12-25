"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Save,
  Edit2,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import { useBanners } from "@/module/crm/gallery/hooks";
import type { BannerItem } from "@/module/crm/gallery/types";
import Image from "next/image";
import { buildMediaUrl } from "@/lib/media";

const BannersManager: React.FC = () => {
  const { banners, loading, error, createBanner, updateBanner, deleteBanner } =
    useBanners();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BannerItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    content: string;
    link: string;
    isActive: boolean;
  }>({ title: "", content: "", link: "", isActive: true });

  const onAdd = () => {
    setEditing(null);
    setForm({ title: "", content: "", link: "", isActive: true });
    setImageFile(null);
    setPreview("");
    setOpen(true);
  };

  const onEdit = (item: BannerItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      content: item.content || "",
      link: item.link || "",
      isActive: item.is_active,
    });
    setImageFile(null);
    setPreview(item.image);
    setOpen(true);
  };

  const onDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteBanner(id);
    } catch (err) {
      alert("Failed to delete banner");
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!imageFile && !editing) {
      alert("Image is required");
      return;
    }

    setSubmitting(true);
    try {
      const formData = {
        title: form.title.trim(),
        image: imageFile || editing?.image || "",
        content: form.content.trim(),
        link: form.link.trim() || undefined,
        is_active: form.isActive,
      };

      if (editing) {
        await updateBanner(editing.id, formData);
      } else {
        await createBanner(formData);
      }

      setOpen(false);
      setEditing(null);
      setImageFile(null);
      setPreview("");
      setForm({ title: "", content: "", link: "", isActive: true });
    } catch (err) {
      alert("Failed to save banner");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Banners</h3>
          <p className="text-sm text-gray-600">Manage homepage banners</p>
        </div>
        <Button onClick={onAdd} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" /> Add Banner
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white border rounded-lg p-4 animate-pulse"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="flex gap-2 mt-2">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.length === 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed rounded-lg">
              <div className="bg-white p-3 rounded-full mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No banner found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Your gallery is currently empty. Upload your first Banner to get
                started.
              </p>
              <Button
                onClick={onAdd}
                className="bg-primary hover:bg-primary/80"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Banner
              </Button>
            </div>
          ) : (
            banners.map((item) => (
              <div
                key={item.id}
                className="group bg-white border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                    {item.image ? (
                      <Image
                        src={buildMediaUrl(item.image) || item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold truncate">{item.title}</h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          item.is_active
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    {item.link && (
                      <div className="text-xs text-gray-500 mt-1 truncate flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" /> {item.link}
                      </div>
                    )}
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(item)}
                      >
                        <Edit2 className="w-3 h-3 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>{editing ? "Edit Banner" : "Add Banner"}</SheetTitle>
            <SheetDescription>
              Upload banner image and settings
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((s) => ({ ...s, title: e.target.value }))
                }
                placeholder="Banner title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((s) => ({ ...s, content: e.target.value }))
                }
                placeholder="Banner content description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Link (optional)
              </label>
              <Input
                value={form.link}
                onChange={(e) =>
                  setForm((s) => ({ ...s, link: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="banner-active"
                checked={form.isActive}
                onCheckedChange={(val) =>
                  setForm((s) => ({ ...s, isActive: val }))
                }
              />
              <Label htmlFor="banner-active">Active</Label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {preview ? (
                  <div className="space-y-3">
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={
                          preview.startsWith("data:")
                            ? preview
                            : buildMediaUrl(preview) || preview
                        }
                        alt="Preview"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized={preview.startsWith("data:")}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPreview("");
                        setImageFile(null);
                      }}
                    >
                      <X className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-primary hover:text-primary/80">
                        Click to upload image
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={onFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button onClick={onSave} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save
                </>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BannersManager;
