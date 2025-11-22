"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, Briefcase, TrendingUp, RefreshCw, Zap } from 'lucide-react';

const CurrentPlanSidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Current Plan Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]"
      >
        <h3 className="text-[#265073] mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#2D9596]" />
          Gói hiện tại
        </h3>

        <div className="space-y-4">
          {/* Plan Badge */}
          <div className="p-4 bg-gradient-to-r from-[#9AD0C2] to-[#2D9596] rounded-lg text-center">
            <p className="text-sm text-white/80 mb-1">Đang sử dụng</p>
            <h4 className="text-white">FREE</h4>
          </div>

          {/* Expiry Date */}
          <div className="p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#2D9596]" />
              <span className="text-sm text-[#265073]/70">Ngày hết hạn</span>
            </div>
            <p className="text-[#265073]">Không giới hạn</p>
          </div>

          {/* Usage Stats */}
          <div className="space-y-3">
            {/* CV Views */}
            <div className="p-3 bg-[#ECF4D6] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#2D9596]" />
                  <span className="text-sm text-[#265073]/70">Lượt xem CV</span>
                </div>
                <span className="text-sm text-[#265073]">0 / 0</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                <div className="bg-gray-300 h-full" style={{ width: '0%' }} />
              </div>
            </div>

            {/* Job Posts */}
            <div className="p-3 bg-[#ECF4D6] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#2D9596]" />
                  <span className="text-sm text-[#265073]/70">Tin đăng</span>
                </div>
                <span className="text-sm text-[#265073]">0 / 1</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#2D9596] h-full transition-all"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          <button className="w-full py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Nâng cấp gói
          </button>
          <button className="w-full py-2.5 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Gia hạn
          </button>
        </div>
      </motion.div>

      {/* Quick Benefits */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white"
      >
        <h4 className="mb-3">🚀 Nâng cấp ngay hôm nay!</h4>
        <p className="text-sm text-white/90 mb-4">
          Nhận ngay AI Matching và xem không giới hạn hồ sơ ứng viên với gói Premium.
        </p>
        <button className="w-full py-2 bg-white text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
          Khám phá Premium
        </button>
      </motion.div>
    </div>
  );
};

export default CurrentPlanSidebar;


