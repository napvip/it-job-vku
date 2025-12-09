"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  ChevronLeft,
  Star,
  Heart,
  Share2,
  ExternalLink,
} from "lucide-react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Company {
  id: string;
  companyName: string;
  displayName: string;
  logo?: string;
  industry?: string;
  location?: string;
  companySize?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  founded?: string;
  about?: string;
  mission?: string;
  culture?: string;
  benefits?: string[];
  technologies?: string[];
  images?: string[];
  createdAt?: Date;
}

interface Job {
  id: string;
  title: string;
  location?: string;
  salary?: string;
  type?: string;
  skills?: string[];
  createdAt?: Date;
}

interface CompanyDetailPageProps {
  companyId: string | null;
}

export function CompanyDetailPage({ companyId }: CompanyDetailPageProps) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (companyId) {
      loadCompanyData();
    }
  }, [companyId]);

  const loadCompanyData = async () => {
    if (!companyId) return;

    try {
      setLoading(true);

      // Load company data
      const companyDoc = await getDoc(doc(db, "users", companyId));
      if (companyDoc.exists()) {
        const data = companyDoc.data();
        setCompany({
          id: companyDoc.id,
          companyName: data.companyName || data.displayName || "Công ty",
          displayName: data.displayName || "",
          logo: data.logo || "",
          industry: data.industry || data.companyIndustry || "",
          location: data.location || data.companyLocation || "",
          companySize: data.companySize || data.size || "",
          description: data.description || data.companyDescription || data.about || "",
          website: data.website || data.companyWebsite || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || data.companyAddress || "",
          founded: data.founded || data.establishedYear || "",
          about: data.about || data.companyAbout || "",
          mission: data.mission || "",
          culture: data.culture || "",
          benefits: data.benefits || [],
          technologies: data.technologies || data.techStack || [],
          images: data.images || data.companyImages || [],
        });
      }

      // Load jobs for this company
      const jobsRef = collection(db, "jobs");
      const jobsQuery = query(jobsRef, where("employerId", "==", companyId));
      const jobsSnapshot = await getDocs(jobsQuery);

      const jobList: Job[] = [];
      jobsSnapshot.forEach((doc) => {
        const data = doc.data();
        jobList.push({
          id: doc.id,
          title: data.title || "",
          location: data.location || "",
          salary: data.salary || data.salaryRange || "",
          type: data.type || data.jobType || "",
          skills: data.skills || data.requirements || [],
          createdAt: data.createdAt?.toDate(),
        });
      });

      setJobs(jobList);
    } catch (error) {
      console.error("Error loading company:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (jobId: string) => {
    router.push(`/job/${jobId}`);
  };

  const getTimeAgo = (date?: Date) => {
    if (!date) return "";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Hôm nay";
    if (days === 1) return "Hôm qua";
    if (days < 7) return `${days} ngày trước`;
    if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
    return `${Math.floor(days / 30)} tháng trước`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải thông tin công ty...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
          <h2 className="text-2xl text-[#265073] font-bold mb-2">Không tìm thấy công ty</h2>
          <p className="text-[#265073]/70 mb-4">Công ty này không tồn tại hoặc đã bị xóa</p>
          <button
            onClick={() => router.push("/companies")}
            className="px-6 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
          >
            Xem danh sách công ty
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#265073] to-[#2D9596] pt-20 pb-32">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Quay lại
          </button>
        </div>
      </div>

      {/* Company Card */}
      <div className="container mx-auto px-4 -mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.companyName}
                className="w-24 h-24 rounded-xl object-cover border-2 border-[#9AD0C2]"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white text-3xl font-bold">
                {company.companyName?.charAt(0)?.toUpperCase() || "C"}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#265073] mb-2">
                {company.companyName}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-[#265073]/80 mb-4">
                {company.industry && (
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-[#2D9596]" />
                    {company.industry}
                  </div>
                )}
                {company.companySize && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#2D9596]" />
                    {company.companySize}
                  </div>
                )}
                {company.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#2D9596]" />
                    {company.location}
                  </div>
                )}
                {company.website && (
                  <a
                    href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#2D9596] hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    {company.website}
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors font-medium"
                >
                  Xem {jobs.length} việc đang tuyển
                </button>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2.5 border-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                    isFollowing
                      ? "border-red-400 text-red-500 bg-red-50"
                      : "border-[#9AD0C2] text-[#265073] hover:bg-[#ECF4D6]"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFollowing ? "fill-current" : ""}`} />
                  {isFollowing ? "Đang theo dõi" : "Theo dõi công ty"}
                </button>
                <button className="p-2.5 border-2 border-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 pb-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-[#265073] mb-4">Giới thiệu công ty</h2>
              {company.description ? (
                <p className="text-[#265073]/80 leading-relaxed whitespace-pre-line">
                  {company.description}
                </p>
              ) : (
                <p className="text-[#265073]/50 italic">Chưa có thông tin giới thiệu</p>
              )}

              {company.mission && (
                <div className="mt-4 p-4 bg-[#ECF4D6] rounded-lg">
                  <h3 className="font-semibold text-[#265073] mb-2">Sứ mệnh</h3>
                  <p className="text-[#265073]/80">{company.mission}</p>
                </div>
              )}
            </motion.div>

            {/* Technologies */}
            {company.technologies && company.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-[#265073] mb-4">Công nghệ sử dụng</h2>
                <div className="flex flex-wrap gap-2">
                  {company.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Benefits */}
            {company.benefits && company.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-[#265073] mb-4">Phúc lợi</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {company.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-[#ECF4D6] rounded-lg"
                    >
                      <Star className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                      <span className="text-[#265073]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Company Images */}
            {company.images && company.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h2 className="text-xl font-bold text-[#265073] mb-4">Hình ảnh công ty</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {company.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${company.companyName} - ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Jobs */}
            <motion.div
              id="jobs-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-[#265073] mb-4">
                Việc làm đang tuyển ({jobs.length})
              </h2>

              {jobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-[#9AD0C2] mx-auto mb-3" />
                  <p className="text-[#265073]/70">Hiện tại công ty chưa có việc làm nào</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleJobClick(job.id)}
                      className="p-4 border border-[#9AD0C2] rounded-xl hover:shadow-md hover:border-[#2D9596] transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[#265073] group-hover:text-[#2D9596] transition-colors">
                          {job.title}
                        </h3>
                        <span className="text-sm text-[#265073]/60">{getTimeAgo(job.createdAt)}</span>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-[#265073]/80 mb-3">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-[#2D9596]" />
                            {job.location}
                          </span>
                        )}
                        {job.salary && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4 text-[#2D9596]" />
                            {job.salary}
                          </span>
                        )}
                        {job.type && (
                          <span className="px-2 py-0.5 bg-[#ECF4D6] text-[#265073] rounded text-xs">
                            {job.type}
                          </span>
                        )}
                      </div>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {job.skills.slice(0, 5).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-[#9AD0C2]/50 text-[#265073] rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="text-xs text-[#2D9596]">+{job.skills.length - 5}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-lg font-bold text-[#265073] mb-4">Thông tin liên hệ</h2>
              <div className="space-y-4">
                {company.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#2D9596] mt-0.5" />
                    <div>
                      <div className="text-sm text-[#265073]/70">Email</div>
                      <a href={`mailto:${company.email}`} className="text-[#2D9596] hover:underline">
                        {company.email}
                      </a>
                    </div>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#2D9596] mt-0.5" />
                    <div>
                      <div className="text-sm text-[#265073]/70">Số điện thoại</div>
                      <a href={`tel:${company.phone}`} className="text-[#2D9596] hover:underline">
                        {company.phone}
                      </a>
                    </div>
                  </div>
                )}
                {company.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#2D9596] mt-0.5" />
                    <div>
                      <div className="text-sm text-[#265073]/70">Địa chỉ</div>
                      <div className="text-[#265073]">{company.address}</div>
                    </div>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-[#2D9596] mt-0.5" />
                    <div>
                      <div className="text-sm text-[#265073]/70">Website</div>
                      <a
                        href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2D9596] hover:underline flex items-center gap-1"
                      >
                        {company.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-lg font-bold text-[#265073] mb-4">Thông tin nhanh</h2>
              <div className="space-y-3">
                {company.founded && (
                  <div className="flex justify-between">
                    <span className="text-[#265073]/70">Năm thành lập</span>
                    <span className="font-medium text-[#265073]">{company.founded}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Quy mô</span>
                  <span className="font-medium text-[#265073]">{company.companySize || "Chưa cập nhật"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Ngành nghề</span>
                  <span className="font-medium text-[#265073]">{company.industry || "Chưa cập nhật"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#265073]/70">Việc làm</span>
                  <span className="font-medium text-[#2D9596]">{jobs.length} vị trí</span>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl shadow-md p-6 text-white text-center"
            >
              <h3 className="font-bold text-lg mb-2">Quan tâm đến công ty này?</h3>
              <p className="text-white/80 text-sm mb-4">
                Theo dõi để nhận thông báo khi có việc làm mới
              </p>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? "bg-white text-[#265073]"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                {isFollowing ? "✓ Đang theo dõi" : "Theo dõi công ty"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}