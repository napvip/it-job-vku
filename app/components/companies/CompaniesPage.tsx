"use client";

import { Building2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { CompanyFilterBar } from "./CompanyFilterBar";
import { CompanyCard } from "./CompanyCard";
import { CompanyFilterSidebar } from "./CompanyFilterSidebar";
import { CompanyAISuggestions } from "./CompanyAISuggestions";

const companies = [
  {
    id: 1,
    name: "FPT Software",
    logo: "💼",
    industry: "Software Development – Cloud – AI",
    location: "Hà Nội, TP. HCM, Đà Nẵng",
    size: "1000-5000 nhân viên",
    jobCount: 28,
    rating: 4.5,
  },
  {
    id: 2,
    name: "VinTech AI",
    logo: "🤖",
    industry: "AI – Machine Learning – Fintech",
    location: "Hà Nội",
    size: "201-500 nhân viên",
    jobCount: 12,
    rating: 4.8,
  },
  {
    id: 3,
    name: "TechViet Solutions",
    logo: "🚀",
    industry: "Web Development – Mobile – Product",
    location: "TP. Hồ Chí Minh",
    size: "51-200 nhân viên",
    jobCount: 15,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Cloud Solutions Vietnam",
    logo: "☁️",
    industry: "Cloud Services – DevOps – Infrastructure",
    location: "Remote",
    size: "51-200 nhân viên",
    jobCount: 8,
    rating: 4.4,
  },
  {
    id: 5,
    name: "GameHub Studio",
    logo: "🎮",
    industry: "Game Development – Unity – Unreal",
    location: "TP. Hồ Chí Minh",
    size: "11-50 nhân viên",
    jobCount: 6,
    rating: 4.7,
  },
  {
    id: 6,
    name: "Digital Agency Pro",
    logo: "💚",
    industry: "Digital Marketing – Web – E-commerce",
    location: "Hà Nội",
    size: "51-200 nhân viên",
    jobCount: 10,
    rating: 4.3,
  },
  {
    id: 7,
    name: "CyberSec Vietnam",
    logo: "🔒",
    industry: "Cybersecurity – Blockchain – Security",
    location: "Hà Nội",
    size: "11-50 nhân viên",
    jobCount: 5,
    rating: 4.6,
  },
  {
    id: 8,
    name: "Mobile Innovations",
    logo: "📱",
    industry: "Mobile Development – iOS – Android",
    location: "Đà Nẵng",
    size: "51-200 nhân viên",
    jobCount: 9,
    rating: 4.5,
  },
  {
    id: 9,
    name: "Data Analytics Corp",
    logo: "📊",
    industry: "Data Science – Analytics – Big Data",
    location: "TP. Hồ Chí Minh",
    size: "201-500 nhân viên",
    jobCount: 14,
    rating: 4.7,
  },
  {
    id: 10,
    name: "Enterprise Solutions",
    logo: "🏢",
    industry: "Enterprise Software – ERP – CRM",
    location: "Hà Nội",
    size: "500+ nhân viên",
    jobCount: 22,
    rating: 4.4,
  },
];

interface CompaniesPageProps {
  onCompanyClick?: (companyId: number) => void;
}

export function CompaniesPage({ onCompanyClick }: CompaniesPageProps) {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-[#ECF4D6] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <Building2 className="w-5 h-5 text-[#2D9596]" />
              <span className="text-[#265073] text-sm">Company Directory</span>
            </div>
            <h1 className="text-[#265073] text-4xl md:text-5xl mb-4">
              Khám phá các công ty IT hàng đầu
            </h1>
            <p className="text-[#2D9596] text-lg">
              Hơn 1.000+ doanh nghiệp công nghệ tại Việt Nam đang sử dụng nền tảng để tuyển dụng
              <br />
              và xây dựng thương hiệu tuyển dụng.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-12 mt-8">
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1">1,234</div>
                <div className="text-sm text-[#265073]">Công ty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1">10,234</div>
                <div className="text-sm text-[#265073]">Việc làm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1">4.6</div>
                <div className="text-sm text-[#265073]">Đánh giá TB</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <CompanyFilterBar />

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Company List */}
            <div className="lg:col-span-8">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#265073]">
                  <TrendingUp className="w-5 h-5 text-[#2D9596]" />
                  <span>Hiển thị {companies.length} công ty</span>
                </div>
                <select className="px-4 py-2 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none transition-colors bg-white text-[#265073] text-sm">
                  <option>Mới nhất</option>
                  <option>Đánh giá cao nhất</option>
                  <option>Nhiều việc làm nhất</option>
                  <option>Phù hợp nhất</option>
                </select>
              </div>

              {/* Company Cards */}
              <div className="space-y-4">
                {companies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CompanyCard company={company} onCompanyClick={onCompanyClick} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center gap-2">
                <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 hover:border-[#9AD0C2] transition-all">
                  Trước
                </button>
                <button className="px-4 py-2 bg-[#2D9596] text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 hover:border-[#9AD0C2] transition-all">
                  2
                </button>
                <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 hover:border-[#9AD0C2] transition-all">
                  3
                </button>
                <button className="px-4 py-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/20 hover:border-[#9AD0C2] transition-all">
                  Sau
                </button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4">
              <CompanyFilterSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <CompanyAISuggestions />
    </div>
  );
}

