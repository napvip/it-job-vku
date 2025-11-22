"use client";

import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CompanyReviews() {
  const reviews = [
    {
      id: 1,
      author: "Nguyễn V.A",
      position: "Senior Developer",
      rating: 5,
      date: "2 tuần trước",
      title: "Môi trường làm việc tuyệt vời",
      content: "Công ty có văn hóa làm việc cởi mở, đồng nghiệp thân thiện. Công nghệ luôn được cập nhật mới nhất. Lương thưởng rõ ràng và công bằng.",
      likes: 24,
      helpful: true
    },
    {
      id: 2,
      author: "Trần M.B",
      position: "Frontend Developer",
      rating: 4,
      date: "1 tháng trước",
      title: "Tốt cho người mới bắt đầu",
      content: "Được training kỹ càng, có mentor hỗ trợ nhiệt tình. Dự án đa dạng giúp học hỏi nhiều kinh nghiệm. Cân bằng work-life khá tốt.",
      likes: 18,
      helpful: false
    },
    {
      id: 3,
      author: "Lê T.C",
      position: "DevOps Engineer",
      rating: 5,
      date: "1 tháng trước",
      title: "Phúc lợi tốt, cơ hội thăng tiến",
      content: "Công ty đầu tư tốt cho nhân viên, có nhiều chương trình đào tạo chuyên sâu. Lộ trình thăng tiến rõ ràng. Văn phòng hiện đại.",
      likes: 31,
      helpful: false
    }
  ];

  const overallRating = 4.6;
  const totalReviews = 127;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(154,208,194,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[#265073] text-2xl mb-2">
                  Đánh giá từ nhân viên
                </h2>
                <p className="text-[#265073]/70">
                  Xem đánh giá thực tế từ những người đã làm việc tại công ty
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl text-[#2D9596]">{overallRating}</span>
                  <div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(overallRating)
                              ? "fill-[#2D9596] text-[#2D9596]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#265073]/70 mt-1">
                      {totalReviews} đánh giá
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-[#9AD0C2]/30 pb-6 last:border-0"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#9AD0C2] rounded-full flex items-center justify-center text-[#265073]">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-[#265073]">{review.author}</h4>
                          <p className="text-sm text-[#265073]/70">{review.position}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-[#265073]/50">{review.date}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-[#2D9596] text-[#2D9596]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Content */}
                  <h4 className="text-[#265073] mb-2">{review.title}</h4>
                  <p className="text-[#265073]/80 mb-4">{review.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 text-sm">
                    <button
                      className={`flex items-center gap-2 ${
                        review.helpful
                          ? "text-[#2D9596]"
                          : "text-[#265073]/70 hover:text-[#2D9596]"
                      } transition-colors`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Hữu ích ({review.likes})
                    </button>
                    <button className="flex items-center gap-2 text-[#265073]/70 hover:text-[#2D9596] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Trả lời
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More */}
            <div className="text-center mt-8">
              <button className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all">
                Xem tất cả đánh giá
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


