"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Download,
  Calendar,
  Users,
  Briefcase,
  Search,
  ChevronLeft,
  ChevronRight,
  Award,
  MessageSquare,
  MapPin,
  Mail,
  Phone,
  X,
  Send,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import {
  getJob,
  getJobApplications,
  updateApplicationStatus,
  getOrCreateConversation,
  sendMessage,
  auth,
  JobData,
  JobApplication,
  UserData,
} from "@/lib/firebase";

interface JobApplicantsPageProps {
  jobId: string;
}

type ApplicationWithInfo = JobApplication & { candidateInfo?: UserData };

export function JobApplicantsPage({ jobId }: JobApplicantsPageProps) {
  const router = useRouter();
  const [job, setJob] = useState<JobData | null>(null);
  const [applications, setApplications] = useState<ApplicationWithInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationWithInfo | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Load job info
      const jobData = await getJob(jobId);
      if (!jobData) {
        alert("Không tìm thấy tin tuyển dụng!");
        router.push("/employer/jobs");
        return;
      }
      setJob(jobData);

      // Load applications
      const apps = await getJobApplications(jobId);
      setApplications(apps);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Có lỗi xảy ra khi tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  }, [jobId, router]);

  useEffect(() => {
    if (jobId) {
      loadData();
    }
  }, [jobId, loadData]);

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchName = app.candidateName?.toLowerCase().includes(searchLower);
      const matchEmail = app.candidateEmail?.toLowerCase().includes(searchLower);
      const matchSkills = app.candidateInfo?.skills?.some((s: string) => s.toLowerCase().includes(searchLower));
      if (!matchName && !matchEmail && !matchSkills) return false;
    }

    // Status filter
    if (statusFilter !== "all" && app.status !== statusFilter) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status handlers
  const handleUpdateStatus = async (applicationId: string, newStatus: JobApplication['status']) => {
    try {
      setUpdatingStatus(applicationId);
      await updateApplicationStatus(applicationId, newStatus);
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Cập nhật trạng thái thất bại!");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // View profile
  const handleViewProfile = (app: ApplicationWithInfo) => {
    setSelectedApplication(app);
    setShowProfileModal(true);
  };

  // Open message modal
  const handleOpenMessage = (app: ApplicationWithInfo) => {
    setSelectedApplication(app);
    setMessageText("");
    setShowMessageModal(true);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!selectedApplication || !messageText.trim() || !auth.currentUser) return;

    setSendingMessage(true);
    try {
      const conversationId = await getOrCreateConversation(
        selectedApplication.candidateId,
        auth.currentUser.uid,
        jobId
      );

      await sendMessage(
        conversationId,
        auth.currentUser.uid,
        "employer",
        messageText
      );

      alert("Gửi tin nhắn thành công!");
      setShowMessageModal(false);
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Gửi tin nhắn thất bại!");
    } finally {
      setSendingMessage(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "reviewing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "interview":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "accepted":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xem xét";
      case "reviewing":
        return "Đang xem xét";
      case "interview":
        return "Mời phỏng vấn";
      case "accepted":
        return "Đã nhận";
      case "rejected":
        return "Từ chối";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "reviewing":
        return <Eye className="w-4 h-4" />;
      case "interview":
        return <Calendar className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải danh sách ứng viên...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back button */}
            <button
              onClick={() => router.push("/employer/jobs")}
              className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại danh sách tin tuyển dụng</span>
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[#265073] text-2xl font-bold mb-2">
                  Ứng viên cho: {job?.title || "Đang tải..."}
                </h1>
                <div className="flex items-center gap-4 text-[#2D9596]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {applications.length} ứng viên
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2] shadow-lg mb-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-[#2D9596]/20">
                <Users className="w-5 h-5 text-[#2D9596]" />
              </div>
              <div className="text-xl text-[#2D9596] font-bold">{applications.length}</div>
              <div className="text-xs text-[#265073]/70">Tổng ứng viên</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-yellow-100">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-xl text-yellow-600 font-bold">
                {applications.filter(a => a.status === "pending").length}
              </div>
              <div className="text-xs text-[#265073]/70">Chờ xem xét</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-purple-100">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-xl text-purple-600 font-bold">
                {applications.filter(a => a.status === "interview").length}
              </div>
              <div className="text-xs text-[#265073]/70">Phỏng vấn</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-xl text-green-600 font-bold">
                {applications.filter(a => a.status === "accepted").length}
              </div>
              <div className="text-xs text-[#265073]/70">Đã nhận</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 bg-red-100">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-xl text-red-600 font-bold">
                {applications.filter(a => a.status === "rejected").length}
              </div>
              <div className="text-xs text-[#265073]/70">Từ chối</div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2] shadow-lg mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email, kỹ năng..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none transition-colors"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xem xét</option>
                <option value="reviewing">Đang xem xét</option>
                <option value="interview">Mời phỏng vấn</option>
                <option value="accepted">Đã nhận</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-12 border-2 border-[#9AD0C2] text-center"
          >
            <Users className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
            <h3 className="text-[#265073] text-xl font-semibold mb-2">
              Chưa có ứng viên nào
            </h3>
            <p className="text-[#2D9596]">
              Tin tuyển dụng này chưa có ứng viên ứng tuyển.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Pagination Info */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-[#265073]/70">
                Hiển thị {paginatedApplications.length} / {filteredApplications.length} ứng viên
              </p>
            </div>

            <div className="space-y-4">
              {paginatedApplications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-5 border-2 border-[#9AD0C2] shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white text-xl font-bold shrink-0">
                      {app.candidateName?.charAt(0).toUpperCase() || "?"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-[#265073] font-semibold text-lg">
                            {app.candidateName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[#2D9596] mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {app.candidateEmail}
                            </span>
                            {app.candidatePhone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {app.candidatePhone}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(app.appliedAt)}
                            </span>
                          </div>
                          
                          {/* Position & Experience from candidate info */}
                          {app.candidateInfo && (
                            <div className="flex flex-wrap items-center gap-3 text-sm text-[#265073]/70 mt-2">
                              {app.candidateInfo.position && (
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-4 h-4" />
                                  {app.candidateInfo.position}
                                </span>
                              )}
                              {app.candidateInfo.experience && (
                                <span className="flex items-center gap-1">
                                  <Award className="w-4 h-4" />
                                  {app.candidateInfo.experience}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Skills */}
                          {app.candidateInfo?.skills && app.candidateInfo.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {app.candidateInfo.skills.slice(0, 5).map((skill: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-[#9AD0C2]/30 text-[#265073] rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                              {app.candidateInfo.skills.length > 5 && (
                                <span className="px-2 py-0.5 bg-[#ECF4D6] text-[#2D9596] rounded-full text-xs">
                                  +{app.candidateInfo.skills.length - 5}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Cover Letter */}
                          {app.coverLetter && (
                            <p className="text-sm text-[#265073]/70 mt-2 line-clamp-2">
                              <span className="font-medium">Thư xin việc:</span> {app.coverLetter}
                            </p>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className={`px-3 py-1.5 rounded-full border text-sm font-medium flex items-center gap-1.5 shrink-0 ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {getStatusText(app.status)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#9AD0C2]/30">
                        {/* View Profile */}
                        <button
                          onClick={() => handleViewProfile(app)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Xem hồ sơ
                        </button>

                        {/* Send Message */}
                        <button
                          onClick={() => handleOpenMessage(app)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors text-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Nhắn tin
                        </button>

                        {/* Download CV */}
                        {app.cvUrl && (
                          <a
                            href={app.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Tải CV
                          </a>
                        )}

                        {/* Status Actions */}
                        <div className="flex items-center gap-1 ml-auto">
                          {app.status !== "reviewing" && app.status !== "accepted" && app.status !== "rejected" && (
                            <button
                              onClick={() => handleUpdateStatus(app.id!, "reviewing")}
                              disabled={updatingStatus === app.id}
                              className="flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Xem xét
                            </button>
                          )}
                          {app.status !== "interview" && app.status !== "accepted" && app.status !== "rejected" && (
                            <button
                              onClick={() => handleUpdateStatus(app.id!, "interview")}
                              disabled={updatingStatus === app.id}
                              className="flex items-center gap-1 px-2 py-1 text-purple-600 hover:bg-purple-50 rounded text-xs transition-colors"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              Mời PV
                            </button>
                          )}
                          {app.status !== "accepted" && (
                            <button
                              onClick={() => handleUpdateStatus(app.id!, "accepted")}
                              disabled={updatingStatus === app.id}
                              className="flex items-center gap-1 px-2 py-1 text-green-600 hover:bg-green-50 rounded text-xs transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Nhận
                            </button>
                          )}
                          {app.status !== "rejected" && (
                            <button
                              onClick={() => handleUpdateStatus(app.id!, "rejected")}
                              disabled={updatingStatus === app.id}
                              className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Từ chối
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center gap-2 mt-6"
              >
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border-2 border-[#9AD0C2] text-[#2D9596] hover:bg-[#9AD0C2] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === pageNum
                          ? "bg-[#2D9596] text-white"
                          : "border-2 border-[#9AD0C2] text-[#2D9596] hover:bg-[#9AD0C2] hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border-2 border-[#9AD0C2] text-[#2D9596] hover:bg-[#9AD0C2] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowProfileModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-[#2D9596] to-[#265073] p-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                    {selectedApplication.candidateName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{selectedApplication.candidateName}</h2>
                    <p className="text-white/80 text-sm">
                      {selectedApplication.candidateInfo?.position || "Ứng viên"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Contact */}
                <div>
                  <h3 className="text-[#265073] font-semibold text-sm mb-2">Liên hệ</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#2D9596]">
                      <Mail className="w-4 h-4" />
                      {selectedApplication.candidateEmail}
                    </div>
                    {selectedApplication.candidatePhone && (
                      <div className="flex items-center gap-2 text-[#2D9596]">
                        <Phone className="w-4 h-4" />
                        {selectedApplication.candidatePhone}
                      </div>
                    )}
                    {selectedApplication.candidateInfo?.location && (
                      <div className="flex items-center gap-2 text-[#2D9596]">
                        <MapPin className="w-4 h-4" />
                        {selectedApplication.candidateInfo.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {selectedApplication.candidateInfo?.skills && selectedApplication.candidateInfo.skills.length > 0 && (
                  <div>
                    <h3 className="text-[#265073] font-semibold text-sm mb-2">Kỹ năng</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApplication.candidateInfo.skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#9AD0C2]/30 text-[#265073] rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cover Letter */}
                {selectedApplication.coverLetter && (
                  <div>
                    <h3 className="text-[#265073] font-semibold text-sm mb-2">Thư xin việc</h3>
                    <p className="text-sm text-[#265073]/80 bg-[#ECF4D6] p-3 rounded-lg">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                )}

                {/* Applied at */}
                <div className="pt-3 border-t border-[#9AD0C2]/30">
                  <p className="text-xs text-[#2D9596]">
                    Ứng tuyển lúc: {formatDate(selectedApplication.appliedAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      handleOpenMessage(selectedApplication);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Nhắn tin
                  </button>
                  {selectedApplication.cvUrl && (
                    <a
                      href={selectedApplication.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Xem CV
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMessageModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full"
            >
              {/* Close button */}
              <button
                onClick={() => setShowMessageModal(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Header */}
              <div className="p-4 border-b border-[#9AD0C2]/30">
                <h2 className="text-[#265073] font-bold text-lg">Gửi tin nhắn</h2>
                <p className="text-sm text-[#2D9596]">Đến: {selectedApplication.candidateName}</p>
              </div>

              {/* Content */}
              <div className="p-4">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Nhập nội dung tin nhắn..."
                  rows={4}
                  className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none resize-none text-sm"
                />

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim() || sendingMessage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    {sendingMessage ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Gửi
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
