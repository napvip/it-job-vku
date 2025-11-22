"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { FilterOptions } from '../../pages/EmployerInterviews';
import InterviewCard from './InterviewCard';
import { mockInterviews } from './mockInterviewData';

interface ListViewProps {
  filters: FilterOptions;
  onInterviewClick: (interviewId: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ filters, onInterviewClick }) => {
  // Filter interviews based on filters
  const filteredInterviews = mockInterviews.filter((interview) => {
    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(interview.status)) {
      return false;
    }

    // Job filter
    if (filters.jobId && interview.jobId !== filters.jobId) {
      return false;
    }

    // Type filter
    if (filters.type && interview.type !== filters.type) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      const interviewDate = new Date(interview.date);
      if (filters.dateRange.start) {
        const startDate = new Date(filters.dateRange.start);
        if (interviewDate < startDate) return false;
      }
      if (filters.dateRange.end) {
        const endDate = new Date(filters.dateRange.end);
        if (interviewDate > endDate) return false;
      }
    }

    return true;
  });

  // Sort interviews by date (ascending)
  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  if (sortedInterviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border-2 border-[#9AD0C2]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-24 h-24 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-[#2D9596]" />
          </div>
          <h3 className="text-[#265073] mb-2">Hiện chưa có lịch phỏng vấn nào</h3>
          <p className="text-[#265073]/60 mb-6">
            Bắt đầu tạo lịch phỏng vấn đầu tiên với ứng viên của bạn
          </p>
          <button className="px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors">
            Tạo lịch phỏng vấn đầu tiên
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedInterviews.map((interview, index) => (
        <motion.div
          key={interview.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <InterviewCard interview={interview} onInterviewClick={onInterviewClick} />
        </motion.div>
      ))}
    </div>
  );
};

export default ListView;


