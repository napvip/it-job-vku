"use client";

import { motion } from "framer-motion";
import { Target, Clock, TrendingDown } from "lucide-react";

export function AIBenefits() {
  const benefits = [
    {
      icon: Target,
      title: "Cho ứng viên",
      items: [
        "Tìm việc chính xác hơn 10 lần",
        "Không phải lọc job thủ công",
        "Hiểu rõ điểm mạnh/yếu của CV",
        "Tiết kiệm 80% thời gian tìm việc",
      ],
      gradient: "from-[#2D9596] to-[#265073]",
    },
    {
      icon: Clock,
      title: "Cho nhà tuyển dụng",
      items: [
        "Tiết kiệm 40-60% thời gian lọc CV",
        "Giảm chi phí tuyển dụng đáng kể",
        "Tìm đúng người trong vài phút",
        "Tăng chất lượng ứng viên 3x",
      ],
      gradient: "from-[#265073] to-[#2D9596]",
    },
    {
      icon: TrendingDown,
      title: "Cho doanh nghiệp",
      items: [
        "Giảm 50% tỷ lệ nghỉ việc sớm",
        "Tăng hiệu quả onboarding",
        "Tối ưu ROI tuyển dụng",
        "Dashboard phân tích real-time",
      ],
      gradient: "from-[#2D9596] to-[#265073]",
    },
  ];

  return (
    <section className="py-20 bg-white">
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
              Lợi ích nổi bật
            </h2>
            <p className="text-[#265073]/70 text-lg max-w-2xl mx-auto">
              AI Matching mang lại giá trị thực sự cho tất cả các bên
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 border-2 border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)] hover:shadow-[0_12px_40px_rgba(45,149,150,0.3)] transition-all"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-[#265073] text-2xl mb-6">
                  {benefit.title}
                </h3>

                {/* Items */}
                <ul className="space-y-4">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ECF4D6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-[#2D9596]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-[#265073]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


