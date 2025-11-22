"use client";

import { useState } from "react";
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Plus, 
  X, 
  Send,
  Filter,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CompanyReviewsSection() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");
  
  // Review Form State
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewPros, setReviewPros] = useState("");
  const [reviewCons, setReviewCons] = useState("");
  const [reviewAdvice, setReviewAdvice] = useState("");
  const [reviewStatus, setReviewStatus] = useState<"current" | "former" | "interviewed">("current");

  const reviews = [
    {
      id: 1,
      author: "Nguyễn V.A",
      position: "Senior Developer",
      status: "Nhân viên hiện tại",
      rating: 5,
      date: "2 tuần trước",
      title: "Môi trường làm việc tuyệt vời",
      pros: "Công ty có văn hóa làm việc cởi mở, đồng nghiệp thân thiện. Công nghệ luôn được cập nhật mới nhất. Đãi ngộ tốt, có nhiều cơ hội thăng tiến.",
      cons: "Văn phòng hơi xa trung tâm, đôi khi phải OT khi dự án gấp",
      advice: "Nên chuẩn bị kỹ về technical stack trước khi phỏng vấn",
      likes: 24,
      helpful: true,
      verified: true
    },
    {
      id: 2,
      author: "Trần M.B",
      position: "Frontend Developer",
      status: "Nhân viên cũ",
      rating: 4,
      date: "1 tháng trước",
      title: "Tốt cho người mới bắt đầu",
      pros: "Được training kỹ càng, có mentor hỗ trợ nhiệt tình. Dự án đa dạng giúp học hỏi nhiều. Môi trường làm việc chuyên nghiệp.",
      cons: "Lương khởi điểm chưa cao, áp lực công việc khá lớn đối với fresher",
      advice: "Hãy chủ động học hỏi và đừng ngại hỏi senior khi gặp khó khăn",
      likes: 18,
      helpful: false,
      verified: true
    },
    {
      id: 3,
      author: "Lê T.C",
      position: "DevOps Engineer",
      status: "Nhân viên hiện tại",
      rating: 5,
      date: "1 tháng trước",
      title: "Phúc lợi tốt, cơ hội thăng tiến",
      pros: "Công ty đầu tư tốt cho nhân viên, có nhiều chương trình đào tạo. Lộ trình thăng tiến rõ ràng. Được làm việc với các dự án lớn, công nghệ hiện đại.",
      cons: "Đôi khi phải OT trong deadline gấp, meeting khá nhiều",
      advice: "Công ty rất phù hợp cho người muốn phát triển chuyên môn lâu dài",
      likes: 31,
      helpful: false,
      verified: true
    },
    {
      id: 4,
      author: "Phạm H.D",
      position: "Backend Developer",
      status: "Ứng viên đã phỏng vấn",
      rating: 4,
      date: "2 tháng trước",
      title: "Quy trình phỏng vấn chuyên nghiệp",
      pros: "HR nhiệt tình, quy trình phỏng vấn rõ ràng. Câu hỏi technical hợp lý, không quá khó. Feedback nhanh sau phỏng vấn.",
      cons: "Thời gian chờ offer hơi lâu",
      advice: "Chuẩn bị kỹ về algorithm và system design",
      likes: 12,
      helpful: false,
      verified: false
    }
  ];

  const overallRating = 4.6;
  const totalReviews = 127;

  // Rating distribution
  const ratingDistribution = [
    { stars: 5, count: 78, percentage: 61 },
    { stars: 4, count: 32, percentage: 25 },
    { stars: 3, count: 12, percentage: 9 },
    { stars: 2, count: 4, percentage: 3 },
    { stars: 1, count: 1, percentage: 2 },
  ];

  const handleSubmitReview = () => {
    // In real app, send to API
    console.log({
      rating: reviewRating,
      title: reviewTitle,
      pros: reviewPros,
      cons: reviewCons,
      advice: reviewAdvice,
      status: reviewStatus,
    });
    
    // Reset form
    setReviewRating(0);
    setReviewTitle("");
    setReviewPros("");
    setReviewCons("");
    setReviewAdvice("");
    setReviewStatus("current");
    setIsReviewModalOpen(false);
  };

  const filteredReviews = reviews
    .filter((review) => !filterRating || review.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === "helpful") return b.likes - a.likes;
      return 0; // recent is default order
    });

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex-1">
          <h2 className="text-[#265073] text-2xl mb-2">
            Đánh giá từ ứng viên & nhân viên
          </h2>
          <p className="text-[#265073]/70">
            Phản hồi thực tế từ những người đã phỏng vấn hoặc làm việc tại công ty
          </p>
        </div>
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="px-5 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Viết đánh giá
        </button>
      </div>

      {/* Rating Overview */}
      <div className="grid lg:grid-cols-12 gap-6 mb-8 p-6 bg-[#ECF4D6] rounded-xl">
        {/* Overall Rating */}
        <div className="lg:col-span-4 text-center lg:border-r-2 lg:border-[#9AD0C2]">
          <div className="text-5xl text-[#2D9596] mb-2">{overallRating}</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.round(overallRating)
                    ? "fill-[#2D9596] text-[#2D9596]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-[#265073]/70">
            {totalReviews} đánh giá
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-8">
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <button
                key={item.stars}
                onClick={() => setFilterRating(filterRating === item.stars ? null : item.stars)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  filterRating === item.stars ? "bg-[#2D9596]/10" : "hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-1 w-16">
                  <span className="text-[#265073]">{item.stars}</span>
                  <Star className="w-4 h-4 fill-[#2D9596] text-[#2D9596]" />
                </div>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D9596] transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-[#265073]/70 text-sm w-12">{item.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-[#265073]">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Sắp xếp:</span>
        </div>
        <button
          onClick={() => setSortBy("recent")}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            sortBy === "recent"
              ? "bg-[#2D9596] text-white"
              : "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
          }`}
        >
          Mới nhất
        </button>
        <button
          onClick={() => setSortBy("helpful")}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            sortBy === "helpful"
              ? "bg-[#2D9596] text-white"
              : "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
          }`}
        >
          Hữu ích nhất
        </button>
        {filterRating && (
          <button
            onClick={() => setFilterRating(null)}
            className="px-4 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg text-sm hover:bg-[#9AD0C2] transition-all flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            {filterRating} sao
          </button>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-[#9AD0C2]/30 pb-6 last:border-0"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[#265073]">{review.author}</h4>
                    {review.verified && (
                      <CheckCircle className="w-4 h-4 text-[#2D9596]" />
                    )}
                  </div>
                  <p className="text-sm text-[#265073]/70">{review.position}</p>
                  <p className="text-xs text-[#2D9596] mt-1">{review.status}</p>
                </div>
              </div>
              <span className="text-sm text-[#265073]/50">{review.date}</span>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-3">
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
            <h4 className="text-[#265073] mb-3">{review.title}</h4>
            
            <div className="space-y-3 mb-4">
              <div className="bg-[#ECF4D6] p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-[#2D9596] flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-[#2D9596] text-sm block mb-1">Ưu điểm</span>
                    <p className="text-[#265073]/80 text-sm">{review.pros}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#FFF4E6] p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-[#FF6B35] text-sm block mb-1">Khuyết điểm</span>
                    <p className="text-[#265073]/80 text-sm">{review.cons}</p>
                  </div>
                </div>
              </div>

              {review.advice && (
                <div className="bg-[#F0F9FF] p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#265073] flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-[#265073] text-sm block mb-1">Lời khuyên</span>
                      <p className="text-[#265073]/80 text-sm">{review.advice}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 text-sm">
              <button
                className={`flex items-center gap-2 ${
                  review.helpful
                    ? "text-[#2D9596]"
                    : "text-[#265073]/70 hover:text-[#2D9596]"
                } transition-colors`}
              >
                <ThumbsUp className={`w-4 h-4 ${review.helpful ? "fill-current" : ""}`} />
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
        <button className="px-6 py-2.5 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all">
          Xem tất cả {totalReviews} đánh giá
        </button>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsReviewModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#265073] text-2xl">Viết đánh giá</h3>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#ECF4D6] text-[#265073] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selection */}
              <div className="mb-6">
                <label className="block text-[#265073] mb-3">
                  Trạng thái của bạn <span className="text-[#FF6B35]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "current", label: "Nhân viên hiện tại" },
                    { value: "former", label: "Nhân viên cũ" },
                    { value: "interviewed", label: "Đã phỏng vấn" },
                  ].map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setReviewStatus(status.value as any)}
                      className={`px-4 py-3 rounded-lg text-sm transition-all ${
                        reviewStatus === status.value
                          ? "bg-[#2D9596] text-white"
                          : "bg-[#ECF4D6] text-[#265073] hover:bg-[#9AD0C2]"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-[#265073] mb-3">
                  Đánh giá tổng thể <span className="text-[#FF6B35]">*</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoverRating || reviewRating)
                            ? "fill-[#2D9596] text-[#2D9596]"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  {reviewRating > 0 && (
                    <span className="ml-3 text-[#265073] self-center">
                      {["Rất tệ", "Tệ", "Trung bình", "Tốt", "Xuất sắc"][reviewRating - 1]}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="mb-6">
                <label className="block text-[#265073] mb-2">
                  Tiêu đề đánh giá <span className="text-[#FF6B35]">*</span>
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="VD: Môi trường làm việc tuyệt vời"
                  className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
                />
              </div>

              {/* Pros */}
              <div className="mb-6">
                <label className="block text-[#265073] mb-2">
                  Ưu điểm <span className="text-[#FF6B35]">*</span>
                </label>
                <textarea
                  value={reviewPros}
                  onChange={(e) => setReviewPros(e.target.value)}
                  placeholder="Những điểm tốt của công ty..."
                  rows={3}
                  className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073] resize-none"
                />
              </div>

              {/* Cons */}
              <div className="mb-6">
                <label className="block text-[#265073] mb-2">
                  Khuyết điểm <span className="text-[#FF6B35]">*</span>
                </label>
                <textarea
                  value={reviewCons}
                  onChange={(e) => setReviewCons(e.target.value)}
                  placeholder="Những điểm cần cải thiện..."
                  rows={3}
                  className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073] resize-none"
                />
              </div>

              {/* Advice */}
              <div className="mb-6">
                <label className="block text-[#265073] mb-2">
                  Lời khuyên cho ứng viên (tùy chọn)
                </label>
                <textarea
                  value={reviewAdvice}
                  onChange={(e) => setReviewAdvice(e.target.value)}
                  placeholder="Những điều ứng viên nên biết trước khi ứng tuyển..."
                  rows={2}
                  className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073] resize-none"
                />
              </div>

              {/* Note */}
              <div className="bg-[#ECF4D6] p-4 rounded-lg mb-6">
                <p className="text-[#265073]/80 text-sm">
                  <strong>Lưu ý:</strong> Đánh giá của bạn sẽ được kiểm duyệt trước khi hiển thị. 
                  Vui lòng giữ thái độ khách quan và chuyên nghiệp.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-all"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!reviewRating || !reviewTitle || !reviewPros || !reviewCons}
                  className={`flex-1 px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                    reviewRating && reviewTitle && reviewPros && reviewCons
                      ? "bg-[#2D9596] text-white hover:bg-[#265073]"
                      : "bg-[#9AD0C2]/50 text-white cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Gửi đánh giá
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


