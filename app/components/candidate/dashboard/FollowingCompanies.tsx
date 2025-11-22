"use client";

import { motion } from "framer-motion";
import { Heart, Briefcase, ArrowRight } from "lucide-react";

const companies = [
  {
    id: 1,
    name: "TechCorp Vietnam",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
    openPositions: 12,
  },
  {
    id: 2,
    name: "Digital Solutions",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    openPositions: 8,
  },
  {
    id: 3,
    name: "Innovation Labs",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
    openPositions: 5,
  },
  {
    id: 4,
    name: "Cloud Systems",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
    openPositions: 15,
  },
];

export function FollowingCompanies() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white border-2 border-[#9AD0C2] rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#2D9596]/10 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#2D9596]" />
          </div>
          <div>
            <h3 className="text-lg text-[#265073]">Công ty theo dõi</h3>
            <p className="text-sm text-[#2D9596]">{companies.length} công ty</p>
          </div>
        </div>

        <button className="text-[#2D9596] hover:text-[#265073] transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Companies Grid */}
      <div className="space-y-3">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-[#ECF4D6] border border-[#9AD0C2] rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 border-[#9AD0C2]">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[#265073] mb-1 truncate group-hover:text-[#2D9596] transition-colors">
                  {company.name}
                </h4>
                <div className="flex items-center gap-1 text-sm text-[#2D9596]">
                  <Briefcase className="w-3 h-3" />
                  <span>Đang tuyển {company.openPositions} vị trí</span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-[#2D9596] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2.5 text-[#2D9596] border-2 border-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all duration-300"
      >
        Xem thêm
      </motion.button>
    </motion.div>
  );
}


