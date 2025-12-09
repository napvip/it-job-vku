"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Download,
  Calendar,
  Users,
  Briefcase,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Award,
  FileText,
  MessageSquare,
  MapPin,
  Mail,
  Phone,
  X,
  GraduationCap,
  Code,
  Building2,
  Send,
} from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth, getOrCreateConversation, sendMessage } from "@/lib/firebase";

interface Candidate {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  avatar?: string;
  currentPosition?: string;
  experience?: string;
  skills?: string[];
  education?: string;
  location?: string;
  bio?: string;
  expectedSalary?: string;
  languages?: string[];
  certifications?: string[];
  createdAt?: Date;
  // Thêm các fields mới
  cvUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  workHistory?: Array<{
    company: string;
    position: string;
    duration: string;
    description?: string;
  }>;
  educationHistory?: Array<{
    school: string;
    degree: string;
    major?: string;
    year?: string;
  }>;
}

export function EmployerApplicantsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [educationFilter, setEducationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const itemsPerPage = 10;

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  // Load all candidates from Firebase
  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "candidate"));
      const snapshot = await getDocs(q);
      
      const candidateList: Candidate[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        candidateList.push({
          id: doc.id,
          displayName: data.displayName || "Chưa cập nhật",
          email: data.email || "",
          phone: data.phone || "",
          avatar: data.avatar || "",
          currentPosition: data.currentPosition || data.title || data.position || "",
          experience: data.experience || "",
          skills: data.skills || [],
          education: data.education || "",
          location: data.location || data.address || "",
          bio: data.bio || data.about || data.introduction || "",
          expectedSalary: data.expectedSalary || data.salary || data.desiredSalary || "",
          languages: data.languages || [],
          certifications: data.certifications || data.certificates || [],
          createdAt: data.createdAt?.toDate(),
          // Thêm các fields mới
          cvUrl: data.cvUrl || data.cv || data.resumeUrl || "",
          portfolioUrl: data.portfolioUrl || data.portfolio || data.website || "",
          linkedinUrl: data.linkedinUrl || data.linkedin || "",
          githubUrl: data.githubUrl || data.github || "",
          workHistory: data.workHistory || data.experiences || data.workExperience || [],
          educationHistory: data.educationHistory || data.educations || [],
        });
      });
      
      setCandidates(candidateList);
    } catch (error) {
      console.error("Error loading candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter candidates
  const filteredCandidates = candidates.filter((candidate) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchName = candidate.displayName?.toLowerCase().includes(searchLower);
      const matchEmail = candidate.email?.toLowerCase().includes(searchLower);
      const matchSkills = candidate.skills?.some(s => s.toLowerCase().includes(searchLower));
      const matchPosition = candidate.currentPosition?.toLowerCase().includes(searchLower);
      if (!matchName && !matchEmail && !matchSkills && !matchPosition) return false;
    }

    // Experience filter
    if (experienceFilter !== "all") {
      const exp = candidate.experience?.toLowerCase() || "";
      if (experienceFilter === "0-1" && !exp.match(/^[01]\s*(năm|year)/i) && !exp.includes("fresher")) return false;
      if (experienceFilter === "1-3" && !exp.match(/[1-3]\s*(năm|year)/i)) return false;
      if (experienceFilter === "3-5" && !exp.match(/[3-5]\s*(năm|year)/i)) return false;
      if (experienceFilter === "5+" && !exp.match(/[5-9]|1[0-9]|20/)) return false;
    }

    // Location filter
    if (locationFilter !== "all") {
      if (!candidate.location?.toLowerCase().includes(locationFilter.toLowerCase())) return false;
    }

    // Education filter
    if (educationFilter !== "all") {
      const edu = candidate.education?.toLowerCase() || "";
      if (educationFilter === "highschool" && !edu.includes("trung học") && !edu.includes("phổ thông")) return false;
      if (educationFilter === "college" && !edu.includes("cao đẳng")) return false;
      if (educationFilter === "bachelor" && !edu.includes("đại học") && !edu.includes("cử nhân")) return false;
      if (educationFilter === "master" && !edu.includes("thạc sĩ") && !edu.includes("master")) return false;
      if (educationFilter === "phd" && !edu.includes("tiến sĩ") && !edu.includes("phd")) return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setExperienceFilter("all");
    setLocationFilter("all");
    setEducationFilter("all");
    setCurrentPage(1);
  };

  // Open profile modal
  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  // Open message modal
  const handleOpenMessage = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setMessageText("");
    setShowMessageModal(true);
  };

  // Send message to candidate
  const handleSendMessage = async () => {
    if (!selectedCandidate || !messageText.trim() || !auth.currentUser) return;

    setSendingMessage(true);
    try {
      // Create or get conversation
      const conversationId = await getOrCreateConversation(
        selectedCandidate.id,
        auth.currentUser.uid
      );

      // Send message
      await sendMessage(
        conversationId,
        auth.currentUser.uid,
        "employer",
        messageText
      );

      alert("Gửi tin nhắn thành công!");
      setShowMessageModal(false);
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Gửi tin nhắn thất bại!");
    } finally {
      setSendingMessage(false);
    }
  };

  // Go to full messages page
  const handleGoToMessages = () => {
    if (selectedCandidate) {
      router.push(`/employer/messages?candidateId=${selectedCandidate.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải danh sách ứng viên...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[#265073] text-3xl font-bold mb-2">
                  Tất cả ứng viên
                </h1>
                <p className="text-[#2D9596]">
                  Có tổng cộng {candidates.length} ứng viên trên hệ thống
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg mb-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-[#2D9596]/20">
                <Users className="w-6 h-6 text-[#2D9596]" />
              </div>
              <div className="text-2xl text-[#2D9596] font-bold">{candidates.length}</div>
              <div className="text-xs text-[#265073]/70">Tổng ứng viên</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-[#265073]/20">
                <FileText className="w-6 h-6 text-[#265073]" />
              </div>
              <div className="text-2xl text-[#265073] font-bold">
                {candidates.filter(c => c.skills && c.skills.length > 0).length}
              </div>
              <div className="text-xs text-[#265073]/70">Có hồ sơ đầy đủ</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-[#9AD0C2]/40">
                <Briefcase className="w-6 h-6 text-[#265073]" />
              </div>
              <div className="text-2xl text-[#265073] font-bold">
                {candidates.filter(c => c.experience).length}
              </div>
              <div className="text-xs text-[#265073]/70">Có kinh nghiệm</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-[#FFB84D]/20">
                <Award className="w-6 h-6 text-[#FFB84D]" />
              </div>
              <div className="text-2xl text-[#FFB84D] font-bold">
                {candidates.filter(c => c.education).length}
              </div>
              <div className="text-xs text-[#265073]/70">Có học vấn</div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg mb-6"
        >
          <h3 className="text-[#265073] mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#2D9596]" />
            Bộ lọc tìm kiếm
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email, kỹ năng..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Experience Filter */}
            <div>
              <select
                value={experienceFilter}
                onChange={(e) => {
                  setExperienceFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
              >
                <option value="all">Tất cả kinh nghiệm</option>
                <option value="0-1">0-1 năm</option>
                <option value="1-3">1-3 năm</option>
                <option value="3-5">3-5 năm</option>
                <option value="5+">5+ năm</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={locationFilter}
                onChange={(e) => {
                  setLocationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
              >
                <option value="all">Tất cả địa điểm</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
              </select>
            </div>

            {/* Education Filter */}
            <div>
              <select
                value={educationFilter}
                onChange={(e) => {
                  setEducationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
              >
                <option value="all">Tất cả học vấn</option>
                <option value="highschool">Trung học</option>
                <option value="college">Cao đẳng</option>
                <option value="bachelor">Đại học</option>
                <option value="master">Thạc sĩ</option>
                <option value="phd">Tiến sĩ</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-[#2D9596] hover:text-[#265073] transition-colors"
            >
              Xóa lọc
            </button>
            <p className="text-sm text-[#265073]/70">
              Hiển thị {filteredCandidates.length} ứng viên
            </p>
          </div>
        </motion.div>

        {/* Candidates List */}
        {filteredCandidates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 border-2 border-[#9AD0C2] text-center"
          >
            <div className="w-24 h-24 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-[#2D9596]" />
            </div>
            <h3 className="text-[#265073] text-xl mb-3">
              Không tìm thấy ứng viên nào
            </h3>
            <p className="text-[#265073]/70">
              Thử thay đổi bộ lọc để tìm kiếm ứng viên phù hợp
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {paginatedCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {candidate.avatar && candidate.avatar.trim() !== "" ? (
                      <img
                        src={candidate.avatar}
                        alt={candidate.displayName}
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#9AD0C2]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white text-2xl font-bold border-2 border-[#9AD0C2]">
                        {candidate.displayName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#265073] text-xl font-semibold mb-1">
                      {candidate.displayName}
                    </h3>
                    {candidate.currentPosition && (
                      <p className="text-[#2D9596] font-medium text-sm mb-2">
                        {candidate.currentPosition}
                      </p>
                    )}
                    
                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#265073]/70 mb-3">
                      {candidate.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4 text-[#2D9596]" />
                          <span>{candidate.email}</span>
                        </div>
                      )}
                      {candidate.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4 text-[#2D9596]" />
                          <span>{candidate.phone}</span>
                        </div>
                      )}
                      {candidate.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#2D9596]" />
                          <span>{candidate.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Experience & Education */}
                    <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                      {candidate.experience && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-[#ECF4D6] rounded-lg">
                          <Briefcase className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-[#265073]">{candidate.experience}</span>
                        </div>
                      )}
                      {candidate.education && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-[#ECF4D6] rounded-lg">
                          <GraduationCap className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-[#265073]">{candidate.education}</span>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    {candidate.skills && candidate.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <Code className="w-4 h-4 text-[#2D9596] mt-1" />
                        {candidate.skills.slice(0, 6).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 6 && (
                          <span className="px-3 py-1 bg-[#265073] text-white rounded-full text-xs">
                            +{candidate.skills.length - 6}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 md:w-36">
                    <button
                      onClick={() => handleViewProfile(candidate)}
                      className="w-full px-4 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Xem hồ sơ
                    </button>
                    <button
                      onClick={() => handleOpenMessage(candidate)}
                      className="w-full px-4 py-2.5 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Nhắn tin
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Info & Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Pagination Info */}
          <div className="text-sm text-[#265073]">
            Hiển thị <span className="font-semibold">{paginatedCandidates.length}</span> / <span className="font-semibold">{filteredCandidates.length}</span> ứng viên
            {filteredCandidates.length !== candidates.length && (
              <span className="text-[#2D9596]"> (đã lọc từ {candidates.length} ứng viên)</span>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      currentPage === pageNum
                        ? "bg-[#2D9596] text-white"
                        : "border border-[#265073] text-[#265073] hover:bg-[#ECF4D6]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <span className="text-sm text-[#265073] ml-2">
                Trang {currentPage}/{totalPages}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ padding: '16px' }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowProfileModal(false)}
            />
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
              style={{ width: '450px', maxWidth: '90vw', maxHeight: '75vh' }}
            >
              {/* Modal Header - Compact */}
              <div className="bg-gradient-to-r from-[#2D9596] to-[#265073] px-4 py-3 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedCandidate.avatar && selectedCandidate.avatar.trim() !== "" ? (
                      <img
                        src={selectedCandidate.avatar}
                        alt={selectedCandidate.displayName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-base font-bold">
                        {selectedCandidate.displayName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                    <div>
                      <h2 className="text-sm font-bold">{selectedCandidate.displayName}</h2>
                      {selectedCandidate.currentPosition && (
                        <p className="text-white/80 text-xs">{selectedCandidate.currentPosition}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Contact Info */}
                <div className="mb-3">
                  <h3 className="text-[#265073] font-semibold text-xs mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#2D9596]" />
                    Thông tin liên hệ
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedCandidate.email && (
                      <div className="flex items-center gap-1.5 p-1.5 bg-[#ECF4D6] rounded text-xs">
                        <Mail className="w-3 h-3 text-[#2D9596]" />
                        <span className="text-[#265073] truncate">{selectedCandidate.email}</span>
                      </div>
                    )}
                    {selectedCandidate.phone && (
                      <div className="flex items-center gap-1.5 p-1.5 bg-[#ECF4D6] rounded text-xs">
                        <Phone className="w-3 h-3 text-[#2D9596]" />
                        <span className="text-[#265073]">{selectedCandidate.phone}</span>
                      </div>
                    )}
                    {selectedCandidate.location && (
                      <div className="flex items-center gap-1.5 p-1.5 bg-[#ECF4D6] rounded text-xs col-span-2">
                        <MapPin className="w-3 h-3 text-[#2D9596]" />
                        <span className="text-[#265073]">{selectedCandidate.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Links - CV, Portfolio, LinkedIn, GitHub */}
                {(selectedCandidate.cvUrl || selectedCandidate.portfolioUrl || selectedCandidate.linkedinUrl || selectedCandidate.githubUrl) && (
                  <div className="mb-3">
                    <h3 className="text-[#265073] font-semibold text-xs mb-1.5">Liên kết</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCandidate.cvUrl && (
                        <a href={selectedCandidate.cvUrl} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-1 px-2 py-1 bg-[#265073] text-white rounded text-xs hover:bg-[#2D9596] transition-colors">
                          <Download className="w-3 h-3" /> CV
                        </a>
                      )}
                      {selectedCandidate.portfolioUrl && (
                        <a href={selectedCandidate.portfolioUrl} target="_blank" rel="noopener noreferrer"
                           className="px-2 py-1 border border-[#2D9596] text-[#2D9596] rounded text-xs hover:bg-[#2D9596] hover:text-white transition-colors">
                          Portfolio
                        </a>
                      )}
                      {selectedCandidate.linkedinUrl && (
                        <a href={selectedCandidate.linkedinUrl} target="_blank" rel="noopener noreferrer"
                           className="px-2 py-1 border border-[#0077B5] text-[#0077B5] rounded text-xs hover:bg-[#0077B5] hover:text-white transition-colors">
                          LinkedIn
                        </a>
                      )}
                      {selectedCandidate.githubUrl && (
                        <a href={selectedCandidate.githubUrl} target="_blank" rel="noopener noreferrer"
                           className="px-2 py-1 border border-gray-700 text-gray-700 rounded text-xs hover:bg-gray-700 hover:text-white transition-colors">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Experience & Education - Compact */}
                <div className="mb-3">
                  <h3 className="text-[#265073] font-semibold text-xs mb-1.5 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#2D9596]" />
                    Kinh nghiệm & Học vấn
                  </h3>
                  <div className="grid grid-cols-3 gap-1.5">
                    {selectedCandidate.experience && (
                      <div className="p-1.5 bg-[#ECF4D6] rounded">
                        <div className="text-[10px] text-[#265073]/70">Kinh nghiệm</div>
                        <div className="text-[#265073] font-medium text-xs">{selectedCandidate.experience}</div>
                      </div>
                    )}
                    {selectedCandidate.education && (
                      <div className="p-1.5 bg-[#ECF4D6] rounded">
                        <div className="text-[10px] text-[#265073]/70">Học vấn</div>
                        <div className="text-[#265073] font-medium text-xs">{selectedCandidate.education}</div>
                      </div>
                    )}
                    {selectedCandidate.expectedSalary && (
                      <div className="p-1.5 bg-[#ECF4D6] rounded">
                        <div className="text-[10px] text-[#265073]/70">Lương</div>
                        <div className="text-[#265073] font-medium text-xs">{selectedCandidate.expectedSalary}</div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Skills - Compact */}
                {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-[#265073] font-semibold text-xs mb-1.5 flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-[#2D9596]" />
                      Kỹ năng
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.skills.slice(0, 8).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#9AD0C2] text-[#265073] rounded text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {selectedCandidate.skills.length > 8 && (
                        <span className="px-2 py-0.5 bg-[#265073] text-white rounded text-[10px]">
                          +{selectedCandidate.skills.length - 8}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Bio - Compact */}
                {selectedCandidate.bio && (
                  <div className="mb-3">
                    <h3 className="text-[#265073] font-semibold text-xs mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#2D9596]" />
                      Giới thiệu
                    </h3>
                    <p className="text-[#265073]/80 text-xs leading-relaxed bg-[#ECF4D6] p-2 rounded line-clamp-2">
                      {selectedCandidate.bio}
                    </p>
                  </div>
                )}

                {/* Languages & Certifications in one row */}
                <div className="grid grid-cols-2 gap-2">
                  {selectedCandidate.languages && selectedCandidate.languages.length > 0 && (
                    <div>
                      <h3 className="text-[#265073] font-semibold text-xs mb-1">Ngôn ngữ</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedCandidate.languages.map((lang, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 border border-[#2D9596] text-[#2D9596] rounded text-[10px]">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedCandidate.certifications && selectedCandidate.certifications.length > 0 && (
                    <div>
                      <h3 className="text-[#265073] font-semibold text-xs mb-1 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#2D9596]" />
                        Chứng chỉ
                      </h3>
                      <div className="space-y-0.5">
                        {selectedCandidate.certifications.slice(0, 2).map((cert, idx) => (
                          <div key={idx} className="p-1 bg-[#ECF4D6] rounded text-[#265073] text-[10px] truncate">
                            {cert}
                          </div>
                        ))}
                        {selectedCandidate.certifications.length > 2 && (
                          <span className="text-[10px] text-[#2D9596]">+{selectedCandidate.certifications.length - 2} khác</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer - Compact */}
              <div className="px-4 py-2 border-t border-[#9AD0C2] bg-white flex gap-2">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    handleOpenMessage(selectedCandidate);
                  }}
                  className="flex-1 px-3 py-1.5 bg-[#2D9596] text-white rounded hover:bg-[#265073] transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Nhắn tin
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="px-3 py-1.5 border border-[#9AD0C2] text-[#265073] rounded hover:bg-[#ECF4D6] transition-colors text-xs"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ padding: '16px' }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMessageModal(false)}
            />
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
              style={{ width: '350px', maxWidth: '90vw' }}
            >
              {/* Modal Header - Compact */}
              <div className="bg-[#265073] px-3 py-2 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedCandidate.avatar && selectedCandidate.avatar.trim() !== "" ? (
                    <img
                      src={selectedCandidate.avatar}
                      alt={selectedCandidate.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      {selectedCandidate.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-xs">{selectedCandidate.displayName || "Ứng viên"}</h3>
                    <p className="text-white/70 text-[10px]">{selectedCandidate.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message Content - Compact */}
              <div className="p-3">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  rows={3}
                  className="w-full px-2.5 py-2 border border-[#9AD0C2] rounded focus:border-[#2D9596] focus:outline-none resize-none transition-colors text-xs"
                />
              </div>

              {/* Modal Footer - Compact */}
              <div className="px-3 py-2 border-t border-[#9AD0C2] flex gap-1.5">
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || sendingMessage}
                  className="flex-1 px-3 py-1.5 bg-[#2D9596] text-white rounded hover:bg-[#265073] transition-colors flex items-center justify-center gap-1 text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingMessage ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      Gửi
                    </>
                  )}
                </button>
                <button
                  onClick={handleGoToMessages}
                  className="px-3 py-1.5 border border-[#2D9596] text-[#2D9596] rounded hover:bg-[#2D9596] hover:text-white transition-colors flex items-center gap-1 text-xs"
                >
                  <MessageSquare className="w-3 h-3" />
                  Chat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}