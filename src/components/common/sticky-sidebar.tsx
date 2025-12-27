"use client";
import React from "react";
import { Phone, MessageCircle, FileText, MailIcon, Mail } from "lucide-react";
import Link from "next/link";

const StickySidebar: React.FC = () => {
  return (
    <>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        <div className="group flex items-center justify-end relative">
          <div className="absolute right-12 bg-apml-red text-white text-xs font-bold px-4 py-2 rounded-l shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Contact Us
          </div>
          <Link
            href={"mailto:help@joinrss.org.in"}
            className="w-12 h-12 bg-white border-2 border-apml-red text-apml-red flex items-center justify-center rounded-l-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-apml-red hover:text-white transition-colors relative z-10 cursor-pointer"
          >
            <MailIcon size={20} strokeWidth={2.5} />
          </Link>
        </div>

        <div className="group flex items-center justify-end relative">
          <div className="absolute right-12 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-l shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Call Us
          </div>
          <Link
            href="tel:+91 94296 93593"
            className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center rounded-l-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-gray-800 transition-colors relative z-10"
          >
            <Phone size={20} strokeWidth={2.5} />
          </Link>
        </div>

        <div className="group flex items-center justify-end relative">
          <div className="absolute right-12 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-l shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            WhatsApp Us
          </div>
          <Link
            href="https://wa.me/9429693593"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-l-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-green-600 transition-colors relative z-10"
          >
            <MessageCircle size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 lg:hidden flex justify-between items-end px-6 py-1 pb-2">
        <Link
          href="tel:+91 94296 93593"
          className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-apml-red transition-colors w-14"
        >
          <Phone size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Call
          </span>
        </Link>

        <button className="flex flex-col items-center gap-0.5 relative -top-4">
          <div className="bg-apml-red text-white w-11 h-11 rounded-full shadow-lg shadow-red-200 flex items-center justify-center border-[3px] border-white transform active:scale-95 transition-transform">
            <MailIcon size={20} strokeWidth={2.5} />
          </div>
          <Link
            href={"mailto:help@joinrss.org.in"}
            className="text-[9px] font-bold uppercase tracking-wider text-apml-red"
          >
            Email
          </Link>
        </button>

        <Link
          href="https://wa.me/9429693593"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-green-600 transition-colors w-14"
        >
          <MessageCircle size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Chat
          </span>
        </Link>
      </div>
    </>
  );
};

export default StickySidebar;
