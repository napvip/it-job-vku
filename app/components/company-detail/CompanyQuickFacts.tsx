"use client";

import { Calendar, Code, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyQuickFactsProps {
  facts: {
    founded: string;
    technologies: string[];
    totalEmployees: string;
    branches: string[];
  };
}

export function CompanyQuickFacts({ facts }: CompanyQuickFactsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6"
    >
      <h3 className="text-[#265073] text-lg mb-4">Thông tin nhanh</h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#2D9596]" />
            <span className="text-sm text-[#265073]/70">Năm thành lập</span>
          </div>
          <p className="text-[#265073] pl-6">{facts.founded}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-[#2D9596]" />
            <span className="text-sm text-[#265073]/70">Công nghệ sử dụng</span>
          </div>
          <div className="flex flex-wrap gap-2 pl-6">
            {facts.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[#2D9596] text-white text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#2D9596]" />
            <span className="text-sm text-[#265073]/70">Tổng nhân viên</span>
          </div>
          <p className="text-[#265073] pl-6">{facts.totalEmployees}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#2D9596]" />
            <span className="text-sm text-[#265073]/70">Các chi nhánh</span>
          </div>
          <ul className="space-y-1 pl-6">
            {facts.branches.map((branch) => (
              <li key={branch} className="text-[#265073] text-sm">
                • {branch}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}


