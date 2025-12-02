"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Edit,
  RefreshCw,
  Send,
  X,
  ChevronDown,
  Play,
  Sparkles,
  ArrowRight,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
}

const mockJobs: JobPosting[] = [
  { id: 1, title: "Frontend Developer (ReactJS)", company: "FPT Software", location: "Hà Nội" },
  { id: 2, title: "Mobile Developer (React Native)", company: "Viettel Solutions", location: "TP.HCM" },
  { id: 3, title: "Full-stack Developer", company: "VNG Corporation", location: "TP.HCM" },
  { id: 4, title: "Senior ReactJS Developer", company: "Tiki", location: "Hà Nội" },
];

export function SubmitCVWithAIPage() {
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);
  const [aiSummary, setAiSummary] = useState("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [includeInterview, setIncludeInterview] = useState(false);
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock user data
  const userData = {
    name: "Nguyễn Văn An",
    avatar: "",
    desiredPosition: ["Frontend Developer", "Mobile Developer"],
    hasInterviewRecording: true,
  };

  // Handle file upload
  const handleFileUpload = (file: File) => {
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      setUploadedCV(file);
      toast.success(`Đã tải lên: ${file.name}`);
      // Auto generate summary after upload
      setTimeout(() => generateAISummary(), 500);
    } else {
      toast.error("Vui lòng chỉ tải lên file PDF");
    }
  };

  // Generate AI Summary
  const generateAISummary = () => {
    setIsGeneratingSummary(true);
    setTimeout(() => {
      setAiSummary(
        "Ứng viên có hơn 2 năm kinh nghiệm làm việc với ReactJS và React Native, đã từng xây dựng hệ thống tuyển dụng IT thông minh và các ứng dụng mobile cho hơn 10,000 người dùng. Thành thạo TypeScript, Tailwind CSS, Firebase, và có kinh nghiệm làm việc theo mô hình Agile. Kỹ năng giao tiếp tốt, tiếng Anh trung cấp, có khả năng làm việc độc lập và teamwork hiệu quả."
      );
      setIsGeneratingSummary(false);
      toast.success("✨ AI đã tạo tóm tắt CV thành công!");
    }, 2000);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Submit CV
  const handleSubmit = () => {
    if (!uploadedCV) {
      toast.error("Vui lòng tải lên CV trước khi gửi");
      return;
    }
    if (!selectedJob) {
      toast.error("Vui lòng chọn tin tuyển dụng");
      return;
    }

    // Simulate submission
    const job = mockJobs.find((j) => j.id === selectedJob);
    toast.success(
      <div>
        <p className="font-semibold">✅ CV đã được gửi thành công!</p>
        <p className="text-sm mt-1">Vị trí: {job?.title}</p>
        <button
          onClick={() => {}}
          className="text-xs text-[#2D9596] underline mt-2 flex items-center gap-1"
        >
          Theo dõi tình trạng đơn ứng tuyển <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full flex items-center justify-center border-4 border-[#2D9596] flex-shrink-0">
              <User className="w-12 h-12 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-[#265073] text-2xl mb-2">{userData.name}</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {userData.desiredPosition.map((pos, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#ECF4D6] text-[#2D9596] rounded-full text-sm"
                  >
                    {pos}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors text-sm border border-[#2D9596] px-4 py-2 rounded-lg hover:bg-[#ECF4D6]">
                <Edit className="w-4 h-4" />
                Chỉnh sửa hồ sơ
              </button>
            </div>
          </div>
        </motion.div>

        {/* Upload CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-[#265073] text-xl mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            📎 Tệp CV của bạn
          </h3>

          {uploadedCV ? (
            <div className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-xl border-2 border-[#9AD0C2]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#2D9596] rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#265073]">{uploadedCV.name}</p>
                  <p className="text-sm text-[#2D9596]">
                    {(uploadedCV.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setUploadedCV(null);
                  setAiSummary("");
                }}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isDragging
                  ? "border-[#2D9596] bg-[#ECF4D6]"
                  : "border-[#9AD0C2] hover:border-[#2D9596] hover:bg-[#ECF4D6]"
              }`}
            >
              <Upload className="w-12 h-12 text-[#2D9596] mx-auto mb-4" />
              <p className="text-[#265073] mb-2">
                Kéo thả file CV vào đây hoặc
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-all"
              >
                Chọn file từ thiết bị
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Hỗ trợ file PDF (tối đa 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </div>
          )}
        </motion.div>

        {/* AI Summary */}
        <AnimatePresence>
          {uploadedCV && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#265073] text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#2D9596]" />
                  Tóm tắt CV do AI tạo
                </h3>
                <button
                  onClick={generateAISummary}
                  disabled={isGeneratingSummary}
                  className="flex items-center gap-2 text-sm px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-all disabled:bg-gray-400"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isGeneratingSummary ? "animate-spin" : ""}`}
                  />
                  Tạo lại
                </button>
              </div>

              {isGeneratingSummary ? (
                <div className="p-6 bg-[#9AD0C2] rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 border-4 border-[#265073] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#265073]">AI đang phân tích CV của bạn...</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/50 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-white/50 rounded w-5/6 animate-pulse"></div>
                    <div className="h-3 bg-white/50 rounded w-4/6 animate-pulse"></div>
                  </div>
                </div>
              ) : aiSummary ? (
                <div className="p-6 bg-[#9AD0C2] rounded-xl border-2 border-[#2D9596]">
                  <p className="text-[#265073] leading-relaxed">{aiSummary}</p>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Select Job Posting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-[#265073] text-xl mb-4">Chọn tin tuyển dụng</h3>
          
          <div className="relative">
            <button
              onClick={() => setShowJobDropdown(!showJobDropdown)}
              className="w-full flex items-center justify-between p-4 bg-[#ECF4D6] rounded-xl border-2 border-[#9AD0C2] hover:border-[#2D9596] transition-all"
            >
              <span className="text-[#265073]">
                {selectedJob
                  ? mockJobs.find((j) => j.id === selectedJob)?.title
                  : "-- Chọn vị trí ứng tuyển --"}
              </span>
              <ChevronDown className={`w-5 h-5 text-[#2D9596] transition-transform ${showJobDropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showJobDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border-2 border-[#9AD0C2] overflow-hidden"
                >
                  {mockJobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => {
                        setSelectedJob(job.id);
                        setShowJobDropdown(false);
                      }}
                      className="w-full text-left p-4 hover:bg-[#ECF4D6] transition-colors border-b border-[#9AD0C2] last:border-b-0"
                    >
                      <p className="text-[#265073]">{job.title}</p>
                      <p className="text-sm text-[#2D9596]">
                        {job.company} • {job.location}
                      </p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Include Interview Recording */}
          {userData.hasInterviewRecording && (
            <div className="mt-4 p-4 bg-[#ECF4D6] rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInterview}
                  onChange={(e) => setIncludeInterview(e.target.checked)}
                  className="w-5 h-5 text-[#2D9596] border-[#2D9596] rounded focus:ring-[#2D9596]"
                />
                <span className="text-[#265073]">
                  Đính kèm bản ghi âm phỏng vấn gần nhất
                </span>
              </label>
              {includeInterview && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-8 mt-2 flex items-center gap-2 text-sm text-[#2D9596] hover:text-[#265073] transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Xem lại bản ghi âm
                </motion.button>
              )}
            </div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-[#2D9596] to-[#265073] text-white rounded-xl text-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all"
        >
          <Send className="w-5 h-5" />
          Gửi CV ngay
        </motion.button>

        {/* Additional Options */}
        <div className="text-center">
          <button className="text-[#2D9596] hover:text-[#265073] transition-colors text-sm flex items-center gap-2 mx-auto">
            <Sparkles className="w-4 h-4" />
            Gợi ý chỉnh sửa CV với AI trước khi gửi
          </button>
        </div>
      </div>
    </div>
  );
}
