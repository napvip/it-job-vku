"use client";

import { Search, Briefcase, MapPin, Users, Star, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function CompanyFilterSidebar() {
  return (
    <div className="space-y-6">
      {/* Search Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)] sticky top-24"
      >
        <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#2D9596]" />
          Bộ lọc nâng cao
        </h3>

        {/* Search by keyword */}
        <div className="mb-6">
          <label className="block text-[#265073] text-sm mb-2">
            Tìm kiếm theo từ khóa
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <input
              type="text"
              placeholder="Nhập tên công ty..."
              className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {/* Industry */}
        <div className="mb-6">
          <label className="block text-[#265073] text-sm mb-2">
            Lĩnh vực
          </label>
          <select className="w-full px-3 py-2 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none transition-colors text-sm bg-white">
            <option>Tất cả lĩnh vực</option>
            <option>Software Development</option>
            <option>AI & Machine Learning</option>
            <option>Fintech</option>
            <option>E-commerce</option>
            <option>Game Development</option>
            <option>Cloud Services</option>
            <option>Cybersecurity</option>
          </select>
        </div>

        {/* Company Size */}
        <div className="mb-6">
          <label className="block text-[#265073] text-sm mb-3">
            Quy mô công ty
          </label>
          <div className="space-y-2">
            {[
              "1-10 nhân viên",
              "11-50 nhân viên",
              "51-200 nhân viên",
              "201-500 nhân viên",
              "500+ nhân viên"
            ].map((size) => (
              <label key={size} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#9AD0C2] text-[#2D9596] focus:ring-[#2D9596]"
                />
                <span className="text-sm text-[#265073] group-hover:text-[#2D9596] transition-colors">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-[#265073] text-sm mb-2">
            Trụ sở chính
          </label>
          <select className="w-full px-3 py-2 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none transition-colors text-sm bg-white">
            <option>Tất cả địa điểm</option>
            <option>Hà Nội</option>
            <option>TP. Hồ Chí Minh</option>
            <option>Đà Nẵng</option>
            <option>Hải Phòng</option>
            <option>Cần Thơ</option>
          </select>
        </div>

        {/* Jobs Available */}
        <div className="mb-6">
          <label className="block text-[#265073] text-sm mb-3">
            Số lượng việc làm
          </label>
          <div className="space-y-2">
            {[
              "1-5 vị trí",
              "6-20 vị trí",
              "20+ vị trí"
            ].map((count) => (
              <label key={count} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#9AD0C2] text-[#2D9596] focus:ring-[#2D9596]"
                />
                <span className="text-sm text-[#265073] group-hover:text-[#2D9596] transition-colors">
                  {count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Company Type */}
        <div className="mb-6">
          <label className="block text-[#265073] text-sm mb-3">
            Loại hình công ty
          </label>
          <div className="space-y-2">
            {[
              "Product Company",
              "Outsourcing",
              "Startup",
              "Enterprise"
            ].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#9AD0C2] text-[#2D9596] focus:ring-[#2D9596]"
                />
                <span className="text-sm text-[#265073] group-hover:text-[#2D9596] transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-[#265073] text-sm mb-3">
            Đánh giá
          </label>
          <div className="space-y-2">
            {[5, 4, 3].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#9AD0C2] text-[#2D9596] focus:ring-[#2D9596]"
                />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#2D9596] text-[#2D9596]" />
                  ))}
                  <span className="text-sm text-[#265073] ml-1">trở lên</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button className="w-full py-3 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-colors">
          Áp dụng bộ lọc
        </button>
      </motion.div>
    </div>
  );
}


