"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Briefcase, User } from "lucide-react";

export function AIDemo() {
  const [activeTab, setActiveTab] = useState<"candidate" | "employer">("candidate");
  const [candidateInput, setCandidateInput] = useState("");
  const [employerInput, setEmployerInput] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleTryAI = () => {
    setShowResults(true);
    setTimeout(() => setShowResults(false), 5000);
  };

  const sampleJobs = [
    {
      title: "Senior React Developer",
      company: "TechCorp",
      match: 95,
      salary: "$2000-3000",
    },
    {
      title: "Full-stack JavaScript Engineer",
      company: "StartupHub",
      match: 88,
      salary: "$1800-2500",
    },
    {
      title: "Frontend Lead",
      company: "InnovateLab",
      match: 82,
      salary: "$2500-3500",
    },
  ];

  const sampleCandidates = [
    {
      name: "Nguyễn Văn A",
      skills: ["NodeJS", "MongoDB", "Express"],
      match: 92,
      experience: "3 năm",
    },
    {
      name: "Trần Thị B",
      skills: ["NodeJS", "PostgreSQL", "AWS"],
      match: 87,
      experience: "4 năm",
    },
    {
      name: "Lê Văn C",
      skills: ["NodeJS", "Redis", "Docker"],
      match: 85,
      experience: "2 năm",
    },
  ];

  return (
    <section className="py-20 bg-[#ECF4D6] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#2D9596] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full mb-4 border border-[#9AD0C2]">
              <Sparkles className="w-5 h-5 text-[#2D9596]" />
              <span className="text-[#2D9596]">Try AI Demo</span>
            </div>
            <h2 className="text-[#265073] text-4xl mb-4">
              Dùng thử AI Matching
            </h2>
            <p className="text-[#265073]/70 text-lg">
              Trải nghiệm ngay sức mạnh của AI trong việc gợi ý công việc và ứng viên
            </p>
          </motion.div>

          {/* Demo Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-[#9AD0C2] shadow-[0_12px_40px_rgba(154,208,194,0.3)]"
          >
            {/* Tabs */}
            <div className="flex border-b-2 border-[#9AD0C2]">
              <button
                onClick={() => {
                  setActiveTab("candidate");
                  setShowResults(false);
                }}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-3 transition-all ${
                  activeTab === "candidate"
                    ? "bg-[#2D9596] text-white"
                    : "bg-white text-[#265073] hover:bg-[#ECF4D6]"
                }`}
              >
                <User className="w-5 h-5" />
                <span>Ứng viên dùng thử</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("employer");
                  setShowResults(false);
                }}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-3 transition-all ${
                  activeTab === "employer"
                    ? "bg-[#2D9596] text-white"
                    : "bg-white text-[#265073] hover:bg-[#ECF4D6]"
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>HR dùng thử</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "candidate" ? (
                <div>
                  <label className="block text-[#265073] mb-3">
                    Nhập kỹ năng của bạn (ví dụ: React, NodeJS, Python...)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={candidateInput}
                      onChange={(e) => setCandidateInput(e.target.value)}
                      placeholder="React, TypeScript, NodeJS"
                      className="flex-1 px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                    />
                    <button
                      onClick={handleTryAI}
                      className="px-8 py-3 bg-gradient-to-r from-[#2D9596] to-[#265073] text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      AI Gợi ý
                    </button>
                  </div>

                  {/* Results */}
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-3"
                    >
                      <div className="text-[#265073] mb-3">
                        ✨ AI tìm thấy {sampleJobs.length} việc làm phù hợp:
                      </div>
                      {sampleJobs.map((job, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-xl border border-[#9AD0C2]"
                        >
                          <div>
                            <h4 className="text-[#265073]">{job.title}</h4>
                            <p className="text-sm text-[#265073]/70">{job.company} • {job.salary}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-2xl text-[#2D9596]">{job.match}%</div>
                            <div className="text-xs text-[#265073]">Match</div>
                          </div>
                        </motion.div>
                      ))}
                      <div className="text-center pt-4">
                        <button className="px-6 py-2 bg-[#265073] text-white rounded-full hover:bg-[#2D9596] transition-all">
                          Đăng nhập để xem đầy đủ
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-[#265073] mb-3">
                    Nhập chức danh cần tuyển (ví dụ: Backend NodeJS, Frontend React...)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={employerInput}
                      onChange={(e) => setEmployerInput(e.target.value)}
                      placeholder="Backend NodeJS Developer"
                      className="flex-1 px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                    />
                    <button
                      onClick={handleTryAI}
                      className="px-8 py-3 bg-gradient-to-r from-[#265073] to-[#2D9596] text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      AI Gợi ý
                    </button>
                  </div>

                  {/* Results */}
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-4"
                    >
                      <div className="text-[#265073] mb-3">
                        ✨ AI tìm thấy {sampleCandidates.length} ứng viên phù hợp:
                      </div>
                      {sampleCandidates.map((candidate, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-[#ECF4D6] rounded-xl border border-[#9AD0C2]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[#265073]">{candidate.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="text-2xl text-[#2D9596]">{candidate.match}%</div>
                              <div className="text-xs text-[#265073]">Match</div>
                            </div>
                          </div>
                          <p className="text-sm text-[#265073]/70 mb-2">Kinh nghiệm: {candidate.experience}</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                      <div className="text-center pt-4">
                        <button className="px-6 py-2 bg-[#265073] text-white rounded-full hover:bg-[#2D9596] transition-all">
                          Đăng nhập để xem đầy đủ hồ sơ
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


