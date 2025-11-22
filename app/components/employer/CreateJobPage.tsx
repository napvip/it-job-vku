"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Share2,
  Target,
  Briefcase,
  ChevronDown,
} from "lucide-react";

interface CreateJobPageProps {
  onNavigateToJobs?: () => void;
  onNavigateToJobDetail?: (jobId: number) => void;
}

export function CreateJobPage({
  onNavigateToJobs,
  onNavigateToJobDetail,
}: CreateJobPageProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [level, setLevel] = useState("middle");
  const [workType, setWorkType] = useState<
    "onsite" | "hybrid" | "remote" | null
  >(null);
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
  const [gender, setGender] = useState("any");
  const [education, setEducation] = useState("bachelor");
  const [status, setStatus] = useState("publish");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [quickApply, setQuickApply] = useState(true);
  const [customCV, setCustomCV] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const suggestedSkills = [
    "ReactJS",
    "NodeJS",
    "TypeScript",
    "Docker",
    "MySQL",
    "MongoDB",
    "AWS",
    "Git",
    "RESTful API",
    "Agile/Scrum",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleSaveDraft = () => {
    // Save as draft
    alert("Đã lưu nháp!");
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-24">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-[#265073] text-3xl mb-2">
                Đăng tin tuyển dụng mới
              </h1>
              <p className="text-[#2D9596]">
                Nhập thông tin chi tiết về vị trí mà bạn đang muốn tuyển dụng
              </p>
            </div>
            <button
              onClick={onNavigateToJobs}
              className="px-6 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#2D9596] hover:text-white transition-colors"
            >
              Xem danh sách tin
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* AI Suggestion Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">AI Smart Assistant</h3>
                <p className="text-white/90 text-sm mb-4">
                  AI có thể giúp bạn viết mô tả công việc và lựa chọn skill! Tải
                  JD cũ hoặc dán mô tả để AI phân tích ngay.
                </p>
                <button
                  type="button"
                  className="px-6 py-2 bg-white text-[#2D9596] rounded-lg hover:bg-white/90 transition-colors"
                >
                  Sử dụng AI
                </button>
              </div>
            </div>
          </motion.div>

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
                  placeholder="Ví dụ: Frontend Developer (ReactJS)"
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-[#265073] mb-2">Cấp bậc *</label>
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
                    placeholder="Hà Nội / Đà Nẵng / TP.HCM"
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
                      placeholder="Tối thiểu"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                    <input
                      type="number"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="Tối đa"
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
                    Không hiển thị mức lương (ẩn với ứng viên)
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
              {/* Job Description */}
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
                    AI hỗ trợ viết
                  </button>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả chi tiết về công việc, trách nhiệm chính..."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* Requirements */}
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
                    AI gợi ý yêu cầu
                  </button>
                </div>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Kinh nghiệm, kỹ năng cần thiết..."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-[#265073] mb-2">
                  Quyền lợi *
                </label>
                <textarea
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="Lương thưởng, phúc lợi, bảo hiểm, môi trường làm việc..."
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

              {/* Selected Skills */}
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

              {/* Suggested Skills */}
              <div className="mt-4 p-4 bg-[#ECF4D6] rounded-xl">
                <p className="text-sm text-[#265073]/70 mb-2">
                  Gợi ý kỹ năng phổ biến:
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
              {/* Quantity */}
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

              {/* Deadline */}
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

              {/* Contract Type */}
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

              {/* Gender */}
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

              {/* Education */}
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

          {/* Section 5: Display Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
          >
            <h2 className="text-[#265073] text-xl mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-[#2D9596]" />
              Cài đặt hiển thị
            </h2>

            <div className="space-y-5">
              {/* Status */}
              <div>
                <label className="block text-[#265073] mb-3">
                  Trạng thái job *
                </label>
                <div className="space-y-3">
                  {[
                    { value: "publish", label: "Đăng ngay" },
                    { value: "draft", label: "Lưu nháp" },
                    { value: "schedule", label: "Lên lịch đăng" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-4 border-2 border-[#9AD0C2] rounded-xl cursor-pointer hover:border-[#2D9596] transition-colors"
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={status === option.value}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-5 h-5 text-[#2D9596] border-[#9AD0C2]"
                      />
                      <span className="text-[#265073]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
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
                        Cho phép ứng viên ứng tuyển nhanh (Quick Apply)
                      </span>
                      <p className="text-sm text-[#265073]/70 mt-1">
                        Tăng số lượng ứng viên ứng tuyển
                      </p>
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
                      <p className="text-sm text-[#265073]/70 mt-1">
                        Ứng viên phải điền thêm các thông tin theo yêu cầu
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </form>
      </div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#9AD0C2] shadow-lg py-4 z-50"
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-8 py-3 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#2D9596] hover:text-white transition-colors"
          >
            Lưu nháp
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-colors shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Đăng tin tuyển dụng
          </button>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-8 max-w-md w-full text-white text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>

              <h2 className="text-2xl mb-3">
                🎉 Tin tuyển dụng của bạn đã được đăng!
              </h2>

              <p className="text-white/90 mb-6">
                Tin tuyển dụng đã được xuất bản và sẵn sàng tiếp cận hàng nghìn
                ứng viên tiềm năng.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNavigateToJobDetail?.(1);
                  }}
                  className="w-full px-6 py-3 bg-[#265073] text-white rounded-xl hover:bg-[#265073]/80 transition-colors"
                >
                  Xem tin đã đăng
                </button>

                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    // Navigate to AI matching
                  }}
                  className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Tìm ứng viên phù hợp (AI)
                </button>

                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNavigateToJobs?.();
                  }}
                  className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Chia sẻ trên mạng xã hội
                </button>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-4 text-white/70 hover:text-white transition-colors text-sm"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

