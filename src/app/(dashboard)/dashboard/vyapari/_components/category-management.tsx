"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import useAxios from "@/hooks/use-axios";
import type { Category, CategoryFormData } from "../types";
import Image from "next/image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";

export default function CategoryManagement() {
  const axios = useAxios();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form states
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = useCallback(async (search?: string) => {
    try {
      setLoading(true);
      const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
      const response = await axios.get(`/vyapari/category/${searchParam}`);
      setCategories(response.data.results || response.data || []);
    } catch (error) {
      const errorResponse = error as { response?: { data?: { message?: string } } };
      toast.error(
        errorResponse.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCategories(searchTerm.trim() || undefined);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, fetchCategories]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Reset form
  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setImageFile(null);
    setImagePreview(null);
    setCurrentCategory(null);
  };

  // Handle create
  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!imageFile) {
      toast.error("Category image is required");
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.description)
        data.append("description", formData.description);
      data.append("image", imageFile);

      await axios.post("/vyapari/category/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Category created successfully");

      setIsCreateDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      const errorResponse = error as { response?: { data?: { name?: string[] } } };
      toast.error(
        errorResponse.response?.data?.name?.[0] || "Failed to create category"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit
  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setImagePreview(category.image);
    setIsEditDialogOpen(true);
  };

  const handleEdit = async () => {
    if (!currentCategory || !formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.description)
        data.append("description", formData.description);
      if (imageFile) data.append("image", imageFile);

      await axios.put(`/vyapari/category/${currentCategory.id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Category updated successfully");

      setIsEditDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      const errorResponse = error as { response?: { data?: { name?: string[] } } };
      toast.error(
        errorResponse.response?.data?.name?.[0] || "Failed to update category"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const openDeleteDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!currentCategory) return;

    try {
      setSubmitting(true);
      await axios.delete(`/vyapari/category/${currentCategory.id}/`);

      toast.success("Category deleted successfully");

      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
      fetchCategories();
    } catch (error) {
      const errorResponse = error as { response?: { data?: { message?: string } } };
      toast.error(errorResponse.response?.data?.message || "Failed to delete category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">Categories</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Manage business categories</CardDescription>
          </div>
          <Button
            title="Create Category"
            onClick={() => setIsCreateDialogOpen(true)}
            className="h-9 sm:h-10 w-full sm:w-auto"
          >
            <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Add Category</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 sm:h-10 text-sm w-full sm:max-w-sm"
          />
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Image</TableHead>
                <TableHead className="text-xs sm:text-sm">Name</TableHead>
                <TableHead className="hidden md:table-cell text-xs sm:text-sm">Description</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-xs sm:text-sm py-6">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-xs sm:text-sm py-6">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {category.image ? (
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded flex-shrink-0">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={IMAGE_BLUR_DATA_URL}
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded bg-muted flex-shrink-0">
                          <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-xs sm:text-sm">{category.name}</p>
                        <p className="md:hidden line-clamp-1 text-xs text-muted-foreground mt-0.5">
                          {category.description || "No description"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                        {category.description || "No description"}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          title="Edit Category"
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          title="Delete Category"
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(category)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>Add a new business category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter category name"
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="image" className="mb-2 block">
                Image <span className="text-red-500">*</span>
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="mt-2 relative h-32 w-32 overflow-hidden rounded">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              title="Cancel"
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              title="Create Category"
              onClick={handleCreate}
              disabled={submitting}
            >
              <Plus className="h-4 w-4" />
              {submitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name" className="mb-2 block">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter category name"
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="mb-2 block">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-image" className="mb-2 block">
                Image
              </Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2 relative h-32 w-32 overflow-hidden rounded">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              title="Cancel"
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button title="Update" onClick={handleEdit} disabled={submitting}>
              {submitting ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{currentCategory?.name}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              title="Cancel"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setCurrentCategory(null);
              }}
            >
              Cancel
            </Button>
            <Button
              title="Delete"
              variant="destructive"
              onClick={handleDelete}
              disabled={submitting}
            >
              {submitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
