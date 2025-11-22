"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, CheckCircle, XCircle, Calendar, UserCog } from 'lucide-react';

interface AccountSettingsProps {
  onSave: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onSave }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const accountInfo = {
    email: 'nhatuyendung@gmail.com',
    phone: '0901234567',
    emailVerified: true,
    createdDate: '15/06/2024',
    role: 'Admin HR',
  };

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[#265073] mb-2">Thông tin tài khoản</h2>
        <p className="text-[#265073]/70">Quản lý thông tin đăng nhập và bảo mật</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
      >
        {/* Account Information */}
        <div className="space-y-6">
          {/* Email Login */}
          <div className="flex items-start justify-between p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#2D9596] mt-0.5" />
              <div>
                <p className="text-sm text-[#265073]/70 mb-1">Email đăng nhập</p>
                <p className="text-[#265073]">{accountInfo.email}</p>
              </div>
            </div>
            <button
              onClick={() => setShowEmailModal(true)}
              className="px-4 py-2 bg-white border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors text-sm"
            >
              Thay đổi
            </button>
          </div>

          {/* Phone */}
          <div className="flex items-start justify-between p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#2D9596] mt-0.5" />
              <div>
                <p className="text-sm text-[#265073]/70 mb-1">Số điện thoại xác minh</p>
                <p className="text-[#265073]">{accountInfo.phone}</p>
              </div>
            </div>
            <button
              onClick={() => setShowPhoneModal(true)}
              className="px-4 py-2 bg-white border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors text-sm"
            >
              Thay đổi
            </button>
          </div>

          {/* Email Verification Status */}
          <div className="flex items-start justify-between p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-start gap-3">
              {accountInfo.emailVerified ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <div>
                <p className="text-sm text-[#265073]/70 mb-1">Trạng thái xác minh email</p>
                <p className={accountInfo.emailVerified ? 'text-green-600' : 'text-red-600'}>
                  {accountInfo.emailVerified ? 'Đã xác minh' : 'Chưa xác minh'}
                </p>
              </div>
            </div>
            {!accountInfo.emailVerified && (
              <button
                onClick={() => setShowVerifyModal(true)}
                className="px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm"
              >
                Xác minh ngay
              </button>
            )}
          </div>

          {/* Created Date */}
          <div className="flex items-start justify-between p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#2D9596] mt-0.5" />
              <div>
                <p className="text-sm text-[#265073]/70 mb-1">Ngày tạo tài khoản</p>
                <p className="text-[#265073]">{accountInfo.createdDate}</p>
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-start justify-between p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-start gap-3">
              <UserCog className="w-5 h-5 text-[#2D9596] mt-0.5" />
              <div>
                <p className="text-sm text-[#265073]/70 mb-1">Vai trò trong team</p>
                <p className="text-[#265073]">{accountInfo.role}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">
              Admin
            </span>
          </div>
        </div>
      </motion.div>

      {/* Email Change Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-[#265073] mb-4">Thay đổi email đăng nhập</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#265073] mb-2">Email mới</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596]"
                  placeholder="newemail@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-[#265073] mb-2">Mật khẩu xác nhận</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596]"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  onSave();
                }}
                className="flex-1 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 py-3 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors"
              >
                Hủy
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Phone Change Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-[#265073] mb-4">Thay đổi số điện thoại</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-[#265073] mb-2">Số điện thoại mới</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596]"
                  placeholder="0901234567"
                />
              </div>
              <div>
                <label className="block text-sm text-[#265073] mb-2">Mã OTP</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596]"
                  placeholder="Nhập mã 6 số"
                />
                <button className="text-sm text-[#2D9596] mt-2">Gửi mã OTP</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowPhoneModal(false);
                  onSave();
                }}
                className="flex-1 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setShowPhoneModal(false)}
                className="flex-1 py-3 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors"
              >
                Hủy
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Verify Email Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full text-center"
          >
            <Mail className="w-16 h-16 text-[#2D9596] mx-auto mb-4" />
            <h3 className="text-[#265073] mb-2">Xác minh email</h3>
            <p className="text-[#265073]/70 mb-6">
              Chúng tôi đã gửi email xác minh đến {accountInfo.email}. Vui lòng kiểm tra hộp thư
              của bạn.
            </p>
            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
            >
              Đã hiểu
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;


