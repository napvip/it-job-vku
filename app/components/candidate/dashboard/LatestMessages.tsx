"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Badge } from "../../ui/badge";

const messages = [
  {
    id: 1,
    companyName: "TechCorp Vietnam",
    hrName: "Nguyễn Thị B",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    message: "Chúng tôi rất ấn tượng với hồ sơ của bạn. Bạn có thể tham gia phỏng vấn vào...",
    time: "10 phút trước",
    unread: true,
  },
  {
    id: 2,
    companyName: "Digital Solutions",
    hrName: "Trần Văn C",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    message: "Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ xem xét và phản hồi trong vòng 3 ngày.",
    time: "2 giờ trước",
    unread: true,
  },
  {
    id: 3,
    companyName: "Innovation Labs",
    hrName: "Lê Thị D",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    message: "Xin chúc mừng! Bạn đã vượt qua vòng đầu tiên.",
    time: "1 ngày trước",
    unread: false,
  },
];

export function LatestMessages() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white border-2 border-[#9AD0C2] rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#2D9596]/10 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#2D9596]" />
          </div>
          <div>
            <h3 className="text-lg text-[#265073]">Tin nhắn gần đây</h3>
            <p className="text-sm text-[#2D9596]">
              {messages.filter(m => m.unread).length} tin nhắn mới
            </p>
          </div>
        </div>

        <button className="text-[#2D9596] hover:text-[#265073] transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-md ${
              message.unread
                ? "bg-[#2D9596]/5 border-[#2D9596]"
                : "bg-[#ECF4D6] border-[#9AD0C2]"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#9AD0C2]">
                  <img
                    src={message.avatar}
                    alt={message.hrName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {message.unread && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2D9596] rounded-full border-2 border-white" />
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="text-[#265073] text-sm">{message.hrName}</h4>
                    <p className="text-xs text-[#2D9596]">{message.companyName}</p>
                  </div>
                  <span className="text-xs text-[#265073]/60 flex-shrink-0">
                    {message.time}
                  </span>
                </div>
                <p className="text-sm text-[#265073]/80 line-clamp-2">
                  {message.message}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Open Chat Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-all duration-300 flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Mở Chat</span>
      </motion.button>
    </motion.div>
  );
}


