"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)]"
    >
      <h2 className="text-[#265073] text-2xl mb-6">Gửi tin nhắn</h2>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
        >
          <p className="text-green-600">
            Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-[#265073] mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#265073] mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* User Type */}
        <div>
          <label className="block text-[#265073] mb-2">
            Loại người dùng <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.userType}
            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
            className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all bg-white text-[#265073]"
          >
            <option value="">Chọn loại người dùng</option>
            <option value="candidate">Ứng viên IT</option>
            <option value="employer">Nhà tuyển dụng</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-[#265073] mb-2">
            Chủ đề liên hệ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Vấn đề cần hỗ trợ"
              className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-[#265073] mb-2">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Mô tả chi tiết vấn đề của bạn..."
            rows={6}
            className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-[#265073] text-white rounded-full hover:bg-[#2D9596] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Gửi tin nhắn
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}


