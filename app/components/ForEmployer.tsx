"use client";

import { motion } from "framer-motion";
import { Megaphone, UserCheck, FolderKanban, TrendingUp } from "lucide-react";

export function ForEmployer() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-[#265073] mb-6">Dành cho nhà tuyển dụng</h2>
            <p className="text-[#2D9596] text-lg mb-8">
              Tìm kiếm nhân tài IT nhanh chóng và hiệu quả với công nghệ AI tiên tiến
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Đăng tin tuyển dụng nhanh</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    Giao diện đơn giản, đăng tin chỉ trong vài phút
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Gợi ý ứng viên thông minh</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    AI tự động tìm và gợi ý ứng viên phù hợp với yêu cầu
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FolderKanban className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Quản lý hồ sơ - phỏng vấn</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    ATS chuyên nghiệp, theo dõi toàn bộ quy trình tuyển dụng
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ECF4D6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h4 className="text-[#265073] mb-2">Nâng cao hiệu suất tuyển dụng</h4>
                  <p className="text-[#265073] opacity-70 text-sm">
                    Phân tích dữ liệu và tối ưu chiến lược tuyển dụng
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-8 px-8 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all">
              Đăng tin tuyển dụng
            </button>
          </motion.div>

          {/* Right: Dashboard Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[#ECF4D6] rounded-2xl shadow-xl p-8">
              {/* Mock ATS Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[#265073]">Dashboard Tuyển dụng</h4>
                  <div className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">
                    15 vị trí
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl text-[#2D9596] mb-1">124</div>
                    <div className="text-xs text-[#265073]">Hồ sơ</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl text-[#2D9596] mb-1">48</div>
                    <div className="text-xs text-[#265073]">Phỏng vấn</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl text-[#2D9596] mb-1">12</div>
                    <div className="text-xs text-[#265073]">Offer</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#9AD0C2] rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-[#ECF4D6] rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-[#ECF4D6] rounded w-1/2"></div>
                      </div>
                      <div className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded">
                        95%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Badge */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute -top-4 -left-4 bg-[#265073] text-white px-4 py-2 rounded-full shadow-lg"
              >
                🎯 AI Match
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

