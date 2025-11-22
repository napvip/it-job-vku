"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Briefcase,
  MessageSquare,
  Calendar,
  Building2,
  Star,
  TrendingUp,
  ExternalLink,
  Trash2,
  Archive,
} from "lucide-react";

interface NotificationDetailPageProps {
  notificationId: number | null;
  onBack: () => void;
  onJobClick?: (jobId: number) => void;
  onCompanyClick?: (companyId: number) => void;
}

export function NotificationDetailPage({
  notificationId,
  onBack,
  onJobClick,
  onCompanyClick,
}: NotificationDetailPageProps) {
  // Mock data - in real app, fetch based on notificationId
  const notifications = [
    {
      id: 1,
      type: "application",
      icon: Briefcase,
      color: "#2D9596",
      title: "Hồ sơ của bạn đã được xem",
      company: "FPT Software",
      companyId: 1,
      message:
        "Nhà tuyển dụng từ FPT Software đã xem hồ sơ của bạn cho vị trí Senior Frontend Developer.",
      detailedMessage:
        "Chúc mừng! Hồ sơ của bạn đã thu hút sự quan tâm từ nhà tuyển dụng. Đây là một tín hiệu tích cực cho thấy kỹ năng và kinh nghiệm của bạn phù hợp với yêu cầu công việc.",
      jobTitle: "Senior Frontend Developer",
      jobId: 1,
      timestamp: "10 phút trước",
      fullTimestamp: "14:30, 21/11/2024",
      read: false,
      actions: [
        {
          label: "Xem công việc",
          type: "primary",
          action: "view-job",
        },
        {
          label: "Xem công ty",
          type: "secondary",
          action: "view-company",
        },
      ],
      tips: [
        "Hãy chuẩn bị sẵn CV và portfolio để phản hồi nhanh nếu nhà tuyển dụng liên hệ",
        "Kiểm tra email và tin nhắn thường xuyên trong vài ngày tới",
        "Tìm hiểu kỹ về công ty và vị trí để chuẩn bị cho phỏng vấn",
      ],
      stats: {
        viewCount: 3,
        companyViews: "FPT Software đã xem hồ sơ của bạn 3 lần",
      },
    },
    {
      id: 2,
      type: "interview",
      icon: Calendar,
      color: "#FF9A3C",
      title: "Lịch phỏng vấn mới",
      company: "VinTech AI",
      companyId: 2,
      message:
        "Bạn có lịch phỏng vấn vào 25/11/2024 lúc 14:00 với VinTech AI.",
      detailedMessage:
        "Chúc mừng bạn đã vượt qua vòng sơ tuyển! Nhà tuyển dụng muốn gặp bạn để tìm hiểu thêm về kinh nghiệm và kỹ năng của bạn.",
      jobTitle: "AI Engineer",
      jobId: 2,
      timestamp: "1 giờ trước",
      fullTimestamp: "13:00, 21/11/2024",
      read: true,
      interviewDetails: {
        date: "25/11/2024",
        time: "14:00 - 15:30",
        location: "Tầng 15, Tòa nhà VinTech, Quận 1, TP.HCM",
        type: "Phỏng vấn trực tiếp",
        interviewers: ["Ms. Nguyễn Thị Lan - HR Manager", "Mr. Trần Văn Nam - Tech Lead"],
        agenda: [
          "Giới thiệu bản thân (10 phút)",
          "Technical interview (45 phút)",
          "Q&A và thảo luận salary (15 phút)",
        ],
        notes: "Vui lòng mang theo CMND/CCCD, bằng cấp và portfolio",
      },
      actions: [
        {
          label: "Xác nhận tham gia",
          type: "primary",
          action: "confirm",
        },
        {
          label: "Xem chi tiết",
          type: "secondary",
          action: "view-interview",
        },
        {
          label: "Đổi lịch",
          type: "outline",
          action: "reschedule",
        },
      ],
      tips: [
        "Chuẩn bị câu trả lời cho các câu hỏi phỏng vấn phổ biến",
        "Nghiên cứu kỹ về công ty và sản phẩm của họ",
        "Đến sớm 10-15 phút để tạo ấn tượng tốt",
        "Mặc trang phục chuyên nghiệp",
      ],
      preparation: {
        checklist: [
          { item: "In CV và portfolio", done: false },
          { item: "Chuẩn bị câu hỏi cho interviewer", done: false },
          { item: "Nghiên cứu về công ty", done: true },
          { item: "Kiểm tra địa điểm phỏng vấn", done: false },
        ],
      },
    },
    {
      id: 3,
      type: "message",
      icon: MessageSquare,
      color: "#265073",
      title: "Tin nhắn mới từ nhà tuyển dụng",
      company: "TechViet Solutions",
      companyId: 3,
      message: "Ms. Hương đã gửi tin nhắn cho bạn",
      detailedMessage:
        "Nhà tuyển dụng quan tâm đến hồ sơ của bạn và muốn trao đổi thêm về cơ hội nghề nghiệp.",
      messagePreview:
        "Chào bạn, chúng tôi rất ấn tượng với kinh nghiệm của bạn. Bạn có thời gian để trao đổi thêm về vị trí Backend Developer không?",
      timestamp: "2 giờ trước",
      fullTimestamp: "12:00, 21/11/2024",
      read: false,
      actions: [
        {
          label: "Trả lời tin nhắn",
          type: "primary",
          action: "reply",
        },
        {
          label: "Xem hồ sơ công ty",
          type: "secondary",
          action: "view-company",
        },
      ],
    },
    {
      id: 4,
      type: "job-match",
      icon: Star,
      color: "#2D9596",
      title: "Việc làm mới phù hợp với bạn",
      company: "Multiple Companies",
      message: "AI đã tìm thấy 5 việc làm phù hợp 95% với kỹ năng của bạn",
      detailedMessage:
        "Dựa trên phân tích hồ sơ và kỹ năng của bạn, hệ thống AI đã tìm thấy những cơ hội việc làm có độ phù hợp cao.",
      timestamp: "3 giờ trước",
      fullTimestamp: "11:00, 21/11/2024",
      read: false,
      matchedJobs: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "FPT Software",
          salary: "30-50 triệu",
          match: 95,
        },
        {
          id: 2,
          title: "React Developer",
          company: "VNG Corporation",
          salary: "25-45 triệu",
          match: 92,
        },
        {
          id: 3,
          title: "Full-stack Developer",
          company: "Tiki",
          salary: "35-60 triệu",
          match: 90,
        },
      ],
      actions: [
        {
          label: "Xem tất cả việc làm",
          type: "primary",
          action: "view-jobs",
        },
      ],
    },
    {
      id: 5,
      type: "status",
      icon: TrendingUp,
      color: "#2D9596",
      title: "Cập nhật trạng thái ứng tuyển",
      company: "Cloud Solutions",
      companyId: 4,
      message:
        "Đơn ứng tuyển của bạn đã chuyển sang vòng phỏng vấn kỹ thuật",
      detailedMessage:
        "Chúc mừng! Bạn đã vượt qua vòng sơ tuyển. Hồ sơ của bạn đã được chuyển đến phòng kỹ thuật để đánh giá chi tiết.",
      jobTitle: "DevOps Engineer",
      jobId: 5,
      timestamp: "5 giờ trước",
      fullTimestamp: "09:00, 21/11/2024",
      read: true,
      statusTimeline: [
        {
          status: "Đã nộp hồ sơ",
          date: "18/11/2024",
          completed: true,
        },
        {
          status: "Hồ sơ đang được xem xét",
          date: "19/11/2024",
          completed: true,
        },
        {
          status: "Vượt qua vòng sơ tuyển",
          date: "21/11/2024",
          completed: true,
          current: true,
        },
        {
          status: "Phỏng vấn kỹ thuật",
          date: "Chưa xác định",
          completed: false,
        },
        {
          status: "Phỏng vấn với CEO",
          date: "Chưa xác định",
          completed: false,
        },
      ],
      actions: [
        {
          label: "Xem chi tiết đơn",
          type: "primary",
          action: "view-application",
        },
        {
          label: "Chuẩn bị phỏng vấn",
          type: "secondary",
          action: "prepare",
        },
      ],
      nextSteps: [
        "Nhà tuyển dụng sẽ liên hệ để sắp xếp lịch phỏng vấn trong 2-3 ngày tới",
        "Hãy chuẩn bị về kiến thức DevOps, Docker, Kubernetes",
        "Xem lại portfolio và các dự án đã làm",
      ],
    },
  ];

  const notification = notifications.find((n) => n.id === notificationId);

  if (!notification) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[#265073] text-2xl mb-4">
            Không tìm thấy thông báo
          </h2>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const Icon = notification.icon;

  const handleAction = (action: string) => {
    switch (action) {
      case "view-job":
        if (notification.jobId && onJobClick) {
          onJobClick(notification.jobId);
        }
        break;
      case "view-company":
        if (notification.companyId && onCompanyClick) {
          onCompanyClick(notification.companyId);
        }
        break;
      case "view-interview":
        // Navigate to interviews page
        break;
      case "reply":
        // Navigate to messages
        break;
      default:
        console.log("Action:", action);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#9AD0C2]">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#265073] hover:text-[#2D9596] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại thông báo
          </button>

          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${notification.color}20` }}
            >
              <Icon className="w-7 h-7" style={{ color: notification.color }} />
            </div>
            <div className="flex-1">
              <h1 className="text-[#265073] text-2xl mb-2">
                {notification.title}
              </h1>
              {notification.company && (
                <div className="flex items-center gap-2 text-[#265073]/70 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>{notification.company}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[#265073]/50 text-sm">
                <Clock className="w-4 h-4" />
                <span>{notification.fullTimestamp}</span>
              </div>
            </div>

            {!notification.read && (
              <span className="px-3 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                Mới
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-6"
        >
          <h2 className="text-[#265073] text-xl mb-4">Chi tiết thông báo</h2>
          <p className="text-[#265073] mb-4">{notification.message}</p>
          {notification.detailedMessage && (
            <div className="p-4 bg-[#ECF4D6] rounded-xl">
              <p className="text-[#265073]/80">{notification.detailedMessage}</p>
            </div>
          )}

          {/* Message Preview */}
          {notification.messagePreview && (
            <div className="mt-4 p-4 bg-[#F0F9FF] border-l-4 border-[#2D9596] rounded-lg">
              <p className="text-[#265073] italic">
                "{notification.messagePreview}"
              </p>
            </div>
          )}

          {/* Job Title */}
          {notification.jobTitle && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-[#ECF4D6] rounded-lg">
              <Briefcase className="w-5 h-5 text-[#2D9596]" />
              <span className="text-[#265073]">
                Vị trí: <strong>{notification.jobTitle}</strong>
              </span>
            </div>
          )}
        </motion.div>

        {/* Interview Details */}
        {notification.interviewDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-6"
          >
            <h2 className="text-[#265073] text-xl mb-6">
              Thông tin phỏng vấn
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-[#ECF4D6] rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#2D9596]" />
                  <span className="text-[#265073]/70 text-sm">Ngày giờ</span>
                </div>
                <p className="text-[#265073]">
                  {notification.interviewDetails.date}
                </p>
                <p className="text-[#2D9596]">
                  {notification.interviewDetails.time}
                </p>
              </div>

              <div className="p-4 bg-[#ECF4D6] rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-[#2D9596]" />
                  <span className="text-[#265073]/70 text-sm">Địa điểm</span>
                </div>
                <p className="text-[#265073]">
                  {notification.interviewDetails.location}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[#265073] mb-3">Người phỏng vấn</h3>
              <div className="space-y-2">
                {notification.interviewDetails.interviewers.map(
                  (interviewer, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-[#ECF4D6] rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-full flex items-center justify-center text-white">
                        {interviewer.charAt(0)}
                      </div>
                      <span className="text-[#265073]">{interviewer}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[#265073] mb-3">Nội dung phỏng vấn</h3>
              <div className="space-y-2">
                {notification.interviewDetails.agenda.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-[#ECF4D6] rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                    <span className="text-[#265073]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {notification.interviewDetails.notes && (
              <div className="p-4 bg-[#FFF4E6] border-l-4 border-[#FF9A3C] rounded-lg">
                <p className="text-[#265073]">
                  <strong>Lưu ý:</strong> {notification.interviewDetails.notes}
                </p>
              </div>
            )}

            {/* Preparation Checklist */}
            {notification.preparation && (
              <div className="mt-6">
                <h3 className="text-[#265073] mb-3">Checklist chuẩn bị</h3>
                <div className="space-y-2">
                  {notification.preparation.checklist.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-3 bg-[#ECF4D6] rounded-lg cursor-pointer hover:bg-[#9AD0C2]/30 transition-colors"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={item.done}
                        className="w-5 h-5 text-[#2D9596] rounded accent-[#2D9596]"
                      />
                      <span
                        className={`text-[#265073] ${item.done ? "line-through opacity-70" : ""}`}
                      >
                        {item.item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Status Timeline */}
        {notification.statusTimeline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-6"
          >
            <h2 className="text-[#265073] text-xl mb-6">
              Tiến trình ứng tuyển
            </h2>

            <div className="space-y-4">
              {notification.statusTimeline.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-[#2D9596] text-white"
                          : "bg-[#ECF4D6] text-[#265073]/50"
                      } ${step.current ? "ring-4 ring-[#2D9596]/30" : ""}`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <div className="w-3 h-3 bg-[#265073]/30 rounded-full" />
                      )}
                    </div>
                    {index < notification.statusTimeline.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${step.completed ? "bg-[#2D9596]" : "bg-[#ECF4D6]"}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h3
                      className={`text-[#265073] mb-1 ${step.current ? "font-bold" : ""}`}
                    >
                      {step.status}
                    </h3>
                    <p className="text-[#265073]/70 text-sm">{step.date}</p>
                    {step.current && (
                      <span className="inline-block mt-2 px-3 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                        Hiện tại
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Matched Jobs */}
        {notification.matchedJobs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-6"
          >
            <h2 className="text-[#265073] text-xl mb-6">
              Việc làm phù hợp với bạn
            </h2>

            <div className="space-y-4">
              {notification.matchedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onJobClick?.(job.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-[#265073] mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-[#265073]/70">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl text-[#2D9596]">
                        {job.match}%
                      </div>
                      <div className="text-xs text-[#265073]/70">Phù hợp</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-[#2D9596]" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tips */}
        {notification.tips && notification.tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-6"
          >
            <h2 className="text-[#265073] text-xl mb-4">
              Gợi ý từ hệ thống
            </h2>
            <div className="space-y-3">
              {notification.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-[#ECF4D6] rounded-lg"
                >
                  <div className="w-6 h-6 bg-[#2D9596] rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-[#265073]">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        {notification.nextSteps && notification.nextSteps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-8 shadow-lg mb-6 text-white"
          >
            <h2 className="text-xl mb-4">Bước tiếp theo</h2>
            <div className="space-y-3">
              {notification.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats */}
        {notification.stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-6"
          >
            <h2 className="text-[#265073] text-xl mb-4">Thống kê</h2>
            <div className="p-4 bg-[#ECF4D6] rounded-xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#2D9596]" />
                <div>
                  <div className="text-2xl text-[#2D9596]">
                    {notification.stats.viewCount}
                  </div>
                  <p className="text-[#265073]/70 text-sm">
                    {notification.stats.companyViews}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        {notification.actions && notification.actions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-6"
          >
            <h2 className="text-[#265073] text-xl mb-4">Hành động</h2>
            <div className="flex flex-wrap gap-3">
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(action.action)}
                  className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                    action.type === "primary"
                      ? "bg-[#2D9596] text-white hover:bg-[#265073]"
                      : action.type === "secondary"
                        ? "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
                        : "border-2 border-[#9AD0C2] text-[#265073] hover:bg-[#ECF4D6]"
                  }`}
                >
                  {action.label}
                  <ExternalLink className="w-4 h-4" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Notification Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#ECF4D6] rounded-2xl p-6"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-4 py-2 bg-white text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-colors flex items-center gap-2">
              <Archive className="w-4 h-4" />
              Lưu trữ
            </button>
            <button className="px-4 py-2 bg-white text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Xóa thông báo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

