"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  Quote,
  Loader2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useTestimonials, Testimonial } from "@/module/crm/testimonials";
import { toast } from "sonner";
import Image from "next/image";
import { buildMediaUrl } from "@/lib/media";

export default function TestimonialsSectionManager() {
  const {
    testimonials,
    loading,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useTestimonials();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState<{ name: string; content: string }>({
    name: "",
    content: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Open Add Sheet
  const openAdd = () => {
    setEditingId(null);
    setFormData({ name: "", content: "" });
    setImageFile(null);
    setImagePreview(null);
    setIsSheetOpen(true);
  };

  // Open Edit Sheet
  const openEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({ name: testimonial.name, content: testimonial.content });
    setImageFile(null);
    setImagePreview(testimonial.image || null);
    setIsSheetOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle Save (Create/Update)
  const handleSave = async () => {
    if (!formData.name || !formData.content) {
      toast.error("Please fill in all fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("content", formData.content);
    if (imageFile) {
      data.append("image", imageFile);
    }

    let success = false;
    if (editingId) {
      success = await updateTestimonial(editingId, data);
    } else {
      success = await createTestimonial(data);
    }

    if (success) {
      setIsSheetOpen(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Testimonials Management</h2>
        <Button onClick={openAdd} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Loading State */}
      {loading && testimonials.length === 0 ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        </div>
      ) : (
        /* Testimonials Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white group p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {testimonial.image && buildMediaUrl(testimonial.image) ? (
                      <Image
                        src={buildMediaUrl(testimonial.image)!}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-orange-100" />
                  <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-4 relative z-10 pl-4">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => openEdit(testimonial)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => deleteTestimonial(testimonial.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}

          {!loading && testimonials.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No testimonials found. Add one to get started.
            </div>
          )}
        </div>
      )}

      {/* Edit/Create Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col"
        >
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 font-sans">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter name..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <div
                    className="relative w-20 h-20 rounded-full overflow-hidden bg-muted border flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Image
                      </Button>
                      {imagePreview && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeImage}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Testimonial Content
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={6}
                  className="min-h-[150px]"
                  placeholder="Write the testimonial here..."
                />
              </div>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t bg-background">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 flex-1"
                onClick={handleSave}
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
