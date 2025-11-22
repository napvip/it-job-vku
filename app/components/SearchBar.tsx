"use client";

import { Search, MapPin, DollarSign, Briefcase } from "lucide-react";

export function SearchBar() {
  return (
    <div className="container mx-auto px-4 -mt-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(154,208,194,0.3)] p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Từ khóa */}
          <div className="md:col-span-1">
            <label className="block text-sm text-[#265073] mb-2">Từ khóa</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
              <input
                type="text"
                placeholder="Java, React, AI..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2D9596]"
              />
            </div>
          </div>

          {/* Địa điểm */}
          <div className="md:col-span-1">
            <label className="block text-sm text-[#265073] mb-2">Địa điểm</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
              <input
                type="text"
                placeholder="Hà Nội, TP.HCM..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2D9596]"
              />
            </div>
          </div>

          {/* Mức lương */}
          <div className="md:col-span-1">
            <label className="block text-sm text-[#265073] mb-2">Mức lương</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white">
                <option>Tất cả</option>
                <option>10-20 triệu</option>
                <option>20-30 triệu</option>
                <option>30-50 triệu</option>
                <option>Trên 50 triệu</option>
              </select>
            </div>
          </div>

          {/* Kinh nghiệm */}
          <div className="md:col-span-1">
            <label className="block text-sm text-[#265073] mb-2">Kinh nghiệm</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white">
                <option>Tất cả</option>
                <option>Chưa có kinh nghiệm</option>
                <option>1-2 năm</option>
                <option>2-5 năm</option>
                <option>Trên 5 năm</option>
              </select>
            </div>
          </div>

          {/* Nút tìm kiếm */}
          <div className="md:col-span-1">
            <button className="w-full py-3 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

