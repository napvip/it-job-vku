"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, TrendingUp, Bell } from 'lucide-react';
import { mockInterviews } from './mockInterviewData';

const StatsSidebar: React.FC = () => {
  // Calculate statistics
  const totalInterviews = mockInterviews.length;
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const interviewsToday = mockInterviews.filter((i) => i.date === todayStr).length;

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  const interviewsThisWeek = mockInterviews.filter((interview) => {
    const interviewDate = new Date(interview.date);
    return interviewDate >= weekStart && interviewDate <= weekEnd;
  }).length;

  const confirmedInterviews = mockInterviews.filter((i) => i.status === 'confirmed').length;
  const confirmationRate = totalInterviews > 0 
    ? Math.round((confirmedInterviews / totalInterviews) * 100) 
    : 0;

  // Recent confirmations
  const recentConfirmed = mockInterviews
    .filter((i) => i.status === 'confirmed')
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]"
      >
        <h3 className="text-[#265073] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#2D9596]" />
          Thống kê
        </h3>

        <div className="space-y-4">
          {/* Total Interviews */}
          <div className="p-4 bg-[#ECF4D6] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#265073]/70">Tổng số lịch</span>
              <Calendar className="w-4 h-4 text-[#2D9596]" />
            </div>
            <div className="text-2xl text-[#265073]">{totalInterviews}</div>
          </div>

          {/* Today */}
          <div className="p-4 bg-[#2D9596]/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#265073]/70">Hôm nay</span>
              <Clock className="w-4 h-4 text-[#2D9596]" />
            </div>
            <div className="text-2xl text-[#2D9596]">{interviewsToday}</div>
          </div>

          {/* This Week */}
          <div className="p-4 bg-[#9AD0C2]/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#265073]/70">Tuần này</span>
              <Calendar className="w-4 h-4 text-[#2D9596]" />
            </div>
            <div className="text-2xl text-[#265073]">{interviewsThisWeek}</div>
          </div>

          {/* Confirmation Rate */}
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#265073]/70">Tỷ lệ xác nhận</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl text-green-700">{confirmationRate}%</div>
            <div className="text-xs text-[#265073]/60 mt-1">
              {confirmedInterviews}/{totalInterviews} ứng viên đã xác nhận
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]"
      >
        <h3 className="text-[#265073] mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#2D9596]" />
          Hoạt động gần đây
        </h3>

        <div className="space-y-3">
          {recentConfirmed.length > 0 ? (
            recentConfirmed.map((interview) => (
              <div
                key={interview.id}
                className="p-3 bg-[#ECF4D6] rounded-lg border-l-4 border-green-500"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Đã xác nhận</span>
                </div>
                <p className="text-sm text-[#265073]">{interview.candidateName}</p>
                <p className="text-xs text-[#265073]/60 mt-1">
                  {interview.jobTitle}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-sm text-[#265073]/60">
              Chưa có hoạt động gần đây
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white"
      >
        <h3 className="mb-3">💡 Mẹo nhỏ</h3>
        <p className="text-sm opacity-90">
          Gửi lời mời phỏng vấn ít nhất 2-3 ngày trước để ứng viên có thời gian chuẩn bị tốt nhất.
        </p>
      </motion.div>
    </div>
  );
};

export default StatsSidebar;


