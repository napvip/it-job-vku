"use client";

import { motion } from "framer-motion";
import { Sparkles, User, Building2 } from "lucide-react";

export function AICTA() {
  return (
    <section className="py-20 bg-[#265073] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
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
          className="absolute top-0 right-0 w-96 h-96 bg-[#9AD0C2] rounded-full blur-3xl"
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#2D9596] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border-2 border-white/20"
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl mb-6">
              Trải nghiệm sức mạnh của AI trong
              <br />
              <span className="text-[#9AD0C2]">tuyển dụng & tìm việc IT</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Hãy để AI giúp bạn tìm được công việc mơ ước hoặc ứng viên lý tưởng
              chỉ trong vài phút
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-5 bg-white text-[#265073] rounded-full hover:bg-[#9AD0C2] transition-all shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-lg">Dành cho Ứng viên</div>
                    <div className="text-sm opacity-70">Tìm việc với AI</div>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-5 bg-[#2D9596] text-white rounded-full hover:bg-[#265073] transition-all shadow-xl hover:shadow-2xl border-2 border-white/20"
              >
                <div className="flex items-center justify-center gap-3">
                  <Building2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-lg">Dành cho Nhà tuyển dụng</div>
                    <div className="text-sm opacity-90">Tuyển dụng với AI</div>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Large CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-[#9AD0C2] to-[#2D9596] text-[#265073] rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Trải nghiệm ngay - Miễn phí
                </div>
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap justify-center gap-8 text-white/70"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Trusted by 3000+ companies</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>100% Secure</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


