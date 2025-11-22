"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, CheckCircle, ArrowRight } from 'lucide-react';

interface TeamSummaryProps {
  onNavigateToTeam: () => void;
}

const TeamSummary: React.FC<TeamSummaryProps> = ({ onNavigateToTeam }) => {
  const teamStats = {
    totalMembers: 5,
    adminCount: 1,
    hrCount: 3,
    collaboratorCount: 1,
  };

  const recentMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      role: 'Admin HR',
      avatar: 'NA',
      status: 'active',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      role: 'HR Manager',
      avatar: 'TB',
      status: 'active',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      role: 'Recruiter',
      avatar: 'LC',
      status: 'active',
    },
  ];

  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[#265073] mb-2">Quản lý team</h2>
        <p className="text-[#265073]/70">Tổng quan về team tuyển dụng của bạn</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2]"
      >
        {/* Team Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-[#ECF4D6] rounded-lg text-center">
            <p className="text-2xl text-[#2D9596] mb-1">{teamStats.totalMembers}</p>
            <p className="text-sm text-[#265073]/70">Thành viên</p>
          </div>
          <div className="p-4 bg-[#ECF4D6] rounded-lg text-center">
            <p className="text-2xl text-[#2D9596] mb-1">{teamStats.adminCount}</p>
            <p className="text-sm text-[#265073]/70">Admin</p>
          </div>
          <div className="p-4 bg-[#ECF4D6] rounded-lg text-center">
            <p className="text-2xl text-[#2D9596] mb-1">{teamStats.hrCount}</p>
            <p className="text-sm text-[#265073]/70">HR</p>
          </div>
          <div className="p-4 bg-[#ECF4D6] rounded-lg text-center">
            <p className="text-2xl text-[#2D9596] mb-1">{teamStats.collaboratorCount}</p>
            <p className="text-sm text-[#265073]/70">CTV</p>
          </div>
        </div>

        {/* Recent Members */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#2D9596]" />
            <h3 className="text-[#265073]">Thành viên gần đây</h3>
          </div>
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white text-sm">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-[#265073]">{member.name}</p>
                    <p className="text-sm text-[#265073]/60">{member.role}</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Info */}
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-blue-900 mb-1">Quyền hạn</h4>
              <p className="text-sm text-blue-800">
                Bạn có quyền quản trị viên. Có thể thêm/xóa thành viên, phân quyền và quản lý toàn
                bộ hoạt động tuyển dụng.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onNavigateToTeam}
          className="w-full py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2"
        >
          Quản lý Team
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};

export default TeamSummary;


