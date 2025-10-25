"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PhotoGallery from './Photo/PhotoGallery';
import VideoGallery from './Video/VideoGallery';
import { Images, Play } from 'lucide-react';

const Gallery = () => {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our visual journey through photos and videos showcasing our activities,
            events, and community engagement across different categories.
          </p>
        </div>

        {/* Photos Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 to-green-200/30 rounded-3xl blur-3xl -z-10"></div>
          
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Images className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Photo Gallery</h3>
              </div>
              <PhotoGallery />
            </CardContent>
          </Card>
        </div>

        {/* Videos Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-orange-200/30 rounded-3xl blur-3xl -z-10"></div>
          
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Video Gallery</h3>
              </div>
              <VideoGallery />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Gallery;