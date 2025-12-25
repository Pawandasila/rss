"use client";

import { useState } from "react";
import { BlogTable } from "./_components/BlogTable";
import { BlogSheet } from "./_components/BlogSheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useBlogApi } from "@/module/crm/blog/hook";
import { Blog, CreateBlogPayload } from "@/module/crm/blog/types";

export default function BlogCRMPage() {
  const {
    blogs,
    createBlog,
    updateBlog,
    deleteBlog,
    saveBlogContent,
    updateBlogContent,
    uploadBlogImage,
    deleteBlogImage,
  } = useBlogApi();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Blog | null>(null);

  const handleCreate = () => {
    setEditingPost(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (post: Blog) => {
    setEditingPost(post);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deleteBlog(id);
    }
  };

  const handleSaveDetails = async (data: CreateBlogPayload) => {
    // If editing, currently API doesn't have explicit UpdateBlog method exposed in hook,
    // but `createBlog` is POST. `useBlogApi` needs `updateBlog` or `createBlog` handles logic?
    // Looking at `useBlogApi`, it only has `createBlog` (POST).
    // Backend likely supports PUT on `/admin/blog/<id>/`.
    // I need to add `updateBlog` to hook later or now?
    // Let's assume for now Create is mostly what user wants, but for Edit we need PUT.
    // I will implement `createBlog` for now, dealing with Edit logic requires fixing hook.

    // WAIT: I missed adding updateBlog to hook! I only added createBlog.
    // I should update the hook first if I want full Edit functionality.
    // For now, let's implement Create. If editingPost is set, we need Update logic.

    if (editingPost) {
      toast.error("Update functionality not yet fully implemented in hook");
      return;
    }

    await createBlog(data);
    setIsSheetOpen(false); // Close on success? Or keep open to add content/images?
    // Better to keep open or switch to Edit mode so they can add content.
    // But `createBlog` returns the new blog. I should setEditingPost(newBlog).
    // But `createBlog` returns `Blog | null`.
  };

  // Actually, let's re-read the hook. I implemented `createBlog` which does POST.
  // I need to fix the hook to support Update.

  // For the purpose of this task, I'll update the page to use what works,
  // and maybe I can quickly patch the hook.

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage your blog posts, articles, and updates.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <BlogTable posts={blogs} onEdit={handleEdit} onDelete={handleDelete} />

      <BlogSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        blogId={editingPost?.id || null}
        onSaveDetails={async (data) => {
          if (editingPost) {
            await updateBlog(editingPost.id, data);
            toast.success("Blog updated");
          } else {
            const newBlog = await createBlog(data);
            if (newBlog) {
              setEditingPost(newBlog);
              toast.success(
                "Blog created! You can now add content and images."
              );
            }
          }
        }}
        onSaveContent={async (content, isUpdate) => {
          if (!editingPost) {
            toast.error("Please save details first");
            return;
          }
          if (isUpdate) {
            await updateBlogContent(editingPost.id, content);
          } else {
            await saveBlogContent({ blog: editingPost.id, content });
          }
        }}
        onSaveImages={async (images) => {
          if (!editingPost) {
            toast.error("Please save details first");
            return;
          }
          await Promise.all(
            images.map((img) => uploadBlogImage(editingPost.id, img))
          );
        }}
        onDeleteImage={async (imgId) => {
          await deleteBlogImage(imgId);
        }}
      />
    </div>
  );
}
