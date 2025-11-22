"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, CreditCard, Package, Clock } from 'lucide-react';

interface PaymentSuccessModalProps {
  transactionCode: string;
  date: string;
  amount: number;
  packageName: string;
  expiryDate: string;
  onViewHistory: () => void;
  onBackToPackages: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  transactionCode,
  date,
  amount,
  packageName,
  expiryDate,
  onViewHistory,
  onBackToPackages,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-[#2D9596] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <h2 className="text-[#265073] mb-2">🎉 Thanh toán thành công!</h2>
        <p className="text-[#265073]/70 mb-6">Gói {packageName} đã được kích hoạt.</p>

        {/* Transaction Details */}
        <div className="bg-[#ECF4D6] rounded-lg p-6 text-left space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-[#2D9596] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-[#265073]/70 mb-1">Mã giao dịch</p>
              <p className="text-[#265073]">{transactionCode}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#2D9596] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-[#265073]/70 mb-1">Ngày thanh toán</p>
              <p className="text-[#265073]">{date}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-[#2D9596] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-[#265073]/70 mb-1">Gói đã mua</p>
              <p className="text-[#265073]">{packageName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-[#2D9596] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-[#265073]/70 mb-1">Tổng tiền</p>
              <p className="text-[#2D9596] text-lg">{formatPrice(amount)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#2D9596] mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-[#265073]/70 mb-1">Hạn sử dụng</p>
              <p className="text-[#265073]">{expiryDate}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onViewHistory}
            className="w-full py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
          >
            Xem lịch sử thanh toán
          </button>
          <button
            onClick={onBackToPackages}
            className="w-full py-3 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors"
          >
            Quay lại trang gói dịch vụ
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessModal;


