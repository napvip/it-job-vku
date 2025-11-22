"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Eye, TrendingUp, ArrowRight } from 'lucide-react';

interface PaymentSummaryProps {
  onNavigateToPackages: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ onNavigateToPackages }) => {
  const currentPlan = {
    name: 'Premium',
    expiryDate: '22/12/2025',
    cvViewsRemaining: 450,
    cvViewsTotal: 500,
  };

  const suggestedPlan = {
    name: 'Enterprise',
    description: 'Không giới hạn CV, AI nâng cao',
    price: 2990000,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[#265073] mb-2">Thanh toán & gói dịch vụ</h2>
        <p className="text-[#265073]/70">Quản lý gói dịch vụ và thông tin thanh toán</p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-8 text-white mb-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/80 mb-2">Gói hiện tại</p>
            <h3 className="text-white text-3xl">{currentPlan.name}</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-white/80" />
              <p className="text-sm text-white/80">Ngày hết hạn</p>
            </div>
            <p className="text-white text-lg">{currentPlan.expiryDate}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-white/80" />
              <p className="text-sm text-white/80">Lượt xem CV còn lại</p>
            </div>
            <p className="text-white text-lg">
              {currentPlan.cvViewsRemaining}/{currentPlan.cvViewsTotal}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{
                width: `${(currentPlan.cvViewsRemaining / currentPlan.cvViewsTotal) * 100}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={onNavigateToPackages}
          className="w-full py-3 bg-white text-[#2D9596] rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
        >
          Xem chi tiết gói dịch vụ
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Suggested Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#265073] mb-1">Gói phù hợp cho bạn</h3>
            <p className="text-sm text-[#265073]/70">{suggestedPlan.description}</p>
          </div>
        </div>

        <div className="p-6 bg-[#ECF4D6] rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#265073]/70 mb-1">Gói {suggestedPlan.name}</p>
              <p className="text-2xl text-[#2D9596]">{formatPrice(suggestedPlan.price)}</p>
              <p className="text-xs text-[#265073]/60 mt-1">/tháng</p>
            </div>
            <button
              onClick={onNavigateToPackages}
              className="px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
            >
              Nâng cấp ngay
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800">
              <strong>Tiết kiệm 20%</strong> khi nâng cấp lên gói Enterprise ngay hôm nay!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSummary;


