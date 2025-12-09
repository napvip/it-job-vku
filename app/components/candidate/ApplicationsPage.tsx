"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Building2,
  MapPin,
  Calendar,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Video,
  Filter,
  FileText,
  TrendingUp,
  Sparkles,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getCandidateApplications, JobApplication, JobData } from "../../../lib/firebase";

interface ApplicationWithJob extends JobApplication {
  jobInfo?: JobData;
}

export function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await getCandidateApplications(user.uid);
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  // Calculate stats
  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    interview: applications.filter((a) => a.status === "interview").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; icon: typeof Clock; label: string }> = {
      pending: {
        bg: "bg-[#FEF3C7]",
        text: "text-[#F59E0B]",
        icon: Clock,
        label: "Chờ duyệt",
      },
      reviewing: {
        bg: "bg-[#DBEAFE]",
        text: "text-[#3B82F6]",
        icon: Eye,
        label: "Đang xem xét",
      },
      interview: {
        bg: "bg-[#D1FAE5]",
        text: "text-[#10B981]",
        icon: Video,
        label: "Mời phỏng vấn",
      },
      accepted: {
        bg: "bg-[#DCFCE7]",
        text: "text-[#22C55E]",
        icon: CheckCircle2,
        label: "Được nhận",
      },
      rejected: {
        bg: "bg-[#FEE2E2]",
        text: "text-[#EF4444]",
        icon: XCircle,
        label: "Từ chối",
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredApplications =
    selectedStatus === "all"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Header */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-xl flex items-center justify-center">
              <ClipboardCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-[#265073] text-3xl font-bold mb-2">
                Lịch sử ứng tuyển
              </h1>
              <p className="text-[#2D9596]">
                Theo dõi tiến trình và trạng thái các công việc bạn đã ứng tuyển.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            {applications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border-2 border-[#9AD0C2] p-4 mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#2D9596]" />
                    <span className="text-[#265073] font-medium">Bộ lọc</span>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-[#2D9596] text-sm hover:text-[#265073]"
                  >
                    {showFilters ? "Ẩn" : "Hiển thị"}
                  </button>
                </div>

                {showFilters && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none text-[#265073]"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="reviewing">Đang xem xét</option>
                      <option value="interview">Mời phỏng vấn</option>
                      <option value="accepted">Được nhận</option>
                      <option value="rejected">Từ chối</option>
                    </select>
                    <button
                      onClick={() => setSelectedStatus("all")}
                      className="px-4 py-2 text-[#2D9596] hover:text-[#265073]"
                    >
                      Xóa lọc
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Applications List */}
            {applications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl border-2 border-[#9AD0C2] p-12 text-center"
              >
                <div className="w-20 h-20 bg-[#ECF4D6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck className="w-10 h-10 text-[#2D9596]" />
                </div>
                <h3 className="text-[#265073] text-xl font-semibold mb-2">
                  Bạn chưa ứng tuyển công việc nào
                </h3>
                <p className="text-[#2D9596] mb-4">
                  Hãy khám phá các cơ hội việc làm IT tuyệt vời đang chờ bạn
                </p>
                <a
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Khám phá việc làm
                </a>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((app, index) => {
                  const statusConfig = getStatusConfig(app.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl border-2 border-[#9AD0C2] p-5 hover:shadow-lg hover:border-[#2D9596] transition-all"
                    >
                      <div className="flex gap-4">
                        {/* Company Logo */}
                        <div className="w-14 h-14 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-7 h-7 text-white" />
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <a
                              href={`/job/${app.jobId}`}
                              className="text-[#265073] text-lg font-semibold hover:text-[#2D9596] transition-colors"
                            >
                              {app.jobInfo?.title || "Vị trí công việc"}
                            </a>
                            <div
                              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.text}`}
                            >
                              <StatusIcon className="w-4 h-4" />
                              <span className="text-sm">{statusConfig.label}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                            <div className="flex items-center gap-1.5 text-[#2D9596]">
                              <Building2 className="w-4 h-4" />
                              <span>{app.jobInfo?.companyName || "Công ty"}</span>
                            </div>
                            {app.jobInfo?.location && (
                              <div className="flex items-center gap-1.5 text-[#265073]/70">
                                <MapPin className="w-4 h-4" />
                                <span>{app.jobInfo.location}</span>
                              </div>
                            )}
                            {(app.jobInfo?.salaryMin || app.jobInfo?.salaryMax) && !app.jobInfo?.hideSalary && (
                              <div className="px-2 py-0.5 bg-[#2D9596] text-white rounded-full text-xs">
                                {app.jobInfo.salaryMin && app.jobInfo.salaryMax 
                                  ? `${app.jobInfo.salaryMin.toLocaleString()} - ${app.jobInfo.salaryMax.toLocaleString()} VND`
                                  : app.jobInfo.salaryMax 
                                    ? `Lên đến ${app.jobInfo.salaryMax.toLocaleString()} VND`
                                    : `Từ ${app.jobInfo.salaryMin?.toLocaleString()} VND`
                                }
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-[#265073]/60 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>Ứng tuyển ngày: {formatDate(app.appliedAt)}</span>
                          </div>

                          {/* Interview Info */}
                          {app.status === "interview" && (
                            <div className="mb-3 p-3 bg-[#D1FAE5] border border-[#10B981]/30 rounded-lg">
                              <div className="flex items-center gap-2 text-[#10B981]">
                                <Video className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Bạn đã được mời phỏng vấn! Kiểm tra email để biết thêm chi tiết.
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Accepted Info */}
                          {app.status === "accepted" && (
                            <div className="mb-3 p-3 bg-[#DCFCE7] border border-[#22C55E]/30 rounded-lg">
                              <div className="flex items-center gap-2 text-[#22C55E]">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Chúc mừng! Bạn đã được nhận vào vị trí này.
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <a
                              href={`/job/${app.jobId}`}
                              className="px-4 py-2 border border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Xem chi tiết
                            </a>
                            {app.cvUrl && (
                              <a
                                href={app.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-[#265073]/70 hover:text-[#2D9596] transition-colors text-sm flex items-center gap-2"
                              >
                                <FileText className="w-4 h-4" />
                                Xem CV đã gửi
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          {applications.length > 0 && (
            <div className="hidden lg:block w-72 space-y-4">
              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border-2 border-[#9AD0C2] p-5"
              >
                <h3 className="text-[#265073] font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#2D9596]" />
                  Thống kê ứng tuyển
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-lg">
                    <span className="text-[#265073] text-sm">Tổng số đơn</span>
                    <span className="text-[#2D9596] font-bold text-lg">{stats.total}</span>
                  </div>

                  {[
                    { key: "pending", label: "Chờ duyệt", icon: Clock, color: "#F59E0B", bg: "#FEF3C7" },
                    { key: "reviewing", label: "Đang xem xét", icon: Eye, color: "#3B82F6", bg: "#DBEAFE" },
                    { key: "interview", label: "Mời phỏng vấn", icon: Video, color: "#10B981", bg: "#D1FAE5" },
                    { key: "accepted", label: "Được nhận", icon: CheckCircle2, color: "#22C55E", bg: "#DCFCE7" },
                    { key: "rejected", label: "Từ chối", icon: XCircle, color: "#EF4444", bg: "#FEE2E2" },
                  ].map((item) => {
                    const count = stats[item.key as keyof typeof stats];
                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: item.bg }}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4" style={{ color: item.color }} />
                          <span className="text-[#265073] text-sm">{item.label}</span>
                        </div>
                        <span style={{ color: item.color }} className="font-semibold">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border-2 border-[#9AD0C2] p-5"
              >
                <h3 className="text-[#265073] font-semibold mb-4">Hành động nhanh</h3>
                <div className="space-y-2">
                  <a
                    href="/jobs"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECF4D6] transition-colors"
                  >
                    <Briefcase className="w-5 h-5 text-[#2D9596]" />
                    <span className="text-[#265073]">Tìm việc mới</span>
                  </a>
                  <a
                    href="/candidate/saved-jobs"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECF4D6] transition-colors"
                  >
                    <FileText className="w-5 h-5 text-[#2D9596]" />
                    <span className="text-[#265073]">Việc đã lưu</span>
                  </a>
                  <a
                    href="/candidate/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECF4D6] transition-colors"
                  >
                    <TrendingUp className="w-5 h-5 text-[#2D9596]" />
                    <span className="text-[#265073]">Dashboard</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}