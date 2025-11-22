"use client";

import { Target, History, Code, Users as UsersIcon, Award, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CompanyAboutProps {
  about: {
    mission: string;
    history: string;
    technologies: string;
    culture: string;
    products: string;
    achievements: string;
    officeImage?: string;
  };
}

export function CompanyAbout({ about }: CompanyAboutProps) {
  const sections = [
    { icon: Target, title: "Sứ mệnh", content: about.mission },
    { icon: History, title: "Lịch sử phát triển", content: about.history },
    { icon: Code, title: "Công nghệ chủ đạo", content: about.technologies },
    { icon: UsersIcon, title: "Văn hóa làm việc", content: about.culture },
    { icon: Lightbulb, title: "Sản phẩm tiêu biểu", content: about.products },
    { icon: Award, title: "Thành tựu", content: about.achievements },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6">
      <h2 className="text-[#265073] text-2xl mb-6">Giới thiệu công ty</h2>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-[#265073] flex items-center gap-2 mb-3">
              <section.icon className="w-5 h-5 text-[#2D9596]" />
              {section.title}
            </h3>
            <p className="text-[#265073]/80 leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Office Image */}
      {about.officeImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <ImageWithFallback
            src={about.officeImage}
            alt="Office"
            className="w-full h-[300px] object-cover rounded-[20px] shadow-[0_4px_20px_rgba(154,208,194,0.15)]"
          />
        </motion.div>
      )}
    </div>
  );
}


