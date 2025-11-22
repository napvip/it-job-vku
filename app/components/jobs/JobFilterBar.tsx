"use client";

import { Search, MapPin, DollarSign, Briefcase, Filter } from "lucide-react";

export function JobFilterBar() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(154,208,194,0.15)] p-6 border border-[#9AD0C2]/30">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-[#2D9596]" />
        <h3 className="text-[#265073]">Bộ lọc tìm kiếm</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Từ khóa */}
        <div className="lg:col-span-2">
          <label className="block text-sm text-[#265073] mb-2">Từ khóa</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <input
              type="text"
              placeholder="Java, React, AI..."
              className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] text-sm"
            />
          </div>
        </div>

        {/* Địa điểm */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Địa điểm</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <select className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm">
              <option>Tất cả</option>
              <option>Hà Nội</option>
              <option>TP. Hồ Chí Minh</option>
              <option>Đà Nẵng</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        {/* Mức lương */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Mức lương</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <select className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm">
              <option>Tất cả</option>
              <option>10-20 triệu</option>
              <option>20-30 triệu</option>
              <option>30-50 triệu</option>
              <option>Trên 50 triệu</option>
            </select>
          </div>
        </div>

        {/* Kinh nghiệm */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Kinh nghiệm</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <select className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm">
              <option>Tất cả</option>
              <option>Fresher</option>
              <option>Junior (1-2 năm)</option>
              <option>Middle (2-5 năm)</option>
              <option>Senior (5+ năm)</option>
            </select>
          </div>
        </div>

        {/* Loại hình */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Loại hình</label>
          <select className="w-full px-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm">
            <option>Tất cả</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
            <option>Freelance</option>
          </select>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex items-end">
          <button className="w-full py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center justify-center gap-2 text-sm">
            <Search className="w-4 h-4" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}

