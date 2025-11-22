"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Video, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "../../ui/badge";

const interviews = [
  {
    id: 1,
    jobTitle: "Frontend Engineer",
    company: "Innovation Labs",
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
    date: "17/11/2025",
    time: "14:00 - 15:30",
    type: "Online",
    platform: "Google Meet",
    interviewer: "Nguyễn Thị B - Technical Lead",
  },
  {
    id: 2,
    jobTitle: "Senior React Developer",
    company: "TechCorp Vietnam",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
    date: "18/11/2025",
    time: "10:00 - 11:00",
    type: "Onsite",
    location: "Tầng 15, Tòa nhà ABC, Hà Nội",
  },
];

export function UpcomingInterviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white border-2 border-[#9AD0C2] rounded-2xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-[#2D9596]" />
          </div>
          <div>
            <h2 className="text-2xl text-[#265073]">Lịch phỏng vấn sắp tới</h2>
            <p className="text-[#2D9596]">{interviews.length} cuộc phỏng vấn</p>
          </div>
        </div>
      </div>

      {/* Interviews List */}
      {interviews.length > 0 ? (
        <div className="space-y-4">
          {interviews.map((interview, index) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 border-[#9AD0C2]">
                  <img
                    src={interview.companyLogo}
                    alt={interview.company}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Interview Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg text-[#265073] mb-1">
                    {interview.jobTitle}
                  </h3>
                  <p className="text-[#2D9596] mb-4">{interview.company}</p>

                  <div className="space-y-2">
                    {/* Date & Time */}
                    <div className="flex items-center gap-6 text-sm text-[#265073]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#2D9596]" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#2D9596]" />
                        <span>{interview.time}</span>
                      </div>
                    </div>

                    {/* Location/Platform */}
                    {interview.type === "Online" ? (
                      <div className="flex items-start gap-2 text-sm text-[#265073]">
                        <Video className="w-4 h-4 text-[#2D9596] mt-0.5 flex-shrink-0" />
                        <div>
                          <Badge variant="outline" className="mb-1 border-[#2D9596] text-[#2D9596]">
                            {interview.type}
                          </Badge>
                          <p>{interview.platform}</p>
                          {interview.interviewer && (
                            <p className="text-[#2D9596] mt-1">{interview.interviewer}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-sm text-[#265073]">
                        <MapPin className="w-4 h-4 text-[#2D9596] mt-0.5 flex-shrink-0" />
                        <div>
                          <Badge variant="outline" className="mb-1 border-[#2D9596] text-[#2D9596]">
                            {interview.type}
                          </Badge>
                          <p>{interview.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#9AD0C2]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-[#2D9596] text-white py-2.5 rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Xác nhận tham gia</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white text-[#265073] py-2.5 rounded-lg border-2 border-[#265073] hover:bg-[#265073] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#ECF4D6] rounded-xl border-2 border-dashed border-[#9AD0C2]">
          <Calendar className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
          <p className="text-[#265073]/60">Chưa có lịch phỏng vấn nào.</p>
        </div>
      )}
    </motion.div>
  );
}


