"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Edit,
  Eye,
  Download,
  Check,
  X,
  Calendar,
  Users,
  Briefcase,
  Star,
  Clock,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award,
  FileText,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";

interface EmployerApplicantsPageProps {
  jobId: number | null;
}

export function EmployerApplicantsPage({
  jobId,
}: EmployerApplicantsPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [educationFilter, setEducationFilter] = useState("all");
  const [matchScoreFilter, setMatchScoreFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock job info
  const job = {
    id: jobId || 1,
    title: "Senior Frontend Developer",
    totalApplicants: 12,
  };

  // Stats
  const stats = [
    { label: "Tổng ứng viên", value: 12, icon: Users, color: "#2D9596" },
    { label: "Mới nộp", value: 3, icon: FileText, color: "#9AD0C2" },
    { label: "Đã xem CV", value: 6, icon: Eye, color: "#265073" },
    { label: "Đang xem xét", value: 2, icon: Star, color: "#FFB84D" },
    { label: "Mời phỏng vấn", value: 1, icon: Calendar, color: "#1EAD7B" },
    { label: "Không phù hợp", value: 0, icon: XCircle, color: "#EF4444" },
  ];

  // Mock applicants data
  const applicants = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      currentPosition: "Frontend Developer tại TechCorp",
      experience: "3 năm",
      skills: ["ReactJS", "TypeScript", "NextJS", "Tailwind CSS"],
      appliedDate: "15/11/2024",
      appliedTime: "10:42 AM",
      matchScore: 92,
      status: "new",
      statusText: "Mới nộp",
      education: "Đại học Bách Khoa Hà Nội",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      currentPosition: "Junior Frontend tại StartupXYZ",
      experience: "2 năm",
      skills: ["ReactJS", "JavaScript", "Redux", "Material UI"],
      appliedDate: "14/11/2024",
      appliedTime: "14:20 PM",
      matchScore: 88,
      status: "reviewed",
      statusText: "Đã xem",
      education: "Đại học Công Nghệ",
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      currentPosition: "Fullstack Developer tại Innovation Inc",
      experience: "4 năm",
      skills: ["ReactJS", "NodeJS", "MongoDB", "AWS"],
      appliedDate: "13/11/2024",
      appliedTime: "09:15 AM",
      matchScore: 85,
      status: "considering",
      statusText: "Đang xem xét",
      education: "Đại học FPT",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      currentPosition: "Senior Frontend tại Global Tech",
      experience: "5 năm",
      skills: ["ReactJS", "Vue", "Angular", "TypeScript"],
      appliedDate: "12/11/2024",
      appliedTime: "16:30 PM",
      matchScore: 94,
      status: "interview",
      statusText: "Mời phỏng vấn",
      education: "Đại học Quốc Gia",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
      currentPosition: "Frontend Intern tại ABC Company",
      experience: "1 năm",
      skills: ["ReactJS", "JavaScript", "HTML/CSS"],
      appliedDate: "11/11/2024",
      appliedTime: "11:05 AM",
      matchScore: 72,
      status: "reviewed",
      statusText: "Đã xem",
      education: "Đại học Kinh Tế",
    },
  ];

  // Quick filters
  const quickFilters = [
    { label: "Mới nộp", count: 3, status: "new" },
    { label: "Đã xem", count: 6, status: "reviewed" },
    { label: "Đang xem xét", count: 2, status: "considering" },
    { label: "Mời phỏng vấn", count: 1, status: "interview" },
  ];

  // AI Overview
  const aiOverview = {
    averageScore: 86,
    topSkills: ["ReactJS", "TypeScript", "JavaScript"],
    missingSkills: ["Testing (Jest)", "CI/CD"],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-[#9AD0C2] text-[#265073]";
      case "reviewed":
        return "border-2 border-[#2D9596] text-[#2D9596] bg-white";
      case "considering":
        return "bg-[#2D9596] text-white";
      case "interview":
        return "bg-[#1EAD7B] text-white";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "#1EAD7B";
    if (score >= 80) return "#2D9596";
    if (score >= 70) return "#FFB84D";
    return "#EF4444";
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setExperienceFilter("all");
    setSkillFilter("all");
    setEducationFilter("all");
    setMatchScoreFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[#265073] text-3xl mb-2">
                  Ứng viên cho vị trí: {job.title}
                </h1>
                <p className="text-[#2D9596]">
                  Có tổng cộng {job.totalApplicants} ứng viên cho vị trí này
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/employer/jobs/edit/${job.id}`)}
                  className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa tin tuyển dụng
                </button>
                <button
                  onClick={() => router.push(`/employer/jobs/${job.id}`)}
                  className="px-6 py-2 text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Xem tin tuyển dụng
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <div
                        className="text-2xl mb-1"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#265073]/70">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#2D9596]" />
                Bộ lọc tìm kiếm
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Search */}
                <div className="lg:col-span-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                    <input
                      type="text"
                      placeholder="Tìm theo tên ứng viên..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Trạng thái hồ sơ
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="new">Mới nộp</option>
                    <option value="reviewed">Đã xem</option>
                    <option value="considering">Đang xem xét</option>
                    <option value="interview">Mời phỏng vấn</option>
                    <option value="rejected">Trượt</option>
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Kinh nghiệm
                  </label>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="0-1">0-1 năm</option>
                    <option value="1-3">1-3 năm</option>
                    <option value="3-5">3-5 năm</option>
                    <option value="5+">5+ năm</option>
                  </select>
                </div>

                {/* Skill Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Kỹ năng
                  </label>
                  <select
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="react">ReactJS</option>
                    <option value="typescript">TypeScript</option>
                    <option value="nodejs">NodeJS</option>
                    <option value="nextjs">NextJS</option>
                  </select>
                </div>

                {/* Education Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Học vấn
                  </label>
                  <select
                    value={educationFilter}
                    onChange={(e) => setEducationFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="highschool">Trung học</option>
                    <option value="college">Cao đẳng</option>
                    <option value="bachelor">Đại học</option>
                    <option value="master">Thạc sĩ</option>
                  </select>
                </div>

                {/* Match Score Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Mức độ phù hợp
                  </label>
                  <select
                    value={matchScoreFilter}
                    onChange={(e) => setMatchScoreFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="90+">90%+</option>
                    <option value="80-90">80-90%</option>
                    <option value="70-80">70-80%</option>
                    <option value="70-">Dưới 70%</option>
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

            {/* Applicants List */}
            {applicants.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-12 border-2 border-[#9AD0C2] text-center"
              >
                <div className="w-24 h-24 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-[#2D9596]" />
                </div>
                <h3 className="text-[#265073] text-xl mb-3">
                  Chưa có ứng viên nào ứng tuyển vào vị trí này
                </h3>
                <p className="text-[#265073]/70 mb-6">
                  Hãy chia sẻ tin tuyển dụng để tiếp cận nhiều ứng viên hơn
                </p>
                <button className="px-8 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center gap-2 mx-auto">
                  <Sparkles className="w-5 h-5" />
                  Tìm ứng viên bằng AI
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {applicants.map((applicant, index) => (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:shadow-lg transition-shadow"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Left Column - Applicant Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-4">
                          <img
                            src={applicant.avatar}
                            alt={applicant.name}
                            className="w-14 h-14 rounded-full flex-shrink-0"
                          />

                          <div className="flex-1">
                            <h3
                              onClick={() =>
                                router.push(`/employer/applicant/${applicant.id}`)
                              }
                              className="text-[#265073] text-xl mb-1 hover:text-[#2D9596] transition-colors cursor-pointer"
                            >
                              {applicant.name}
                            </h3>
                            <p className="text-[#265073]/70 text-sm mb-2">
                              {applicant.currentPosition}
                            </p>
                            <div className="flex items-center gap-4 mb-3 text-sm text-[#265073]">
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4 text-[#2D9596]" />
                                <span>{applicant.experience} kinh nghiệm</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-[#2D9596]" />
                                <span>{applicant.education}</span>
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {applicant.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* Applied Date */}
                            <div className="flex items-center gap-2 text-sm text-[#265073]/60">
                              <Clock className="w-4 h-4" />
                              <span>
                                Nộp vào {applicant.appliedDate} —{" "}
                                {applicant.appliedTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Recruitment Info */}
                      <div className="flex flex-col justify-between">
                        {/* Match Score */}
                        <div className="mb-4">
                          <div className="text-center mb-3">
                            <div
                              className="text-4xl mb-1"
                              style={{
                                color: getMatchScoreColor(applicant.matchScore),
                              }}
                            >
                              {applicant.matchScore}%
                            </div>
                            <div className="text-sm text-[#265073]/70">
                              Phù hợp
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex justify-center mb-3">
                            <span
                              className={`px-4 py-2 rounded-lg text-sm ${getStatusBadge(applicant.status)}`}
                            >
                              {applicant.statusText}
                            </span>
                          </div>

                          {/* CV Actions */}
                          <div className="flex gap-2 mb-3">
                            <button className="flex-1 px-3 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2 text-sm">
                              <Eye className="w-4 h-4" />
                              Xem CV
                            </button>
                            <button className="px-3 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <button className="px-3 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-colors flex items-center justify-center gap-1 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Đã xem
                          </button>
                          <button className="px-3 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-colors flex items-center justify-center gap-1 text-sm">
                            <Star className="w-4 h-4" />
                            Xem xét
                          </button>
                          <button className="px-3 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg hover:bg-[#1EAD7B] hover:text-white transition-colors flex items-center justify-center gap-1 text-sm">
                            <Calendar className="w-4 h-4" />
                            PV
                          </button>
                          <button className="px-3 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-1 text-sm">
                            <X className="w-4 h-4" />
                            Từ chối
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {applicants.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
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
            {/* Quick Filters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#2D9596]" />
                Bộ lọc nhanh
              </h3>

              <div className="space-y-2">
                {quickFilters.map((filter) => (
                  <button
                    key={filter.status}
                    onClick={() => setStatusFilter(filter.status)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      statusFilter === filter.status
                        ? "bg-[#2D9596] text-white"
                        : "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{filter.label}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          statusFilter === filter.status
                            ? "bg-white/20"
                            : "bg-[#265073]/10"
                        }`}
                      >
                        {filter.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* AI Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI đánh giá tổng quan
              </h3>

              <div className="space-y-4">
                {/* Average Score */}
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-sm opacity-90 mb-1">
                    Điểm trung bình
                  </div>
                  <div className="text-3xl">{aiOverview.averageScore}%</div>
                </div>

                {/* Top Skills */}
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-sm opacity-90 mb-2">
                    Kỹ năng phổ biến
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiOverview.topSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-white/20 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-sm opacity-90 mb-2">
                    Kỹ năng thiếu so với JD
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiOverview.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-red-400/30 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Action Button */}
                <button className="w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  AI gợi ý ứng viên tốt nhất
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

