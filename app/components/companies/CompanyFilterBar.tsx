"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export function CompanyFilterBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
          <input
            type="text"
            placeholder="Tìm kiếm công ty..."
            className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
          />
        </div>

        {/* Industry */}
        <select className="px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors bg-white text-[#265073] min-w-[180px]">
          <option value="">Tất cả ngành nghề</option>
          <option>Backend</option>
          <option>Frontend</option>
          <option>Mobile</option>
          <option>AI/ML</option>
          <option>Game Dev</option>
          <option>Cloud/DevOps</option>
          <option>QA/Testing</option>
        </select>

        {/* Location */}
        <select className="px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors bg-white text-[#265073] min-w-[160px]">
          <option value="">Địa điểm</option>
          <option>Hà Nội</option>
          <option>TP. Hồ Chí Minh</option>
          <option>Đà Nẵng</option>
          <option>Remote</option>
        </select>

        {/* Company Size */}
        <select className="px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors bg-white text-[#265073] min-w-[160px]">
          <option value="">Quy mô</option>
          <option>1-10 nhân viên</option>
          <option>11-50 nhân viên</option>
          <option>51-200 nhân viên</option>
          <option>201-500 nhân viên</option>
          <option>500+ nhân viên</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-colors whitespace-nowrap">
            Áp dụng
          </button>
          <button className="px-4 py-3 text-[#2D9596] hover:bg-[#9AD0C2]/20 rounded-xl transition-colors">
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}


