"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Users,
  Briefcase,
  Bell,
  BellOff,
  Eye,
  X,
  Heart,
  TrendingUp,
  Target,
  Award,
  ChevronLeft,
  ChevronRight,
  Building,
  Sparkles,
} from "lucide-react";

interface FollowingCompany {
  id: number;
  name: string;
  logo: string;
  industry: string[];
  location: string;
  size: string;
  type: "Product" | "Outsourcing" | "Startup" | "Enterprise";
  activeJobs: number;
  notificationEnabled: boolean;
  followedDate: string;
}

interface FollowingCompaniesPageProps {
  onCompanyClick?: (companyId: number) => void;
  onViewJobs?: (companyId: number) => void;
}

export function FollowingCompaniesPage({
  onCompanyClick,
  onViewJobs,
}: FollowingCompaniesPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [companies, setCompanies] = useState<FollowingCompany[]>([
    {
      id: 1,
      name: "TechViet Solutions",
      logo: "🚀",
      industry: ["Software Development", "AI", "Cloud"],
      location: "Hà Nội",
      size: "51-200",
      type: "Product",
      activeJobs: 5,
      notificationEnabled: true,
      followedDate: "15/11/2025",
    },
    {
      id: 2,
      name: "Digital Innovation Hub",
      logo: "💡",
      industry: ["E-Commerce", "Fintech", "Mobile"],
      location: "TP.HCM",
      size: "200+",
      type: "Enterprise",
      activeJobs: 12,
      notificationEnabled: true,
      followedDate: "10/11/2025",
    },
    {
      id: 3,
      name: "StartUp AI Vietnam",
      logo: "🤖",
      industry: ["AI", "Machine Learning", "Data"],
      location: "Hà Nội",
      size: "11-50",
      type: "Startup",
      activeJobs: 3,
      notificationEnabled: false,
      followedDate: "05/11/2025",
    },
    {
      id: 4,
      name: "Cloud Systems Corp",
      logo: "☁️",
      industry: ["Cloud Infrastructure", "DevOps"],
      location: "Đà Nẵng",
      size: "51-200",
      type: "Product",
      activeJobs: 7,
      notificationEnabled: true,
      followedDate: "01/11/2025",
    },
    {
      id: 5,
      name: "Global Outsourcing VN",
      logo: "🌐",
      industry: ["Outsourcing", "Web Development"],
      location: "TP.HCM",
      size: "200+",
      type: "Outsourcing",
      activeJobs: 15,
      notificationEnabled: false,
      followedDate: "28/10/2025",
    },
  ]);

  const suggestedCompanies = [
    {
      id: 101,
      name: "FPT Software",
      logo: "🏢",
      reason: "Cùng tech stack: ReactJS, Node.js",
      jobs: 25,
    },
    {
      id: 102,
      name: "VNG Corporation",
      logo: "🎮",
      reason: "Cùng địa điểm: TP.HCM",
      jobs: 18,
    },
    {
      id: 103,
      name: "Tiki Technology",
      logo: "🛒",
      reason: "Lĩnh vực E-Commerce",
      jobs: 12,
    },
  ];

  const handleToggleNotification = (companyId: number) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? { ...company, notificationEnabled: !company.notificationEnabled }
          : company
      )
    );
  };

  const handleUnfollow = (companyId: number) => {
    setCompanies((prev) => prev.filter((company) => company.id !== companyId));
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "all" ? true : company.location === locationFilter;
    const matchesType =
      typeFilter === "all" ? true : company.type === typeFilter;
    const matchesSize =
      sizeFilter === "all" ? true : company.size === sizeFilter;

    return matchesSearch && matchesLocation && matchesType && matchesSize;
  });

  const hasCompanies = filteredCompanies.length > 0;
  const totalActiveJobs = companies.reduce(
    (sum, company) => sum + company.activeJobs,
    0
  );
  const companiesWithJobs = companies.filter(
    (company) => company.activeJobs > 0
  ).length;

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* ========== HEADER ========== */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#265073] text-4xl mb-3">
              Công ty bạn đang theo dõi
            </h1>
            <p className="text-[#2D9596] text-lg">
              Nhận thông báo khi các công ty này đăng tin tuyển dụng mới phù
              hợp với bạn.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ========== FILTER BAR ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-[#265073] text-sm mb-2">
                Từ khóa
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tên công ty..."
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Địa điểm
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              >
                <option value="all">Tất cả</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Loại hình
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              >
                <option value="all">Tất cả</option>
                <option value="Product">Product</option>
                <option value="Outsourcing">Outsourcing</option>
                <option value="Startup">Startup</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-[#265073] text-sm mb-2">
                Quy mô
              </label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              >
                <option value="all">Tất cả</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="200+">200+</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-2">
              <button className="flex-1 px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors">
                Áp dụng
              </button>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("all");
                  setTypeFilter("all");
                  setSizeFilter("all");
                }}
                className="px-4 py-2 text-[#2D9596] hover:text-[#265073] transition-colors"
              >
                Xóa lọc
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ========== LEFT COLUMN (2/3) - COMPANIES LIST ========== */}
          <div className="lg:col-span-2 space-y-6">
            {hasCompanies ? (
              <>
                {filteredCompanies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#ECF4D6] rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* LEFT SIDE - Company Info */}
                      <div className="flex gap-4 flex-1">
                        {/* Logo */}
                        <div className="w-16 h-16 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                          {company.logo}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          {/* Company Name */}
                          <h3
                            onClick={() => onCompanyClick?.(company.id)}
                            className="text-[#265073] text-xl mb-2 hover:text-[#2D9596] cursor-pointer transition-colors"
                          >
                            {company.name}
                          </h3>

                          {/* Industry */}
                          <div className="flex items-center gap-2 text-[#2D9596] mb-3 flex-wrap">
                            <Building2 className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">
                              {company.industry.join(" • ")}
                            </span>
                          </div>

                          {/* Location & Size */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <div className="flex items-center gap-1 text-[#265073] text-sm">
                              <MapPin className="w-4 h-4 text-[#2D9596]" />
                              <span>{company.location}</span>
                            </div>
                            <span className="px-3 py-1 bg-[#9AD0C2] text-[#265073] rounded-full text-xs">
                              <Users className="w-3 h-3 inline mr-1" />
                              {company.size} nhân viên
                            </span>
                            <span className="px-3 py-1 bg-white border border-[#9AD0C2] text-[#265073] rounded-full text-xs">
                              {company.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE - Job Info & Actions */}
                      <div className="flex flex-col items-end justify-between min-w-[180px]">
                        {/* Active Jobs Badge */}
                        {company.activeJobs > 0 && (
                          <div className="px-4 py-2 bg-[#2D9596] text-white rounded-lg text-sm mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span>
                              Đang tuyển {company.activeJobs} vị trí
                            </span>
                          </div>
                        )}

                        {/* Notification Toggle */}
                        <div className="mb-4">
                          <button
                            onClick={() =>
                              handleToggleNotification(company.id)
                            }
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                              company.notificationEnabled
                                ? "bg-[#2D9596] text-white"
                                : "bg-white border-2 border-[#9AD0C2] text-[#265073]"
                            }`}
                          >
                            {company.notificationEnabled ? (
                              <>
                                <Bell className="w-4 h-4" />
                                <span>Đang bật thông báo</span>
                              </>
                            ) : (
                              <>
                                <BellOff className="w-4 h-4" />
                                <span>Bật thông báo</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 justify-end">
                          <button
                            onClick={() => onCompanyClick?.(company.id)}
                            className="px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Xem chi tiết</span>
                          </button>

                          {company.activeJobs > 0 && (
                            <button
                              onClick={() => onViewJobs?.(company.id)}
                              className="px-4 py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors text-sm flex items-center gap-2"
                            >
                              <Briefcase className="w-4 h-4" />
                              <span>Xem việc</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleUnfollow(company.id)}
                            className="px-4 py-2 border-2 border-[#C9302C] text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors text-sm flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            <span>Bỏ theo dõi</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Pagination */}
                {filteredCompanies.length > 5 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button className="p-2 border-2 border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
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
                  </div>
                )}
              </>
            ) : (
              /* ========== EMPTY STATE ========== */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-16 text-center shadow-sm"
              >
                <div className="relative inline-block mb-6">
                  <Building className="w-24 h-24 text-[#2D9596]" />
                  <Heart className="w-10 h-10 text-[#C9302C] absolute -top-2 -right-2" />
                </div>
                <h3 className="text-[#265073] text-2xl mb-3">
                  Bạn chưa theo dõi công ty nào
                </h3>
                <p className="text-[#265073]/70 mb-6 max-w-md mx-auto">
                  Hãy theo dõi các công ty bạn quan tâm để không bỏ lỡ cơ hội
                  việc làm phù hợp.
                </p>
                <button className="px-8 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2 mx-auto">
                  <Sparkles className="w-5 h-5" />
                  Khám phá công ty IT
                </button>
              </motion.div>
            )}
          </div>

          {/* ========== RIGHT COLUMN (1/3) - SIDEBAR ========== */}
          <div className="space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#2D9596]" />
                Thống kê nhanh
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-lg">
                  <span className="text-[#265073] text-sm">
                    Đang theo dõi
                  </span>
                  <span className="text-[#2D9596] text-2xl">
                    {companies.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-lg">
                  <span className="text-[#265073] text-sm">
                    Công ty đang tuyển
                  </span>
                  <span className="text-[#2D9596] text-2xl">
                    {companiesWithJobs}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-lg">
                  <span className="text-[#265073] text-sm">
                    Tổng việc đang tuyển
                  </span>
                  <span className="text-[#2D9596] text-2xl">
                    {totalActiveJobs}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-lg text-white">
                  <span className="text-sm">Việc phù hợp (AI)</span>
                  <span className="text-2xl">18</span>
                </div>
              </div>
            </motion.div>

            {/* Suggested Companies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2D9596]" />
                Gợi ý công ty nên theo dõi
              </h3>

              <div className="space-y-3">
                {suggestedCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="p-4 bg-[#ECF4D6] rounded-xl border border-[#9AD0C2]/50 hover:border-[#2D9596] transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {company.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#265073] mb-1">
                          {company.name}
                        </h4>
                        <p className="text-[#2D9596] text-xs mb-2">
                          💡 {company.reason}
                        </p>
                        <p className="text-[#265073]/70 text-xs">
                          {company.jobs} việc đang tuyển
                        </p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors text-sm flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4" />
                      Theo dõi ngay
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#ECF4D6] transition-colors text-sm">
                Xem thêm gợi ý
              </button>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#FFF9E6] border-2 border-[#FFD700]/30 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-[#265073] text-lg mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFD700]" />
                Lợi ích khi theo dõi
              </h3>
              <ul className="space-y-2 text-[#265073] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#2D9596] mt-0.5">✓</span>
                  <span>Nhận thông báo ngay khi có job mới</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2D9596] mt-0.5">✓</span>
                  <span>AI gợi ý job phù hợp từ các công ty này</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2D9596] mt-0.5">✓</span>
                  <span>Cập nhật tin tức và văn hóa công ty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2D9596] mt-0.5">✓</span>
                  <span>Ưu tiên xem hồ sơ khi ứng tuyển</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

