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
import {
  Book,
  FileText,
  Plus,
  Save,
  Edit2,
  Trash2,
  X,
  Loader2,
  BookIcon,
} from "lucide-react";
import { useHolyBooks } from "@/module/crm/gallery/hooks";
import type { HolyBookItem } from "@/module/crm/gallery/types";

const HolyBooksManager: React.FC = () => {
  const {
    holyBooks,
    loading,
    error,
    createHolyBook,
    updateHolyBook,
    deleteHolyBook,
  } = useHolyBooks();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<HolyBookItem | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const onAdd = () => {
    setEditing(null);
    setForm({ title: "", description: "" });
    setBookFile(null);
    setFilePreview("");
    setOpen(true);
  };

  const onEdit = (item: HolyBookItem) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "" });
    setBookFile(null);
    setFilePreview(item.file);
    setOpen(true);
  };

  const onDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this holy book?")) return;
    try {
      await deleteHolyBook(id);
    } catch (err) {
      alert("Failed to delete holy book");
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBookFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!bookFile && !editing) {
      alert("File is required");
      return;
    }

    setSubmitting(true);
    try {
      const formData = {
        title: form.title.trim(),
        file: bookFile || editing?.file || "",
        description: form.description.trim() || undefined,
      };

      if (editing) {
        await updateHolyBook(editing.id, formData);
      } else {
        await createHolyBook(formData);
      }

      setOpen(false);
      setEditing(null);
      setBookFile(null);
      setFilePreview("");
      setForm({ title: "", description: "" });
    } catch (err) {
      alert("Failed to save holy book");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Holy Books</h3>
          <p className="text-sm text-gray-600">Upload sacred/holy book files</p>
        </div>
        <Button onClick={onAdd} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" /> Add Book
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
          {holyBooks.length === 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed rounded-lg">
              <div className="bg-white p-3 rounded-full mb-4">
                <BookIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No Book found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Your gallery is currently empty. Upload your first Book to get
                started.
              </p>
              <Button
                onClick={onAdd}
                className="bg-primary hover:bg-primary/80"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Book
              </Button>
            </div>
          ) : (
            holyBooks.map((item) => (
              <div
                key={item.id}
                className="group bg-white border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <Book className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-500 mt-1 truncate flex items-center gap-1">
                      <FileText className="w-3 h-3" /> File attached
                    </div>
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
            <SheetTitle>{editing ? "Edit Book" : "Add Book"}</SheetTitle>
            <SheetDescription>
              Upload a holy book file and details
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
                placeholder="Book title"
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
              <label className="block text-sm font-medium mb-2">File</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {filePreview ? (
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        File uploaded (base64)
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {filePreview.substring(0, 50)}...
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilePreview("")}
                    >
                      <X className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Book className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-primary hover:text-primary/80">
                        Click to upload file (PDF, etc.)
                      </span>
                      <input
                        type="file"
                        className="hidden"
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

export default HolyBooksManager;
