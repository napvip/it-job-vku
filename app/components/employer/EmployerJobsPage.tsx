"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MapPin,
  DollarSign,
  Users,
  Eye,
  Edit,
  Pause,
  XCircle,
  Gauge,
  Calendar,
  Briefcase,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface EmployerJobsPageProps {
  onNavigateToJobDetail?: (jobId: number) => void;
  onNavigateToApplicants?: (jobId: number) => void;
  onNavigateToCreateJob?: () => void;
  onNavigateToEditJob?: (jobId: number) => void;
}

export function EmployerJobsPage({
  onNavigateToJobDetail,
  onNavigateToApplicants,
  onNavigateToCreateJob,
  onNavigateToEditJob,
}: EmployerJobsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      skills: ["ReactJS", "TypeScript", "NextJS"],
      location: "Hà Nội",
      salary: "25-35 triệu",
      status: "active",
      statusText: "Đang tuyển",
      applicants: 24,
      views: 342,
      matchScore: 82,
      postedDate: "15/11/2024",
      type: "Hybrid",
      level: "Senior",
    },
    {
      id: 2,
      title: "Backend Developer (NodeJS)",
      skills: ["NodeJS", "MongoDB", "AWS"],
      location: "TP.HCM",
      salary: "20-30 triệu",
      status: "active",
      statusText: "Đang tuyển",
      applicants: 18,
      views: 278,
      matchScore: 75,
      postedDate: "12/11/2024",
      type: "Remote",
      level: "Middle",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Sketch"],
      location: "Đà Nẵng",
      salary: "15-25 triệu",
      status: "active",
      statusText: "Đang tuyển",
      applicants: 31,
      views: 412,
      matchScore: 88,
      postedDate: "18/11/2024",
      type: "Onsite",
      level: "Junior",
    },
    {
      id: 4,
      title: "Full-stack Developer",
      skills: ["React", "NodeJS", "PostgreSQL"],
      location: "Hà Nội",
      salary: "30-40 triệu",
      status: "paused",
      statusText: "Tạm dừng",
      applicants: 45,
      views: 567,
      matchScore: 79,
      postedDate: "08/11/2024",
      type: "Hybrid",
      level: "Senior",
    },
    {
      id: 5,
      title: "Mobile Developer (React Native)",
      skills: ["React Native", "JavaScript", "Firebase"],
      location: "Remote",
      salary: "22-32 triệu",
      status: "closed",
      statusText: "Đã đóng",
      applicants: 38,
      views: 489,
      matchScore: 84,
      postedDate: "02/11/2024",
      type: "Remote",
      level: "Middle",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "CI/CD"],
      location: "Hà Nội",
      salary: "28-38 triệu",
      status: "active",
      statusText: "Đang tuyển",
      applicants: 15,
      views: 234,
      matchScore: 76,
      postedDate: "20/11/2024",
      type: "Onsite",
      level: "Senior",
    },
  ];

  // Stats
  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    closed: jobs.filter((j) => j.status === "closed").length,
    mostApplicants: Math.max(...jobs.map((j) => j.applicants)),
  };

  // AI Suggestions
  const aiSuggestions = [
    {
      id: 1,
      icon: TrendingUp,
      title: "Tối ưu mô tả công việc",
      description: "3 tin tuyển dụng có thể cải thiện match score",
      action: "Xem gợi ý",
    },
    {
      id: 2,
      icon: Sparkles,
      title: "Làm mới tin tuyển dụng",
      description: "2 tin đã đăng hơn 30 ngày, nên làm mới để tăng lượt xem",
      action: "Cập nhật ngay",
    },
    {
      id: 3,
      icon: Users,
      title: "Mở rộng tìm kiếm",
      description: "Thử thay đổi yêu cầu kinh nghiệm để tăng số ứng viên",
      action: "Điều chỉnh",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#2D9596] text-white";
      case "paused":
        return "bg-[#FFB84D] text-white";
      case "closed":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setLocationFilter("all");
    setLevelFilter("all");
    setTypeFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px]">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-[#265073] text-3xl mb-2">
                Danh sách tin tuyển dụng
              </h1>
              <p className="text-[#2D9596]">
                Quản lý tất cả các tin tuyển dụng của công ty bạn
              </p>
            </div>
            <button
              onClick={onNavigateToCreateJob}
              className="px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Đăng tin tuyển dụng mới
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#2D9596]" />
                Bộ lọc tìm kiếm
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Search */}
                <div className="lg:col-span-3">
                  <input
                    type="text"
                    placeholder="Tìm theo tên công việc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Trạng thái
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="active">Đang tuyển</option>
                    <option value="paused">Tạm dừng</option>
                    <option value="closed">Đã đóng</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Địa điểm
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP.HCM</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Cấp bậc
                  </label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="intern">Intern</option>
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                    <option value="middle">Middle</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Hình thức
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="onsite">Onsite</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
                  Áp dụng
                </button>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 text-[#2D9596] hover:text-[#265073] transition-colors"
                >
                  Xóa lọc
                </button>
              </div>
            </motion.div>

            {/* Jobs List */}
            {jobs.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-12 border-2 border-[#9AD0C2] text-center"
              >
                <div className="w-24 h-24 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-12 h-12 text-[#2D9596]" />
                </div>
                <h3 className="text-[#265073] text-xl mb-3">
                  Bạn chưa đăng tin tuyển dụng nào
                </h3>
                <p className="text-[#265073]/70 mb-6">
                  Bắt đầu tìm kiếm ứng viên phù hợp bằng cách đăng tin tuyển
                  dụng đầu tiên
                </p>
                <button
                  onClick={onNavigateToCreateJob}
                  className="px-8 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors"
                >
                  Đăng tin tuyển dụng đầu tiên ngay
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:shadow-lg transition-shadow"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Left Column - Job Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3
                              onClick={() => onNavigateToJobDetail?.(job.id)}
                              className="text-[#265073] text-xl mb-2 hover:text-[#2D9596] transition-colors cursor-pointer"
                            >
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${getStatusColor(job.status)}`}
                          >
                            {job.statusText}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-[#265073]">
                            <MapPin className="w-4 h-4 text-[#2D9596]" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">
                              <DollarSign className="w-3 h-3 inline mr-1" />
                              {job.salary}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#265073] text-sm">
                            <Calendar className="w-4 h-4 text-[#2D9596]" />
                            Đăng: {job.postedDate}
                          </div>
                          <div className="text-sm text-[#265073]">
                            <span className="px-2 py-1 bg-[#ECF4D6] rounded">
                              {job.type}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="px-2 py-1 bg-[#ECF4D6] rounded">
                              {job.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Stats */}
                      <div className="flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 bg-[#ECF4D6] rounded-xl text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Users className="w-4 h-4 text-[#2D9596]" />
                            </div>
                            <div className="text-xl text-[#265073]">
                              {job.applicants}
                            </div>
                            <div className="text-xs text-[#265073]/70">
                              Ứng viên
                            </div>
                          </div>

                          <div className="p-3 bg-[#ECF4D6] rounded-xl text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Eye className="w-4 h-4 text-[#2D9596]" />
                            </div>
                            <div className="text-xl text-[#265073]">
                              {job.views}
                            </div>
                            <div className="text-xs text-[#265073]/70">
                              Lượt xem
                            </div>
                          </div>

                          <div className="col-span-2 p-3 bg-gradient-to-br from-[#2D9596]/10 to-[#265073]/10 rounded-xl text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Gauge className="w-4 h-4 text-[#2D9596]" />
                              <span className="text-sm text-[#265073]/70">
                                Match Score TB
                              </span>
                            </div>
                            <div className="text-2xl text-[#2D9596]">
                              {job.matchScore}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-[#9AD0C2]">
                      <button
                        onClick={() => onNavigateToJobDetail?.(job.id)}
                        className="flex-1 min-w-[140px] px-4 py-2 bg-gradient-to-r from-[#2D9596] to-[#265073] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => onNavigateToApplicants?.(job.id)}
                        className="flex-1 min-w-[140px] px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center justify-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        Xem ứng viên
                      </button>
                      <button
                        onClick={() => onNavigateToEditJob?.(job.id)}
                        className="px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Chỉnh sửa
                      </button>
                      {job.status === "active" ? (
                        <button className="px-4 py-2 border-2 border-[#FFB84D] text-[#FFB84D] rounded-lg hover:bg-[#FFB84D] hover:text-white transition-colors flex items-center gap-2">
                          <Pause className="w-4 h-4" />
                          Tạm dừng
                        </button>
                      ) : (
                        <button className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Đóng tin
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {jobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center items-center gap-2"
              >
                <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
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
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#2D9596]" />
                Thống kê nhanh
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-[#ECF4D6] rounded-xl">
                  <div className="text-2xl text-[#2D9596] mb-1">
                    {stats.total}
                  </div>
                  <div className="text-sm text-[#265073]/70">
                    Tổng tin đăng
                  </div>
                </div>

                <div className="p-4 bg-[#ECF4D6] rounded-xl">
                  <div className="text-2xl text-[#2D9596] mb-1">
                    {stats.active}
                  </div>
                  <div className="text-sm text-[#265073]/70">
                    Tin đang tuyển
                  </div>
                </div>

                <div className="p-4 bg-[#ECF4D6] rounded-xl">
                  <div className="text-2xl text-[#2D9596] mb-1">
                    {stats.closed}
                  </div>
                  <div className="text-sm text-[#265073]/70">Tin đã đóng</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-[#2D9596]/10 to-[#265073]/10 rounded-xl">
                  <div className="text-2xl text-[#265073] mb-1">
                    {stats.mostApplicants}
                  </div>
                  <div className="text-sm text-[#265073]/70">
                    Ứng viên nhiều nhất
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Suggestions Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Gợi ý từ AI
              </h3>

              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => {
                  const Icon = suggestion.icon;
                  return (
                    <div
                      key={suggestion.id}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">
                            {suggestion.title}
                          </h4>
                          <p className="text-sm opacity-90">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                      <button className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors">
                        {suggestion.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

