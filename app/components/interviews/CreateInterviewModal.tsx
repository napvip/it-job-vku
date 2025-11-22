"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Calendar, Clock, MapPin, Video, User, FileText } from 'lucide-react';
import { candidateOptions, interviewerOptions } from './mockInterviewData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CreateInterviewModalProps {
  onClose: () => void;
}

const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'select-candidate' | 'schedule'>('select-candidate');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '60',
    type: 'online' as 'online' | 'onsite',
    location: '',
    meetingLink: '',
    interviewer: '',
    candidateNotes: '',
    internalNotes: '',
  });

  const filteredCandidates = candidateOptions.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCandidateData = candidateOptions.find(
    (c) => c.id === selectedCandidate
  );

  const handleSubmit = (sendInvite: boolean) => {
    // In real app, save to backend
    console.log('Creating interview:', {
      candidateId: selectedCandidate,
      ...formData,
      sendInvite,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b-2 border-[#9AD0C2] p-6 flex items-center justify-between">
          <h2 className="text-[#265073]">Tạo lịch phỏng vấn</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#265073]" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Select Candidate */}
          {step === 'select-candidate' && (
            <div>
              <h3 className="text-[#265073] mb-4">Chọn ứng viên</h3>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm ứng viên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none"
                />
              </div>

              {/* Candidate List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedCandidate === candidate.id
                        ? 'border-[#2D9596] bg-[#2D9596]/5'
                        : 'border-[#9AD0C2] hover:border-[#2D9596] hover:bg-[#9AD0C2]/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-[#265073] mb-1">{candidate.name}</h4>
                        <p className="text-sm text-[#2D9596]">{candidate.jobTitle}</p>
                      </div>
                      <div className="px-2 py-1 bg-[#2D9596]/10 rounded text-sm text-[#2D9596]">
                        Match: {candidate.matchScore}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep('schedule')}
                  disabled={!selectedCandidate}
                  className="px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 'schedule' && selectedCandidateData && (
            <div>
              {/* Selected Candidate Summary */}
              <div className="mb-6 p-4 bg-[#9AD0C2]/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={selectedCandidateData.avatar}
                    alt={selectedCandidateData.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-[#265073]">{selectedCandidateData.name}</h4>
                    <p className="text-sm text-[#2D9596]">{selectedCandidateData.jobTitle}</p>
                  </div>
                  <button
                    onClick={() => setStep('select-candidate')}
                    className="text-sm text-[#2D9596] hover:underline"
                  >
                    Đổi ứng viên
                  </button>
                </div>
              </div>

              {/* Schedule Form */}
              <div className="space-y-6">
                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#265073] mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Ngày phỏng vấn
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#265073] mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Giờ phỏng vấn
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm text-[#265073] mb-2">Thời lượng</label>
                  <div className="flex gap-3">
                    {['30', '45', '60'].map((duration) => (
                      <label key={duration} className="flex-1">
                        <input
                          type="radio"
                          name="duration"
                          value={duration}
                          checked={formData.duration === duration}
                          onChange={(e) =>
                            setFormData({ ...formData, duration: e.target.value })
                          }
                          className="sr-only"
                        />
                        <div
                          className={`px-4 py-2 border-2 rounded-lg text-center cursor-pointer transition-all ${
                            formData.duration === duration
                              ? 'border-[#2D9596] bg-[#2D9596] text-white'
                              : 'border-[#9AD0C2] text-[#265073] hover:border-[#2D9596]'
                          }`}
                        >
                          {duration} phút
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm text-[#265073] mb-2">Hình thức</label>
                  <div className="flex gap-3">
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="type"
                        value="online"
                        checked={formData.type === 'online'}
                        onChange={() => setFormData({ ...formData, type: 'online' })}
                        className="sr-only"
                      />
                      <div
                        className={`px-4 py-2 border-2 rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-2 ${
                          formData.type === 'online'
                            ? 'border-[#2D9596] bg-[#2D9596] text-white'
                            : 'border-[#9AD0C2] text-[#265073] hover:border-[#2D9596]'
                        }`}
                      >
                        <Video className="w-4 h-4" />
                        Online
                      </div>
                    </label>
                    <label className="flex-1">
                      <input
                        type="radio"
                        name="type"
                        value="onsite"
                        checked={formData.type === 'onsite'}
                        onChange={() => setFormData({ ...formData, type: 'onsite' })}
                        className="sr-only"
                      />
                      <div
                        className={`px-4 py-2 border-2 rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-2 ${
                          formData.type === 'onsite'
                            ? 'border-[#2D9596] bg-[#2D9596] text-white'
                            : 'border-[#9AD0C2] text-[#265073] hover:border-[#2D9596]'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        Onsite
                      </div>
                    </label>
                  </div>
                </div>

                {/* Location or Meeting Link */}
                {formData.type === 'online' ? (
                  <div>
                    <label className="block text-sm text-[#265073] mb-2">
                      <Video className="inline w-4 h-4 mr-1" />
                      Link phỏng vấn (Google Meet / Zoom)
                    </label>
                    <input
                      type="url"
                      value={formData.meetingLink}
                      onChange={(e) =>
                        setFormData({ ...formData, meetingLink: e.target.value })
                      }
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                      className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm text-[#265073] mb-2">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Địa điểm phỏng vấn
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Văn phòng công ty - Tầng X, Tòa nhà ABC..."
                      className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none"
                    />
                  </div>
                )}

                {/* Interviewer */}
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Người phỏng vấn chính
                  </label>
                  <select
                    value={formData.interviewer}
                    onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none"
                  >
                    <option value="">Chọn người phỏng vấn</option>
                    {interviewerOptions.map((interviewer) => (
                      <option key={interviewer.id} value={interviewer.id}>
                        {interviewer.name} - {interviewer.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Candidate Notes */}
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    <FileText className="inline w-4 h-4 mr-1" />
                    Ghi chú cho ứng viên
                  </label>
                  <textarea
                    value={formData.candidateNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, candidateNotes: e.target.value })
                    }
                    placeholder="Những thông tin ứng viên cần biết trước khi phỏng vấn..."
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none resize-none"
                  />
                </div>

                {/* Internal Notes */}
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    Ghi chú nội bộ (chỉ HR thấy)
                  </label>
                  <textarea
                    value={formData.internalNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, internalNotes: e.target.value })
                    }
                    placeholder="Ghi chú nội bộ về ứng viên hoặc buổi phỏng vấn..."
                    rows={2}
                    className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setStep('select-candidate')}
                  className="px-6 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 transition-colors"
                >
                  Quay lại
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => handleSubmit(false)}
                  className="px-6 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors"
                >
                  Lưu mà không gửi
                </button>
                <button
                  onClick={() => handleSubmit(true)}
                  className="px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
                >
                  Gửi lời mời phỏng vấn
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CreateInterviewModal;


