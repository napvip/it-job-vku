"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Eye,
  Trash2,
  Send,
  Sparkles,
  Target,
  FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { 
  getSavedJobs, 
  unsaveJob, 
  JobData, 
  getCandidateApplications,
  hasAppliedForJob
} from "../../../lib/firebase";

export function SavedJobsPage() {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingJobId, setRemovingJobId] = useState<string | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [totalApplications, setTotalApplications] = useState(0);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [jobs, applications] = await Promise.all([
          getSavedJobs(user.uid),
          getCandidateApplications(user.uid)
        ]);
        
        setSavedJobs(jobs);
        setTotalApplications(applications.length);
        
        // Get applied job IDs
        const appliedIds = new Set(applications.map(app => app.jobId));
        setAppliedJobIds(appliedIds);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleRemoveJob = async (jobId: string) => {
    if (!user) return;
    
    try {
      setRemovingJobId(jobId);
      await unsaveJob(user.uid, jobId);
      setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (error) {
      console.error("Error removing job:", error);
    } finally {
      setRemovingJobId(null);
    }
  };

  const getTypeBadgeStyle = (type: string | undefined) => {
    const styles: Record<string, string> = {
      "onsite": "border-2 border-[#265073] text-[#265073]",
      "hybrid": "border-2 border-[#2D9596] text-[#2D9596]",
      "remote": "border-2 border-[#9AD0C2] text-[#265073]",
    };
    return styles[type || ""] || "border-2 border-[#9AD0C2] text-[#265073]";
  };

  // Filter jobs
  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.companyName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter 
      ? job.location?.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchesType = typeFilter === "all" ? true : job.workType === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Header */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#265073] text-3xl font-bold mb-2">Việc làm đã lưu</h1>
            <p className="text-[#2D9596]">
              Xem lại các công việc bạn quan tâm và ứng tuyển khi sẵn sàng.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-2 border-[#9AD0C2] p-4 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[#265073] text-sm mb-1">Tìm kiếm</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tên công việc, công ty..."
                className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none text-[#265073]"
              />
            </div>
            <div>
              <label className="block text-[#265073] text-sm mb-1">Địa điểm</label>
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Thành phố..."
                className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none text-[#265073]"
              />
            </div>
            <div>
              <label className="block text-[#265073] text-sm mb-1">Loại hình</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none text-[#265073]"
              >
                <option value="all">Tất cả</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setTypeFilter("all");
                }}
                className="w-full px-4 py-2 text-[#2D9596] border-2 border-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors"
              >
                Xóa lọc
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl border-2 border-[#9AD0C2] p-12 text-center"
              >
                <Bookmark className="w-20 h-20 text-[#9AD0C2] mx-auto mb-4" />
                <h3 className="text-[#265073] text-xl font-semibold mb-2">
                  {savedJobs.length === 0 ? "Bạn chưa lưu công việc nào" : "Không tìm thấy kết quả"}
                </h3>
                <p className="text-[#2D9596] mb-4">
                  {savedJobs.length === 0 
                    ? "Hãy khám phá và lưu các công việc phù hợp để ứng tuyển sau."
                    : "Thử thay đổi bộ lọc để tìm kiếm."}
                </p>
                <a
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Tìm việc ngay
                </a>
              </motion.div>
            ) : (
              filteredJobs.map((job, index) => {
                const isApplied = appliedJobIds.has(job.id || "");
                
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border-2 border-[#9AD0C2] p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-4">
                      {/* Company Logo */}
                      <div className="w-14 h-14 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <a
                            href={`/job/${job.id}`}
                            className="text-[#265073] text-lg font-semibold hover:text-[#2D9596] transition-colors"
                          >
                            {job.title}
                          </a>
                          {isApplied && (
                            <span className="px-2 py-1 bg-[#10B981]/10 text-[#10B981] text-xs rounded-full border border-[#10B981]/20">
                              Đã ứng tuyển
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[#2D9596] mb-3">
                          <Building2 className="w-4 h-4" />
                          <span>{job.companyName || 'Công ty'}</span>
                        </div>

                        {/* Info Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {(job.salaryMin || job.salaryMax) && !job.hideSalary && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-[#2D9596] text-white rounded-lg text-sm">
                              <DollarSign className="w-3 h-3" />
                              <span>
                                {job.salaryMin && job.salaryMax 
                                  ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} VND`
                                  : job.salaryMax 
                                    ? `Lên đến ${job.salaryMax.toLocaleString()} VND`
                                    : `Từ ${job.salaryMin?.toLocaleString()} VND`
                                }
                              </span>
                            </div>
                          )}
                          {job.location && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-white border border-[#9AD0C2] text-[#265073] rounded-lg text-sm">
                              <MapPin className="w-3 h-3" />
                              <span>{job.location}</span>
                            </div>
                          )}
                          {job.workType && (
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${getTypeBadgeStyle(job.workType)}`}>
                              <Briefcase className="w-3 h-3" />
                              <span>{job.workType}</span>
                            </div>
                          )}
                        </div>

                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {job.skills.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-[#ECF4D6] text-[#265073] rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 4 && (
                              <span className="px-2 py-0.5 text-[#2D9596] text-xs">
                                +{job.skills.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#9AD0C2]/50">
                          {!isApplied && (
                            <a
                              href={`/job/${job.id}`}
                              className="px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center gap-2 text-sm"
                            >
                              <Send className="w-4 h-4" />
                              Ứng tuyển
                            </a>
                          )}

                          <button
                            onClick={() => handleRemoveJob(job.id || "")}
                            disabled={removingJobId === job.id}
                            className="px-4 py-2 border border-[#EF4444] text-[#EF4444] rounded-lg hover:bg-[#FEE2E2] transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            {removingJobId === job.id ? "Đang xóa..." : "Xóa"}
                          </button>

                          <a
                            href={`/job/${job.id}`}
                            className="px-4 py-2 text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2 text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            Chi tiết
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl p-5 text-white"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Thống kê
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Công việc đã lưu</span>
                  <span className="text-2xl font-bold">{savedJobs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Đã ứng tuyển</span>
                  <span className="text-2xl font-bold">{totalApplications}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border-2 border-[#9AD0C2] p-5"
            >
              <h3 className="text-[#265073] font-semibold mb-4">Hành động nhanh</h3>
              <div className="space-y-2">
                <a
                  href="/jobs"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-[#2D9596]" />
                  <span className="text-[#265073]">Tìm việc mới</span>
                </a>
                <a
                  href="/candidate/applications"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  <FileText className="w-5 h-5 text-[#2D9596]" />
                  <span className="text-[#265073]">Đơn ứng tuyển</span>
                </a>
                <a
                  href="/candidate/dashboard"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  <Target className="w-5 h-5 text-[#2D9596]" />
                  <span className="text-[#265073]">Dashboard</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}