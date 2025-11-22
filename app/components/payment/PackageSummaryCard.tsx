"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';

interface PackageSummaryCardProps {
  packageName: string;
  period: '1-month' | '3-months' | '1-year';
  originalPrice: number;
  discount: number;
  finalPrice: number;
  expiryDate: string;
  onChangePackage: () => void;
}

const PackageSummaryCard: React.FC<PackageSummaryCardProps> = ({
  packageName,
  period,
  originalPrice,
  discount,
  finalPrice,
  expiryDate,
  onChangePackage,
}) => {
  const getPeriodLabel = () => {
    switch (period) {
      case '1-month':
        return '1 tháng';
      case '3-months':
        return '3 tháng';
      case '1-year':
        return '1 năm';
      default:
        return period;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#2D9596]" />
            <h3 className="text-[#265073]">Gói {packageName}</h3>
          </div>
          <p className="text-sm text-[#265073]/70">Chu kỳ: {getPeriodLabel()}</p>
        </div>
        <button
          onClick={onChangePackage}
          className="px-4 py-2 text-sm bg-white border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors"
        >
          Thay đổi gói
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {/* Original Price */}
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#265073]/70">Giá gốc</span>
            <span className="text-sm text-[#265073]/70 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
        )}

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#265073]/70">Giảm giá</span>
            <span className="text-sm text-green-600">
              -{formatPrice(originalPrice - finalPrice)} ({Math.round(discount * 100)}%)
            </span>
          </div>
        )}

        <div className="border-t-2 border-[#9AD0C2] pt-3">
          <div className="flex items-center justify-between">
            <span className="text-[#265073]">Tổng tiền</span>
            <span className="text-2xl text-[#2D9596]">{formatPrice(finalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Expiry Date */}
      <div className="p-4 bg-[#ECF4D6] rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-4 h-4 text-[#2D9596]" />
          <span className="text-sm text-[#265073]/70">Ngày hết hạn sau khi kích hoạt</span>
        </div>
        <p className="text-[#265073] ml-6">{expiryDate}</p>
      </div>
    </motion.div>
  );
};

export default PackageSummaryCard;


