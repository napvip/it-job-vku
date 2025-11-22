"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Sparkles, CheckCircle } from "lucide-react";

export function AboutHowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Đăng ký tài khoản",
      description: "Tạo hồ sơ chi tiết với thông tin kỹ năng, kinh nghiệm và mong muốn nghề nghiệp",
      color: "#2D9596",
    },
    {
      icon: Search,
      title: "Tìm kiếm hoặc đăng tin",
      description: "Ứng viên tìm việc phù hợp, nhà tuyển dụng đăng tin và tìm ứng viên",
      color: "#265073",
    },
    {
      icon: Sparkles,
      title: "AI phân tích & gợi ý",
      description: "Hệ thống AI phân tích và đưa ra gợi ý chính xác dựa trên dữ liệu",
      color: "#2D9596",
    },
    {
      icon: CheckCircle,
      title: "Kết nối & Tuyển dụng",
      description: "Kết nối trực tiếp, phỏng vấn và hoàn tất quy trình tuyển dụng nhanh chóng",
      color: "#265073",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #2D9596 0, #2D9596 1px, transparent 0, transparent 50%)`,
          backgroundSize: '10px 10px',
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[#265073] text-4xl mb-4">
              Cách nền tảng hoạt động
            </h2>
            <p className="text-[#2D9596] text-lg max-w-2xl mx-auto">
              Quy trình đơn giản, hiệu quả với sự hỗ trợ của công nghệ AI
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#2D9596] via-[#265073] to-[#2D9596] transform -translate-y-1/2 opacity-20"></div>

            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg z-10"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                      <div
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm text-white"
                        style={{ backgroundColor: step.color }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <h3 className="text-[#265073] text-lg mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#265073]/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-4 text-[#9AD0C2]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14m0 0l-6-6m6 6l-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


