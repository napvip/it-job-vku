"use client";

import { motion } from "framer-motion";
import { User, Edit, Camera, Loader2, Check, AlertCircle } from "lucide-react";
import { PersonalInfo } from "@/lib/profileService";
import Image from "next/image";

interface ProfileSummaryCardProps {
  personalInfo: PersonalInfo | null;
  uploading: boolean;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
}

export function ProfileSummaryCard({
  personalInfo,
  uploading,
  onAvatarUpload,
  onEditClick,
}: ProfileSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 mb-8 shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-[#2D9596] to-[#265073] p-1">
            {personalInfo?.avatarUrl ? (
              <Image
                src={personalInfo.avatarUrl}
                alt="Avatar"
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#ECF4D6] flex items-center justify-center">
                <User className="w-12 h-12 md:w-16 md:h-16 text-[#265073]" />
              </div>
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 bg-[#2D9596] rounded-full p-2 cursor-pointer hover:bg-[#265073] transition-colors">
            {uploading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Camera className="w-4 h-4 text-white" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-[#265073] text-2xl md:text-3xl mb-2">
            {personalInfo?.fullName || "Chưa cập nhật"}
          </h2>
          <p className="text-[#2D9596] text-lg mb-4">
            {personalInfo?.desiredPosition || "Chưa có vị trí mong muốn"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-[#265073]/70 text-sm">
            {personalInfo?.location && (
              <div className="flex items-center gap-2">
                <span>📍 {personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.email && (
              <div className="flex items-center gap-2">
                <span>📧 {personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center gap-2">
                <span>📱 {personalInfo.phone}</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onEditClick}
          className="bg-[#265073] hover:bg-[#2D9596] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Edit className="w-4 h-4" />
          Chỉnh sửa hồ sơ
        </button>
      </div>
    </motion.div>
  );
}

interface TabNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-[20px] border-2 border-[#9AD0C2] mb-8 overflow-hidden shadow-lg"
    >
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 min-w-[140px] px-4 py-4 flex flex-col items-center gap-2 transition-all duration-300 border-b-4 ${
              activeTab === tab.id
                ? "bg-[#2D9596] text-white border-[#265073]"
                : "text-[#265073] border-transparent hover:bg-[#9AD0C2]/20"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs md:text-sm text-center">{tab.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

interface ProfileCompletionSidebarProps {
  completionPercentage: number;
  profileCompletion: Record<string, boolean>;
}

export function ProfileCompletionSidebar({
  completionPercentage,
  profileCompletion,
}: ProfileCompletionSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:w-80 shrink-0"
    >
      <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 shadow-lg sticky top-24">
        <h3 className="text-[#265073] text-xl mb-4">Hoàn thiện hồ sơ</h3>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#265073]/70 text-sm">Tiến độ hoàn thành</span>
            <span className="text-[#2D9596]">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-[#ECF4D6] rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-[#2D9596] to-[#265073] rounded-full"
            />
          </div>
        </div>

        {/* Completion Checklist */}
        <div className="space-y-3">
          <ChecklistItem
            completed={profileCompletion.personalInfo}
            label="Thông tin cá nhân"
          />
          <ChecklistItem
            completed={profileCompletion.experience}
            label="Kinh nghiệm"
          />
          <ChecklistItem completed={profileCompletion.education} label="Học vấn" />
          <ChecklistItem completed={profileCompletion.skills} label="Kỹ năng" />
          <ChecklistItem
            completed={profileCompletion.certificates}
            label="Chứng chỉ - Dự án"
          />
          <ChecklistItem completed={profileCompletion.cvUpload} label="CV đính kèm" />
        </div>
      </div>
    </motion.div>
  );
}

function ChecklistItem({ completed, label }: { completed: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div
        className={`rounded-full p-1 ${
          completed
            ? "bg-[#2D9596]"
            : "bg-[#ECF4D6] border-2 border-[#2D9596]"
        }`}
      >
        {completed ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <AlertCircle className="w-4 h-4 text-[#2D9596]" />
        )}
      </div>
      <span className="text-[#265073]">{label}</span>
    </div>
  );
}
