"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Settings,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Users,
  LogOut,
} from 'lucide-react';

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeSection,
  onSectionChange,
  onLogout,
}) => {
  const menuItems = [
    { id: 'profile', label: 'Hồ sơ cá nhân', icon: User },
    { id: 'account', label: 'Thông tin tài khoản', icon: Settings },
    { id: 'security', label: 'Bảo mật & mật khẩu', icon: Shield },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'privacy', label: 'Quyền riêng tư', icon: Lock },
    { id: 'payment', label: 'Thanh toán & gói dịch vụ', icon: CreditCard },
    { id: 'team', label: 'Quản lý team', icon: Users },
  ];

  return (
    <div className="w-64 bg-white border-r-2 border-[#9AD0C2] min-h-screen sticky top-20">
      <div className="p-6">
        <h3 className="text-[#265073] mb-6">Cài đặt</h3>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  isActive
                    ? 'bg-[#9AD0C2] text-[#2D9596]'
                    : 'text-[#265073] hover:bg-[#ECF4D6]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#2D9596]' : 'text-[#265073]/60'}`} />
                <span className={isActive ? '' : ''}>{item.label}</span>
              </button>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left text-red-600 hover:bg-red-50 mt-6"
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SettingsSidebar;


