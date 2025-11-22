"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ArrowLeft,
  Eye,
  MessageSquare,
  Calendar,
  XCircle,
  Briefcase,
  Filter,
  Settings,
  List,
  FileText,
  Sparkles,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Users,
  BarChart3,
  Plus,
  GripVertical,
} from "lucide-react";
import { toast, Toaster } from "sonner";

interface Candidate {
  id: number;
  name: string;
  avatar: string;
  currentPosition: string;
  matchScore: number;
  skills: string[];
  appliedDate: string;
  status: string;
}

interface PipelinePageProps {
  jobId: number | null;
  onBack?: () => void;
  onNavigateToJobDetail?: (jobId: number) => void;
  onNavigateToApplicants?: (jobId: number) => void;
  onNavigateToApplicantProfile?: (applicantId: number) => void;
  onNavigateToMessages?: () => void;
}

const STATUSES = [
  { id: "new", label: "Mới nộp", color: "#9AD0C2", count: 0 },
  { id: "reviewed", label: "Đã xem", color: "#2D9596", count: 0 },
  { id: "considering", label: "Đang xem xét", color: "#FFB84D", count: 0 },
  { id: "interview", label: "Mời phỏng vấn", color: "#1EAD7B", count: 0 },
  { id: "offer", label: "Offer", color: "#10B981", count: 0 },
  { id: "rejected", label: "Không phù hợp", color: "#EF4444", count: 0 },
];

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    currentPosition: "Frontend Intern – ABC Company",
    matchScore: 87,
    skills: ["React", "JavaScript", "REST API"],
    appliedDate: "10/11/2024",
    status: "new",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    currentPosition: "Junior Frontend – XYZ Tech",
    matchScore: 92,
    skills: ["React", "TypeScript", "GraphQL"],
    appliedDate: "11/11/2024",
    status: "new",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    currentPosition: "Frontend Developer – TechCorp",
    matchScore: 85,
    skills: ["Vue.js", "JavaScript", "Webpack"],
    appliedDate: "09/11/2024",
    status: "reviewed",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    currentPosition: "Frontend Developer – StartupXYZ",
    matchScore: 88,
    skills: ["React", "Redux", "Jest"],
    appliedDate: "08/11/2024",
    status: "considering",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    currentPosition: "Senior Frontend – BigTech",
    matchScore: 95,
    skills: ["React", "TypeScript", "Next.js"],
    appliedDate: "07/11/2024",
    status: "interview",
  },
];

function CandidateCard({
  candidate,
  onViewProfile,
  onMessage,
  onInviteInterview,
  onReject,
}: {
  candidate: Candidate;
  onViewProfile: () => void;
  onMessage: () => void;
  onInviteInterview: () => void;
  onReject: () => void;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CANDIDATE",
    item: { id: candidate.id, status: candidate.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag as any}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(45, 149, 150, 0.2)" }}
      className="bg-white rounded-2xl p-4 border-2 border-[#9AD0C2] mb-3 cursor-move relative"
    >
      <div className="flex items-start gap-3 mb-3">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4
            className="text-[#265073] hover:text-[#2D9596] transition-colors cursor-pointer truncate"
            onClick={onViewProfile}
          >
            {candidate.name}
          </h4>
          <p className="text-xs text-[#265073]/70 truncate">
            {candidate.currentPosition}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className="px-3 py-1 rounded-full text-sm text-white"
          style={{
            backgroundColor:
              candidate.matchScore >= 90
                ? "#1EAD7B"
                : candidate.matchScore >= 80
                ? "#2D9596"
                : "#FFB84D",
          }}
        >
          {candidate.matchScore}% phù hợp
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-[#9AD0C2] text-[#265073] rounded text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-[#265073]/70 mb-3">
        <span>Nộp ngày {candidate.appliedDate}</span>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-[#9AD0C2]">
        <button
          onClick={onViewProfile}
          className="flex-1 p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors group"
          title="Xem hồ sơ"
        >
          <Eye className="w-4 h-4 text-[#265073] group-hover:text-[#2D9596] mx-auto" />
        </button>
        <button
          onClick={onMessage}
          className="flex-1 p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors group"
          title="Gửi tin nhắn"
        >
          <MessageSquare className="w-4 h-4 text-[#265073] group-hover:text-[#2D9596] mx-auto" />
        </button>
        <button
          onClick={onInviteInterview}
          className="flex-1 p-2 hover:bg-[#ECF4D6] rounded-lg transition-colors group"
          title="Mời phỏng vấn"
        >
          <Calendar className="w-4 h-4 text-[#265073] group-hover:text-[#2D9596] mx-auto" />
        </button>
        <button
          onClick={onReject}
          className="flex-1 p-2 hover:bg-red-50 rounded-lg transition-colors group"
          title="Không phù hợp"
        >
          <XCircle className="w-4 h-4 text-[#265073] group-hover:text-red-500 mx-auto" />
        </button>
      </div>
    </motion.div>
  );
}

function PipelineColumn({
  status,
  candidates,
  onDrop,
  onViewProfile,
  onMessage,
  onInviteInterview,
  onReject,
}: {
  status: typeof STATUSES[0];
  candidates: Candidate[];
  onDrop: (candidateId: number, newStatus: string) => void;
  onViewProfile: (candidateId: number) => void;
  onMessage: () => void;
  onInviteInterview: (candidateId: number) => void;
  onReject: (candidateId: number) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CANDIDATE",
    drop: (item: { id: number; status: string }) => {
      if (item.status !== status.id) {
        onDrop(item.id, status.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className={`flex-shrink-0 w-80 bg-white rounded-2xl p-4 border-2 transition-all ${
        isOver ? "border-[#2D9596] shadow-lg" : "border-[#9AD0C2]"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: status.color }}
          ></div>
          <h3 className="text-[#265073]">{status.label}</h3>
          <span className="px-2 py-1 bg-[#ECF4D6] text-[#265073] rounded-full text-xs">
            {candidates.length}
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
        {candidates.length === 0 ? (
          <div className="text-center py-8 text-[#265073]/50 text-sm">
            Chưa có ứng viên
          </div>
        ) : (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onViewProfile={() => onViewProfile(candidate.id)}
              onMessage={onMessage}
              onInviteInterview={() => onInviteInterview(candidate.id)}
              onReject={() => onReject(candidate.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function PipelinePage({
  jobId,
  onBack,
  onNavigateToJobDetail,
  onNavigateToApplicants,
  onNavigateToApplicantProfile,
  onNavigateToMessages,
}: PipelinePageProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [showFilters, setShowFilters] = useState(false);
  const [showMatchScore, setShowMatchScore] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const handleDrop = (candidateId: number, newStatus: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
    
    const statusLabel = STATUSES.find((s) => s.id === newStatus)?.label || newStatus;
    toast.success(`Đã chuyển ứng viên sang: ${statusLabel}`, {
      duration: 2000,
    });
  };

  const getCandidatesByStatus = (statusId: string) => {
    return candidates.filter((c) => c.status === statusId);
  };

  const handleInviteInterview = (candidateId: number) => {
    toast.success("Đã gửi lời mời phỏng vấn!", { duration: 2000 });
  };

  const handleReject = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: "rejected" } : c))
    );
    toast.error("Đã đánh dấu không phù hợp", { duration: 2000 });
  };

  const aiSuggestions = [
    {
      type: "high-match",
      message: "3 ứng viên có Match Score > 85% → Khuyến nghị chuyển sang phỏng vấn",
      count: 3,
    },
    {
      type: "pending",
      message: "2 ứng viên ở trạng thái Đã xem > 5 ngày → Nên xử lý",
      count: 2,
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
        <Toaster position="top-right" />

        {/* Header */}
        <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
          <div className="max-w-[1600px] mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#2D9596] hover:text-[#265073] transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
              </button>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-[#265073] text-3xl mb-2">
                    Pipeline tuyển dụng – Senior Frontend Developer (ReactJS)
                  </h1>
                  <p className="text-[#2D9596]">
                    Kéo thả ứng viên giữa các giai đoạn để quản lý tiến trình tuyển dụng.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => jobId && onNavigateToJobDetail?.(jobId)}
                    className="px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Xem tin tuyển dụng
                  </button>
                  <button
                    onClick={() => jobId && onNavigateToApplicants?.(jobId)}
                    className="px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <List className="w-4 h-4" />
                    Danh sách ứng viên
                  </button>
                  <button
                    onClick={() => setShowCustomModal(true)}
                    className="px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Tùy chỉnh workflow
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border-b-2 border-[#9AD0C2] sticky top-[72px] z-10">
          <div className="max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                </button>

                <label className="flex items-center gap-2 text-[#265073] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMatchScore}
                    onChange={(e) => setShowMatchScore(e.target.checked)}
                    className="w-4 h-4 accent-[#2D9596]"
                  />
                  Hiển thị Match Score
                </label>

                <label className="flex items-center gap-2 text-[#265073] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSkills}
                    onChange={(e) => setShowSkills(e.target.checked)}
                    className="w-4 h-4 accent-[#2D9596]"
                  />
                  Hiển thị kỹ năng
                </label>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors">
                <TrendingUp className="w-4 h-4" />
                Sắp xếp theo Match Score
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="flex gap-6">
            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-max">
                {STATUSES.map((status) => (
                  <PipelineColumn
                    key={status.id}
                    status={status}
                    candidates={getCandidatesByStatus(status.id)}
                    onDrop={handleDrop}
                    onViewProfile={(id) => onNavigateToApplicantProfile?.(id)}
                    onMessage={() => onNavigateToMessages?.()}
                    onInviteInterview={handleInviteInterview}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </div>

            {/* AI Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 flex-shrink-0 space-y-4"
            >
              {/* AI Suggestions */}
              <div className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white">
                <h3 className="mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Đề xuất
                </h3>

                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        {suggestion.type === "high-match" ? (
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <p className="text-sm">{suggestion.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Overview */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]">
                <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#2D9596]" />
                  Thống kê
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#265073]/70 text-sm">Tổng ứng viên</span>
                    <span className="text-[#265073]">{candidates.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#265073]/70 text-sm">Match Score TB</span>
                    <span className="text-[#2D9596]">
                      {Math.round(
                        candidates.reduce((acc, c) => acc + c.matchScore, 0) /
                          candidates.length
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#265073]/70 text-sm">Đang phỏng vấn</span>
                    <span className="text-[#265073]">
                      {getCandidatesByStatus("interview").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#265073]/70 text-sm">Đã offer</span>
                    <span className="text-[#1EAD7B]">
                      {getCandidatesByStatus("offer").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Skills */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2]">
                <h3 className="text-[#265073] mb-4">Kỹ năng phổ biến</h3>
                <div className="space-y-2">
                  {["React", "JavaScript", "TypeScript", "REST API", "Redux"].map(
                    (skill, index) => (
                      <div key={skill} className="flex items-center gap-2">
                        <div className="flex-1 bg-[#ECF4D6] rounded-full h-2">
                          <div
                            className="bg-[#2D9596] h-2 rounded-full"
                            style={{ width: `${100 - index * 15}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-[#265073]">{skill}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Custom Workflow Modal */}
        <AnimatePresence>
          {showCustomModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCustomModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-[#265073] text-2xl mb-6">
                  Tùy chỉnh quy trình tuyển dụng
                </h3>

                <div className="space-y-4 mb-6">
                  {STATUSES.map((status, index) => (
                    <div
                      key={status.id}
                      className="flex items-center gap-3 p-4 bg-[#ECF4D6] rounded-xl"
                    >
                      <GripVertical className="w-5 h-5 text-[#265073]/50 cursor-move" />
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <input
                        type="text"
                        value={status.label}
                        className="flex-1 bg-transparent border-none text-[#265073] focus:outline-none"
                      />
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <XCircle className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors flex items-center justify-center gap-2 mb-6">
                  <Plus className="w-5 h-5" />
                  Thêm cột mới
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCustomModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomModal(false);
                      toast.success("Đã lưu quy trình tuyển dụng!", {
                        duration: 2000,
                      });
                    }}
                    className="flex-1 px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #ECF4D6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9AD0C2;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2D9596;
        }
      `}</style>
    </DndProvider>
  );
}

