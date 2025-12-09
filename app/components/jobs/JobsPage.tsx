"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Briefcase, TrendingUp, Heart } from "lucide-react";
import { JobFilterBar } from "./JobFilterBar";
import { JobCard } from "./JobCard";
import { JobSidebar } from "./JobSidebar";
import { getActiveJobs, JobData, saveJob, unsaveJob, isJobSaved } from "../../../lib/firebase";
import { auth } from "../../../lib/firebase";

export function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsList = await getActiveJobs();
      setJobs(jobsList);

      // Load saved jobs if user is logged in
      if (auth.currentUser) {
        const savedStatus = await Promise.all(
          jobsList.map(async (job) => {
            if (job.id) {
              const saved = await isJobSaved(auth.currentUser!.uid, job.id);
              return { jobId: job.id, saved };
            }
            return { jobId: '', saved: false };
          })
        );
        const savedSet = new Set(
          savedStatus.filter((s) => s.saved).map((s) => s.jobId)
        );
        setSavedJobIds(savedSet);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập để lưu công việc!");
      router.push("/login");
      return;
    }

    try {
      if (savedJobIds.has(jobId)) {
        await unsaveJob(auth.currentUser.uid, jobId);
        setSavedJobIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
      } else {
        await saveJob(auth.currentUser.uid, jobId);
        setSavedJobIds((prev) => new Set(prev).add(jobId));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.companyName?.toLowerCase().includes(searchLower) ||
          job.skills?.some((skill) => skill.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location && job.location !== filters.location) {
        return false;
      }

      // Experience filter
      if (filters.experience && job.level !== filters.experience) {
        return false;
      }

      // Job type filter
      if (filters.jobType && job.workType !== filters.jobType) {
        return false;
      }

      // Salary filter
      if (filters.salary && !job.hideSalary) {
        const minSalary = job.salaryMin || 0;
        switch (filters.salary) {
          case "under10":
            if (minSalary >= 10) return false;
            break;
          case "10-20":
            if (minSalary < 10 || minSalary >= 20) return false;
            break;
          case "20-30":
            if (minSalary < 20 || minSalary >= 30) return false;
            break;
          case "above30":
            if (minSalary < 30) return false;
            break;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  // Transform JobData to match JobCard expected format
  const transformedJobs = filteredJobs.map((job) => ({
    id: job.id || "",
    title: job.title,
    company: job.companyName || "Công ty",
    location: job.location,
    salary: job.hideSalary 
      ? "Thỏa thuận" 
      : job.salaryMin && job.salaryMax
      ? `${job.salaryMin}-${job.salaryMax} triệu`
      : job.salaryMin
      ? `Từ ${job.salaryMin} triệu`
      : "Thỏa thuận",
    type: job.workType === "onsite" ? "Full-time" : job.workType === "remote" ? "Remote" : "Hybrid",
    skills: job.skills || [],
    logo: job.companyName?.charAt(0) || "💼",
    postedTime: formatPostedTime(job.createdAt),
    isSaved: savedJobIds.has(job.id || ""),
  }));

  function formatPostedTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "Vừa xong";
    if (hours < 24) return `${hours} giờ trước`;
    if (days === 1) return "1 ngày trước";
    if (days < 7) return `${days} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải việc làm...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-[#ECF4D6] py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4">
              <Briefcase className="w-5 h-5 text-[#2D9596]" />
              <span className="text-[#265073] text-sm">Việc làm IT</span>
            </div>
            <h1 className="text-[#265073] text-4xl md:text-5xl mb-4">
              Tìm kiếm việc làm IT phù hợp với bạn
            </h1>
            <p className="text-[#2D9596] text-lg">
              Hơn {jobs.length}+ việc làm IT từ Fresher đến Senior, cập nhật mỗi ngày.
              <br />
              Hỗ trợ gợi ý thông minh bằng AI.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1">{jobs.length}</div>
                <div className="text-sm text-[#265073]">Việc làm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1">
                  {new Set(jobs.map(j => j.companyId)).size}
                </div>
                <div className="text-sm text-[#265073]">Công ty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-[#2D9596] mb-1 flex items-center gap-1">
                  <TrendingUp className="w-7 h-7" />
                  {filteredJobs.length}
                </div>
                <div className="text-sm text-[#265073]">Việc mới hôm nay</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <JobFilterBar 
        onFilterChange={handleFilterChange}
        totalJobs={filteredJobs.length}
      />

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[#265073] text-2xl">
                  {filteredJobs.length} việc làm phù hợp
                </h2>
                <select className="px-4 py-2 border-2 border-[#9AD0C2] rounded-lg text-[#265073] focus:outline-none focus:border-[#2D9596]">
                  <option>Mới nhất</option>
                  <option>Lương cao nhất</option>
                  <option>Phù hợp nhất</option>
                </select>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#265073] mb-2">
                    Không tìm thấy việc làm phù hợp
                  </h3>
                  <p className="text-[#2D9596]">
                    Thử điều chỉnh bộ lọc để xem thêm kết quả
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transformedJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <JobCard 
                        job={job} 
                        onSave={(e) => handleSaveJob(job.id, e)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <JobSidebar jobs={transformedJobs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

