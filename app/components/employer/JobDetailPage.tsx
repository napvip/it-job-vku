"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Briefcase,
  Edit,
  Pause,
  Play,
  XCircle,
  Eye,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";
import { getJob, updateJob, deleteJob, auth, JobData } from "../../../lib/firebase";

interface JobDetailPageProps {
  jobId: string;
}

export function JobDetailPage({ jobId }: JobDetailPageProps) {
  const router = useRouter();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      const fetchedJob = await getJob(jobId);
      if (!fetchedJob) {
        alert("Không tìm thấy tin tuyển dụng!");
        router.push("/employer/jobs");
        return;
      }
      setJob(fetchedJob);
    } catch (error) {
      console.error("Error loading job:", error);
      alert("Có lỗi xảy ra khi tải thông tin!");
    } finally {
      setLoading(false);
    }
  };

  const handlePauseJob = async () => {
    if (!job) return;
    try {
      await updateJob(jobId, { status: "paused" });
      await loadJob();
      alert("Đã tạm dừng tin tuyển dụng!");
    } catch (error) {
      console.error("Error pausing job:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleResumeJob = async () => {
    if (!job) return;
    try {
      await updateJob(jobId, { status: "active" });
      await loadJob();
      alert("Đã tiếp tục tin tuyển dụng!");
    } catch (error) {
      console.error("Error resuming job:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleCloseJob = async () => {
    if (!confirm("Bạn có chắc chắn muốn đóng tin tuyển dụng này?")) {
      return;
    }
    try {
      await updateJob(jobId, { status: "closed" });
      await loadJob();
      alert("Đã đóng tin tuyển dụng!");
    } catch (error) {
      console.error("Error closing job:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleDeleteJob = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác!")) {
      return;
    }
    try {
      await deleteJob(jobId);
      alert("Đã xóa tin tuyển dụng!");
      router.push("/employer/jobs");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#2D9596] text-white";
      case "paused":
        return "bg-[#FFB84D] text-white";
      case "closed":
        return "bg-gray-400 text-white";
      case "draft":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang tuyển";
      case "paused":
        return "Tạm dừng";
      case "closed":
        return "Đã đóng";
      case "draft":
        return "Nháp";
      default:
        return status;
    }
  };

  const formatSalary = (job: JobData) => {
    if (job.hideSalary) {
      return "Thỏa thuận";
    }
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin}-${job.salaryMax} triệu VNĐ`;
    }
    if (job.salaryMin) {
      return `Từ ${job.salaryMin} triệu VNĐ`;
    }
    if (job.salaryMax) {
      return `Tối đa ${job.salaryMax} triệu VNĐ`;
    }
    return "Thỏa thuận";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px]">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => router.push("/employer/jobs")}
              className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại danh sách
            </button>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-[#265073] text-3xl">{job.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}>
                    {getStatusText(job.status)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-[#265073]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2D9596]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#2D9596]" />
                    <span className="capitalize">{job.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#2D9596]" />
                    <span>{formatSalary(job)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] text-center">
                <Users className="w-8 h-8 text-[#2D9596] mx-auto mb-2" />
                <div className="text-2xl text-[#265073] font-semibold">{job.applicants || 0}</div>
                <div className="text-sm text-[#265073]/70">Ứng viên</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] text-center">
                <Calendar className="w-8 h-8 text-[#2D9596] mx-auto mb-2" />
                <div className="text-2xl text-[#265073] font-semibold">{job.quantity}</div>
                <div className="text-sm text-[#265073]/70">Số lượng cần</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] text-center">
                <Clock className="w-8 h-8 text-[#2D9596] mx-auto mb-2" />
                <div className="text-2xl text-[#265073] font-semibold">{formatDate(new Date(job.deadline))}</div>
                <div className="text-sm text-[#265073]/70">Hạn nộp</div>
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
            >
              <h2 className="text-[#265073] text-xl mb-4">Mô tả công việc</h2>
              <div className="text-[#265073] whitespace-pre-wrap">{job.description}</div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
            >
              <h2 className="text-[#265073] text-xl mb-4">Yêu cầu công việc</h2>
              <div className="text-[#265073] whitespace-pre-wrap">{job.requirements}</div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
            >
              <h2 className="text-[#265073] text-xl mb-4">Quyền lợi</h2>
              <div className="text-[#265073] whitespace-pre-wrap">{job.benefits}</div>
            </motion.div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
              >
                <h2 className="text-[#265073] text-xl mb-4">Kỹ năng yêu cầu</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] space-y-3"
            >
              <h3 className="text-[#265073] mb-4">Quản lý tin tuyển dụng</h3>

              <button
                onClick={() => setShowApplicantsModal(true)}
                className="w-full px-4 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Xem ứng viên ({job.applicants || 0})
              </button>

              <button
                onClick={() => router.push(`/employer/jobs/edit/${jobId}`)}
                className="w-full px-4 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#2D9596] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Chỉnh sửa
              </button>

              {job.status === "active" && (
                <button
                  onClick={handlePauseJob}
                  className="w-full px-4 py-3 border-2 border-[#FFB84D] text-[#FFB84D] rounded-xl hover:bg-[#FFB84D] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  Tạm dừng tin
                </button>
              )}

              {job.status === "paused" && (
                <button
                  onClick={handleResumeJob}
                  className="w-full px-4 py-3 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Tiếp tục tin
                </button>
              )}

              {job.status !== "closed" && (
                <button
                  onClick={handleCloseJob}
                  className="w-full px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Đóng tin
                </button>
              )}

              <button
                onClick={handleDeleteJob}
                className="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Xóa tin
              </button>
            </motion.div>

            {/* Job Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]"
            >
              <h3 className="text-[#265073] mb-4">Thông tin chi tiết</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Hình thức:</span>
                  <span className="text-[#265073] font-medium capitalize">{job.workType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Loại hợp đồng:</span>
                  <span className="text-[#265073] font-medium">{job.contractType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Học vấn:</span>
                  <span className="text-[#265073] font-medium capitalize">{job.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Ngày đăng:</span>
                  <span className="text-[#265073] font-medium">{formatDate(job.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Cập nhật:</span>
                  <span className="text-[#265073] font-medium">{formatDate(job.updatedAt)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Applicants Modal */}
      <AnimatePresence>
        {showApplicantsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowApplicantsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#265073] text-2xl flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#2D9596]" />
                  Danh sách ứng viên - {job.title}
                </h2>
                <button
                  onClick={() => setShowApplicantsModal(false)}
                  className="text-[#265073] hover:text-[#2D9596] transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-[#ECF4D6] rounded-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl text-[#2D9596] font-semibold">{job.applicants || 0}</div>
                    <div className="text-sm text-[#265073]/70">Tổng ứng viên</div>
                  </div>
                  <div>
                    <div className="text-2xl text-green-600 font-semibold">0</div>
                    <div className="text-sm text-[#265073]/70">Đã phỏng vấn</div>
                  </div>
                  <div>
                    <div className="text-2xl text-[#265073] font-semibold">0</div>
                    <div className="text-sm text-[#265073]/70">Đã nhận việc</div>
                  </div>
                </div>
              </div>

              {/* Applicants List */}
              {(job.applicants || 0) === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
                  <p className="text-[#265073] text-lg mb-2">Chưa có ứng viên nào ứng tuyển</p>
                  <p className="text-[#265073]/70">Chia sẻ tin tuyển dụng này để tiếp cận nhiều ứng viên hơn</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[#265073] text-center py-8">
                    Chức năng quản lý ứng viên đang được phát triển...
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t-2 border-[#9AD0C2]">
                <button
                  onClick={() => setShowApplicantsModal(false)}
                  className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#2D9596] hover:text-white transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
