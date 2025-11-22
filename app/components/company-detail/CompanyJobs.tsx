"use client";

import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyJobsProps {
  jobs: Array<{
    id: number;
    title: string;
    location: string;
    salary: string;
    type: string;
    skills: string[];
    postedTime: string;
  }>;
  onJobClick?: (jobId: number) => void;
}

export function CompanyJobs({ jobs, onJobClick }: CompanyJobsProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#265073] text-2xl flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#2D9596]" />
          Vị trí đang tuyển dụng
        </h2>
        <span className="text-[#2D9596]">{jobs.length} vị trí</span>
      </div>

      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ 
              y: -3,
              boxShadow: "0 8px 24px rgba(154,208,194,0.25)"
            }}
            onClick={() => onJobClick?.(job.id)}
            className="bg-[#ECF4D6] rounded-2xl p-6 border border-[#9AD0C2] hover:border-[#2D9596] transition-all cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-[#265073] text-lg mb-2 hover:text-[#2D9596] transition-colors">
                  {job.title}
                </h3>
                
                <div className="flex flex-wrap gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-[#265073]">
                    <MapPin className="w-4 h-4 text-[#2D9596]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#265073]">
                    <DollarSign className="w-4 h-4 text-[#2D9596]" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#265073]">
                    <Clock className="w-4 h-4 text-[#2D9596]" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#265073]/70">
                    <Clock className="w-4 h-4" />
                    <span>{job.postedTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#2D9596] text-white text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="px-6 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors whitespace-nowrap">
                Xem chi tiết
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


