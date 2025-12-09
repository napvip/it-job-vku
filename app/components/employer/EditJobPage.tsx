"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  FileText,
  Tag,
  X,
  Check,
  XCircle,
  Briefcase,
  ChevronDown,
  Clock,
  History,
  TrendingUp,
  Eye,
  ArrowLeft,
  Target,
} from "lucide-react";
import { getJob, updateJob, JobData } from "../../../lib/firebase";

interface EditJobPageProps {
  jobId: string;
}

export function EditJobPage({ jobId }: EditJobPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
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
  const [gender, setGender] = useState("any");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [quickApply, setQuickApply] = useState(true);
  const [customCV, setCustomCV] = useState(false);
  const [jobStatus, setJobStatus] = useState<"active" | "paused" | "closed" | "draft">("active");

  useEffect(() => {
    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      const job = await getJob(jobId);
      if (!job) {
        alert("Không tìm thấy tin tuyển dụng!");
        router.push("/employer/jobs");
        return;
      }

      // Populate form
      setJobTitle(job.title);
      setLevel(job.level);
      setWorkType(job.workType);
      setLocation(job.location);
      setSalaryMin(job.salaryMin?.toString() || "");
      setSalaryMax(job.salaryMax?.toString() || "");
      setHideSalary(job.hideSalary || false);
      setDescription(job.description);
      setRequirements(job.requirements);
      setBenefits(job.benefits);
      setSkills(job.skills || []);
      setQuantity(job.quantity.toString());
      setDeadline(job.deadline);
      setContractType(job.contractType);
      setEducation(job.education);
      setGender(job.gender || "any");
      setAutoRefresh(job.autoRefresh ?? true);
      setQuickApply(job.quickApply ?? true);
      setCustomCV(job.customCV ?? false);
      setJobStatus(job.status || "active");
    } catch (error) {
      console.error("Error loading job:", error);
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const suggestedSkills = [
    "Redux",
    "React Query",
    "Jest",
    "Cypress",
    "GraphQL",
    "Webpack",
  ];

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSkillInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      handleAddSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle || !location || !description || !requirements || !benefits || !deadline) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateJob(jobId, {
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
        gender,
        autoRefresh,
        quickApply,
        customCV,
        status: jobStatus,
      });
      alert("Cập nhật thành công!");
      router.push(`/employer/jobs/${jobId}`);
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Có lỗi xảy ra!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/employer/jobs/${jobId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#2D9596]";
      case "paused":
        return "bg-[#FFB84D]";
      case "closed":
        return "bg-gray-400";
      default:
        return "bg-gray-200";
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
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-24">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => router.push(`/employer/jobs/${jobId}`)}
              className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại
            </button>
            <h1 className="text-[#265073] text-3xl mb-2">
              Chỉnh sửa tin tuyển dụng
            </h1>
            <p className="text-[#2D9596]">
              Cập nhật thông tin tin tuyển dụng của bạn
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Basic Job Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
              >
                <h2 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-[#2D9596]" />
                  Thông tin cơ bản
                </h2>

                <div className="space-y-5">
                  {/* Job Title */}
                  <div>
                    <label className="block text-[#265073] mb-2">
                      Tên vị trí tuyển dụng *
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-[#265073] mb-2">
                      Cấp bậc *
                    </label>
                    <div className="relative">
                      <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="intern">Intern</option>
                        <option value="fresher">Fresher</option>
                        <option value="junior">Junior</option>
                        <option value="middle">Middle</option>
                        <option value="senior">Senior</option>
                        <option value="leader">Leader</option>
                        <option value="manager">Manager</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073] pointer-events-none" />
                    </div>
                  </div>

                  {/* Work Type */}
                  <div>
                    <label className="block text-[#265073] mb-2">
                      Hình thức làm việc *
                    </label>
                    <div className="flex gap-3">
                      {(["onsite", "hybrid", "remote"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setWorkType(type)}
                          className={`flex-1 px-6 py-3 rounded-xl transition-colors ${
                            workType === type
                              ? "bg-[#2D9596] text-white"
                              : "border-2 border-[#9AD0C2] text-[#265073] hover:border-[#2D9596]"
                          }`}
                        >
                          {type === "onsite"
                            ? "Onsite"
                            : type === "hybrid"
                              ? "Hybrid"
                              : "Remote"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[#265073] mb-2">
                      Địa điểm làm việc *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="block text-[#265073] mb-2">
                      Mức lương (triệu VNĐ) *
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                        <input
                          type="number"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                        <input
                          type="number"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-[#265073]">
                      <input
                        type="checkbox"
                        checked={hideSalary}
                        onChange={(e) => setHideSalary(e.target.checked)}
                        className="w-4 h-4 text-[#2D9596] border-[#9AD0C2] rounded focus:ring-[#2D9596]"
                      />
                      <span className="text-sm">
                        Không hiển thị mức lương
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Section 2: Job Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
              >
                <h2 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#2D9596]" />
                  Mô tả & Yêu cầu công việc
                </h2>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[#265073]">
                        Mô tả công việc *
                      </label>
                      <button
                        type="button"
                        className="text-sm text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-4 h-4" />
                        AI kiểm tra tối ưu
                      </button>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[#265073]">
                        Yêu cầu công việc *
                      </label>
                      <button
                        type="button"
                        className="text-sm text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-4 h-4" />
                        AI gợi ý skill thị trường
                      </button>
                    </div>
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">
                      Quyền lợi *
                    </label>
                    <textarea
                      value={benefits}
                      onChange={(e) => setBenefits(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* Section 3: Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
              >
                <h2 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-[#2D9596]" />
                  Kỹ năng yêu cầu
                </h2>

                <div>
                  <label className="block text-[#265073] mb-2">
                    Thêm kỹ năng (nhấn Enter để thêm)
                  </label>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillInputKeyDown}
                    placeholder="Nhập tên kỹ năng..."
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  />

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-full flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-[#ECF4D6] rounded-xl">
                    <p className="text-sm text-[#265073]/70 mb-2">
                      Gợi ý kỹ năng theo thị trường hiện tại:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills
                        .filter((s) => !skills.includes(s))
                        .map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleAddSkill(skill)}
                            className="px-3 py-1 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-full text-sm hover:border-[#2D9596] hover:text-[#2D9596] transition-colors"
                          >
                            + {skill}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 4: Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
              >
                <h2 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#2D9596]" />
                  Thông tin bổ sung
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#265073] mb-2">
                      Số lượng tuyển dụng *
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">
                      Hạn nộp hồ sơ *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">
                      Loại hợp đồng *
                    </label>
                    <div className="relative">
                      <select
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="freelance">Freelance</option>
                        <option value="contract">Contract</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073] pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#265073] mb-2">
                      Yêu cầu giới tính
                    </label>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="any">Không yêu cầu</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073] pointer-events-none" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#265073] mb-2">
                      Trình độ học vấn *
                    </label>
                    <div className="relative">
                      <select
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors appearance-none"
                      >
                        <option value="highschool">Trung học phổ thông</option>
                        <option value="diploma">Cao đẳng</option>
                        <option value="bachelor">Đại học</option>
                        <option value="master">Thạc sĩ</option>
                        <option value="phd">Tiến sĩ</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Section 5: Job Status Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
              >
                <h2 className="text-[#265073] text-xl mb-6">
                  Trạng thái tin tuyển dụng
                </h2>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    {(["active", "paused", "closed"] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setJobStatus(status)}
                        className={`flex-1 px-6 py-3 rounded-xl transition-colors text-white ${getStatusColor(status)} ${
                          jobStatus === status ? "ring-4 ring-offset-2 ring-[#265073]/30" : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        {getStatusText(status)}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t-2 border-[#9AD0C2]">
                    <h3 className="text-[#265073] mb-3">Tùy chọn nâng cao</h3>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={autoRefresh}
                          onChange={(e) => setAutoRefresh(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#2D9596] border-[#9AD0C2] rounded"
                        />
                        <div>
                          <span className="text-[#265073]">
                            Làm mới tin tự động sau 7 ngày
                          </span>
                          <p className="text-sm text-[#265073]/70 mt-1">
                            Giúp tin tuyển dụng luôn hiển thị ở vị trí cao
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={quickApply}
                          onChange={(e) => setQuickApply(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#2D9596] border-[#9AD0C2] rounded"
                        />
                        <div>
                          <span className="text-[#265073]">
                            Cho phép ứng viên ứng tuyển nhanh
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={customCV}
                          onChange={(e) => setCustomCV(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#2D9596] border-[#9AD0C2] rounded"
                        />
                        <div>
                          <span className="text-[#265073]">
                            Yêu cầu CV tùy chỉnh theo mẫu
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            </form>
          </div>

          {/* Sidebar - Empty for now */}
          <div className="lg:col-span-1 space-y-6">
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#9AD0C2] shadow-lg py-4 z-50"
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-8 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#2D9596] hover:text-white transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Check className="w-5 h-5" />
            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

