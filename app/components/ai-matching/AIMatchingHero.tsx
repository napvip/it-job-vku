"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, TrendingUp } from "lucide-react";

export function AIMatchingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-[#9AD0C2] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Connecting lines effect */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="#9AD0C2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Gradient overlays */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#ECF4D6] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#9AD0C2] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
            >
              <Sparkles className="w-5 h-5 text-[#9AD0C2]" />
              <span>AI-Powered Matching</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl mb-6">
              AI Matching – Công nghệ gợi ý việc làm & ứng viên{" "}
              <span className="text-[#9AD0C2]">siêu chính xác</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[#9AD0C2] mb-8 leading-relaxed">
              Tự động phân tích CV, kỹ năng, mô tả công việc và dữ liệu thị trường IT
              để đưa ra đề xuất phù hợp đến 95%
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#265073] rounded-full hover:bg-[#9AD0C2] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                <Zap className="w-5 h-5" />
                Dùng thử AI
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#2D9596] text-white rounded-full hover:bg-[#265073] transition-all border-2 border-white/30"
              >
                Đăng nhập để trải nghiệm
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: "95%", label: "Độ chính xác" },
                { number: "10K+", label: "CV phân tích" },
                { number: "3K+", label: "Công ty sử dụng" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Illustration - AI Matching Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Center AI Node */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-full flex items-center justify-center shadow-2xl z-10"
              >
                <Sparkles className="w-16 h-16 text-white" />
              </motion.div>

              {/* Left Card - Candidate */}
              <motion.div
                animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-48 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              >
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-xl mb-3 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div className="h-2 bg-[#ECF4D6] rounded mb-2"></div>
                <div className="h-2 bg-[#ECF4D6] rounded w-3/4 mb-2"></div>
                <div className="flex gap-1 mt-3">
                  <div className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded">React</div>
                  <div className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded">NodeJS</div>
                </div>
              </motion.div>

              {/* Right Card - Job */}
              <motion.div
                animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-48 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
              >
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-xl mb-3 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div className="h-2 bg-[#ECF4D6] rounded mb-2"></div>
                <div className="h-2 bg-[#ECF4D6] rounded w-3/4 mb-2"></div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="text-2xl text-[#2D9596]">95%</div>
                  <div className="text-xs text-[#265073]">Match</div>
                </div>
              </motion.div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                <motion.line
                  x1="25%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke="#9AD0C2"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  animate={{
                    strokeDashoffset: [0, -10],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="75%"
                  y2="50%"
                  stroke="#9AD0C2"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  animate={{
                    strokeDashoffset: [0, -10],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>

              {/* Spacer for relative positioning */}
              <div className="h-96"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


