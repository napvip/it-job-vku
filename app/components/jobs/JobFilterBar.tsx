"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, DollarSign, Briefcase, Filter, X } from "lucide-react";

interface JobFilterBarProps {
  onFilterChange: (filters: {
    search: string;
    location: string;
    salary: string;
    experience: string;
    jobType: string;
  }) => void;
  totalJobs: number;
}

export function JobFilterBar({ onFilterChange, totalJobs }: JobFilterBarProps) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    onFilterChange({ search, location, salary, experience, jobType });
  }, [search, location, salary, experience, jobType]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setSalary("");
    setExperience("");
    setJobType("");
  };

  const hasFilters = search || location || salary || experience || jobType;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(154,208,194,0.15)] p-6 border border-[#9AD0C2]/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-[#2D9596]" />
          <h3 className="text-[#265073] font-medium">Bộ lọc tìm kiếm</h3>
          {totalJobs > 0 && (
            <span className="px-3 py-1 bg-[#ECF4D6] text-[#2D9596] text-sm rounded-full">
              {totalJobs} việc làm
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Từ khóa */}
        <div className="lg:col-span-2">
          <label className="block text-sm text-[#265073] mb-2">Từ khóa</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm"
            >
              <option value="">Tất cả</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Hải Phòng">Hải Phòng</option>
            </select>
          </div>
        </div>

        {/* Mức lương */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Mức lương</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <select
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm"
            >
              <option value="">Tất cả</option>
              <option value="under10">Dưới 10 triệu</option>
              <option value="10-20">10-20 triệu</option>
              <option value="20-30">20-30 triệu</option>
              <option value="above30">Trên 30 triệu</option>
            </select>
          </div>
        </div>

        {/* Kinh nghiệm */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Kinh nghiệm</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D9596]" />
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm"
            >
              <option value="">Tất cả</option>
              <option value="intern">Thực tập sinh</option>
              <option value="fresher">Fresher</option>
              <option value="junior">Junior</option>
              <option value="middle">Middle</option>
              <option value="senior">Senior</option>
              <option value="lead">Team Lead</option>
            </select>
          </div>
        </div>

        {/* Loại hình */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Loại hình</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] appearance-none bg-white text-sm"
          >
            <option value="">Tất cả</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex items-end">
          <button 
            onClick={() => onFilterChange({ search, location, salary, experience, jobType })}
            className="w-full py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Search className="w-4 h-4" />
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}


