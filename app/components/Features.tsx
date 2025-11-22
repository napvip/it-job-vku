"use client";

import { Brain, Users, MessageSquare, FileText, BarChart3, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    icon: Brain,
    title: "AI Gợi ý việc làm chính xác",
    description: "Thuật toán AI phân tích CV và gợi ý việc làm phù hợp đến 95%"
  },
  {
    id: 2,
    icon: Users,
    title: "AI gợi ý ứng viên",
    description: "Tìm kiếm ứng viên phù hợp với JD nhanh chóng và chính xác"
  },
  {
    id: 3,
    icon: MessageSquare,
    title: "Chat trực tiếp",
    description: "Kết nối trực tiếp giữa ứng viên và nhà tuyển dụng"
  },
  {
    id: 4,
    icon: FileText,
    title: "ATS quản lý ứng viên",
    description: "Hệ thống quản lý hồ sơ ứng viên chuyên nghiệp và hiệu quả"
  },
  {
    id: 5,
    icon: Zap,
    title: "Phân tích CV tự động",
    description: "AI đọc và phân tích CV, trích xuất thông tin tự động"
  },
  {
    id: 6,
    icon: BarChart3,
    title: "Dashboard thống kê realtime",
    description: "Theo dõi hiệu quả tuyển dụng với số liệu thời gian thực"
  }
];

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-[#265073] mb-4">Tại sao chọn chúng tôi?</h2>
          <p className="text-[#2D9596] text-lg">Những tính năng vượt trội của nền tảng</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:bg-[#ECF4D6] transition-all group"
              >
                <div className="w-16 h-16 bg-[#ECF4D6] group-hover:bg-white rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Icon className="w-8 h-8 text-[#2D9596]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#265073] mb-3">{feature.title}</h3>
                <p className="text-[#2D9596] text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

