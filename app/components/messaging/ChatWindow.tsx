"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile, Video, FileText, Calendar, ExternalLink } from 'lucide-react';
import { Message } from '../../pages/EmployerMessaging';
import { mockConversations } from './ConversationList';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Mock messages data
const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: 'msg1',
      senderId: 'emp1',
      senderType: 'employer',
      content: 'Chào Tuấn, cảm ơn bạn đã ứng tuyển vào vị trí Senior Full Stack Developer. Chúng tôi đã xem CV của bạn và rất ấn tượng.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      id: 'msg2',
      senderId: 'cand1',
      senderType: 'candidate',
      content: 'Dạ, cảm ơn anh/chị rất nhiều. Em rất hứng thú với vị trí này.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
    },
    {
      id: 'msg3',
      senderId: 'emp1',
      senderType: 'employer',
      content: 'Bạn có thể cho chúng tôi biết thêm về kinh nghiệm làm việc với microservices không?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: 'msg4',
      senderId: 'cand1',
      senderType: 'candidate',
      content: 'Dạ được ạ. Em đã có 4 năm kinh nghiệm thiết kế và triển khai kiến trúc microservices với Node.js và Kubernetes.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
    },
    {
      id: 'msg5',
      senderId: 'cand1',
      senderType: 'candidate',
      content: 'Em đã làm việc với Docker, Jenkins CI/CD, và các công nghệ cloud như AWS, GCP.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.4),
    },
    {
      id: 'msg6',
      senderId: 'emp1',
      senderType: 'employer',
      content: 'Tuyệt vời! Bạn có thể gửi thêm một số dự án cụ thể mà bạn đã tham gia không?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: 'msg7',
      senderId: 'cand1',
      senderType: 'candidate',
      content: 'Em rất hứng thú với vị trí này. Em có thể bắt đầu ngay...',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
  ],
  conv2: [
    {
      id: 'msg1',
      senderId: 'emp1',
      senderType: 'employer',
      content: 'Chào Thu Hương, chúng tôi rất ấn tượng với portfolio của bạn.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: 'msg2',
      senderId: 'cand2',
      senderType: 'candidate',
      content: 'Cảm ơn anh/chị ạ. Em rất mong được làm việc với đội ngũ.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
    },
    {
      id: 'msg3',
      senderId: 'emp1',
      senderType: 'employer',
      content: 'Chúng tôi muốn mời bạn tham gia phỏng vấn vào thứ 5 tuần sau lúc 14h00. Bạn có tiện không?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10),
    },
    {
      id: 'msg4',
      senderId: 'cand2',
      senderType: 'candidate',
      content: 'Cảm ơn anh/chị đã mời phỏng vấn. Em xác nhận tham gia lúc 14h00',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ],
  conv3: [
    {
      id: 'msg1',
      senderId: 'emp1',
      senderType: 'employer',
      content: 'Chào Hoàng Nam, chúng tôi đang tìm kiếm một DevOps Engineer có kinh nghiệm.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10),
    },
    {
      id: 'msg2',
      senderId: 'cand3',
      senderType: 'candidate',
      content: 'Chào anh/chị, em đã gửi thông tin chi tiết qua email',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  ],
};

interface ChatWindowProps {
  conversationId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages[conversationId] || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = mockConversations.find((c) => c.id === conversationId);

  if (!conversation) return null;

  const quickReplies = [
    'Cảm ơn bạn đã ứng tuyển',
    'Chúng tôi muốn mời bạn phỏng vấn',
    'Bạn vui lòng gửi CV chi tiết hơn?',
  ];

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    if (isToday) return time;
    if (isYesterday) return `Hôm qua ${time}`;
    return `${date.toLocaleDateString('vi-VN')} ${time}`;
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: 'emp1',
      senderType: 'employer',
      content: messageInput,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
    
    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuickReply = (text: string) => {
    setMessageInput(text);
  };

  const groupMessagesByDate = () => {
    const grouped: { date: string; messages: Message[] }[] = [];
    
    messages.forEach((msg) => {
      const dateStr = msg.timestamp.toLocaleDateString('vi-VN');
      const existing = grouped.find((g) => g.date === dateStr);
      
      if (existing) {
        existing.messages.push(msg);
      } else {
        grouped.push({ date: dateStr, messages: [msg] });
      }
    });
    
    return grouped;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b-2 border-[#9AD0C2] bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={conversation.candidateAvatar}
              alt={conversation.candidateName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="text-[#265073] mb-1">{conversation.candidateName}</h3>
              <p className="text-sm text-[#2D9596] mb-1">{conversation.jobTitle}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#2D9596]/10 rounded text-xs text-[#2D9596]">
                  Match: {conversation.matchScore}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Xem hồ sơ
            </button>
            <button className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-[#2D9596]" />
            </button>
            <button className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors">
              <Calendar className="w-5 h-5 text-[#2D9596]" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#ECF4D6]/30">
        {groupMessagesByDate().map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Date Divider */}
            <div className="flex items-center justify-center my-6">
              <div className="px-4 py-1 bg-[#265073]/10 rounded-full text-sm text-[#265073]">
                {group.date === new Date().toLocaleDateString('vi-VN') ? 'Hôm nay' : group.date}
              </div>
            </div>

            {/* Messages */}
            {group.messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex mb-4 ${
                  message.senderType === 'employer' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.senderType === 'employer'
                      ? 'bg-[#2D9596] text-white'
                      : 'bg-[#9AD0C2]/30 text-[#265073]'
                  } rounded-2xl px-4 py-3 shadow-sm`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.senderType === 'employer' ? 'text-white/70' : 'text-[#265073]/60'
                    }`}
                  >
                    {formatMessageTime(message.timestamp)}
                  </p>
                  {message.fileAttachment && (
                    <div className="mt-2 p-2 bg-white/20 rounded-lg flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{message.fileAttachment.name}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-6 py-3 border-t border-[#9AD0C2]/30 bg-white">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="px-4 py-2 bg-[#9AD0C2]/30 text-[#265073] rounded-full whitespace-nowrap hover:bg-[#9AD0C2]/50 transition-colors text-sm"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t-2 border-[#9AD0C2] bg-white">
        <div className="flex items-end gap-3">
          <button className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-[#2D9596]" />
          </button>
          <button className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors flex-shrink-0">
            <Smile className="w-5 h-5 text-[#2D9596]" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Nhập tin nhắn..."
              rows={1}
              className="w-full px-4 py-3 rounded-3xl border-2 border-[#9AD0C2] focus:border-[#2D9596] outline-none resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="p-3 bg-[#2D9596] text-white rounded-full hover:bg-[#265073] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;


