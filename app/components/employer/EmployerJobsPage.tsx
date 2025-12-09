"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MapPin,
  DollarSign,
  Users,
  Edit,
  Pause,
  XCircle,
  Calendar,
  Briefcase,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Play,
  FileText,
  Tag,
  X,
  Check,
  Target,
  ChevronDown,
} from "lucide-react";
import { getCompanyJobs, updateJob, deleteJob, auth, JobData, createJob } from "../../../lib/firebase";

export function EmployerJobsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states for create job modal
  const [jobTitle, setJobTitle] = useState("");
  const [level, setLevel] = useState("middle");
  const [workType, setWorkType] = useState<"onsite" | "hybrid" | "remote">("onsite");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [hideSalary, setHideSalary] = useState(false);
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [deadline, setDeadline] = useState("");
  const [contractType, setContractType] = useState("full-time");
  const [education, setEducation] = useState("bachelor");

  // Load jobs from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        loadJobs(user.uid);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadJobs = async (userId: string) => {
    try {
      setLoading(true);
      const fetchedJobs = await getCompanyJobs(userId);
      setJobs(fetchedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
      alert("Có lỗi xảy ra khi tải danh sách công việc!");
    } finally {
      setLoading(false);
    }
  };

  const handlePauseJob = async (jobId: string) => {
    try {
      await updateJob(jobId, { status: "paused" });
      // Reload jobs
      if (auth.currentUser) {
        await loadJobs(auth.currentUser.uid);
      }
    } catch (error) {
      console.error("Error pausing job:", error);
      alert("Có lỗi xảy ra khi tạm dừng tin tuyển dụng!");
    }
  };

  const handleResumeJob = async (jobId: string) => {
    try {
      await updateJob(jobId, { status: "active" });
      // Reload jobs
      if (auth.currentUser) {
        await loadJobs(auth.currentUser.uid);
      }
    } catch (error) {
      console.error("Error resuming job:", error);
      alert("Có lỗi xảy ra khi tiếp tục tin tuyển dụng!");
    }
  };

  const handleCloseJob = async (jobId: string) => {
    if (!confirm("Bạn có chắc chắn muốn đóng tin tuyển dụng này?")) {
      return;
    }

    try {
      await updateJob(jobId, { status: "closed" });
      // Reload jobs
      if (auth.currentUser) {
        await loadJobs(auth.currentUser.uid);
      }
    } catch (error) {
      console.error("Error closing job:", error);
      alert("Có lỗi xảy ra khi đóng tin tuyển dụng!");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác!")) {
      return;
    }

    try {
      await deleteJob(jobId);
      // Reload jobs
      if (auth.currentUser) {
        await loadJobs(auth.currentUser.uid);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Có lỗi xảy ra khi xóa tin tuyển dụng!");
    }
  };

  // Filter jobs based on filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && job.status !== statusFilter) {
        return false;
      }

      // Location filter
      if (locationFilter !== "all") {
        const normalizedLocation = job.location.toLowerCase();
        if (locationFilter === "hanoi" && !normalizedLocation.includes("hà nội")) return false;
        if (locationFilter === "hcm" && !normalizedLocation.includes("tp.hcm") && !normalizedLocation.includes("hồ chí minh")) return false;
        if (locationFilter === "danang" && !normalizedLocation.includes("đà nẵng")) return false;
        if (locationFilter === "remote" && !normalizedLocation.includes("remote")) return false;
      }

      // Level filter
      if (levelFilter !== "all" && job.level.toLowerCase() !== levelFilter.toLowerCase()) {
        return false;
      }

      // Type filter
      if (typeFilter !== "all" && job.workType.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [jobs, searchQuery, statusFilter, locationFilter, levelFilter, typeFilter]);

  // Stats
  const stats = useMemo(() => ({
    total: filteredJobs.length,
    active: filteredJobs.filter((j) => j.status === "active").length,
    closed: filteredJobs.filter((j) => j.status === "closed").length,
    mostApplicants: filteredJobs.length > 0 ? Math.max(...filteredJobs.map((j) => j.applicants || 0)) : 0,
  }), [filteredJobs]);

  // AI Suggestions
  const aiSuggestions = [
    {
      id: 1,
      icon: TrendingUp,
      title: "Tối ưu mô tả công việc",
      description: "3 tin tuyển dụng có thể cải thiện match score",
      action: "Xem gợi ý",
    },
    {
      id: 2,
      icon: Sparkles,
      title: "Làm mới tin tuyển dụng",
      description: "2 tin đã đăng hơn 30 ngày, nên làm mới để tăng lượt xem",
      action: "Cập nhật ngay",
    },
    {
      id: 3,
      icon: Users,
      title: "Mở rộng tìm kiếm",
      description: "Thử thay đổi yêu cầu kinh nghiệm để tăng số ứng viên",
      action: "Điều chỉnh",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#2D9596] text-white";
      case "paused":
        return "bg-[#FFB84D] text-white";
      case "closed":
        return "bg-gray-400 text-white";
      case "draft":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang tuyển";
      case "paused":
        return "Tạm dừng";
      case "closed":
        return "Đã đóng";
      case "draft":
        return "Nháp";
      default:
        return status;
    }
  };

  const formatSalary = (job: JobData) => {
    if (job.hideSalary) {
      return "Thỏa thuận";
    }
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin}-${job.salaryMax} triệu`;
    }
    if (job.salaryMin) {
      return `Từ ${job.salaryMin} triệu`;
    }
    if (job.salaryMax) {
      return `Tối đa ${job.salaryMax} triệu`;
    }
    return "Thỏa thuận";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setLocationFilter("all");
    setLevelFilter("all");
    setTypeFilter("all");
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      handleAddSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const resetForm = () => {
    setJobTitle("");
    setLevel("middle");
    setWorkType("onsite");
    setLocation("");
    setSalaryMin("");
    setSalaryMax("");
    setHideSalary(false);
    setDescription("");
    setRequirements("");
    setBenefits("");
    setSkills([]);
    setSkillInput("");
    setQuantity("1");
    setDeadline("");
    setContractType("full-time");
    setEducation("bachelor");
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle || !location || !description || !requirements || !benefits || !deadline) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Bạn cần đăng nhập để đăng tin tuyển dụng!");
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        companyId: currentUser.uid,
        title: jobTitle,
        level,
        workType,
        location,
        salaryMin: salaryMin ? parseFloat(salaryMin) : undefined,
        salaryMax: salaryMax ? parseFloat(salaryMax) : undefined,
        hideSalary,
        description,
        requirements,
        benefits,
        skills,
        quantity: parseInt(quantity),
        deadline,
        contractType,
        education,
        status: "active" as const,
        quickApply: true,
      };

      await createJob(jobData);
      alert("Đăng tin tuyển dụng thành công!");
      setShowCreateModal(false);
      resetForm();
      
      // Reload jobs
      if (auth.currentUser) {
        await loadJobs(auth.currentUser.uid);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Có lỗi xảy ra khi đăng tin tuyển dụng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px]">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-[#265073] text-3xl mb-2">
                Danh sách tin tuyển dụng
              </h1>
              <p className="text-[#2D9596]">
                Quản lý tất cả các tin tuyển dụng của công ty bạn
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Đăng tin tuyển dụng mới
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#2D9596]" />
                Bộ lọc tìm kiếm
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Search */}
                <div className="lg:col-span-3">
                  <input
                    type="text"
                    placeholder="Tìm theo tên công việc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Trạng thái
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="active">Đang tuyển</option>
                    <option value="paused">Tạm dừng</option>
                    <option value="closed">Đã đóng</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Địa điểm
                  </label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP.HCM</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Cấp bậc
                  </label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="intern">Intern</option>
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                    <option value="middle">Middle</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm text-[#265073]/70 mb-1">
                    Hình thức
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  >
                    <option value="all">Tất cả</option>
                    <option value="onsite">Onsite</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
                  Áp dụng
                </button>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 text-[#2D9596] hover:text-[#265073] transition-colors"
                >
                  Xóa lọc
                </button>
              </div>
            </motion.div>

            {/* Jobs List */}
            {loading ? (
              // Loading State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-12 border-2 border-[#9AD0C2] text-center"
              >
                <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#265073]">Đang tải danh sách tin tuyển dụng...</p>
              </motion.div>
            ) : filteredJobs.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-12 border-2 border-[#9AD0C2] text-center"
              >
                <div className="w-24 h-24 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-12 h-12 text-[#2D9596]" />
                </div>
                <h3 className="text-[#265073] text-xl mb-3">
                  Bạn chưa đăng tin tuyển dụng nào
                </h3>
                <p className="text-[#265073]/70 mb-6">
                  Bắt đầu tìm kiếm ứng viên phù hợp bằng cách đăng tin tuyển
                  dụng đầu tiên
                </p>
                <button
                  onClick={() => router.push("/employer/jobs/create")}
                  className="px-8 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors"
                >
                  Đăng tin tuyển dụng đầu tiên ngay
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:shadow-lg transition-shadow"
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Left Column - Job Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3
                              onClick={() => router.push(`/employer/jobs/${job.id}`)}
                              className="text-[#265073] text-xl mb-2 hover:text-[#2D9596] transition-colors cursor-pointer"
                            >
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${getStatusColor(job.status)}`}
                          >
                            {getStatusText(job.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-[#265073]">
                            <MapPin className="w-4 h-4 text-[#2D9596]" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#2D9596] text-white rounded-full text-sm">
                              <DollarSign className="w-3 h-3 inline mr-1" />
                              {formatSalary(job)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#265073] text-sm">
                            <Calendar className="w-4 h-4 text-[#2D9596]" />
                            Đăng: {formatDate(job.createdAt)}
                          </div>
                          <div className="text-sm text-[#265073]">
                            <span className="px-2 py-1 bg-[#ECF4D6] rounded">
                              {job.workType === "onsite" ? "Onsite" : job.workType === "hybrid" ? "Hybrid" : "Remote"}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="px-2 py-1 bg-[#ECF4D6] rounded capitalize">
                              {job.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Stats */}
                      <div className="flex flex-col justify-between">
                        <div className="flex justify-center items-center h-full">
                          <div className="p-6 bg-gradient-to-br from-[#2D9596]/10 to-[#265073]/10 rounded-xl text-center w-full">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Users className="w-5 h-5 text-[#2D9596]" />
                            </div>
                            <div className="text-3xl text-[#265073] font-semibold mb-1">
                              {job.applicants || 0}
                            </div>
                            <div className="text-sm text-[#265073]/70">
                              Ứng viên đã ứng tuyển
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-[#9AD0C2]">
                      <button
                        onClick={() => router.push(`/employer/jobs/${job.id}`)}
                        className="flex-1 min-w-[140px] px-4 py-2 bg-gradient-to-r from-[#2D9596] to-[#265073] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => router.push(`/employer/applicant/${job.id}`)}
                        className="flex-1 min-w-[140px] px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center justify-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        Xem ứng viên ({job.applicants || 0})
                      </button>
                      <button
                        onClick={() => router.push(`/employer/jobs/edit/${job.id}`)}
                        className="px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Chỉnh sửa
                      </button>
                      {job.status === "active" ? (
                        <button 
                          onClick={() => job.id && handlePauseJob(job.id)}
                          className="px-4 py-2 border-2 border-[#FFB84D] text-[#FFB84D] rounded-lg hover:bg-[#FFB84D] hover:text-white transition-colors flex items-center gap-2"
                        >
                          <Pause className="w-4 h-4" />
                          Tạm dừng
                        </button>
                      ) : job.status === "paused" ? (
                        <button 
                          onClick={() => job.id && handleResumeJob(job.id)}
                          className="px-4 py-2 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-colors flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Tiếp tục
                        </button>
                      ) : null}
                      <button 
                        onClick={() => job.id && handleCloseJob(job.id)}
                        className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Đóng tin
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center items-center gap-2"
              >
                <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-[#2D9596] text-white"
                        : "border-2 border-[#265073] text-[#265073] hover:bg-[#ECF4D6]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#2D9596]" />
                Thống kê nhanh
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-[#ECF4D6] rounded-xl">
                  <div className="text-2xl text-[#2D9596] mb-1">
                    {stats.total}
                  </div>
                  <div className="text-sm text-[#265073]/70">
                    Tổng tin đăng
                  </div>
                </div>

                <div className="p-4 bg-[#ECF4D6] rounded-xl">
                  <div className="text-2xl text-[#2D9596] mb-1">
                    {stats.active}
                  </div>
                  <div className="text-sm text-[#265073]/70">
                    Tin đang tuyển
                  </div>
                </div>

                <div className="p-4 bg-[#ECF4D6] rounded-xl">
                  <div className="text-2xl text-[#2D9596] mb-1">
                    {stats.closed}
                  </div>
                  <div className="text-sm text-[#265073]/70">Tin đã đóng</div>
                </div>

                <div className="p-4 bg-gradient-to-br from-[#2D9596]/10 to-[#265073]/10 rounded-xl">
                  <div className="text-2xl text-[#265073] mb-1">
                    {stats.mostApplicants}
                  </div>
                  <div className="text-sm text-[#265073]/70">
                    Ứng viên nhiều nhất
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Suggestions Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white shadow-lg"
            >
              <h3 className="mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Gợi ý từ AI
              </h3>

              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => {
                  const Icon = suggestion.icon;
                  return (
                    <div
                      key={suggestion.id}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">
                            {suggestion.title}
                          </h4>
                          <p className="text-sm opacity-90">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                      <button className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors">
                        {suggestion.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Job Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => !isSubmitting && setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#265073] text-2xl flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-[#2D9596]" />
                  Đăng tin tuyển dụng mới
                </h2>
                <button
                  onClick={() => !isSubmitting && setShowCreateModal(false)}
                  className="text-[#265073] hover:text-[#2D9596] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-[#265073] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#2D9596]" />
                    Thông tin cơ bản
                  </h3>

                  <div>
                    <label className="block text-[#265073] mb-2">
                      Tên vị trí tuyển dụng *
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Ví dụ: Frontend Developer (ReactJS)"
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#265073] mb-2">Cấp bậc *</label>
                      <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      >
                        <option value="intern">Intern</option>
                        <option value="fresher">Fresher</option>
                        <option value="junior">Junior</option>
                        <option value="middle">Middle</option>
                        <option value="senior">Senior</option>
                        <option value="leader">Leader</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#265073] mb-2">Hình thức *</label>
                      <select
                        value={workType}
                        onChange={(e) => setWorkType(e.target.value as "onsite" | "hybrid" | "remote")}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      >
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">Địa điểm *</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Hà Nội / Đà Nẵng / TP.HCM"
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">Mức lương (triệu VNĐ)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                        placeholder="Tối thiểu"
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      />
                      <input
                        type="number"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                        placeholder="Tối đa"
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-4">
                  <h3 className="text-[#265073] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#2D9596]" />
                    Mô tả công việc
                  </h3>

                  <div>
                    <label className="block text-[#265073] mb-2">Mô tả chi tiết *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Mô tả công việc..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">Yêu cầu *</label>
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Yêu cầu công việc..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">Quyền lợi *</label>
                    <textarea
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                      placeholder="Quyền lợi..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-[#265073] flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#2D9596]" />
                    Kỹ năng yêu cầu
                  </h3>

                  <div>
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillInputKeyDown}
                      placeholder="Nhập kỹ năng và nhấn Enter"
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                    />
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full flex items-center gap-2"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <h3 className="text-[#265073] flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#2D9596]" />
                    Thông tin bổ sung
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#265073] mb-2">Số lượng *</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#265073] mb-2">Hạn nộp *</label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#265073] mb-2">Loại HĐ *</label>
                      <select
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t-2 border-[#9AD0C2]">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setShowCreateModal(false)}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#ECF4D6] transition-colors disabled:opacity-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check className="w-5 h-5" />
                    {isSubmitting ? "Đang đăng..." : "Đăng tin"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


