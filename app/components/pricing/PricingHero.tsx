"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function PricingHero() {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073]">
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
        className="absolute top-10 right-10 w-96 h-96 bg-[#9AD0C2] rounded-full blur-3xl"
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
        className="absolute bottom-10 left-10 w-96 h-96 bg-[#ECF4D6] rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <Sparkles className="w-5 h-5" />
              <span>Gói dịch vụ linh hoạt</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl mb-6">
              Các gói dịch vụ dành cho
              <br />
              Nhà tuyển dụng IT
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Chọn gói phù hợp với quy mô và nhu cầu tuyển dụng của doanh nghiệp.
              Tất cả các gói đều được hỗ trợ bởi công nghệ AI tiên tiến.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


