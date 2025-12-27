"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Search,
  Menu,
  Flag,
  X,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";

import gsap from "gsap";
import Logo from "./Logo";
import { navigationItems } from "./Navitems";
import Link from "next/link";

const MobileNavItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div className="menu-item-stagger">
      <div className="hidden lg:block space-y-4">
        <h5 className="text-gray-400 font-bold uppercase tracking-widest text-xs border-b border-gray-100 pb-2">
          {item.title}
        </h5>
        <ul className="space-y-2 text-sm font-medium text-gray-600">
          {hasSubmenu ? (
            item.submenu.map((subItem: any) => (
              <li key={subItem.id}>
                <a
                  href={subItem.href}
                  className="hover:text-primary transition-colors block py-1 hover:translate-x-1 duration-200"
                >
                  {subItem.title}
                </a>
              </li>
            ))
          ) : (
            <li>
              <a
                href={item.href}
                className="hover:text-primary transition-colors block py-1 hover:translate-x-1 duration-200"
              >
                {item.title}
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Layout: Accordion */}
      <div className="block lg:hidden border-b border-gray-50 last:border-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center py-4 text-left group"
        >
          <span
            className={`font-bold text-lg ${
              isOpen ? "text-primary" : "text-gray-800"
            }`}
          >
            {item.title}
          </span>
          {hasSubmenu && (
            <ChevronDown
              size={20}
              className={`text-gray-400 transition-transform duration-300 ${
                isOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="pb-4 space-y-3 pl-2">
            {hasSubmenu ? (
              item.submenu.map((subItem: any) => (
                <li key={subItem.id}>
                  <Link
                    href={subItem.href}
                    className="text-gray-600 font-medium block text-sm hover:text-primary"
                  >
                    {subItem.title}
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <Link
                  href={item.href}
                  className="text-gray-600 font-medium block text-sm hover:text-primary"
                >
                  {item.title}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        ".menu-item-stagger",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header
      className="sticky top-0 z-[50] bg-white font-sans shadow-lg"
      ref={headerRef}
    >
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-200">
          <div className="container mx-auto px-4 py-6 relative min-h-screen">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-apml-red transition-colors transform hover:rotate-90 duration-300 z-50 p-2"
              aria-label="Close menu"
            >
              <X size={32} strokeWidth={2} aria-hidden="true" />
            </button>

            <div
              className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16 mt-12"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              id="mobile-menu"
            >
              <div className="lg:col-span-1 order-1 mx-auto lg:order-none flex flex-col items-center lg:items-start menu-item-stagger">
                <div className="flex flex-row mx-auto gap-3 mt-6 w-full">
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-primary text-primary font-semibold text-sm rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-full text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </div>
              </div>

              <nav
                className="lg:col-span-3 lg:row-span-2 order-2 lg:order-none"
                aria-label="Main Site Navigation"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4 lg:gap-y-10">
                  {navigationItems.map((item, idx) => (
                    <MobileNavItem key={item.id} item={item} />
                  ))}
                </div>
              </nav>

              {/* Contact Section - Order 3 on Mobile */}
              <div
                className="lg:col-span-1 order-3 lg:order-none text-center lg:text-left space-y-10 menu-item-stagger pb-12 lg:pb-0"
                aria-label="Contact and Social"
              >
                <div className="space-y-4">
                  <h4 className="text-primary font-bold text-lg mb-1">
                    Contact
                  </h4>
                  <div
                    className="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => window.open("tel:+919429693593")}
                  >
                    +91 94296 93593
                  </div>
                  <div className="space-y-3 mt-4">
                    <div>
                      <p className="text-primary text-xs uppercase tracking-wider font-bold mb-1">
                        Delhi Office
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        D BLOCK, POCKET-5 (Flat No. 34), DDA Flat, CRPF Flat,
                        Bawana, New Delhi – 110040
                      </p>
                    </div>
                    <div>
                      <p className="text-primary text-xs uppercase tracking-wider font-bold mb-1">
                        Uttarakhand Office
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Bareilly–Nainital Road, Near Motahaldu Bus Stop,
                        Haldwani, Nainital – 263139
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <Globe
                    size={40}
                    className="text-primary mb-4 stroke-1 opacity-80"
                  />
                  <h4 className="font-bold text-gray-800">
                    Nationwide Presence
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-xs mx-auto lg:mx-0 font-medium">
                    Largest voluntary organization with over{" "}
                    <span className="text-primary font-bold">15+ states</span>{" "}
                    conducting daily activities across Bharat.
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-4 text-sm uppercase tracking-widest">
                    Connect
                  </h4>
                  <div className="flex justify-center lg:justify-start gap-6">
                    <Link href="https://www.facebook.com/joinrss">
                      <Facebook
                        className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors"
                        size={20}
                        aria-label="Facebook"
                      />
                    </Link>
                    <Link href="https://twitter.com/joinrss">
                      <Twitter
                        className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
                        size={20}
                        aria-label="Twitter"
                      />
                    </Link>
                    <Link href="https://www.instagram.com/joinrss">
                      <Instagram
                        className="text-gray-400 hover:text-pink-600 cursor-pointer transition-colors"
                        size={20}
                        aria-label="Instagram"
                      />
                    </Link>
                    <Link href="https://www.youtube.com/@joinrss">
                      <Youtube
                        className="text-gray-400 hover:text-red-600 cursor-pointer transition-colors"
                        size={20}
                        aria-label="Youtube"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar Container */}
      <div className="container mx-auto px-4 py-3 relative z-10 text-gray-800">
        <div className="flex flex-row justify-between items-center w-full">
          {/* Animated Logo */}
          <div className="flex items-center gap-4 group cursor-pointer flex-shrink-0">
            <Logo />
          </div>

          {/* Mobile Menu Toggle with Login */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="text-gray-800 hover:text-primary transition-colors p-2 -mr-2"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu
                size={28}
                strokeWidth={2.5}
                className="cursor-pointer"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
            <span
              onClick={() => window.open("tel:+919429693593")}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap text-gray-700"
            >
              <Phone size={16} /> +91 94296 93593
            </span>
            <Link
              href="/auth/login"
              className="flex items-center gap-2 px-4 py-2 text-primary font-semibold border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              <LogIn size={16} />
              Login
            </Link>
            <Menu
              size={28}
              className="cursor-pointer hover:text-primary ml-2"
              onClick={() => setIsMenuOpen(true)}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
