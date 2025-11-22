"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  Filter,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Bookmark,
  AlertCircle,
  Users,
  Target,
  Award,
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight,
  BarChart3,
  Zap,
  FileText,
  RefreshCw,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Candidate {
  id: number;
  name: string;
  avatar: string;
  currentPosition: string;
  experience: string;
  matchScore: number;
  skillsMatch: string[];
  skillsMissing: string[];
  city: string;
  salary: string;
  matchReasons: {
    type: "positive" | "negative";
    text: string;
  }[];
}

interface AICandidateMatchingPageProps {
  onNavigateToCandidateProfile?: (candidateId: number) => void;
  onNavigateToMessages?: () => void;
}

const JOBS = [
  { id: 1, title: "Senior Frontend Developer (ReactJS)", applicants: 45 },
  { id: 2, title: "Backend Developer (Node.js)", applicants: 32 },
  { id: 3, title: "Mobile Developer (Flutter)", applicants: 28 },
  { id: 4, title: "UI/UX Designer", applicants: 18 },
];

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    currentPosition: "Frontend Developer tại TechCorp",
    experience: "3 năm kinh nghiệm ReactJS",
    matchScore: 95,
    skillsMatch: ["React", "JavaScript", "Redux", "REST API", "Git"],
    skillsMissing: ["Docker", "TypeScript"],
    city: "Hà Nội",
    salary: "15-20 triệu",
    matchReasons: [
      { type: "positive", text: "9/10 kỹ năng khớp JD" },
      { type: "positive", text: "Khoảng lương phù hợp" },
      { type: "positive", text: "Kinh nghiệm tương ứng" },
      { type: "negative", text: "Thiếu Docker, TypeScript" },
    ],
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    currentPosition: "Senior Frontend tại StartupX",
    experience: "5 năm kinh nghiệm ReactJS",
    matchScore: 92,
    skillsMatch: ["React", "TypeScript", "Redux", "GraphQL", "Next.js"],
    skillsMissing: ["Docker"],
    city: "TP.HCM",
    salary: "20-25 triệu",
    matchReasons: [
      { type: "positive", text: "10/10 kỹ năng khớp JD" },
      { type: "positive", text: "Senior level phù hợp" },
      { type: "negative", text: "Khoảng lương cao hơn 15%" },
      { type: "negative", text: "Thiếu Docker" },
    ],
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    currentPosition: "Frontend Developer tại BigTech",
    experience: "2 năm kinh nghiệm ReactJS",
    matchScore: 88,
    skillsMatch: ["React", "JavaScript", "Redux", "Jest", "Webpack"],
    skillsMissing: ["TypeScript", "Docker", "CI/CD"],
    city: "Hà Nội",
    salary: "12-18 triệu",
    matchReasons: [
      { type: "positive", text: "8/10 kỹ năng khớp JD" },
      { type: "positive", text: "Khoảng lương phù hợp" },
      { type: "negative", text: "Kinh nghiệm ít hơn yêu cầu" },
      { type: "negative", text: "Thiếu TypeScript, Docker" },
    ],
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    currentPosition: "Frontend Lead tại AgencyXYZ",
    experience: "4 năm kinh nghiệm ReactJS",
    matchScore: 90,
    skillsMatch: ["React", "TypeScript", "Redux", "Docker", "AWS"],
    skillsMissing: [],
    city: "Đà Nẵng",
    salary: "18-22 triệu",
    matchReasons: [
      { type: "positive", text: "10/10 kỹ năng khớp JD" },
      { type: "positive", text: "Có kinh nghiệm lead team" },
      { type: "positive", text: "Khoảng lương phù hợp" },
      { type: "positive", text: "Sẵn sàng làm remote" },
    ],
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    currentPosition: "Full-stack Developer tại TechVN",
    experience: "3 năm kinh nghiệm React + Node",
    matchScore: 85,
    skillsMatch: ["React", "JavaScript", "Node.js", "MongoDB"],
    skillsMissing: ["Redux", "TypeScript", "Docker"],
    city: "TP.HCM",
    salary: "15-20 triệu",
    matchReasons: [
      { type: "positive", text: "7/10 kỹ năng khớp JD" },
      { type: "positive", text: "Có kinh nghiệm full-stack" },
      { type: "negative", text: "Thiếu Redux, TypeScript" },
      { type: "negative", text: "Chưa có kinh nghiệm Docker" },
    ],
  },
];

const SKILL_ANALYTICS = [
  { skill: "React", required: 10, actual: 9.5 },
  { skill: "JavaScript", required: 9, actual: 9 },
  { skill: "TypeScript", required: 8, actual: 5 },
  { skill: "Redux", required: 7, actual: 7.5 },
  { skill: "REST API", required: 8, actual: 8 },
  { skill: "Docker", required: 6, actual: 3 },
];

const SKILL_FREQUENCY = [
  { skill: "React", count: 45 },
  { skill: "JavaScript", count: 42 },
  { skill: "Redux", count: 35 },
  { skill: "REST API", count: 38 },
  { skill: "TypeScript", count: 22 },
  { skill: "Docker", count: 12 },
];

function CandidateCard({
  candidate,
  onViewProfile,
  onMessage,
  onSave,
}: {
  candidate: Candidate;
  onViewProfile: () => void;
  onMessage: () => void;
  onSave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-sm hover:shadow-lg transition-all"
    >
      <div className="flex gap-6">
        {/* Left Column - Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-[#265073] text-xl mb-1">{candidate.name}</h3>
              <p className="text-[#265073]/70 text-sm mb-2">
                {candidate.currentPosition}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#265073]/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {candidate.experience}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {candidate.city}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {candidate.salary}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Match */}
          <div className="mb-3">
            <p className="text-[#265073] text-sm mb-2">Kỹ năng phù hợp:</p>
            <div className="flex flex-wrap gap-2">
              {candidate.skillsMatch.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Missing */}
          {candidate.skillsMissing.length > 0 && (
            <div className="mb-4">
              <p className="text-[#265073] text-sm mb-2">Kỹ năng thiếu:</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skillsMissing.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onViewProfile}
              className="flex-1 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Xem hồ sơ
            </button>
            <button
              onClick={onMessage}
              className="px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Nhắn tin
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column - Match Score */}
        <div className="w-64 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#ECF4D6"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#2D9596"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${
                  2 * Math.PI * 56 * (1 - candidate.matchScore / 100)
                }`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl text-[#2D9596]">
                {candidate.matchScore}%
              </span>
              <span className="text-xs text-[#265073]/60">phù hợp</span>
            </div>
          </div>

          {/* Match Reasons */}
          <div className="space-y-2 w-full">
            {candidate.matchReasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-xs text-[#265073]/80"
              >
                {reason.type === "positive" ? (
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <span>{reason.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AICandidateMatchingPage({
  onNavigateToCandidateProfile,
  onNavigateToMessages,
}: AICandidateMatchingPageProps) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    matchScore: [0, 100],
    experience: "",
    city: "",
    skills: "",
  });

  const handleAnalyze = () => {
    setIsAnalyzed(true);
  };

  const topCandidates = MOCK_CANDIDATES.filter((c) => c.matchScore >= 90);

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-[#265073] text-3xl mb-2">
                  AI Gợi ý ứng viên phù hợp
                </h1>
                <p className="text-[#2D9596]">
                  Dựa trên mô tả công việc, kỹ năng và dữ liệu tuyển dụng, AI tìm
                  những ứng viên phù hợp nhất cho bạn.
                </p>
              </div>
              <button
                onClick={() => setIsAnalyzed(false)}
                className="px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Phân tích lại
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Job Selector */}
            {!isAnalyzed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] mb-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-[#2D9596]" />
                  <h2 className="text-[#265073] text-2xl">
                    Chọn job để phân tích
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <label className="block text-[#265073] mb-2">
                    Tin tuyển dụng:
                  </label>
                  <select
                    value={selectedJobId || ""}
                    onChange={(e) => setSelectedJobId(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] text-[#265073]"
                  >
                    <option value="">Chọn tin tuyển dụng...</option>
                    {JOBS.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} ({job.applicants} ứng viên)
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!selectedJobId}
                  className="w-full px-6 py-4 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  <Sparkles className="w-5 h-5" />
                  Phân tích ứng viên phù hợp
                </button>

                {/* Empty State */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-[#265073]/70">
                    AI chưa phân tích ứng viên cho job này.
                  </p>
                </div>
              </motion.div>
            )}

            {/* AI Summary */}
            {isAnalyzed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-3xl p-8 mb-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl">Kết quả phân tích AI</h2>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-white/80 text-sm mb-1">
                        Ứng viên phù hợp cao
                      </p>
                      <p className="text-3xl">12</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-white/80 text-sm mb-1">
                        Match Score TB
                      </p>
                      <p className="text-3xl">84%</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 col-span-2">
                      <p className="text-white/80 text-sm mb-1">
                        Kỹ năng quan trọng
                      </p>
                      <p className="text-lg">ReactJS, Redux, REST API</p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                    <p className="text-white/80 text-sm mb-2">
                      Kỹ năng thiếu phổ biến:
                    </p>
                    <p className="text-lg">Docker, TypeScript</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-white/80 mb-1">Đề xuất AI:</p>
                        <p>
                          "Bạn nên ưu tiên xem 5 ứng viên có match score &gt; 90% để
                          tăng hiệu quả phỏng vấn."
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-white text-[#2D9596] rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    Xem ứng viên phù hợp ngay
                  </button>
                </div>
              </motion.div>
            )}

            {/* Top 5 Candidates */}
            {isAnalyzed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] mb-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-[#2D9596]" />
                  <h2 className="text-[#265073] text-xl">
                    Top 5 ứng viên phù hợp cao nhất
                  </h2>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {topCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-gradient-to-br from-[#ECF4D6] to-white rounded-xl p-4 text-center border-2 border-[#9AD0C2] hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => onNavigateToCandidateProfile?.(candidate.id)}
                    >
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full mx-auto mb-3"
                      />
                      <h3 className="text-[#265073] text-sm mb-2">
                        {candidate.name}
                      </h3>
                      <div className="text-3xl text-[#2D9596] mb-2">
                        {candidate.matchScore}%
                      </div>
                      <button className="w-full px-3 py-2 bg-[#2D9596] text-white rounded-lg text-xs hover:bg-[#265073] transition-colors">
                        Xem hồ sơ
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Filters */}
            {isAnalyzed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-[#2D9596]" />
                    <h3 className="text-[#265073] text-lg">Bộ lọc</h3>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-[#2D9596] hover:text-[#265073] transition-colors"
                  >
                    {showFilters ? "Ẩn" : "Hiện"}
                  </button>
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-4 gap-4"
                    >
                      <div>
                        <label className="block text-[#265073] text-sm mb-2">
                          Kinh nghiệm
                        </label>
                        <select className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] text-[#265073] text-sm">
                          <option>Tất cả</option>
                          <option>0-1 năm</option>
                          <option>1-3 năm</option>
                          <option>3-5 năm</option>
                          <option>5+ năm</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#265073] text-sm mb-2">
                          Thành phố
                        </label>
                        <select className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] text-[#265073] text-sm">
                          <option>Tất cả</option>
                          <option>Hà Nội</option>
                          <option>TP.HCM</option>
                          <option>Đà Nẵng</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#265073] text-sm mb-2">
                          Match Score
                        </label>
                        <select className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] text-[#265073] text-sm">
                          <option>Tất cả</option>
                          <option>&gt; 90%</option>
                          <option>&gt; 80%</option>
                          <option>&gt; 70%</option>
                        </select>
                      </div>
                      <div className="flex items-end gap-2">
                        <button className="flex-1 px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors text-sm">
                          Áp dụng
                        </button>
                        <button className="px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
                          Xóa
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Candidate List */}
            {isAnalyzed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {MOCK_CANDIDATES.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <CandidateCard
                      candidate={candidate}
                      onViewProfile={() =>
                        onNavigateToCandidateProfile?.(candidate.id)
                      }
                      onMessage={() => onNavigateToMessages?.()}
                      onSave={() => {}}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Skill Analytics */}
            {isAnalyzed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] mt-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-[#2D9596]" />
                  <h2 className="text-[#265073] text-xl">
                    Phân tích kỹ năng (AI Skill Analytics)
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Radar Chart */}
                  <div>
                    <h3 className="text-[#265073] mb-4 text-center">
                      Skill Gap: Yêu cầu vs Thực tế
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={SKILL_ANALYTICS}>
                        <PolarGrid stroke="#9AD0C2" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "#265073" }} />
                        <PolarRadiusAxis angle={90} domain={[0, 10]} />
                        <Radar
                          name="Yêu cầu"
                          dataKey="required"
                          stroke="#265073"
                          fill="#265073"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Thực tế"
                          dataKey="actual"
                          stroke="#2D9596"
                          fill="#2D9596"
                          fillOpacity={0.5}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div>
                    <h3 className="text-[#265073] mb-4 text-center">
                      Kỹ năng phổ biến trong ứng viên
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={SKILL_FREQUENCY}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ECF4D6" />
                        <XAxis dataKey="skill" tick={{ fill: "#265073" }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#2D9596" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="bg-gradient-to-r from-[#ECF4D6] to-[#9AD0C2] rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Sparkles className="w-5 h-5 text-[#2D9596]" />
                    </div>
                    <div>
                      <h4 className="text-[#265073] mb-2">AI Insight:</h4>
                      <p className="text-[#265073]/80">
                        "Ứng viên phù hợp nhiều nhất đang mạnh về React nhưng yếu về
                        DevOps. Hãy cân nhắc giảm yêu cầu Docker/CI/CD hoặc chấp nhận
                        training sau khi tuyển."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Actions */}
            {isAnalyzed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] mt-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-[#2D9596]" />
                  <h2 className="text-[#265073] text-xl">
                    Đề xuất hành động (AI Action Suggestion)
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    "Mời phỏng vấn 3 ứng viên có điểm > 85%",
                    "Liên hệ ngay với 2 ứng viên đang tìm việc gấp",
                    "Cập nhật JD để tăng số lượng ứng viên phù hợp",
                    "Gửi thông điệp tuyển dụng tự động",
                  ].map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-xl hover:bg-[#9AD0C2] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2D9596] text-white rounded-lg flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="text-[#265073]">{action}</span>
                      </div>
                      <button className="px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100">
                        Thực hiện
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          {isAnalyzed && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-80 flex-shrink-0 space-y-4"
            >
              {/* Job Summary */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]">
                <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#2D9596]" />
                  Hồ sơ JD
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[#265073]/60 mb-1">Kỹ năng yêu cầu:</p>
                    <div className="flex flex-wrap gap-1">
                      {["React", "JS", "Redux", "REST API"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-[#9AD0C2] text-[#265073] rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#265073]/60 mb-1">Lương:</p>
                    <p className="text-[#265073]">15-20 triệu</p>
                  </div>
                  <div>
                    <p className="text-[#265073]/60 mb-1">Cấp bậc:</p>
                    <p className="text-[#265073]">Middle - Senior</p>
                  </div>
                  <div>
                    <p className="text-[#265073]/60 mb-1">Thành phố:</p>
                    <p className="text-[#265073]">Hà Nội</p>
                  </div>
                </div>
              </div>

              {/* Filter Suggestions */}
              <div className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white">
                <h3 className="mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Bộ lọc gợi ý
                </h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 accent-white"
                    />
                    Tự động lọc Match Score &gt; 80%
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-white" />
                    Gợi ý kỹ năng tương tự
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-white" />
                    Ưu tiên ứng viên mới
                  </label>
                </div>
              </div>

              {/* Job Status */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]">
                <h3 className="text-[#265073] mb-4">Trạng thái job</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm border-2 border-green-200">
                    ✓ Đang tuyển
                  </button>
                  <button className="w-full px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
                    Tạm dừng
                  </button>
                  <button className="w-full px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
                    Đóng job
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]">
                <h3 className="text-[#265073] mb-4">Thống kê</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#265073]/60">Tổng ứng viên:</span>
                    <span className="text-[#265073]">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#265073]/60">Phù hợp cao:</span>
                    <span className="text-[#2D9596]">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#265073]/60">Đang xử lý:</span>
                    <span className="text-[#265073]">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#265073]/60">Đã lưu:</span>
                    <span className="text-[#265073]">5</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

