"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Conversation } from '../../pages/EmployerMessaging';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    candidateId: 'cand1',
    candidateName: 'Nguyễn Minh Tuấn',
    candidateAvatar: 'https://i.pravatar.cc/150?img=12',
    jobTitle: 'Senior Full Stack Developer',
    jobId: 'job1',
    lastMessage: 'Em rất hứng thú với vị trí này. Em có thể bắt đầu ngay...',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 3,
    matchScore: 94,
    status: 'unread',
  },
  {
    id: 'conv2',
    candidateId: 'cand2',
    candidateName: 'Trần Thu Hương',
    candidateAvatar: 'https://i.pravatar.cc/150?img=5',
    jobTitle: 'Frontend Developer (React)',
    jobId: 'job2',
    lastMessage: 'Cảm ơn anh/chị đã mời phỏng vấn. Em xác nhận tham gia lúc 14h00',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    matchScore: 88,
    status: 'interviewed',
  },
  {
    id: 'conv3',
    candidateId: 'cand3',
    candidateName: 'Lê Hoàng Nam',
    candidateAvatar: 'https://i.pravatar.cc/150?img=33',
    jobTitle: 'DevOps Engineer',
    jobId: 'job3',
    lastMessage: 'Chào anh/chị, em đã gửi thông tin chi tiết qua email',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unreadCount: 1,
    matchScore: 91,
    status: 'recruiting',
  },
  {
    id: 'conv4',
    candidateId: 'cand4',
    candidateName: 'Phạm Thị Lan',
    candidateAvatar: 'https://i.pravatar.cc/150?img=9',
    jobTitle: 'UI/UX Designer',
    jobId: 'job4',
    lastMessage: 'Em có thể gửi portfolio đầy đủ cho anh/chị xem được không ạ?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    matchScore: 85,
    status: 'recruiting',
  },
  {
    id: 'conv5',
    candidateId: 'cand5',
    candidateName: 'Vũ Đức Anh',
    candidateAvatar: 'https://i.pravatar.cc/150?img=14',
    jobTitle: 'Backend Developer (Node.js)',
    jobId: 'job5',
    lastMessage: 'Cảm ơn anh/chị đã xem xét hồ sơ của em',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    unreadCount: 0,
    matchScore: 79,
    status: 'new',
  },
  {
    id: 'conv6',
    candidateId: 'cand6',
    candidateName: 'Hoàng Minh Châu',
    candidateAvatar: 'https://i.pravatar.cc/150?img=20',
    jobTitle: 'QA Engineer',
    jobId: 'job6',
    lastMessage: 'Em có 3 năm kinh nghiệm automation testing với Selenium',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    unreadCount: 0,
    matchScore: 82,
    status: 'rejected',
  },
];

interface ConversationListProps {
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  selectedConversationId,
  onSelectConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'unread', label: 'Chưa đọc' },
    { id: 'recruiting', label: 'Đang tuyển' },
    { id: 'interviewed', label: 'Đã phỏng vấn' },
    { id: 'rejected', label: 'Đã trượt' },
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} phút`;
    if (hours < 24) return `${hours} giờ`;
    return `${days} ngày`;
  };

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesSearch = conv.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'unread') return matchesSearch && conv.unreadCount > 0;
    return matchesSearch && conv.status === activeFilter;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-[#9AD0C2]/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
          <input
            type="text"
            placeholder="Tìm kiếm ứng viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-[#9AD0C2] focus:border-[#2D9596] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-[#9AD0C2]/30">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                activeFilter === filter.id
                  ? 'bg-[#2D9596] text-white'
                  : 'bg-transparent border-2 border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596]/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Items */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-[#265073]/60">
            Không tìm thấy cuộc trò chuyện
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: '#9AD0C2' + '15' }}
              onClick={() => onSelectConversation(conversation.id)}
              className={`p-4 border-b border-[#9AD0C2]/30 cursor-pointer transition-all relative ${
                selectedConversationId === conversation.id
                  ? 'bg-[#9AD0C2]/20 border-l-4 border-l-[#2D9596]'
                  : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <ImageWithFallback
                    src={conversation.candidateAvatar}
                    alt={conversation.candidateName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D9596] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">{conversation.unreadCount}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-[#265073] truncate">{conversation.candidateName}</h4>
                    <span className="text-xs text-[#265073]/60 flex-shrink-0">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-[#2D9596] mb-1 truncate">
                    {conversation.jobTitle}
                  </p>
                  <p className="text-sm text-[#265073]/70 truncate">
                    {conversation.lastMessage}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-[#2D9596]/10 rounded text-xs text-[#2D9596]">
                      Match: {conversation.matchScore}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
export { mockConversations };


