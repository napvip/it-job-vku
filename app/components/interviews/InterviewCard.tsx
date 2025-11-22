"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Video, User, Edit, Send, X, FileText } from 'lucide-react';
import { Interview } from '../../pages/EmployerInterviews';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface InterviewCardProps {
  interview: Interview;
  onInterviewClick: (interviewId: string) => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onInterviewClick }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const weekday = date.toLocaleDateString('vi-VN', { weekday: 'long' });
    return `${weekday}, ${day}/${month}/${year}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'sent':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'sent':
        return 'Đã gửi';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      case 'pending':
        return 'Chờ phản hồi';
      default:
        return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => onInterviewClick(interview.id)}
    >
      {/* Header - Candidate Info */}
      <div className="flex items-start gap-4 mb-4 pb-4 border-b border-[#9AD0C2]/30">
        <ImageWithFallback
          src={interview.candidateAvatar}
          alt={interview.candidateName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[#265073] mb-1">{interview.candidateName}</h3>
          <p className="text-sm text-[#2D9596] mb-2">{interview.jobTitle}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#2D9596]/10 rounded text-xs text-[#2D9596]">
              Match: {interview.matchScore}%
            </span>
            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(interview.status)}`}>
              {getStatusText(interview.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Interview Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm text-[#265073]">
          <Calendar className="w-4 h-4 text-[#2D9596]" />
          <span>{formatDate(interview.date)}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#265073]">
          <Clock className="w-4 h-4 text-[#2D9596]" />
          <span>
            {interview.time} - {interview.duration} phút
          </span>
        </div>
        {interview.type === 'online' ? (
          <div className="flex items-center gap-3 text-sm text-[#265073]">
            <Video className="w-4 h-4 text-[#2D9596]" />
            <span>Online - {interview.meetingLink?.includes('zoom') ? 'Zoom' : 'Google Meet'}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm text-[#265073]">
            <MapPin className="w-4 h-4 text-[#2D9596]" />
            <span className="truncate">{interview.location}</span>
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-[#265073]">
          <User className="w-4 h-4 text-[#2D9596]" />
          <span>
            {interview.interviewer} - {interview.interviewerRole}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#9AD0C2]/30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInterviewClick(interview.id);
          }}
          className="flex-1 px-3 py-2 bg-[#2D9596]/10 text-[#2D9596] rounded-lg hover:bg-[#2D9596]/20 transition-colors text-sm flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Chi tiết
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle edit
          }}
          className="flex-1 px-3 py-2 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors text-sm flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Sửa
        </button>
        {interview.status === 'sent' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle resend
            }}
            className="px-3 py-2 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors"
            title="Gửi lại lời mời"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
        {interview.status !== 'completed' && interview.status !== 'cancelled' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle cancel
            }}
            className="px-3 py-2 bg-white border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            title="Hủy lịch"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default InterviewCard;


