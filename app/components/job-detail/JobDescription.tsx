"use client";

import { CheckCircle, Gift, Shield, Info } from "lucide-react";
import { motion } from "framer-motion";

interface JobDescriptionProps {
  job: {
    description: string[];
    requirements: string[];
    skills: string[];
    benefits: string[];
    perks: string[];
    workType: string;
    workHours: string;
    deadline: string;
    positions: number;
  };
}

export function JobDescription({ job }: JobDescriptionProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(154,208,194,0.1)]">
      {/* Mô tả công việc */}
      <section className="mb-8">
        <h2 className="text-[#265073] text-2xl mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-[#2D9596]" />
          Mô tả công việc
        </h2>
        <ul className="space-y-2">
          {job.description.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-[#265073]/80"
            >
              <span className="w-1.5 h-1.5 bg-[#2D9596] rounded-full mt-2 flex-shrink-0"></span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Yêu cầu công việc */}
      <section className="mb-8">
        <h2 className="text-[#265073] text-2xl mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-[#2D9596]" />
          Yêu cầu công việc
        </h2>
        <ul className="space-y-2 mb-4">
          {job.requirements.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-[#265073]/80"
            >
              <span className="w-1.5 h-1.5 bg-[#2D9596] rounded-full mt-2 flex-shrink-0"></span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Skills Tags */}
        <div className="mt-4">
          <h3 className="text-[#265073] mb-3">Kỹ năng yêu cầu:</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-[#2D9596] text-white rounded-full text-sm cursor-default hover:bg-[#265073] transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Quyền lợi */}
      <section className="mb-8">
        <h2 className="text-[#265073] text-2xl mb-4 flex items-center gap-2">
          <Gift className="w-6 h-6 text-[#2D9596]" />
          Quyền lợi
        </h2>
        <ul className="space-y-2">
          {job.benefits.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-[#265073]/80"
            >
              <span className="w-1.5 h-1.5 bg-[#2D9596] rounded-full mt-2 flex-shrink-0"></span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Chế độ - Phúc lợi */}
      <section className="mb-8">
        <h2 className="text-[#265073] text-2xl mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#2D9596]" />
          Chế độ - Phúc lợi
        </h2>
        <ul className="space-y-2">
          {job.perks.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-[#265073]/80"
            >
              <span className="w-1.5 h-1.5 bg-[#2D9596] rounded-full mt-2 flex-shrink-0"></span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Thông tin khác */}
      <section className="mb-8">
        <h2 className="text-[#265073] text-2xl mb-4 flex items-center gap-2">
          <Info className="w-6 h-6 text-[#2D9596]" />
          Thông tin khác
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-[#265073] font-medium min-w-[140px]">Hình thức làm việc:</span>
            <span className="text-[#265073]/80">{job.workType}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#265073] font-medium min-w-[140px]">Giờ làm việc:</span>
            <span className="text-[#265073]/80">{job.workHours}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#265073] font-medium min-w-[140px]">Hạn nộp hồ sơ:</span>
            <span className="text-[#2D9596] font-medium">{job.deadline}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#265073] font-medium min-w-[140px]">Số lượng tuyển:</span>
            <span className="text-[#265073]/80">{job.positions} người</span>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-[#2D9596] text-white rounded-xl hover:bg-[#37a8a7] transition-colors text-lg shadow-lg"
      >
        Ứng tuyển ngay
      </motion.button>
    </div>
  );
}


