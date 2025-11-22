"use client";

import { MapPin, Users, Briefcase, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyCardProps {
  company: {
    id: number;
    name: string;
    logo: string;
    industry: string;
    location: string;
    size: string;
    jobCount: number;
    rating?: number;
    description?: string;
  };
  onCompanyClick?: (companyId: number) => void;
}

export function CompanyCard({ company, onCompanyClick }: CompanyCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -4,
        boxShadow: "0 8px 30px rgba(154,208,194,0.3)"
      }}
      onClick={() => onCompanyClick?.(company.id)}
      className="bg-[#ECF4D6] rounded-[20px] p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.15)] hover:border-[#2D9596] transition-all cursor-pointer"
    >
      <div className="flex gap-5">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0"
        >
          <div className="w-[70px] h-[70px] bg-[#9AD0C2] rounded-2xl flex items-center justify-center text-3xl">
            {company.logo}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Company Name & Rating */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-[#265073] text-xl hover:text-[#2D9596] transition-colors">
              {company.name}
            </h3>
            {company.rating && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-4 h-4 fill-[#2D9596] text-[#2D9596]" />
                <span className="text-[#265073] text-sm">{company.rating}</span>
              </div>
            )}
          </div>

          {/* Industry */}
          <p className="text-[#265073]/80 text-sm mb-3">
            {company.industry}
          </p>

          {/* Info Row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-[#265073]">
              <MapPin className="w-4 h-4 text-[#2D9596]" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-xs">
                {company.size}
              </span>
            </div>
          </div>

          {/* Job Count Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-xl">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">Đang tuyển {company.jobCount} vị trí</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


