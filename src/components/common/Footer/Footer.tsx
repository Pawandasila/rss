"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  ChevronUp,
  Globe,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const Footer = () => {
  const LOCATIONS = [
    "RSS Delhi Prant",
    "RSS Mumbai Mahanagar",
    "RSS Karnataka Dakshin",
    "RSS Kerala Prant",
    "RSS Uttar Pradesh East",
    "RSS Rajasthan Jaipur",
    "RSS Gujarat Prant",
    "RSS West Bengal",
    "RSS Madhya Bharat",
    "RSS Konkan Prant",
    "RSS Devgiri Prant",
    "RSS Vidarbha",
    "RSS Tamil Nadu North",
    "RSS Telangana",
    "RSS Punjab",
    "RSS Himachal",
  ];

  const QUICK_LINKS = [
    { name: "Vision & Mission", href: "#" },
    { name: "History", href: "#" },
    { name: "Founder", href: "#" },
    { name: "Sarsanghchalaks", href: "#" },
    { name: "Timeline", href: "#" },
  ];

  const RESOURCES = [
    { name: "Downloads", href: "#" },
    { name: "Literature", href: "#" },
    { name: "Songs (Geet)", href: "#" },
    { name: "Photo Gallery", href: "#" },
    { name: "Archives", href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0c10] text-gray-400 border-t border-gray-800 relative">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl">
                <Image
                  src={logo}
                  alt="RSS"
                  height={100}
                  width={100}
                  className="object-contain h-16 w-16"
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-black leading-none tracking-tighter">
                  RASHTRIYA <br /> SEVA SANGH
                </h3>
                <p className="text-[10px] text-apml-red font-bold uppercase tracking-[0.3em] mt-1">
                  Satyameva Jayate
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-sm">
              Dedicated to the mission of national reconstruction and character
              building. Founded in 1925, we are the world's largest voluntary
              organization committed to Bharat's resurgence.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-white font-black text-xl">1925</span>
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                  Foundation
                </span>
              </div>
              <div className="w-px h-10 bg-gray-800"></div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl">1.5L+</span>
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                  Seva Projects
                </span>
              </div>
              <div className="w-px h-10 bg-gray-800"></div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl">50K+</span>
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                  Shakhas
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-apml-red rounded-full"></div>
              About Sangh
            </h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-apml-red group-hover:w-3 transition-all"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-apml-red rounded-full"></div>
              Resources
            </h4>
            <ul className="space-y-4">
              {RESOURCES.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-apml-red group-hover:w-3 transition-all"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional & Contact */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm">
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Regional Centers</span>
                <Globe size={14} className="text-apml-red" />
              </h4>
              <div className="h-40 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-1 gap-2">
                {LOCATIONS.map((loc, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-xs text-gray-500 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-gray-700"
                  >
                    {loc}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-apml-red/10 border border-apml-red/20 flex items-center justify-center text-apml-red group-hover:bg-apml-red group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-600">
                    Central Helpline
                  </span>
                  <span className="text-white font-bold">+91 712 272 3003</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-apml-red/10 border border-apml-red/20 flex items-center justify-center text-apml-red group-hover:bg-apml-red group-hover:text-white transition-all">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-600">
                    Headquarters
                  </span>
                  <span className="text-white font-bold">
                    Nagpur, Maharashtra
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social & Bottom Bar */}
      <div className="bg-[#050608] border-t border-gray-800/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, color: "hover:bg-blue-600" },
                { Icon: Twitter, color: "hover:bg-sky-500" },
                { Icon: Youtube, color: "hover:bg-red-600" },
                { Icon: Instagram, color: "hover:bg-pink-600" },
                { Icon: Linkedin, color: "hover:bg-blue-700" },
              ].map(({ Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 transition-all duration-300 ${color} hover:text-white hover:-translate-y-1 hover:shadow-lg`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Copyright & Links */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-xs text-gray-500 font-medium">
              <p>© 2024 Rashtriya Swayamsevak Sangh. All Rights Reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Use
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Sitemap
                </a>
              </div>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              Back to Top
              <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-apml-red group-hover:border-apml-red transition-all">
                <ChevronUp size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Final Bottom Branding */}
      <div className="bg-apml-red h-1.5 w-full"></div>
    </footer>
  );
};

export default Footer;
