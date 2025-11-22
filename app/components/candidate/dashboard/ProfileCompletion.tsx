"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, Award } from "lucide-react";

const completionItems = [
  { id: 1, text: "Thông tin cơ bản", completed: true },
  { id: 2, text: "Kỹ năng chuyên môn", completed: true },
  { id: 3, text: "Kinh nghiệm làm việc", completed: true },
  { id: 4, text: "Thêm kỹ năng React.js", completed: false, aiSuggestion: true },
  { id: 5, text: "Bổ sung dự án gần nhất", completed: false, aiSuggestion: true },
  { id: 6, text: "Tải thêm Portfolio", completed: false, aiSuggestion: true },
];

const completionPercentage = 70;

interface ProfileCompletionProps {
  onNavigateToProfile?: () => void;
}

export function ProfileCompletion({ onNavigateToProfile }: ProfileCompletionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border-2 border-[#9AD0C2] rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-[#2D9596]" />
          </div>
          <div>
            <h2 className="text-2xl text-[#265073] mb-1">Hoàn thiện hồ sơ</h2>
            <p className="text-[#2D9596]">Hồ sơ của bạn hoàn thành {completionPercentage}%</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl text-[#265073] mb-1">{completionPercentage}%</div>
          <div className="text-sm text-[#2D9596]">Đã hoàn thành</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-[#9AD0C2]/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-[#2D9596] rounded-full"
          />
        </div>
      </div>

      {/* Completion Items */}
      <div className="space-y-4 mb-6">
        {completionItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 ${
              item.completed
                ? "bg-[#9AD0C2]/10"
                : "bg-[#ECF4D6] hover:bg-[#9AD0C2]/20 cursor-pointer"
            }`}
          >
            {item.completed ? (
              <CheckCircle2 className="w-6 h-6 text-[#2D9596] flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-6 h-6 text-[#265073]/30 flex-shrink-0 mt-0.5" />
            )}
            
            <div className="flex-1">
              <p
                className={`${
                  item.completed
                    ? "text-[#265073]/60 line-through"
                    : "text-[#265073]"
                }`}
              >
                {item.text}
              </p>
              
              {item.aiSuggestion && !item.completed && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 bg-[#2D9596] rounded-full animate-pulse" />
                  <span className="text-xs text-[#2D9596]">Gợi ý bởi AI để tăng độ phù hợp</span>
                </div>
              )}
            </div>

            {!item.completed && (
              <ArrowRight className="w-5 h-5 text-[#2D9596] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNavigateToProfile}
        className="w-full bg-[#265073] text-white py-4 rounded-xl hover:bg-[#2D9596] transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <span>Cập nhật hồ sơ</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
}


