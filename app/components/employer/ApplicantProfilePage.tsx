"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Download,
  MessageSquare,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FileText,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  X,
  Check,
  XCircle,
  CheckCircle,
  Sparkles,
  Eye,
  GitBranch,
  Gauge,
  ChevronRight,
  User,
} from "lucide-react";

interface ApplicantProfilePageProps {
  applicantId: number | null;
  onBack?: () => void;
  onNavigateToMessages?: () => void;
}

export function ApplicantProfilePage({
  applicantId,
  onBack,
  onNavigateToMessages,
}: ApplicantProfilePageProps) {
  const [currentStatus, setCurrentStatus] = useState("reviewed");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [selectedNewStatus, setSelectedNewStatus] = useState("");

  // Mock candidate data
  const candidate = {
    id: applicantId || 1,
    name: "Nguyễn Văn A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    currentPosition: "Frontend Developer tại TechCorp",
    experience: "3 năm",
    location: "Hà Nội",
    phone: "0912 345 678",
    email: "nguyenvana@email.com",
    appliedDate: "10/11/2024",
    appliedJob: "Senior Frontend Developer",
    matchScore: 87,
    cvFileName: "NguyenVanA_CV.pdf",
    cvFileSize: "2.4 MB",
    skillsMatched: [
      "ReactJS",
      "JavaScript",
      "HTML/CSS",
      "Git",
      "Agile",
    ],
    skillsGap: ["Docker", "TypeScript", "Performance Optimization"],
    workExperience: [
      {
        company: "TechCorp JSC",
        position: "Frontend Developer",
        duration: "01/2022 - Hiện tại",
        description:
          "Phát triển và maintain các dự án web application sử dụng ReactJS, Redux, và REST APIs.",
        technologies: ["ReactJS", "Redux", "REST API", "Material UI"],
      },
      {
        company: "StartupXYZ",
        position: "Junior Frontend Developer",
        duration: "06/2021 - 12/2021",
        description:
          "Tham gia phát triển landing pages và các tính năng mới cho sản phẩm chính.",
        technologies: ["ReactJS", "JavaScript", "CSS3", "Bootstrap"],
      },
    ],
    education: [
      {
        school: "Đại học Bách Khoa Hà Nội",
        major: "Công nghệ thông tin",
        duration: "2017 - 2021",
        achievement: "GPA: 3.5/4.0",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        role: "Frontend Lead",
        technologies: ["ReactJS", "Redux", "TypeScript", "Ant Design"],
        link: "github.com/example/project",
      },
      {
        name: "Social Media Dashboard",
        role: "Frontend Developer",
        technologies: ["ReactJS", "Chart.js", "Tailwind CSS"],
        link: "github.com/example/dashboard",
      },
    ],
    skills: {
      Frontend: ["ReactJS", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
      Backend: ["Node.js", "Express"],
      Tools: ["Git", "Figma", "Jira", "Postman"],
    },
    certifications: [
      {
        name: "React Developer Certification",
        issuer: "Meta",
        date: "2023",
      },
      {
        name: "JavaScript Algorithms",
        issuer: "freeCodeCamp",
        date: "2022",
      },
    ],
    timeline: [
      {
        action: "Ứng viên nộp CV",
        date: "10/11/2024",
        time: "10:30",
      },
      {
        action: "HR xem hồ sơ",
        date: "11/11/2024",
        time: "14:20",
      },
      {
        action: "Đang xem xét",
        date: "12/11/2024",
        time: "09:15",
      },
    ],
  };

  // Similar candidates
  const similarCandidates = [
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      matchScore: 85,
      experience: "4 năm",
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      matchScore: 83,
      experience: "3 năm",
    },
  ];

  const statusOptions = [
    { value: "new", label: "Mới nhận", color: "#9AD0C2" },
    { value: "reviewed", label: "Đã xem", color: "#2D9596" },
    { value: "considering", label: "Đang xem xét", color: "#FFB84D" },
    { value: "interview", label: "Mời phỏng vấn", color: "#1EAD7B" },
    { value: "offer", label: "Đạt - Offer", color: "#10B981" },
    { value: "rejected", label: "Không phù hợp", color: "#EF4444" },
  ];

  const handleStatusChange = (newStatus: string) => {
    setSelectedNewStatus(newStatus);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    setCurrentStatus(selectedNewStatus);
    setShowStatusModal(false);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "#1EAD7B";
    if (score >= 80) return "#2D9596";
    if (score >= 70) return "#FFB84D";
    return "#EF4444";
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại danh sách
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[#265073] text-3xl mb-2">
                  Hồ sơ ứng viên
                </h1>
                <p className="text-[#2D9596]">
                  {candidate.appliedJob} – Ứng tuyển vào ngày:{" "}
                  {candidate.appliedDate}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowInterviewModal(true)}
                  className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Mời phỏng vấn
                </button>
                <button
                  onClick={onNavigateToMessages}
                  className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Tin nhắn
                </button>
                <button className="px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Candidate Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <div className="flex items-start gap-6">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-20 h-20 rounded-full flex-shrink-0"
                />

                <div className="flex-1">
                  <h2 className="text-[#265073] text-2xl mb-2">
                    {candidate.name}
                  </h2>
                  <p className="text-[#265073]/70 mb-4">
                    {candidate.currentPosition}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[#265073]">
                      <Briefcase className="w-5 h-5 text-[#2D9596]" />
                      <span>{candidate.experience} kinh nghiệm</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#265073]">
                      <MapPin className="w-5 h-5 text-[#2D9596]" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#265073]">
                      <Phone className="w-5 h-5 text-[#2D9596]" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#265073]">
                      <Mail className="w-5 h-5 text-[#2D9596]" />
                      <span>{candidate.email}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowInterviewModal(true)}
                      className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Mời phỏng vấn
                    </button>
                    <button
                      onClick={onNavigateToMessages}
                      className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat
                    </button>
                    <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Không phù hợp
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Match Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-[#9AD0C2] to-[#2D9596] rounded-2xl p-8 border-2 border-[#2D9596] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                AI Matching Score
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Match Score Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-32 h-32 mb-4"
                    style={{
                      background: `conic-gradient(${getMatchScoreColor(candidate.matchScore)} ${candidate.matchScore}%, #ECF4D6 ${candidate.matchScore}%)`,
                      borderRadius: "50%",
                    }}
                  >
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className="text-3xl"
                          style={{
                            color: getMatchScoreColor(candidate.matchScore),
                          }}
                        >
                          {candidate.matchScore}%
                        </div>
                        <div className="text-xs text-[#265073]/70">
                          Phù hợp
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-[#265073]">AI Matching Score</div>
                </div>

                {/* Skills Matched */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-[#265073] mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#1EAD7B]" />
                    Kỹ năng phù hợp
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skillsMatched.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Gap */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-[#265073] mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Kỹ năng thiếu
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skillsGap.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="px-6 py-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#265073] hover:text-white transition-colors">
                  Xem phân tích đầy đủ
                </button>
              </div>
            </motion.div>

            {/* CV Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-[#2D9596]" />
                CV đã gửi
              </h3>

              <div className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2D9596] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#265073]">{candidate.cvFileName}</h4>
                    <p className="text-sm text-[#265073]/70">
                      {candidate.cvFileSize}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCVModal(true)}
                    className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Xem CV
                  </button>
                  <button className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Tải xuống
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#2D9596]" />
                Kinh nghiệm làm việc
              </h3>

              <div className="space-y-6">
                {candidate.workExperience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-[#9AD0C2]">
                    <div
                      className="absolute left-0 top-0 w-4 h-4 bg-[#2D9596] rounded-full"
                      style={{ transform: "translateX(-9px)" }}
                    ></div>
                    <div className="mb-1 text-[#265073]">{exp.company}</div>
                    <div className="text-[#2D9596] mb-2">{exp.position}</div>
                    <div className="flex items-center gap-2 text-sm text-[#265073]/70 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                    <p className="text-[#265073]/80 mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#ECF4D6] text-[#265073] rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#2D9596]" />
                Học vấn
              </h3>

              <div className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <div key={index} className="p-4 bg-[#ECF4D6] rounded-xl">
                    <h4 className="text-[#265073] mb-1">{edu.school}</h4>
                    <p className="text-[#2D9596] mb-2">{edu.major}</p>
                    <div className="flex items-center gap-4 text-sm text-[#265073]/70">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{edu.achievement}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-[#2D9596]" />
                Dự án
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {candidate.projects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 border-2 border-[#9AD0C2] rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <h4 className="text-[#265073] mb-2">{project.name}</h4>
                    <p className="text-sm text-[#2D9596] mb-3">
                      {project.role}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-[#9AD0C2] text-[#265073] rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://${project.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-1"
                    >
                      <GitBranch className="w-4 h-4" />
                      {project.link}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#2D9596]" />
                Kỹ năng
              </h3>

              <div className="space-y-4">
                {Object.entries(candidate.skills).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-[#265073] mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#2D9596]" />
                Chứng chỉ
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {candidate.certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-[#ECF4D6] rounded-xl">
                    <h4 className="text-[#265073] mb-1">{cert.name}</h4>
                    <p className="text-sm text-[#2D9596] mb-1">{cert.issuer}</p>
                    <p className="text-xs text-[#265073]/70">{cert.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Application Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2D9596]" />
                Lịch sử ứng tuyển
              </h3>

              <div className="space-y-4">
                {candidate.timeline.map((event, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-[#9AD0C2]">
                    <div
                      className="absolute left-0 top-0 w-3 h-3 bg-[#2D9596] rounded-full"
                      style={{ transform: "translateX(-7px)" }}
                    ></div>
                    <div className="text-sm text-[#265073]">{event.action}</div>
                    <div className="text-xs text-[#265073]/70">
                      {event.date} • {event.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pipeline Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4">Trạng thái tuyển dụng</h3>

              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(status.value)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      currentStatus === status.value
                        ? "text-white shadow-lg"
                        : "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
                    }`}
                    style={{
                      backgroundColor:
                        currentStatus === status.value ? status.color : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{status.label}</span>
                      {currentStatus === status.value && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Similar Candidates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Ứng viên tương tự
              </h3>

              <div className="space-y-3">
                {similarCandidates.map((similar) => (
                  <div
                    key={similar.id}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={similar.avatar}
                        alt={similar.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm">{similar.name}</h4>
                        <p className="text-xs opacity-90">{similar.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Gauge className="w-4 h-4" />
                        <span className="text-sm">{similar.matchScore}%</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status Change Modal */}
      <AnimatePresence>
        {showStatusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowStatusModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[#265073] text-xl mb-4">Xác nhận thay đổi</h3>
              <p className="text-[#265073]/70 mb-6">
                Bạn có chắc chắn muốn thay đổi trạng thái ứng viên này?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="flex-1 px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interview Modal */}
      <AnimatePresence>
        {showInterviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInterviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[#265073] text-xl mb-6">Mời phỏng vấn</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#265073] mb-2">
                    Ngày & giờ
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#265073] mb-2">Hình thức</label>
                  <select className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none">
                    <option>Online (Zoom/Meet)</option>
                    <option>Onsite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#265073] mb-2">
                    Link phỏng vấn
                  </label>
                  <input
                    type="text"
                    placeholder="https://meet.google.com/..."
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#265073] mb-2">Ghi chú</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none resize-none"
                    placeholder="Thông tin bổ sung..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowInterviewModal(false);
                    alert("Đã gửi lời mời phỏng vấn!");
                  }}
                  className="flex-1 px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
                >
                  Gửi lời mời
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {showCVModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCVModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b-2 border-[#9AD0C2]">
                <h3 className="text-[#265073] text-xl">
                  {candidate.cvFileName}
                </h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-[#265073]" />
                  </button>
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#265073]" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-8 bg-[#ECF4D6]">
                <div className="bg-white rounded-xl p-8 max-w-3xl mx-auto">
                  <p className="text-center text-[#265073]/70">
                    CV Preview sẽ hiển thị ở đây
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

