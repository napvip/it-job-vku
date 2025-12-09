"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Briefcase, Clock, Eye, Calendar, CheckCircle, XCircle, 
  MapPin, DollarSign, ExternalLink, ArrowRight, User, Code2, 
  Sparkles, Network, Building2
} from "lucide-react";
import { Badge } from "../ui/badge";
import { useAuth } from "../../contexts/AuthContext";
import { getCandidateApplications, getUserData, JobApplication, JobData, UserData } from "../../../lib/firebase";

interface ApplicationWithJob extends JobApplication {
  jobInfo?: JobData;
}

export function DashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const [userDataResult, applicationsResult] = await Promise.all([
          getUserData(user.uid),
          getCandidateApplications(user.uid)
        ]);
        
        setUserData(userDataResult);
        setApplications(applicationsResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Calculate stats
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const reviewedApplications = applications.filter(app => app.status === 'reviewed').length;
  const interviewApplications = applications.filter(app => app.status === 'interview').length;
  const acceptedApplications = applications.filter(app => app.status === 'accepted').length;
  const rejectedApplications = applications.filter(app => app.status === 'rejected').length;

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: typeof Clock; text: string; color: string; bgColor: string }> = {
      pending: { icon: Clock, text: "Chờ duyệt", color: "#F59E0B", bgColor: "#FEF3C7" },
      reviewed: { icon: Eye, text: "Đã xem CV", color: "#3B82F6", bgColor: "#DBEAFE" },
      interview: { icon: Calendar, text: "Mời phỏng vấn", color: "#10B981", bgColor: "#D1FAE5" },
      accepted: { icon: CheckCircle, text: "Được nhận", color: "#22C55E", bgColor: "#DCFCE7" },
      rejected: { icon: XCircle, text: "Từ chối", color: "#EF4444", bgColor: "#FEE2E2" },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    if (!salary) return "Thỏa thuận";
    const format = (n: number) => n >= 1000000 
      ? `${(n / 1000000).toFixed(0)}tr`
      : `${(n / 1000).toFixed(0)}k`;
    return `${format(salary.min)} - ${format(salary.max)} ${salary.currency}`;
  };

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
      {/* Welcome Section */}
      <div className="bg-[#ECF4D6] border-b border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-[#265073] mb-3">
                Xin chào, {userData?.displayName || user?.email?.split('@')[0] || 'Ứng viên'}! 👋
              </h1>
              <p className="text-[#2D9596] text-xl">
                Hôm nay là một ngày tuyệt vời để khám phá cơ hội mới trong ngành IT.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-36 h-36"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full flex items-center justify-center shadow-xl">
                  <Code2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#9AD0C2] rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-[#265073]" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#9AD0C2] rounded-full flex items-center justify-center shadow-lg">
                  <Network className="w-5 h-5 text-[#265073]" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Tổng đơn ứng tuyển", value: totalApplications, icon: FileText, color: "#2D9596" },
            { label: "Chờ duyệt", value: pendingApplications, icon: Clock, color: "#F59E0B" },
            { label: "Đã xem CV", value: reviewedApplications, icon: Eye, color: "#3B82F6" },
            { label: "Mời phỏng vấn", value: interviewApplications, icon: Calendar, color: "#10B981" },
            { label: "Được nhận", value: acceptedApplications, icon: CheckCircle, color: "#22C55E" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border-2 border-[#9AD0C2] rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-[#2D9596]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#265073]">{stat.value}</div>
                  <div className="text-sm text-[#2D9596]">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border-2 border-[#9AD0C2] rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-[#265073] mb-4">Tổng quan trạng thái đơn ứng tuyển</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Chờ duyệt", count: pendingApplications, color: "#F59E0B" },
              { label: "Đã xem CV", count: reviewedApplications, color: "#3B82F6" },
              { label: "Mời phỏng vấn", count: interviewApplications, color: "#10B981" },
              { label: "Được nhận", count: acceptedApplications, color: "#22C55E" },
              { label: "Từ chối", count: rejectedApplications, color: "#EF4444" },
            ].map((status) => (
              <div
                key={status.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: `${status.color}15` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }} />
                <span className="text-sm text-[#265073]">{status.label}:</span>
                <span className="font-semibold" style={{ color: status.color }}>{status.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white border-2 border-[#9AD0C2] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2D9596]/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#2D9596]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#265073]">Đơn ứng tuyển của bạn</h2>
                <p className="text-[#2D9596]">{totalApplications} đơn ứng tuyển</p>
              </div>
            </div>
            <a
              href="/candidate/applications"
              className="text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2 group"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#265073] mb-2">Chưa có đơn ứng tuyển</h3>
              <p className="text-[#2D9596] mb-4">Bắt đầu tìm kiếm và ứng tuyển vào các công việc phù hợp</p>
              <a
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2D9596] to-[#265073] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Briefcase className="w-5 h-5" />
                Tìm việc làm
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((app, index) => {
                const statusConfig = getStatusConfig(app.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#ECF4D6] border border-[#9AD0C2] rounded-xl p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-[#2D9596]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-[#265073] mb-1">
                              {app.jobInfo?.title || 'Vị trí công việc'}
                            </h4>
                            <p className="text-[#2D9596]">{app.jobInfo?.company || 'Công ty'}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#265073]/70 mt-3">
                          {app.jobInfo?.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{app.jobInfo.location}</span>
                            </div>
                          )}
                          {app.jobInfo?.salary && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{formatSalary(app.jobInfo.salary)}</span>
                            </div>
                          )}
                          {app.jobInfo?.type && (
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{app.jobInfo.type}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Badge
                          style={{
                            backgroundColor: statusConfig.bgColor,
                            color: statusConfig.color,
                            border: `1px solid ${statusConfig.color}20`
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5"
                        >
                          <StatusIcon className="w-4 h-4" />
                          <span>{statusConfig.text}</span>
                        </Badge>
                        
                        <div className="text-sm text-[#265073]/60">
                          Ứng tuyển: {formatDate(app.appliedAt)}
                        </div>

                        {app.jobInfo && (
                          <a
                            href={`/job/${app.jobId}`}
                            className="p-2 bg-[#2D9596]/10 rounded-lg hover:bg-[#2D9596]/20 transition-colors"
                            title="Xem chi tiết công việc"
                          >
                            <ExternalLink className="w-4 h-4 text-[#2D9596]" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Tìm việc làm", href: "/jobs", icon: Briefcase, description: "Khám phá cơ hội mới" },
            { label: "Hồ sơ cá nhân", href: "/candidate/profile", icon: User, description: "Cập nhật thông tin" },
            { label: "Việc đã lưu", href: "/candidate/saved-jobs", icon: FileText, description: "Xem việc đã lưu" },
            { label: "Tin nhắn", href: "/candidate/messages", icon: Eye, description: "Liên hệ nhà tuyển dụng" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-4 p-4 bg-white border-2 border-[#9AD0C2] rounded-xl hover:shadow-lg hover:border-[#2D9596] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#2D9596]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2D9596]/20 transition-colors">
                <action.icon className="w-6 h-6 text-[#2D9596]" />
              </div>
              <div>
                <div className="font-semibold text-[#265073] group-hover:text-[#2D9596] transition-colors">
                  {action.label}
                </div>
                <div className="text-sm text-[#2D9596]/70">{action.description}</div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

