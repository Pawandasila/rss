"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Save, X, Plus } from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { AboutData } from "../../types/home/about/type";

interface ExtendedAboutData {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  content: {
    quote: string;
    description: string[];
    conclusion: string;
  };
  imageFile?: File | null;
  imagePreview?: string;
}

type Props = {
  data: AboutData;
  setData: React.Dispatch<React.SetStateAction<AboutData>>;
};

export default function AboutSectionManager({ data, setData }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [form, setForm] = useState<ExtendedAboutData>({
    title: data.title,
    subtitle: data.subtitle,
    image: data.image,
    ctaText: data.ctaText,
    ctaLink: data.ctaLink,
    content: {
      quote: data.content.quote,
      description: [...data.content.description],
      conclusion: data.content.conclusion,
    },
    imageFile: null,
    imagePreview: data.image,
  });

  useEffect(() => {
    setForm({
      title: data.title,
      subtitle: data.subtitle,
      image: data.image,
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
      content: {
        quote: data.content.quote,
        description: [...data.content.description],
        conclusion: data.content.conclusion,
      },
      imageFile: null,
      imagePreview: data.image,
    });
  }, [data]);

  const handleFile = (file?: File | null) => {
    if (!file) {
      return setForm((f) => ({ ...f, imageFile: null, imagePreview: "" }));
    }
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, imageFile: file, imagePreview: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const save = () => {
    setData((prev) => ({
      ...prev,
      title: form.title,
      subtitle: form.subtitle,
      image: form.imagePreview || prev.image,
      // keep existing cta fields as-is (not edited here)
      ctaText: prev.ctaText,
      ctaLink: prev.ctaLink,
      content: {
        quote: form.content.quote,
        description: [...form.content.description],
        conclusion: form.content.conclusion,
      },
      // also reflect top-level conclusion if interface keeps it
      conclusion: form.content.conclusion,
    }));
    setIsSheetOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">About Section Management</h2>
        <Button onClick={() => setIsSheetOpen(true)} className="bg-orange-600 hover:bg-orange-700">Edit</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">{data.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{data.content.description[0]}</p>
          <p className="text-sm text-muted-foreground">{data.content.conclusion}</p>
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden border">
          {form.imagePreview ? (
            <Image src={form.imagePreview} alt={data.title} fill className="object-cover" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">No image</div>
          )}
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>Edit About Section</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>

            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>

            <div>
              <label className="text-sm font-medium">Quote</label>
              <Textarea
                value={form.content.quote}
                onChange={(e) =>
                  setForm({ ...form, content: { ...form.content, quote: e.target.value } })
                }
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Main Content</label>
              <div className="space-y-4">
                {form.content.description.map((para, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-muted-foreground">Paragraph {idx + 1}</label>
                      {form.content.description.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const next = form.content.description.filter((_, i) => i !== idx);
                            setForm({
                              ...form,
                              content: { ...form.content, description: next.length ? next : [""] },
                            });
                          }}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                    <Textarea
                      value={para}
                      onChange={(e) => {
                        const next = [...form.content.description];
                        next[idx] = e.target.value;
                        setForm({ ...form, content: { ...form.content, description: next } });
                      }}
                      rows={idx === 0 ? 6 : 4}
                      className="min-h-[100px]"
                    />
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={() =>
                    setForm({
                      ...form,
                      content: { ...form.content, description: [...form.content.description, ""] },
                    })
                  }
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Paragraph
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Conclusion</label>
              <Textarea
                value={form.content.conclusion}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: { ...form.content, conclusion: e.target.value },
                  })
                }
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Upload Image</label>
              <div className="flex items-center gap-3 mt-2">
                <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
                {form.imagePreview ? (
                  <div className="w-28 h-16 relative rounded overflow-hidden border">
                    <Image src={form.imagePreview} alt="preview" fill className="object-cover" />
                  </div>
                ) : null}
              </div>
            </div>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t bg-background">
            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 flex-1" onClick={save}>
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
