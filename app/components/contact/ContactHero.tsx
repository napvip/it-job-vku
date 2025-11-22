"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ContactHero() {
  return (
    <section className="pt-20 pb-16 relative overflow-hidden">
      {/* Background */}
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
        className="absolute top-10 right-10 w-96 h-96 bg-[#9AD0C2] rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6 border border-[#9AD0C2] shadow-lg">
              <MessageCircle className="w-10 h-10 text-[#2D9596]" />
            </div>

            {/* Title */}
            <h1 className="text-[#265073] text-5xl mb-4">
              Liên hệ với chúng tôi
            </h1>

            {/* Subtitle */}
            <p className="text-[#2D9596] text-lg">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
              Gửi câu hỏi, góp ý hoặc báo lỗi để cùng cải thiện dịch vụ.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


