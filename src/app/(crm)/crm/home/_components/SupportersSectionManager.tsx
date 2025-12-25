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
  Building2,
  Edit2,
  Image as ImageIcon,
  Plus,
  Save,
  Trash2,
  Video,
  X,
} from "lucide-react";
import type { SupportersData, RecognitionLogo } from "../../types/home/supporters/types";

interface SupportersSectionManagerProps {
  data: SupportersData;
  setData: React.Dispatch<React.SetStateAction<SupportersData>>;
}

const SupportersSectionManager: React.FC<SupportersSectionManagerProps> = ({
  data,
  setData,
}) => {
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  const [isEditingLogo, setIsEditingLogo] = useState(false);

  const [editingLogo, setEditingLogo] = useState<RecognitionLogo | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");

  // Config editing
  const [editedOrgName, setEditedOrgName] = useState("");
  const [editedSubtitle, setEditedSubtitle] = useState("");

  // Video editing
  const [editedVideo, setEditedVideo] = useState({
    title: "",
    duration: "",
    description: "",
    videoSrc: "",
    posterSrc: "",
  });

  const [videoPosterPreview, setVideoPosterPreview] = useState<string>("");
  const [videoFilePreview, setVideoFilePreview] = useState<string>("");

  // Intro editing
  const [editedIntro, setEditedIntro] = useState({
    title: "",
    description: "",
    joinButtonText: "",
    learnMoreButtonText: "",
  });

  const handleEditConfig = () => {
    setEditedOrgName(data.organizationName);
    setEditedSubtitle(data.mainSubtitle);
    setIsEditingConfig(true);
  };

  const handleSaveConfig = () => {
    setData((prev) => ({
      ...prev,
      organizationName: editedOrgName,
      mainSubtitle: editedSubtitle,
    }));
    setIsEditingConfig(false);
  };

  const handleEditVideo = () => {
    setEditedVideo({ ...data.videoInfo });
    setVideoPosterPreview(data.videoInfo.posterSrc);
    setVideoFilePreview(data.videoInfo.videoSrc);
    setIsEditingVideo(true);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoPosterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveVideo = () => {
    setData((prev) => ({
      ...prev,
      videoInfo: {
        ...editedVideo,
        videoSrc: videoFilePreview || editedVideo.videoSrc,
        posterSrc: videoPosterPreview || editedVideo.posterSrc,
      },
    }));
    setIsEditingVideo(false);
    setVideoPosterPreview("");
    setVideoFilePreview("");
  };

  const handleEditIntro = () => {
    setEditedIntro({ ...data.introSection });
    setIsEditingIntro(true);
  };

  const handleSaveIntro = () => {
    setData((prev) => ({
      ...prev,
      introSection: { ...editedIntro },
    }));
    setIsEditingIntro(false);
  };

  const handleAddLogo = () => {
    setEditingLogo({
      id: Date.now(),
      name: "",
      imageUrl: "",
      alt: "",
      order: data.recognitionLogos.length + 1,
    });
    setLogoPreview("");
    setIsEditingLogo(true);
  };

  const handleEditLogo = (logo: RecognitionLogo) => {
    setEditingLogo({ ...logo });
    setLogoPreview(logo.imageUrl);
    setIsEditingLogo(true);
  };

  const handleSaveLogo = () => {
    if (!editingLogo) return;

    const logoToSave = {
      ...editingLogo,
      imageUrl: logoPreview || editingLogo.imageUrl,
    };

    setData((prev) => {
      const existingIndex = prev.recognitionLogos.findIndex(
        (l) => l.id === editingLogo.id
      );

      if (existingIndex >= 0) {
        const updated = [...prev.recognitionLogos];
        updated[existingIndex] = logoToSave;
        return { ...prev, recognitionLogos: updated };
      } else {
        return {
          ...prev,
          recognitionLogos: [...prev.recognitionLogos, logoToSave],
        };
      }
    });

    setIsEditingLogo(false);
    setEditingLogo(null);
    setLogoPreview("");
  };

  const handleDeleteLogo = (id: number) => {
    setData((prev) => ({
      ...prev,
      recognitionLogos: prev.recognitionLogos.filter((l) => l.id !== id),
    }));
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Config Section */}
      <div className="border rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Header Configuration
              </h3>
              <p className="text-sm text-gray-600">
                Organization name and main subtitle
              </p>
            </div>
          </div>
          <Button
            onClick={handleEditConfig}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="space-y-3 mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Organization Name
            </p>
            <p className="text-sm text-gray-900">{data.organizationName}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Main Subtitle
            </p>
            <p className="text-sm text-gray-900">{data.mainSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="border rounded-xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Video Configuration
              </h3>
              <p className="text-sm text-gray-600">
                Organization introduction video
              </p>
            </div>
          </div>
          <Button
            onClick={handleEditVideo}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="space-y-3 mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">Title</p>
            <p className="text-sm text-gray-900">{data.videoInfo.title}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">Duration</p>
            <p className="text-sm text-gray-900">{data.videoInfo.duration}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Description
            </p>
            <p className="text-sm text-gray-900">
              {data.videoInfo.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Video Source
              </p>
              <p className="text-sm text-gray-900 truncate">
                {data.videoInfo.videoSrc}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Poster Image
              </p>
              <p className="text-sm text-gray-900 truncate">
                {data.videoInfo.posterSrc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="border rounded-xl p-6 bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Edit2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Introduction Section
              </h3>
              <p className="text-sm text-gray-600">Mission and action buttons</p>
            </div>
          </div>
          <Button
            onClick={handleEditIntro}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="space-y-3 mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">Title</p>
            <p className="text-sm text-gray-900">{data.introSection.title}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Description
            </p>
            <p className="text-sm text-gray-900">
              {data.introSection.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Join Button Text
              </p>
              <p className="text-sm text-gray-900">
                {data.introSection.joinButtonText}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Learn More Button Text
              </p>
              <p className="text-sm text-gray-900">
                {data.introSection.learnMoreButtonText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recognition Logos Section */}
      <div className="border rounded-xl p-6 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Recognition Logos
              </h3>
              <p className="text-sm text-gray-600">
                {data.recognitionLogos.length} logos
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddLogo}
            size="sm"
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Logo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {data.recognitionLogos.map((logo) => (
            <div
              key={logo.id}
              className="group bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {logo.imageUrl ? (
                    <img
                      src={logo.imageUrl}
                      alt={logo.alt}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1 truncate">
                    {logo.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate mb-2">
                    {logo.alt}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditLogo(logo)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteLogo(logo.id)}
                      size="sm"
                      variant="outline"
                      className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.recognitionLogos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No recognition logos yet. Add your first logo!</p>
          </div>
        )}
      </div>

      {/* Config Edit Sheet */}
      <Sheet open={isEditingConfig} onOpenChange={setIsEditingConfig}>
        <SheetContent className="flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>Edit Header Configuration</SheetTitle>
            <SheetDescription>
              Update organization name and main subtitle
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Organization Name
              </label>
              <Input
                value={editedOrgName}
                onChange={(e) => setEditedOrgName(e.target.value)}
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Main Subtitle
              </label>
              <Textarea
                value={editedSubtitle}
                onChange={(e) => setEditedSubtitle(e.target.value)}
                placeholder="Enter main subtitle"
                rows={3}
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsEditingConfig(false)}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveConfig}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Video Edit Sheet */}
      <Sheet open={isEditingVideo} onOpenChange={setIsEditingVideo}>
        <SheetContent className="flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>Edit Video Configuration</SheetTitle>
            <SheetDescription>
              Update video details and sources
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={editedVideo.title}
                onChange={(e) =>
                  setEditedVideo({ ...editedVideo, title: e.target.value })
                }
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <Input
                value={editedVideo.duration}
                onChange={(e) =>
                  setEditedVideo({ ...editedVideo, duration: e.target.value })
                }
                placeholder="e.g., अवधि: 2 मिनट 50 सेकंड"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Input
                value={editedVideo.description}
                onChange={(e) =>
                  setEditedVideo({
                    ...editedVideo,
                    description: e.target.value,
                  })
                }
                placeholder="Enter video description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Video File
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {videoFilePreview ? (
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        Video uploaded (base64)
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {videoFilePreview.substring(0, 50)}...
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVideoFilePreview("")}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Video className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-primary hover:text-primary/80">
                        Click to upload video file
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={handleVideoFileChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported: MP4, WebM, OGG, etc.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Poster Image
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {videoPosterPreview ? (
                  <div className="space-y-3">
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={videoPosterPreview}
                        alt="Poster Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVideoPosterPreview("")}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-primary hover:text-primary/80">
                        Click to upload poster image
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleVideoPosterFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditingVideo(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveVideo}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Intro Edit Sheet */}
      <Sheet open={isEditingIntro} onOpenChange={setIsEditingIntro}>
        <SheetContent className="flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>Edit Introduction Section</SheetTitle>
            <SheetDescription>
              Update mission statement and button texts
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={editedIntro.title}
                onChange={(e) =>
                  setEditedIntro({ ...editedIntro, title: e.target.value })
                }
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                value={editedIntro.description}
                onChange={(e) =>
                  setEditedIntro({
                    ...editedIntro,
                    description: e.target.value,
                  })
                }
                placeholder="Enter description"
                rows={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Join Button Text
              </label>
              <Input
                value={editedIntro.joinButtonText}
                onChange={(e) =>
                  setEditedIntro({
                    ...editedIntro,
                    joinButtonText: e.target.value,
                  })
                }
                placeholder="e.g., Join Our Mission"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Learn More Button Text
              </label>
              <Input
                value={editedIntro.learnMoreButtonText}
                onChange={(e) =>
                  setEditedIntro({
                    ...editedIntro,
                    learnMoreButtonText: e.target.value,
                  })
                }
                placeholder="e.g., Learn More"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditingIntro(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveIntro}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo Edit Sheet */}
      <Sheet open={isEditingLogo} onOpenChange={setIsEditingLogo}>
        <SheetContent className="flex flex-col max-h-screen">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>
              {editingLogo?.imageUrl ? "Edit Logo" : "Add New Logo"}
            </SheetTitle>
            <SheetDescription>
              Upload recognition logo and add details
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Logo Image
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {logoPreview ? (
                  <div className="space-y-3">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={logoPreview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLogoPreview("")}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-primary hover:text-primary/80">
                        Click to upload logo
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Organization Name
              </label>
              <Input
                value={editingLogo?.name || ""}
                onChange={(e) =>
                  setEditingLogo((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Alt Text
              </label>
              <Input
                value={editingLogo?.alt || ""}
                onChange={(e) =>
                  setEditingLogo((prev) =>
                    prev ? { ...prev, alt: e.target.value } : null
                  )
                }
                placeholder="Enter alt text for accessibility"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Display Order (Optional)
              </label>
              <Input
                type="number"
                value={editingLogo?.order || ""}
                onChange={(e) =>
                  setEditingLogo((prev) =>
                    prev
                      ? { ...prev, order: parseInt(e.target.value) || 0 }
                      : null
                  )
                }
                placeholder="Enter display order"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditingLogo(false);
                setEditingLogo(null);
                setLogoPreview("");
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveLogo}>
              <Save className="w-4 h-4 mr-2" />
              Save Logo
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SupportersSectionManager;
