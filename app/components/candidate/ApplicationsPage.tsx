"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Building2,
  MapPin,
  Calendar,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
  Filter,
  X,
  FileText,
  TrendingUp,
  Sparkles,
  Search,
} from "lucide-react";

interface ApplicationsPageProps {
  onJobClick?: (jobId: number) => void;
  onApplicationClick?: (applicationId: number) => void;
}

export function ApplicationsPage({ onJobClick, onApplicationClick }: ApplicationsPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data: Applications
  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer (ReactJS)",
      company: "TechViet Solutions",
      companyLogo: "🏢",
      location: "Hà Nội",
      appliedDate: "15/11/2025",
      status: "interview",
      statusText: "Mời phỏng vấn",
      interviewDate: "20/11/2025 14:00",
      salary: "$2000 - $3500",
      jobId: 1,
    },
    {
      id: 2,
      jobTitle: "Full-stack Developer (React + NodeJS)",
      company: "VNG Corporation",
      companyLogo: "🎮",
      location: "TP.HCM",
      appliedDate: "12/11/2025",
      status: "reviewing",
      statusText: "Đang xem xét",
      salary: "$2500 - $4000",
      jobId: 2,
    },
    {
      id: 3,
      jobTitle: "React Native Developer",
      company: "Momo E-Wallet",
      companyLogo: "💰",
      location: "Hà Nội",
      appliedDate: "10/11/2025",
      status: "viewed",
      statusText: "Đã xem CV",
      salary: "$1800 - $3000",
      jobId: 3,
    },
    {
      id: 4,
      jobTitle: "Frontend Engineer (NextJS)",
      company: "FPT Software",
      companyLogo: "🏭",
      location: "Đà Nẵng",
      appliedDate: "08/11/2025",
      status: "pending",
      statusText: "Chờ duyệt",
      salary: "$2200 - $3800",
      jobId: 4,
    },
    {
      id: 5,
      jobTitle: "UI/UX Engineer (React)",
      company: "Tiki Corporation",
      companyLogo: "🛒",
      location: "TP.HCM",
      appliedDate: "05/11/2025",
      status: "rejected",
      statusText: "Từ chối",
      rejectReason: "Vị trí đã được tuyển đủ",
      salary: "$1500 - $2800",
      jobId: 5,
    },
    {
      id: 6,
      jobTitle: "Senior React Developer",
      company: "Shopee Vietnam",
      companyLogo: "🛍️",
      location: "TP.HCM",
      appliedDate: "03/11/2025",
      status: "interviewed",
      statusText: "Đã phỏng vấn",
      interviewDate: "08/11/2025",
      salary: "$3000 - $5000",
      jobId: 6,
    },
    {
      id: 7,
      jobTitle: "Frontend Lead (React)",
      company: "Zalopay",
      companyLogo: "💳",
      location: "Hà Nội",
      appliedDate: "01/11/2025",
      status: "closed",
      statusText: "Đóng tuyển",
      salary: "$3500 - $6000",
      jobId: 7,
    },
  ];

  // Statistics
  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    viewed: applications.filter((a) => a.status === "viewed").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    interview: applications.filter((a) => a.status === "interview").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  // Related job suggestions
  const suggestedJobs = [
    {
      id: 101,
      title: "Senior React Developer",
      company: "Google Vietnam",
      salary: "$4000 - $7000",
      matchScore: 95,
    },
    {
      id: 102,
      title: "Frontend Architect",
      company: "Microsoft Vietnam",
      salary: "$5000 - $8000",
      matchScore: 88,
    },
    {
      id: 103,
      title: "Lead Frontend Engineer",
      company: "Meta Vietnam",
      salary: "$4500 - $7500",
      matchScore: 92,
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<
      string,
      { bg: string; text: string; icon: any; border?: string }
    > = {
      pending: {
        bg: "bg-[#9AD0C2]",
        text: "text-[#265073]",
        icon: Clock,
      },
      viewed: {
        bg: "bg-[#2D9596]",
        text: "text-white",
        icon: Eye,
      },
      reviewing: {
        bg: "bg-white",
        text: "text-[#2D9596]",
        icon: AlertCircle,
        border: "border-2 border-[#2D9596]",
      },
      interview: {
        bg: "bg-[#1EAD7B]",
        text: "text-white",
        icon: Video,
      },
      interviewed: {
        bg: "bg-[#9AD0C2]",
        text: "text-[#265073]",
        icon: CheckCircle2,
      },
      rejected: {
        bg: "bg-[#F8D7DA]",
        text: "text-[#C9302C]",
        icon: XCircle,
      },
      closed: {
        bg: "bg-[#DADADA]",
        text: "text-[#666666]",
        icon: XCircle,
      },
    };

    return styles[status] || styles.pending;
  };

  const filteredApplications =
    selectedStatus === "all"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  const hasApplications = applications.length > 0;

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* ========== HEADER ========== */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-2xl flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-[#265073] text-4xl mb-3">
                Lịch sử ứng tuyển
              </h1>
              <p className="text-[#2D9596] text-lg max-w-2xl">
                Theo dõi tiến trình và trạng thái các công việc bạn đã ứng tuyển.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* ========== MAIN CONTENT ========== */}
          <div className="flex-1">
            {/* FILTER BAR */}
            {hasApplications && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-[#9AD0C2] p-6 mb-6 shadow-sm"
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
                  >
                    <div>
                      <label className="block text-[#265073] text-sm mb-2">
                        Từ khóa
                      </label>
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#2D9596]" />
                        <input
                          type="text"
                          placeholder="Tên công việc, công ty..."
                          className="w-full pl-10 pr-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#265073] text-sm mb-2">
                        Công ty
                      </label>
                      <select className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors">
                        <option>Tất cả công ty</option>
                        <option>TechViet Solutions</option>
                        <option>VNG Corporation</option>
                        <option>FPT Software</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#265073] text-sm mb-2">
                        Trạng thái
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors"
                      >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ duyệt</option>
                        <option value="viewed">Đã xem CV</option>
                        <option value="reviewing">Đang xem xét</option>
                        <option value="interview">Mời phỏng vấn</option>
                        <option value="interviewed">Đã phỏng vấn</option>
                        <option value="rejected">Từ chối</option>
                        <option value="closed">Đóng tuyển</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#265073] text-sm mb-2">
                        Từ ngày
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#265073] text-sm mb-2">
                        Đến ngày
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#265073] text-sm mb-2">
                        Địa điểm
                      </label>
                      <select className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors">
                        <option>Tất cả địa điểm</option>
                        <option>Hà Nội</option>
                        <option>TP.HCM</option>
                        <option>Đà Nẵng</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
                    Áp dụng lọc
                  </button>
                  <button
                    onClick={() => setSelectedStatus("all")}
                    className="px-6 py-2 text-[#2D9596] hover:text-[#265073] transition-colors"
                  >
                    Xóa lọc
                  </button>
                </div>
              </motion.div>
            )}

            {/* APPLICATIONS LIST */}
            {hasApplications ? (
              <>
                <div className="space-y-5">
                  {filteredApplications.map((app, index) => {
                    const statusStyle = getStatusBadge(app.status);
                    const StatusIcon = statusStyle.icon;

                    return (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm hover:shadow-md hover:border-[#2D9596] transition-all duration-300"
                      >
                        <div className="flex gap-6">
                          {/* Company Logo */}
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-2xl flex items-center justify-center text-2xl">
                              {app.companyLogo}
                            </div>
                          </div>

                          {/* Main Info */}
                          <div className="flex-1">
                            {/* Header Row */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3
                                  className="text-[#265073] text-xl mb-2 hover:text-[#2D9596] cursor-pointer transition-colors"
                                  onClick={() => onJobClick?.(app.jobId)}
                                >
                                  {app.jobTitle}
                                </h3>
                                <div className="flex items-center gap-4 text-sm mb-2">
                                  <div className="flex items-center gap-2 text-[#2D9596]">
                                    <Building2 className="w-4 h-4" />
                                    <span>{app.company}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[#265073]">
                                    <MapPin className="w-4 h-4" />
                                    <span>{app.location}</span>
                                  </div>
                                  <div className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-xs">
                                    {app.salary}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#265073]/60">
                                  <Calendar className="w-4 h-4" />
                                  <span>Ứng tuyển ngày: {app.appliedDate}</span>
                                </div>
                              </div>

                              {/* Status Badge */}
                              <div className="flex-shrink-0 ml-4">
                                <div
                                  className={`px-4 py-2 rounded-full flex items-center gap-2 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border || ""}`}
                                >
                                  <StatusIcon className="w-4 h-4" />
                                  <span className="text-sm">{app.statusText}</span>
                                </div>
                              </div>
                            </div>

                            {/* Additional Info Based on Status */}
                            {app.status === "interview" && app.interviewDate && (
                              <div className="mb-3 p-3 bg-[#1EAD7B]/10 border border-[#1EAD7B]/30 rounded-lg">
                                <div className="flex items-center gap-2 text-[#1EAD7B]">
                                  <Video className="w-4 h-4" />
                                  <span className="text-sm">
                                    Lịch phỏng vấn: {app.interviewDate}
                                  </span>
                                </div>
                              </div>
                            )}

                            {app.status === "rejected" && app.rejectReason && (
                              <div className="mb-3 p-3 bg-[#F8D7DA] border border-[#C9302C]/30 rounded-lg">
                                <p className="text-[#C9302C] text-sm">
                                  {app.rejectReason}
                                </p>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <button
                                onClick={() => onApplicationClick?.(app.id)}
                                className="px-5 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Xem chi tiết đơn
                              </button>

                              {(app.status === "pending" ||
                                app.status === "viewed") && (
                                <button className="px-5 py-2 border-2 border-[#C9302C] text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors text-sm flex items-center gap-2">
                                  <X className="w-4 h-4" />
                                  Rút đơn
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* PAGINATION */}
                {filteredApplications.length > 5 && (
                  <div className="mt-8 flex justify-center items-center gap-2">
                    <button className="px-4 py-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                      ← Trước
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
                    <button className="px-4 py-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                      Sau →
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* EMPTY STATE */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-12 text-center shadow-sm"
              >
                <div className="w-24 h-24 bg-[#ECF4D6] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ClipboardCheck className="w-12 h-12 text-[#2D9596]" />
                </div>
                <h3 className="text-[#265073] text-2xl mb-3">
                  Bạn chưa ứng tuyển công việc nào
                </h3>
                <p className="text-[#265073]/70 mb-6 max-w-md mx-auto">
                  Hãy khám phá hàng nghìn cơ hội việc làm IT tuyệt vời đang chờ
                  bạn
                </p>
                <button className="px-8 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors inline-flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Khám phá việc làm ngay
                </button>
              </motion.div>
            )}
          </div>

          {/* ========== SIDEBAR ========== */}
          {hasApplications && (
            <div className="hidden lg:block w-80 space-y-6">
              {/* Statistics Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
              >
                <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#2D9596]" />
                  Thống kê ứng tuyển
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-xl">
                    <span className="text-[#265073] text-sm">Tổng số đơn</span>
                    <span className="text-[#2D9596] text-lg">
                      {stats.total}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#9AD0C2]/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#265073]" />
                      <span className="text-[#265073] text-sm">Chờ duyệt</span>
                    </div>
                    <span className="text-[#265073]">{stats.pending}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#2D9596]/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#2D9596]" />
                      <span className="text-[#265073] text-sm">Đã xem CV</span>
                    </div>
                    <span className="text-[#2D9596]">{stats.viewed}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#2D9596]/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                      <span className="text-[#265073] text-sm">
                        Đang xem xét
                      </span>
                    </div>
                    <span className="text-[#2D9596]">{stats.reviewing}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#1EAD7B]/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#1EAD7B]" />
                      <span className="text-[#265073] text-sm">
                        Mời phỏng vấn
                      </span>
                    </div>
                    <span className="text-[#1EAD7B]">{stats.interview}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#F8D7DA] rounded-xl">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-[#C9302C]" />
                      <span className="text-[#265073] text-sm">Từ chối</span>
                    </div>
                    <span className="text-[#C9302C]">{stats.rejected}</span>
                  </div>
                </div>
              </motion.div>

              {/* Suggested Jobs Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#9AD0C2]/30 to-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
              >
                <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2D9596]" />
                  Việc làm liên quan
                </h3>

                <div className="space-y-3">
                  {suggestedJobs.map((job, idx) => (
                    <div
                      key={job.id}
                      className="p-4 bg-white rounded-xl border border-[#9AD0C2]/50 hover:border-[#2D9596] transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-[#265073] text-sm flex-1">
                          {job.title}
                        </h4>
                        <span className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded-full ml-2">
                          {job.matchScore}%
                        </span>
                      </div>
                      <p className="text-[#2D9596] text-xs mb-2">
                        {job.company}
                      </p>
                      <p className="text-[#265073] text-xs">{job.salary}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm">
                  Xem tất cả gợi ý →
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

