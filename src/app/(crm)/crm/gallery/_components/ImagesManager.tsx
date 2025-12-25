"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ImageIcon, Plus, Save, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useImageGallery } from "@/module/crm/gallery/hooks";
import type { ImageGalleryItem } from "@/module/crm/gallery/types";
import Image from "next/image";
import { buildMediaUrl } from "@/lib/media";

const ImagesManager: React.FC = () => {
  const { images, loading, error, createImage, updateImage, deleteImage } =
    useImageGallery();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ImageGalleryItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const onAdd = () => {
    setEditing(null);
    setForm({ title: "", description: "" });
    setImageFile(null);
    setPreview("");
    setOpen(true);
  };

  const onEdit = (item: ImageGalleryItem) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "" });
    setImageFile(null);
    setPreview(item.image);
    setOpen(true);
  };

  const onDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteImage(id);
    } catch (err) {
      alert("Failed to delete image");
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
        description: form.description.trim() || undefined,
        image: imageFile || (editing?.image ?? ""),
      };

      if (editing) {
        await updateImage(editing.id, formData);
      } else {
        await createImage(formData);
      }

      setOpen(false);
      setEditing(null);
      setImageFile(null);
      setPreview("");
      setForm({ title: "", description: "" });
    } catch (err) {
      alert("Failed to save image");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Image Gallery</h3>
          <p className="text-sm text-gray-600">Upload and manage images</p>
        </div>
        <Button onClick={onAdd} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-2" /> Add Image
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
          {images.length === 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed rounded-lg">
              <div className="bg-white p-3 rounded-full mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No images found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Your gallery is currently empty. Upload your first image to get
                started.
              </p>
              <Button
                onClick={onAdd}
                className="bg-primary hover:bg-primary/80"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          ) : (
            images.map((item) => (
              <div
                key={item.id}
                className="group bg-white border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                    {item.image && buildMediaUrl(item.image) ? (
                      <Image
                        src={buildMediaUrl(item.image)!}
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
                    <h4 className="font-semibold truncate">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
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
            <SheetTitle>{editing ? "Edit Image" : "Add Image"}</SheetTitle>
            <SheetDescription>
              Upload an image and provide details
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
                placeholder="Image title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description (optional)
              </label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((s) => ({ ...s, description: e.target.value }))
                }
                rows={4}
                placeholder="Short description"
              />
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

export default ImagesManager;
