"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Save, X, Plus, Edit, Trash2 } from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { RSSOverviewData, RSSInfoTab } from "../../types/home/rss-overview/types";

interface ExtendedRSSInfoTab extends RSSInfoTab {
  imageFile?: File | null;
  imagePreview?: string;
}

type Props = {
  data: RSSOverviewData;
  setData: React.Dispatch<React.SetStateAction<RSSOverviewData>>;
};

export default function RssOverviewSectionManager({ data, setData }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [editingTabIndex, setEditingTabIndex] = useState<number | null>(null);
  
  const [configForm, setConfigForm] = useState({
    badgeText: data.badgeText,
    mainTitle: data.mainTitle,
    mainSubtitle: data.mainSubtitle,
  });

  const [tabForm, setTabForm] = useState<ExtendedRSSInfoTab>({
    id: "",
    title: "",
    icon: "lotus",
    content: "",
    points: [""],
    image: "",
    imageFile: null,
    imagePreview: "",
  });

  useEffect(() => {
    setConfigForm({
      badgeText: data.badgeText,
      mainTitle: data.mainTitle,
      mainSubtitle: data.mainSubtitle,
    });
  }, [data]);

  const handleFileChange = (file?: File | null) => {
    if (!file) {
      setTabForm((f) => ({ ...f, imageFile: null, imagePreview: "" }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setTabForm((f) => ({ ...f, imageFile: file, imagePreview: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const openEditConfig = () => {
    setIsEditingConfig(true);
    setIsSheetOpen(true);
  };

  const openAddTab = () => {
    setIsEditingConfig(false);
    setEditingTabIndex(null);
    setTabForm({
      id: "",
      title: "",
      icon: "lotus",
      content: "",
      points: [""],
      image: "",
      imageFile: null,
      imagePreview: "",
    });
    setIsSheetOpen(true);
  };

  const openEditTab = (index: number) => {
    setIsEditingConfig(false);
    setEditingTabIndex(index);
    const tab = data.tabs[index];
    setTabForm({
      ...tab,
      imageFile: null,
      imagePreview: tab.image,
    });
    setIsSheetOpen(true);
  };

  const handleSaveConfig = () => {
    setData((prev) => ({
      ...prev,
      ...configForm,
    }));
    setIsSheetOpen(false);
    setIsEditingConfig(false);
  };

  const handleSaveTab = () => {
    const finalImage = tabForm.imagePreview || tabForm.image;
    const newTab: RSSInfoTab = {
      id: tabForm.id,
      title: tabForm.title,
      icon: tabForm.icon,
      content: tabForm.content,
      points: tabForm.points.filter((p) => p.trim() !== ""),
      image: finalImage,
    };

    if (editingTabIndex !== null) {
      setData((prev) => ({
        ...prev,
        tabs: prev.tabs.map((t, i) => (i === editingTabIndex ? newTab : t)),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        tabs: [...prev.tabs, newTab],
      }));
    }

    setIsSheetOpen(false);
    setEditingTabIndex(null);
  };

  const handleDeleteTab = (index: number) => {
    setData((prev) => ({
      ...prev,
      tabs: prev.tabs.filter((_, i) => i !== index),
    }));
  };

  const addPoint = () => {
    setTabForm((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  const updatePoint = (index: number, value: string) => {
    setTabForm((prev) => ({
      ...prev,
      points: prev.points.map((p, i) => (i === index ? value : p)),
    }));
  };

  const removePoint = (index: number) => {
    setTabForm((prev) => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">RSS Overview Management</h2>
        <div className="flex gap-2">
          <Button onClick={openEditConfig} variant="outline">
            Edit Config
          </Button>
          <Button onClick={openAddTab} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Tab
          </Button>
        </div>
      </div>

      
      <div className="mb-6 p-4 border rounded-lg bg-muted/30">
        <h3 className="font-semibold mb-2">{data.badgeText}</h3>
        <h4 className="text-lg font-bold mb-1">{data.mainTitle}</h4>
        <p className="text-sm text-muted-foreground">{data.mainSubtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.tabs.map((tab, index) => (
          <div key={index} className="border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white group">
            <div className="relative h-48 w-full overflow-hidden">
              {tab.image ? (
                <Image
                  src={tab.image}
                  alt={tab.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <span className="text-orange-400 text-sm">No image</span>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-orange-600 border border-orange-200">
                  {tab.icon}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2 text-gray-900">{tab.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                {tab.content}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded">
                  {tab.points.length} points
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 font-mono">
                  {tab.id}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => openEditTab(index)} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteTab(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>
              {isEditingConfig
                ? "Edit Overview Configuration"
                : editingTabIndex !== null
                ? "Edit Tab"
                : "Add New Tab"}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              {isEditingConfig ? (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Badge Text</label>
                    <Input
                      value={configForm.badgeText}
                      onChange={(e) => setConfigForm({ ...configForm, badgeText: e.target.value })}
                      placeholder="मूल सिद्धांत"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Main Title</label>
                    <Input
                      value={configForm.mainTitle}
                      onChange={(e) => setConfigForm({ ...configForm, mainTitle: e.target.value })}
                      placeholder="Core Values"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Main Subtitle</label>
                    <Textarea
                      value={configForm.mainSubtitle}
                      onChange={(e) => setConfigForm({ ...configForm, mainSubtitle: e.target.value })}
                      rows={3}
                      placeholder="Discover How Our Values..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tab ID</label>
                    <Input
                      value={tabForm.id}
                      onChange={(e) => setTabForm({ ...tabForm, id: e.target.value })}
                      placeholder="vision, mission, values"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      value={tabForm.title}
                      onChange={(e) => setTabForm({ ...tabForm, title: e.target.value })}
                      placeholder="संकल्प"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Icon Name</label>
                    <Input
                      value={tabForm.icon}
                      onChange={(e) => setTabForm({ ...tabForm, icon: e.target.value })}
                      placeholder="lotus, flag, dharma"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Content</label>
                    <Textarea
                      value={tabForm.content}
                      onChange={(e) => setTabForm({ ...tabForm, content: e.target.value })}
                      rows={6}
                      className="min-h-[150px]"
                      placeholder="Tab description..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Points</label>
                    <div className="space-y-4">
                      {tabForm.points.map((point, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs text-muted-foreground">Point {idx + 1}</label>
                            {tabForm.points.length > 1 && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removePoint(idx)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                              </Button>
                            )}
                          </div>
                          <Textarea
                            value={point}
                            onChange={(e) => updatePoint(idx, e.target.value)}
                            rows={3}
                            className="min-h-[80px]"
                            placeholder="Enter point..."
                          />
                        </div>
                      ))}

                      <Button variant="outline" onClick={addPoint} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Point
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Upload Image</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      {tabForm.imagePreview && (
                        <div className="w-full h-48 relative rounded-lg overflow-hidden border">
                          <Image
                            src={tabForm.imagePreview}
                            alt="preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
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
                onClick={isEditingConfig ? handleSaveConfig : handleSaveTab}
              >
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
