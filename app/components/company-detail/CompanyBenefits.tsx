"use client";

import { Shield, Laptop, Plane, Home, Users, TrendingUp, Coffee, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyBenefitsProps {
  benefits: string[];
}

export function CompanyBenefits({ benefits }: CompanyBenefitsProps) {
  const benefitIcons = [Shield, Laptop, Plane, Home, Users, TrendingUp, Coffee, Heart];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6">
      <h2 className="text-[#265073] text-2xl mb-6">Chính sách & Phúc lợi</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefitIcons[index % benefitIcons.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl hover:bg-[#ECF4D6] transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-[#2D9596]/10 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#2D9596]" />
              </div>
              <div className="flex-1">
                <p className="text-[#265073]">{benefit}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


