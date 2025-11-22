"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Wallet,
  Building2,
  Copy,
  Check,
  QrCode,
  Smartphone,
} from 'lucide-react';

interface PaymentMethodsCardProps {
  selectedMethod: 'card' | 'momo' | 'bank';
  onMethodChange: (method: 'card' | 'momo' | 'bank') => void;
  sendInvoice: boolean;
  onSendInvoiceChange: (send: boolean) => void;
}

const PaymentMethodsCard: React.FC<PaymentMethodsCardProps> = ({
  selectedMethod,
  onMethodChange,
  sendInvoice,
  onSendInvoiceChange,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const paymentMethods = [
    {
      id: 'card',
      label: 'Thẻ ngân hàng',
      description: 'ATM / Visa / MasterCard',
      icon: CreditCard,
    },
    {
      id: 'momo',
      label: 'Ví điện tử',
      description: 'MoMo / ZaloPay',
      icon: Wallet,
    },
    {
      id: 'bank',
      label: 'Chuyển khoản',
      description: 'Internet Banking',
      icon: Building2,
    },
  ];

  const bankInfo = {
    bankName: 'Ngân hàng TMCP Á Châu (ACB)',
    accountNumber: '123456789012',
    accountName: 'CONG TY TNHH CONG NGHE ABC',
    content: 'THANHTOAN PREMIUM TXN',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]"
    >
      <h3 className="text-[#265073] mb-6">Chọn phương thức thanh toán</h3>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id as any)}
              className={`p-4 border-2 rounded-lg transition-all text-left ${
                isSelected
                  ? 'border-[#2D9596] bg-[#2D9596]/5'
                  : 'border-[#9AD0C2] hover:border-[#2D9596]'
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-[#2D9596]' : 'text-[#265073]/60'}`} />
              <div className="text-sm text-[#265073] mb-1">{method.label}</div>
              <div className="text-xs text-[#265073]/60">{method.description}</div>
            </button>
          );
        })}
      </div>

      {/* Payment Method Content */}
      <div className="min-h-[300px]">
        {selectedMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-[#265073] mb-2">Số thẻ</label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors"
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#265073] mb-2">Tên chủ thẻ</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                placeholder="NGUYEN VAN A"
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#265073] mb-2">Ngày hết hạn</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[#265073] mb-2">CVV</label>
                <input
                  type="password"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                🔒 Thông tin thẻ của bạn được bảo mật và mã hóa an toàn
              </p>
            </div>
          </motion.div>
        )}

        {selectedMethod === 'momo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Wallet className="w-6 h-6 text-pink-600" />
              <h4 className="text-[#265073]">Thanh toán qua ví điện tử</h4>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center border-4 border-[#9AD0C2]">
                <div className="text-center">
                  <QrCode className="w-32 h-32 text-[#265073]/20 mx-auto mb-2" />
                  <p className="text-sm text-[#265073]/50">QR Code</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-[#265073]">
                <Smartphone className="w-5 h-5 text-[#2D9596]" />
                <span>Quét mã để thanh toán nhanh chóng</span>
              </div>
              <p className="text-sm text-[#265073]/70">
                Mở ứng dụng MoMo hoặc ZaloPay và quét mã QR để hoàn tất thanh toán
              </p>
            </div>
          </motion.div>
        )}

        {selectedMethod === 'bank' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-4 bg-[#ECF4D6] rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#265073]/70 mb-1">Tên ngân hàng</p>
                  <p className="text-[#265073]">{bankInfo.bankName}</p>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.bankName, 'bank')}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  {copiedField === 'bank' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-[#2D9596]" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#265073]/70 mb-1">Số tài khoản</p>
                  <p className="text-[#265073]">{bankInfo.accountNumber}</p>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountNumber, 'account')}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  {copiedField === 'account' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-[#2D9596]" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#265073]/70 mb-1">Chủ tài khoản</p>
                  <p className="text-[#265073]">{bankInfo.accountName}</p>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.accountName, 'name')}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  {copiedField === 'name' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-[#2D9596]" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#265073]/70 mb-1">Nội dung chuyển khoản</p>
                  <p className="text-[#265073]">{bankInfo.content}</p>
                </div>
                <button
                  onClick={() => handleCopy(bankInfo.content, 'content')}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  {copiedField === 'content' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-[#2D9596]" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống xác nhận tự động
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Send Invoice Checkbox */}
      <div className="mt-6 pt-6 border-t-2 border-[#9AD0C2]">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sendInvoice}
            onChange={(e) => onSendInvoiceChange(e.target.checked)}
            className="w-5 h-5 text-[#2D9596] border-2 border-[#9AD0C2] rounded focus:ring-[#2D9596]"
          />
          <span className="text-[#265073]">Gửi hóa đơn về email công ty</span>
        </label>
      </div>
    </motion.div>
  );
};

export default PaymentMethodsCard;


