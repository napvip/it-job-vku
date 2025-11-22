"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function BlogList() {
  const posts = [
    {
      id: 1,
      title: "10 Kỹ năng IT hot nhất năm 2025",
      excerpt: "Khám phá những kỹ năng công nghệ đang được săn đón nhiều nhất trên thị trường tuyển dụng IT hiện nay...",
      image: "https://images.unsplash.com/photo-1515204230490-1ad00b70ed3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjMyNzE4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: "Nguyễn Minh",
      date: "15/11/2025",
      tags: ["Tech Trends", "Career"],
      featured: true,
    },
    {
      id: 2,
      title: "Cách viết CV IT thu hút nhà tuyển dụng",
      excerpt: "Những mẹo nhỏ giúp CV của bạn nổi bật trong hàng trăm hồ sơ ứng tuyển...",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
      author: "Trần Hương",
      date: "12/11/2025",
      tags: ["CV Tips", "Career"],
    },
    {
      id: 3,
      title: "AI đang thay đổi ngành tuyển dụng như thế nào?",
      excerpt: "Phân tích sâu về vai trò của trí tuệ nhân tạo trong quy trình tuyển dụng hiện đại...",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      author: "Lê Anh",
      date: "10/11/2025",
      tags: ["AI & Recruitment", "Tech Trends"],
    },
    {
      id: 4,
      title: "Phỏng vấn kỹ thuật: 15 câu hỏi phổ biến nhất",
      excerpt: "Tổng hợp các câu hỏi phỏng vấn kỹ thuật thường gặp và cách trả lời hiệu quả...",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
      author: "Phạm Đức",
      date: "08/11/2025",
      tags: ["Interview", "Career"],
    },
    {
      id: 5,
      title: "Remote work: Xu hướng làm việc của tương lai",
      excerpt: "Làm việc từ xa đang trở thành chuẩn mực mới trong ngành công nghệ...",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      author: "Hoàng Mai",
      date: "05/11/2025",
      tags: ["Work Culture", "Tech Trends"],
    },
    {
      id: 6,
      title: "Làm thế nào để đàm phán lương hiệu quả?",
      excerpt: "Chiến lược đàm phán lương thông minh cho developer và IT professional...",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      author: "Vũ Linh",
      date: "02/11/2025",
      tags: ["Career", "Salary"],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Featured Post */}
      {posts.filter(p => p.featured).map((post) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl overflow-hidden border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)] hover:shadow-[0_12px_40px_rgba(45,149,150,0.25)] transition-all group"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-4 py-2 bg-[#2D9596] text-white rounded-full text-sm">
                Featured
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#ECF4D6] text-[#2D9596] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-[#265073] text-2xl mb-3 group-hover:text-[#2D9596] transition-colors">
                {post.title}
              </h2>
              <p className="text-[#265073]/70 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#265073]/60 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors group/btn">
                Đọc tiếp
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.article>
      ))}

      {/* Regular Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {posts.filter(p => !p.featured).map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.15)] hover:shadow-[0_8px_32px_rgba(45,149,150,0.2)] transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#ECF4D6] text-[#2D9596] rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-[#265073] text-lg mb-2 group-hover:text-[#2D9596] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#265073]/70 text-sm mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#265073]/60 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors text-sm group/btn">
                Đọc tiếp
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <button className="px-8 py-3 bg-[#265073] text-white rounded-full hover:bg-[#2D9596] transition-all shadow-lg hover:shadow-xl">
          Xem thêm bài viết
        </button>
      </div>
    </div>
  );
}


