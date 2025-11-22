"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Target, CheckCircle } from "lucide-react";

export function AIMatching() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#9AD0C2] rounded-full"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 600,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Brain className="w-5 h-5" />
            <span>Công nghệ AI Matching</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6">
            Kết nối thông minh với AI
          </h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            AI phân tích CV và JD để gợi ý ứng viên & việc làm phù hợp đến 95%.
            <br />
            Tối ưu thời gian cho cả hai phía.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Feature Cards with Glassmorphism */}
          {[
            {
              icon: Zap,
              title: "Phân tích nhanh",
              description: "AI xử lý hàng nghìn CV và JD trong vài giây",
            },
            {
              icon: Target,
              title: "Độ chính xác cao",
              description: "Matching chính xác đến 95% dựa trên kỹ năng và kinh nghiệm",
            },
            {
              icon: CheckCircle,
              title: "Tiết kiệm thời gian",
              description: "Giảm 80% thời gian tìm kiếm và sàng lọc ứng viên",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-14 h-14 bg-[#9AD0C2] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-[#265073]" />
                </div>
                <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* AI Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-3 gap-8 items-center">
              {/* Candidate */}
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-24 h-24 bg-[#9AD0C2] rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <span className="text-4xl">👨‍💻</span>
                </motion.div>
                <p className="text-white">Ứng viên</p>
              </div>

              {/* AI Brain */}
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-full flex items-center justify-center mx-auto mb-3 relative"
                >
                  <Brain className="w-16 h-16 text-white" />
                  
                  {/* Orbiting dots */}
                  {[0, 120, 240].map((angle) => (
                    <motion.div
                      key={angle}
                      className="absolute w-4 h-4 bg-white rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                      }}
                      animate={{
                        rotate: -360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div
                        className="w-4 h-4 bg-white rounded-full"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(60px)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-white">AI Engine</p>
              </div>

              {/* Company */}
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                  className="w-24 h-24 bg-[#9AD0C2] rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <span className="text-4xl">🏢</span>
                </motion.div>
                <p className="text-white">Công ty</p>
              </div>
            </div>

            {/* Connecting Lines */}
            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#9AD0C2] to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

