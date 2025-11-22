"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FilterOptions } from '../../pages/EmployerInterviews';
import { jobOptions } from './mockInterviewData';

interface InterviewFilterBarProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

const InterviewFilterBar: React.FC<InterviewFilterBarProps> = ({ filters, setFilters }) => {
  const statusOptions = [
    { value: 'sent', label: 'Đã gửi' },
    { value: 'confirmed', label: 'Ứng viên xác nhận' },
    { value: 'completed', label: 'Thành công' },
    { value: 'cancelled', label: 'Hủy' },
    { value: 'pending', label: 'Chờ phản hồi' },
  ];

  const typeOptions = [
    { value: 'online', label: 'Online' },
    { value: 'onsite', label: 'Onsite' },
  ];

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    setFilters({ ...filters, status: newStatuses });
  };

  const handleClearFilters = () => {
    setFilters({
      status: [],
      jobId: null,
      type: null,
      dateRange: { start: null, end: null },
    });
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.jobId !== null ||
    filters.type !== null ||
    filters.dateRange.start !== null ||
    filters.dateRange.end !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#265073]">Bộ lọc</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-[#2D9596] hover:underline flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Xóa lọc
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status Filter */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Trạng thái</label>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes(option.value)}
                  onChange={() => handleStatusToggle(option.value)}
                  className="w-4 h-4 text-[#2D9596] border-[#9AD0C2] rounded focus:ring-[#2D9596]"
                />
                <span className="text-sm text-[#265073]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Filter */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Vị trí tuyển dụng</label>
          <select
            value={filters.jobId || ''}
            onChange={(e) => setFilters({ ...filters, jobId: e.target.value || null })}
            className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none"
          >
            <option value="">Tất cả vị trí</option>
            {jobOptions.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Hình thức</label>
          <div className="space-y-2">
            {typeOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={filters.type === option.value}
                  onChange={() =>
                    setFilters({
                      ...filters,
                      type: filters.type === option.value ? null : option.value,
                    })
                  }
                  className="w-4 h-4 text-[#2D9596] border-[#9AD0C2] focus:ring-[#2D9596]"
                />
                <span className="text-sm text-[#265073]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm text-[#265073] mb-2">Phạm vi ngày</label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateRange.start || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value || null },
                })
              }
              className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none text-sm"
              placeholder="Từ ngày"
            />
            <input
              type="date"
              value={filters.dateRange.end || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: e.target.value || null },
                })
              }
              className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none text-sm"
              placeholder="Đến ngày"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewFilterBar;


