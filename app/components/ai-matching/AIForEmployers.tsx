"use client";

import { motion } from "framer-motion";
import { Users, FileCheck, Filter } from "lucide-react";

export function AIForEmployers() {
  const features = [
    {
      icon: Users,
      title: "AI gợi ý ứng viên phù hợp",
      subtitle: "Candidate Recommendation AI",
      description: "Tự động tìm kiếm và xếp hạng ứng viên phù hợp nhất với yêu cầu công việc",
      features: [
        "Phân tích JD (mô tả công việc) tự động",
        "Trích xuất kỹ năng cốt lõi",
        "Matching với hàng ngàn CV trong database",
        "Sắp xếp theo mức độ phù hợp",
        "Highlight kỹ năng khớp/thiếu",
      ],
      gradient: "from-[#265073] to-[#2D9596]",
    },
    {
      icon: FileCheck,
      title: "AI phân tích JD",
      subtitle: "JD Scoring & Optimization",
      description: "Đánh giá và tối ưu hóa bản mô tả công việc để thu hút ứng viên chất lượng",
      features: [
        "Đánh giá JD viết chuẩn hay chưa",
        "Gợi ý cải thiện mô tả công việc",
        "Đề xuất mức lương phù hợp thị trường",
        "So sánh với JD tương tự",
        "Dự đoán tỷ lệ ứng tuyển",
      ],
      gradient: "from-[#2D9596] to-[#265073]",
    },
    {
      icon: Filter,
      title: "AI sàng lọc hồ sơ",
      subtitle: "AI Resume Screening",
      description: "Tự động phân loại và đánh giá hồ sơ ứng viên theo tiêu chí tuyển dụng",
      features: [
        "Đọc CV theo kỹ năng cốt lõi",
        "Phân loại: Highly Fit / Moderate / Low Fit",
        "Gợi ý shortlist tự động",
        "Tính điểm phù hợp cho từng ứng viên",
        "Tiết kiệm 60% thời gian lọc CV",
      ],
      gradient: "from-[#265073] to-[#2D9596]",
    },
  ];

  return (
    <section className="py-20 bg-[#ECF4D6] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#9AD0C2] rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#2D9596] rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 bg-white rounded-full mb-4 border border-[#9AD0C2]">
              <span className="text-[#2D9596]">Dành cho Nhà tuyển dụng</span>
            </div>
            <h2 className="text-[#265073] text-4xl md:text-5xl mb-4">
              AI dành cho Nhà tuyển dụng –{" "}
              <span className="text-[#2D9596]">Tối ưu tuyển dụng 10x</span>
            </h2>
            <p className="text-[#265073]/70 text-lg max-w-2xl mx-auto">
              Giảm thời gian và chi phí tuyển dụng, tìm được ứng viên phù hợp trong vài phút
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 border-2 border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)] hover:shadow-[0_12px_40px_rgba(45,149,150,0.3)] transition-all"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-[#265073] text-xl mb-2">{feature.title}</h3>
                <p className="text-[#2D9596] text-sm mb-4">{feature.subtitle}</p>

                {/* Description */}
                <p className="text-[#265073]/70 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#ECF4D6] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#2D9596]"></div>
                      </div>
                      <span className="text-[#265073] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="w-full mt-6 py-3 bg-gradient-to-r from-[#265073] to-[#2D9596] text-white rounded-xl hover:shadow-xl transition-all">
                  Tìm hiểu thêm
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


