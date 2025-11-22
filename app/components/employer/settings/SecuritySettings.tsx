"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  QrCode,
  Monitor,
  Smartphone,
  Chrome,
  AlertTriangle,
} from 'lucide-react';

interface SecuritySettingsProps {
  onSave: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onSave }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const devices = [
    {
      id: 1,
      name: 'Windows Chrome',
      location: 'Da Nang',
      status: 'active',
      icon: Monitor,
      lastUsed: 'Đang sử dụng',
    },
    {
      id: 2,
      name: 'iPhone Safari',
      location: 'Ho Chi Minh',
      status: 'inactive',
      icon: Smartphone,
      lastUsed: '2 ngày trước',
    },
    {
      id: 3,
      name: 'Macbook Chrome',
      location: 'Ha Noi',
      status: 'inactive',
      icon: Chrome,
      lastUsed: '3 giờ trước',
    },
  ];

  const calculatePasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
    setPasswords({ ...passwords, [field]: value });
    if (field === 'new') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
    }
  };

  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'Yếu';
      case 'medium':
        return 'Trung bình';
      case 'strong':
        return 'Mạnh';
    }
  };

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[#265073] mb-2">Bảo mật & mật khẩu</h2>
        <p className="text-[#265073]/70">Quản lý mật khẩu và cài đặt bảo mật tài khoản</p>
      </motion.div>

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-[#2D9596]" />
          <h3 className="text-[#265073]">Đổi mật khẩu</h3>
        </div>

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">Mật khẩu hiện tại</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors pr-12"
                placeholder="Nhập mật khẩu hiện tại"
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#265073]/40 hover:text-[#265073]"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors pr-12"
                placeholder="Nhập mật khẩu mới"
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#265073]/40 hover:text-[#265073]"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {/* Password Strength Indicator */}
            {passwords.new && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all`}
                      style={{
                        width:
                          passwordStrength === 'weak'
                            ? '33%'
                            : passwordStrength === 'medium'
                            ? '66%'
                            : '100%',
                      }}
                    />
                  </div>
                  <span className="text-xs text-[#2D9596]">{getStrengthLabel()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">Nhập lại mật khẩu</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors pr-12"
                placeholder="Nhập lại mật khẩu mới"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#265073]/40 hover:text-[#265073]"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={onSave}
            className="w-full py-3 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] mb-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-[#2D9596] mt-1" />
            <div>
              <h3 className="text-[#265073] mb-2">Xác thực 2 bước (2FA)</h3>
              <p className="text-sm text-[#265073]/70">
                Tăng cường bảo mật tài khoản với xác thực hai yếu tố
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => {
                setTwoFactorEnabled(e.target.checked);
                if (e.target.checked) {
                  setShow2FAModal(true);
                }
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2D9596]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9596]"></div>
          </label>
        </div>

        {twoFactorEnabled && (
          <div className="pt-4 border-t-2 border-[#9AD0C2]">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#2D9596]/10 text-[#2D9596] rounded-full text-sm">
              <Shield className="w-4 h-4" />
              Bảo mật cao
            </span>
          </div>
        )}
      </motion.div>

      {/* Login Devices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-[#2D9596]" />
            <h3 className="text-[#265073]">Thiết bị đăng nhập</h3>
          </div>
          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm">
            Đăng xuất tất cả
          </button>
        </div>

        <div className="space-y-3">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#2D9596]" />
                  <div>
                    <p className="text-[#265073]">{device.name}</p>
                    <p className="text-sm text-[#265073]/60">
                      {device.location} • {device.lastUsed}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {device.status === 'active' && (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      Đang dùng
                    </span>
                  )}
                  {device.status === 'inactive' && (
                    <button className="px-3 py-1 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                      Đăng xuất
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-[#265073] mb-4 text-center">Thiết lập xác thực 2 bước</h3>

            {/* QR Code */}
            <div className="mb-6">
              <div className="w-48 h-48 bg-[#ECF4D6] rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-32 h-32 text-[#265073]/20" />
              </div>
              <p className="text-sm text-[#265073]/70 text-center">
                Quét mã QR bằng Google Authenticator
              </p>
            </div>

            {/* Verification Code Input */}
            <div className="mb-6">
              <label className="block text-sm text-[#265073] mb-2 text-center">
                Nhập mã xác thực 6 số
              </label>
              <input
                type="text"
                maxLength={6}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] text-center text-2xl tracking-widest"
                placeholder="000000"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShow2FAModal(false);
                  onSave();
                }}
                className="flex-1 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
              >
                Xác nhận
              </button>
              <button
                onClick={() => {
                  setShow2FAModal(false);
                  setTwoFactorEnabled(false);
                }}
                className="flex-1 py-3 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors"
              >
                Hủy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;


