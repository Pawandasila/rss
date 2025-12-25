"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import ImagesManager from "./_components/ImagesManager";
import VideosManager from "./_components/VideosManager";
import BannersManager from "./_components/BannersManager";
import HolyBooksManager from "./_components/HolyBooksManager";
import {
  Image as ImageIcon,
  Video,
  ImageDown,
  Book,
  Layers,
} from "lucide-react";

type GalleryTab = "images" | "videos" | "banners" | "holy-books";

const GalleryPage: React.FC = () => {
  const [active, setActive] = useState<GalleryTab>("images");

  const tabs: { id: GalleryTab; label: string; icon: React.ReactNode }[] = [
    { id: "images", label: "Images", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "videos", label: "Videos", icon: <Video className="w-4 h-4" /> },
    {
      id: "banners",
      label: "Banners",
      icon: <ImageDown className="w-4 h-4" />,
    },
    {
      id: "holy-books",
      label: "Holy Books",
      icon: <Book className="w-4 h-4" />,
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-orange-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gallery Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage images, videos, banners and holy books
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm">
            Draft Mode
          </Badge>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              variant={active === tab.id ? "default" : "outline"}
              className={
                active === tab.id
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "hover:bg-gray-100"
              }
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {active === "images" && <ImagesManager />}
        {active === "videos" && <VideosManager />}
        {active === "banners" && <BannersManager />}
        {active === "holy-books" && <HolyBooksManager />}
      </div>
    </div>
  );
};

export default GalleryPage;
