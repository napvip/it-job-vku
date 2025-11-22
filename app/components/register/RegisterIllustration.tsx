"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, Target, Zap, MessageCircle } from "lucide-react";

export function RegisterIllustration() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Matching thông minh",
      description: "Gợi ý việc làm phù hợp với kỹ năng của bạn"
    },
    {
      icon: Target,
      title: "Gợi ý ứng viên theo JD",
      description: "Tìm ứng viên chính xác dựa trên mô tả công việc"
    },
    {
      icon: TrendingUp,
      title: "Quản lý hồ sơ dễ dàng",
      description: "Theo dõi tiến trình tuyển dụng tập trung"
    },
    {
      icon: MessageCircle,
      title: "Chat & Phỏng vấn nhanh",
      description: "Kết nối trực tiếp với nhà tuyển dụng/ứng viên"
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073]">
        {/* Animated Circles */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#9AD0C2] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#ECF4D6] rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>
        </div>

        {/* Floating Icons */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${10 + (i % 6) * 15}%`,
              top: `${15 + Math.floor(i / 6) * 18}%`,
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 py-16 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          {/* Icon Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12 relative"
          >
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto border border-white/20 shadow-2xl">
              <Zap className="w-16 h-16 text-[#9AD0C2]" />
            </div>
            
            {/* Orbiting Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-[#9AD0C2] rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-[#265073]" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-1/2 -right-8 -translate-y-1/2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl mb-4">
              Nền tảng tuyển dụng IT
              <br />
              thông minh dựa trên AI
            </h2>
            <p className="text-lg text-white/90">
              Kết nối tài năng với cơ hội trong kỷ nguyên số
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#9AD0C2] rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#265073]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 grid grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl text-[#9AD0C2] mb-1">10K+</div>
              <div className="text-xs text-white/80">Việc làm</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl text-[#9AD0C2] mb-1">1K+</div>
              <div className="text-xs text-white/80">Công ty</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl text-[#9AD0C2] mb-1">50K+</div>
              <div className="text-xs text-white/80">Ứng viên</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


