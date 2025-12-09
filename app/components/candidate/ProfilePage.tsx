"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  FileText,
  Upload,
  Sparkles,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Plus,
  X,
  Edit,
  Check,
  AlertCircle,
  ExternalLink,
  Trash2,
  Save,
  Camera,
  Loader2,
  Github,
  Download,
} from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import {
  getPersonalInfo,
  updatePersonalInfo,
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
  getEducations,
  addEducation,
  updateEducation,
  deleteEducation,
  getSkills,
  addSkill,
  deleteSkill,
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  PersonalInfo,
  Experience as ExpType,
  Education as EduType,
  Skill as SkillType,
  Certificate as CertType,
  Project as ProjType,
} from "@/lib/profileService";

type TabType =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "certificates"
  | "cv-upload";

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  gpa?: string;
  startDate: string;
  endDate: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface Project {
  id: string;
  name: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  description: string;
}

export function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Data từ Firebase
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [experiences, setExperiences] = useState<ExpType[]>([]);
  const [educations, setEducations] = useState<EduType[]>([]);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [certificates, setCertificates] = useState<CertType[]>([]);
  const [projects, setProjects] = useState<ProjType[]>([]);

  // Edit states
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editingProjId, setEditingProjId] = useState<string | null>(null);

  const [newSkill, setNewSkill] = useState("");

  const loadAllData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      console.log("Loading data for user:", user.uid);
      const [info, exp, edu, sk, cert, proj] = await Promise.all([
        getPersonalInfo(user.uid),
        getExperiences(user.uid),
        getEducations(user.uid),
        getSkills(user.uid),
        getCertificates(user.uid),
        getProjects(user.uid),
      ]);
      console.log("Loaded data:", { info, exp, edu, sk, cert, proj });
      setPersonalInfo(
        info || {
          uid: user.uid,
          email: user.email || "",
          fullName: "",
          updatedAt: new Date(),
        }
      );
      setExperiences(exp);
      setEducations(edu);
      setSkills(sk);
      setCertificates(cert);
      setProjects(proj);
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user, loadAllData]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !user) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        await updatePersonalInfo(user.uid, { avatarUrl: data.url });
        setPersonalInfo((prev) =>
          prev ? { ...prev, avatarUrl: data.url } : null
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Lỗi khi tải ảnh lên");
    } finally {
      setUploading(false);
    }
  };

  const handleSavePersonal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !personalInfo) return;
    try {
      await updatePersonalInfo(user.uid, {
        fullName: personalInfo.fullName,
        phone: personalInfo.phone,
        email: personalInfo.email,
        location: personalInfo.location,
        desiredPosition: personalInfo.desiredPosition,
        desiredSalary: personalInfo.desiredSalary,
        bio: personalInfo.bio,
      });
      await loadAllData();
      setEditingPersonal(false);
    } catch (error) {
      console.error("Error saving personal info:", error);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim() || !user) return;
    if (skills.some((s) => s.name === newSkill.trim())) return;
    await addSkill(user.uid, { name: newSkill.trim() });
    await loadAllData();
    setNewSkill("");
  };

  const handleRemoveSkill = async (id: string) => {
    await deleteSkill(id);
    setSkills(skills.filter((s) => s.id !== id));
  };

  // Experience handlers
  const [showAddExpForm, setShowAddExpForm] = useState(false);
  const [newExp, setNewExp] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await addExperience(user.uid, newExp);
    await loadAllData();
    setShowAddExpForm(false);
    setNewExp({ position: "", company: "", startDate: "", endDate: "", current: false, description: "" });
  };

  const handleUpdateExperience = async (id: string, data: Partial<ExpType>) => {
    await updateExperience(id, data);
    await loadAllData();
    setEditingExpId(null);
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa kinh nghiệm này?")) {
      await deleteExperience(id);
      await loadAllData();
    }
  };

  // Education handlers
  const [showAddEduForm, setShowAddEduForm] = useState(false);
  const [newEdu, setNewEdu] = useState({
    school: "",
    degree: "",
    major: "",
    gpa: "",
    startDate: "",
    endDate: "",
  });

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await addEducation(user.uid, newEdu);
    await loadAllData();
    setShowAddEduForm(false);
    setNewEdu({ school: "", degree: "", major: "", gpa: "", startDate: "", endDate: "" });
  };

  const handleUpdateEducation = async (id: string, data: Partial<EduType>) => {
    await updateEducation(id, data);
    await loadAllData();
    setEditingEduId(null);
  };

  const handleDeleteEducation = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa học vấn này?")) {
      await deleteEducation(id);
      await loadAllData();
    }
  };

  // Certificate handlers
  const [showAddCertForm, setShowAddCertForm] = useState(false);
  const [newCert, setNewCert] = useState({
    name: "",
    issuer: "",
    date: "",
  });

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await addCertificate(user.uid, newCert);
    await loadAllData();
    setShowAddCertForm(false);
    setNewCert({ name: "", issuer: "", date: "" });
  };

  const handleUpdateCertificate = async (id: string, data: Partial<CertType>) => {
    await updateCertificate(id, data);
    await loadAllData();
    setEditingCertId(null);
  };

  const handleDeleteCertificate = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa chứng chỉ này?")) {
      await deleteCertificate(id);
      await loadAllData();
    }
  };

  // Project handlers
  const [showAddProjForm, setShowAddProjForm] = useState(false);
  const [newProj, setNewProj] = useState({
    name: "",
    technologies: [] as string[],
    githubUrl: "",
    demoUrl: "",
    description: "",
  });

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await addProject(user.uid, newProj);
    await loadAllData();
    setShowAddProjForm(false);
    setNewProj({ name: "", technologies: [], githubUrl: "", demoUrl: "", description: "" });
  };

  const handleUpdateProject = async (id: string, data: Partial<ProjType>) => {
    await updateProject(id, data);
    await loadAllData();
    setEditingProjId(null);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa dự án này?")) {
      await deleteProject(id);
      await loadAllData();
    }
  };

  const tabs = [
    { id: "personal" as TabType, label: "Thông tin cá nhân", icon: User },
    { id: "experience" as TabType, label: "Kinh nghiệm", icon: Briefcase },
    { id: "education" as TabType, label: "Học vấn", icon: GraduationCap },
    { id: "skills" as TabType, label: "Kỹ năng", icon: Code },
    { id: "certificates" as TabType, label: "Chứng chỉ - Dự án", icon: Award },
    { id: "cv-upload" as TabType, label: "CV Đính kèm", icon: Upload },
  ];

  const profileCompletion = {
    personalInfo: !!personalInfo?.fullName,
    experience: experiences.length > 0,
    education: educations.length > 0,
    skills: skills.length > 0,
    certificates: certificates.length > 0,
    cvUpload: !!personalInfo?.cvFileUrl,
  };

  const completionPercentage = Math.round(
    (Object.values(profileCompletion).filter(Boolean).length /
      Object.values(profileCompletion).length) *
      100
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] flex items-center justify-center">
        <div className="text-[#265073] text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#ECF4D6] to-[#9AD0C2]/30 pt-8 pb-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#265073] text-3xl md:text-4xl mb-3"
              >
                Hồ sơ & CV của bạn
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#265073]/70 text-base"
              >
                Hoàn thiện hồ sơ để AI đề xuất việc làm chính xác hơn.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-48 h-48 hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1758520144417-e1c432042dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXN1bWUlMjBjdnxlbnwxfHx8fDE3NjMyMDc4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile illustration"
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#2D9596] rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 mb-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#2D9596] to-[#265073] p-1">
                    {personalInfo?.avatarUrl ? (
                      <Image
                        src={personalInfo.avatarUrl}
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#ECF4D6] flex items-center justify-center">
                        <User className="w-12 h-12 md:w-16 md:h-16 text-[#265073]" />
                      </div>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-[#2D9596] rounded-full p-2 cursor-pointer hover:bg-[#265073] transition-colors">
                    {uploading ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4 text-white" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-[#265073] text-2xl md:text-3xl mb-2">
                    {personalInfo?.fullName || "Chưa cập nhật"}
                  </h2>
                  <p className="text-[#2D9596] text-lg mb-4">
                    {personalInfo?.desiredPosition || "Chưa có vị trí mong muốn"}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-[#265073]/70 text-sm">
                    {personalInfo?.location && (
                      <div className="flex items-center gap-2">
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setEditingPersonal(!editingPersonal)}
                  className="bg-[#265073] hover:bg-[#2D9596] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Edit className="w-4 h-4" />
                  {editingPersonal ? "Hủy" : "Chỉnh sửa hồ sơ"}
                </button>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[20px] border-2 border-[#9AD0C2] mb-8 overflow-hidden shadow-lg"
            >
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[140px] px-4 py-4 flex flex-col items-center gap-2 transition-all duration-300 border-b-4 ${
                      activeTab === tab.id
                        ? "bg-[#2D9596] text-white border-[#265073]"
                        : "text-[#265073] border-transparent hover:bg-[#9AD0C2]/20"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-xs md:text-sm text-center">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg"
                >
                  <h3 className="text-[#265073] text-2xl mb-6">
                    Thông tin cá nhân
                  </h3>
                  
                  {editingPersonal ? (
                    // Edit Form
                    <form onSubmit={handleSavePersonal}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[#265073] mb-2">
                            Họ và tên
                          </label>
                          <input
                            type="text"
                            value={personalInfo?.fullName || ""}
                            onChange={(e) =>
                              setPersonalInfo((prev) =>
                                prev ? { ...prev, fullName: e.target.value } : null
                              )
                            }
                            className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#265073] mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={personalInfo?.email || ""}
                            onChange={(e) =>
                              setPersonalInfo((prev) =>
                                prev ? { ...prev, email: e.target.value } : null
                              )
                            }
                            className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#265073] mb-2">
                            Số điện thoại
                          </label>
                          <input
                            type="tel"
                            value={personalInfo?.phone || ""}
                            onChange={(e) =>
                              setPersonalInfo((prev) =>
                                prev ? { ...prev, phone: e.target.value } : null
                              )
                            }
                            className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[#265073] mb-2">
                            Vị trí mong muốn
                          </label>
                          <input
                            type="text"
                            value={personalInfo?.desiredPosition || ""}
                            onChange={(e) =>
                              setPersonalInfo((prev) =>
                                prev ? { ...prev, desiredPosition: e.target.value } : null
                              )
                            }
                            className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[#265073] mb-2">
                            Địa điểm làm việc
                          </label>
                          <input
                            type="text"
                            value={personalInfo?.location || ""}
                            onChange={(e) =>
                              setPersonalInfo((prev) =>
                                prev ? { ...prev, location: e.target.value } : null
                              )
                            }
                            className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[#265073] mb-2">
                            Mức lương kỳ vọng
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={personalInfo?.desiredSalary || ""}
                              onChange={(e) =>
                                setPersonalInfo((prev) =>
                                  prev ? { ...prev, desiredSalary: e.target.value } : null
                                )
                              }
                              placeholder="25,000,000 - 35,000,000 VNĐ"
                              className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors pl-10"
                            />
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596] pointer-events-none" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-[#265073] mb-2">
                          Mô tả bản thân
                        </label>
                        <textarea
                          rows={6}
                          value={personalInfo?.bio || ""}
                          onChange={(e) =>
                            setPersonalInfo((prev) =>
                              prev ? { ...prev, bio: e.target.value } : null
                            )
                          }
                          className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors resize-none"
                          placeholder="Giới thiệu về bản thân, kinh nghiệm, mục tiêu nghề nghiệp..."
                        />
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingPersonal(false)}
                          className="bg-gray-200 hover:bg-gray-300 text-[#265073] px-8 py-3 rounded-xl transition-all duration-300"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="bg-[#2D9596] hover:bg-[#265073] text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Lưu thay đổi
                        </button>
                      </div>
                    </form>
                  ) : (
                    // Display View
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[#265073]/70 text-sm mb-1">
                            Họ và tên
                          </label>
                          <p className="text-[#265073] text-lg">
                            {personalInfo?.fullName || "Chưa cập nhật"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-[#265073]/70 text-sm mb-1">
                            Email
                          </label>
                          <p className="text-[#265073] text-lg">
                            {personalInfo?.email || "Chưa cập nhật"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-[#265073]/70 text-sm mb-1">
                            Số điện thoại
                          </label>
                          <p className="text-[#265073] text-lg">
                            {personalInfo?.phone || "Chưa cập nhật"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-[#265073]/70 text-sm mb-1">
                            Vị trí mong muốn
                          </label>
                          <p className="text-[#265073] text-lg">
                            {personalInfo?.desiredPosition || "Chưa cập nhật"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-[#265073]/70 text-sm mb-1">
                            Địa điểm làm việc
                          </label>
                          <p className="text-[#265073] text-lg">
                            {personalInfo?.location || "Chưa cập nhật"}
                          </p>
                        </div>
                        <div>
                          <label className="block text-[#265073]/70 text-sm mb-1">
                            Mức lương kỳ vọng
                          </label>
                          <p className="text-[#265073] text-lg">
                            {personalInfo?.desiredSalary || "Chưa cập nhật"}
                          </p>
                        </div>
                      </div>
                      {personalInfo?.bio && (
                        <div>
                          <label className="block text-[#265073]/70 text-sm mb-1">
                            Mô tả bản thân
                          </label>
                          <p className="text-[#265073] whitespace-pre-wrap">
                            {personalInfo.bio}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#265073] text-2xl">
                        Kinh nghiệm làm việc
                      </h3>
                      <button 
                        onClick={() => setShowAddExpForm(!showAddExpForm)}
                        className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <Plus className="w-4 h-4" />
                        {showAddExpForm ? "Hủy" : "Thêm kinh nghiệm"}
                      </button>
                    </div>

                    {/* Add Experience Form */}
                    {showAddExpForm && (
                      <form onSubmit={handleAddExperience} className="mb-6 p-6 bg-[#ECF4D6] rounded-xl border-2 border-[#9AD0C2]">
                        <h4 className="text-[#265073] text-lg mb-4">Thêm kinh nghiệm mới</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#265073] mb-2">Vị trí *</label>
                            <input
                              type="text"
                              value={newExp.position}
                              onChange={(e) => setNewExp({...newExp, position: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Công ty *</label>
                            <input
                              type="text"
                              value={newExp.company}
                              onChange={(e) => setNewExp({...newExp, company: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Ngày bắt đầu *</label>
                            <input
                              type="month"
                              value={newExp.startDate}
                              onChange={(e) => setNewExp({...newExp, startDate: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Ngày kết thúc</label>
                            <input
                              type="month"
                              value={newExp.endDate}
                              onChange={(e) => setNewExp({...newExp, endDate: e.target.value})}
                              disabled={newExp.current}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none disabled:bg-gray-100"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-[#265073]">
                              <input
                                type="checkbox"
                                checked={newExp.current}
                                onChange={(e) => setNewExp({...newExp, current: e.target.checked, endDate: e.target.checked ? "" : newExp.endDate})}
                                className="w-4 h-4"
                              />
                              Đang làm việc tại đây
                            </label>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[#265073] mb-2">Mô tả công việc *</label>
                            <textarea
                              value={newExp.description}
                              onChange={(e) => setNewExp({...newExp, description: e.target.value})}
                              rows={4}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none resize-none"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setShowAddExpForm(false)}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-[#265073] rounded-xl transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#2D9596] hover:bg-[#265073] text-white rounded-xl transition-colors"
                          >
                            Lưu
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Experience List */}
                    <div className="space-y-6">
                      {experiences.length === 0 ? (
                        <p className="text-[#265073]/60 text-center py-8">
                          Chưa có kinh nghiệm làm việc nào. Nhấn "Thêm kinh nghiệm" để bắt đầu.
                        </p>
                      ) : (
                        experiences.map((exp) => (
                          <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-6 relative"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="text-[#265073] text-xl">
                                    {exp.position}
                                  </h4>
                                  {exp.current && (
                                    <span className="bg-[#2D9596] text-white px-3 py-1 rounded-full text-xs">
                                      Hiện tại
                                    </span>
                                  )}
                                </div>
                                <p className="text-[#2D9596] mb-2">
                                  {exp.company}
                                </p>
                                <p className="text-[#265073]/60 text-sm mb-3">
                                  {exp.startDate} - {exp.current ? "Hiện tại" : exp.endDate}
                                </p>
                                <p className="text-[#265073]/80 leading-relaxed whitespace-pre-wrap">
                                  {exp.description}
                                </p>
                              </div>
                              <div className="flex gap-2 shrink-0">
                                <button 
                                  onClick={() => handleDeleteExperience(exp.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#265073] text-2xl">Học vấn</h3>
                      <button 
                        onClick={() => setShowAddEduForm(!showAddEduForm)}
                        className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <Plus className="w-4 h-4" />
                        {showAddEduForm ? "Hủy" : "Thêm học vấn"}
                      </button>
                    </div>

                    {/* Add Education Form */}
                    {showAddEduForm && (
                      <form onSubmit={handleAddEducation} className="mb-6 p-6 bg-[#ECF4D6] rounded-xl border-2 border-[#9AD0C2]">
                        <h4 className="text-[#265073] text-lg mb-4">Thêm học vấn mới</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#265073] mb-2">Trường học *</label>
                            <input
                              type="text"
                              value={newEdu.school}
                              onChange={(e) => setNewEdu({...newEdu, school: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Bằng cấp *</label>
                            <input
                              type="text"
                              value={newEdu.degree}
                              onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})}
                              placeholder="Cử nhân, Thạc sĩ, Tiến sĩ..."
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Chuyên ngành *</label>
                            <input
                              type="text"
                              value={newEdu.major}
                              onChange={(e) => setNewEdu({...newEdu, major: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">GPA</label>
                            <input
                              type="text"
                              value={newEdu.gpa}
                              onChange={(e) => setNewEdu({...newEdu, gpa: e.target.value})}
                              placeholder="3.5"
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Ngày bắt đầu *</label>
                            <input
                              type="month"
                              value={newEdu.startDate}
                              onChange={(e) => setNewEdu({...newEdu, startDate: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Ngày kết thúc *</label>
                            <input
                              type="month"
                              value={newEdu.endDate}
                              onChange={(e) => setNewEdu({...newEdu, endDate: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setShowAddEduForm(false)}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-[#265073] rounded-xl transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#2D9596] hover:bg-[#265073] text-white rounded-xl transition-colors"
                          >
                            Lưu
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Education List */}
                    <div className="space-y-6">
                      {educations.length === 0 ? (
                        <p className="text-[#265073]/60 text-center py-8">
                          Chưa có học vấn nào.
                        </p>
                      ) : (
                        educations.map((edu) => (
                          <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-6"
                          >
                            <div className="flex items-start gap-4">
                              <div className="bg-[#2D9596] rounded-full p-3 shrink-0">
                                <GraduationCap className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-[#265073] text-xl mb-1">
                                  {edu.school}
                                </h4>
                                <p className="text-[#2D9596] mb-2">
                                  {edu.degree} - {edu.major}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-[#265073]/60">
                                  <span>
                                    {edu.startDate} - {edu.endDate}
                                  </span>
                                  {edu.gpa && <span>GPA: {edu.gpa}/4.0</span>}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleDeleteEducation(edu.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <h3 className="text-[#265073] text-2xl mb-6">
                      Kỹ năng của bạn
                    </h3>

                    {/* Add Skill Input */}
                    <div className="flex gap-3 mb-6">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleAddSkill();
                        }}
                        placeholder="Thêm kỹ năng mới..."
                        className="flex-1 px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-colors"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="bg-[#2D9596] hover:bg-[#265073] text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <Plus className="w-5 h-5" />
                        Thêm
                      </button>
                    </div>

                    {/* Skills by Category */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[#265073] mb-3">
                          Tất cả kỹ năng
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {skills.map((skill) => (
                            <motion.div
                              key={skill.id}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-[#2D9596] text-white px-4 py-2 rounded-full flex items-center gap-2 group hover:bg-[#265073] transition-colors"
                            >
                              <span>{skill.name}</span>
                              <button
                                onClick={() => handleRemoveSkill(skill.id)}
                                className="opacity-70 hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                          {skills.length === 0 && (
                            <p className="text-[#265073]/60">
                              Chưa có kỹ năng nào. Hãy thêm kỹ năng của bạn!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>


                </motion.div>
              )}

              {/* Certificates & Projects Tab */}
              {activeTab === "certificates" && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Certificates */}
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#265073] text-2xl">Chứng chỉ</h3>
                      <button 
                        onClick={() => setShowAddCertForm(!showAddCertForm)}
                        className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <Plus className="w-4 h-4" />
                        {showAddCertForm ? "Hủy" : "Thêm chứng chỉ"}
                      </button>
                    </div>

                    {/* Add Certificate Form */}
                    {showAddCertForm && (
                      <form onSubmit={handleAddCertificate} className="mb-6 p-6 bg-[#ECF4D6] rounded-xl border-2 border-[#9AD0C2]">
                        <h4 className="text-[#265073] text-lg mb-4">Thêm chứng chỉ mới</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[#265073] mb-2">Tên chứng chỉ *</label>
                            <input
                              type="text"
                              value={newCert.name}
                              onChange={(e) => setNewCert({...newCert, name: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Đơn vị cấp *</label>
                            <input
                              type="text"
                              value={newCert.issuer}
                              onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Ngày cấp *</label>
                            <input
                              type="month"
                              value={newCert.date}
                              onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setShowAddCertForm(false)}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-[#265073] rounded-xl transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#2D9596] hover:bg-[#265073] text-white rounded-xl transition-colors"
                          >
                            Lưu
                          </button>
                        </div>
                      </form>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certificates.length === 0 ? (
                        <p className="text-[#265073]/60 text-center py-8 col-span-2">
                          Chưa có chứng chỉ nào. Nhấn &quot;Thêm chứng chỉ&quot; để bắt đầu.
                        </p>
                      ) : (
                        certificates.map((cert) => (
                          <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-4 hover:border-[#2D9596] transition-colors relative"
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-[#2D9596] rounded-lg p-2 shrink-0">
                                <Award className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-[#265073] mb-1">
                                  {cert.name}
                                </h4>
                                <p className="text-[#2D9596] text-sm mb-1">
                                  {cert.issuer}
                                </p>
                                <p className="text-[#265073]/60 text-xs">
                                  {cert.date}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDeleteCertificate(cert.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-[#265073] text-2xl">Dự án</h3>
                      <button 
                        onClick={() => setShowAddProjForm(!showAddProjForm)}
                        className="bg-[#2D9596] hover:bg-[#265073] text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <Plus className="w-4 h-4" />
                        {showAddProjForm ? "Hủy" : "Thêm dự án"}
                      </button>
                    </div>

                    {/* Add Project Form */}
                    {showAddProjForm && (
                      <form onSubmit={handleAddProject} className="mb-6 p-6 bg-[#ECF4D6] rounded-xl border-2 border-[#9AD0C2]">
                        <h4 className="text-[#265073] text-lg mb-4">Thêm dự án mới</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-[#265073] mb-2">Tên dự án *</label>
                            <input
                              type="text"
                              value={newProj.name}
                              onChange={(e) => setNewProj({...newProj, name: e.target.value})}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Công nghệ sử dụng (phân cách bằng dấu phẩy) *</label>
                            <input
                              type="text"
                              defaultValue={newProj.technologies.join(", ")}
                              onChange={(e) => setNewProj({...newProj, technologies: e.target.value.split(",").map(t => t.trim()).filter(t => t)})}
                              placeholder="React, TypeScript, Node.js"
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[#265073] mb-2">GitHub URL</label>
                              <input
                                type="url"
                                value={newProj.githubUrl}
                                onChange={(e) => setNewProj({...newProj, githubUrl: e.target.value})}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[#265073] mb-2">Demo URL</label>
                              <input
                                type="url"
                                value={newProj.demoUrl}
                                onChange={(e) => setNewProj({...newProj, demoUrl: e.target.value})}
                                placeholder="https://demo.com"
                                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[#265073] mb-2">Mô tả dự án *</label>
                            <textarea
                              value={newProj.description}
                              onChange={(e) => setNewProj({...newProj, description: e.target.value})}
                              rows={4}
                              className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none resize-none"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            type="button"
                            onClick={() => setShowAddProjForm(false)}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-[#265073] rounded-xl transition-colors"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#2D9596] hover:bg-[#265073] text-white rounded-xl transition-colors"
                          >
                            Lưu
                          </button>
                        </div>
                      </form>
                    )}
                    <div className="space-y-6">
                      {projects.length === 0 ? (
                        <p className="text-[#265073]/60 text-center py-8">
                          Chưa có dự án nào. Nhấn &quot;Thêm dự án&quot; để bắt đầu.
                        </p>
                      ) : (
                        projects.map((project) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-6 relative"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-[#265073] text-xl flex-1">
                                {project.name}
                              </h4>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="bg-[#2D9596] text-white px-3 py-1 rounded-full text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <p className="text-[#265073]/80 mb-4 leading-relaxed whitespace-pre-wrap">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#2D9596] hover:text-[#265073] flex items-center gap-2 transition-colors"
                                >
                                  <Github className="w-4 h-4" />
                                  GitHub
                                </a>
                              )}
                              {project.demoUrl && (
                                <a
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#2D9596] hover:text-[#265073] flex items-center gap-2 transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  Live Demo
                                </a>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CV Upload Tab */}
              {/* CV Upload Tab */}
              {activeTab === "cv-upload" && (
                <motion.div
                  key="cv-upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 md:p-8 shadow-lg"
                >
                  <h3 className="text-[#265073] text-2xl mb-6 font-bold">
                    CV Đính kèm
                  </h3>
                  
                  {/* Upload Area */}
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        // Validate file size
                        if (file.size > 5 * 1024 * 1024) {
                          alert('File quá lớn! Vui lòng chọn file nhỏ hơn 5MB');
                          e.target.value = '';
                          return;
                        }

                        setUploading(true);
                        const formData = new FormData();
                        formData.append('file', file);

                        try {
                          const response = await fetch('/api/upload-cv', {
                            method: 'POST',
                            body: formData,
                          });

                          const data = await response.json();

                          if (response.ok) {
                            // Update personalInfo with CV file
                            const updatedInfo = {
                              ...personalInfo!,
                              cvFileUrl: data.url,
                              cvFileName: data.fileName,
                            };
                            setPersonalInfo(updatedInfo);
                            
                            // Save to Firebase
                            if (user) {
                              await updatePersonalInfo(user.uid, updatedInfo);
                            }
                            
                            alert('Tải CV thành công!');
                          } else {
                            alert(data.error || 'Upload thất bại');
                          }
                        } catch (error) {
                          console.error('Error uploading CV:', error);
                          alert('Lỗi khi tải file. Vui lòng thử lại!');
                        } finally {
                          setUploading(false);
                          e.target.value = '';
                        }
                      }}
                      className="hidden"
                      id="cv-file-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="cv-file-upload"
                      className={`block border-2 border-dashed border-[#2D9596] rounded-xl p-12 text-center hover:bg-[#ECF4D6] transition-colors ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      {uploading ? (
                        <Loader2 className="w-16 h-16 text-[#2D9596] mx-auto mb-4 animate-spin" />
                      ) : (
                        <Upload className="w-16 h-16 text-[#2D9596] mx-auto mb-4" />
                      )}
                      <h4 className="text-[#265073] text-lg mb-2 font-semibold">
                        {uploading ? 'Đang tải lên...' : 'Kéo thả CV vào đây hoặc bấm để chọn file'}
                      </h4>
                      <p className="text-[#265073]/60 text-sm mb-4">
                        Hỗ trợ định dạng PDF, DOC, DOCX (tối đa 5MB)
                      </p>
                      {!uploading && (
                        <span className="inline-block bg-[#2D9596] hover:bg-[#265073] text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg">
                          Chọn file
                        </span>
                      )}
                    </label>
                  </div>

                  {/* Uploaded Files */}
                  {personalInfo?.cvFileUrl && (
                    <div className="mt-8">
                      <h4 className="text-[#265073] font-semibold mb-4">File đã tải lên</h4>
                      <div className="space-y-3">
                        <div className="bg-[#ECF4D6] border-2 border-[#9AD0C2] rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="bg-[#2D9596] rounded-lg p-3 shrink-0">
                              <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[#265073] font-medium truncate">
                                {personalInfo.cvFileName || 'CV_file.pdf'}
                              </p>
                              <p className="text-[#265073]/60 text-sm">
                                {(Math.random() * 3 + 1).toFixed(1)} MB • Tải lên ngày {new Date().toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={personalInfo.cvFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2D9596] hover:text-[#265073] p-2 transition-colors"
                              title="Xem CV"
                            >
                              <Download className="w-5 h-5" />
                            </a>
                            <button
                              onClick={async () => {
                                if (confirm('Bạn có chắc muốn xóa CV này?')) {
                                  const updatedInfo = {
                                    ...personalInfo,
                                    cvFileUrl: undefined,
                                    cvFileName: undefined,
                                  };
                                  setPersonalInfo(updatedInfo);
                                  
                                  if (user) {
                                    await updatePersonalInfo(user.uid, updatedInfo);
                                  }
                                }
                              }}
                              className="text-red-500 hover:text-red-700 p-2 transition-colors"
                              title="Xóa CV"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Profile Completion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-[20px] border-2 border-[#9AD0C2] p-6 shadow-lg sticky top-24">
              <h3 className="text-[#265073] text-xl mb-4">
                Hoàn thiện hồ sơ
              </h3>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#265073]/70 text-sm">
                    Tiến độ hoàn thành
                  </span>
                  <span className="text-[#2D9596]">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-[#ECF4D6] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#2D9596] to-[#265073] rounded-full"
                  />
                </div>
              </div>

              {/* Completion Checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className={`${profileCompletion.personalInfo ? 'bg-[#2D9596]' : 'bg-[#ECF4D6] border-2 border-[#2D9596]'} rounded-full p-1`}>
                    {profileCompletion.personalInfo ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                    )}
                  </div>
                  <span className="text-[#265073]">Thông tin cá nhân</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className={`${profileCompletion.experience ? 'bg-[#2D9596]' : 'bg-[#ECF4D6] border-2 border-[#2D9596]'} rounded-full p-1`}>
                    {profileCompletion.experience ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                    )}
                  </div>
                  <span className="text-[#265073]">Kinh nghiệm</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className={`${profileCompletion.education ? 'bg-[#2D9596]' : 'bg-[#ECF4D6] border-2 border-[#2D9596]'} rounded-full p-1`}>
                    {profileCompletion.education ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                    )}
                  </div>
                  <span className="text-[#265073]">Học vấn</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className={`${profileCompletion.skills ? 'bg-[#2D9596]' : 'bg-[#ECF4D6] border-2 border-[#2D9596]'} rounded-full p-1`}>
                    {profileCompletion.skills ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                    )}
                  </div>
                  <span className="text-[#265073]">Kỹ năng</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className={`${profileCompletion.certificates ? 'bg-[#2D9596]' : 'bg-[#ECF4D6] border-2 border-[#2D9596]'} rounded-full p-1`}>
                    {profileCompletion.certificates ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                    )}
                  </div>
                  <span className="text-[#265073]">Chứng chỉ - Dự án</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className={`${profileCompletion.cvUpload ? 'bg-[#2D9596]' : 'bg-[#ECF4D6] border-2 border-[#2D9596]'} rounded-full p-1`}>
                    {profileCompletion.cvUpload ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#2D9596]" />
                    )}
                  </div>
                  <span className="text-[#265073]">CV đính kèm</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button className="w-full bg-[#2D9596] hover:bg-[#265073] text-white py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Hoàn thiện hồ sơ
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

