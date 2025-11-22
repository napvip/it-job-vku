"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Target } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function AboutHero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-[#9AD0C2] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#2D9596] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-[#9AD0C2] mb-8"
            >
              <Sparkles className="w-5 h-5 text-[#2D9596]" />
              <span className="text-[#265073]">Powered by AI</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-[#265073] text-5xl md:text-6xl mb-6">
              Nền tảng tuyển dụng IT thông minh
              <br />
              <span className="text-[#2D9596]">ứng dụng AI Matching</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[#2D9596] mb-12 max-w-3xl mx-auto">
              Kết nối đúng người với đúng công việc, tối ưu hóa quy trình tuyển dụng
              bằng công nghệ trí tuệ nhân tạo tiên tiến
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { number: "10,000+", label: "Việc làm IT" },
                { number: "1,000+", label: "Công ty uy tín" },
                { number: "50,000+", label: "Ứng viên tài năng" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#9AD0C2] hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl text-[#2D9596] mb-2">{stat.number}</div>
                  <div className="text-[#265073]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(154,208,194,0.3)] p-8 border border-[#9AD0C2]">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjMyNzA5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Technology"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Icons */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 left-8 w-16 h-16 bg-[#2D9596] rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute bottom-8 right-8 w-16 h-16 bg-[#9AD0C2] rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Target className="w-8 h-8 text-[#265073]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


