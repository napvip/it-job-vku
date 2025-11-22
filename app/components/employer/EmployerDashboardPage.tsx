"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  UserPlus,
  Eye,
  TrendingUp,
  Calendar,
  MessageCircle,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  Sparkles,
  BarChart3,
  Video,
  Crown,
  Zap,
  Brain,
  FileText,
  Target,
} from "lucide-react";

interface EmployerDashboardPageProps {
  onNavigateToJobs?: () => void;
  onNavigateToApplicants?: (jobId: number) => void;
  onNavigateToMessages?: () => void;
  onNavigateToInterviews?: () => void;
  onNavigateToJDAnalyzer?: () => void;
}

export function EmployerDashboardPage({
  onNavigateToJobs,
  onNavigateToApplicants,
  onNavigateToMessages,
  onNavigateToInterviews,
  onNavigateToJDAnalyzer,
}: EmployerDashboardPageProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">(
    "month"
  );

  // Overview Metrics
  const metrics = [
    {
      id: 1,
      label: "Tin đang hoạt động",
      value: "12",
      icon: Briefcase,
      color: "#2D9596",
      change: "+2",
      trend: "up",
    },
    {
      id: 2,
      label: "Ứng viên mới tuần này",
      value: "27",
      icon: UserPlus,
      color: "#265073",
      change: "+8",
      trend: "up",
    },
    {
      id: 3,
      label: "Lượt xem (30 ngày)",
      value: "1,254",
      icon: Eye,
      color: "#2D9596",
      change: "+15%",
      trend: "up",
    },
    {
      id: 4,
      label: "Match Score TB",
      value: "78%",
      icon: TrendingUp,
      color: "#265073",
      change: "+5%",
      trend: "up",
    },
    {
      id: 5,
      label: "Lịch phỏng vấn",
      value: "4",
      icon: Calendar,
      color: "#FF9A3C",
      change: "Tuần này",
      trend: "neutral",
    },
    {
      id: 6,
      label: "Tin nhắn chưa đọc",
      value: "8",
      icon: MessageCircle,
      color: "#C9302C",
      change: "Mới",
      trend: "neutral",
    },
  ];

  // Chart data - Applications over time
  const chartData = [
    { day: "T2", applications: 5, views: 120 },
    { day: "T3", applications: 8, views: 180 },
    { day: "T4", applications: 6, views: 150 },
    { day: "T5", applications: 12, views: 220 },
    { day: "T6", applications: 9, views: 190 },
    { day: "T7", applications: 4, views: 80 },
    { day: "CN", applications: 2, views: 45 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.applications));

  // Active Jobs
  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applicants: 24,
      views: 342,
      status: "Đang tuyển",
      matchScore: 82,
      postedDate: "2 tuần trước",
    },
    {
      id: 2,
      title: "Backend Developer (NodeJS)",
      applicants: 18,
      views: 278,
      status: "Đang tuyển",
      matchScore: 75,
      postedDate: "1 tuần trước",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      applicants: 31,
      views: 412,
      status: "Đang tuyển",
      matchScore: 88,
      postedDate: "3 ngày trước",
    },
  ];

  // Recent Applicants
  const recentApplicants = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      avatar: "A",
      position: "Senior Frontend Developer",
      matchScore: 95,
      appliedTime: "10 phút trước",
      experience: "5 năm",
      skills: ["React", "TypeScript", "NextJS"],
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      avatar: "B",
      position: "UI/UX Designer",
      matchScore: 88,
      appliedTime: "1 giờ trước",
      experience: "3 năm",
      skills: ["Figma", "Adobe XD", "Sketch"],
    },
    {
      id: 3,
      name: "Lê Hoàng Cường",
      avatar: "C",
      position: "Backend Developer",
      matchScore: 79,
      appliedTime: "3 giờ trước",
      experience: "4 năm",
      skills: ["NodeJS", "MongoDB", "AWS"],
    },
  ];

  // Messages
  const messages = [
    {
      id: 1,
      candidate: "Nguyễn Văn An",
      job: "Senior Frontend Developer",
      message: "Xin chào, tôi muốn biết thêm về quy trình phỏng vấn...",
      time: "5 phút trước",
      unread: true,
    },
    {
      id: 2,
      candidate: "Phạm Minh Đức",
      job: "Backend Developer",
      message: "Cảm ơn về lời mời phỏng vấn...",
      time: "1 giờ trước",
      unread: true,
    },
  ];

  // AI Suggestions
  const aiSuggestions = [
    {
      id: 1,
      name: "Hoàng Minh Tuấn",
      avatar: "T",
      matchScore: 96,
      position: "Senior Frontend Developer",
      skills: ["React", "TypeScript", "System Design"],
      experience: "6 năm",
      reason:
        "Kỹ năng vượt trội, kinh nghiệm dự án lớn, phù hợp văn hóa công ty",
      aiInsight: "Top 1% ứng viên trong lĩnh vực Frontend",
    },
    {
      id: 2,
      name: "Đỗ Thu Hà",
      avatar: "H",
      matchScore: 93,
      position: "UI/UX Designer",
      skills: ["Figma", "User Research", "Design System"],
      experience: "4 năm",
      reason: "Portfolio xuất sắc, kinh nghiệm B2C, tư duy sản phẩm tốt",
      aiInsight: "Phong cách thiết kế phù hợp với brand identity",
    },
    {
      id: 3,
      name: "Bùi Văn Khoa",
      avatar: "K",
      matchScore: 89,
      position: "Backend Developer",
      skills: ["NodeJS", "Microservices", "Docker"],
      experience: "5 năm",
      reason: "Kinh nghiệm scalability, từng làm hệ thống lớn",
      aiInsight: "Phù hợp với tech stack hiện tại của công ty",
    },
  ];

  // Upcoming Interviews
  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Nguyễn Văn An",
      position: "Senior Frontend Developer",
      date: "25/11/2024",
      time: "14:00",
      type: "Online",
      meetLink: "https://meet.google.com/xxx",
    },
    {
      id: 2,
      candidate: "Trần Thị Bình",
      position: "UI/UX Designer",
      date: "26/11/2024",
      time: "10:00",
      type: "Trực tiếp",
      location: "Văn phòng HN",
    },
    {
      id: 3,
      candidate: "Lê Hoàng Cường",
      position: "Backend Developer",
      date: "27/11/2024",
      time: "15:30",
      type: "Online",
      meetLink: "https://zoom.us/xxx",
    },
  ];

  // Package info
  const packageInfo = {
    plan: "Premium",
    cvViews: 450,
    cvViewsLimit: 500,
    expiryDate: "31/12/2024",
    features: ["Xem CV không giới hạn", "AI Matching", "Hỗ trợ 24/7"],
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px]">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#265073] text-3xl mb-2">
              Dashboard tuyển dụng
            </h1>
            <p className="text-[#2D9596]">
              Tổng quan hiệu quả tin tuyển dụng, ứng viên và hoạt động của công
              ty
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Metrics */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                  {metric.trend !== "neutral" && (
                    <span className="text-xs px-2 py-1 bg-[#2D9596]/10 text-[#2D9596] rounded-full">
                      {metric.change}
                    </span>
                  )}
                </div>
                <div className="text-3xl text-[#265073] mb-1">
                  {metric.value}
                </div>
                <div className="text-[#265073]/70 text-sm">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Chart - 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[#265073] text-xl mb-1">
                  Hiệu suất tuyển dụng
                </h2>
                <p className="text-[#265073]/70 text-sm">
                  Số lượng ứng viên theo thời gian
                </p>
              </div>
              <div className="flex gap-2">
                {(["week", "month", "quarter"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      timeRange === range
                        ? "bg-[#2D9596] text-white"
                        : "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
                    }`}
                  >
                    {range === "week"
                      ? "Tuần"
                      : range === "month"
                        ? "Tháng"
                        : "3 tháng"}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-[#265073]/70 text-sm">
                    {data.day}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    {/* Applications bar */}
                    <div className="flex-1 relative">
                      <div className="h-8 bg-[#ECF4D6] rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(data.applications / maxValue) * 100}%`,
                          }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-[#2D9596] to-[#9AD0C2] flex items-center justify-end pr-3"
                        >
                          <span className="text-white text-sm font-bold">
                            {data.applications}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                    {/* Views indicator */}
                    <div className="w-20 text-right">
                      <div className="flex items-center gap-1 text-[#265073]/70 text-xs">
                        <Eye className="w-3 h-3" />
                        {data.views}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t-2 border-[#9AD0C2]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-[#2D9596] to-[#9AD0C2] rounded" />
                <span className="text-[#265073]/70 text-sm">
                  Ứng viên nộp hồ sơ
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#265073]/70" />
                <span className="text-[#265073]/70 text-sm">Lượt xem job</span>
              </div>
            </div>
          </motion.div>

          {/* Package Info - 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-2xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-[#FFD700]" />
              <h3 className="text-xl">Gói {packageInfo.plan}</h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-90">Lượt xem CV</span>
                <span className="text-sm">
                  {packageInfo.cvViews}/{packageInfo.cvViewsLimit}
                </span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{
                    width: `${(packageInfo.cvViews / packageInfo.cvViewsLimit) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {packageInfo.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-[#FFD700]" />
                  <span className="opacity-90">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <div className="text-xs opacity-75 mb-1">Ngày hết hạn</div>
              <div className="text-sm">{packageInfo.expiryDate}</div>
            </div>

            <button className="w-full px-4 py-3 bg-white text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors flex items-center justify-center gap-2">
              <Crown className="w-4 h-4" />
              Nâng cấp gói
            </button>
          </motion.div>
        </div>

        {/* Active Jobs & AI Suggestions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Active Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#265073] text-xl">
                Tin tuyển dụng đang hoạt động
              </h2>
              <button
                onClick={onNavigateToJobs}
                className="text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-1 text-sm"
              >
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 bg-[#ECF4D6] rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[#265073] mb-1">{job.title}</h3>
                      <p className="text-xs text-[#265073]/70">
                        {job.postedDate}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                      {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-xl text-[#2D9596]">
                        {job.applicants}
                      </div>
                      <div className="text-xs text-[#265073]/70">Ứng viên</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl text-[#2D9596]">{job.views}</div>
                      <div className="text-xs text-[#265073]/70">Lượt xem</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl text-[#2D9596]">
                        {job.matchScore}%
                      </div>
                      <div className="text-xs text-[#265073]/70">Match TB</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigateToApplicants!(job.id)}
                      className="flex-1 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm"
                    >
                      Xem ứng viên
                    </button>
                    <button className="px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-colors text-sm">
                      Chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-8 text-white shadow-lg"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-xl">AI gợi ý ứng viên</h2>
            </div>

            <div className="space-y-4">
              {aiSuggestions.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-white text-[#2D9596] rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {candidate.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{candidate.name}</h3>
                        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-[#FFD700]" />
                          <span className="text-xs">{candidate.matchScore}%</span>
                        </div>
                      </div>
                      <p className="text-sm opacity-90 mb-2">
                        {candidate.position}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-white/20 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/10 rounded-lg mb-2">
                    <p className="text-xs opacity-90">{candidate.reason}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs opacity-75 mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span className="italic">{candidate.aiInsight}</span>
                  </div>

                  <button className="w-full px-4 py-2 bg-white text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
                    Xem chi tiết hồ sơ
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Applicants, Messages & Interviews */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Applicants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#265073] text-lg">Ứng viên mới nhất</h2>
              <button
                onClick={onNavigateToApplicants}
                className="text-[#2D9596] hover:text-[#265073] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {recentApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="p-4 bg-[#ECF4D6] rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {applicant.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#265073] truncate">
                        {applicant.name}
                      </h3>
                      <p className="text-xs text-[#265073]/70">
                        {applicant.experience} kinh nghiệm
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#2D9596]">
                        {applicant.matchScore}%
                      </div>
                      <div className="text-xs text-[#265073]/70">Match</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#265073]/70 mb-2">
                    {applicant.position}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {applicant.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-white text-[#265073] rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#265073]/70 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {applicant.appliedTime}
                    </div>
                  </div>

                  <button className="w-full px-3 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm">
                    Xem hồ sơ
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#265073] text-lg">Tin nhắn mới</h2>
              <button
                onClick={onNavigateToMessages}
                className="text-[#2D9596] hover:text-[#265073] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 bg-[#ECF4D6] rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                  onClick={onNavigateToMessages}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[#265073]">{msg.candidate}</h3>
                    {msg.unread && (
                      <span className="px-2 py-0.5 bg-[#C9302C] text-white text-xs rounded-full">
                        Mới
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#265073]/70 mb-2">{msg.job}</p>
                  <p className="text-sm text-[#265073] mb-2 line-clamp-2">
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#265073]/70">
                    <Clock className="w-3 h-3" />
                    {msg.time}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onNavigateToMessages}
              className="w-full px-4 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Mở hộp thư
            </button>
          </motion.div>

          {/* Upcoming Interviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#265073] text-lg">Lịch phỏng vấn</h2>
              <button
                onClick={onNavigateToInterviews}
                className="text-[#2D9596] hover:text-[#265073] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="p-4 bg-[#ECF4D6] rounded-xl hover:shadow-md transition-shadow"
                >
                  <h3 className="text-[#265073] mb-1">
                    {interview.candidate}
                  </h3>
                  <p className="text-xs text-[#265073]/70 mb-3">
                    {interview.position}
                  </p>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-[#265073]">
                      <Calendar className="w-4 h-4 text-[#2D9596]" />
                      {interview.date} - {interview.time}
                    </div>
                    {interview.type === "Online" ? (
                      <div className="flex items-center gap-2 text-sm text-[#265073]">
                        <Video className="w-4 h-4 text-[#2D9596]" />
                        {interview.type}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-[#265073]">
                        <MapPin className="w-4 h-4 text-[#2D9596]" />
                        {interview.location}
                      </div>
                    )}
                  </div>

                  {interview.type === "Online" && (
                    <button className="w-full px-3 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm flex items-center justify-center gap-2">
                      <Video className="w-4 h-4" />
                      Tham gia
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={onNavigateToInterviews}
              className="w-full mt-4 px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-colors text-sm"
            >
              Xem tất cả lịch
            </button>
          </motion.div>
        </div>

        {/* AI Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <h2 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            AI Tools & Tối ưu tuyển dụng
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* JD Analyzer */}
            <div
              onClick={onNavigateToJDAnalyzer}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white cursor-pointer hover:shadow-2xl transition-shadow group"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">JD Analyzer</h3>
              <p className="text-sm opacity-90 mb-4">
                AI phân tích và tối ưu mô tả công việc, gợi ý kỹ năng và mức lương phù hợp
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Powered by AI</span>
              </div>
            </div>

            {/* AI Candidate Matching */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:border-[#2D9596] transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#ECF4D6] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#9AD0C2] transition-colors">
                <Zap className="w-6 h-6 text-[#2D9596]" />
              </div>
              <h3 className="text-[#265073] text-lg font-medium mb-2">AI Matching</h3>
              <p className="text-[#2D9596] text-sm mb-4">
                Tìm kiếm ứng viên phù hợp tự động với độ chính xác cao
              </p>
              <div className="flex items-center gap-2 text-sm text-[#2D9596]">
                <Target className="w-4 h-4" />
                <span>95% accuracy</span>
              </div>
            </div>

            {/* Smart Reports */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:border-[#2D9596] transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#ECF4D6] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#9AD0C2] transition-colors">
                <BarChart3 className="w-6 h-6 text-[#2D9596]" />
              </div>
              <h3 className="text-[#265073] text-lg font-medium mb-2">Smart Reports</h3>
              <p className="text-[#2D9596] text-sm mb-4">
                Báo cáo chi tiết về hiệu quả tuyển dụng và insights
              </p>
              <div className="flex items-center gap-2 text-sm text-[#2D9596]">
                <TrendingUp className="w-4 h-4" />
                <span>Coming soon</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

