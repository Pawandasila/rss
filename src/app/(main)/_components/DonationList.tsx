import React from "react";
import {
  Heart,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Trophy,
  CircleDashed,
} from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

const DONORS = [
  {
    name: "Rahul Sharma",
    amount: "₹ 11,000",
    location: "New Delhi",
    time: "Just now",
    badge: "gold",
  },
  {
    name: "Vikram Singh",
    amount: "₹ 5,100",
    location: "Jaipur",
    time: "2 mins ago",
    badge: "silver",
  },
  {
    name: "Anjali Desai",
    amount: "₹ 21,000",
    location: "Mumbai",
    time: "5 mins ago",
    badge: "platinum",
  },
  {
    name: "Suresh Gupta",
    amount: "₹ 2,100",
    location: "Lucknow",
    time: "12 mins ago",
    badge: "bronze",
  },
  {
    name: "Priya Reddy",
    amount: "₹ 1,100",
    location: "Hyderabad",
    time: "15 mins ago",
    badge: "bronze",
  },
  {
    name: "Amit Verma",
    amount: "₹ 501",
    location: "Patna",
    time: "22 mins ago",
    badge: "supporter",
  },
  {
    name: "K. R. Narayan",
    amount: "₹ 1,00,000",
    location: "Bangalore",
    time: "1 hour ago",
    badge: "diamond",
  },
  {
    name: "Manish Joshi",
    amount: "₹ 5,000",
    location: "Pune",
    time: "1 hour ago",
    badge: "silver",
  },
  {
    name: "Divya Agarwal",
    amount: "₹ 11,000",
    location: "Kolkata",
    time: "2 hours ago",
    badge: "gold",
  },
  {
    name: "Rajesh Kumar",
    amount: "₹ 501",
    location: "Bhopal",
    time: "2 hours ago",
    badge: "supporter",
  },
  {
    name: "Meera Nair",
    amount: "₹ 15,000",
    location: "Kochi",
    time: "3 hours ago",
    badge: "gold",
  },
  {
    name: "Arjun Mehta",
    amount: "₹ 2,500",
    location: "Ahmedabad",
    time: "3 hours ago",
    badge: "bronze",
  },
];

const RecentDonors: React.FC = () => {
  // Duplicate for seamless loop
  const displayList = [...DONORS, ...DONORS];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "diamond":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "platinum":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "gold":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "silver":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-red-50 text-red-600 border-red-100";
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <SectionHeader
          badgeTitle="Our Donors"
          badgeIcon={CircleDashed}
          title="Live Contributions"
          viewAll="View All Donors"
          viewAllLink="#"
        />
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:w-5/12">
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-2xl md:text-3xl font-black text-gray-800 mb-1">
                  12K+
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase">
                  Donors this month
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-2xl md:text-3xl font-black text-gray-800 mb-1">
                  ₹5Cr+
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase">
                  Funds Raised
                </div>
              </div>
            </div>

            <button className="bg-apml-red text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide shadow-xl shadow-red-200 hover:bg-red-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
              Donate Securely <ArrowRight size={18} />
            </button>
          </div>

          {/* Right List - Vertical Marquee Table */}
          <div className="lg:w-7/12 w-full">
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden relative h-[400px] md:h-[500px] flex flex-col">
              {/* Table Header */}
              <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest z-10 relative shadow-sm">
                <div className="w-1/2">Donor</div>
                <div className="w-1/4 text-right">Amount</div>
                <div className="w-1/4 text-right hidden sm:block">Location</div>
              </div>

              {/* Gradient Overlay Top */}
              <div className="absolute top-[40px] md:top-[49px] left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

              {/* Scrolling Content */}
              <div className="overflow-hidden h-full relative">
                <div className="animate-marquee-vertical hover:pause">
                  {displayList.map((donor, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b border-gray-50 hover:bg-red-50/20 transition-colors group cursor-default"
                    >
                      <div className="w-1/2 flex items-center gap-3 md:gap-4">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm border-2 shrink-0 ${getBadgeColor(
                            donor.badge
                          )}`}
                        >
                          {donor.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-gray-800 text-sm group-hover:text-apml-red transition-colors truncate">
                            {donor.name}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium mt-0.5">
                            <Clock size={10} /> {donor.time}
                          </div>
                        </div>
                      </div>
                      <div className="w-1/4 text-right">
                        <div className="font-bold text-gray-700 text-xs md:text-sm bg-gray-50 inline-block px-2 py-1 rounded border border-gray-100">
                          {donor.amount}
                        </div>
                      </div>
                      <div className="w-1/4 text-right hidden sm:flex justify-end items-center gap-1.5 text-xs text-gray-500">
                        <MapPin size={12} className="text-gray-300" />{" "}
                        {donor.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gradient Overlay Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentDonors;
