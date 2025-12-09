"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  MessageCircle,
  Briefcase,
  X,
  FileText,
  Upload,
  Trash2,
} from "lucide-react";
import {
  getJob,
  getCompanyInfo,
  getOrCreateConversation,
  sendMessage as sendFirebaseMessage,
  getMessages,
  getConversations,
  markMessagesAsRead,
  deleteConversation,
  ConversationData,
  MessageData,
  auth,
} from "../../../lib/firebase";

export function MessagesPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [showFileModal, setShowFileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Firebase data
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  // Auto-open conversation from query params
  useEffect(() => {
    const companyId = searchParams.get("companyId");
    const jobId = searchParams.get("jobId");

    if (companyId && jobId && auth.currentUser) {
      handleStartConversation(companyId, jobId);
    }
  }, [searchParams]);

  // Load messages when conversation changes
  useEffect(() => {
    if (selectedConversationId) {
      loadMessages(selectedConversationId);
      markAsRead(selectedConversationId);
    }
  }, [selectedConversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    if (!auth.currentUser) return;

    try {
      setLoading(true);
      const convs = await getConversations(auth.currentUser.uid, "candidate");
      setConversations(convs);
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const msgs = await getMessages(conversationId);
      setMessages(msgs);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const markAsRead = async (conversationId: string) => {
    try {
      await markMessagesAsRead(conversationId, "candidate");
      // Update local conversation unread count
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversationId
            ? { ...conv, unreadCountCandidate: 0 }
            : conv
        )
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleStartConversation = async (companyId: string, jobId: string) => {
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    try {
      // Get or create conversation
      const conversationId = await getOrCreateConversation(
        auth.currentUser.uid,
        companyId,
        jobId
      );

      // Reload conversations to include the new one
      await loadConversations();

      // Select the conversation
      setSelectedConversationId(conversationId);

      // Send initial message if it's a new conversation
      const msgs = await getMessages(conversationId);
      if (msgs.length === 0) {
        const jobData = await getJob(jobId);
        if (jobData) {
          await sendFirebaseMessage(
            conversationId,
            auth.currentUser.uid,
            "candidate",
            `Xin chào! Tôi quan tâm đến vị trí ${jobData.title} tại công ty.`
          );
          await loadMessages(conversationId);
          await loadConversations();
        }
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
      alert("Có lỗi khi tạo cuộc trò chuyện!");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversationId || !auth.currentUser) return;

    setSending(true);
    try {
      await sendFirebaseMessage(
        selectedConversationId,
        auth.currentUser.uid,
        "candidate",
        messageText
      );

      setMessageText("");
      await loadMessages(selectedConversationId);
      await loadConversations();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Gửi tin nhắn thất bại!");
    } finally {
      setSending(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowFileModal(true);
    }
  };

  const handleSendFile = async () => {
    if (!selectedFile || !selectedConversationId || !auth.currentUser) return;

    setSending(true);
    try {
      // In production, upload file to Firebase Storage first
      const fileUrl = URL.createObjectURL(selectedFile);

      await sendFirebaseMessage(
        selectedConversationId,
        auth.currentUser.uid,
        "candidate",
        `Đã gửi file: ${selectedFile.name}`,
        {
          name: selectedFile.name,
          type: selectedFile.type,
          url: fileUrl,
        }
      );

      setShowFileModal(false);
      setSelectedFile(null);
      await loadMessages(selectedConversationId);
      await loadConversations();
    } catch (error) {
      console.error("Error sending file:", error);
      alert("Gửi file thất bại!");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteConversation = async () => {
    if (!selectedConversationId) return;

    try {
      await deleteConversation(selectedConversationId);
      setShowDeleteModal(false);
      setSelectedConversationId(null);
      await loadConversations();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      alert("Xóa cuộc trò chuyện thất bại!");
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days === 1) return "Hôm qua";
    if (days < 7) return `${days} ngày trước`;

    return new Date(date).toLocaleDateString("vi-VN");
  };

  const formatMessageTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải tin nhắn...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-[#265073] mb-2">Tin nhắn</h1>
          <p className="text-[#2D9596]">
            Trao đổi trực tiếp với nhà tuyển dụng
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          style={{ height: "calc(100vh - 240px)", minHeight: "600px" }}
        >
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full md:w-80 bg-white border-r-2 border-[#9AD0C2] flex flex-col shrink-0">
              {/* Search */}
              <div className="p-4 border-b-2 border-[#9AD0C2]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageCircle className="w-12 h-12 text-[#9AD0C2] mx-auto mb-3" />
                    <p className="text-[#265073] font-medium mb-1">
                      Chưa có tin nhắn
                    </p>
                    <p className="text-sm text-[#2D9596]">
                      Bắt đầu trò chuyện với nhà tuyển dụng
                    </p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <motion.div
                      key={conv.id}
                      whileHover={{ backgroundColor: "#ECF4D6" }}
                      onClick={() => setSelectedConversationId(conv.id!)}
                      className={`p-4 cursor-pointer border-b border-[#9AD0C2] ${
                        selectedConversationId === conv.id
                          ? "bg-[#ECF4D6]"
                          : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative shrink-0">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center text-xl">
                            {conv.companyName.charAt(0)}
                          </div>
                          {conv.unreadCountCandidate > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                              {conv.unreadCountCandidate}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold text-[#265073] truncate">
                              {conv.companyName}
                            </h3>
                            <span className="text-xs text-[#265073]/60 shrink-0 ml-2">
                              {formatTime(conv.lastMessageTime)}
                            </span>
                          </div>
                          {conv.jobTitle && (
                            <div className="flex items-center gap-1 mb-1">
                              <Briefcase className="w-3 h-3 text-[#2D9596]" />
                              <span className="text-xs text-[#2D9596] truncate">
                                {conv.jobTitle}
                              </span>
                            </div>
                          )}
                          <p className="text-sm text-[#265073]/70 truncate">
                            {conv.lastMessage || "Bắt đầu cuộc trò chuyện..."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b-2 border-[#9AD0C2] bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center text-xl">
                          {selectedConversation.companyName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#265073]">
                            {selectedConversation.companyName}
                          </h3>
                          {selectedConversation.jobTitle && (
                            <p className="text-sm text-[#2D9596]">
                              {selectedConversation.jobTitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Xóa cuộc trò chuyện"
                      >
                        <Trash2 className="w-5 h-5 text-[#265073] group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-[#ECF4D6]">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-[#265073]/60">
                          Chưa có tin nhắn. Hãy bắt đầu cuộc trò chuyện!
                        </p>
                      </div>
                    ) : (
                      <>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex mb-4 ${
                              msg.senderType === "candidate"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[70%] ${
                                msg.senderType === "candidate"
                                  ? "bg-[#2D9596] text-white"
                                  : "bg-white text-[#265073]"
                              } rounded-2xl p-3 shadow`}
                            >
                              {msg.fileAttachment ? (
                                <div className="flex items-center gap-2 mb-2">
                                  <FileText className="w-5 h-5" />
                                  <div>
                                    <p className="font-medium">
                                      {msg.fileAttachment.name}
                                    </p>
                                  </div>
                                </div>
                              ) : null}
                              <p className="break-words">{msg.content}</p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span
                                  className={`text-xs ${
                                    msg.senderType === "candidate"
                                      ? "text-white/70"
                                      : "text-[#265073]/60"
                                  }`}
                                >
                                  {formatMessageTime(msg.timestamp)}
                                </span>
                                {msg.senderType === "candidate" && (
                                  <>
                                    {msg.read ? (
                                      <CheckCheck className="w-4 h-4 text-white/70" />
                                    ) : (
                                      <Check className="w-4 h-4 text-white/70" />
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t-2 border-[#9AD0C2] bg-white">
                    <div className="flex items-end gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                      >
                        <Paperclip className="w-5 h-5 text-[#2D9596]" />
                      </button>
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
                        className="flex-1 px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none resize-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim() || sending}
                        className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#265073] mb-2">
                      Chọn cuộc trò chuyện
                    </h3>
                    <p className="text-[#2D9596]">
                      Chọn một cuộc trò chuyện để bắt đầu nhắn tin
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* File Upload Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#265073]">
                  Gửi file
                </h3>
                <button
                  onClick={() => setShowFileModal(false)}
                  className="p-1 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#265073]" />
                </button>
              </div>

              <div className="mb-4 p-4 bg-[#ECF4D6] rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#2D9596]" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#265073] truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-[#2D9596]">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowFileModal(false);
                    setSelectedFile(null);
                  }}
                  className="flex-1 px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSendFile}
                  disabled={sending}
                  className="flex-1 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors disabled:opacity-50"
                >
                  {sending ? "Đang gửi..." : "Gửi"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#265073]">
                      Xóa cuộc trò chuyện
                    </h3>
                    <p className="text-sm text-[#2D9596]">
                      Không thể hoàn tác
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#265073]" />
                </button>
              </div>

              <p className="text-[#265073] mb-6">
                Bạn có chắc chắn muốn xóa cuộc trò chuyện này? Tất cả tin nhắn sẽ bị xóa vĩnh viễn.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteConversation}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
