"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Target,
  Zap,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  BarChart3,
  ExternalLink,
  Users,
  Code,
  Server,
  Smartphone,
  Database,
  Cloud,
  GitBranch,
  MessageSquare,
} from "lucide-react";

export function CareerPathPage() {
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);

  // Current Skills Analysis
  const skillsData = [
    { name: "Frontend", value: 85, max: 100 },
    { name: "Backend", value: 45, max: 100 },
    { name: "Mobile", value: 30, max: 100 },
    { name: "Database", value: 55, max: 100 },
    { name: "Cloud", value: 40, max: 100 },
    { name: "DevOps", value: 35, max: 100 },
    { name: "Soft Skills", value: 75, max: 100 },
  ];

  const overallScore = 78;

  const strongSkills = ["ReactJS", "HTML/CSS", "Figma", "JavaScript", "UI/UX"];
  const weakSkills = [
    "Docker",
    "API Security",
    "Database Indexing",
    "Kubernetes",
  ];

  // Career Suggestions
  const careerSuggestions = [
    {
      id: 1,
      title: "Frontend Developer",
      matchScore: 92,
      icon: Code,
      color: "#2D9596",
      skillsMatch: 7,
      skillsTotal: 10,
      missingSkills: ["TypeScript", "REST API", "Performance Optimization"],
      avgSalary: "25-45 triệu",
      demand: "Cao",
      description:
        "Phát triển giao diện web với các framework hiện đại như React, Vue",
    },
    {
      id: 2,
      title: "Full-stack Developer",
      matchScore: 68,
      icon: Server,
      color: "#265073",
      skillsMatch: 5,
      skillsTotal: 12,
      missingSkills: [
        "NodeJS",
        "Express",
        "MongoDB",
        "REST API",
        "Authentication",
        "Testing",
        "Docker",
      ],
      avgSalary: "30-55 triệu",
      demand: "Rất cao",
      description:
        "Phát triển cả frontend và backend, xử lý toàn bộ quy trình sản phẩm",
    },
    {
      id: 3,
      title: "UI/UX Engineer",
      matchScore: 88,
      icon: Sparkles,
      color: "#9AD0C2",
      skillsMatch: 6,
      skillsTotal: 8,
      missingSkills: ["Framer Motion", "GSAP Animation"],
      avgSalary: "22-40 triệu",
      demand: "Trung bình",
      description:
        "Kết hợp thiết kế và code để tạo trải nghiệm người dùng hoàn hảo",
    },
  ];

  // Roadmap Phases
  const roadmapPhases = [
    {
      id: 1,
      phase: "Giai đoạn 1: Cơ bản",
      duration: "0-3 tháng",
      level: "Beginner",
      color: "#2D9596",
      items: [
        "Học nền tảng JavaScript ES6+",
        "Nắm vững HTML5 & CSS3",
        "Làm quen với Git & GitHub",
        "Build 3-5 landing pages",
        "Học cơ bản về Responsive Design",
      ],
      courses: [
        {
          title: "JavaScript Basics - FreeCodeCamp",
          link: "#",
          duration: "40h",
        },
        { title: "HTML/CSS Complete Guide", link: "#", duration: "20h" },
      ],
    },
    {
      id: 2,
      phase: "Giai đoạn 2: Thực hành",
      duration: "3-6 tháng",
      level: "Junior",
      color: "#265073",
      items: [
        "Học React căn bản",
        "State Management với Redux/Context",
        "Làm 2-3 dự án thực chiến",
        "Tạo GitHub Portfolio ấn tượng",
        "Học làm việc nhóm với Git",
      ],
      courses: [
        { title: "React - The Complete Guide", link: "#", duration: "60h" },
        { title: "Redux Toolkit Tutorial", link: "#", duration: "15h" },
      ],
    },
    {
      id: 3,
      phase: "Giai đoạn 3: Sẵn sàng thị trường",
      duration: "6-12 tháng",
      level: "Mid-Junior",
      color: "#FF9A3C",
      items: [
        "Tối ưu hiệu năng React",
        "Học Testing (Jest, React Testing Library)",
        "Build sản phẩm thực tế end-to-end",
        "Chuẩn bị CV chuẩn Frontend",
        "Luyện phỏng vấn kỹ thuật",
      ],
      courses: [
        { title: "React Performance Optimization", link: "#", duration: "12h" },
        { title: "Testing React Applications", link: "#", duration: "18h" },
      ],
    },
    {
      id: 4,
      phase: "Giai đoạn 4: Middle Level",
      duration: "1-2 năm",
      level: "Middle",
      color: "#C9302C",
      items: [
        "Chuyên sâu TypeScript",
        "Học CI/CD cơ bản",
        "Nắm vững System Design",
        "Dẫn dắt dự án nhỏ",
        "Mentor cho junior",
      ],
      courses: [
        {
          title: "TypeScript Advanced Patterns",
          link: "#",
          duration: "25h",
        },
        { title: "System Design for Frontend", link: "#", duration: "30h" },
      ],
    },
  ];

  // Learning Suggestions
  const learningSuggestions = [
    {
      id: 1,
      title: "Docker for Beginners",
      platform: "Udemy",
      duration: "8 giờ",
      rating: 4.7,
      students: "120K+",
      price: "Free",
      skills: ["Docker", "Containers"],
    },
    {
      id: 2,
      title: "React Performance Optimization",
      platform: "Frontend Masters",
      duration: "4 giờ",
      rating: 4.9,
      students: "45K+",
      price: "Premium",
      skills: ["React", "Performance"],
    },
    {
      id: 3,
      title: "TypeScript Fundamentals",
      platform: "FreeCodeCamp",
      duration: "12 giờ",
      rating: 4.8,
      students: "200K+",
      price: "Free",
      skills: ["TypeScript", "JavaScript"],
    },
  ];

  // Career Comparison
  const careerComparison = [
    {
      title: "Frontend Developer",
      salary: "25-45 triệu",
      difficulty: 3,
      demand: 5,
      match: 92,
      skills: ["React", "CSS", "JavaScript"],
    },
    {
      title: "Backend Developer",
      salary: "28-50 triệu",
      difficulty: 4,
      demand: 5,
      match: 55,
      skills: ["NodeJS", "Database", "API"],
    },
    {
      title: "Mobile Developer",
      salary: "25-48 triệu",
      difficulty: 4,
      demand: 4,
      match: 40,
      skills: ["React Native", "iOS", "Android"],
    },
  ];

  // Salary Projection
  const salaryProjection = [
    { level: "Junior (0-2 năm)", salary: 15, color: "#9AD0C2" },
    { level: "Middle (2-5 năm)", salary: 30, color: "#2D9596" },
    { level: "Senior (5+ năm)", salary: 50, color: "#265073" },
  ];

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Header - Futuristic AI Style */}
      <div className="relative bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073] py-10 overflow-hidden">
        {/* AI Neural Network Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1" fill="#ECF4D6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-20 w-64 h-64 bg-[#2D9596] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-20 w-80 h-80 bg-[#9AD0C2] rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Powered by AI Technology</span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl mb-4">
              AI Career Path
            </h1>
            <p className="text-white text-xl mb-3">
              Lộ trình nghề nghiệp thông minh
            </p>
            <p className="text-[#ECF4D6] text-lg mb-8 max-w-2xl mx-auto">
              Khám phá hướng nghề nghiệp phù hợp nhất dựa trên kỹ năng và mục
              tiêu của bạn
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-white hover:text-[#265073] transition-all flex items-center gap-2 shadow-lg">
                <Brain className="w-5 h-5" />
                Phân tích kỹ năng
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#265073] transition-all">
                Cập nhật hồ sơ
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* AI Skill Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#265073] text-2xl">
                Phân tích kỹ năng hiện tại
              </h2>
              <p className="text-[#265073]/70">
                AI đánh giá dựa trên hồ sơ và kinh nghiệm của bạn
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Overall Score */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center mb-4">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#ECF4D6"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#2D9596"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(overallScore / 100) * 440} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute">
                  <div className="text-4xl text-[#265073]">{overallScore}</div>
                  <div className="text-[#265073]/70 text-sm">/ 100</div>
                </div>
              </div>
              <h3 className="text-[#265073] mb-2">Điểm tổng hợp</h3>
              <p className="text-[#2D9596]">Trên trung bình</p>
            </div>

            {/* Skills Radar */}
            <div className="lg:col-span-2">
              <div className="bg-[#ECF4D6] rounded-2xl p-6">
                <h3 className="text-[#265073] mb-4">
                  Phân bố kỹ năng (Skill Wheel)
                </h3>
                <div className="space-y-3">
                  {skillsData.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#265073] text-sm">
                          {skill.name}
                        </span>
                        <span className="text-[#2D9596]">
                          {skill.value}%
                        </span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-[#2D9596] to-[#9AD0C2]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#ECF4D6] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-[#2D9596]" />
                <h3 className="text-[#265073]">Kỹ năng mạnh nhất</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {strongSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-[#2D9596] text-white rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF4E6] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-[#FF6B35]" />
                <h3 className="text-[#265073]">Kỹ năng cần cải thiện</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {weakSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white border-2 border-[#FF6B35] text-[#265073] rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Career Direction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-[#265073] text-3xl mb-3">
              Hướng nghề nghiệp đề xuất
            </h2>
            <p className="text-[#265073]/70 max-w-2xl mx-auto">
              AI phân tích và gợi ý 3 con đường phù hợp nhất với kỹ năng hiện
              tại của bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {careerSuggestions.map((career, index) => {
              const Icon = career.icon;
              return (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:border-[#2D9596] transition-all shadow-md hover:shadow-xl"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${career.color}20` }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: career.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-[#265073]">{career.title}</h3>
                        <p className="text-xs text-[#265073]/60">
                          {career.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="bg-[#ECF4D6] rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#265073] text-sm">
                        Độ phù hợp
                      </span>
                      <span className="text-2xl text-[#2D9596]">
                        {career.matchScore}%
                      </span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2D9596] to-[#9AD0C2]"
                        style={{ width: `${career.matchScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Skills Match */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-[#2D9596]" />
                      <span className="text-[#265073] text-sm">
                        Kỹ năng phù hợp: {career.skillsMatch}/{career.skillsTotal}
                      </span>
                    </div>

                    {career.missingSkills.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-[#FF6B35]" />
                          <span className="text-[#265073] text-sm">
                            Cần bổ sung:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {career.missingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-[#FFF4E6] text-[#265073] rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#ECF4D6] p-3 rounded-lg">
                      <DollarSign className="w-4 h-4 text-[#2D9596] mb-1" />
                      <p className="text-xs text-[#265073]/70">Mức lương</p>
                      <p className="text-[#265073] text-sm">
                        {career.avgSalary}
                      </p>
                    </div>
                    <div className="bg-[#ECF4D6] p-3 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-[#2D9596] mb-1" />
                      <p className="text-xs text-[#265073]/70">Nhu cầu</p>
                      <p className="text-[#265073] text-sm">{career.demand}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() =>
                      setSelectedCareer(
                        selectedCareer === career.id ? null : career.id
                      )
                    }
                    className="w-full px-4 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-all flex items-center justify-center gap-2"
                  >
                    Xem lộ trình chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Career Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#265073] text-2xl">
                Lộ trình nghề nghiệp Frontend Developer
              </h2>
              <p className="text-[#265073]/70">
                Từ zero đến hero trong 1-2 năm
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < roadmapPhases.length - 1 && (
                  <div className="absolute left-6 top-16 w-1 h-full bg-gradient-to-b from-[#2D9596] to-[#9AD0C2]" />
                )}

                <div className="flex gap-6">
                  {/* Timeline Node */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-10"
                      style={{ backgroundColor: phase.color }}
                    >
                      {phase.id}
                    </div>
                    <div className="mt-2 px-3 py-1 bg-[#ECF4D6] rounded-full text-xs text-[#265073]">
                      {phase.level}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-[#ECF4D6] rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-[#265073] text-xl mb-1">
                          {phase.phase}
                        </h3>
                        <div className="flex items-center gap-2 text-[#265073]/70">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{phase.duration}</span>
                        </div>
                      </div>
                      <Award
                        className="w-6 h-6"
                        style={{ color: phase.color }}
                      />
                    </div>

                    {/* Items */}
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {phase.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-white p-3 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-[#2D9596] flex-shrink-0 mt-0.5" />
                          <span className="text-[#265073] text-sm">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Courses */}
                    <div className="border-t-2 border-white pt-4">
                      <h4 className="text-[#265073] text-sm mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#2D9596]" />
                        Khóa học đề xuất
                      </h4>
                      <div className="space-y-2">
                        {phase.courses.map((course, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-white p-3 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-[#2D9596]" />
                              <span className="text-[#265073] text-sm">
                                {course.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-[#265073]/70">
                                {course.duration}
                              </span>
                              <button className="text-[#2D9596] hover:text-[#265073]">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#265073] text-2xl">
                Gợi ý khóa học từ AI
              </h2>
              <p className="text-[#265073]/70">
                Dựa trên kỹ năng thiếu của bạn
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {learningSuggestions.map((course) => (
              <div
                key={course.id}
                className="bg-[#ECF4D6] rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#265073] mb-1">{course.title}</h3>
                    <p className="text-xs text-[#265073]/70">
                      {course.platform}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      course.price === "Free"
                        ? "bg-[#2D9596] text-white"
                        : "bg-[#FF9A3C] text-white"
                    }`}
                  >
                    {course.price}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm text-[#265073]/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= Math.floor(course.rating)
                            ? "text-[#FF9A3C]"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-[#265073]">
                    {course.rating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-white text-[#265073] rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors">
                  Học ngay
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-8"
        >
          <h2 className="text-[#265073] text-2xl mb-6">
            So sánh nghề liên quan
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#9AD0C2]">
                  <th className="text-left text-[#265073] py-3 px-4">
                    Nghề nghiệp
                  </th>
                  <th className="text-left text-[#265073] py-3 px-4">
                    Mức lương
                  </th>
                  <th className="text-left text-[#265073] py-3 px-4">
                    Độ khó
                  </th>
                  <th className="text-left text-[#265073] py-3 px-4">
                    Nhu cầu
                  </th>
                  <th className="text-left text-[#265073] py-3 px-4">
                    Phù hợp
                  </th>
                </tr>
              </thead>
              <tbody>
                {careerComparison.map((career, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#9AD0C2]/30 hover:bg-[#ECF4D6] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="text-[#265073]">{career.title}</div>
                      <div className="flex gap-1 mt-1">
                        {career.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-[#ECF4D6] text-[#265073] rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#265073]">
                      {career.salary}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < career.difficulty
                                ? "bg-[#2D9596]"
                                : "bg-[#ECF4D6]"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < career.demand
                                ? "bg-[#2D9596]"
                                : "bg-[#ECF4D6]"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#ECF4D6] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2D9596]"
                            style={{ width: `${career.match}%` }}
                          />
                        </div>
                        <span className="text-[#265073] text-sm">
                          {career.match}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Salary Projection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-2 border-[#9AD0C2] mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#265073] text-2xl">
                Dự đoán mức lương theo lộ trình
              </h2>
              <p className="text-[#265073]/70">
                Frontend Developer tại Hà Nội
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {salaryProjection.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-[#ECF4D6] rounded-xl p-6 text-center"
              >
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-2xl mb-3"
                  style={{ backgroundColor: item.color }}
                >
                  {item.salary}M
                </div>
                <h3 className="text-[#265073] mb-2">{item.level}</h3>
                <p className="text-[#265073]/70 text-sm">
                  ~{item.salary} triệu/tháng
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#ECF4D6] rounded-xl">
            <p className="text-[#265073]/70 text-sm">
              <strong>Lưu ý:</strong> Mức lương thực tế phụ thuộc vào công ty,
              kỹ năng thực tế, và khả năng đàm phán. Đây là con số trung bình
              thị trường.
            </p>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073] rounded-3xl p-12 text-center overflow-hidden"
        >
          {/* Background Effects */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-[#9AD0C2] rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-white text-3xl mb-3">
              Sẵn sàng bắt đầu lộ trình của bạn?
            </h2>
            <p className="text-[#ECF4D6] text-lg mb-8 max-w-2xl mx-auto">
              Cập nhật kỹ năng hôm nay – AI sẽ đưa bạn đến đích nhanh hơn
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-3 bg-white text-[#265073] rounded-xl hover:bg-[#ECF4D6] transition-all shadow-lg">
                Cải thiện hồ sơ ngay
              </button>
              <button className="px-8 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-all border-2 border-white/20">
                Xem việc làm phù hợp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

