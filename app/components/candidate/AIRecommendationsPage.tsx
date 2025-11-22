"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  DollarSign,
  Building2,
  Clock,
  Heart,
  Eye,
  Send,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  Brain,
  FileText,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

interface AIRecommendationsPageProps {
  onJobClick?: (jobId: number) => void;
}

export function AIRecommendationsPage({ onJobClick }: AIRecommendationsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    salary: "",
    location: "",
    tech: [] as string[],
    level: "",
    workType: "",
    companyType: "",
  });

  // Mock data: AI recommended jobs
  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer (ReactJS)",
      company: "TechViet Solutions",
      companyLogo: "🏢",
      salary: "$2000 - $3500",
      location: "Hà Nội",
      workType: "Hybrid",
      matchScore: 92,
      matchedSkills: ["ReactJS", "TypeScript", "Redux", "REST API", "Git"],
      missingSkills: ["Docker", "AWS"],
      reasonings: [
        "Hồ sơ của bạn có 85% kỹ năng trùng với JD",
        "Kinh nghiệm ReactJS 3 năm ≥ yêu cầu (2+ năm)",
        "Dự án E-commerce Frontend phù hợp với mô tả công việc",
        "Mức lương mong muốn trong khoảng công ty đưa ra",
      ],
      postedDays: 2,
      applicants: 24,
    },
    {
      id: 2,
      title: "Full-stack Developer (React + NodeJS)",
      company: "VNG Corporation",
      companyLogo: "🎮",
      salary: "$2500 - $4000",
      location: "TP.HCM",
      workType: "Onsite",
      matchScore: 88,
      matchedSkills: ["ReactJS", "NodeJS", "MongoDB", "Express", "REST API"],
      missingSkills: ["GraphQL", "Redis", "Microservices"],
      reasonings: [
        "Kinh nghiệm Full-stack phù hợp với yêu cầu",
        "Portfolio có 2 dự án Full-stack tương tự",
        "Kỹ năng Backend NodeJS được đánh giá cao",
        "Level Senior match với yêu cầu công ty",
      ],
      postedDays: 5,
      applicants: 42,
    },
    {
      id: 3,
      title: "React Native Developer",
      company: "Momo E-Wallet",
      companyLogo: "💰",
      salary: "$1800 - $3000",
      location: "Hà Nội",
      workType: "Remote",
      matchScore: 85,
      matchedSkills: ["React Native", "JavaScript", "Redux", "Firebase"],
      missingSkills: ["Swift", "Kotlin", "CI/CD"],
      reasonings: [
        "Kỹ năng React Native trùng khớp 80%",
        "Kinh nghiệm phát triển mobile app 2+ năm",
        "Dự án Fintech app phù hợp với lĩnh vực công ty",
        "Khả năng làm việc remote cao",
      ],
      postedDays: 1,
      applicants: 18,
    },
    {
      id: 4,
      title: "Frontend Engineer (NextJS)",
      company: "FPT Software",
      companyLogo: "🏭",
      salary: "$2200 - $3800",
      location: "Đà Nẵng",
      workType: "Hybrid",
      matchScore: 81,
      matchedSkills: ["NextJS", "ReactJS", "TypeScript", "TailwindCSS"],
      missingSkills: ["Vercel", "Testing Library", "Storybook"],
      reasonings: [
        "Kinh nghiệm NextJS 1.5 năm gần đạt yêu cầu (2 năm)",
        "Dự án SSR/SSG phù hợp với tech stack",
        "Kỹ năng TypeScript được đánh giá tốt",
        "Mức lương trong khoảng phù hợp",
      ],
      postedDays: 3,
      applicants: 31,
    },
    {
      id: 5,
      title: "UI/UX Engineer (React)",
      company: "Tiki Corporation",
      companyLogo: "🛒",
      salary: "$1500 - $2800",
      location: "TP.HCM",
      workType: "Onsite",
      matchScore: 78,
      matchedSkills: ["ReactJS", "CSS3", "Responsive Design", "Figma"],
      missingSkills: ["Animation Libraries", "Design System", "A/B Testing"],
      reasonings: [
        "Kinh nghiệm UI implementation tốt",
        "Portfolio có các dự án giao diện đẹp",
        "Kỹ năng Figma to Code phù hợp",
        "Có kinh nghiệm với e-commerce platforms",
      ],
      postedDays: 7,
      applicants: 55,
    },
  ];

  // AI Analysis data
  const aiAnalysis = {
    totalMatches: 42,
    overallMatchLevel: 87,
    topSkills: ["ReactJS", "TypeScript", "NodeJS"],
    skillsToImprove: ["Docker", "CI/CD", "System Design"],
  };

  // Profile completion data
  const profileCompletion = [
    { label: "Thông tin cơ bản", completed: true },
    { label: "Kinh nghiệm làm việc", completed: true },
    { label: "Kỹ năng", completed: false },
    { label: "CV đính kèm", completed: true },
    { label: "Chứng chỉ/Dự án", completed: false },
  ];

  const completionRate = Math.round(
    (profileCompletion.filter((p) => p.completed).length /
      profileCompletion.length) *
      100
  );

  // AI suggestions
  const aiSuggestions = [
    {
      icon: TrendingUp,
      title: "Thêm kỹ năng Docker",
      description: "Tăng thêm 8% Match Score",
      color: "#2D9596",
    },
    {
      icon: FileText,
      title: "Cập nhật mô tả dự án",
      description: "Cải thiện độ chính xác AI matching",
      color: "#265073",
    },
    {
      icon: Award,
      title: "Thêm chứng chỉ",
      description: "Tăng độ tin cậy hồ sơ",
      color: "#9AD0C2",
    },
  ];

  // Matching companies
  const matchingCompanies = [
    { name: "TechViet Solutions", logo: "🏢", matchingJobs: 8 },
    { name: "VNG Corporation", logo: "🎮", matchingJobs: 6 },
    { name: "FPT Software", logo: "🏭", matchingJobs: 5 },
    { name: "Momo E-Wallet", logo: "💰", matchingJobs: 4 },
  ];

  const totalPages = 5;

  const getMatchColor = (score: number) => {
    if (score >= 85) return "from-[#2D9596] to-[#9AD0C2]";
    if (score >= 70) return "from-[#265073] to-[#2D9596]";
    return "from-gray-400 to-gray-500";
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* ========== HEADER ========== */}
      <div className="bg-gradient-to-br from-[#ECF4D6] via-[#9AD0C2]/20 to-[#ECF4D6] py-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-32 h-32 bg-[#2D9596] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-[#265073] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border-2 border-[#2D9596]/30">
              <Brain className="w-5 h-5 text-[#2D9596]" />
              <span className="text-[#265073] text-sm">AI-Powered Matching</span>
            </div>
            <h1 className="text-[#265073] mb-4 text-4xl">
              Gợi ý việc làm từ AI
            </h1>
            <p className="text-[#2D9596] text-lg max-w-2xl mx-auto">
              Dựa trên CV, kỹ năng và kinh nghiệm của bạn.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* ========== MAIN CONTENT ========== */}
          <div className="flex-1">
            {/* FILTER BAR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#2D9596]" />
                  <h3 className="text-[#265073]">Bộ lọc</h3>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-[#2D9596] text-sm hover:text-[#265073] transition-colors"
                >
                  {showFilters ? "Ẩn" : "Hiển thị"}
                </button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <label className="block text-[#265073] text-sm mb-2">
                      Mức lương
                    </label>
                    <select className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors">
                      <option>Tất cả</option>
                      <option>$1000 - $2000</option>
                      <option>$2000 - $3000</option>
                      <option>$3000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#265073] text-sm mb-2">
                      Địa điểm
                    </label>
                    <select className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors">
                      <option>Tất cả</option>
                      <option>Hà Nội</option>
                      <option>TP.HCM</option>
                      <option>Đà Nẵng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#265073] text-sm mb-2">
                      Cấp độ
                    </label>
                    <select className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors">
                      <option>Tất cả</option>
                      <option>Fresher</option>
                      <option>Junior</option>
                      <option>Middle</option>
                      <option>Senior</option>
                    </select>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3 mt-4">
                <button className="px-6 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
                  Áp dụng
                </button>
                <button className="px-6 py-2 text-[#2D9596] border-2 border-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors">
                  Reset
                </button>
              </div>
            </motion.div>

            {/* AI HIGHLIGHTS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9AD0C2]/10 rounded-full blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#9AD0C2]" />
                  </div>
                  <h2 className="text-2xl">Phân tích AI</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/70 text-sm mb-2">Việc làm phù hợp</p>
                    <p className="text-3xl">{aiAnalysis.totalMatches}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/70 text-sm mb-2">Match Level</p>
                    <p className="text-3xl">{aiAnalysis.overallMatchLevel}%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/70 text-sm mb-2">Kỹ năng mạnh</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {aiAnalysis.topSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-[#9AD0C2] text-[#265073] text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/70 text-sm mb-2">Nên bổ sung</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {aiAnalysis.skillsToImprove.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="mt-6 px-6 py-3 bg-white text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-colors inline-flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Cải thiện hồ sơ với AI →
                </button>
              </div>
            </motion.div>

            {/* JOB CARDS */}
            <div className="space-y-6">
              {recommendedJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-md hover:shadow-xl hover:border-[#2D9596] transition-all duration-300"
                >
                  <div className="flex gap-6">
                    {/* Match Score Circle */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#E5E7EB"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 40 * (1 - job.matchScore / 100)
                            }`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#2D9596" />
                              <stop offset="100%" stopColor="#9AD0C2" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-2xl text-[#265073]">
                            {job.matchScore}%
                          </span>
                          <span className="text-xs text-[#2D9596]">Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Info */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="mb-4">
                        <h3
                          className="text-[#265073] text-xl mb-2 hover:text-[#2D9596] cursor-pointer transition-colors"
                          onClick={() => onJobClick?.(job.id)}
                        >
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-[#2D9596]">
                            <Building2 className="w-4 h-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#265073]">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-xs">
                            {job.salary}
                          </div>
                          <div className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-xs">
                            {job.workType}
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-sm text-[#265073]">
                            Kỹ năng phù hợp:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.matchedSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-[#2D9596] text-white rounded-lg text-sm"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-[#265073]">
                            Kỹ năng cần bổ sung:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.missingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 border-2 border-red-400 text-red-600 rounded-lg text-sm"
                            >
                              ✗ {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Reasoning Section */}
                      <div className="mb-4 p-4 bg-[#ECF4D6] rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-sm text-[#265073]">
                            Vì sao phù hợp:
                          </span>
                        </div>
                        <div className="space-y-2">
                          {job.reasonings.map((reason, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-[#265073]/80"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#2D9596] flex-shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <button className="px-6 py-2.5 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Ứng tuyển ngay
                        </button>
                        <button className="px-6 py-2.5 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Lưu việc
                        </button>
                        <button
                          onClick={() => onJobClick?.(job.id)}
                          className="px-6 py-2.5 text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Xem chi tiết
                        </button>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mt-4 text-xs text-[#265073]/60">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Đăng {job.postedDays} ngày trước</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{job.applicants} ứng viên</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-8 flex justify-center items-center gap-2">
              <button className="px-4 py-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/30 transition-colors">
                ← Trước
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-[#2D9596] text-white"
                      : "border-2 border-[#265073] text-[#265073] hover:bg-[#9AD0C2]/30"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/30 transition-colors">
                Sau →
              </button>
            </div>
          </div>

          {/* ========== SIDEBAR ========== */}
          <div className="hidden lg:block w-80 space-y-6">
            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2D9596]" />
                Hoàn thiện hồ sơ
              </h3>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#265073]">Tiến độ</span>
                  <span className="text-sm text-[#2D9596]">
                    {completionRate}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#2D9596] to-[#9AD0C2] rounded-full"
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2 mb-4">
                {profileCompletion.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-[#265073]"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2D9596]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                    <span className={item.completed ? "" : "text-gray-400"}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors">
                Hoàn thiện hồ sơ
              </button>
            </motion.div>

            {/* AI Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#9AD0C2]/30 to-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#2D9596]" />
                Gợi ý từ AI
              </h3>

              <div className="space-y-3">
                {aiSuggestions.map((suggestion, idx) => {
                  const Icon = suggestion.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-xl border border-[#9AD0C2]/50 hover:border-[#2D9596] transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${suggestion.color}20` }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: suggestion.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#265073] text-sm mb-1">
                            {suggestion.title}
                          </p>
                          <p className="text-[#265073]/60 text-xs">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center justify-center gap-2">
                Cải thiện ngay
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Matching Companies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#2D9596]" />
                Công ty phù hợp
              </h3>

              <div className="space-y-3">
                {matchingCompanies.map((company, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#ECF4D6] rounded-xl hover:bg-[#9AD0C2]/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
                        {company.logo}
                      </div>
                      <div className="flex-1">
                        <p className="text-[#265073] text-sm mb-1">
                          {company.name}
                        </p>
                        <p className="text-[#2D9596] text-xs">
                          {company.matchingJobs} việc phù hợp
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#265073]" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

