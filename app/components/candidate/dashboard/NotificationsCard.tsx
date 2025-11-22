"use client";

import { motion } from "framer-motion";
import { Bell, Eye, Briefcase, Calendar, ArrowRight } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: Eye,
    text: "Công ty TechCorp đã xem hồ sơ của bạn",
    time: "5 phút trước",
    color: "#2D9596",
  },
  {
    id: 2,
    icon: Briefcase,
    text: "Có 3 job mới phù hợp kỹ năng React",
    time: "1 giờ trước",
    color: "#2D9596",
  },
  {
    id: 3,
    icon: Calendar,
    text: "Bạn có lịch phỏng vấn vào ngày mai lúc 14:00",
    time: "2 giờ trước",
    color: "#22C55E",
  },
  {
    id: 4,
    icon: Eye,
    text: "Digital Solutions quan tâm đến hồ sơ của bạn",
    time: "3 giờ trước",
    color: "#2D9596",
  },
];

export function NotificationsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white border-2 border-[#9AD0C2] rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#2D9596]/10 rounded-lg flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-[#2D9596]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full flex items-center justify-center text-xs text-white">
              {notifications.length}
            </div>
          </div>
          <div>
            <h3 className="text-lg text-[#265073]">Thông báo mới</h3>
            <p className="text-sm text-[#2D9596]">{notifications.length} thông báo</p>
          </div>
        </div>

        <button className="text-[#2D9596] hover:text-[#265073] transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#9AD0C2] scrollbar-track-[#ECF4D6]">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="p-3 rounded-lg bg-[#ECF4D6] hover:bg-[#9AD0C2]/30 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${notification.color}20` }}
              >
                <notification.icon
                  className="w-4 h-4"
                  style={{ color: notification.color }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#265073] mb-1">{notification.text}</p>
                <p className="text-xs text-[#2D9596]">{notification.time}</p>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-[#2D9596] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2.5 text-[#2D9596] border-2 border-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all duration-300"
      >
        Xem tất cả thông báo
      </motion.button>
    </motion.div>
  );
}


