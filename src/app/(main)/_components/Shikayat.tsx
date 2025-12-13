import React from "react";
import {
  ShieldCheck,
  Clock,
  FileText,
  Send,
  CheckCircle2,
  CircleDashed,
} from "lucide-react";
import { motion } from "motion/react";
import SectionHeader from "@/components/common/SectionHeader";

const ShikayatSection: React.FC = () => {
  return (
    <section className="py-24 bg-primary-50 relative overflow-hidden w-full">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 relative z-10">
        <SectionHeader
          badgeTitle="Jan Sunwai Portal"
          badgeIcon={CircleDashed}
          title="Shikayat Portal"
          viewAll="Track Shikayat"
          viewAllLink="#"
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
                Your Voice, <br />
                <span className="text-red-600 relative inline-block">
                  Our Priority.
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-red-100 -z-10 -rotate-1"></span>
                </span>
              </h3>

              <p className="text-gray-600 text-lg xl:text-xl mb-10 leading-relaxed font-medium max-w-2xl">
                The <strong>'Samadhan'</strong> initiative bridges the gap
                between citizens and solutions. Whether it's civic
                infrastructure, social welfare, or personal aid, we are
                committed to resolving your concerns swiftly.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-red-600 shrink-0">
                    <Clock size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      24/7 Access
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Submit grievances anytime, anywhere.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-red-600 shrink-0">
                    <FileText size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Live Tracking
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Real-time status updates on your ticket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <CheckCircle2 size={14} className="text-green-500" /> 100%
                  Anonymous
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <CheckCircle2 size={14} className="text-blue-500" /> Fast
                  Resolution
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Form Card */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 relative overflow-hidden max-w-xl mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-600 rounded-bl-[100px] -z-0 opacity-[0.03]"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-900 rounded-tr-[80px] -z-0 opacity-[0.02]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">
                      Quick Complaint
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                      We urge you to be genuine.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 animate-pulse">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all placeholder:text-gray-400 focus:bg-white"
                          placeholder="e.g. Rahul Kumar"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                          Mobile
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all placeholder:text-gray-400 focus:bg-white"
                          placeholder="+91"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        Issue Type
                      </label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer focus:bg-white appearance-none">
                        <option value="">Select Category</option>
                        <option>Social Welfare / Community</option>
                        <option>Civic Infrastructure</option>
                        <option>Education Support</option>
                        <option>Medical Emergency</option>
                        <option>Other Query</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        Details
                      </label>
                      <textarea
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all h-32 resize-none placeholder:text-gray-400 focus:bg-white"
                        placeholder="Describe the issue clearly..."
                      ></textarea>
                    </div>
                  </div>

                  <button className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest text-xs py-4.5 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-500/20 flex items-center justify-center gap-2 group">
                    <span>Submit & Track</span>
                    <Send
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-xs text-gray-400 font-medium">
                    Already submitted?{" "}
                    <a
                      href="#"
                      className="text-gray-900 font-bold hover:text-red-600 transition-colors border-b-2 border-gray-100 pb-0.5 hover:border-red-600"
                    >
                      Check Status
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShikayatSection;
