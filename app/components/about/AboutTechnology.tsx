"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Database, GitBranch, Zap, Lock } from "lucide-react";

export function AboutTechnology() {
  const technologies = [
    {
      icon: Brain,
      name: "Machine Learning",
      description: "Học máy và phân tích dữ liệu",
    },
    {
      icon: Zap,
      name: "AI Recommendation",
      description: "Hệ thống gợi ý thông minh",
    },
    {
      icon: Cpu,
      name: "Natural Language Processing",
      description: "Xử lý ngôn ngữ tự nhiên",
    },
    {
      icon: Database,
      name: "Big Data Analytics",
      description: "Phân tích dữ liệu lớn",
    },
    {
      icon: GitBranch,
      name: "Deep Learning",
      description: "Học sâu và nhận dạng mẫu",
    },
    {
      icon: Lock,
      name: "Data Security",
      description: "Bảo mật dữ liệu tiên tiến",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ECF4D6]/30 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[#265073] text-4xl mb-4">
              Công nghệ sử dụng
            </h2>
            <p className="text-[#2D9596] text-lg max-w-2xl mx-auto">
              Nền tảng được xây dựng trên những công nghệ AI và Machine Learning tiên tiến nhất
            </p>
          </motion.div>

          {/* Technology Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:border-[#2D9596] shadow-[0_4px_20px_rgba(154,208,194,0.15)] hover:shadow-[0_8px_32px_rgba(45,149,150,0.2)] transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl flex items-center justify-center mb-4">
                  <tech.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#265073] mb-2">
                  {tech.name}
                </h3>
                <p className="text-[#265073]/70 text-sm">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "TensorFlow",
              "PyTorch",
              "Scikit-learn",
              "React",
              "Node.js",
              "PostgreSQL",
              "Redis",
              "Docker",
              "AWS",
              "Kubernetes",
            ].map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-2 bg-[#2D9596] text-white rounded-full text-sm hover:bg-[#265073] transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


