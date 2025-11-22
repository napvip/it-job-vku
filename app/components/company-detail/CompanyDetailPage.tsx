"use client";

import { CompanyDetailBanner } from "./CompanyDetailBanner";
import { CompanyDetailHeader } from "./CompanyDetailHeader";
import { CompanyAbout } from "./CompanyAbout";
import { CompanyCulture } from "./CompanyCulture";
import { CompanyBenefits } from "./CompanyBenefits";
import { CompanyJobs } from "./CompanyJobs";
import { CompanyContactSidebar } from "./CompanyContactSidebar";
import { CompanyQuickFacts } from "./CompanyQuickFacts";
import { CompanySimilar } from "./CompanySimilar";
import { CompanyReviewsSection } from "./CompanyReviewsSection";
import { CompanyAISuggestions } from "../companies/CompanyAISuggestions";

interface CompanyDetailPageProps {
  companyId: number | null;
  onJobClick?: (jobId: number) => void;
  onCompanyClick?: (companyId: number) => void;
}

// Mock data - in real app, this would come from API based on companyId
const companyData = {
  header: {
    name: "FPT Software",
    logo: "💼",
    industry: "Software Development – Cloud – AI",
    size: "1000-5000 nhân viên",
    location: "Hà Nội, TP. HCM, Đà Nẵng",
    type: "Product Company",
    website: "https://fptsoftware.com",
    rating: 4.6,
    reviewCount: 127,
    jobCount: 28,
  },
  about: {
    mission: "FPT Software cam kết mang đến những giải pháp công nghệ tiên tiến nhất, giúp khách hàng chuyển đổi số thành công và tạo ra giá trị bền vững trong kỷ nguyên số.",
    history: "Thành lập từ năm 1999, FPT Software đã trải qua hơn 20 năm phát triển và hiện là công ty phần mềm hàng đầu Việt Nam với hơn 30,000 nhân viên trên toàn cầu. Chúng tôi phục vụ hơn 1,000 khách hàng ở 30+ quốc gia.",
    technologies: "Chúng tôi chuyên sâu về AI/ML, Cloud Computing (AWS, Azure, GCP), Blockchain, IoT, Big Data Analytics, và các công nghệ tiên tiến khác. Đội ngũ kỹ sư của chúng tôi luôn cập nhật và làm chủ những công nghệ mới nhất.",
    culture: "Văn hóa làm việc tại FPT Software khuyến khích sáng tạo, đổi mới và học hỏi liên tục. Chúng tôi tin rằng nhân viên hạnh phúc sẽ tạo ra sản phẩm chất lượng cao. Môi trường làm việc thân thiện, cởi mở với nhiều hoạt động team building.",
    products: "Các sản phẩm tiêu biểu: Akabot (RPA Platform), FPT.AI (AI Platform), Camera.AI (Smart Surveillance), Smart City Solutions, Digital Banking Platform, Healthcare Management System.",
    achievements: "Top 10 Software Outsourcing Company toàn cầu, Gartner Magic Quadrant, AWS Premier Partner, Microsoft Gold Partner, 50+ giải thưởng công nghệ quốc tế.",
    officeImage: "https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc2MzI3MDM1MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  cultureImages: [
    "https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc2MzI3MDM1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1628017975048-74768e00219e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMG9mZmljZXxlbnwxfHx8fDE3NjMyMDM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1716703432455-3045789de738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwdGVhbSUyMG1lZXRpbmd8ZW58MXx8fHwxNjMyNzAzNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ],
  benefits: [
    "Bảo hiểm sức khỏe cao cấp cho bản thân và gia đình (100% lương)",
    "Macbook Pro hoặc PC theo lựa chọn và nhu cầu công việc",
    "Cơ hội onsite tại Nhật, Mỹ, Châu Âu, Singapore",
    "Remote linh hoạt 2-3 ngày/tuần, flexible working hours",
    "Team building hàng quý, company trip hàng năm",
    "Thưởng dự án, thưởng hiệu suất, thưởng tháng 13",
    "Văn phòng hiện đại, free coffee, snacks, gym",
    "Hỗ trợ đào tạo, học chứng chỉ quốc tế (AWS, Azure, PMP...)",
  ],
  jobs: [
    {
      id: 1,
      title: "Senior Full-stack Developer (NodeJS + React)",
      location: "Hà Nội",
      salary: "30-50 triệu",
      type: "Full-time",
      skills: ["NodeJS", "React", "TypeScript", "MongoDB"],
      postedTime: "2 ngày trước",
    },
    {
      id: 2,
      title: "AI Engineer (Python + TensorFlow)",
      location: "TP. Hồ Chí Minh",
      salary: "35-60 triệu",
      type: "Full-time",
      skills: ["Python", "TensorFlow", "ML", "AI"],
      postedTime: "3 ngày trước",
    },
    {
      id: 3,
      title: "DevOps Engineer (AWS + Docker)",
      location: "Remote",
      salary: "30-55 triệu",
      type: "Remote",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      postedTime: "5 ngày trước",
    },
    {
      id: 4,
      title: "Mobile Developer (React Native)",
      location: "Đà Nẵng",
      salary: "25-45 triệu",
      type: "Full-time",
      skills: ["React Native", "iOS", "Android"],
      postedTime: "1 tuần trước",
    },
    {
      id: 5,
      title: "Backend Java Developer",
      location: "Hà Nội",
      salary: "28-48 triệu",
      type: "Full-time",
      skills: ["Java", "Spring Boot", "MySQL", "Redis"],
      postedTime: "1 tuần trước",
    },
  ],
  contact: {
    email: "hr@fpt-software.com",
    phone: "024 7300 8866",
    address: "Tầng 22, Keangnam Landmark 72, Phạm Hùng, Nam Từ Liêm, Hà Nội",
    website: "https://fptsoftware.com",
  },
  quickFacts: {
    founded: "1999",
    technologies: ["Java", "NodeJS", "React", "Python", "AWS", "Azure", "Docker", "Kubernetes"],
    totalEmployees: "30,000+",
    branches: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Quy Nhơn", "Cần Thơ"],
  },
  similarCompanies: [
    {
      id: 2,
      name: "VinTech AI",
      logo: "🤖",
      industry: "AI – Machine Learning",
      location: "Hà Nội",
      jobCount: 12,
    },
    {
      id: 3,
      name: "TechViet Solutions",
      logo: "🚀",
      industry: "Web Development",
      location: "TP. HCM",
      jobCount: 15,
    },
    {
      id: 4,
      name: "Cloud Solutions",
      logo: "☁️",
      industry: "Cloud Services",
      location: "Remote",
      jobCount: 8,
    },
  ],
};

export function CompanyDetailPage({ companyId, onJobClick, onCompanyClick }: CompanyDetailPageProps) {
  // In a real app, you would fetch company data based on companyId
  
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyDetailBanner companyName={companyData.header.name} />
      <CompanyDetailHeader company={companyData.header} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              <CompanyAbout about={companyData.about} />
              <CompanyCulture images={companyData.cultureImages} />
              <CompanyBenefits benefits={companyData.benefits} />
              <CompanyJobs jobs={companyData.jobs} onJobClick={onJobClick} />
              <CompanyReviewsSection />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <CompanyContactSidebar contact={companyData.contact} />
                <CompanyQuickFacts facts={companyData.quickFacts} />
                <CompanySimilar companies={companyData.similarCompanies} onCompanyClick={onCompanyClick} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <CompanyAISuggestions />
    </div>
  );
}

