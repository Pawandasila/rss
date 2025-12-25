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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Video,
  Link as LinkIcon,
  Plus,
  Save,
  Edit2,
  Trash2,
  X,
  Loader2,
  VideoIcon,
} from "lucide-react";
import { useVideoGallery } from "@/module/crm/gallery/hooks";
import type { VideoGalleryItem } from "@/module/crm/gallery/types";
import { buildMediaUrl } from "@/lib/media";
import Link from "next/link";

const VideosManager: React.FC = () => {
  const { videos, loading, error, createVideo, updateVideo, deleteVideo } =
    useVideoGallery();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<VideoGalleryItem | null>(null);
  const [type, setType] = useState<"file" | "url">("file");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [viewingVideo, setViewingVideo] = useState<VideoGalleryItem | null>(
    null
  );
  const [form, setForm] = useState<{
    title: string;
    description: string;
    videoUrl: string;
  }>({ title: "", description: "", videoUrl: "" });

  const onAdd = () => {
    setEditing(null);
    setType("file");
    setForm({ title: "", description: "", videoUrl: "" });
    setVideoFile(null);
    setVideoPreview("");
    setOpen(true);
  };

  const onEdit = (item: VideoGalleryItem) => {
    setEditing(item);
    setType(item.type);
    setForm({
      title: item.title,
      description: item.description || "",
      videoUrl: item.video_url || "",
    });
    setVideoFile(null);
    setVideoPreview(item.video_file || item.video_url || "");
    setOpen(true);
  };

  const onDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      await deleteVideo(id);
    } catch (err) {
      alert("Failed to delete video");
    }
  };

  const onVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setVideoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    if (type === "file" && !videoFile && !editing) {
      alert("Video file is required");
      return;
    }
    if (type === "url" && !form.videoUrl.trim()) {
      alert("Video URL is required");
      return;
    }

    setSubmitting(true);
    try {
      const formData = {
        type,
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        video_file:
          type === "file" ? videoFile || editing?.video_file || "" : undefined,
        video_url: type === "url" ? form.videoUrl.trim() : undefined,
      };

      if (editing) {
        await updateVideo(editing.id, formData);
      } else {
        await createVideo(formData);
      }

      setOpen(false);
      setEditing(null);
      setVideoFile(null);
      setVideoPreview("");
      setForm({ title: "", description: "", videoUrl: "" });
    } catch (err) {
      alert("Failed to save video");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Video Gallery</h3>
          <p className="text-sm text-gray-600">
            Upload videos or link from URL
          </p>
        </div>
        <Button onClick={onAdd} className="bg-primary hover:bg-primary/80">
          <Plus className="w-4 h-4 mr-2" /> Add Video
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
          {videos.length == 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center p-8 bg-gray-50 border border-dashed rounded-lg">
              <div className="bg-white p-3 rounded-full mb-4">
                <VideoIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No Video found
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                Your gallery is currently empty. Upload your first Video to get
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
            videos.map((item) => (
              <div
                key={item.id}
                className="group bg-white border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex gap-4 items-start">
                  <div
                    className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative"
                    onClick={() => setViewingVideo(item)}
                  >
                    <Video className="w-8 h-8 text-gray-400" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold truncate">{item.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full border">
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.type === "url" && item.video_url && (
                      <Link
                        href={item.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-600 hover:text-purple-700 mt-1 truncate block hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.video_url}
                      </Link>
                    )}
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingVideo(item)}
                      >
                        <Video className="w-3 h-3 mr-1" /> View
                      </Button>
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

      {/* Video Player Dialog */}
      <Sheet open={!!viewingVideo} onOpenChange={() => setViewingVideo(null)}>
        <SheetContent className="flex flex-col max-h-screen w-full sm:max-w-2xl">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>{viewingVideo?.title}</SheetTitle>
            <SheetDescription>
              {viewingVideo?.description || "Video preview"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {viewingVideo && (
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                {viewingVideo.type === "url" && viewingVideo.video_url ? (
                  <iframe
                    src={viewingVideo.video_url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : viewingVideo.type === "file" && viewingVideo.video_file ? (
                  <video
                    src={
                      buildMediaUrl(viewingVideo.video_file) ||
                      viewingVideo.video_file
                    }
                    controls
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Video not available</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setViewingVideo(null)}>
              <X className="w-4 h-4 mr-2" /> Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit/Add Video Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>{editing ? "Edit Video" : "Add Video"}</SheetTitle>
            <SheetDescription>
              Upload a video file or provide a URL
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
                placeholder="Video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <RadioGroup
                value={type}
                onValueChange={(v) => setType(v as "file" | "url")}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="file" id="video-type-file" />
                  <Label htmlFor="video-type-file">File</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="video-type-url" />
                  <Label htmlFor="video-type-url">URL</Label>
                </div>
              </RadioGroup>
            </div>

            {type === "file" ? (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Video File
                </label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {videoPreview ? (
                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          Video uploaded (base64)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {videoPreview.substring(0, 50)}...
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVideoPreview("")}
                      >
                        <X className="w-4 h-4 mr-2" /> Remove
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Video className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <label className="cursor-pointer">
                        <span className="text-sm text-primary hover:text-primary/80">
                          Click to upload video
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="video/*"
                          onChange={onVideoFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Video URL
                </label>
                <div className="flex gap-2">
                  <Input
                    value={form.videoUrl}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, videoUrl: e.target.value }))
                    }
                    placeholder="https://..."
                  />
                  <span className="inline-flex items-center text-gray-500 px-2">
                    <LinkIcon className="w-4 h-4" />
                  </span>
                </div>
              </div>
            )}

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

export default VideosManager;
