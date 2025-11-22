"use client";

import { Building2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

interface CompanySimilarProps {
  companies: Array<{
    id: number;
    name: string;
    logo: string;
    industry: string;
    location: string;
    jobCount: number;
  }>;
  onCompanyClick?: (companyId: number) => void;
}

export function CompanySimilar({ companies, onCompanyClick }: CompanySimilarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)]"
    >
      <h3 className="text-[#265073] text-lg mb-4">Công ty tương tự</h3>

      <div className="space-y-3">
        {companies.map((company) => (
          <motion.div
            key={company.id}
            whileHover={{ x: 4 }}
            onClick={() => onCompanyClick?.(company.id)}
            className="p-3 rounded-xl hover:bg-[#ECF4D6] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#9AD0C2] rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                {company.logo}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[#265073] text-sm group-hover:text-[#2D9596] transition-colors truncate">
                  {company.name}
                </h4>
                <p className="text-xs text-[#265073]/70 truncate">
                  {company.industry}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pl-13">
              <span className="text-[#265073]/70">{company.location}</span>
              <span className="text-[#2D9596] flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {company.jobCount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


