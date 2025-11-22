"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface AboutCTAProps {
  onNavigateToRegister?: () => void;
}

export function AboutCTA({ onNavigateToRegister }: AboutCTAProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073] relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-[#9AD0C2] rounded-full blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#ECF4D6] rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 border border-white/30"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <h2 className="text-white text-4xl md:text-5xl mb-6">
              Sẵn sàng bắt đầu hành trình của bạn?
            </h2>

            {/* Description */}
            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Tham gia cùng hàng ngàn ứng viên và nhà tuyển dụng đang sử dụng
              nền tảng AI của chúng tôi để kết nối và phát triển
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToRegister}
                className="px-8 py-4 bg-white text-[#265073] rounded-full hover:bg-[#9AD0C2] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Đăng ký ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent text-white rounded-full border-2 border-white hover:bg-white/10 transition-all"
              >
                Tìm hiểu thêm
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { number: "98%", label: "Độ hài lòng" },
                { number: "5 ngày", label: "Thời gian TB" },
                { number: "24/7", label: "Hỗ trợ" },
              ].map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="text-3xl mb-2">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


