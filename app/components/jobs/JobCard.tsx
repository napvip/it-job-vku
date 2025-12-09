"use client";

import { MapPin, DollarSign, Clock, Bookmark, Building2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: {
    id: string | number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    skills: string[];
    logo: string;
    postedTime: string;
    isSaved?: boolean;
  };
  onSave?: (e: React.MouseEvent) => void;
}

export function JobCard({ job, onSave }: JobCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/job/${job.id}`);
  };

  return (
    <motion.div
      whileHover={{ 
        y: -3,
        boxShadow: "0 8px 24px rgba(154,208,194,0.25)"
      }}
      onClick={handleClick}
      className="bg-[#ECF4D6] rounded-2xl p-6 border border-[#9AD0C2] hover:border-[#2D9596] transition-all cursor-pointer"
    >
      <div className="flex gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl flex items-center justify-center text-2xl text-white font-bold">
            {job.logo}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-[#265073] text-lg mb-1 hover:text-[#2D9596] transition-colors font-semibold">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-[#2D9596]">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{job.company}</span>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSave?.(e);
              }}
              className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                job.isSaved 
                  ? "bg-red-50 text-red-500" 
                  : "hover:bg-white/50 text-[#2D9596]"
              }`}
            >
              <Heart className={`w-5 h-5 ${job.isSaved ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-3 text-sm">
            <div className="flex items-center gap-1 text-[#265073]">
              <MapPin className="w-4 h-4 text-[#2D9596]" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-[#265073]">
              <Clock className="w-4 h-4 text-[#2D9596]" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1 text-[#265073] opacity-70">
              <Clock className="w-4 h-4" />
              <span>{job.postedTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Skills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {job.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#2D9596] text-white text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="px-3 py-1 bg-[#265073]/10 text-[#265073] text-xs rounded-full">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>

            {/* Salary Badge */}
            <div className="flex-shrink-0">
              <div className="px-4 py-2 bg-[#2D9596] text-white rounded-lg flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">{job.salary}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


