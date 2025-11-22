"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, DollarSign, Briefcase, ArrowRight } from "lucide-react";
import { Badge } from "../../ui/badge";

const recommendedJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Vietnam",
    location: "Hà Nội",
    salary: "$1500 - $2500",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js"],
    type: "Full-time",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions",
    location: "Hồ Chí Minh",
    salary: "$1200 - $2000",
    matchScore: 88,
    skills: ["React", "MongoDB", "Express"],
    type: "Full-time",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Innovation Labs",
    location: "Đà Nẵng",
    salary: "$1000 - $1800",
    matchScore: 82,
    skills: ["Vue.js", "React", "CSS"],
    type: "Remote",
  },
];

export function AIJobRecommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073] rounded-2xl p-8 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Gợi ý việc làm bởi AI</h2>
              <p className="text-[#9AD0C2] text-sm">Phân tích dựa trên kỹ năng và kinh nghiệm của bạn</p>
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4 mb-6">
          {recommendedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-2 group-hover:text-[#9AD0C2] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-[#9AD0C2] mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Match Score */}
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="6"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="#9AD0C2"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: job.matchScore / 100 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        strokeDasharray={`${2 * Math.PI * 32}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-lg">{job.matchScore}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#9AD0C2] mt-1">Phù hợp</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-[#9AD0C2] text-[#9AD0C2] bg-white/5 hover:bg-white/10"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-[#265073] py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span className="text-lg">Xem tất cả đề xuất AI</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}


