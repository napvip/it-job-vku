"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, FileText, Calendar, Plus, ExternalLink } from 'lucide-react';
import { Candidate } from '../../pages/EmployerMessaging';
import { mockConversations } from './ConversationList';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Mock candidate data
const mockCandidates: Record<string, Candidate> = {
  conv1: {
    id: 'cand1',
    name: 'Nguyễn Minh Tuấn',
    avatar: 'https://i.pravatar.cc/150?img=12',
    email: 'minhtuan.dev@gmail.com',
    phone: '0901234567',
    location: 'Quận 1, TP.HCM',
    cvUrl: '/cv/nguyen-minh-tuan.pdf',
    appliedJob: 'Senior Full Stack Developer',
    matchScore: 94,
    pipelineStatus: 'reviewing',
    internalNotes: 'Ứng viên có kinh nghiệm tốt với microservices. Cần hỏi thêm về kinh nghiệm lead team.',
    interviews: [
      {
        id: 'int1',
        dateTime: '2025-11-25 14:00',
        link: 'https://meet.google.com/abc-defg-hij',
        notes: 'Phỏng vấn kỹ thuật vòng 1',
        status: 'sent',
      },
    ],
  },
  conv2: {
    id: 'cand2',
    name: 'Trần Thu Hương',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'thuhuong.fe@gmail.com',
    phone: '0912345678',
    location: 'Quận 3, TP.HCM',
    cvUrl: '/cv/tran-thu-huong.pdf',
    appliedJob: 'Frontend Developer (React)',
    matchScore: 88,
    pipelineStatus: 'interview',
    internalNotes: 'Portfolio rất đẹp, UI/UX sense tốt. Phù hợp cho dự án e-commerce.',
    interviews: [
      {
        id: 'int2',
        dateTime: '2025-11-28 14:00',
        link: 'https://meet.google.com/xyz-abcd-efg',
        notes: 'Phỏng vấn kỹ thuật + cultural fit',
        status: 'confirmed',
      },
    ],
  },
  conv3: {
    id: 'cand3',
    name: 'Lê Hoàng Nam',
    avatar: 'https://i.pravatar.cc/150?img=33',
    email: 'hoangnam.devops@gmail.com',
    phone: '0923456789',
    location: 'Quận 7, TP.HCM',
    cvUrl: '/cv/le-hoang-nam.pdf',
    appliedJob: 'DevOps Engineer',
    matchScore: 91,
    pipelineStatus: 'viewed',
    internalNotes: 'Kinh nghiệm tốt với K8s và CI/CD. Cần kiểm tra về monitoring và logging.',
    interviews: [],
  },
};

interface CandidateInfoProps {
  conversationId: string;
}

const CandidateInfo: React.FC<CandidateInfoProps> = ({ conversationId }) => {
  const candidate = mockCandidates[conversationId];
  const conversation = mockConversations.find((c) => c.id === conversationId);

  const [pipelineStatus, setPipelineStatus] = useState(candidate?.pipelineStatus || 'new');
  const [internalNotes, setInternalNotes] = useState(candidate?.internalNotes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  if (!candidate || !conversation) return null;

  const pipelineOptions = [
    { value: 'new', label: 'Mới nhận' },
    { value: 'viewed', label: 'Đã xem' },
    { value: 'reviewing', label: 'Đang xem xét' },
    { value: 'interview', label: 'Mời phỏng vấn' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Không phù hợp' },
  ];

  const handleSaveNotes = () => {
    // In real app, save to backend
    setIsEditingNotes(false);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Candidate Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border-b-2 border-[#9AD0C2]"
      >
        <div className="text-center mb-4">
          <ImageWithFallback
            src={candidate.avatar}
            alt={candidate.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h3 className="text-[#265073] mb-1">{candidate.name}</h3>
          <p className="text-sm text-[#2D9596] mb-3">{candidate.appliedJob}</p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D9596]/10 rounded-full">
            <span className="text-sm text-[#2D9596]">Match Score: {candidate.matchScore}%</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-[#265073]">
            <Mail className="w-4 h-4 text-[#2D9596] flex-shrink-0" />
            <span className="truncate">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#265073]">
            <Phone className="w-4 h-4 text-[#2D9596] flex-shrink-0" />
            <span>{candidate.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#265073]">
            <MapPin className="w-4 h-4 text-[#2D9596] flex-shrink-0" />
            <span>{candidate.location}</span>
          </div>
        </div>

        {/* CV Link */}
        <a
          href={candidate.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
        >
          <FileText className="w-4 h-4" />
          Xem CV đã gửi
        </a>

        <button className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors">
          <ExternalLink className="w-4 h-4" />
          Xem hồ sơ đầy đủ
        </button>
      </motion.div>

      {/* Pipeline Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 bg-white border-b-2 border-[#9AD0C2]"
      >
        <h4 className="text-[#265073] mb-4 flex items-center gap-2">
          Trạng thái tuyển dụng
        </h4>
        <div className="space-y-2">
          {pipelineOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#9AD0C2]/20 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="pipeline"
                value={option.value}
                checked={pipelineStatus === option.value}
                onChange={(e) => setPipelineStatus(e.target.value as typeof pipelineStatus)}
                className="w-4 h-4 text-[#2D9596] focus:ring-[#2D9596]"
              />
              <span className="text-sm text-[#265073]">{option.label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Internal Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white border-b-2 border-[#9AD0C2]"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[#265073]">Ghi chú nội bộ</h4>
          {!isEditingNotes && (
            <button
              onClick={() => setIsEditingNotes(true)}
              className="text-sm text-[#2D9596] hover:underline"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
        {isEditingNotes ? (
          <div>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Thêm ghi chú về ứng viên (chỉ HR nhìn thấy)..."
              rows={4}
              className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none resize-none text-sm"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveNotes}
                className="flex-1 px-3 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm"
              >
                Lưu
              </button>
              <button
                onClick={() => {
                  setInternalNotes(candidate.internalNotes);
                  setIsEditingNotes(false);
                }}
                className="flex-1 px-3 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors text-sm"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#9AD0C2]/20 rounded-lg">
            <p className="text-sm text-[#265073] whitespace-pre-wrap">
              {internalNotes || 'Chưa có ghi chú'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Interview Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-white"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[#265073]">Lịch phỏng vấn</h4>
          <button className="p-1.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {candidate.interviews.length === 0 ? (
          <div className="p-4 bg-[#9AD0C2]/10 rounded-lg text-center">
            <Calendar className="w-8 h-8 text-[#2D9596] mx-auto mb-2" />
            <p className="text-sm text-[#265073]/70">Chưa có lịch phỏng vấn</p>
            <button className="mt-3 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm">
              Tạo lịch mới
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {candidate.interviews.map((interview) => (
              <div
                key={interview.id}
                className="p-4 bg-[#9AD0C2]/20 rounded-lg border-l-4 border-[#2D9596]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#2D9596]" />
                    <span className="text-sm text-[#265073]">{interview.dateTime}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      interview.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {interview.status === 'confirmed' ? 'Đã xác nhận' : 'Đã gửi'}
                  </span>
                </div>
                <p className="text-sm text-[#265073] mb-2">{interview.notes}</p>
                <a
                  href={interview.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#2D9596] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Link phỏng vấn
                </a>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CandidateInfo;


