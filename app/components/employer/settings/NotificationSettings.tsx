"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Briefcase, Settings as SettingsIcon, Mail, Smartphone, Globe } from 'lucide-react';

interface NotificationSettingsProps {
  onSave: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onSave }) => {
  const [recruitmentNotifications, setRecruitmentNotifications] = useState({
    newApplication: true,
    candidateReply: true,
    interviewConfirm: false,
    jobExpired: true,
    aiSuggestion: true,
  });

  const [systemNotifications, setSystemNotifications] = useState({
    platformNews: false,
    featureUpdate: true,
    bugReport: false,
  });

  const [deliveryMethods, setDeliveryMethods] = useState({
    email: true,
    mobileApp: false,
    browser: true,
  });

  const handleRecruitmentChange = (key: string, value: boolean) => {
    setRecruitmentNotifications({ ...recruitmentNotifications, [key]: value });
  };

  const handleSystemChange = (key: string, value: boolean) => {
    setSystemNotifications({ ...systemNotifications, [key]: value });
  };

  const handleDeliveryChange = (key: string, value: boolean) => {
    setDeliveryMethods({ ...deliveryMethods, [key]: value });
  };

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[#265073] mb-2">Thông báo</h2>
        <p className="text-[#265073]/70">Tùy chỉnh cách nhận thông báo từ hệ thống</p>
      </motion.div>

      {/* Recruitment Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6 text-[#2D9596]" />
          <h3 className="text-[#265073]">Thông báo tuyển dụng</h3>
        </div>

        <div className="space-y-4">
          <NotificationToggle
            label="Ứng viên mới ứng tuyển"
            description="Nhận thông báo khi có ứng viên mới nộp hồ sơ"
            checked={recruitmentNotifications.newApplication}
            onChange={(value) => handleRecruitmentChange('newApplication', value)}
          />
          <NotificationToggle
            label="Ứng viên trả lời chat"
            description="Nhận thông báo khi ứng viên nhắn tin cho bạn"
            checked={recruitmentNotifications.candidateReply}
            onChange={(value) => handleRecruitmentChange('candidateReply', value)}
          />
          <NotificationToggle
            label="Ứng viên xác nhận / đổi lịch phỏng vấn"
            description="Nhận thông báo về các thay đổi lịch phỏng vấn"
            checked={recruitmentNotifications.interviewConfirm}
            onChange={(value) => handleRecruitmentChange('interviewConfirm', value)}
          />
          <NotificationToggle
            label="Job bị hết hạn"
            description="Nhận thông báo khi tin tuyển dụng sắp hết hạn"
            checked={recruitmentNotifications.jobExpired}
            onChange={(value) => handleRecruitmentChange('jobExpired', value)}
          />
          <NotificationToggle
            label="Gợi ý AI ứng viên mới"
            description="Nhận thông báo khi AI gợi ý ứng viên phù hợp"
            checked={recruitmentNotifications.aiSuggestion}
            onChange={(value) => handleRecruitmentChange('aiSuggestion', value)}
          />
        </div>
      </motion.div>

      {/* System Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-[#2D9596]" />
          <h3 className="text-[#265073]">Thông báo hệ thống</h3>
        </div>

        <div className="space-y-4">
          <NotificationToggle
            label="Tin tức nền tảng"
            description="Cập nhật về các tin tức mới từ ITJobMatch"
            checked={systemNotifications.platformNews}
            onChange={(value) => handleSystemChange('platformNews', value)}
          />
          <NotificationToggle
            label="Cập nhật tính năng"
            description="Thông báo khi có tính năng mới được ra mắt"
            checked={systemNotifications.featureUpdate}
            onChange={(value) => handleSystemChange('featureUpdate', value)}
          />
          <NotificationToggle
            label="Báo cáo lỗi"
            description="Nhận thông báo về các vấn đề kỹ thuật"
            checked={systemNotifications.bugReport}
            onChange={(value) => handleSystemChange('bugReport', value)}
          />
        </div>
      </motion.div>

      {/* Delivery Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] mb-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-[#2D9596]" />
          <h3 className="text-[#265073]">Hình thức nhận thông báo</h3>
        </div>

        <div className="space-y-4">
          <NotificationCheckbox
            icon={Mail}
            label="Gửi email"
            description="Nhận thông báo qua email"
            checked={deliveryMethods.email}
            onChange={(value) => handleDeliveryChange('email', value)}
          />
          <NotificationCheckbox
            icon={Smartphone}
            label="Gửi qua app mobile"
            description="Nhận thông báo trên ứng dụng di động"
            checked={deliveryMethods.mobileApp}
            onChange={(value) => handleDeliveryChange('mobileApp', value)}
          />
          <NotificationCheckbox
            icon={Globe}
            label="Gửi qua trình duyệt (Push Notification)"
            description="Nhận thông báo ngay trên trình duyệt"
            checked={deliveryMethods.browser}
            onChange={(value) => handleDeliveryChange('browser', value)}
          />
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSave}
          className="px-6 py-3 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

// Toggle Component
const NotificationToggle: React.FC<{
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-start justify-between p-4 bg-[#ECF4D6] rounded-lg">
      <div className="flex-1">
        <p className="text-[#265073] mb-1">{label}</p>
        <p className="text-sm text-[#265073]/60">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2D9596]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D9596]"></div>
      </label>
    </div>
  );
};

// Checkbox Component
const NotificationCheckbox: React.FC<{
  icon: any;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}> = ({ icon: Icon, label, description, checked, onChange }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#ECF4D6] rounded-lg">
      <Icon className="w-5 h-5 text-[#2D9596] mt-0.5" />
      <div className="flex-1">
        <p className="text-[#265073] mb-1">{label}</p>
        <p className="text-sm text-[#265073]/60">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-[#2D9596] border-2 border-[#9AD0C2] rounded focus:ring-[#2D9596] mt-1"
      />
    </div>
  );
};

export default NotificationSettings;


