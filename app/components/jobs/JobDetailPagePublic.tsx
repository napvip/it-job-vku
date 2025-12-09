"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Calendar,
  Clock,
  Building2,
  Heart,
  Send,
  Share2,
  Flag,
  CheckCircle,
  X,
  ExternalLink,
  MessageCircle,
  User,
  Mail,
  Phone,
  Upload,
} from "lucide-react";
import {
  getJob,
  JobData,
  saveJob,
  unsaveJob,
  isJobSaved,
  getCompanyInfo,
  CompanyInfo,
  applyForJob,
  hasAppliedForJob,
} from "../../../lib/firebase";
import { auth } from "../../../lib/firebase";

interface JobDetailPagePublicProps {
  jobId: string;
}

export function JobDetailPagePublic({ jobId }: JobDetailPagePublicProps) {
  const router = useRouter();
  const [job, setJob] = useState<JobData | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Modals
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Application form
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (jobId) {
      loadJobDetail();
    }
  }, [jobId]);

  const loadJobDetail = async () => {
    try {
      setLoading(true);
      const jobData = await getJob(jobId);
      
      if (!jobData) {
        alert("Không tìm thấy công việc!");
        router.push("/jobs");
        return;
      }

      setJob(jobData);

      // Load company info
      if (jobData.companyId) {
        const company = await getCompanyInfo(jobData.companyId);
        setCompanyInfo(company);
      }

      // Check if job is saved and applied
      if (auth.currentUser) {
        const saved = await isJobSaved(auth.currentUser.uid, jobId);
        setIsSaved(saved);

        const applied = await hasAppliedForJob(auth.currentUser.uid, jobId);
        setHasApplied(applied);

        // Pre-fill form with user data
        setCandidateEmail(auth.currentUser.email || "");
        setCandidateName(auth.currentUser.displayName || "");
      }
    } catch (error) {
      console.error("Error loading job:", error);
      alert("Có lỗi khi tải thông tin công việc!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập để lưu công việc!");
      router.push("/login");
      return;
    }

    try {
      if (isSaved) {
        await unsaveJob(auth.currentUser.uid, jobId);
        setIsSaved(false);
      } else {
        await saveJob(auth.currentUser.uid, jobId);
        setIsSaved(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleStartChat = () => {
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập để nhắn tin!");
      router.push("/login");
      return;
    }

    router.push(`/candidate/messages?companyId=${job?.companyId}&jobId=${jobId}`);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập để ứng tuyển!");
      router.push("/login");
      return;
    }

    if (!candidateName || !candidateEmail) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsSubmitting(true);

    try {
      await applyForJob({
        jobId,
        candidateId: auth.currentUser.uid,
        candidateName,
        candidateEmail,
        candidatePhone,
        coverLetter,
        cvUrl: cvFile ? URL.createObjectURL(cvFile) : undefined,
        status: 'pending',
      });

      alert("Ứng tuyển thành công!");
      setShowApplyModal(false);
      setHasApplied(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSalary = (job: JobData) => {
    if (job.hideSalary) return "Thỏa thuận";
    if (job.salaryMin && job.salaryMax) {
      return `${job.salaryMin}-${job.salaryMax} triệu VNĐ`;
    }
    if (job.salaryMin) {
      return `Từ ${job.salaryMin} triệu VNĐ`;
    }
    return "Thỏa thuận";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getLevelText = (level: string) => {
    const levelMap: { [key: string]: string } = {
      intern: "Thực tập sinh",
      fresher: "Fresher",
      junior: "Junior",
      middle: "Middle",
      senior: "Senior",
      lead: "Team Lead",
      manager: "Manager",
    };
    return levelMap[level] || level;
  };

  const getWorkTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      onsite: "Tại văn phòng",
      hybrid: "Hybrid",
      remote: "Remote",
    };
    return typeMap[type] || type;
  };

  const getContractTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      "full-time": "Toàn thời gian",
      "part-time": "Bán thời gian",
      contract: "Hợp đồng",
      intern: "Thực tập",
    };
    return typeMap[type] || type;
  };

  const getEducationText = (edu: string) => {
    const eduMap: { [key: string]: string } = {
      highschool: "Trung học phổ thông",
      college: "Cao đẳng",
      bachelor: "Đại học",
      master: "Thạc sĩ",
      phd: "Tiến sĩ",
    };
    return eduMap[edu] || edu;
  };

  const shareJob = (platform: string) => {
    const url = window.location.href;
    const title = job?.title || "Việc làm IT";
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Đã sao chép link!");
      setShowShareModal(false);
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải thông tin công việc...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#265073] text-xl">Không tìm thấy công việc!</p>
          <button
            onClick={() => router.push("/jobs")}
            className="mt-4 px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pb-12">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => router.push("/jobs")}
            className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại danh sách việc làm
          </button>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {job.companyName?.charAt(0) || "C"}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-[#265073] mb-2">
                    {job.title}
                  </h1>
                  <button
                    onClick={() => setShowCompanyModal(true)}
                    className="text-[#2D9596] hover:text-[#265073] font-medium flex items-center gap-2 group"
                  >
                    {job.companyName || "Công ty"}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-[#265073]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#2D9596]" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#2D9596]" />
                  <span className="font-medium">{formatSalary(job)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#2D9596]" />
                  <span>{getWorkTypeText(job.workType)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2D9596]" />
                  <span>{getContractTypeText(job.contractType)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {!hasApplied ? (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Ứng tuyển ngay
                </button>
              ) : (
                <div className="w-full px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Đã ứng tuyển
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleSaveJob}
                  className={`px-4 py-3 rounded-xl transition-colors border-2 flex items-center justify-center gap-2 ${
                    isSaved
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "border-[#9AD0C2] text-[#265073] hover:border-[#2D9596]"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={handleStartChat}
                  className="px-4 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-xl hover:border-[#2D9596] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="px-4 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-xl hover:border-[#2D9596] transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-2xl font-bold text-[#265073] mb-4">
                Mô tả công việc
              </h2>
              <div className="text-[#265073] whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-2xl font-bold text-[#265073] mb-4">
                Yêu cầu ứng viên
              </h2>
              <div className="text-[#265073] whitespace-pre-line leading-relaxed">
                {job.requirements}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-2xl font-bold text-[#265073] mb-4">
                Quyền lợi
              </h2>
              <div className="text-[#265073] whitespace-pre-line leading-relaxed">
                {job.benefits}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Job Info */}
          <div className="space-y-6">
            {/* Job Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="text-xl font-bold text-[#265073] mb-4">
                Thông tin chung
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#2D9596] mb-1">Cấp bậc</div>
                  <div className="text-[#265073] font-medium">
                    {getLevelText(job.level)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#2D9596] mb-1">Số lượng</div>
                  <div className="text-[#265073] font-medium">
                    {job.quantity} người
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#2D9596] mb-1">Học vấn</div>
                  <div className="text-[#265073] font-medium">
                    {getEducationText(job.education)}
                  </div>
                </div>
                {job.gender && job.gender !== "any" && (
                  <div>
                    <div className="text-sm text-[#2D9596] mb-1">Giới tính</div>
                    <div className="text-[#265073] font-medium">
                      {job.gender === "male" ? "Nam" : "Nữ"}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-[#2D9596] mb-1">Hạn ứng tuyển</div>
                  <div className="text-[#265073] font-medium">
                    {formatDate(new Date(job.deadline))}
                  </div>
                </div>
                {job.applicants !== undefined && job.applicants > 0 && (
                  <div>
                    <div className="text-sm text-[#2D9596] mb-1">Số người ứng tuyển</div>
                    <div className="text-[#265073] font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {job.applicants} ứng viên
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Skills Required */}
            {job.skills && job.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
              >
                <h3 className="text-xl font-bold text-[#265073] mb-4">
                  Kỹ năng yêu cầu
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-[#ECF4D6] text-[#2D9596] rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Report Job */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <button className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 transition-colors">
                <Flag className="w-5 h-5" />
                Báo cáo tin tuyển dụng
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Company Modal */}
      <AnimatePresence>
        {showCompanyModal && companyInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCompanyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {companyInfo.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#265073]">
                      {companyInfo.name}
                    </h2>
                    {companyInfo.industry && (
                      <p className="text-[#2D9596]">{companyInfo.industry}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowCompanyModal(false)}
                  className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#265073]" />
                </button>
              </div>

              <div className="space-y-6">
                {companyInfo.description && (
                  <div>
                    <h3 className="font-bold text-[#265073] mb-2">Giới thiệu</h3>
                    <p className="text-[#265073] leading-relaxed">
                      {companyInfo.description}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {companyInfo.location && (
                    <div>
                      <div className="text-sm text-[#2D9596] mb-1">Địa chỉ</div>
                      <div className="text-[#265073] font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {companyInfo.location}
                      </div>
                    </div>
                  )}
                  {companyInfo.size && (
                    <div>
                      <div className="text-sm text-[#2D9596] mb-1">Quy mô</div>
                      <div className="text-[#265073] font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {companyInfo.size}
                      </div>
                    </div>
                  )}
                  {companyInfo.website && (
                    <div>
                      <div className="text-sm text-[#2D9596] mb-1">Website</div>
                      <a
                        href={companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2D9596] hover:text-[#265073] font-medium flex items-center gap-2"
                      >
                        {companyInfo.website}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                  {companyInfo.founded && (
                    <div>
                      <div className="text-sm text-[#2D9596] mb-1">Năm thành lập</div>
                      <div className="text-[#265073] font-medium">
                        {companyInfo.founded}
                      </div>
                    </div>
                  )}
                </div>

                {companyInfo.benefits && companyInfo.benefits.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[#265073] mb-2">Phúc lợi</h3>
                    <div className="space-y-2">
                      {companyInfo.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-[#265073]"
                        >
                          <CheckCircle className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowApplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#265073] mb-2">
                    Ứng tuyển: {job.title}
                  </h2>
                  <p className="text-[#2D9596]">{job.companyName}</p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#265073]" />
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div>
                  <label className="block text-[#265073] mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/50" />
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#265073] mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/50" />
                    <input
                      type="email"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#265073] mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/50" />
                    <input
                      type="tel"
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                      placeholder="0123456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#265073] mb-2">
                    Thư giới thiệu
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none resize-none"
                    placeholder="Giới thiệu ngắn gọn về bản thân và lý do ứng tuyển..."
                  />
                </div>

                <div>
                  <label className="block text-[#265073] mb-2">
                    CV đính kèm
                  </label>
                  <div className="border-2 border-dashed border-[#9AD0C2] rounded-xl p-6 text-center hover:border-[#2D9596] transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-[#2D9596] mx-auto mb-2" />
                      <p className="text-[#265073] mb-1">
                        {cvFile ? cvFile.name : "Tải lên CV của bạn"}
                      </p>
                      <p className="text-[#2D9596] text-sm">
                        PDF, DOC, DOCX (Tối đa 5MB)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-xl hover:border-[#2D9596] transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Gửi hồ sơ
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#265073]">
                  Chia sẻ công việc
                </h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#265073]" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => shareJob("facebook")}
                  className="p-4 border-2 border-[#9AD0C2] rounded-xl hover:border-[#2D9596] transition-colors text-[#265073] font-medium"
                >
                  Facebook
                </button>
                <button
                  onClick={() => shareJob("twitter")}
                  className="p-4 border-2 border-[#9AD0C2] rounded-xl hover:border-[#2D9596] transition-colors text-[#265073] font-medium"
                >
                  Twitter
                </button>
                <button
                  onClick={() => shareJob("linkedin")}
                  className="p-4 border-2 border-[#9AD0C2] rounded-xl hover:border-[#2D9596] transition-colors text-[#265073] font-medium"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => shareJob("copy")}
                  className="p-4 border-2 border-[#9AD0C2] rounded-xl hover:border-[#2D9596] transition-colors text-[#265073] font-medium"
                >
                  Sao chép link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
