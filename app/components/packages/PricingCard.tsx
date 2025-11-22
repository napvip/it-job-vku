"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import { Package } from './packagesData';

interface PricingCardProps {
  package: Package;
  onSelectPackage: (packageId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ package: pkg, onSelectPackage }) => {
  const formatPrice = (price: number | null) => {
    if (price === null) return 'Liên hệ';
    if (price === 0) return '0đ';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getButtonClasses = () => {
    switch (pkg.ctaType) {
      case 'current':
        return 'bg-gray-200 text-gray-600 cursor-not-allowed';
      case 'primary':
        return 'bg-[#265073] text-white hover:bg-[#1a3a52] transition-colors';
      case 'secondary':
        return 'bg-[#2D9596] text-white hover:bg-[#265073] transition-colors';
      case 'outline':
        return 'bg-white border-2 border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596]/10 transition-colors';
      default:
        return 'bg-[#2D9596] text-white hover:bg-[#265073] transition-colors';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={pkg.isFeatured ? { y: -8 } : { y: -4 }}
      className={`relative bg-white rounded-2xl p-6 transition-all ${
        pkg.isFeatured
          ? 'border-4 border-[#2D9596] shadow-xl shadow-[#2D9596]/20'
          : 'border-2 border-[#9AD0C2] shadow-sm hover:shadow-md'
      }`}
    >
      {/* Badge */}
      {pkg.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1.5 bg-gradient-to-r from-[#2D9596] to-[#265073] text-white rounded-full text-sm flex items-center gap-1 shadow-lg">
            <Sparkles className="w-4 h-4" />
            {pkg.badge}
          </div>
        </div>
      )}

      {/* Package Name */}
      <div className="text-center mb-6">
        <h3 className="text-[#265073] mb-3">{pkg.name}</h3>
        <div className="flex items-end justify-center gap-1">
          {pkg.price !== null ? (
            <>
              <span className="text-3xl text-[#2D9596]">{formatPrice(pkg.price)}</span>
              <span className="text-[#265073]/60 mb-1">/ {pkg.period}</span>
            </>
          ) : (
            <span className="text-2xl text-[#265073]">{pkg.period}</span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            {feature.included ? (
              <Check className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <span
              className={`text-sm ${
                feature.included ? 'text-[#265073]' : 'text-[#265073]/50 line-through'
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => pkg.ctaType !== 'current' && onSelectPackage(pkg.id)}
        disabled={pkg.ctaType === 'current'}
        className={`w-full py-3 rounded-lg transition-all ${getButtonClasses()}`}
      >
        {pkg.ctaText}
      </button>
    </motion.div>
  );
};

export default PricingCard;


