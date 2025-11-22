"use client";

import { MapPin, Users, Briefcase, Building2, Globe, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyDetailHeaderProps {
  company: {
    name: string;
    logo: string;
    industry: string;
    size: string;
    location: string;
    type: string;
    website: string;
    rating?: number;
    reviewCount?: number;
    jobCount: number;
  };
}

export function CompanyDetailHeader({ company }: CompanyDetailHeaderProps) {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto -mt-24 relative z-10"
      >
        <div className="bg-[#ECF4D6] rounded-[24px] border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.15)] p-8 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] bg-[#9AD0C2] rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                {company.logo}
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-[#265073] text-3xl lg:text-4xl mb-3">
                    {company.name}
                  </h1>
                  {company.rating && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(company.rating!)
                                ? "fill-[#2D9596] text-[#2D9596]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[#265073] text-sm">
                        {company.rating} ({company.reviewCount} đánh giá)
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#37a8a7] transition-colors shadow-lg"
                  >
                    Xem {company.jobCount} việc đang tuyển
                  </motion.button>
                  <button className="px-6 py-3 border-2 border-[#265073] text-[#265073] rounded-xl hover:bg-[#9AD0C2]/20 transition-all">
                    Theo dõi công ty
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#265073]">
                  <Briefcase className="w-4 h-4 text-[#2D9596]" />
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#265073]">
                  <Users className="w-4 h-4 text-[#2D9596]" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#265073]">
                  <MapPin className="w-4 h-4 text-[#2D9596]" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#265073]">
                  <Building2 className="w-4 h-4 text-[#2D9596]" />
                  <span>{company.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-[#2D9596]" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-[#2D9596] hover:underline">
                    {company.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


