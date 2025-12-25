"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar as CalendarIcon,
  Newspaper,
  ExternalLink,
  Loader2,
  Image as ImageIcon,
  X,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { buildMediaUrl } from "@/lib/media";
import {
  usePressCoverage,
  PressCoverageFormData,
  PressCoverage,
} from "@/module/crm/press";
import "react-quill-new/dist/quill.snow.css";

export default function PressManagementPage() {
  const {
    pressItems,
    loading,
    createPressCoverage,
    updatePressCoverage,
    deletePressCoverage,
  } = usePressCoverage();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PressCoverage | null>(null);

  const initialFormState: PressCoverageFormData = {
    title: "",
    link: "",
    description: "",
    published_at: "",
    image: null,
  };

  const [formData, setFormData] =
    useState<PressCoverageFormData>(initialFormState);

  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");

  // Dynamic import for ReactQuill (SSR-safe)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const handleFileChange = (file?: File | null) => {
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, image: null });
      setImagePreview("");
    }
  };

  const handleCreate = async () => {
    setSubmitting(true);
    const success = await createPressCoverage({
      ...formData,
      description: description,
    });
    setSubmitting(false);
    if (success) {
      setIsSheetOpen(false);
      setFormData(initialFormState);
      setImagePreview("");
      setDescription("");
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    setSubmitting(true);
    const success = await updatePressCoverage(editingItem.id, {
      ...formData,
      description: description,
    });
    setSubmitting(false);
    if (success) {
      setIsSheetOpen(false);
      setEditingItem(null);
      setFormData(initialFormState);
      setImagePreview("");
      setDescription("");
    }
  };

  const openAddSheet = () => {
    setEditingItem(null);
    setFormData(initialFormState);
    setImagePreview("");
    setDescription("");
    setIsSheetOpen(true);
  };

  const openEditSheet = (item: PressCoverage) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      link: item.link,
      description: item.description,
      published_at: item.published_at,
      image: null,
    });
    setImagePreview(buildMediaUrl(item.image) || "");
    setDescription(item.description || "");
    setIsSheetOpen(true);
  };

  const filteredItems = pressItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Press Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage press coverage and media publications
          </p>
        </div>
        <Button
          onClick={openAddSheet}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Press Item
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="bg-white px-4 py-2 rounded-md border text-sm text-gray-500 flex items-center">
          Total:{" "}
          <span className="font-bold text-gray-900 ml-1">
            {pressItems.length}
          </span>
        </div>
      </div>

      {loading && pressItems.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                {item.image ? (
                  <Image
                    src={buildMediaUrl(item.image) || ""}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                )}

                {/* External Link Overlay */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-orange-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-orange-600" />
                </a>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>
                    {new Date(item.published_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>

                <div
                  className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
                    onClick={() => openEditSheet(item)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Press Item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this press item from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletePressCoverage(item.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No press items found
          </h3>
          <p className="text-gray-500 mt-1 max-w-sm mx-auto">
            Get started by adding your first press coverage or media mention.
          </p>
          <Button
            onClick={openAddSheet}
            className="mt-6 bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Press Item
          </Button>
        </div>
      )}

      {/* Sheet for Add/Edit */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="flex flex-col max-h-screen sm:max-w-xl">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>
              {editingItem ? "Edit Press Item" : "Add New Press Item"}
            </SheetTitle>
            <SheetDescription>
              {editingItem
                ? "Update press coverage information"
                : "Add details about the press coverage"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block text-gray-700">
                Image
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="space-y-3">
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={
                          imagePreview.startsWith("data:")
                            ? imagePreview
                            : buildMediaUrl(imagePreview) || imagePreview
                        }
                        alt="Preview"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized={imagePreview.startsWith("data:")}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileChange(null)}
                    >
                      <X className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-orange-600 hover:text-orange-700">
                        Click to upload image
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e.target.files?.[0])}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Maximum file size: 5MB. Supported: JPG, PNG, WEBP.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-700">
                Title
              </label>
              <Input
                placeholder="e.g., Recognized for Community Service"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Publish Date */}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-700">
                Publish Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.published_at && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.published_at ? (
                      format(new Date(formData.published_at), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={
                      formData.published_at
                        ? new Date(formData.published_at)
                        : undefined
                    }
                    onSelect={(date) =>
                      setFormData({
                        ...formData,
                        published_at: date ? format(date, "yyyy-MM-dd") : "",
                      })
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Link */}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-700">
                Link
              </label>
              <Input
                placeholder="https://news-site.com/article"
                value={formData.link || ""}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </div>

            {/* Description - Rich Text Editor */}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-700">
                Description
              </label>
              <div className="border rounded-md overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  modules={modules}
                  placeholder="Write a brief summary of the coverage..."
                  className="[&>.ql-container]:min-h-[150px] [&>.ql-toolbar]:border-0 [&>.ql-toolbar]:border-b [&>.ql-container]:border-0"
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsSheetOpen(false)}
              disabled={submitting}
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button
              onClick={editingItem ? handleUpdate : handleCreate}
              disabled={submitting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />{" "}
                  {editingItem ? "Update" : "Create"}
                </>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
