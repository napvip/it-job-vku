"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export function PricingCTA() {
  return (
    <section className="py-20 bg-[#ECF4D6]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}></div>
          </div>

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30"
            >
              <MessageCircle className="w-10 h-10" />
            </motion.div>

            <h2 className="text-4xl mb-4">
              Không chắc gói nào phù hợp?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn miễn phí
              để giúp bạn chọn gói dịch vụ phù hợp nhất
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#265073] rounded-full hover:bg-[#9AD0C2] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Liên hệ tư vấn
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent text-white rounded-full border-2 border-white hover:bg-white/10 transition-all"
              >
                Xem demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


