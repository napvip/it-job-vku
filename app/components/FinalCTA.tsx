"use client";

import { motion } from "framer-motion";
import { FileText, Megaphone } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 bg-[#265073] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Tham gia ngay hôm nay để trải nghiệm sức mạnh của AI trong tuyển dụng IT
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#2D9596] text-white rounded-xl hover:bg-[#37a8a7] transition-all shadow-lg hover:shadow-2xl flex items-center gap-3 min-w-[200px] justify-center"
            >
              <FileText className="w-5 h-5" />
              Tạo CV ngay
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#9AD0C2] text-[#265073] rounded-xl hover:bg-[#b5dcd1] transition-all shadow-lg hover:shadow-2xl flex items-center gap-3 min-w-[200px] justify-center"
            >
              <Megaphone className="w-5 h-5" />
              Đăng tin tuyển dụng
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "10,000+", label: "Ứng viên IT" },
              { number: "500+", label: "Công ty" },
              { number: "5,000+", label: "Việc làm" },
              { number: "95%", label: "Độ chính xác AI" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl text-[#9AD0C2] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

