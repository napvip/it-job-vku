"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Building2, Wallet, CheckCircle } from 'lucide-react';
import { packages } from './packagesData';

interface PaymentModalProps {
  packageId: string;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ packageId, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1-month' | '3-months' | '1-year'>(
    '1-month'
  );
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'momo' | 'banking' | 'transfer'
  >('card');
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedPackage = packages.find((pkg) => pkg.id === packageId);

  if (!selectedPackage) return null;

  const calculatePrice = () => {
    if (selectedPackage.price === null) return null;

    const basePrice = selectedPackage.price;
    let multiplier = 1;
    let discount = 0;

    switch (selectedPeriod) {
      case '1-month':
        multiplier = 1;
        break;
      case '3-months':
        multiplier = 3;
        discount = 0.1; // 10% off
        break;
      case '1-year':
        multiplier = 12;
        discount = 0.2; // 20% off
        break;
    }

    const totalPrice = basePrice * multiplier * (1 - discount);
    return Math.round(totalPrice);
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const paymentMethods = [
    { id: 'card', name: 'Thẻ ngân hàng', icon: CreditCard },
    { id: 'momo', name: 'Ví MoMo', icon: Wallet },
    { id: 'banking', name: 'Internet Banking', icon: Building2 },
    { id: 'transfer', name: 'Chuyển khoản', icon: Smartphone },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-[#9AD0C2] p-6 flex items-center justify-between">
          <h2 className="text-[#265073]">Thanh toán gói {selectedPackage.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#265073]" />
          </button>
        </div>

        <div className="p-6">
          {/* Package Summary */}
          <div className="mb-6 p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#265073] mb-1">Gói {selectedPackage.name}</h3>
                <p className="text-sm text-[#265073]/70">
                  Nâng cấp để mở khóa tất cả tính năng
                </p>
              </div>
            </div>
          </div>

          {/* Period Selection */}
          <div className="mb-6">
            <label className="block text-sm text-[#265073] mb-3">Chọn chu kỳ thanh toán</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '1-month', label: '1 tháng', badge: null },
                { id: '3-months', label: '3 tháng', badge: '-10%' },
                { id: '1-year', label: '1 năm', badge: '-20%' },
              ].map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id as any)}
                  className={`relative p-4 border-2 rounded-lg transition-all ${
                    selectedPeriod === period.id
                      ? 'border-[#2D9596] bg-[#2D9596]/5'
                      : 'border-[#9AD0C2] hover:border-[#2D9596]'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-[#265073] mb-1">{period.label}</div>
                    {period.badge && (
                      <div className="inline-block px-2 py-0.5 bg-[#2D9596] text-white text-xs rounded">
                        {period.badge}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Display */}
          {selectedPackage.price !== null && (
            <div className="mb-6 p-6 bg-gradient-to-r from-[#9AD0C2] to-[#2D9596] rounded-lg text-white">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Tổng thanh toán</p>
                  <h2 className="text-white">{formatPrice(calculatePrice())}</h2>
                </div>
                {selectedPeriod !== '1-month' && (
                  <div className="text-right">
                    <p className="text-white/80 text-sm line-through">
                      {formatPrice(
                        selectedPackage.price *
                          (selectedPeriod === '3-months' ? 3 : 12)
                      )}
                    </p>
                    <p className="text-white text-sm">
                      Tiết kiệm{' '}
                      {formatPrice(
                        selectedPackage.price *
                          (selectedPeriod === '3-months' ? 3 : 12) -
                          (calculatePrice() || 0)
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-sm text-[#265073] mb-3">
              Phương thức thanh toán
            </label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 border-2 rounded-lg transition-all flex items-center gap-3 ${
                      paymentMethod === method.id
                        ? 'border-[#2D9596] bg-[#2D9596]/5'
                        : 'border-[#9AD0C2] hover:border-[#2D9596]'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#2D9596]" />
                    <span className="text-sm text-[#265073]">{method.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bonus Info */}
          {selectedPeriod === '1-year' && (
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                🎁 Tặng thêm 10 lượt xem hồ sơ khi thanh toán gói 1 năm!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handlePayment}
              disabled={selectedPackage.price === null}
              className="flex-1 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedPackage.price === null ? 'Liên hệ tư vấn' : 'Thanh toán ngay'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]"
          >
            <div className="bg-white rounded-2xl p-8 text-center max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-[#2D9596] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-[#265073] mb-2">Thanh toán thành công!</h3>
              <p className="text-[#265073]/70">
                Gói {selectedPackage.name} đã được kích hoạt.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentModal;


