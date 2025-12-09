"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Calendar,
  MessageCircle,
  ChevronRight,
  Clock,
  Plus,
  FileText,
} from "lucide-react";
import { 
  auth, 
  getCompanyJobs, 
  getEmployerApplications,
  JobData,
  JobApplication,
  UserData
} from "@/lib/firebase";

type ApplicationWithInfo = JobApplication & { jobInfo?: JobData; candidateInfo?: UserData };

export function EmployerDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [applications, setApplications] = useState<ApplicationWithInfo[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadData(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadData = async (userId: string) => {
    try {
      setLoading(true);
      
      // Load jobs
      const fetchedJobs = await getCompanyJobs(userId);
      setJobs(fetchedJobs);

      // Load applications
      const fetchedApps = await getEmployerApplications(userId);
      setApplications(fetchedApps);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const stats = {
    activeJobs: jobs.filter(j => j.status === "active").length,
    totalJobs: jobs.length,
    totalApplicants: applications.length,
    pendingApplicants: applications.filter(a => a.status === "pending").length,
    interviewApplicants: applications.filter(a => a.status === "interview").length,
    acceptedApplicants: applications.filter(a => a.status === "accepted").length,
    rejectedApplicants: applications.filter(a => a.status === "rejected").length,
  };

  // Recent applications (last 5)
  const recentApplications = applications.slice(0, 5);

  // Active jobs with applicant count
  const activeJobsWithApplicants = jobs
    .filter(j => j.status === "active")
    .slice(0, 5);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "reviewing": return "bg-blue-100 text-blue-700";
      case "interview": return "bg-purple-100 text-purple-700";
      case "accepted": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Chờ xem xét";
      case "reviewing": return "Đang xem xét";
      case "interview": return "Phỏng vấn";
      case "accepted": return "Đã nhận";
      case "rejected": return "Từ chối";
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px]">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-[#265073] text-2xl font-bold mb-1">
                Dashboard tuyển dụng
              </h1>
              <p className="text-[#2D9596]">
                Tổng quan hoạt động tuyển dụng của bạn
              </p>
            </div>
            <button
              onClick={() => router.push("/employer/create-job")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Đăng tin mới
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#2D9596]/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#2D9596]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#265073]">{stats.activeJobs}</div>
            <div className="text-sm text-[#265073]/70">Tin đang tuyển</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#265073]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#265073]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#265073]">{stats.totalApplicants}</div>
            <div className="text-sm text-[#265073]/70">Tổng ứng viên</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#265073]">{stats.pendingApplicants}</div>
            <div className="text-sm text-[#265073]/70">Chờ xem xét</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-[#265073]">{stats.interviewApplicants}</div>
            <div className="text-sm text-[#265073]/70">Lịch phỏng vấn</div>
          </motion.div>
        </div>

        {/* Application Status Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2] mb-6"
        >
          <h2 className="text-[#265073] font-semibold mb-4">Trạng thái ứng viên</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-[#265073]">Chờ xem xét: {stats.pendingApplicants}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-[#265073]">Phỏng vấn: {stats.interviewApplicants}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-[#265073]">Đã nhận: {stats.acceptedApplicants}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-[#265073]">Từ chối: {stats.rejectedApplicants}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border-2 border-[#9AD0C2]"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#9AD0C2]/30">
              <h2 className="text-[#265073] font-semibold">Tin tuyển dụng đang hoạt động</h2>
              <button
                onClick={() => router.push("/employer/jobs")}
                className="text-sm text-[#2D9596] hover:text-[#265073] flex items-center gap-1"
              >
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              {activeJobsWithApplicants.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-[#9AD0C2] mx-auto mb-3" />
                  <p className="text-[#265073]/70 mb-4">Bạn chưa có tin tuyển dụng nào</p>
                  <button
                    onClick={() => router.push("/employer/create-job")}
                    className="text-[#2D9596] hover:text-[#265073] text-sm font-medium"
                  >
                    Đăng tin ngay →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeJobsWithApplicants.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => router.push(`/employer/applicant/${job.id}`)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[#ECF4D6] cursor-pointer transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-[#265073] font-medium text-sm">{job.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-[#265073]/60 mt-1">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>Đăng: {formatDate(job.createdAt)}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#2D9596]">{job.applicants || 0}</div>
                        <div className="text-xs text-[#265073]/60">ứng viên</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border-2 border-[#9AD0C2]"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#9AD0C2]/30">
              <h2 className="text-[#265073] font-semibold">Ứng viên mới nhất</h2>
              <button
                onClick={() => router.push("/employer/applicants")}
                className="text-sm text-[#2D9596] hover:text-[#265073] flex items-center gap-1"
              >
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              {recentApplications.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-[#9AD0C2] mx-auto mb-3" />
                  <p className="text-[#265073]/70">Chưa có ứng viên nào</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => router.push(`/employer/applicant/${app.jobId}`)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECF4D6] cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white font-medium text-sm shrink-0">
                        {app.candidateName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#265073] font-medium text-sm truncate">{app.candidateName}</h3>
                        <p className="text-xs text-[#265073]/60 truncate">
                          {app.jobInfo?.title || "Vị trí không xác định"}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                          {getStatusText(app.status)}
                        </span>
                        <p className="text-xs text-[#265073]/50 mt-1">{formatTimeAgo(app.appliedAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-white rounded-xl p-5 border-2 border-[#9AD0C2]"
        >
          <h2 className="text-[#265073] font-semibold mb-4">Thao tác nhanh</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/employer/create-job")}
              className="flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Đăng tin mới
            </button>
            <button
              onClick={() => router.push("/employer/jobs")}
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors text-sm"
            >
              <FileText className="w-4 h-4" />
              Quản lý tin
            </button>
            <button
              onClick={() => router.push("/employer/applicants")}
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#265073] hover:text-white transition-colors text-sm"
            >
              <Users className="w-4 h-4" />
              Xem ứng viên
            </button>
            <button
              onClick={() => router.push("/employer/messages")}
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Tin nhắn
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

