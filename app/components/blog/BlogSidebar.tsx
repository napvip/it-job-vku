"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp } from "lucide-react";

export function BlogSidebar() {
  const categories = [
    { name: "Career", count: 24 },
    { name: "CV Tips", count: 18 },
    { name: "Tech Trends", count: 32 },
    { name: "AI & Recruitment", count: 15 },
    { name: "Interview", count: 20 },
    { name: "Work Culture", count: 12 },
  ];

  const popularPosts = [
    {
      title: "Lộ trình học Frontend Developer từ zero",
      date: "10/11/2025",
    },
    {
      title: "Soft skills cần thiết cho IT",
      date: "08/11/2025",
    },
    {
      title: "Xu hướng lương IT 2025",
      date: "05/11/2025",
    },
    {
      title: "Tips phỏng vấn online",
      date: "02/11/2025",
    },
  ];

  return (
    <div className="space-y-6 sticky top-24">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.15)]"
      >
        <h3 className="text-[#265073] mb-4">Tìm kiếm bài viết</h3>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
          <input
            type="text"
            placeholder="Nhập từ khóa..."
            className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.15)]"
      >
        <h3 className="text-[#265073] mb-4">Chủ đề</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#ECF4D6] hover:bg-[#9AD0C2] rounded-xl transition-all text-left group"
            >
              <span className="text-[#265073] group-hover:text-[#265073]">
                {category.name}
              </span>
              <span className="text-[#2D9596] text-sm">
                ({category.count})
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Popular Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.15)]"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#2D9596]" />
          <h3 className="text-[#265073]">Bài viết nổi bật</h3>
        </div>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <button
              key={index}
              className="w-full text-left group"
            >
              <h4 className="text-[#265073] text-sm mb-1 group-hover:text-[#2D9596] transition-colors">
                {post.title}
              </h4>
              <p className="text-[#265073]/60 text-xs">{post.date}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-2xl p-6 text-white"
      >
        <h3 className="text-xl mb-2">Đăng ký nhận tin</h3>
        <p className="text-white/90 text-sm mb-4">
          Nhận bài viết mới nhất về IT và Career mỗi tuần
        </p>
        <input
          type="email"
          placeholder="Email của bạn"
          className="w-full px-4 py-2 rounded-lg mb-3 text-[#265073] focus:outline-none"
        />
        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors border border-white/30">
          Đăng ký
        </button>
      </motion.div>
    </div>
  );
}


