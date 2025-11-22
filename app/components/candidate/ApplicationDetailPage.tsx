"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Eye,
  FileText,
  Download,
  MessageSquare,
  Video,
  AlertCircle,
  StickyNote,
  X,
  ExternalLink,
  Sparkles,
  Send,
  Check,
} from "lucide-react";

interface ApplicationDetailPageProps {
  applicationId?: number;
  onBack?: () => void;
  onJobClick?: (jobId: number) => void;
}

export function ApplicationDetailPage({
  applicationId = 1,
  onBack,
  onJobClick,
}: ApplicationDetailPageProps) {
  const [showCVPreview, setShowCVPreview] = useState(false);
  const [personalNotes, setPersonalNotes] = useState(
    "Chuẩn bị câu hỏi về tech stack và quy trình phát triển sản phẩm."
  );
  const [newMessage, setNewMessage] = useState("");

  // Mock application data
  const application = {
    id: 1,
    jobTitle: "Senior Frontend Developer (ReactJS)",
    company: "TechViet Solutions",
    companyLogo: "🏢",
    location: "Hà Nội",
    salary: "$2000 - $3500",
    workType: "Hybrid",
    appliedDate: "12/10/2025",
    appliedTime: "10:35 AM",
    status: "interview",
    statusText: "Mời phỏng vấn",
    jobId: 1,
    cv: {
      fileName: "NguyenVanAn_Frontend_CV.pdf",
      fileType: "PDF",
      fileSize: "245 KB",
      uploadDate: "12/10/2025",
    },
    interview: {
      date: "25/10/2025",
      time: "14:00",
      format: "Online",
      platform: "Google Meet",
      meetLink: "https://meet.google.com/abc-defg-hij",
      interviewer: "Nguyễn Thị Lan - Technical Lead",
      notes: "Vui lòng chuẩn bị trước về kinh nghiệm ReactJS và portfolio.",
      confirmed: false,
    },
    hrMessages: [
      {
        id: 1,
        from: "HR TechViet",
        message:
          "Chào bạn! Chúng tôi rất ấn tượng với hồ sơ của bạn. Chúng tôi muốn mời bạn tham gia phỏng vấn vòng Technical.",
        time: "20/10/2025 09:30",
        isHR: true,
      },
      {
        id: 2,
        from: "Bạn",
        message: "Cảm ơn anh/chị! Em rất vui được tham gia phỏng vấn.",
        time: "20/10/2025 10:15",
        isHR: false,
      },
    ],
  };

  // Timeline steps
  const timelineSteps = [
    {
      id: 1,
      title: "Ứng viên nộp hồ sơ",
      description: `Đã nộp CV vào ${application.appliedDate} - ${application.appliedTime}`,
      time: application.appliedDate,
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: "Nhà tuyển dụng đã xem CV",
      description: "CV của bạn đã được xem bởi HR Team",
      time: "13/10/2025",
      completed: true,
      current: false,
    },
    {
      id: 3,
      title: "Đang xem xét hồ sơ",
      description: "Hồ sơ đang được đánh giá bởi Technical Team",
      time: "15/10/2025",
      completed: true,
      current: false,
    },
    {
      id: 4,
      title: "Mời phỏng vấn",
      description: "Bạn đã được mời tham gia phỏng vấn vòng Technical",
      time: "20/10/2025",
      completed: true,
      current: true,
    },
    {
      id: 5,
      title: "Phỏng vấn",
      description: "Dự kiến: 25/10/2025 - 14:00",
      time: "",
      completed: false,
      current: false,
    },
    {
      id: 6,
      title: "Phản hồi kết quả",
      description: "Chờ kết quả từ nhà tuyển dụng",
      time: "",
      completed: false,
      current: false,
    },
  ];

  const getStatusBadge = () => {
    const styles: Record<
      string,
      { bg: string; text: string; icon: any }
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
        bg: "bg-white border-2 border-[#2D9596]",
        text: "text-[#2D9596]",
        icon: AlertCircle,
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
        icon: X,
      },
    };

    return styles[application.status] || styles.pending;
  };

  const statusStyle = getStatusBadge();
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* ========== HEADER ========== */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {onBack && (
              <button
                onClick={onBack}
                className="mb-4 text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2"
              >
                ← Quay lại danh sách
              </button>
            )}
            <h1 className="text-[#265073] text-4xl mb-3">
              Chi tiết đơn ứng tuyển
            </h1>
            <p className="text-[#2D9596] text-lg">
              Theo dõi trạng thái và tiến trình xử lý hồ sơ của bạn.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ========== LEFT COLUMN (2/3) ========== */}
          <div className="lg:col-span-2 space-y-6">
            {/* CARD 1: JOB OVERVIEW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8 shadow-sm"
            >
              <div className="flex gap-6">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-2xl flex items-center justify-center text-3xl">
                    {application.companyLogo}
                  </div>
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <h2 className="text-[#265073] text-2xl mb-3">
                    {application.jobTitle}
                  </h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#2D9596]">
                      <Building2 className="w-4 h-4" />
                      <span>{application.company}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-[#265073]">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{application.location}</span>
                      </div>
                      <span className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">
                        {application.salary}
                      </span>
                      <span className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm">
                        {application.workType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#265073]/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Bạn đã ứng tuyển: {application.appliedDate} -{" "}
                        {application.appliedTime}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                  >
                    <StatusIcon className="w-5 h-5" />
                    <span>{application.statusText}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: APPLICATION TIMELINE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8 shadow-sm"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2D9596]" />
                Timeline xử lý hồ sơ
              </h3>

              <div className="space-y-6">
                {timelineSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          step.completed
                            ? "bg-[#2D9596] text-white"
                            : step.current
                            ? "bg-[#2D9596] text-white ring-4 ring-[#2D9596]/20 animate-pulse"
                            : "bg-[#9AD0C2]/30 text-[#265073]/40"
                        }`}
                      >
                        {step.completed || step.current ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-current" />
                        )}
                      </div>
                      {/* Connecting Line */}
                      {index < timelineSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2 ${
                            step.completed
                              ? "bg-[#2D9596]"
                              : "bg-[#9AD0C2]/30"
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <h4
                        className={`text-[#265073] mb-1 ${
                          step.current ? "font-semibold" : ""
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[#265073]/70 text-sm mb-1">
                        {step.description}
                      </p>
                      {step.time && (
                        <p className="text-[#2D9596] text-xs">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 3: CV SENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8 shadow-sm"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2D9596]" />
                CV đã gửi
              </h3>

              <div className="bg-[#ECF4D6] rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[#265073] mb-2">
                        {application.cv.fileName}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-[#265073]/70">
                        <span>{application.cv.fileType}</span>
                        <span>•</span>
                        <span>{application.cv.fileSize}</span>
                        <span>•</span>
                        <span>Tải lên: {application.cv.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCVPreview(true)}
                    className="px-5 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Xem CV
                  </button>
                  <button className="px-5 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Tải xuống
                  </button>
                  {application.status === "pending" && (
                    <button className="px-5 py-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
                      Tải lại CV mới
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* CARD 4: HR MESSAGES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8 shadow-sm"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#2D9596]" />
                Tin nhắn từ nhà tuyển dụng
              </h3>

              {application.hrMessages.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {application.hrMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.isHR ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                            msg.isHR
                              ? "bg-[#ECF4D6] text-[#265073]"
                              : "bg-[#2D9596] text-white"
                          }`}
                        >
                          <p className="text-sm mb-1">{msg.message}</p>
                          <p
                            className={`text-xs ${
                              msg.isHR
                                ? "text-[#265073]/60"
                                : "text-white/70"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Nhập tin nhắn của bạn..."
                      className="flex-1 px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors"
                    />
                    <button className="px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Gửi
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-[#9AD0C2] mx-auto mb-4" />
                  <p className="text-[#265073]/70 mb-4">
                    Không có tin nhắn nào từ nhà tuyển dụng.
                  </p>
                  <button className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors">
                    Mở Chat với nhà tuyển dụng
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* ========== RIGHT COLUMN (1/3) ========== */}
          <div className="space-y-6">
            {/* CARD 5: INTERVIEW SCHEDULE */}
            {application.interview && application.status === "interview" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-[#1EAD7B]/10 to-[#9AD0C2]/20 rounded-2xl border-2 border-[#1EAD7B] p-6 shadow-sm"
              >
                <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#1EAD7B]" />
                  Lịch phỏng vấn
                </h3>

                <div className="bg-white rounded-xl p-5 mb-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#265073]/60 text-sm mb-1">
                        Thời gian
                      </p>
                      <p className="text-[#265073]">
                        {application.interview.date} - {application.interview.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#265073]/60 text-sm mb-1">
                        Hình thức
                      </p>
                      <p className="text-[#265073]">
                        {application.interview.format} ({application.interview.platform})
                      </p>
                    </div>
                    {application.interview.meetLink && (
                      <div>
                        <p className="text-[#265073]/60 text-sm mb-1">
                          Link tham gia
                        </p>
                        <a
                          href={application.interview.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2D9596] hover:text-[#265073] text-sm flex items-center gap-1"
                        >
                          Tham gia cuộc họp
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="text-[#265073]/60 text-sm mb-1">
                        Người phỏng vấn
                      </p>
                      <p className="text-[#265073] text-sm">
                        {application.interview.interviewer}
                      </p>
                    </div>
                    {application.interview.notes && (
                      <div className="pt-3 border-t border-[#9AD0C2]">
                        <p className="text-[#265073]/60 text-sm mb-1">
                          Ghi chú
                        </p>
                        <p className="text-[#265073] text-sm">
                          {application.interview.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {!application.interview.confirmed && (
                  <button className="w-full px-4 py-3 bg-[#1EAD7B] text-white rounded-lg hover:bg-[#18956A] transition-colors flex items-center justify-center gap-2 mb-3">
                    <Check className="w-4 h-4" />
                    Xác nhận tham gia
                  </button>
                )}

                <button className="w-full px-4 py-2 border-2 border-[#1EAD7B] text-[#1EAD7B] rounded-lg hover:bg-white transition-colors text-sm flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Thêm vào Google Calendar
                </button>
              </motion.div>
            )}

            {/* CARD 6: PERSONAL NOTES */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-[#2D9596]" />
                Ghi chú cá nhân
              </h3>

              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Thêm ghi chú của bạn về công việc này..."
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors resize-none h-32 text-sm text-[#265073]"
              />

              <button className="mt-3 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm w-full">
                Lưu ghi chú
              </button>
            </motion.div>

            {/* Suggested Jobs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#9AD0C2]/30 to-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#2D9596]" />
                Việc làm liên quan
              </h3>

              <div className="space-y-3">
                {[
                  {
                    id: 101,
                    title: "Frontend Developer",
                    company: "VNG Corp",
                    match: 92,
                  },
                  {
                    id: 102,
                    title: "React Engineer",
                    company: "Momo",
                    match: 88,
                  },
                ].map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-white rounded-xl border border-[#9AD0C2]/50 hover:border-[#2D9596] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[#265073] text-sm flex-1">
                        {job.title}
                      </h4>
                      <span className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded-full ml-2">
                        {job.match}%
                      </span>
                    </div>
                    <p className="text-[#2D9596] text-xs">{job.company}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========== ACTION BUTTONS ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          {(application.status === "pending" ||
            application.status === "viewed") && (
            <button className="px-8 py-3 border-2 border-[#C9302C] text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors flex items-center gap-2">
              <X className="w-4 h-4" />
              Rút đơn ứng tuyển
            </button>
          )}
          <button
            onClick={() => onJobClick?.(application.jobId)}
            className="px-8 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Xem lại mô tả công việc
          </button>
          <button className="px-8 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Xem các job phù hợp khác
          </button>
        </motion.div>
      </div>

      {/* ========== CV PREVIEW MODAL ========== */}
      {showCVPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border-2 border-[#2D9596] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-[#265073] to-[#2D9596] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white text-lg">Xem trước CV</h3>
              <button
                onClick={() => setShowCVPreview(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="bg-[#ECF4D6] rounded-xl p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-20 h-20 text-[#2D9596] mx-auto mb-4" />
                  <p className="text-[#265073] text-lg mb-2">
                    {application.cv.fileName}
                  </p>
                  <p className="text-[#265073]/60 text-sm">
                    Preview CV sẽ hiển thị ở đây
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

