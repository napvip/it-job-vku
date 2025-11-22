"use client";

import { motion } from "framer-motion";
import { Database, Brain, GitMerge, TrendingUp } from "lucide-react";

export function AIHowItWorks() {
  const steps = [
    {
      icon: Database,
      number: "01",
      title: "Thu thập dữ liệu",
      description: "AI thu thập và xử lý dữ liệu từ CV, JD, kinh nghiệm làm việc, kỹ năng và xu hướng thị trường IT",
      color: "#2D9596",
    },
    {
      icon: Brain,
      number: "02",
      title: "Trích xuất & phân tích kỹ năng",
      description: "AI Skill Extraction hiểu sâu nội dung CV và JD, tự động rút ra các kỹ năng cốt lõi và yêu cầu công việc",
      color: "#265073",
    },
    {
      icon: GitMerge,
      number: "03",
      title: "Mô hình Matching",
      description: "So sánh 1-to-1 theo kỹ năng, cấp độ, kinh nghiệm, công nghệ, ngôn ngữ lập trình và văn hóa công ty",
      color: "#2D9596",
    },
    {
      icon: TrendingUp,
      number: "04",
      title: "Đề xuất & cải thiện liên tục",
      description: "AI học từ hành vi người dùng và phản hồi để tối ưu thuật toán. Càng dùng, kết quả càng chính xác",
      color: "#265073",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#ECF4D6]/30 to-white"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 bg-[#ECF4D6] rounded-full mb-4 border border-[#9AD0C2]">
              <span className="text-[#2D9596]">How It Works</span>
            </div>
            <h2 className="text-[#265073] text-4xl md:text-5xl mb-4">
              Cách AI hoạt động
            </h2>
            <p className="text-[#265073]/70 text-lg max-w-2xl mx-auto">
              Quy trình 4 bước được hỗ trợ bởi Machine Learning và Natural Language Processing
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#2D9596] via-[#265073] to-[#2D9596] opacity-20"></div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:border-[#2D9596] shadow-[0_4px_20px_rgba(154,208,194,0.15)] hover:shadow-[0_8px_32px_rgba(45,149,150,0.25)] transition-all">
                    {/* Number Badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white shadow-lg">
                      <span className="text-sm">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-[#265073] text-lg mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#265073]/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 -right-4 text-[#9AD0C2] z-10">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path
                          d="M8 16h16m0 0l-6-6m6 6l-6 6"
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

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center p-6 bg-gradient-to-r from-[#265073]/5 via-[#2D9596]/5 to-[#265073]/5 rounded-2xl border border-[#9AD0C2]"
          >
            <p className="text-[#265073]">
              <strong>Công nghệ sử dụng:</strong> TensorFlow, BERT, NLP, Machine Learning, Deep Learning, Recommendation Systems
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


