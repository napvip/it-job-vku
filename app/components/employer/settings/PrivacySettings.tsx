"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Users, FileText } from 'lucide-react';

interface PrivacySettingsProps {
  onSave: () => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ onSave }) => {
  const [privacySettings, setPrivacySettings] = useState({
    hideCompanyName: false,
    allowTeamViewCandidates: true,
    allowHREditJobs: true,
    hideEmailFromCandidates: false,
  });

  const handleToggle = (key: string, value: boolean) => {
    setPrivacySettings({ ...privacySettings, [key]: value });
  };

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[#265073] mb-2">Quyền riêng tư</h2>
        <p className="text-[#265073]/70">Quản lý quyền riêng tư và hiển thị thông tin</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
      >
        <div className="space-y-6">
          {/* Hide Company Name */}
          <PrivacyToggle
            icon={EyeOff}
            label="Ẩn tên công ty trong các job"
            description="Phù hợp cho các agency hoặc headhunter muốn ẩn danh khách hàng"
            checked={privacySettings.hideCompanyName}
            onChange={(value) => handleToggle('hideCompanyName', value)}
            badge={privacySettings.hideCompanyName ? 'Đang ẩn' : undefined}
          />

          {/* Allow Team View */}
          <PrivacyToggle
            icon={Users}
            label="Cho phép team xem hồ sơ ứng viên bạn xem"
            description="Các thành viên HR khác trong team có thể xem ứng viên bạn đã xem"
            checked={privacySettings.allowTeamViewCandidates}
            onChange={(value) => handleToggle('allowTeamViewCandidates', value)}
            badge={privacySettings.allowTeamViewCandidates ? 'Đang bật' : undefined}
          />

          {/* Allow HR Edit Jobs */}
          <PrivacyToggle
            icon={FileText}
            label="Cho phép HR khác chỉnh sửa job bạn tạo"
            description="Các HR trong team có thể chỉnh sửa tin tuyển dụng do bạn tạo"
            checked={privacySettings.allowHREditJobs}
            onChange={(value) => handleToggle('allowHREditJobs', value)}
            badge={privacySettings.allowHREditJobs ? 'Đang bật' : undefined}
          />

          {/* Hide Email */}
          <PrivacyToggle
            icon={Lock}
            label="Không hiển thị email HR cho ứng viên"
            description="Ứng viên sẽ không thấy email của bạn, chỉ có thể chat qua hệ thống"
            checked={privacySettings.hideEmailFromCandidates}
            onChange={(value) => handleToggle('hideEmailFromCandidates', value)}
            badge={privacySettings.hideEmailFromCandidates ? 'Đang ẩn' : undefined}
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t-2 border-[#9AD0C2]">
          <button
            onClick={onSave}
            className="px-6 py-3 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </motion.div>

      {/* Privacy Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl"
      >
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-2">Thông tin bảo mật</h4>
            <p className="text-sm text-blue-800">
              Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Mọi thông tin cá nhân và dữ liệu
              tuyển dụng đều được mã hóa và bảo mật theo tiêu chuẩn quốc tế. Bạn có toàn quyền
              kiểm soát cách thông tin của mình được hiển thị và chia sẻ.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Privacy Toggle Component
const PrivacyToggle: React.FC<{
  icon: any;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  badge?: string;
}> = ({ icon: Icon, label, description, checked, onChange, badge }) => {
  return (
    <div className="flex items-start justify-between p-5 bg-[#ECF4D6] rounded-lg">
      <div className="flex items-start gap-3 flex-1">
        <Icon className="w-5 h-5 text-[#2D9596] mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[#265073]">{label}</p>
            {badge && (
              <span className="px-2 py-0.5 bg-[#2D9596] text-white rounded-full text-xs">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-[#265073]/60">{description}</p>
        </div>
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

export default PrivacySettings;


