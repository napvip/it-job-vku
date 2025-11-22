"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

const DiscountBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-gradient-to-r from-[#9AD0C2] via-[#2D9596] to-[#265073] rounded-2xl p-8 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Content */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Gift className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-white">Ưu đãi đặc biệt!</h3>
            </div>
            <p className="text-white/90 text-lg">
              Giảm 20% khi mua theo năm – Tặng thêm 10 lượt xem hồ sơ!
            </p>
            <p className="text-white/80 text-sm mt-1">
              Áp dụng cho tất cả gói Standard, Premium và Premium Plus
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="px-6 py-3 bg-white text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors whitespace-nowrap shadow-lg">
          Xem ưu đãi
        </button>
      </div>

      {/* Floating Icons */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-4 right-20 text-white/20"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-4 left-20 text-white/20"
      >
        <Gift className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
};

export default DiscountBanner;


