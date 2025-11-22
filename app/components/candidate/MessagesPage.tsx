"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  Paperclip,
  Image as ImageIcon,
  MoreVertical,
  Check,
  CheckCheck,
  Circle,
  MessageCircle,
  Briefcase,
  X,
  FileText,
  Upload,
} from "lucide-react";

interface Message {
  id: number;
  senderId: "candidate" | "recruiter";
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "file";
  fileName?: string;
  fileSize?: string;
}

interface Conversation {
  id: number;
  companyName: string;
  recruiterName: string;
  recruiterTitle: string;
  jobTitle: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [messageText, setMessageText] = useState("");
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      companyName: "TechCorp Vietnam",
      recruiterName: "Nguyễn Thị Lan",
      recruiterTitle: "HR Manager",
      jobTitle: "Senior Frontend Developer",
      avatar: "🏢",
      lastMessage: "Chúng tôi rất ấn tượng với hồ sơ của bạn!",
      lastMessageTime: "10 phút trước",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: 1,
          senderId: "recruiter",
          text: "Xin chào! Cảm ơn bạn đã ứng tuyển vào vị trí Senior Frontend Developer.",
          timestamp: "14:30",
          status: "read",
          type: "text",
        },
        {
          id: 2,
          senderId: "candidate",
          text: "Xin chào! Rất vui được liên hệ với công ty.",
          timestamp: "14:32",
          status: "read",
          type: "text",
        },
        {
          id: 3,
          senderId: "recruiter",
          text: "Chúng tôi rất ấn tượng với hồ sơ của bạn! Bạn có thể tham gia phỏng vấn vào thứ 6 tuần này không?",
          timestamp: "14:35",
          status: "delivered",
          type: "text",
        },
      ],
    },
    {
      id: 2,
      companyName: "Digital Innovation Hub",
      recruiterName: "Trần Văn Minh",
      recruiterTitle: "Technical Lead",
      jobTitle: "Full Stack Developer",
      avatar: "💼",
      lastMessage: "Bạn đã gửi hồ sơ",
      lastMessageTime: "2 giờ trước",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          senderId: "candidate",
          text: "Xin chào! Tôi đã gửi CV cho vị trí Full Stack Developer.",
          timestamp: "12:00",
          status: "read",
          type: "text",
        },
        {
          id: 2,
          senderId: "candidate",
          text: "Đây là CV của tôi.",
          timestamp: "12:01",
          status: "read",
          type: "file",
          fileName: "CV_NguyenVanA.pdf",
          fileSize: "2.3 MB",
        },
        {
          id: 3,
          senderId: "recruiter",
          text: "Cảm ơn bạn! Chúng tôi sẽ xem xét và phản hồi sớm.",
          timestamp: "12:30",
          status: "read",
          type: "text",
        },
      ],
    },
    {
      id: 3,
      companyName: "Cloud Systems Vietnam",
      recruiterName: "Lê Hoàng Nam",
      recruiterTitle: "Senior Recruiter",
      jobTitle: "Backend Engineer",
      avatar: "☁️",
      lastMessage: "Lịch phỏng vấn đã được xác nhận",
      lastMessageTime: "Hôm qua",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          senderId: "recruiter",
          text: "Chào bạn! Chúng tôi muốn mời bạn tham gia phỏng vấn.",
          timestamp: "09:00",
          status: "read",
          type: "text",
        },
        {
          id: 2,
          senderId: "candidate",
          text: "Cảm ơn! Tôi có thể tham gia. Thời gian nào phù hợp ạ?",
          timestamp: "09:15",
          status: "read",
          type: "text",
        },
        {
          id: 3,
          senderId: "recruiter",
          text: "Thứ 5 tuần sau lúc 10:00 được không bạn?",
          timestamp: "09:20",
          status: "read",
          type: "text",
        },
        {
          id: 4,
          senderId: "candidate",
          text: "Được ạ! Tôi sẽ tham gia đúng giờ.",
          timestamp: "09:22",
          status: "read",
          type: "text",
        },
      ],
    },
  ]);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.recruiterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversationId) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: "candidate",
      text: messageText,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "text",
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: messageText,
              lastMessageTime: "Vừa xong",
            }
          : conv
      )
    );

    setMessageText("");
    setTimeout(scrollToBottom, 100);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowFileModal(true);
    }
  };

  const handleSendFile = () => {
    if (!selectedFile || !selectedConversationId) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: "candidate",
      text: `Đã gửi file: ${selectedFile.name}`,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
      type: "file",
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: "Bạn đã gửi file",
              lastMessageTime: "Vừa xong",
            }
          : conv
      )
    );

    setShowFileModal(false);
    setSelectedFile(null);
    setTimeout(scrollToBottom, 100);
  };

  const getMessageStatusIcon = (status: Message["status"]) => {
    if (status === "sent")
      return <Check className="w-3 h-3 text-white/70" />;
    if (status === "delivered")
      return <CheckCheck className="w-3 h-3 text-white/70" />;
    return <CheckCheck className="w-3 h-3 text-[#9AD0C2]" />;
  };

  const formatTime = (time: string) => {
    // Convert "10 phút trước", "2 giờ trước", "Hôm qua" etc
    return time;
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16 flex overflow-hidden">
      {/* ========== LEFT COLUMN - CONVERSATION LIST ========== */}
      <div
        className={`${
          selectedConversationId ? "hidden md:flex" : "flex"
        } w-full md:w-80 bg-white border-r-2 border-[#9AD0C2] flex-col flex-shrink-0`}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-[#9AD0C2] sticky top-0 bg-white z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm nhà tuyển dụng..."
              className="w-full pl-10 pr-4 py-2 bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                onClick={() => setSelectedConversationId(conv.id)}
                className={`p-4 cursor-pointer transition-all border-b border-[#9AD0C2]/30 ${
                  selectedConversationId === conv.id
                    ? "bg-[#2D9596]/10 border-l-4 border-l-[#2D9596]"
                    : "hover:bg-[#ECF4D6] border-l-4 border-l-transparent"
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center text-xl">
                      {conv.avatar}
                    </div>
                    {conv.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1EAD7B] border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[#265073] font-medium truncate">
                        {conv.companyName}
                      </h4>
                      <span className="text-xs text-[#265073]/60 flex-shrink-0 ml-2">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[#2D9596] text-sm mb-1 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      <span className="truncate">{conv.jobTitle}</span>
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-[#265073]/70 text-sm truncate flex-1">
                        {conv.lastMessage}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-[#2D9596] text-white text-xs rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
              <p className="text-[#265073]/70">Không tìm thấy cuộc trò chuyện</p>
            </div>
          )}
        </div>
      </div>

      {/* ========== RIGHT COLUMN - CHAT PANEL ========== */}
      <div className="flex-1 flex flex-col bg-[#ECF4D6]">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b-2 border-[#9AD0C2] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Back button for mobile */}
                <button
                  onClick={() => setSelectedConversationId(null)}
                  className="md:hidden p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#265073]" />
                </button>
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center text-xl">
                    {selectedConversation.avatar}
                  </div>
                  {selectedConversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#1EAD7B] border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-[#265073] font-medium">
                    {selectedConversation.recruiterName}
                  </h3>
                  <p className="text-[#2D9596] text-sm">
                    {selectedConversation.recruiterTitle} •{" "}
                    {selectedConversation.companyName}
                  </p>
                </div>
              </div>

              <button className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-[#265073]" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Date Separator */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#9AD0C2]/30" />
                <span className="text-xs text-[#265073]/60">Hôm nay</span>
                <div className="flex-1 h-px bg-[#9AD0C2]/30" />
              </div>

              {/* Messages */}
              {selectedConversation.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${
                    message.senderId === "candidate"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-md ${
                      message.senderId === "candidate" ? "items-end" : "items-start"
                    } flex flex-col gap-1`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.senderId === "candidate"
                          ? "bg-[#2D9596] text-white rounded-br-sm"
                          : "bg-white text-[#265073] border border-[#9AD0C2] rounded-bl-sm"
                      }`}
                    >
                      {message.type === "file" ? (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#265073]/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[#265073]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {message.fileName}
                            </p>
                            <p className="text-xs opacity-70">
                              {message.fileSize}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      )}
                    </div>

                    {/* Timestamp & Status */}
                    <div
                      className={`flex items-center gap-1 px-2 ${
                        message.senderId === "candidate"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <span className="text-xs text-[#265073]/50">
                        {message.timestamp}
                      </span>
                      {message.senderId === "candidate" && (
                        <div>{getMessageStatusIcon(message.status)}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t-2 border-[#9AD0C2] p-4">
              <div className="flex items-end gap-3">
                {/* File Attach Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-[#2D9596] hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {/* Image Button */}
                <button className="p-2 text-[#2D9596] hover:bg-[#ECF4D6] rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>

                {/* Text Input */}
                <div className="flex-1">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Nhập tin nhắn..."
                    rows={1}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] outline-none transition-colors text-[#265073] resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="px-4 py-2 bg-[#2D9596] text-white rounded-full hover:bg-[#265073] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State - No Conversation Selected */
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <MessageCircle className="w-20 h-20 text-[#2D9596] mb-4" />
            <h3 className="text-[#265073] text-xl mb-2">
              Chọn một cuộc trò chuyện
            </h3>
            <p className="text-[#265073]/70 text-center">
              Hãy chọn một cuộc trò chuyện để bắt đầu trao đổi với nhà tuyển
              dụng.
            </p>
          </div>
        )}
      </div>

      {/* ========== FILE UPLOAD MODAL ========== */}
      <AnimatePresence>
        {showFileModal && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#265073] text-xl">Gửi file</h3>
                <button
                  onClick={() => setShowFileModal(false)}
                  className="p-1 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#265073]" />
                </button>
              </div>

              {/* File Preview */}
              <div className="bg-[#ECF4D6] rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#2D9596] rounded-xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#265073] font-medium truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[#2D9596] text-sm">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFileModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSendFile}
                  className="flex-1 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Gửi file
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

