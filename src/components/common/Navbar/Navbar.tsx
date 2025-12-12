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
} from "lucide-react";

import gsap from "gsap";
import Logo from "./Logo";
import { navigationItems } from "./Navitems";

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
      className="sticky top-0 z-[50] font-sans bg-primary shadow-lg"
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
              className="flex flex-col lg:flex-row mt-12 gap-10 lg:gap-16"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              id="mobile-menu"
            >
              <nav
                className="lg:w-1/4 lg:border-r border-gray-100 lg:pr-12 text-center lg:text-left space-y-10 menu-item-stagger"
                aria-label="Contact and Social"
              >
                <div className="flex flex-col items-center lg:items-start group cursor-pointer w-fit mx-auto lg:mx-0">
                  <Logo />
                </div>
                <div>
                  <h4 className="text-primary font-bold text-lg mb-1">
                    Contact
                  </h4>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                    Central Office, Nagpur
                  </p>
                  <div className="text-2xl sm:text-3xl font-light text-gray-800 hover:text-primary transition-colors cursor-pointer">
                    {+1010101011010}
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
                    <span className="text-primary font-bold">
                      50,000+ Shakhas
                    </span>{" "}
                    conducting daily activities across Bharat.
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-bold mb-4 text-sm uppercase tracking-widest">
                    Connect
                  </h4>
                  <div className="flex justify-center lg:justify-start gap-6">
                    <Facebook
                      className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors"
                      size={20}
                      aria-label="Facebook"
                    />
                    <Twitter
                      className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
                      size={20}
                      aria-label="Twitter"
                    />
                    <Instagram
                      className="text-gray-400 hover:text-pink-600 cursor-pointer transition-colors"
                      size={20}
                      aria-label="Instagram"
                    />
                    <Youtube
                      className="text-gray-400 hover:text-red-600 cursor-pointer transition-colors"
                      size={20}
                      aria-label="Youtube"
                    />
                  </div>
                </div>
              </nav>

              <nav
                className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 pb-12 px-4 sm:px-0"
                aria-label="Main Site Navigation"
              >
                {navigationItems.map((item) => (
                  <div key={item.id} className="space-y-4 menu-item-stagger">
                    <h5 className="text-gray-400 font-bold uppercase tracking-widest text-xs border-b border-gray-100 pb-2">
                      {item.title}
                    </h5>
                    {item.submenu && item.submenu.length > 0 ? (
                      <ul className="space-y-2 text-sm font-medium text-gray-600">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.id}>
                            <a
                              href={subItem.href}
                              className="hover:text-primary transition-colors block py-1 hover:translate-x-1 duration-200"
                            >
                              {subItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-2 text-sm font-medium text-gray-600">
                        <li>
                          <a
                            href={item.href}
                            className="hover:text-primary transition-colors block py-1 hover:translate-x-1 duration-200"
                          >
                            {item.title}
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar Container */}
      <div className="container mx-auto px-4 py-3 relative z-10 text-white">
        <div className="flex flex-row justify-between items-center w-full">
          {/* Animated Logo */}
          <div className="flex items-center gap-4 group cursor-pointer flex-shrink-0">
            <Logo />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white hover:text-white/80 transition-colors p-2 -mr-2"
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

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <span className="flex items-center gap-2 cursor-pointer hover:text-orange-200 transition-colors bg-white/10 px-3 py-1.5 rounded-full whitespace-nowrap">
              <Phone size={16} /> {+1101001}
            </span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-orange-200 transition-colors whitespace-nowrap">
              <Flag size={16} /> Locate Shakha
            </span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-orange-200 transition-colors whitespace-nowrap">
              <Search size={16} /> Search
            </span>
            <Menu
              size={28}
              className="cursor-pointer hover:text-orange-200 ml-2"
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
