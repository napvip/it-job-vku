"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Video,
  User,
  Mail,
  Copy,
  MessageCircle,
  Edit,
  Ban,
  CheckCircle,
} from 'lucide-react';
import { mockInterviews } from './mockInterviewData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface InterviewDetailModalProps {
  interviewId: string;
  onClose: () => void;
}

const InterviewDetailModal: React.FC<InterviewDetailModalProps> = ({
  interviewId,
  onClose,
}) => {
  const interview = mockInterviews.find((i) => i.id === interviewId);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  if (!interview) return null;

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
        return 'Ứng viên đã xác nhận';
      case 'sent':
        return 'HR đã gửi';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      case 'pending':
        return 'Đang chờ phản hồi';
      default:
        return status;
    }
  };

  const handleCopyLink = () => {
    if (interview.meetingLink) {
      navigator.clipboard.writeText(interview.meetingLink);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b-2 border-[#9AD0C2] p-6 flex items-center justify-between">
          <h2 className="text-[#265073]">Chi tiết phỏng vấn</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#265073]" />
          </button>
        </div>

        <div className="p-6">
          {/* Candidate Info */}
          <div className="mb-6 p-4 bg-[#9AD0C2]/10 rounded-lg">
            <div className="flex items-start gap-4">
              <ImageWithFallback
                src={interview.candidateAvatar}
                alt={interview.candidateName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-[#265073] mb-1">{interview.candidateName}</h3>
                <p className="text-sm text-[#2D9596] mb-2">{interview.jobTitle}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#2D9596]/10 rounded text-xs text-[#2D9596]">
                    Match: {interview.matchScore}%
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(interview.status)}`}>
                    {getStatusText(interview.status)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#265073]">
                  <Mail className="w-4 h-4 text-[#2D9596]" />
                  {interview.candidateEmail}
                </div>
              </div>
            </div>
          </div>

          {/* Interview Details */}
          <div className="space-y-4 mb-6">
            <h4 className="text-[#265073]">Thông tin phỏng vấn</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-[#265073] p-3 bg-[#ECF4D6] rounded-lg">
                <Calendar className="w-5 h-5 text-[#2D9596]" />
                <div>
                  <div className="text-xs text-[#265073]/70 mb-1">Ngày</div>
                  <div>{formatDate(interview.date)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#265073] p-3 bg-[#ECF4D6] rounded-lg">
                <Clock className="w-5 h-5 text-[#2D9596]" />
                <div>
                  <div className="text-xs text-[#265073]/70 mb-1">Thời gian</div>
                  <div>
                    {interview.time} ({interview.duration} phút)
                  </div>
                </div>
              </div>
            </div>

            {interview.type === 'online' ? (
              <div className="p-4 bg-[#ECF4D6] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-5 h-5 text-[#2D9596]" />
                  <span className="text-sm text-[#265073]">Phỏng vấn Online</span>
                </div>
                {interview.meetingLink && (
                  <div className="flex items-center gap-2">
                    <a
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#2D9596] hover:underline flex-1 truncate"
                    >
                      {interview.meetingLink}
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm flex items-center gap-1"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-[#ECF4D6] rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#2D9596]" />
                  <div>
                    <div className="text-xs text-[#265073]/70 mb-1">Địa điểm</div>
                    <div className="text-sm text-[#265073]">{interview.location}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-[#ECF4D6] rounded-lg">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#2D9596]" />
                <div>
                  <div className="text-xs text-[#265073]/70 mb-1">Người phỏng vấn</div>
                  <div className="text-sm text-[#265073]">
                    {interview.interviewer} - {interview.interviewerRole}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4 mb-6">
            {interview.candidateNotes && (
              <div>
                <h5 className="text-sm text-[#265073] mb-2">Ghi chú cho ứng viên</h5>
                <div className="p-3 bg-[#9AD0C2]/10 rounded-lg text-sm text-[#265073]">
                  {interview.candidateNotes}
                </div>
              </div>
            )}

            {interview.internalNotes && (
              <div>
                <h5 className="text-sm text-[#265073] mb-2">Ghi chú nội bộ</h5>
                <div className="p-3 bg-yellow-50 rounded-lg text-sm text-[#265073]">
                  {interview.internalNotes}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {interview.type === 'online' && interview.meetingLink && (
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-[#2D9596]/10 text-[#2D9596] rounded-lg hover:bg-[#2D9596]/20 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-5 h-5" />
                Copy link phỏng vấn
              </button>
            )}
            <button
              onClick={() => {
                // Handle chat
                onClose();
              }}
              className="px-4 py-3 bg-[#2D9596]/10 text-[#2D9596] rounded-lg hover:bg-[#2D9596]/20 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat với ứng viên
            </button>
            <button
              onClick={() => {
                // Handle edit
                onClose();
              }}
              className="px-4 py-3 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Đổi lịch
            </button>
            {interview.status !== 'completed' && interview.status !== 'cancelled' && (
              <button
                onClick={() => {
                  // Handle cancel
                  onClose();
                }}
                className="px-4 py-3 bg-white border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <Ban className="w-5 h-5" />
                Hủy lịch phỏng vấn
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Copy Toast */}
      {showCopiedToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 bg-[#2D9596] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Đã copy link phỏng vấn!
        </motion.div>
      )}
    </div>
  );
};

export default InterviewDetailModal;


