"use client";

import { MapPin, Users, Briefcase, Building2, DollarSign, Clock, Calendar, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CompanySidebarProps {
  company: {
    name: string;
    logo: string;
    location: string;
    size: string;
    industry: string;
  };
  jobInfo: {
    salary: string;
    level: string;
    workType: string;
    experience: string;
    deadline: string;
  };
  relatedJobs: Array<{
    id: number;
    title: string;
    salary: string;
    location: string;
  }>;
}

export function CompanySidebar({ company, jobInfo, relatedJobs }: CompanySidebarProps) {
  return (
    <div className="space-y-6">
      {/* Company Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#ECF4D6] rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)]"
      >
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-[#9AD0C2] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
            {company.logo}
          </div>
          <h3 className="text-[#265073] text-xl mb-2">{company.name}</h3>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="w-4 h-4 text-[#2D9596] mt-0.5 flex-shrink-0" />
            <span className="text-[#265073]/80">{company.location}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Users className="w-4 h-4 text-[#2D9596] mt-0.5 flex-shrink-0" />
            <span className="text-[#265073]/80">{company.size}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Briefcase className="w-4 h-4 text-[#2D9596] mt-0.5 flex-shrink-0" />
            <span className="text-[#265073]/80">{company.industry}</span>
          </div>
        </div>

        <button className="w-full py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all text-sm">
          Xem trang công ty
        </button>
      </motion.div>

      {/* Job Info Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)]"
      >
        <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#2D9596]" />
          Thông tin công việc
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[#265073]/70 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#2D9596]" />
              Mức lương
            </span>
            <span className="px-3 py-1 bg-[#2D9596] text-white rounded-lg text-sm">
              {jobInfo.salary}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#265073]/70 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2D9596]" />
              Cấp độ
            </span>
            <span className="text-[#265073] text-sm">{jobInfo.level}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#265073]/70 text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#2D9596]" />
              Hình thức
            </span>
            <span className="text-[#265073] text-sm">{jobInfo.workType}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#265073]/70 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2D9596]" />
              Kinh nghiệm
            </span>
            <span className="text-[#265073] text-sm">{jobInfo.experience}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#265073]/70 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2D9596]" />
              Hạn nộp
            </span>
            <span className="text-[#2D9596] text-sm font-medium">{jobInfo.deadline}</span>
          </div>
        </div>
      </motion.div>

      {/* Related Jobs Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)]"
      >
        <h3 className="text-[#265073] text-lg mb-4">Công việc liên quan</h3>

        <div className="space-y-3">
          {relatedJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ x: 4 }}
              className="p-3 rounded-lg hover:bg-[#ECF4D6] transition-all cursor-pointer group"
            >
              <h4 className="text-[#265073] text-sm mb-2 group-hover:text-[#2D9596] transition-colors">
                {job.title}
              </h4>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#265073]/70">{job.location}</span>
                <span className="text-[#2D9596]">{job.salary}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-[#2D9596] hover:text-[#265073] transition-colors text-sm flex items-center justify-center gap-2">
          Xem thêm
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}


