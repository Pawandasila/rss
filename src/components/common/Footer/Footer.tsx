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
import Link from "next/link";

const Footer = () => {
  const LOCATIONS = [
    "RSS Uttarakhand",
    "RSS Uttar Pradesh",
    "RSS Delhi",
    "RSS Rajasthan",
    "RSS Madhya Pradesh",
    "RSS Chatthisgarh",
    "RSS Tamil Nadu",
    "RSS Jammu Kashmir",
    "RSS Punjab",
    "RSS Hariyana",
    "RSS Himachal",
    "More",
  ];

  const QUICK_LINKS = [
    { name: "Vision & Mission", href: "/divine-mission" },
    { name: "Blogs", href: "/blog" },
    { name: "Press", href: "/press" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
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
              <div className="w-16 h-16 bg-transparent rounded-2xl flex items-center justify-center p-2 shadow-2xl">
                <Image
                  src={logo}
                  alt="RSS"
                  height={100}
                  width={100}
                  className="object-contain bg-transparent h-16 w-16"
                />
              </div>
              <div>
                <h3 className="text-white text-xl font-black leading-none tracking-tighter">
                  RASHTRIYA SEVA SANGH
                </h3>
                <p className="text-[10px] text-apml-red font-bold uppercase tracking-[0.3em] mt-1">
                  Satyameva Jayate
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-sm">
              Dedicated to the mission of national reconstruction and character
              building. Founded in 2024, we are the world's largest voluntary
              organization committed to Bharat's resurgence.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-white font-black text-xl">2024</span>
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                  Foundation
                </span>
              </div>
              <div className="w-px h-10 bg-gray-800"></div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl">50+</span>
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                  Projects
                </span>
              </div>
              <div className="w-px h-10 bg-gray-800"></div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl">50K+</span>
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                  Members
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
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-apml-red group-hover:w-3 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-apml-red rounded-full"></div>
              Contact Us
            </h4>

            <div
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => window.open("tel:+919429693593")}
            >
              <div className="w-10 h-10 rounded-xl bg-apml-red/10 border border-apml-red/20 flex items-center justify-center text-apml-red group-hover:bg-apml-red group-hover:text-white transition-all flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-600">
                  Central Helpline
                </span>
                <span className="text-white font-bold">+91 94296 93593</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-apml-red/10 border border-apml-red/20 flex items-center justify-center text-apml-red flex-shrink-0 mt-1">
                <MapPin size={18} />
              </div>
              <div className="space-y-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Delhi Office
                  </span>
                  <span className="text-gray-400 text-sm leading-relaxed block">
                    D BLOCK, POCKET-5 (Flat No. 34), DDA Flat, CRPF Flat,
                    Bawana, New Delhi – 110040
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Uttarakhand Office
                  </span>
                  <span className="text-gray-400 text-sm leading-relaxed block">
                    Bareilly - Nainital Road, Near Motahaldu Bus Stop, Haldwani,
                    Nainital - 263139
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Chattisgarh Office
                  </span>
                  <span className="text-gray-400 text-sm leading-relaxed block">
                    Shyam colony, Baloda bazar, near Asvsconstruction Pvt ltd
                    chattisgarh - 493332
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Centers */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm h-full">
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center justify-between">
                <span>Regional Centers</span>
                <Globe size={14} className="text-apml-red" />
              </h4>
              <div className="h-auto overflow-y-auto pr-2 custom-scrollbar grid grid-cols-1 gap-2">
                {LOCATIONS.map((loc, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="text-xs text-gray-500 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-gray-700"
                  >
                    {loc}
                  </Link>
                ))}
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
                {
                  Icon: Facebook,
                  color: "hover:bg-blue-600",
                  href: "https://www.facebook.com/joinrss ",
                },
                {
                  Icon: Twitter,
                  color: "hover:bg-sky-500",
                  href: "https://twitter.com/joinrss",
                },
                {
                  Icon: Youtube,
                  color: "hover:bg-red-600",
                  href: "https://www.youtube.com/@joinrss",
                },
                {
                  Icon: Instagram,
                  color: "hover:bg-pink-600",
                  href: "https://www.instagram.com/joinrss",
                },
                {
                  Icon: Linkedin,
                  color: "hover:bg-blue-700",
                  href: "https://www.linkedin.com/company/joinrss",
                },
              ].map(({ Icon, color, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className={`w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 transition-all duration-300 ${color} hover:text-white hover:-translate-y-1 hover:shadow-lg`}
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>

            {/* Copyright & Links */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-xs text-gray-500 font-medium">
              <p>© 2024 Rashtriya Seva Sangh. All Rights Reserved.</p>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
                <Link
                  href="/refund-policy"
                  className="hover:text-white transition-colors"
                >
                  Refund Policy
                </Link>
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
