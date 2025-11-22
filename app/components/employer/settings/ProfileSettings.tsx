"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Linkedin, Globe } from 'lucide-react';

interface ProfileSettingsProps {
  onSave: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn A',
    title: 'HR Manager',
    phone: '0901234567',
    email: 'nhatuyendung@gmail.com',
    linkedin: 'linkedin.com/in/nguyenvana',
    website: 'https://company.com',
    bio: 'Chuyên viên tuyển dụng với 5 năm kinh nghiệm trong lĩnh vực công nghệ thông tin.',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[#265073] mb-2">Hồ sơ cá nhân</h2>
        <p className="text-[#265073]/70">Cập nhật thông tin cá nhân của bạn</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
      >
        {/* Avatar Upload */}
        <div className="mb-8">
          <label className="block text-sm text-[#265073] mb-3">Ảnh đại diện</label>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white text-2xl">
                NA
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#2D9596] rounded-full flex items-center justify-center text-white hover:bg-[#265073] transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <button className="px-4 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/30 transition-colors text-sm mb-2">
                Tải ảnh lên
              </button>
              <p className="text-xs text-[#265073]/60">JPG, PNG. Tối đa 2MB</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors"
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">
              Chức danh <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors"
              placeholder="VD: HR Manager, Recruiter..."
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#265073] mb-2">Số điện thoại</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors"
                placeholder="0901234567"
              />
            </div>
            <div>
              <label className="block text-sm text-[#265073] mb-2">Email công việc</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors"
                placeholder="email@company.com"
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">LinkedIn</label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors"
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-[#265073] mb-2">Bio ngắn</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors resize-none"
              placeholder="Giới thiệu ngắn về bản thân..."
            />
            <p className="text-xs text-[#265073]/60 mt-2">{formData.bio.length}/500 ký tự</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t-2 border-[#9AD0C2]">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors"
          >
            Lưu thông tin
          </button>
          <button className="px-6 py-3 bg-white border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors">
            Hủy
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;


