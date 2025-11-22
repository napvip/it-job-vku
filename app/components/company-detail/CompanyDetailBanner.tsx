"use client";

import { motion } from "framer-motion";

interface CompanyDetailBannerProps {
  companyName: string;
  bannerImage?: string;
}

export function CompanyDetailBanner({ companyName, bannerImage }: CompanyDetailBannerProps) {
  return (
    <section className="relative h-[250px] bg-[#265073] overflow-hidden">
      {/* Background Image (if provided) */}
      {bannerImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#265073] bg-opacity-35"></div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#9AD0C2] rounded-full"
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${5 + i * 4.5}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}


