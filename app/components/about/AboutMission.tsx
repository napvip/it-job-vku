"use client";

import { motion } from "framer-motion";
import { Target, Zap, Users, TrendingUp } from "lucide-react";

export function AboutMission() {
  const missions = [
    {
      icon: Target,
      title: "Kết nối đúng người – đúng việc",
      description: "Sử dụng AI để phân tích kỹ năng, kinh nghiệm và mong muốn của ứng viên, đồng thời hiểu rõ yêu cầu công việc để tạo ra những kết nối hoàn hảo.",
    },
    {
      icon: Zap,
      title: "Tối ưu tuyển dụng bằng AI",
      description: "Giảm thời gian tuyển dụng từ hàng tuần xuống còn vài ngày với hệ thống gợi ý thông minh, tự động phân loại và đánh giá hồ sơ.",
    },
    {
      icon: Users,
      title: "Xây dựng hệ sinh thái IT Talent",
      description: "Tạo ra một cộng đồng chuyên nghiệp nơi ứng viên IT và doanh nghiệp có thể kết nối, phát triển và cùng nhau thành công.",
    },
    {
      icon: TrendingUp,
      title: "Nâng cao trải nghiệm tuyển dụng",
      description: "Mang đến trải nghiệm hiện đại, minh bạch và hiệu quả cho cả ứng viên và nhà tuyển dụng với công nghệ và giao diện thân thiện.",
    },
  ];

  return (
    <section className="py-20 relative">
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
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-[#2D9596] text-lg max-w-2xl mx-auto">
              Chúng tôi tin rằng công nghệ AI có thể cách mạng hóa cách thức tuyển dụng,
              mang lại giá trị thực sự cho cả ứng viên và doanh nghiệp
            </p>
          </motion.div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.15)] hover:shadow-[0_8px_32px_rgba(45,149,150,0.2)] transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl flex items-center justify-center mb-6">
                  <mission.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-[#265073] text-xl mb-3">
                  {mission.title}
                </h3>
                <p className="text-[#265073]/70 leading-relaxed">
                  {mission.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


