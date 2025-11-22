"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

export function FAQSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)] mb-12"
    >
      <h2 className="text-[#265073] text-2xl mb-4 text-center">
        Tìm kiếm câu hỏi
      </h2>
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#2D9596]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nhập câu hỏi hoặc từ khóa cần tìm..."
          className="w-full pl-16 pr-6 py-4 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all text-[#265073] placeholder:text-[#265073]/50"
        />
      </div>
    </motion.div>
  );
}


