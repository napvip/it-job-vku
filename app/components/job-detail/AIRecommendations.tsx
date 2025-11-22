"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Brain } from "lucide-react";

export function AIRecommendations() {
  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Backend Developer",
      company: "Tech Corp",
      match: "94%",
      salary: "35-60 triệu",
    },
    {
      id: 2,
      title: "Full-stack Engineer",
      company: "Innovation Hub",
      match: "91%",
      salary: "30-50 triệu",
    },
    {
      id: 3,
      title: "NodeJS Developer",
      company: "Digital Solutions",
      match: "89%",
      salary: "25-45 triệu",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#265073] via-[#2D9596] to-[#265073]"></div>

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#9AD0C2] rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${5 + i * 6}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <Brain className="w-5 h-5 text-white" />
              <span className="text-white text-sm">AI Powered Matching</span>
            </div>
            <h2 className="text-3xl text-white mb-3">
              Công việc AI gợi ý dựa trên hồ sơ của bạn
            </h2>
            <p className="text-white/90 text-lg">
              Phân tích kỹ năng và kinh nghiệm để đề xuất công việc phù hợp nhất
            </p>
          </div>

          {/* Job Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recommendedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white mb-2 group-hover:text-[#9AD0C2] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-white/80 text-sm">{job.company}</p>
                  </div>
                  <div className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {job.match}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[#9AD0C2]">{job.salary}</span>
                </div>

                <button className="text-white hover:text-[#9AD0C2] transition-colors text-sm flex items-center gap-2 group-hover:gap-3 duration-300">
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* CTA for non-logged in users */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button className="px-8 py-4 bg-white text-[#265073] rounded-xl hover:bg-[#9AD0C2] transition-all inline-flex items-center gap-3 text-lg shadow-xl">
              <Sparkles className="w-5 h-5" />
              Đăng nhập để xem thêm gợi ý AI
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


