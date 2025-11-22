"use client";

import { motion } from "framer-motion";
import { Sparkles, Network, Brain } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-[#ECF4D6] py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[#265073] text-5xl md:text-6xl mb-6 tracking-wide">
              Nền tảng tuyển dụng IT thông minh – kết nối nhanh với AI
            </h1>
            <h4 className="text-[#2D9596] text-xl mb-8">
              Gợi ý việc làm và ứng viên chính xác hơn nhờ AI Matching – tối ưu hoá thời gian cho cả ứng viên IT và doanh nghiệp.
            </h4>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#2D9596] text-white rounded-xl hover:bg-[#37a8a7] transition-all shadow-lg hover:shadow-xl">
                Tìm việc ngay
              </button>
              <button className="px-8 py-4 border-2 border-[#265073] text-[#265073] rounded-xl hover:bg-[#9AD0C2] transition-all">
                Đăng tin tuyển dụng
              </button>
            </div>
          </motion.div>

          {/* Right: AI Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* AI Network Visualization */}
              <div className="relative w-full h-[400px] flex items-center justify-center">
                {/* Central Brain */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute z-20"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full flex items-center justify-center shadow-2xl">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                {/* Orbiting Nodes */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute w-full h-full"
                    style={{
                      transformOrigin: "center",
                    }}
                  >
                    <div
                      className="absolute w-16 h-16 bg-[#9AD0C2] rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        top: `${Math.sin((i * Math.PI * 2) / 6) * 40 + 50}%`,
                        left: `${Math.cos((i * Math.PI * 2) / 6) * 40 + 50}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {i % 3 === 0 ? (
                        <Sparkles className="w-8 h-8 text-[#265073]" />
                      ) : (
                        <Network className="w-8 h-8 text-[#265073]" />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#9AD0C2] opacity-20 blur-[60px] rounded-full" />
              </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D9596]/20 to-[#265073]/20 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

