"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Brain } from "lucide-react";

export function CompanyAISuggestions() {
  const recommendedCompanies = [
    {
      id: 1,
      name: "VinTech AI",
      logo: "🤖",
      match: "96%",
      jobs: 12,
    },
    {
      id: 2,
      name: "FPT Software",
      logo: "💼",
      match: "94%",
      jobs: 28,
    },
    {
      id: 3,
      name: "TechViet Solutions",
      logo: "🚀",
      match: "91%",
      jobs: 15,
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
              Công ty AI đề xuất dựa trên hồ sơ của bạn
            </h2>
            <p className="text-white/90 text-lg">
              Phân tích kỹ năng và mong muốn nghề nghiệp để gợi ý công ty phù hợp
            </p>
          </div>

          {/* Company Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recommendedCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-[#9AD0C2] rounded-xl flex items-center justify-center text-2xl">
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="text-white mb-1 group-hover:text-[#9AD0C2] transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-white/80 text-sm">{company.jobs} vị trí tuyển dụng</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {company.match}
                  </div>
                </div>

                <button className="text-white hover:text-[#9AD0C2] transition-colors text-sm flex items-center gap-2 group-hover:gap-3 duration-300">
                  Xem công ty
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
              Đăng nhập để xem đề xuất AI
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


