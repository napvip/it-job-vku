"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, Target } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function LoginIllustration() {
  const router = useRouter();
  const features = [
    { icon: Sparkles, text: "AI Matching thông minh" },
    { icon: TrendingUp, text: "10,000+ việc làm IT" },
    { icon: Users, text: "1,000+ công ty uy tín" },
    { icon: Target, text: "Tìm việc chính xác" },
  ];

  return (
    <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073]">
        {/* Animated Circles */}
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
          className="absolute -top-20 -right-20 w-96 h-96 bg-[#9AD0C2] rounded-full blur-3xl"
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
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#ECF4D6] rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${5 + (i % 8) * 12}%`,
              top: `${10 + Math.floor(i / 8) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 py-16 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center"
        >
          {/* Illustration/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-full h-[300px] mb-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3JraW5nJTIwbGFwdG9wfGVufDF8fHx8MTc2MzI3MDg3MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Developer working"
                className="w-full h-full object-contain opacity-90"
              />
              
              {/* Floating cards around image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20"
              >
                <Sparkles className="w-6 h-6 text-[#9AD0C2]" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute bottom-8 left-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20"
              >
                <TrendingUp className="w-6 h-6 text-[#9AD0C2]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl mb-4"
          >
            Nền tảng tuyển dụng IT thông minh
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-white/90 mb-8"
          >
            Tìm đúng người – đúng việc – đúng thời điểm
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all"
              >
                <feature.icon className="w-6 h-6 text-[#9AD0C2] mb-2 mx-auto" />
                <p className="text-sm">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <p className="mb-4">
              Bạn chưa có tài khoản?
              <br />
              Đăng ký để trải nghiệm <span className="text-[#9AD0C2]">AI Matching</span>
            </p>
            <button
              onClick={() => router.push("/register")}
              className="px-8 py-3 bg-[#9AD0C2] text-[#265073] rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl"
            >
              Đăng ký ngay
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


