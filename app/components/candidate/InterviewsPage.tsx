"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Video,
  Copy,
  Check,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  User,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

interface InterviewsPageProps {
  onJobClick?: (jobId: number) => void;
}

export function InterviewsPage({ onJobClick }: InterviewsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedLink, setCopiedLink] = useState<number | null>(null);

  // Mock interviews data
  const interviews = [
    {
      id: 1,
      jobId: 101,
      jobTitle: "Senior Frontend Developer (ReactJS)",
      company: "TechViet Solutions",
      companyLogo: "🏢",
      date: "25/11/2025",
      time: "14:00",
      format: "online",
      platform: "Google Meet",
      meetLink: "https://meet.google.com/abc-defg-hij",
      interviewer: {
        name: "Nguyễn Thị Lan",
        title: "Technical Lead",
        avatar: "👩‍💼",
      },
      status: "upcoming",
      statusText: "Sắp diễn ra",
      location: null,
      notes: "Vui lòng chuẩn bị trước về kinh nghiệm ReactJS và portfolio.",
      confirmed: true,
    },
    {
      id: 2,
      jobId: 102,
      jobTitle: "Full Stack Developer",
      company: "Digital Innovation Hub",
      companyLogo: "💼",
      date: "28/11/2025",
      time: "10:00",
      format: "onsite",
      platform: null,
      meetLink: null,
      interviewer: {
        name: "Trần Văn Minh",
        title: "HR Manager",
        avatar: "👨‍💼",
      },
      status: "pending",
      statusText: "Chờ xác nhận",
      location: "Tầng 8, Tòa nhà ACB, 142 Lê Duẩn, Q1, TP.HCM",
      notes: "Phỏng vấn vòng 1 với HR.",
      confirmed: false,
    },
    {
      id: 3,
      jobId: 103,
      jobTitle: "Backend Engineer (Node.js)",
      company: "Cloud Systems Vietnam",
      companyLogo: "☁️",
      date: "22/11/2025",
      time: "15:30",
      format: "online",
      platform: "Zoom",
      meetLink: "https://zoom.us/j/123456789",
      interviewer: {
        name: "Lê Hoàng Nam",
        title: "Senior Developer",
        avatar: "👨‍💻",
      },
      status: "confirmed",
      statusText: "Đã xác nhận",
      location: null,
      notes: "Technical interview - focus on Node.js, MongoDB, và system design.",
      confirmed: true,
    },
    {
      id: 4,
      jobId: 104,
      jobTitle: "UI/UX Designer",
      company: "Creative Studio",
      companyLogo: "🎨",
      date: "18/11/2025",
      time: "09:00",
      format: "hybrid",
      platform: "Google Meet",
      meetLink: "https://meet.google.com/xyz-abcd-efg",
      interviewer: {
        name: "Phạm Thu Hà",
        title: "Design Director",
        avatar: "👩‍🎨",
      },
      status: "completed",
      statusText: "Đã hoàn thành",
      location: "Tầng 5, Sailing Tower, 111A Pasteur, Q1, TP.HCM",
      notes: "Đã hoàn thành phỏng vấn. Chờ feedback.",
      confirmed: true,
    },
  ];

  // Calendar data - days with interviews
  const interviewDates = interviews.map((interview) => {
    const [day] = interview.date.split("/");
    return parseInt(day);
  });

  // AI Interview Prep suggestions
  const prepSuggestions = {
    skills: ["React Hooks", "REST API", "System Design", "Git Workflow"],
    questions: [
      "Giải thích cách hoạt động của useEffect và dependency array",
      "REST API và GraphQL khác nhau như thế nào?",
      "Làm thế nào để tối ưu performance trong React?",
      "Giải thích về Virtual DOM và reconciliation",
    ],
  };

  // Suggested jobs
  const suggestedJobs = [
    {
      id: 201,
      title: "React Developer",
      company: "StartUp AI",
      match: 95,
      logo: "🚀",
    },
    {
      id: 202,
      title: "Frontend Engineer",
      company: "E-Commerce Corp",
      match: 90,
      logo: "🛒",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: any }> = {
      pending: {
        bg: "bg-[#9AD0C2]",
        text: "text-[#265073]",
        icon: Clock,
      },
      confirmed: {
        bg: "bg-[#2D9596]",
        text: "text-white",
        icon: Check,
      },
      upcoming: {
        bg: "bg-[#1EAD7B]",
        text: "text-white",
        icon: Calendar,
      },
      completed: {
        bg: "bg-white border-2 border-[#2D9596]",
        text: "text-[#2D9596]",
        icon: Check,
      },
      declined: {
        bg: "bg-[#F6D7D7]",
        text: "text-[#C9302C]",
        icon: X,
      },
    };
    return styles[status] || styles.pending;
  };

  const handleCopyLink = (id: number, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = companyFilter
      ? interview.company.toLowerCase().includes(companyFilter.toLowerCase())
      : true;
    const matchesFormat =
      formatFilter === "all" ? true : interview.format === formatFilter;
    const matchesStatus =
      statusFilter === "all" ? true : interview.status === statusFilter;

    return matchesSearch && matchesCompany && matchesFormat && matchesStatus;
  });

  const hasInterviews = filteredInterviews.length > 0;

  // Mini Calendar
  const renderMiniCalendar = () => {
    const daysInMonth = 30;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 gap-2">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
          <div
            key={day}
            className="text-center text-xs text-[#265073]/60 py-1"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const hasInterview = interviewDates.includes(day);
          return (
            <div
              key={day}
              className={`text-center py-2 text-sm rounded-lg relative ${
                hasInterview
                  ? "bg-[#2D9596] text-white font-semibold"
                  : "text-[#265073]/70 hover:bg-[#ECF4D6]"
              }`}
            >
              {day}
              {hasInterview && (
                <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* ========== HEADER ========== */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#265073] text-4xl mb-3">Lịch phỏng vấn</h1>
            <p className="text-[#2D9596] text-lg">
              Theo dõi lịch phỏng vấn sắp tới và thông tin chi tiết từ nhà
              tuyển dụng.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ========== FILTER BAR ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Job */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Tên công việc
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Công ty
              </label>
              <input
                type="text"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                placeholder="Tên công ty..."
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              />
            </div>

            {/* Format */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Hình thức
              </label>
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              >
                <option value="all">Tất cả</option>
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              >
                <option value="all">Tất cả</option>
                <option value="upcoming">Sắp diễn ra</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-2">
              <button className="flex-1 px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
                Áp dụng
              </button>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCompanyFilter("");
                  setFormatFilter("all");
                  setStatusFilter("all");
                }}
                className="px-4 py-2 text-[#2D9596] hover:text-[#265073] transition-colors"
              >
                Xóa lọc
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ========== LEFT COLUMN (2/3) - INTERVIEW LIST ========== */}
          <div className="lg:col-span-2 space-y-6">
            {hasInterviews ? (
              <>
                {filteredInterviews.map((interview, index) => {
                  const statusStyle = getStatusBadge(interview.status);
                  const StatusIcon = statusStyle.icon;

                  return (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
                    >
                      <div className="flex gap-6">
                        {/* LEFT - Job Info */}
                        <div className="flex-1">
                          {/* Company Logo */}
                          <div className="w-14 h-14 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-2xl flex items-center justify-center text-2xl mb-4">
                            {interview.companyLogo}
                          </div>

                          {/* Job Title */}
                          <h3 className="text-[#265073] text-xl mb-2 hover:text-[#2D9596] cursor-pointer transition-colors">
                            {interview.jobTitle}
                          </h3>

                          {/* Company */}
                          <div className="flex items-center gap-2 text-[#2D9596] mb-3">
                            <Building2 className="w-4 h-4" />
                            <span>{interview.company}</span>
                          </div>

                          {/* Location (if onsite) */}
                          {interview.location && (
                            <div className="flex items-start gap-2 text-[#265073] text-sm mb-4">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{interview.location}</span>
                            </div>
                          )}

                          {/* Interviewer */}
                          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#9AD0C2]">
                            <div className="w-10 h-10 bg-[#2D9596] rounded-full flex items-center justify-center text-lg">
                              {interview.interviewer.avatar}
                            </div>
                            <div>
                              <p className="text-[#265073] text-sm font-medium">
                                {interview.interviewer.name}
                              </p>
                              <p className="text-[#2D9596] text-xs">
                                {interview.interviewer.title}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT - Interview Info */}
                        <div className="w-80 space-y-4">
                          {/* Date & Time */}
                          <div className="bg-white rounded-xl p-4 border border-[#9AD0C2]">
                            <div className="flex items-center gap-2 text-[#2D9596] mb-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">Thời gian</span>
                            </div>
                            <p className="text-[#265073]">
                              {interview.date} - {interview.time}
                            </p>
                          </div>

                          {/* Format & Platform */}
                          <div>
                            <span
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                                interview.format === "online"
                                  ? "bg-[#2D9596] text-white"
                                  : interview.format === "onsite"
                                  ? "bg-[#9AD0C2] text-[#265073]"
                                  : "border-2 border-[#2D9596] text-[#2D9596]"
                              }`}
                            >
                              <Video className="w-4 h-4" />
                              {interview.format === "online"
                                ? "Online"
                                : interview.format === "onsite"
                                ? "Onsite"
                                : "Hybrid"}
                              {interview.platform && ` - ${interview.platform}`}
                            </span>
                          </div>

                          {/* Meeting Link (if online) */}
                          {interview.meetLink && (
                            <div className="bg-white rounded-xl p-4 border border-[#9AD0C2]">
                              <p className="text-[#265073] text-sm mb-2">
                                Link tham gia
                              </p>
                              <div className="flex items-center gap-2">
                                <a
                                  href={interview.meetLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#2D9596] hover:text-[#265073] text-sm flex items-center gap-1 flex-1 truncate"
                                >
                                  {interview.meetLink}
                                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                </a>
                                <button
                                  onClick={() =>
                                    handleCopyLink(
                                      interview.id,
                                      interview.meetLink!
                                    )
                                  }
                                  className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                                >
                                  {copiedLink === interview.id ? (
                                    <Check className="w-4 h-4 text-[#1EAD7B]" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-[#2D9596]" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Status Badge */}
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            <span className="text-sm">
                              {interview.statusText}
                            </span>
                          </div>

                          {/* Notes */}
                          {interview.notes && (
                            <div className="bg-[#FFF9E6] border border-[#FFD700]/30 rounded-xl p-4">
                              <p className="text-[#265073] text-sm">
                                {interview.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ========== ACTION BUTTONS ========== */}
                      <div className="mt-6 pt-6 border-t border-[#9AD0C2] flex flex-wrap gap-3">
                        {!interview.confirmed &&
                          interview.status === "pending" && (
                            <button className="px-5 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              Xác nhận tham gia
                            </button>
                          )}

                        {interview.status !== "completed" &&
                          interview.status !== "declined" && (
                            <button className="px-5 py-2 border-2 border-[#C9302C] text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors flex items-center gap-2">
                              <X className="w-4 h-4" />
                              Không thể tham gia
                            </button>
                          )}

                        <button className="px-5 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Thêm vào lịch
                        </button>

                        <button
                          onClick={() => onJobClick?.(interview.jobId)}
                          className="px-5 py-2 text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Xem chi tiết job
                        </button>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Pagination */}
                {filteredInterviews.length > 5 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-[#2D9596] text-white"
                            : "border-2 border-[#265073] text-[#265073] hover:bg-[#ECF4D6]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* ========== EMPTY STATE ========== */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-16 text-center shadow-sm"
              >
                <Calendar className="w-24 h-24 text-[#9AD0C2] mx-auto mb-6" />
                <h3 className="text-[#265073] text-2xl mb-3">
                  Bạn chưa có lịch phỏng vấn nào
                </h3>
                <p className="text-[#265073]/70 mb-6">
                  Hãy khám phá các việc làm phù hợp và ứng tuyển ngay!
                </p>
                <button className="px-8 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2 mx-auto">
                  <Sparkles className="w-5 h-5" />
                  Khám phá việc làm phù hợp
                </button>
              </motion.div>
            )}
          </div>

          {/* ========== RIGHT COLUMN (1/3) - SIDEBAR ========== */}
          <div className="space-y-6">
            {/* Calendar Mini View */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2D9596]" />
                Tháng 11/2025
              </h3>
              {renderMiniCalendar()}
              <div className="mt-4 pt-4 border-t border-[#9AD0C2]">
                <div className="flex items-center gap-2 text-sm text-[#265073]/70">
                  <div className="w-3 h-3 bg-[#2D9596] rounded-full" />
                  <span>Ngày có lịch phỏng vấn</span>
                </div>
              </div>
            </motion.div>

            {/* AI Interview Prep */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#9AD0C2]/30 to-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#2D9596]" />
                Chuẩn bị phỏng vấn
              </h3>

              {/* Skills to Review */}
              <div className="mb-4">
                <p className="text-[#265073] text-sm mb-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-[#2D9596]" />
                  Công nghệ cần ôn:
                </p>
                <div className="flex flex-wrap gap-2">
                  {prepSuggestions.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white text-[#265073] rounded-full text-xs border border-[#9AD0C2]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Questions */}
              <div className="bg-white rounded-xl p-4 mb-4">
                <p className="text-[#265073] text-sm mb-3">
                  Câu hỏi thường gặp:
                </p>
                <ul className="space-y-2">
                  {prepSuggestions.questions.slice(0, 2).map((q, idx) => (
                    <li
                      key={idx}
                      className="text-[#265073]/80 text-xs flex items-start gap-2"
                    >
                      <span className="text-[#2D9596] mt-0.5">•</span>
                      <span className="flex-1">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full px-4 py-2 text-[#2D9596] hover:text-[#265073] transition-colors text-sm flex items-center justify-center gap-1">
                Xem chi tiết
                <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>

            {/* Suggested Jobs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#2D9596]" />
                Việc làm phù hợp
              </h3>

              <div className="space-y-3">
                {suggestedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-[#ECF4D6] rounded-xl border border-[#9AD0C2]/50 hover:border-[#2D9596] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#265073] text-sm mb-1 truncate">
                          {job.title}
                        </h4>
                        <p className="text-[#2D9596] text-xs">{job.company}</p>
                      </div>
                      <span className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                        {job.match}%
                      </span>
                    </div>
                    <button className="text-[#2D9596] hover:text-[#265073] text-xs flex items-center gap-1">
                      Xem ngay
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

