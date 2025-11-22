"use client";

import { JobDetailHeader } from "./JobDetailHeader";
import { JobDescription } from "./JobDescription";
import { CompanySidebar } from "./CompanySidebar";
import { AIRecommendations } from "./AIRecommendations";
import { CompanyReviews } from "./CompanyReviews";

interface JobDetailPageProps {
  jobId: number | null;
}

// Mock data - in real app, this would come from API based on jobId
const jobData = {
  header: {
    title: "Senior Full-stack Developer (NodeJS + React)",
    company: "FPT Software",
    location: "Hà Nội, Việt Nam",
    postedTime: "Đăng cách đây 2 ngày",
    salary: "30-50 triệu",
  },
  description: {
    description: [
      "Tham gia phát triển và duy trì hệ thống backend sử dụng NodeJS, Express.js",
      "Xây dựng giao diện người dùng với React, Redux và TypeScript",
      "Thiết kế và tối ưu database MySQL, MongoDB",
      "Viết unit test và integration test để đảm bảo chất lượng code",
      "Tham gia code review và hỗ trợ các thành viên junior trong team",
      "Làm việc với Product Owner để hiểu rõ yêu cầu và đưa ra giải pháp kỹ thuật",
    ],
    requirements: [
      "Tối thiểu 3 năm kinh nghiệm với NodeJS và React",
      "Thành thạo JavaScript/TypeScript, ES6+",
      "Có kinh nghiệm với REST API, GraphQL",
      "Am hiểu về database (MySQL, MongoDB, Redis)",
      "Kinh nghiệm với Git, CI/CD",
      "Có khả năng làm việc độc lập và teamwork tốt",
      "Tiếng Anh giao tiếp tốt (đọc tài liệu kỹ thuật)",
    ],
    skills: [
      "NodeJS",
      "React",
      "TypeScript",
      "MongoDB",
      "MySQL",
      "Redis",
      "Docker",
      "AWS",
      "Git",
      "REST API",
    ],
    benefits: [
      "Lương cạnh tranh từ 30-50 triệu (tùy năng lực)",
      "Thưởng dự án, thưởng hiệu suất hàng quý",
      "Review lương 2 lần/năm",
      "Thưởng tháng 13, các ngày lễ tết",
      "Hỗ trợ khóa học online (Udemy, Coursera, etc.)",
    ],
    perks: [
      "Bảo hiểm sức khỏe cao cấp cho bản thân và gia đình",
      "Macbook Pro hoặc PC theo nhu cầu công việc",
      "12 ngày phép năm + 3 ngày sick leave",
      "Flexible working time (8:30-9:30 check-in)",
      "Work from home 2 ngày/tuần",
      "Team building, company trip hàng năm",
      "Văn phòng hiện đại, free coffee & snacks",
    ],
    workType: "Hybrid (WFH 2 ngày/tuần)",
    workHours: "8:30-17:30 (Thứ 2 - Thứ 6)",
    deadline: "31/12/2025",
    positions: 3,
  },
  company: {
    name: "FPT Software",
    logo: "💼",
    location: "Tầng 10, Tòa FPT Tower, Hà Nội",
    size: "1000-5000 nhân viên",
    industry: "Phát triển phần mềm, IT Services",
  },
  jobInfo: {
    salary: "30-50 triệu",
    level: "Senior",
    workType: "Hybrid",
    experience: "3+ năm",
    deadline: "31/12/2025",
  },
  relatedJobs: [
    {
      id: 1,
      title: "Backend NodeJS Developer",
      salary: "25-40 triệu",
      location: "Hà Nội",
    },
    {
      id: 2,
      title: "React Frontend Developer",
      salary: "20-35 triệu",
      location: "Hà Nội",
    },
    {
      id: 3,
      title: "Full-stack Developer (Junior)",
      salary: "15-25 triệu",
      location: "Hà Nội",
    },
    {
      id: 4,
      title: "Technical Lead",
      salary: "40-70 triệu",
      location: "Hà Nội",
    },
  ],
};

export function JobDetailPage({ jobId }: JobDetailPageProps) {
  // In a real app, you would fetch job data based on jobId
  // For now, we'll use the mock data
  
  return (
    <div className="min-h-screen bg-gray-50">
      <JobDetailHeader job={jobData.header} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Job Description */}
            <div className="lg:col-span-8">
              <JobDescription job={jobData.description} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <CompanySidebar
                  company={jobData.company}
                  jobInfo={jobData.jobInfo}
                  relatedJobs={jobData.relatedJobs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Company Reviews */}
      <CompanyReviews />
    </div>
  );
}

