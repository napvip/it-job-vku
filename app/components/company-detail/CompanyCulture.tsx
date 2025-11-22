"use client";

import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CompanyCultureProps {
  images: string[];
}

export function CompanyCulture({ images }: CompanyCultureProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6">
      <h2 className="text-[#265073] text-2xl mb-6 flex items-center gap-2">
        <ImageIcon className="w-6 h-6 text-[#2D9596]" />
        Văn hóa & Hình ảnh
      </h2>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-[20px] shadow-[0_4px_20px_rgba(154,208,194,0.15)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative h-[400px]"
            >
              <ImageWithFallback
                src={images[currentIndex]}
                alt={`Company culture ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#265073] hover:text-[#2D9596]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#265073] hover:text-[#2D9596]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[#2D9596]"
                  : "w-2 bg-[#9AD0C2]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-sm text-[#265073]/70">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}


