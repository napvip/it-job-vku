"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AIStats() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stats = [
    {
      number: "10,000+",
      label: "CV được AI phân tích",
      description: "Hàng ngàn ứng viên tin tưởng sử dụng AI để cải thiện hồ sơ",
      color: "#2D9596",
    },
    {
      number: "3,000+",
      label: "Công ty IT sử dụng",
      description: "Từ startup đến enterprise đều tin dùng hệ thống của chúng tôi",
      color: "#265073",
    },
    {
      number: "95%",
      label: "Độ chính xác matching",
      description: "Thuật toán AI được training trên hàng triệu data points",
      color: "#2D9596",
    },
    {
      number: "48%",
      label: "Tăng tốc độ tuyển dụng",
      description: "Giảm thời gian từ đăng tin đến hire được ứng viên phù hợp",
      color: "#265073",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stats.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#265073] via-[#2D9596] to-[#265073] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-white"
          >
            <h2 className="text-4xl mb-4">Câu chuyện số</h2>
            <p className="text-xl text-white/90">
              Những con số ấn tượng từ hệ thống AI Matching của chúng tôi
            </p>
          </motion.div>

          {/* Stats Carousel */}
          <div className="relative">
            {/* Main Stat Display */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 text-center"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-8xl md:text-9xl mb-4"
                style={{ color: stats[currentIndex].color }}
              >
                {stats[currentIndex].number}
              </motion.div>
              <h3 className="text-white text-3xl mb-4">
                {stats[currentIndex].label}
              </h3>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {stats[currentIndex].description}
              </p>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {stats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-2xl backdrop-blur-sm transition-all ${
                  index === currentIndex
                    ? "bg-white/20 border-2 border-white"
                    : "bg-white/10 border-2 border-white/20 hover:bg-white/15"
                }`}
              >
                <div className="text-3xl text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


