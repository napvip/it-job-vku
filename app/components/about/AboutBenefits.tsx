"use client";

import { motion } from "framer-motion";
import { User, Building2, Search, Target, Clock, TrendingUp, Sparkles, Shield } from "lucide-react";

export function AboutBenefits() {
  const candidateBenefits = [
    {
      icon: Search,
      title: "Tìm việc chính xác",
      description: "AI gợi ý việc làm phù hợp với kỹ năng và kinh nghiệm của bạn",
    },
    {
      icon: Clock,
      title: "Tiết kiệm thời gian",
      description: "Không cần tìm kiếm thủ công, hệ thống tự động gợi ý việc làm phù hợp",
    },
    {
      icon: TrendingUp,
      title: "Phát triển sự nghiệp",
      description: "Nhận tư vấn và gợi ý con đường phát triển nghề nghiệp",
    },
    {
      icon: Shield,
      title: "Thông tin minh bạch",
      description: "Xem đánh giá công ty, mức lương và phúc lợi rõ ràng",
    },
  ];

  const employerBenefits = [
    {
      icon: Target,
      title: "Tìm ứng viên chất lượng",
      description: "AI phân tích và gợi ý ứng viên phù hợp nhất với yêu cầu công việc",
    },
    {
      icon: Clock,
      title: "Giảm thời gian tuyển dụng",
      description: "Tự động sàng lọc và xếp hạng ứng viên, tiết kiệm 70% thời gian",
    },
    {
      icon: Sparkles,
      title: "Dashboard quản lý ATS",
      description: "Theo dõi toàn bộ quy trình tuyển dụng trên một nền tảng",
    },
    {
      icon: TrendingUp,
      title: "Phân tích & Báo cáo",
      description: "Thống kê hiệu quả tuyển dụng và xu hướng thị trường",
    },
  ];

  return (
    <section className="py-20 bg-[#ECF4D6]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[#265073] text-4xl mb-4">
              Lợi ích cho mọi người
            </h2>
            <p className="text-[#2D9596] text-lg">
              Giải pháp toàn diện cho cả ứng viên và nhà tuyển dụng
            </p>
          </motion.div>

          {/* Two Columns */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* For Candidates */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)]"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-[#265073] text-2xl">
                    Dành cho Ứng viên IT
                  </h3>
                  <p className="text-[#2D9596] text-sm">Tìm việc thông minh hơn</p>
                </div>
              </div>

              <div className="space-y-6">
                {candidateBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-[#ECF4D6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[#2D9596]" />
                    </div>
                    <div>
                      <h4 className="text-[#265073] mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-[#265073]/70 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* For Employers */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)]"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-[#265073] text-2xl">
                    Dành cho Nhà tuyển dụng
                  </h3>
                  <p className="text-[#2D9596] text-sm">Tuyển dụng hiệu quả hơn</p>
                </div>
              </div>

              <div className="space-y-6">
                {employerBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-[#ECF4D6] rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[#2D9596]" />
                    </div>
                    <div>
                      <h4 className="text-[#265073] mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-[#265073]/70 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


