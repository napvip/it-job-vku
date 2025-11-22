"use client";

import { MapPin, Clock, Building2, Bookmark, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface JobDetailHeaderProps {
  job: {
    title: string;
    company: string;
    location: string;
    postedTime: string;
    salary: string;
  };
}

export function JobDetailHeader({ job }: JobDetailHeaderProps) {
  return (
    <section className="bg-[#ECF4D6] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Left: Job Info */}
            <div className="flex-1">
              <h1 className="text-[#265073] text-3xl lg:text-4xl mb-3">
                {job.title}
              </h1>
              
              <button className="text-[#2D9596] text-lg mb-4 hover:underline flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {job.company}
              </button>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-[#265073]/70">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#265073]/70">
                  <Clock className="w-4 h-4" />
                  <span>{job.postedTime}</span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#37a8a7] transition-colors shadow-lg"
              >
                Ứng tuyển ngay
              </motion.button>
              <button className="px-6 py-3 border-2 border-[#265073] text-[#265073] rounded-xl hover:bg-[#9AD0C2]/20 transition-all flex items-center gap-2">
                <Bookmark className="w-5 h-5" />
                Lưu việc
              </button>
              <button className="p-3 border-2 border-[#265073] text-[#265073] rounded-xl hover:bg-[#9AD0C2]/20 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


