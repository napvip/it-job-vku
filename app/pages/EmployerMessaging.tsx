import React, { useState } from 'react';
import { motion } from 'motion/react';
import ConversationList from '../components/messaging/ConversationList';
import ChatWindow from '../components/messaging/ChatWindow';
import CandidateInfo from '../components/messaging/CandidateInfo';
import { MessageCircle } from 'lucide-react';

export interface Message {
  id: string;
  senderId: string;
  senderType: 'candidate' | 'employer';
  content: string;
  timestamp: Date;
  fileAttachment?: {
    name: string;
    type: string;
    url: string;
  };
}

export interface Conversation {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  jobId: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  matchScore: number;
  status: 'new' | 'unread' | 'recruiting' | 'interviewed' | 'rejected';
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  cvUrl: string;
  appliedJob: string;
  matchScore: number;
  pipelineStatus: 'new' | 'viewed' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  internalNotes: string;
  interviews: {
    id: string;
    dateTime: string;
    link: string;
    notes: string;
    status: 'sent' | 'confirmed';
  }[];
}

const EmployerMessaging: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-[#265073] mb-2">Tin nhắn</h1>
          <p className="text-[#265073]/70">
            Trao đổi trực tiếp với ứng viên và quản lý quá trình tuyển dụng
          </p>
        </motion.div>

        {/* 3-Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          style={{ height: 'calc(100vh - 240px)', minHeight: '600px' }}
        >
          <div className="flex h-full">
            {/* Left Column - Conversation List */}
            <div className="w-[340px] border-r-2 border-[#9AD0C2] bg-white overflow-y-auto">
              <ConversationList
                selectedConversationId={selectedConversationId}
                onSelectConversation={setSelectedConversationId}
              />
            </div>

            {/* Center Column - Chat Window */}
            <div className="flex-1 flex flex-col bg-white">
              {selectedConversationId ? (
                <ChatWindow conversationId={selectedConversationId} />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="w-12 h-12 text-[#2D9596]" />
                    </div>
                    <h3 className="text-[#265073] mb-2">Chọn một cuộc trò chuyện để bắt đầu</h3>
                    <p className="text-[#265073]/60">
                      Trao đổi trực tiếp với ứng viên và quản lý quá trình tuyển dụng
                    </p>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Right Column - Candidate Info */}
            {selectedConversationId && (
              <div className="w-[320px] border-l-2 border-[#9AD0C2] bg-[#ECF4D6] overflow-y-auto">
                <CandidateInfo conversationId={selectedConversationId} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerMessaging;