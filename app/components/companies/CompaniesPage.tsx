"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  Search,
  MapPin,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe,
  X,
} from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  jobCount?: number;
  createdAt?: Date;
}

export function CompaniesPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Load companies from Firebase
  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "employer"));
      const snapshot = await getDocs(q);

      const companyList: Company[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        companyList.push({
          id: doc.id,
          companyName: data.companyName || data.displayName || "Công ty",
          displayName: data.displayName || "",
          logo: data.logo || "",
          industry: data.industry || data.companyIndustry || "",
          location: data.location || data.address || data.companyLocation || "",
          companySize: data.companySize || data.size || "",
          description: data.description || data.companyDescription || data.about || "",
          website: data.website || data.companyWebsite || "",
          email: data.email || "",
          phone: data.phone || "",
          createdAt: data.createdAt?.toDate(),
        });
      });

      // Count jobs for each company
      const jobsRef = collection(db, "jobs");
      const jobsSnapshot = await getDocs(jobsRef);
      const jobCounts: Record<string, number> = {};
      jobsSnapshot.forEach((doc) => {
        const employerId = doc.data().employerId;
        if (employerId) {
          jobCounts[employerId] = (jobCounts[employerId] || 0) + 1;
        }
      });

      // Add job counts to companies
      companyList.forEach((company) => {
        company.jobCount = jobCounts[company.id] || 0;
      });

      setCompanies(companyList);
    } catch (error) {
      console.error("Error loading companies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique values for filters
  const locations = [...new Set(companies.map((c) => c.location).filter(Boolean))];
  const industries = [...new Set(companies.map((c) => c.industry).filter(Boolean))];

  // Filter companies
  const filteredCompanies = companies.filter((company) => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchName = company.companyName?.toLowerCase().includes(searchLower);
      const matchIndustry = company.industry?.toLowerCase().includes(searchLower);
      const matchLocation = company.location?.toLowerCase().includes(searchLower);
      if (!matchName && !matchIndustry && !matchLocation) return false;
    }

    if (locationFilter !== "all" && company.location !== locationFilter) return false;
    if (industryFilter !== "all" && company.industry !== industryFilter) return false;
    if (sizeFilter !== "all" && company.companySize !== sizeFilter) return false;

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setLocationFilter("all");
    setIndustryFilter("all");
    setSizeFilter("all");
    setCurrentPage(1);
  };

  const handleCompanyClick = (companyId: string) => {
    router.push(`/company/${companyId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải danh sách công ty...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#265073] to-[#2D9596] pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <Building2 className="w-5 h-5 text-white" />
              <span className="text-white text-sm">Danh sách công ty</span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
              Khám phá các công ty IT tại Việt Nam
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Tìm hiểu về văn hóa, môi trường làm việc và cơ hội nghề nghiệp
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{companies.length}</div>
                <div className="text-sm text-white/70">Công ty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {companies.reduce((sum, c) => sum + (c.jobCount || 0), 0)}
                </div>
                <div className="text-sm text-white/70">Việc làm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{locations.length}</div>
                <div className="text-sm text-white/70">Địa điểm</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 mb-6 -mt-8 relative z-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9AD0C2]" />
              <input
                type="text"
                placeholder="Tìm theo tên công ty, ngành nghề..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none transition-colors"
              />
            </div>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none bg-white text-[#265073]"
            >
              <option value="all">Tất cả địa điểm</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Industry Filter */}
            <select
              value={industryFilter}
              onChange={(e) => {
                setIndustryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none bg-white text-[#265073]"
            >
              <option value="all">Tất cả ngành nghề</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>

            {/* Size Filter */}
            <select
              value={sizeFilter}
              onChange={(e) => {
                setSizeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-[#9AD0C2] rounded-lg focus:border-[#2D9596] focus:outline-none bg-white text-[#265073]"
            >
              <option value="all">Tất cả quy mô</option>
              <option value="1-10">1-10 nhân viên</option>
              <option value="11-50">11-50 nhân viên</option>
              <option value="51-200">51-200 nhân viên</option>
              <option value="201-500">201-500 nhân viên</option>
              <option value="500+">500+ nhân viên</option>
            </select>

            {/* Clear Filters */}
            {(searchQuery || locationFilter !== "all" || industryFilter !== "all" || sizeFilter !== "all") && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2.5 text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Xóa lọc
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#265073]">
            Hiển thị <span className="font-semibold">{paginatedCompanies.length}</span> /{" "}
            <span className="font-semibold">{filteredCompanies.length}</span> công ty
          </p>
        </div>

        {/* Company Grid */}
        {paginatedCompanies.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Building2 className="w-16 h-16 text-[#9AD0C2] mx-auto mb-4" />
            <h3 className="text-xl text-[#265073] font-semibold mb-2">Không tìm thấy công ty</h3>
            <p className="text-[#265073]/70">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCompanyClick(company.id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
              >
                {/* Company Header */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.companyName}
                        className="w-16 h-16 rounded-xl object-cover border border-[#9AD0C2]"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white text-2xl font-bold">
                        {company.companyName?.charAt(0)?.toUpperCase() || "C"}
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#265073] font-bold text-lg truncate group-hover:text-[#2D9596] transition-colors">
                        {company.companyName}
                      </h3>
                      {company.industry && (
                        <p className="text-[#2D9596] text-sm truncate">{company.industry}</p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {company.description && (
                    <p className="text-[#265073]/70 text-sm mt-3 line-clamp-2">
                      {company.description}
                    </p>
                  )}

                  {/* Details */}
                  <div className="mt-4 space-y-2">
                    {company.location && (
                      <div className="flex items-center gap-2 text-sm text-[#265073]">
                        <MapPin className="w-4 h-4 text-[#2D9596]" />
                        <span className="truncate">{company.location}</span>
                      </div>
                    )}
                    {company.companySize && (
                      <div className="flex items-center gap-2 text-sm text-[#265073]">
                        <Users className="w-4 h-4 text-[#2D9596]" />
                        <span>{company.companySize}</span>
                      </div>
                    )}
                    {company.website && (
                      <div className="flex items-center gap-2 text-sm text-[#265073]">
                        <Globe className="w-4 h-4 text-[#2D9596]" />
                        <span className="truncate">{company.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-[#ECF4D6] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#2D9596]" />
                    <span className="text-sm text-[#265073] font-medium">
                      {company.jobCount || 0} việc làm
                    </span>
                  </div>
                  <span className="text-sm text-[#2D9596] font-medium group-hover:underline">
                    Xem chi tiết →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#265073]">
            Trang {currentPage} / {totalPages || 1}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-[#265073] text-[#265073] rounded-lg hover:bg-[#ECF4D6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}