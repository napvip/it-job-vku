"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Tôi có thể thay đổi gói dịch vụ sau khi đăng ký không?",
      answer: "Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Phần chênh lệch sẽ được tính theo tỷ lệ thời gian sử dụng.",
    },
    {
      question: "Gói miễn phí có giới hạn thời gian không?",
      answer: "Không, gói miễn phí không có giới hạn thời gian. Bạn có thể sử dụng vô thời hạn với các tính năng cơ bản.",
    },
    {
      question: "AI Matching hoạt động như thế nào?",
      answer: "Hệ thống AI của chúng tôi phân tích JD, kỹ năng ứng viên, kinh nghiệm và sở thích để đưa ra gợi ý chính xác nhất. Độ chính xác lên đến 95%.",
    },
    {
      question: "Tôi có thể hủy đăng ký bất cứ lúc nào không?",
      answer: "Có, bạn có thể hủy đăng ký bất cứ lúc nào. Không có hợp đồng ràng buộc dài hạn.",
    },
    {
      question: "Có hỗ trợ tích hợp với ATS hiện tại không?",
      answer: "Gói Premium AI hỗ trợ API Integration để kết nối với hệ thống ATS hiện tại của bạn.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#265073] text-4xl mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-[#2D9596] text-lg">
              Các câu hỏi phổ biến về gói dịch vụ
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#ECF4D6] rounded-2xl overflow-hidden border border-[#9AD0C2]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#9AD0C2]/20 transition-colors"
                >
                  <span className="text-[#265073] pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2D9596] flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-[#265073]/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


