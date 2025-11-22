"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp } from "lucide-react";
import { JobFilterBar } from "./JobFilterBar";
import { JobCard } from "./JobCard";
import { JobSidebar } from "./JobSidebar";
import { AIJobSuggestions } from "./AIJobSuggestions";

const jobs = [
  {
    id: 1,
    title: "Senior Full-stack Developer",
    company: "FPT Software",
    location: "Hà Nội",
    salary: "30-50 triệu",
    type: "Full-time",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    logo: "💼",
    postedTime: "2 giờ trước"
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    company: "VinTech AI",
    location: "TP. Hồ Chí Minh",
    salary: "40-70 triệu",
    type: "Full-time",
    skills: ["Python", "TensorFlow", "PyTorch", "ML", "Deep Learning"],
    logo: "🤖",
    postedTime: "5 giờ trước"
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Viettel Digital",
    location: "Remote",
    salary: "25-45 triệu",
    type: "Remote",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Jenkins"],
    logo: "☁️",
    postedTime: "1 ngày trước"
  },
  {
    id: 4,
    title: "Mobile Developer (React Native)",
    company: "Grab Vietnam",
    location: "TP. Hồ Chí Minh",
    salary: "28-45 triệu",
    type: "Full-time",
    skills: ["React Native", "iOS", "Android", "JavaScript"],
    logo: "📱",
    postedTime: "1 ngày trước"
  },
  {
    id: 5,
    title: "Backend Java Developer",
    company: "TechCombank",
    location: "Hà Nội",
    salary: "25-40 triệu",
    type: "Full-time",
    skills: ["Java", "Spring Boot", "MySQL", "Redis", "Microservices"],
    logo: "☕",
    postedTime: "2 ngày trước"
  },
  {
    id: 6,
    title: "Frontend Vue.js Developer",
    company: "Shopee Vietnam",
    location: "Hà Nội",
    salary: "20-35 triệu",
    type: "Full-time",
    skills: ["Vue.js", "TypeScript", "Tailwind CSS", "Webpack"],
    logo: "🛍️",
    postedTime: "2 ngày trước"
  },
  {
    id: 7,
    title: "QA Automation Engineer",
    company: "VNG Corporation",
    location: "TP. Hồ Chí Minh",
    salary: "18-30 triệu",
    type: "Full-time",
    skills: ["Selenium", "Python", "Jest", "Cypress", "API Testing"],
    logo: "🎮",
    postedTime: "3 ngày trước"
  },
  {
    id: 8,
    title: "Data Engineer",
    company: "Momo",
    location: "TP. Hồ Chí Minh",
    salary: "30-55 triệu",
    type: "Full-time",
    skills: ["Python", "Spark", "Hadoop", "SQL", "ETL"],
    logo: "💳",
    postedTime: "3 ngày trước"
  },
  {
    id: 9,
    title: "UI/UX Designer",
    company: "Tiki",
    location: "Hà Nội",
    salary: "15-25 triệu",
    type: "Full-time",
    skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
    logo: "🎨",
    postedTime: "4 ngày trước"
  }
];

interface JobsPageProps {
  onJobClick?: (jobId: number) => void;
}

export function JobsPage({ onJobClick }: JobsPageProps) {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-[#ECF4D6] py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <Briefcase className="w-5 h-5 text-[#2D9596]" />
              <span className="text-[#265073] text-sm">Việc làm IT</span>
            </div>
            <h1 className="text-[#265073] text-4xl md:text-5xl mb-4">
              Tìm kiếm việc làm IT phù hợp với bạn
            </h1>
            <p className="text-[#2D9596] text-lg">
              Hơn 10.000+ việc làm IT từ Fresher đến Senior, cập nhật mỗi ngày.
              <br />
              Hỗ trợ gợi ý thông minh bằng AI.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1">10,234</div>
                <div className="text-sm text-[#265073]">Việc làm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1">523</div>
                <div className="text-sm text-[#265073]">Công ty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1 flex items-center gap-1">
                  <TrendingUp className="w-7 h-7" />
                  145
                </div>
                <div className="text-sm text-[#265073]">Việc mới hôm nay</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 mb-8">
        <JobFilterBar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Job List - Left Column */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[#265073] text-2xl mb-1">
                  {jobs.length} việc làm phù hợp
                </h2>
                <p className="text-[#2D9596] text-sm">
                  Sắp xếp theo: Mới nhất
                </p>
              </div>
              <select className="px-4 py-2 border border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] bg-white text-sm">
                <option>Mới nhất</option>
                <option>Lương cao nhất</option>
                <option>Phù hợp nhất</option>
              </select>
            </div>

            <div className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <JobCard job={job} onJobClick={onJobClick} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2] hover:border-[#9AD0C2] transition-all">
                Trước
              </button>
              <button className="px-4 py-2 bg-[#2D9596] text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2] hover:border-[#9AD0C2] transition-all">
                2
              </button>
              <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2] hover:border-[#9AD0C2] transition-all">
                3
              </button>
              <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2] hover:border-[#9AD0C2] transition-all">
                ...
              </button>
              <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2] hover:border-[#9AD0C2] transition-all">
                10
              </button>
              <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2] hover:border-[#9AD0C2] transition-all">
                Sau
              </button>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-4">
            <JobSidebar />
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <AIJobSuggestions />
    </div>
  );
}

