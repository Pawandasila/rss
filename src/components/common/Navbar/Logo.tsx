import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const LANGUAGES = [
  "राष्ट्रीय सेवा संघ",
  "RASHTRIYA SEVA SANGH",
  "રાષ્ટ્રીય સેવા સંઘ",
  "ರಾಷ್ಟ್ರೀಯ ಸೇವಾ ಸಂಘ",
  "ராஷ்ட்ரிய சேவா சங்க்",
  "రాష్ట్రీయ సేవా సంఘ్",
  "ರಾಷ್ಟ್ರೀಯ സേവാ സംഘം",
  "রাষ্ট্রীয় সেবা সংঘ",
  "ਰਾਸ਼ਟਰੀ ਸੇਵਾ ਸੰਘ",
  "ରାଷ୍ଟ୍ରୀୟ ସେବା ସଂଘ",
  "राष्ट्रीय सेवा संघ",
  "राष्ट्रीय सेवा संघ",
  "জাতীয় সেবা সংঘ",
  "राष्ट्रिय सेवा संघ",
  "राष्ट्रीय सेवा संघ",
  "Rāṣṭrīya Sēvā Saṅgha",
];

const Logo = () => {
  const [currentLanguage, setCurrentLanguage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % LANGUAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/"
        className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
        aria-label="Rashtriya Seva Sangh - Return to Homepage"
      >
        <div className="relative h-14 w-14 flex-shrink-0 bg-transparent">
          <Image
            src={logo}
            alt="राष्ट्रीय स्वयंसेवक संघ Logo"
            fill
            className="object-contain bg-transparent"
            priority
          />
        </div>
        <div className="block">
          <h1 className="font-lato font-bold text-xs md:text-sm lg:text-lg xl:text-lg leading-tight">
            <span className="bg-gradient-to-r from-orange-600 to-green-600 font-extrabold bg-clip-text text-transparent whitespace-nowrap animate-tricolor-flow bg-[length:300%_100%] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              RASHTRIYA SEVA SANGH
            </span>
          </h1>
          <div className="relative h-5 overflow-hidden w-32 sm:w-64 mt-0.5">
            {LANGUAGES.map((lang, index) => (
              <p
                key={index}
                className={`font-nunito text-[9px] sm:text-xs text-primary absolute inset-0 transition-all duration-700 transform tracking-tighter ${
                  currentLanguage === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-full"
                }`}
              >
                {lang}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
