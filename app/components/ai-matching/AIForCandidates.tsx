"use client";

import { motion } from "framer-motion";
import { Target, FileText, TrendingUp } from "lucide-react";

export function AIForCandidates() {
  const features = [
    {
      icon: Target,
      title: "Gợi ý việc làm cá nhân hoá",
      subtitle: "Personalized Job Recommendations",
      description: "AI phân tích CV và kỹ năng của bạn để tìm ra những công việc phù hợp nhất",
      features: [
        "Phân tích CV & kỹ năng chuyên sâu",
        "Matching với JD theo thuật toán AI",
        "Xếp hạng mức độ phù hợp (Match Score)",
        "Cập nhật gợi ý real-time",
      ],
      gradient: "from-[#2D9596] to-[#265073]",
    },
    {
      icon: FileText,
      title: "AI phân tích CV",
      subtitle: "AI Resume Analyzer",
      description: "Đánh giá toàn diện CV của bạn và đưa ra gợi ý cải thiện cụ thể",
      features: [
        "Phát hiện thiếu kỹ năng quan trọng",
        "Gợi ý thêm keywords phù hợp",
        "Đề xuất chỉnh sửa bố cục CV",
        "Hiển thị Điểm CV (0-100)",
      ],
      gradient: "from-[#265073] to-[#2D9596]",
    },
    {
      icon: TrendingUp,
      title: "AI định hướng nghề nghiệp",
      subtitle: "Career Path AI",
      description: "Lập kế hoạch phát triển sự nghiệp dựa trên kỹ năng và xu hướng thị trường",
      features: [
        "Đề xuất chuyên ngành phù hợp (FE/BE/Mobile/AI)",
        "Phân tích dựa trên kỹ năng hiện tại",
        "Gợi ý lộ trình học tập chi tiết",
        "Dự đoán mức lương tiềm năng",
      ],
      gradient: "from-[#2D9596] to-[#265073]",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #2D9596 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
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
            <div className="inline-block px-6 py-2 bg-[#ECF4D6] rounded-full mb-4">
              <span className="text-[#2D9596]">Dành cho Ứng viên IT</span>
            </div>
            <h2 className="text-[#265073] text-4xl md:text-5xl mb-4">
              AI dành cho Ứng viên – Tìm việc{" "}
              <span className="text-[#2D9596]">siêu nhanh, siêu chính xác</span>
            </h2>
            <p className="text-[#265073]/70 text-lg max-w-2xl mx-auto">
              Trải nghiệm công nghệ AI giúp bạn tìm được công việc mơ ước nhanh hơn 10 lần
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
                <button className="w-full mt-6 py-3 bg-[#ECF4D6] hover:bg-[#9AD0C2] text-[#265073] rounded-xl transition-all">
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


