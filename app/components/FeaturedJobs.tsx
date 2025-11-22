"use client";

import { MapPin, DollarSign, Clock, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturedJobsProps {
  onJobClick?: (jobId: number) => void;
}

const jobs = [
  {
    id: 1,
    title: "Senior Full-stack Developer",
    company: "TechViet Solutions",
    location: "Hà Nội",
    salary: "30-50 triệu",
    type: "Full-time",
    skills: ["React", "Node.js", "MongoDB"],
    logo: "🚀"
  },
  {
    id: 2,
    title: "AI Engineer",
    company: "VinTech AI",
    location: "TP. Hồ Chí Minh",
    salary: "40-70 triệu",
    type: "Full-time",
    skills: ["Python", "TensorFlow", "ML"],
    logo: "🤖"
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Solutions",
    location: "Remote",
    salary: "25-45 triệu",
    type: "Remote",
    skills: ["AWS", "Docker", "Kubernetes"],
    logo: "☁️"
  },
  {
    id: 4,
    title: "Mobile Developer (React Native)",
    company: "AppTech Vietnam",
    location: "Đà Nẵng",
    salary: "20-35 triệu",
    type: "Full-time",
    skills: ["React Native", "iOS", "Android"],
    logo: "📱"
  },
  {
    id: 5,
    title: "Backend Developer Java",
    company: "Enterprise Solutions",
    location: "Hà Nội",
    salary: "25-40 triệu",
    type: "Full-time",
    skills: ["Java", "Spring Boot", "MySQL"],
    logo: "☕"
  },
  {
    id: 6,
    title: "Frontend Developer Vue.js",
    company: "Digital Agency",
    location: "TP. Hồ Chí Minh",
    salary: "18-30 triệu",
    type: "Full-time",
    skills: ["Vue.js", "TypeScript", "Tailwind"],
    logo: "💚"
  }
];

export function FeaturedJobs({ onJobClick }: FeaturedJobsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-[#265073] mb-4">Việc làm nổi bật</h2>
          <p className="text-[#2D9596] text-lg">Khám phá những cơ hội việc làm IT hấp dẫn nhất</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -4,
                boxShadow: "0 8px 30px rgba(154,208,194,0.3)"
              }}
              onClick={() => onJobClick?.(job.id)}
              className="bg-[#ECF4D6] rounded-2xl p-6 cursor-pointer transition-all border-2 border-transparent hover:border-[#2D9596]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="text-[#265073]">{job.title}</h3>
                    <p className="text-[#265073] opacity-70 text-sm">{job.company}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Bookmark className="w-5 h-5 text-[#2D9596]" />
                </button>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[#265073]">
                  <MapPin className="w-4 h-4 text-[#2D9596]" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2D9596]">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-[#265073]">
                  <Clock className="w-4 h-4 text-[#2D9596]" />
                  <span className="text-sm">{job.type}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#2D9596] text-white text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onJobClick?.(job.id);
                }}
                className="w-full py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors"
              >
                Xem chi tiết
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all">
            Xem tất cả việc làm
          </button>
        </div>
      </div>
    </section>
  );
}

