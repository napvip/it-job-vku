"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  BookmarkX,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Eye,
  Trash2,
  Send,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";

interface SavedJob {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  location: string;
  workFormat: "Onsite" | "Remote" | "Hybrid";
  skills: string[];
  savedDate: string;
  savedDaysAgo: number;
  match?: number;
}

interface SavedJobsPageProps {
  onJobClick?: (jobId: number) => void;
}

export function SavedJobsPage({ onJobClick }: SavedJobsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("all");
  const [workFormatFilter, setWorkFormatFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock saved jobs data
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([
    {
      id: 1,
      title: "Senior Frontend Developer (ReactJS)",
      company: "TechViet Solutions",
      companyLogo: "🏢",
      salary: "25-35 triệu",
      location: "Hà Nội",
      workFormat: "Hybrid",
      skills: ["ReactJS", "TypeScript", "Redux", "TailwindCSS"],
      savedDate: "22/11/2025",
      savedDaysAgo: 3,
      match: 95,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Innovation Hub",
      companyLogo: "💼",
      salary: "30-40 triệu",
      location: "TP.HCM",
      workFormat: "Onsite",
      skills: ["Node.js", "React", "MongoDB", "AWS"],
      savedDate: "20/11/2025",
      savedDaysAgo: 5,
      match: 88,
    },
    {
      id: 3,
      title: "Backend Engineer (Node.js)",
      company: "Cloud Systems Vietnam",
      companyLogo: "☁️",
      salary: "20-30 triệu",
      location: "Đà Nẵng",
      workFormat: "Remote",
      skills: ["Node.js", "PostgreSQL", "Docker", "Microservices"],
      savedDate: "18/11/2025",
      savedDaysAgo: 7,
      match: 92,
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Creative Studio",
      companyLogo: "🎨",
      salary: "18-25 triệu",
      location: "TP.HCM",
      workFormat: "Hybrid",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      savedDate: "15/11/2025",
      savedDaysAgo: 10,
      match: 85,
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Infrastructure Corp",
      companyLogo: "🔧",
      salary: "28-38 triệu",
      location: "Hà Nội",
      workFormat: "Onsite",
      skills: ["Kubernetes", "CI/CD", "Terraform", "AWS"],
      savedDate: "12/11/2025",
      savedDaysAgo: 13,
      match: 90,
    },
  ]);

  // Suggested similar jobs
  const suggestedJobs = [
    {
      id: 101,
      title: "React Developer",
      company: "StartUp AI",
      match: 94,
      logo: "🚀",
    },
    {
      id: 102,
      title: "Frontend Engineer",
      company: "E-Commerce Corp",
      match: 89,
      logo: "🛒",
    },
    {
      id: 103,
      title: "JavaScript Developer",
      company: "Web Agency",
      match: 87,
      logo: "🌐",
    },
  ];

  const handleRemoveJob = (jobId: number) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const getWorkFormatBadge = (format: SavedJob["workFormat"]) => {
    const styles = {
      Onsite: "border-2 border-[#9AD0C2] text-[#265073]",
      Remote: "border-2 border-[#2D9596] text-[#2D9596]",
      Hybrid: "border-2 border-[#265073] text-[#265073]",
    };
    return styles[format];
  };

  const filteredJobs = savedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = companyFilter
      ? job.company.toLowerCase().includes(companyFilter.toLowerCase())
      : true;
    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchesWorkFormat =
      workFormatFilter === "all" ? true : job.workFormat === workFormatFilter;

    return (
      matchesSearch && matchesCompany && matchesLocation && matchesWorkFormat
    );
  });

  const hasJobs = filteredJobs.length > 0;

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* ========== HEADER ========== */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#265073] text-4xl mb-3">Việc làm đã lưu</h1>
            <p className="text-[#2D9596] text-lg">
              Xem lại các công việc bạn quan tâm và ứng tuyển khi sẵn sàng.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ========== FILTER BAR ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-[#265073] text-sm mb-2">
                Từ khóa
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tên công việc..."
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Công ty
              </label>
              <input
                type="text"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                placeholder="Tên công ty..."
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Địa điểm
              </label>
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Thành phố..."
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              />
            </div>

            {/* Work Format */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Hình thức
              </label>
              <select
                value={workFormatFilter}
                onChange={(e) => setWorkFormatFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              >
                <option value="all">Tất cả</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-2">
              <button className="flex-1 px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
                Áp dụng
              </button>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCompanyFilter("");
                  setLocationFilter("");
                  setSalaryFilter("all");
                  setWorkFormatFilter("all");
                }}
                className="px-4 py-2 text-[#2D9596] hover:text-[#265073] transition-colors"
              >
                Xóa lọc
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ========== LEFT COLUMN (2/3) - SAVED JOBS LIST ========== */}
          <div className="lg:col-span-2 space-y-6">
            {hasJobs ? (
              <>
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Company Logo */}
                      <div className="w-14 h-14 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                        {job.companyLogo}
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        {/* Title & Match */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3
                            onClick={() => onJobClick?.(job.id)}
                            className="text-[#265073] text-xl hover:text-[#2D9596] cursor-pointer transition-colors flex-1"
                          >
                            {job.title}
                          </h3>
                          {job.match && (
                            <span className="px-3 py-1 bg-[#2D9596] text-white text-sm rounded-full flex-shrink-0">
                              {job.match}% phù hợp
                            </span>
                          )}
                        </div>

                        {/* Company */}
                        <div className="flex items-center gap-2 text-[#2D9596] mb-4">
                          <Building2 className="w-4 h-4" />
                          <span>{job.company}</span>
                        </div>

                        {/* Quick Info Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {/* Salary */}
                          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#2D9596] text-white rounded-lg text-sm">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#9AD0C2] text-[#265073] rounded-lg text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>

                          {/* Work Format */}
                          <div
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${getWorkFormatBadge(
                              job.workFormat
                            )}`}
                          >
                            <Briefcase className="w-4 h-4" />
                            <span>{job.workFormat}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Saved Date */}
                        <div className="flex items-center gap-1 text-[#265073]/60 text-sm mb-4">
                          <Clock className="w-4 h-4" />
                          <span>Đã lưu {job.savedDaysAgo} ngày trước</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-[#9AD0C2]">
                          <button className="px-5 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Ứng tuyển ngay
                          </button>

                          <button
                            onClick={() => handleRemoveJob(job.id)}
                            className="px-5 py-2 border-2 border-[#C9302C] text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Xóa khỏi danh sách
                          </button>

                          <button
                            onClick={() => onJobClick?.(job.id)}
                            className="px-5 py-2 text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Pagination */}
                {filteredJobs.length > 5 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-[#2D9596] text-white"
                            : "border-2 border-[#265073] text-[#265073] hover:bg-[#ECF4D6]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* ========== EMPTY STATE ========== */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-16 text-center shadow-sm"
              >
                <Bookmark className="w-24 h-24 text-[#2D9596] mx-auto mb-6" />
                <h3 className="text-[#265073] text-2xl mb-3">
                  Bạn chưa lưu công việc nào
                </h3>
                <p className="text-[#265073]/70 mb-6 max-w-md mx-auto">
                  Hãy khám phá và lưu các công việc phù hợp để ứng tuyển sau.
                </p>
                <button className="px-8 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2 mx-auto">
                  <Sparkles className="w-5 h-5" />
                  Tìm việc ngay
                </button>
              </motion.div>
            )}
          </div>

          {/* ========== RIGHT COLUMN (1/3) - SIDEBAR ========== */}
          <div className="space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white shadow-sm"
            >
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Thống kê
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">
                    Công việc đã lưu
                  </span>
                  <span className="text-2xl">{savedJobs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">
                    Đã ứng tuyển
                  </span>
                  <span className="text-2xl">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">
                    Độ phù hợp TB
                  </span>
                  <span className="text-2xl">90%</span>
                </div>
              </div>
            </motion.div>

            {/* Suggested Similar Jobs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2D9596]" />
                Công việc tương tự
              </h3>

              <div className="space-y-3">
                {suggestedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-[#ECF4D6] rounded-xl border border-[#9AD0C2]/50 hover:border-[#2D9596] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#265073] text-sm mb-1 truncate">
                          {job.title}
                        </h4>
                        <p className="text-[#2D9596] text-xs">{job.company}</p>
                      </div>
                      <span className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                        {job.match}%
                      </span>
                    </div>
                    <button
                      onClick={() => onJobClick?.(job.id)}
                      className="text-[#2D9596] hover:text-[#265073] text-xs flex items-center gap-1"
                    >
                      Xem ngay →
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
                Xem thêm gợi ý
              </button>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#FFF9E6] border-2 border-[#FFD700]/30 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-3 flex items-center gap-2">
                💡 Mẹo nhỏ
              </h3>
              <ul className="space-y-2 text-[#265073] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#2D9596] mt-0.5">•</span>
                  <span>
                    Kiểm tra lại hồ sơ trước khi ứng tuyển
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2D9596] mt-0.5">•</span>
                  <span>
                    Ứng tuyển sớm để tăng cơ hội được xem hồ sơ
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2D9596] mt-0.5">•</span>
                  <span>
                    Tùy chỉnh CV cho từng vị trí ứng tuyển
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

