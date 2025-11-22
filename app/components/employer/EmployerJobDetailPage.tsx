"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Pause,
  XCircle,
  Trash2,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Eye,
  Bookmark,
  TrendingUp,
  Gauge,
  Clock,
  Briefcase,
  CheckCircle,
  FileText,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EmployerJobDetailPageProps {
  jobId: number | null;
  onNavigateToJobs?: () => void;
  onNavigateToEditJob?: (jobId: number) => void;
  onNavigateToApplicants?: (jobId: number) => void;
}

export function EmployerJobDetailPage({
  jobId,
  onNavigateToJobs,
  onNavigateToEditJob,
  onNavigateToApplicants,
}: EmployerJobDetailPageProps) {
  const [timeFilter, setTimeFilter] = useState("30");

  // Mock job data
  const job = {
    id: jobId || 1,
    title: "Senior Frontend Developer",
    status: "active",
    statusText: "Đang tuyển",
    salary: "25-35 triệu",
    location: "Hà Nội",
    workType: "Hybrid",
    level: "Senior",
    postedDate: "15/11/2024",
    deadline: "31/12/2024",
    quantity: 2,
    views: 342,
    saves: 45,
    applicants: 24,
    description:
      "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với ReactJS để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi.",
    requirements: [
      "3+ năm kinh nghiệm với ReactJS",
      "Thành thạo TypeScript",
      "Kinh nghiệm với NextJS là một lợi thế",
      "Có kỹ năng làm việc nhóm tốt",
    ],
    skills: ["ReactJS", "TypeScript", "NextJS", "Tailwind CSS"],
    benefits: [
      "Lương cạnh tranh, thưởng theo hiệu suất",
      "Bảo hiểm sức khỏe đầy đủ",
      "Làm việc hybrid 3 ngày/tuần",
      "Môi trường năng động, sáng tạo",
    ],
  };

  // Performance data
  const performanceData = [
    { date: "01/11", views: 12, saves: 2, applicants: 1 },
    { date: "05/11", views: 28, saves: 5, applicants: 3 },
    { date: "10/11", views: 45, saves: 8, applicants: 5 },
    { date: "15/11", views: 78, saves: 15, applicants: 8 },
    { date: "20/11", views: 125, saves: 25, applicants: 15 },
    { date: "25/11", views: 198, saves: 35, applicants: 20 },
    { date: "30/11", views: 342, saves: 45, applicants: 24 },
  ];

  // Pipeline stats
  const pipeline = [
    { stage: "Mới", count: 8, color: "#2D9596" },
    { stage: "Đã xem", count: 6, color: "#265073" },
    { stage: "Phỏng vấn", count: 5, color: "#FFB84D" },
    { stage: "Offer", count: 3, color: "#9AD0C2" },
    { stage: "Không phù hợp", count: 2, color: "#9CA3AF" },
  ];

  // Candidates
  const candidates = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      matchScore: 92,
      experience: "4 năm",
      skills: ["ReactJS", "TypeScript", "NextJS"],
      appliedDate: "20/11/2024",
      status: "new",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      matchScore: 88,
      experience: "5 năm",
      skills: ["ReactJS", "Vue", "Angular"],
      appliedDate: "19/11/2024",
      status: "reviewed",
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      matchScore: 85,
      experience: "3 năm",
      skills: ["ReactJS", "Redux", "GraphQL"],
      appliedDate: "18/11/2024",
      status: "interview",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      matchScore: 90,
      experience: "6 năm",
      skills: ["ReactJS", "TypeScript", "Node.js"],
      appliedDate: "17/11/2024",
      status: "offer",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#2D9596]";
      case "paused":
        return "bg-[#FFB84D]";
      case "closed":
        return "bg-gray-400";
      default:
        return "bg-gray-200";
    }
  };

  const handleDelete = () => {
    if (
      confirm(
        "Bạn có chắc chắn muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác."
      )
    ) {
      onNavigateToJobs?.();
    }
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
              Chi tiết tin tuyển dụng
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[#2D9596] text-xl">{job.title}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(job.status)}`}
                >
                  {job.statusText}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onNavigateToEditJob?.(job.id)}
                  className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </button>
                <button className="px-6 py-2 border-2 border-[#FFB84D] text-[#FFB84D] rounded-lg hover:bg-[#FFB84D] hover:text-white transition-colors flex items-center gap-2">
                  <Pause className="w-4 h-4" />
                  Tạm dừng
                </button>
                <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Đóng tin
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-4">
                Thông tin công việc
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ECF4D6] rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#265073]/70">Mức lương</div>
                    <div className="text-[#265073]">{job.salary}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ECF4D6] rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#265073]/70">Địa điểm</div>
                    <div className="text-[#265073]">{job.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ECF4D6] rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#265073]/70">Hình thức</div>
                    <div className="text-[#265073]">{job.workType}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ECF4D6] rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#265073]/70">Cấp bậc</div>
                    <div className="text-[#265073]">{job.level}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ECF4D6] rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#265073]/70">Ngày đăng</div>
                    <div className="text-[#265073]">{job.postedDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ECF4D6] rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#265073]/70">Hạn nộp</div>
                    <div className="text-[#265073]">{job.deadline}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ECF4D6] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#265073]/70">Số lượng</div>
                    <div className="text-[#265073]">{job.quantity} người</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#265073] text-xl">Hiệu suất tin tuyển</h3>
                <div className="flex gap-2">
                  {["7", "30", "90"].map((days) => (
                    <button
                      key={days}
                      onClick={() => setTimeFilter(days)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        timeFilter === days
                          ? "bg-[#2D9596] text-white"
                          : "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
                      }`}
                    >
                      {days} ngày
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-[#ECF4D6] rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div className="text-2xl text-[#265073] mb-1">
                    {job.views}
                  </div>
                  <div className="text-sm text-[#265073]/70">Lượt xem</div>
                </div>

                <div className="p-4 bg-[#ECF4D6] rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bookmark className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div className="text-2xl text-[#265073] mb-1">
                    {job.saves}
                  </div>
                  <div className="text-sm text-[#265073]/70">Lượt lưu</div>
                </div>

                <div className="p-4 bg-[#ECF4D6] rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-[#2D9596]" />
                  </div>
                  <div className="text-2xl text-[#265073] mb-1">
                    {job.applicants}
                  </div>
                  <div className="text-sm text-[#265073]/70">Ứng viên</div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9AD0C2" />
                  <XAxis dataKey="date" stroke="#265073" />
                  <YAxis stroke="#265073" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #9AD0C2",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#2D9596"
                    strokeWidth={2}
                    name="Lượt xem"
                  />
                  <Line
                    type="monotone"
                    dataKey="saves"
                    stroke="#265073"
                    strokeWidth={2}
                    name="Lượt lưu"
                  />
                  <Line
                    type="monotone"
                    dataKey="applicants"
                    stroke="#FFB84D"
                    strokeWidth={2}
                    name="Ứng viên"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pipeline Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-4">
                Pipeline ứng viên
              </h3>

              <div className="grid grid-cols-5 gap-3">
                {pipeline.map((stage) => (
                  <div
                    key={stage.stage}
                    className="p-4 rounded-xl text-center cursor-pointer hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: `${stage.color}15` }}
                  >
                    <div
                      className="text-3xl mb-2"
                      style={{ color: stage.color }}
                    >
                      {stage.count}
                    </div>
                    <div className="text-sm text-[#265073]">{stage.stage}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Candidates List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#265073] text-xl">Ứng viên đã nộp</h3>
                <button
                  onClick={() => onNavigateToApplicants?.(job.id)}
                  className="text-[#2D9596] hover:text-[#265073] transition-colors"
                >
                  Xem tất cả →
                </button>
              </div>

              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-4 border-2 border-[#9AD0C2] rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-[#265073]">
                              {candidate.name}
                            </h4>
                            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#2D9596] to-[#265073] text-white rounded-full text-sm">
                              <Gauge className="w-4 h-4" />
                              {candidate.matchScore}%
                            </div>
                          </div>
                          <div className="text-sm text-[#265073]/70 mb-2">
                            Kinh nghiệm: {candidate.experience}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-[#9AD0C2] text-[#265073] rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#265073]/70 mb-3">
                          {candidate.appliedDate}
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors text-sm">
                            Xem hồ sơ
                          </button>
                          <select className="px-3 py-2 border-2 border-[#9AD0C2] rounded-lg text-sm text-[#265073] hover:border-[#2D9596] transition-colors">
                            <option>Chuyển pipeline</option>
                            <option>Xem xét</option>
                            <option>Phỏng vấn</option>
                            <option>Trượt</option>
                            <option>Offer</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-4">Mô tả công việc</h3>
              <p className="text-[#265073]/80 mb-6">{job.description}</p>

              <h4 className="text-[#265073] mb-3">Yêu cầu công việc</h4>
              <ul className="space-y-2 mb-6">
                {job.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[#265073]/80"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-[#265073] mb-3">Kỹ năng yêu cầu</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h4 className="text-[#265073] mb-3">Quyền lợi</h4>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[#265073]/80"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-lg"
            >
              <h3 className="text-red-600 text-xl mb-4">Vùng nguy hiểm</h3>
              <p className="text-[#265073]/70 mb-4">
                Xóa tin tuyển dụng này vĩnh viễn. Hành động này không thể hoàn
                tác.
              </p>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Xóa tin tuyển dụng
              </button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="mb-4">Thống kê nhanh</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-3xl mb-1">{job.applicants}</div>
                  <div className="text-sm opacity-90">Tổng ứng viên</div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-3xl mb-1">
                    {Math.round((job.applicants / job.views) * 100)}%
                  </div>
                  <div className="text-sm opacity-90">Tỉ lệ chuyển đổi</div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-3xl mb-1">85%</div>
                  <div className="text-sm opacity-90">
                    Match score trung bình
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4">Hành động nhanh</h3>

              <div className="space-y-3">
                <button
                  onClick={() => onNavigateToEditJob?.(job.id)}
                  className="w-full px-4 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Chỉnh sửa job
                </button>

                <button className="w-full px-4 py-3 border-2 border-[#FFB84D] text-[#FFB84D] rounded-lg hover:bg-[#FFB84D] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Pause className="w-5 h-5" />
                  Tạm dừng job
                </button>

                <button className="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Đóng tin tuyển dụng
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

