"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  FileText,
  Upload,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  X,
  Edit,
  Download,
  Check,
  AlertCircle,
  Github,
  ExternalLink,
  Target,
  ChevronRight,
} from "lucide-react";

type TabType =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "certificates"
  | "cv-online"
  | "cv-upload"
  | "cv-analysis";

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  gpa?: string;
  startDate: string;
  endDate: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface Project {
  id: string;
  name: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  description: string;
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const tabs = [
    { id: "personal" as TabType, label: "Thông tin cá nhân", icon: User },
    { id: "experience" as TabType, label: "Kinh nghiệm", icon: Briefcase },
    { id: "education" as TabType, label: "Học vấn", icon: GraduationCap },
    { id: "skills" as TabType, label: "Kỹ năng", icon: Code },
    { id: "certificates" as TabType, label: "Chứng chỉ - Dự án", icon: Award },
    { id: "cv-online" as TabType, label: "CV Online", icon: FileText },
    { id: "cv-upload" as TabType, label: "CV Đính kèm", icon: Upload },
    { id: "cv-analysis" as TabType, label: "Phân tích CV (AI)", icon: Sparkles },
  ];

  const experiences: Experience[] = [
    {
      id: "1",
      position: "Senior Frontend Developer",
      company: "TechViet Solutions",
      startDate: "01/2022",
      endDate: "",
      current: true,
      description:
        "Phát triển và duy trì ứng dụng web sử dụng React, TypeScript. Làm việc với team 8 người, review code và mentor junior developers.",
    },
    {
      id: "2",
      position: "Frontend Developer",
      company: "Digital Agency VN",
      startDate: "06/2020",
      endDate: "12/2021",
      current: false,
      description:
        "Xây dựng landing page và web app cho khách hàng. Tối ưu hiệu suất và SEO.",
    },
  ];

  const educations: Education[] = [
    {
      id: "1",
      school: "Đại học Công nghệ - ĐHQGHN",
      degree: "Cử nhân",
      major: "Công nghệ Thông tin",
      gpa: "3.6",
      startDate: "09/2016",
      endDate: "06/2020",
    },
  ];

  const certificates: Certificate[] = [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "03/2023",
    },
    {
      id: "2",
      name: "Google Data Analytics Professional",
      issuer: "Google",
      date: "08/2022",
    },
  ];

  const projects: Project[] = [
    {
      id: "1",
      name: "E-commerce Platform",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      githubUrl: "https://github.com/username/ecommerce",
      demoUrl: "https://demo.example.com",
      description:
        "Nền tảng thương mại điện tử đầy đủ tính năng với giỏ hàng, thanh toán online và quản lý đơn hàng.",
    },
    {
      id: "2",
      name: "Task Management App",
      technologies: ["React Native", "Firebase", "Redux"],
      githubUrl: "https://github.com/username/taskapp",
      description:
        "Ứng dụng quản lý công việc với real-time sync và push notifications.",
    },
  ];

  const aiSuggestedSkills = ["Docker", "React Hooks", "RESTful API", "GraphQL"];

  const profileCompletion = {
    personalInfo: true,
    experience: true,
    education: true,
    skills: false,
    certificates: true,
    cvUpload: false,
  };

  const completionPercentage = Math.round(
    (Object.values(profileCompletion).filter(Boolean).length /
      Object.values(profileCompletion).length) *
      100
  );

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#ECF4D6] to-[#9AD0C2]/30 pt-8 pb-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#265073] text-3xl md:text-4xl mb-3"
              >
                Hồ sơ & CV của bạn
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#265073]/70 text-base"
              >
                Hoàn thiện hồ sơ để AI đề xuất việc làm chính xác hơn.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-48 h-48 hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1758520144417-e1c432042dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXN1bWUlMjBjdnxlbnwxfHx8fDE3NjMyMDc4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile illustration"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#2D9596] rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 mb-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] p-1">
                    <div className="w-full h-full rounded-full bg-[#ECF4D6] flex items-center justify-center">
                      <User className="w-12 h-12 md:w-16 md:h-16 text-[#265073]" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#2D9596] rounded-full p-2">
                    <Edit className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-[#265073] text-2xl md:text-3xl mb-2">
                    Nguyễn Văn An
                  </h2>
                  <p className="text-[#2D9596] text-lg mb-4">
                    Senior Frontend Developer
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-[#265073]/70 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Hà Nội</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>nguyenvanan@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>0912 345 678</span>
                    </div>
                  </div>
                </div>
                <button className="bg-[#265073] hover:bg-[#2D9596] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa hồ sơ
                </button>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[20px] border-2 border-[#9AD0C2] mb-8 overflow-hidden shadow-lg"
            >
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[140px] px-4 py-4 flex flex-col items-center gap-2 transition-all duration-300 border-b-4 ${
                      activeTab === tab.id
                        ? "bg-[#2D9596] text-white border-[#265073]"
                        : "text-[#265073] border-transparent hover:bg-[#9AD0C2]/20"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-xs md:text-sm text-center">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg"
                >
                  <h3 className="text-[#265073] text-2xl mb-6">
                    Thông tin cá nhân
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#265073] mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        defaultValue="Nguyễn Văn An"
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#265073] mb-2">
                        Ngày sinh
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          defaultValue="1998-05-15"
                          className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596] pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#265073] mb-2">
                        Giới tính
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors">
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#265073] mb-2">
                        Vị trí mong muốn
                      </label>
                      <input
                        type="text"
                        defaultValue="Senior Frontend Developer"
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#265073] mb-2">
                        Địa điểm làm việc
                      </label>
                      <input
                        type="text"
                        defaultValue="Hà Nội"
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#265073] mb-2">
                        Mức lương kỳ vọng
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="25,000,000 - 35,000,000 VNĐ"
                          className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors pl-10"
                        />
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-[#265073] mb-2">
                      Mô tả bản thân
                    </label>
                    <textarea
                      rows={6}
                      defaultValue="Tôi là một Frontend Developer với 4+ năm kinh nghiệm trong việc phát triển web applications sử dụng React, TypeScript và các công nghệ hiện đại. Đam mê học hỏi công nghệ mới và làm việc nhóm."
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="bg-[#2D9596] hover:bg-[#265073] text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      Lưu thay đổi
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#265073] text-2xl">
                        Kinh nghiệm làm việc
                      </h3>
                      <button className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg">
                        <Plus className="w-4 h-4" />
                        Thêm kinh nghiệm
                      </button>
                    </div>
                    <div className="space-y-6">
                      {experiences.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-6 relative"
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-[#2D9596] rounded-full p-3 flex-shrink-0">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-[#265073] text-xl mb-1">
                                {exp.position}
                              </h4>
                              <p className="text-[#2D9596] mb-2">
                                {exp.company}
                              </p>
                              <p className="text-[#265073]/60 text-sm mb-3">
                                {exp.startDate} -{" "}
                                {exp.current ? "Hiện tại" : exp.endDate}
                              </p>
                              <p className="text-[#265073]/80 leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                            <button className="text-[#265073]/40 hover:text-[#2D9596] transition-colors">
                              <Edit className="w-5 h-5" />
                            </button>
                          </div>
                          {exp.current && (
                            <div className="absolute top-4 right-4 bg-[#2D9596] text-white px-3 py-1 rounded-full text-xs">
                              Hiện tại
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[#265073] text-2xl">Học vấn</h3>
                    <button className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg">
                      <Plus className="w-4 h-4" />
                      Thêm học vấn
                    </button>
                  </div>
                  <div className="space-y-6">
                    {educations.map((edu, index) => (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-6"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-[#2D9596] rounded-full p-3 flex-shrink-0">
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[#265073] text-xl mb-1">
                              {edu.school}
                            </h4>
                            <p className="text-[#2D9596] mb-2">
                              {edu.degree} - {edu.major}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-[#265073]/60">
                              <span>
                                {edu.startDate} - {edu.endDate}
                              </span>
                              {edu.gpa && <span>GPA: {edu.gpa}/4.0</span>}
                            </div>
                          </div>
                          <button className="text-[#265073]/40 hover:text-[#2D9596] transition-colors">
                            <Edit className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <h3 className="text-[#265073] text-2xl mb-6">
                      Kỹ năng của bạn
                    </h3>

                    {/* Add Skill Input */}
                    <div className="flex gap-3 mb-6">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleAddSkill();
                        }}
                        placeholder="Thêm kỹ năng mới..."
                        className="flex-1 px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="bg-[#2D9596] hover:bg-[#265073] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <Plus className="w-5 h-5" />
                        Thêm
                      </button>
                    </div>

                    {/* Skills by Category */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[#265073] mb-3">
                          Frontend Development
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {skills
                            .filter((s) =>
                              [
                                "React",
                                "TypeScript",
                                "Tailwind CSS",
                                "React Hooks",
                              ].includes(s)
                            )
                            .map((skill) => (
                              <motion.div
                                key={skill}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-[#2D9596] text-white px-4 py-2 rounded-full flex items-center gap-2 group hover:bg-[#265073] transition-colors"
                              >
                                <span>{skill}</span>
                                <button
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="opacity-70 hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#265073] mb-3">
                          Backend Development
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {skills
                            .filter((s) =>
                              ["Node.js", "MongoDB", "RESTful API"].includes(s)
                            )
                            .map((skill) => (
                              <motion.div
                                key={skill}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-[#2D9596] text-white px-4 py-2 rounded-full flex items-center gap-2 group hover:bg-[#265073] transition-colors"
                              >
                                <span>{skill}</span>
                                <button
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="opacity-70 hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#265073] mb-3">Other Skills</h4>
                        <div className="flex flex-wrap gap-3">
                          {skills
                            .filter(
                              (s) =>
                                ![
                                  "React",
                                  "TypeScript",
                                  "Tailwind CSS",
                                  "React Hooks",
                                  "Node.js",
                                  "MongoDB",
                                  "RESTful API",
                                ].includes(s)
                            )
                            .map((skill) => (
                              <motion.div
                                key={skill}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-[#2D9596] text-white px-4 py-2 rounded-full flex items-center gap-2 group hover:bg-[#265073] transition-colors"
                              >
                                <span>{skill}</span>
                                <button
                                  onClick={() => handleRemoveSkill(skill)}
                                  className="opacity-70 hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-[#9AD0C2] to-[#ECF4D6] rounded-[20px] border-2 border-[#2D9596] p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#2D9596] rounded-full p-2">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-[#265073] text-lg">
                        AI đề xuất thêm kỹ năng
                      </h4>
                    </div>
                    <p className="text-[#265073]/70 mb-4">
                      Các kỹ năng này sẽ tăng cơ hội được nhà tuyển dụng chú ý:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {aiSuggestedSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleAddSuggestedSkill(skill)}
                          disabled={skills.includes(skill)}
                          className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                            skills.includes(skill)
                              ? "bg-[#265073] text-white border-[#265073]"
                              : "bg-white text-[#265073] border-[#2D9596] hover:bg-[#2D9596] hover:text-white"
                          }`}
                        >
                          {skills.includes(skill) ? (
                            <span className="flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              {skill}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Plus className="w-4 h-4" />
                              {skill}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Certificates & Projects Tab */}
              {activeTab === "certificates" && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Certificates */}
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#265073] text-2xl">Chứng chỉ</h3>
                      <button className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg">
                        <Plus className="w-4 h-4" />
                        Thêm chứng chỉ
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certificates.map((cert, index) => (
                        <motion.div
                          key={cert.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-4 hover:border-[#2D9596] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-[#2D9596] rounded-lg p-2 flex-shrink-0">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-[#265073] mb-1">
                                {cert.name}
                              </h4>
                              <p className="text-[#2D9596] text-sm mb-1">
                                {cert.issuer}
                              </p>
                              <p className="text-[#265073]/60 text-xs">
                                {cert.date}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#265073] text-2xl">Dự án</h3>
                      <button className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg">
                        <Plus className="w-4 h-4" />
                        Thêm dự án
                      </button>
                    </div>
                    <div className="space-y-6">
                      {projects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-6"
                        >
                          <h4 className="text-[#265073] text-xl mb-3">
                            {project.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="bg-[#2D9596] text-white px-3 py-1 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <p className="text-[#265073]/80 mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                className="text-[#2D9596] hover:text-[#265073] flex items-center gap-2 transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                GitHub
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                className="text-[#2D9596] hover:text-[#265073] flex items-center gap-2 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CV Online Tab */}
              {activeTab === "cv-online" && (
                <motion.div
                  key="cv-online"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[#265073] text-2xl">CV Online</h3>
                    <div className="flex gap-3">
                      <button className="border-2 border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596] hover:text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Tải CV PDF
                      </button>
                      <button className="bg-[#265073] hover:bg-[#2D9596] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg">
                        <Edit className="w-4 h-4" />
                        Chỉnh sửa CV
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-8">
                    <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-lg">
                      {/* CV Preview */}
                      <div className="text-center mb-6 pb-6 border-b-2 border-[#9AD0C2]">
                        <h2 className="text-[#265073] text-3xl mb-2">
                          Nguyễn Văn An
                        </h2>
                        <p className="text-[#2D9596] text-lg mb-3">
                          Senior Frontend Developer
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-[#265073]/70">
                          <span>📧 nguyenvanan@email.com</span>
                          <span>📱 0912 345 678</span>
                          <span>📍 Hà Nội</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-[#265073] text-lg mb-3 pb-2 border-b border-[#9AD0C2]">
                            Kinh nghiệm
                          </h3>
                          {experiences.slice(0, 2).map((exp) => (
                            <div key={exp.id} className="mb-4">
                              <h4 className="text-[#265073]">
                                {exp.position}
                              </h4>
                              <p className="text-[#2D9596] text-sm">
                                {exp.company} | {exp.startDate} -{" "}
                                {exp.current ? "Hiện tại" : exp.endDate}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h3 className="text-[#265073] text-lg mb-3 pb-2 border-b border-[#9AD0C2]">
                            Kỹ năng
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.slice(0, 8).map((skill) => (
                              <span
                                key={skill}
                                className="bg-[#2D9596] text-white px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CV Upload Tab */}
              {activeTab === "cv-upload" && (
                <motion.div
                  key="cv-upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg"
                >
                  <h3 className="text-[#265073] text-2xl mb-6">
                    CV Đính kèm
                  </h3>
                  <div className="border-2 border-dashed border-[#2D9596] rounded-xl p-12 text-center hover:bg-[#ECF4D6] transition-colors cursor-pointer">
                    <Upload className="w-16 h-16 text-[#2D9596] mx-auto mb-4" />
                    <h4 className="text-[#265073] text-lg mb-2">
                      Kéo thả CV vào đây hoặc bấm để chọn file
                    </h4>
                    <p className="text-[#265073]/60 text-sm mb-4">
                      Hỗ trợ định dạng PDF, DOCX (tối đa 5MB)
                    </p>
                    <button className="bg-[#2D9596] hover:bg-[#265073] text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg">
                      Chọn file
                    </button>
                  </div>

                  {/* Uploaded Files */}
                  <div className="mt-6">
                    <h4 className="text-[#265073] mb-4">File đã tải lên</h4>
                    <div className="space-y-3">
                      <div className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#2D9596] rounded-lg p-2">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-[#265073]">
                              CV_NguyenVanAn_2024.pdf
                            </p>
                            <p className="text-[#265073]/60 text-sm">
                              2.4 MB • Tải lên ngày 10/11/2024
                            </p>
                          </div>
                        </div>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CV Analysis Tab */}
              {activeTab === "cv-analysis" && (
                <motion.div
                  key="cv-analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* AI Score Card */}
                  <div className="bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-[20px] p-8 shadow-xl text-white">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Sparkles className="w-8 h-8 text-[#9AD0C2]" />
                      </div>
                      <div>
                        <h3 className="text-2xl mb-1">Phân tích CV bằng AI</h3>
                        <p className="text-white/80">
                          Đánh giá chi tiết và gợi ý cải thiện
                        </p>
                      </div>
                    </div>

                    {/* Score Display */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                      <div className="text-center">
                        <div className="relative inline-block">
                          <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              stroke="rgba(255,255,255,0.2)"
                              strokeWidth="12"
                              fill="none"
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              stroke="#9AD0C2"
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${85 * 4.4} ${100 * 4.4}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="text-5xl mb-1">85</div>
                            <div className="text-sm opacity-80">/100</div>
                          </div>
                        </div>
                        <p className="mt-4 text-lg">
                          CV của bạn đạt điểm khá tốt!
                        </p>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                      <h4 className="text-lg mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#9AD0C2]" />
                        Điểm mạnh
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#9AD0C2]" />
                          <span>
                            Kinh nghiệm làm việc rõ ràng với mô tả chi tiết
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#9AD0C2]" />
                          <span>Kỹ năng đa dạng, phù hợp với ngành IT</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#9AD0C2]" />
                          <span>
                            Có chứng chỉ chuyên ngành từ AWS và Google
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <h4 className="text-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-[#ECF4D6]" />
                        Điểm cần cải thiện
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#ECF4D6]" />
                          <span>
                            Thiếu link portfolio hoặc GitHub để showcase dự án
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#ECF4D6]" />
                          <span>
                            Mô tả dự án chưa nêu rõ impact và kết quả đạt được
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <h3 className="text-[#265073] text-2xl mb-6 flex items-center gap-3">
                      <Target className="w-7 h-7 text-[#2D9596]" />
                      Gợi ý cải thiện từ AI
                    </h3>
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#ECF4D6] border-l-4 border-[#2D9596] rounded-r-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-[#2D9596] rounded-full p-1 flex-shrink-0 mt-1">
                            <span className="text-white text-xs px-2">1</span>
                          </div>
                          <div>
                            <h5 className="text-[#265073] mb-1">
                              Thêm chi tiết về impact trong mô tả công việc
                            </h5>
                            <p className="text-[#265073]/70 text-sm">
                              Ví dụ: "Tăng performance 40%" thay vì "Tối ưu
                              performance"
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#ECF4D6] border-l-4 border-[#2D9596] rounded-r-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-[#2D9596] rounded-full p-1 flex-shrink-0 mt-1">
                            <span className="text-white text-xs px-2">2</span>
                          </div>
                          <div>
                            <h5 className="text-[#265073] mb-1">
                              Bổ sung kỹ năng "Problem Solving"
                            </h5>
                            <p className="text-[#265073]/70 text-sm">
                              Kỹ năng này được 87% nhà tuyển dụng IT yêu cầu
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#ECF4D6] border-l-4 border-[#2D9596] rounded-r-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="bg-[#2D9596] rounded-full p-1 flex-shrink-0 mt-1">
                            <span className="text-white text-xs px-2">3</span>
                          </div>
                          <div>
                            <h5 className="text-[#265073] mb-1">
                              Thêm link GitHub Profile
                            </h5>
                            <p className="text-[#265073]/70 text-sm">
                              CV có GitHub link có tỷ lệ được xem cao hơn 65%
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button className="bg-white border-2 border-[#265073] text-[#265073] hover:bg-[#265073] hover:text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                        Cải thiện ngay
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Profile Completion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 shadow-lg sticky top-24">
              <h3 className="text-[#265073] text-xl mb-4">
                Hoàn thiện hồ sơ
              </h3>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#265073]/70 text-sm">
                    Tiến độ hoàn thành
                  </span>
                  <span className="text-[#2D9596]">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-[#ECF4D6] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#2D9596] to-[#265073] rounded-full"
                  />
                </div>
              </div>

              {/* Completion Checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-[#2D9596] rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#265073]">Thông tin cá nhân</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-[#2D9596] rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#265073]">Kinh nghiệm</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-[#2D9596] rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#265073]">Học vấn</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-[#ECF4D6] border-2 border-[#2D9596] rounded-full p-1">
                    <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                  </div>
                  <span className="text-[#265073]">Kỹ năng</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-[#2D9596] rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#265073]">Chứng chỉ - Dự án</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-[#ECF4D6] border-2 border-[#2D9596] rounded-full p-1">
                    <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                  </div>
                  <span className="text-[#265073]">CV đính kèm</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-[#2D9596] hover:bg-[#265073] text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Hoàn thiện hồ sơ
                </button>
                <button className="w-full border-2 border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596] hover:text-white py-3 rounded-xl transition-all duration-300">
                  Xem trước CV
                </button>
              </div>

              {/* Tips */}
              <div className="mt-6 bg-[#ECF4D6] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#265073] text-sm mb-1">
                      Mẹo từ AI
                    </h4>
                    <p className="text-[#265073]/70 text-xs leading-relaxed">
                      Hồ sơ hoàn thiện 100% có cơ hội được tuyển dụng cao hơn
                      80%!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

