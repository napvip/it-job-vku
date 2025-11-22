"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function AIJobSuggestions() {
  const suggestedJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Tech Innovation",
      match: "95%",
      reason: "Khớp với kỹ năng React, TypeScript của bạn"
    },
    {
      id: 2,
      title: "Full-stack Engineer",
      company: "StartUp Hub",
      match: "92%",
      reason: "Phù hợp với kinh nghiệm Node.js & React"
    },
    {
      id: 3,
      title: "Frontend Lead",
      company: "Digital Agency",
      match: "88%",
      reason: "Match với vai trò leadership bạn tìm kiếm"
    }
  ];

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#265073] via-[#2D9596] to-[#265073]"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#9AD0C2] rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${10 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white text-sm">AI Powered</span>
          </div>
          <h2 className="text-3xl text-white mb-3">
            Việc làm AI gợi ý cho bạn
          </h2>
          <p className="text-white/90">
            Dựa trên kỹ năng và kinh nghiệm của bạn
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {suggestedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white mb-1">{job.title}</h3>
                  <p className="text-white/80 text-sm">{job.company}</p>
                </div>
                <div className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm">
                  {job.match}
                </div>
              </div>
              <p className="text-white/70 text-sm mb-4">{job.reason}</p>
              <button className="text-white hover:text-[#9AD0C2] transition-colors text-sm flex items-center gap-2">
                Xem chi tiết
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="px-8 py-3 bg-white text-[#265073] rounded-lg hover:bg-[#9AD0C2] transition-all inline-flex items-center gap-2">
            Đăng nhập để xem thêm gợi ý AI
            <Sparkles className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}


