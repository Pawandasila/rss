import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link 
        href="/" 
        className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
        aria-label="राष्ट्रीय सेवा संघ - Home"
      >
        <div className="relative h-14 w-14">
          <Image
            src="/logo/logo.png"
            alt="राष्ट्रीय सेवा संघ Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="hidden sm:block">
          <h1 className="font-lato font-bold text-lg lg:text-sm 2xl:text-lg leading-tight">
            <span className="bg-gradient-to-r from-orange-500 via-gray-400 to-green-600 bg-clip-text text-transparent animate-pulse">
              RASHTRIYA SEVA SANGH
            </span>
          </h1>
          <p className="font-nunito text-xs text-gray-600 mt-1">
            United for Dharma, Dedicated for Nation.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;