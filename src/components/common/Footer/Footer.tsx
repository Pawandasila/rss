import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

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
  return (
    <div>
      <section className="border-t border-gray-100 py-6 bg-gray-50">
        <div className="container mx-auto flex flex-wrap justify-center md:justify-around gap-6 text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wide">
          <div className="flex items-center gap-2">
            <span className="text-apml-red">✎</span> Feedback
          </div>
          <div className="flex items-center gap-2">
            <span className="text-apml-red">📷</span> Gallery
          </div>
          <div className="flex items-center gap-2">
            <span className="text-apml-red">🏆</span> History
          </div>
          <div className="flex items-center gap-2">
            <span className="text-apml-red">▶</span> Media
          </div>
          <div className="flex items-center gap-2">
            <span className="text-apml-red">?</span> FAQ's
          </div>
          <div className="flex items-center gap-2">
            <span className="text-apml-red">📋</span> Literature
          </div>
          <div className="flex items-center gap-2">
            <span className="text-apml-red">🎧</span> Helpline
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 mt-12">
        {/* Prants Location */}
        <div className="container mx-auto px-4 py-8">
          <h4 className="text-apml-red font-bold text-sm uppercase mb-4 border-b border-gray-200 pb-2">
            RSS Prants (Regions)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {LOCATIONS.map((loc, i) => (
              <a
                key={i}
                href="#"
                className="text-[10px] text-gray-500 hover:text-apml-red hover:underline block truncate"
              >
                {loc}
              </a>
            ))}
          </div>
        </div>

        {/* Main Red Footer */}
        <div className="bg-apml-darkRed text-white pt-12 pb-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
              {/* About */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-base mb-4">
                  About RSS
                </h5>
                <ul className="space-y-2 text-gray-300 text-xs">
                  <li>
                    <a href="#" className="hover:text-white">
                      Vision & Mission
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      History
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Founder
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Sarsanghchalaks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-base mb-4">
                  Resources
                </h5>
                <ul className="space-y-2 text-gray-300 text-xs">
                  <li>
                    <a href="#" className="hover:text-white">
                      Downloads
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Literature
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Songs (Geet)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Photo Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Archives
                    </a>
                  </li>
                </ul>
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-base mb-4">
                  Activities
                </h5>
                <ul className="space-y-2 text-gray-300 text-xs">
                  <li>
                    <a href="#" className="hover:text-white">
                      Seva Projects
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Rural Development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Cow Protection
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Family Counseling
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Environment
                    </a>
                  </li>
                </ul>
              </div>

              {/* Connect */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-base mb-4">Connect</h5>
                <ul className="space-y-2 text-gray-300 text-xs">
                  <li>
                    <a href="#" className="hover:text-white">
                      Join RSS
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Locate Shakha
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Box */}
              <div className="bg-red-900/50 p-6 rounded-lg border border-red-800">
                <h5 className="font-bold text-white text-base mb-4">
                  Central Office
                </h5>
                <p className="text-xs text-gray-300 mb-2">
                  Dr. Hedgewar Bhavan, Mahal, Nagpur - 440032
                </p>
                <p className="text-xl font-bold text-white mb-4">
                  +91 712 272 3003
                </p>
                <button className="bg-white text-apml-red px-4 py-2 rounded text-xs font-bold w-full mb-4 hover:bg-gray-100 transition">
                  Donate Online
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-[#4a0404] text-white/60 py-4 text-[10px]">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>© 2024 Rashtriya Swayamsevak Sangh. All Rights Reserved</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <span className="text-white/30">|</span>
              <a href="#" className="hover:text-white">
                Terms of Use
              </a>
              <div className="flex items-center gap-3 ml-4">
                <Facebook
                  size={14}
                  className="hover:text-white cursor-pointer"
                />
                <Twitter
                  size={14}
                  className="hover:text-white cursor-pointer"
                />
                <Linkedin
                  size={14}
                  className="hover:text-white cursor-pointer"
                />
                <Instagram
                  size={14}
                  className="hover:text-white cursor-pointer"
                />
                <Youtube
                  size={14}
                  className="hover:text-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
