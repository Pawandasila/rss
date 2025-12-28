"use client";
import React from "react";
import {
  Clock,
  FileText,
  Send,
  CheckCircle2,
  CircleDashed,
  MessageSquarePlus,
  Search,
  Scale,
  ClipboardList,
} from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

const ShikayatSection: React.FC = () => {
  return (
    <section className="py-24 bg-primary-50 relative overflow-hidden w-full">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          badgeTitle="जन सेवा एवं समाधान पोर्टल"
          badgeIcon={CircleDashed}
          title="Jan Seva & Samadhan Porta"
          viewAll="Track Shikayat"
          // viewAllLink="#"
        />
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-32">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                आपकी समस्या, <br />
                <span className="text-red-600 relative inline-block">
                  हमारा संकल्प।
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-red-100 -z-10 -rotate-1"></span>
                </span>
              </h3>

              <p className="text-gray-600 text-lg xl:text-xl mb-10 leading-relaxed font-medium max-w-2xl">
                <strong>'राष्ट्रीय सेवा संघ' </strong> केवल एक संगठन नहीं, बल्कि
                हर नागरिक का संबल है। हमारा 'समाधान' पोर्टल नागरिक और न्याय के
                बीच की दूरी को मिटाने के लिए बनाया गया है। चाहे बात सामाजिक
                कल्याण की हो, प्रशासनिक अड़चनों की या व्यक्तिगत सहायता की—हम आपकी
                आवाज़ को समाधान तक पहुँचाने के लिए प्रतिबद्ध हैं।
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-red-600 shrink-0">
                    <Clock size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      24/7 सुलभता
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      अपनी शिकायत या समस्या किसी भी समय, कहीं से भी दर्ज करें।
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-red-600 shrink-0">
                    <FileText size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      लाइव ट्रैकिंग
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      अपनी शिकायत की वर्तमान स्थिति और की गई कार्रवाई की पल-पल
                      की जानकारी प्राप्त करें।
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <CheckCircle2 size={14} className="text-green-500" /> 100%
                  अनानायम
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <CheckCircle2 size={14} className="text-blue-500" /> तेज
                  समाधान
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Process Guide */}
          <div className="lg:w-1/2 w-full relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative py-4 md:py-10"
            >
              <div className="flex flex-col gap-8 md:gap-12 relative">
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                  <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
                    <ClipboardList className="text-red-600 w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-xl md:text-3xl font-black text-gray-900 border-b-4 border-red-500/20 pb-1 font-hind">
                    पोर्टल का उपयोग कैसे करें?
                  </h3>
                </div>

                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 md:gap-6 items-start group"
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-red-600 transition-transform duration-300 group-hover:scale-110 z-10 relative border border-gray-50">
                      <MessageSquarePlus className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div className="absolute top-1/2 left-full w-24 h-0.5 bg-gradient-to-r from-red-200 to-transparent -z-10 hidden md:block"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-lg md:text-2xl font-black text-gray-900 mb-1 md:mb-2 font-hind">
                      शिकायत दर्ज करें (Submit Grievance)
                    </h4>
                    <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed font-hind">
                      अपनी समस्या का विवरण विस्तार से लिखें। हमारी टीम जल्द से
                      जल्द आपसे संपर्क करेगी।
                    </p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 md:gap-6 items-start translate-x-0 md:translate-x-12 group"
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 transition-transform duration-300 group-hover:scale-110 z-10 relative border border-gray-50">
                      <Search className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div className="absolute top-1/2 left-full w-24 h-0.5 bg-gradient-to-r from-gray-200 to-transparent -z-10 hidden lg:block"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-lg md:text-2xl font-black text-gray-900 mb-1 md:mb-2 font-hind">
                      ट्रैक करें (Track Complaint)
                    </h4>
                    <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed font-hind">
                      अपनी विशिष्ट टिकट आईडी के माध्यम से स्टेटस देखें और अद्यतन
                      जानकारी प्राप्त करें।
                    </p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 md:gap-6 items-start translate-x-0 md:translate-x-24 group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-900 shadow-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shrink-0 z-10 relative">
                    <Scale className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-lg md:text-2xl font-black text-gray-900 mb-1 md:mb-2 font-hind">
                      न्याय पाएँ (Get Resolution)
                    </h4>
                    <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed font-hind">
                      संगठन के माध्यम से उचित समाधान और मार्गदर्शन प्राप्त करें।
                      हम आपके साथ खड़े हैं।
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Floating Action Button for Contact */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 md:mt-16 flex justify-center md:justify-start translate-x-0 md:translate-x-32"
              >
                <button className="bg-red-600 text-white font-black uppercase tracking-widest text-[10px] md:text-xs py-4 md:py-5 px-8 md:px-10 rounded-full hover:bg-black transition-all duration-500 shadow-2xl hover:shadow-red-500/30 flex items-center gap-3">
                  <span className="font-hind">शिकायत दर्ज करें</span>
                  <Send size={16} />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShikayatSection;
