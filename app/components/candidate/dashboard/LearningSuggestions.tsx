"use client";

import { motion } from "framer-motion";
import { GraduationCap, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../../ui/badge";

const suggestions = [
  {
    id: 1,
    title: "Khóa học Node.js nâng cao",
    platform: "Udemy",
    impact: "+20% match score",
    duration: "12 giờ",
    level: "Intermediate",
    icon: "📚",
  },
  {
    id: 2,
    title: "System Design Interview",
    platform: "Coursera",
    impact: "+15% match score",
    duration: "8 giờ",
    level: "Advanced",
    icon: "🎯",
  },
  {
    id: 3,
    title: "TypeScript Best Practices",
    platform: "Frontend Masters",
    impact: "+10% match score",
    duration: "6 giờ",
    level: "Intermediate",
    icon: "⚡",
  },
];

export function LearningSuggestions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-gradient-to-br from-[#265073] to-[#2D9596] border-2 border-[#2D9596] rounded-2xl p-6 text-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl">Gợi ý học tập</h3>
          <p className="text-sm text-[#9AD0C2]">Nâng cao kỹ năng với AI</p>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-3 mb-4">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="text-2xl flex-shrink-0">{suggestion.icon}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white mb-1 group-hover:text-[#9AD0C2] transition-colors">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-[#9AD0C2] mb-2">{suggestion.platform}</p>

                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="border-[#9AD0C2] text-[#9AD0C2] bg-white/5"
                  >
                    {suggestion.level}
                  </Badge>
                  <span className="text-xs text-white/60">{suggestion.duration}</span>
                </div>

                {/* Impact */}
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-[#9AD0C2]" />
                  <span className="text-[#9AD0C2]">{suggestion.impact}</span>
                  <Sparkles className="w-3 h-3 text-[#9AD0C2]" />
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 bg-white text-[#265073] rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <span>Khám phá thêm khóa học</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}


