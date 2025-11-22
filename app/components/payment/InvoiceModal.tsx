"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, Printer, Building2 } from 'lucide-react';
import { BillingTransaction } from './billingData';

interface InvoiceModalProps {
  transaction: BillingTransaction;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ transaction, onClose }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleDownload = () => {
    // Simulate download
    alert('Đang tải hóa đơn PDF...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-[#9AD0C2] p-6 flex items-center justify-between z-10">
          <h2 className="text-[#265073]">Hóa đơn thanh toán</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
              title="Tải PDF"
            >
              <Download className="w-5 h-5 text-[#2D9596]" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
              title="In hóa đơn"
            >
              <Printer className="w-5 h-5 text-[#2D9596]" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#265073]" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8">
          {/* Company Logo & Info */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#265073]">ITJobMatch</h3>
                  <p className="text-sm text-[#265073]/70">Nền tảng tuyển dụng IT</p>
                </div>
              </div>
              <div className="text-sm text-[#265073]/70 space-y-1">
                <p>Công ty TNHH Công Nghệ ITJobMatch</p>
                <p>123 Lê Lợi, Quận 1, TP.HCM</p>
                <p>Email: contact@itjobmatch.com</p>
                <p>Hotline: 1900 1234</p>
              </div>
            </div>

            <div className="text-right">
              <h4 className="text-[#265073] mb-2">HÓA ĐƠN</h4>
              <div className="text-sm text-[#265073]/70 space-y-1">
                <p>Mã GD: {transaction.transactionCode}</p>
                <p>Ngày: {transaction.date} - {transaction.time}</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          {transaction.companyInfo && (
            <div className="mb-8 p-6 bg-[#ECF4D6] rounded-lg">
              <h4 className="text-[#265073] mb-3">Thông tin khách hàng</h4>
              <div className="text-sm text-[#265073]/80 space-y-1">
                <p>Công ty: {transaction.companyInfo.name}</p>
                <p>Mã số thuế: {transaction.companyInfo.taxCode}</p>
                <p>Địa chỉ: {transaction.companyInfo.address}</p>
                <p>Email: {transaction.companyInfo.email}</p>
              </div>
            </div>
          )}

          {/* Invoice Details Table */}
          <div className="mb-8">
            <table className="w-full border-2 border-[#9AD0C2] rounded-lg overflow-hidden">
              <thead className="bg-[#9AD0C2]">
                <tr>
                  <th className="text-left p-4 text-[#265073]">Dịch vụ</th>
                  <th className="text-center p-4 text-[#265073]">Chu kỳ</th>
                  <th className="text-right p-4 text-[#265073]">Đơn giá</th>
                  <th className="text-right p-4 text-[#265073]">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="p-4 border-t-2 border-[#9AD0C2] text-[#265073]">
                    Gói {transaction.packageName}
                  </td>
                  <td className="p-4 border-t-2 border-[#9AD0C2] text-center text-[#265073]">
                    {transaction.period}
                  </td>
                  <td className="p-4 border-t-2 border-[#9AD0C2] text-right text-[#265073]">
                    {formatPrice(transaction.amount)}
                  </td>
                  <td className="p-4 border-t-2 border-[#9AD0C2] text-right text-[#265073]">
                    {formatPrice(transaction.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-lg">
                <span className="text-[#265073]">Tổng cộng</span>
                <span className="text-[#265073]">{formatPrice(transaction.amount)}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#9AD0C2] to-[#2D9596] rounded-lg">
                <span className="text-white">Tổng thanh toán</span>
                <span className="text-white text-xl">{formatPrice(transaction.amount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mb-8 p-6 border-2 border-[#9AD0C2] rounded-lg">
            <h4 className="text-[#265073] mb-3">Thông tin thanh toán</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#265073]/70 mb-1">Phương thức thanh toán</p>
                <p className="text-[#265073]">
                  {transaction.paymentMethod === 'momo' && 'Ví MoMo'}
                  {transaction.paymentMethod === 'card' && 'Thẻ ngân hàng'}
                  {transaction.paymentMethod === 'bank' && 'Chuyển khoản ngân hàng'}
                  {transaction.paymentMethod === 'zalopay' && 'Ví ZaloPay'}
                </p>
              </div>
              <div>
                <p className="text-[#265073]/70 mb-1">Trạng thái</p>
                <p className="text-green-600">Đã thanh toán</p>
              </div>
              <div>
                <p className="text-[#265073]/70 mb-1">Ngày thanh toán</p>
                <p className="text-[#265073]">
                  {transaction.date} - {transaction.time}
                </p>
              </div>
              <div>
                <p className="text-[#265073]/70 mb-1">Ngày hết hạn</p>
                <p className="text-[#265073]">{transaction.expiryDate}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="p-4 bg-[#ECF4D6] rounded-lg text-sm text-[#265073]/70">
            <p className="mb-2">
              <strong>Ghi chú:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Gói dịch vụ được kích hoạt ngay sau khi thanh toán thành công.</li>
              <li>
                Để gia hạn hoặc nâng cấp gói, vui lòng truy cập trang Gói dịch vụ.
              </li>
              <li>Mọi thắc mắc vui lòng liên hệ: support@itjobmatch.com</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t-2 border-[#9AD0C2] text-center text-sm text-[#265073]/70">
            <p>Cảm ơn quý khách đã sử dụng dịch vụ của ITJobMatch!</p>
            <p className="mt-1">
              Đây là hóa đơn điện tử được tạo tự động và có giá trị pháp lý.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InvoiceModal;


