"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, Clock, Eye, Calendar, XCircle } from "lucide-react";
import { Badge } from "../../ui/badge";

const applications = [
  {
    id: 1,
    jobTitle: "Senior React Developer",
    company: "TechCorp Vietnam",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
    status: "pending",
    statusText: "Chờ duyệt",
    appliedDate: "15/11/2025",
    icon: Clock,
    color: "#FFA500",
  },
  {
    id: 2,
    jobTitle: "Full Stack Developer",
    company: "Digital Solutions",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    status: "viewed",
    statusText: "Đã xem CV",
    appliedDate: "14/11/2025",
    icon: Eye,
    color: "#2D9596",
  },
  {
    id: 3,
    jobTitle: "Frontend Engineer",
    company: "Innovation Labs",
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
    status: "interview",
    statusText: "Mời phỏng vấn",
    appliedDate: "12/11/2025",
    icon: Calendar,
    color: "#22C55E",
  },
  {
    id: 4,
    jobTitle: "Backend Developer",
    company: "Cloud Systems",
    companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
    status: "rejected",
    statusText: "Từ chối",
    appliedDate: "10/11/2025",
    icon: XCircle,
    color: "#EF4444",
  },
];

interface RecentApplicationsProps {
  onApplicationClick?: (applicationId: number) => void;
}

export function RecentApplications({ onApplicationClick }: RecentApplicationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-2xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#2D9596]" />
          </div>
          <div>
            <h2 className="text-2xl text-[#265073]">Việc đang ứng tuyển</h2>
            <p className="text-[#2D9596]">{applications.length} việc làm gần đây</p>
          </div>
        </div>

        <button className="text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2 group">
          <span>Xem tất cả</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            onClick={() => onApplicationClick?.(app.id)}
            className="bg-white border border-[#9AD0C2] rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 border-[#9AD0C2]">
                <img
                  src={app.companyLogo}
                  alt={app.company}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Job Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg text-[#265073] mb-1 group-hover:text-[#2D9596] transition-colors truncate">
                  {app.jobTitle}
                </h3>
                <p className="text-[#2D9596] mb-3">{app.company}</p>

                <div className="flex items-center gap-4 text-sm text-[#265073]/60">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Ứng tuyển: {app.appliedDate}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <Badge
                  variant="outline"
                  className="border-2"
                  style={{
                    borderColor: app.color,
                    color: app.color,
                    backgroundColor: `${app.color}10`,
                  }}
                >
                  <app.icon className="w-3 h-3 mr-1" />
                  {app.statusText}
                </Badge>

                <button className="text-[#2D9596] hover:text-[#265073] text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <span>Chi tiết</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


