"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Eye, Calendar } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    label: "Đã ứng tuyển",
    value: "5",
    description: "việc đang chờ phản hồi",
    color: "#2D9596",
  },
  {
    icon: TrendingUp,
    label: "Việc làm phù hợp",
    value: "23",
    description: "công việc mở cho kỹ năng của bạn",
    color: "#2D9596",
  },
  {
    icon: Eye,
    label: "Lượt xem hồ sơ",
    value: "47",
    description: "trong 30 ngày qua",
    color: "#2D9596",
  },
  {
    icon: Calendar,
    label: "Lịch phỏng vấn",
    value: "2",
    description: "cuộc phỏng vấn sắp tới",
    color: "#2D9596",
  },
];

export function QuickOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white border-2 border-[#9AD0C2] rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-[#2D9596] group"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon
                className="w-6 h-6 transition-all duration-300"
                style={{ color: stat.color }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl text-[#265073]">{stat.value}</div>
            <div className="text-[#265073] opacity-80">{stat.label}</div>
            <div className="text-sm text-[#2D9596]">{stat.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}


