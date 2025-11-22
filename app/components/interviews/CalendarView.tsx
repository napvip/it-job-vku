"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { FilterOptions } from '../../pages/EmployerInterviews';
import { mockInterviews } from './mockInterviewData';

interface CalendarViewProps {
  filters: FilterOptions;
  onInterviewClick: (interviewId: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ filters, onInterviewClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Filter interviews
  const filteredInterviews = mockInterviews.filter((interview) => {
    if (filters.status.length > 0 && !filters.status.includes(interview.status)) {
      return false;
    }
    if (filters.jobId && interview.jobId !== filters.jobId) {
      return false;
    }
    if (filters.type && interview.type !== filters.type) {
      return false;
    }
    return true;
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getInterviewsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredInterviews.filter((interview) => interview.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Create calendar grid
  const calendarDays = [];
  // Add empty cells for days before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-[#265073]">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#265073]" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 text-sm bg-[#9AD0C2]/20 text-[#265073] rounded-lg hover:bg-[#9AD0C2]/30 transition-colors"
            >
              Hôm nay
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#265073]" />
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex bg-[#9AD0C2]/20 rounded-lg p-1">
          {(['month', 'week', 'day'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 rounded text-sm capitalize transition-colors ${
                viewMode === mode
                  ? 'bg-[#2D9596] text-white'
                  : 'text-[#265073] hover:bg-[#9AD0C2]/30'
              }`}
            >
              {mode === 'month' ? 'Tháng' : mode === 'week' ? 'Tuần' : 'Ngày'}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid - Month View */}
      {viewMode === 'month' && (
        <div>
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center py-2 text-sm text-[#265073]/70"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const date = new Date(year, month, day);
              const interviewsOnDay = getInterviewsForDate(date);
              const hasInterviews = interviewsOnDay.length > 0;

              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.01 }}
                  className={`aspect-square border-2 rounded-lg p-2 cursor-pointer transition-all ${
                    isToday(day)
                      ? 'border-[#2D9596] bg-[#2D9596]/5'
                      : 'border-[#9AD0C2] hover:border-[#2D9596] hover:bg-[#9AD0C2]/10'
                  }`}
                >
                  <div className="text-sm text-[#265073] mb-1">{day}</div>
                  {hasInterviews && (
                    <div className="space-y-1">
                      {interviewsOnDay.slice(0, 2).map((interview) => (
                        <div
                          key={interview.id}
                          onClick={() => onInterviewClick(interview.id)}
                          className="text-xs bg-[#2D9596] text-white px-2 py-1 rounded truncate hover:bg-[#265073] transition-colors"
                          title={`${interview.time} - ${interview.candidateName}`}
                        >
                          {interview.time} {interview.candidateName.split(' ').pop()}
                        </div>
                      ))}
                      {interviewsOnDay.length > 2 && (
                        <div className="text-xs text-[#2D9596] px-2">
                          +{interviewsOnDay.length - 2} khác
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week/Day View - Simplified */}
      {(viewMode === 'week' || viewMode === 'day') && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-[#2D9596] mx-auto mb-4" />
          <p className="text-[#265073]/70">
            Chế độ xem {viewMode === 'week' ? 'tuần' : 'ngày'} đang được phát triển
          </p>
          <button
            onClick={() => setViewMode('month')}
            className="mt-4 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
          >
            Quay lại xem tháng
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarView;


