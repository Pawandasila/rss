"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { HeroSlide, HeroConfig } from "../../types/home/hero/types";

interface Props {
  slides: HeroSlide[];
  setSlides: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
  heroConfig: HeroConfig;
  setHeroConfig: React.Dispatch<React.SetStateAction<HeroConfig>>;
}

export default function HeroSectionManager({ slides, setSlides, heroConfig, setHeroConfig }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<HeroSlide>({
    id: 0,
    image: "",
    imageFile: null,
    imagePreview: "",
    title: "",
    titleHindi: "",
    description: "",
    ctaText: "",
    ctaLink: "",
  });

  useEffect(() => {
    if (!isSheetOpen) resetForm();
  }, [isSheetOpen]);

  const handleFileChange = (file?: File | null) => {
    if (!file) {
      setFormData((f) => ({ ...f, imageFile: null, imagePreview: "" }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((f) => ({ ...f, imageFile: file, imagePreview: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const openAdd = () => {
    setEditingSlide(null);
    setIsSheetOpen(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({ ...slide, imageFile: null, imagePreview: slide.image || "" });
    setIsSheetOpen(true);
  };

  const handleAdd = () => {
    const newSlide = {
      ...formData,
      id: Date.now(),
    };
    setSlides([...slides, newSlide]);
    setIsSheetOpen(false);
  };

  const handleUpdate = () => {
    if (!editingSlide) return;
    setSlides(slides.map((s) => (s.id === editingSlide.id ? { ...s, ...formData } : s)));
    setIsSheetOpen(false);
    setEditingSlide(null);
  };

  const handleDelete = (id: number) => {
    setSlides(slides.filter((s) => s.id !== id));
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      image: "",
      imageFile: null,
      imagePreview: "",
      title: "",
      titleHindi: "",
      description: "",
      ctaText: "",
      ctaLink: "",
    });
  };

  const [heroForm, setHeroForm] = useState<HeroConfig>(heroConfig);

  useEffect(() => { setHeroForm(heroConfig); }, [heroConfig]);

  const saveHeroConfig = () => setHeroConfig(heroForm);

  return (
    <div>
      {/* Hero Config Editing */}
      <div className="mb-8 border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hero Configuration</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setHeroForm(heroConfig)}>Revert</Button>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={saveHeroConfig}>
              <Save className="w-4 h-4 mr-2" /> Save Config
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Badge Text</label>
            <Input value={heroForm.badgeText} onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Title Line 1</label>
            <Input value={heroForm.titleLine1} onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Title Line 2</label>
            <Input value={heroForm.titleLine2} onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Subtitle</label>
            <Input value={heroForm.subtitle} onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Paragraph</label>
            <Textarea rows={3} value={heroForm.paragraph} onChange={(e) => setHeroForm({ ...heroForm, paragraph: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Members Stat</label>
            <Input value={heroForm.stats.members} onChange={(e) => setHeroForm({ ...heroForm, stats: { ...heroForm.stats, members: e.target.value } })} />
          </div>
          <div>
            <label className="text-sm font-medium">States Stat</label>
            <Input value={heroForm.stats.states} onChange={(e) => setHeroForm({ ...heroForm, stats: { ...heroForm.stats, states: e.target.value } })} />
          </div>
          <div>
            <label className="text-sm font-medium">Projects Stat</label>
            <Input value={heroForm.stats.projects} onChange={(e) => setHeroForm({ ...heroForm, stats: { ...heroForm.stats, projects: e.target.value } })} />
          </div>
          <div>
            <label className="text-sm font-medium">Primary CTA Text</label>
            <Input value={heroForm.ctaPrimaryText} onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Primary CTA Link</label>
            <Input value={heroForm.ctaPrimaryLink} onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryLink: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Secondary CTA Text</label>
            <Input value={heroForm.ctaSecondaryText} onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryText: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Secondary CTA Link</label>
            <Input value={heroForm.ctaSecondaryLink} onChange={(e) => setHeroForm({ ...heroForm, ctaSecondaryLink: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Hero Slides</h3>
        <Button onClick={openAdd} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" /> Add New Slide
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slides.map((slide) => (
          <div key={slide.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              {slide.imagePreview || slide.image ? (
                <Image
                  src={slide.imagePreview || slide.image || "/hero/hero-01.png"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">No image</div>
              )}
            </div>
            <h3 className="font-bold text-lg mb-2">{slide.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{slide.titleHindi}</p>
            <p className="text-sm text-gray-500 mb-4">{slide.description}</p>
            <div className="flex gap-2">
              <Button onClick={() => openEdit(slide)} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(slide.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>{editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Upload Image</label>
                <div className="space-y-3">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {formData.imagePreview && (
                    <div className="w-full h-48 relative rounded-lg overflow-hidden border">
                      <Image src={formData.imagePreview} alt="preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Title (English)</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter English title" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Title (Hindi)</label>
                <Input value={formData.titleHindi} onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })} placeholder="हिंदी शीर्षक दर्ज करें" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                  rows={4}
                  className="min-h-[100px]"
                  placeholder="Enter slide description"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">CTA Text</label>
                <Input value={formData.ctaText} onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })} placeholder="Button text" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">CTA Link</label>
                <Input value={formData.ctaLink} onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })} placeholder="https://..." />
              </div>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t bg-background">
            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 flex-1" onClick={editingSlide ? handleUpdate : handleAdd}>
                <Save className="w-4 h-4 mr-2" />
                {editingSlide ? "Update Slide" : "Add Slide"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
