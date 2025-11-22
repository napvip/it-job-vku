"use client";

import { motion } from "framer-motion";
import { FileText, Target, Calendar, MousePointerClick } from "lucide-react";

export function ForCandidate() {
  return (
    <section className="py-16 bg-[#9AD0C2]/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Mock CV Interface */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#2D9596] rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-[#265073] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[#9AD0C2] rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-[#ECF4D6] rounded"></div>
                  <div className="h-3 bg-[#ECF4D6] rounded w-5/6"></div>
                  <div className="h-3 bg-[#ECF4D6] rounded w-4/6"></div>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">React</div>
                  <div className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">Node.js</div>
                  <div className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">AI</div>
                </div>
              </div>

              {/* AI Badge */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -top-4 -right-4 bg-[#2D9596] text-white px-4 py-2 rounded-full shadow-lg"
              >
                ✨ AI Powered
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-[#265073] mb-6">Dành cho ứng viên IT</h2>
            <p className="text-[#2D9596] text-lg mb-8">
              Tìm kiếm và ứng tuyển việc làm IT dễ dàng hơn bao giờ hết với sự hỗ trợ của AI
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Tạo CV IT chuyên nghiệp</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    Mẫu CV chuẩn IT, dễ dàng tùy chỉnh và tải xuống
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Nhận gợi ý việc làm AI</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    AI phân tích kỹ năng và gợi ý việc làm phù hợp nhất
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Theo dõi lịch phỏng vấn</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    Quản lý lịch phỏng vấn và nhận thông báo tự động
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MousePointerClick className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Ứng tuyển 1 chạm</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    Ứng tuyển nhanh chóng chỉ với một cú click
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-8 px-8 py-3 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
              Đăng ký ngay - Miễn phí
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

