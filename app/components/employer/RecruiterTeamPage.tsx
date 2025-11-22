"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  Shield,
  Search,
  Filter,
  MoreVertical,
  Eye,
  UserCog,
  Lock,
  Trash2,
  Briefcase,
  Calendar,
  Mail,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
  Video,
  Target,
  X,
  Check,
  UserCheck,
} from "lucide-react";
import { Button } from "../ui/button";

// Types
type Role = "admin" | "hr" | "contributor";
type Status = "active" | "suspended";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  jobsManaged: number;
  status: Status;
  joinDate: string;
  stats?: {
    jobsCreated: number;
    candidatesProcessed: number;
    interviewsConducted: number;
    conversionRate: number;
  };
}

interface RecruiterTeamPageProps {
  onNavigateToEmployerDashboard?: () => void;
}

const RecruiterTeamPage: React.FC<RecruiterTeamPageProps> = ({
  onNavigateToEmployerDashboard,
}) => {
  // Mock data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Nguyễn Văn An",
      email: "an.nguyen@company.com",
      role: "admin",
      jobsManaged: 12,
      status: "active",
      joinDate: "2024-01-15",
      stats: {
        jobsCreated: 45,
        candidatesProcessed: 234,
        interviewsConducted: 89,
        conversionRate: 35,
      },
    },
    {
      id: "2",
      name: "Trần Thị Bình",
      email: "binh.tran@company.com",
      role: "hr",
      jobsManaged: 8,
      status: "active",
      joinDate: "2024-03-20",
      stats: {
        jobsCreated: 28,
        candidatesProcessed: 156,
        interviewsConducted: 67,
        conversionRate: 32,
      },
    },
    {
      id: "3",
      name: "Lê Minh Cường",
      email: "cuong.le@company.com",
      role: "contributor",
      jobsManaged: 3,
      status: "active",
      joinDate: "2024-06-10",
      stats: {
        jobsCreated: 0,
        candidatesProcessed: 89,
        interviewsConducted: 12,
        conversionRate: 28,
      },
    },
    {
      id: "4",
      name: "Phạm Thu Hương",
      email: "huong.pham@company.com",
      role: "hr",
      jobsManaged: 10,
      status: "suspended",
      joinDate: "2024-02-28",
      stats: {
        jobsCreated: 32,
        candidatesProcessed: 178,
        interviewsConducted: 54,
        conversionRate: 30,
      },
    },
  ]);

  // States
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPermissionsPanel, setShowPermissionsPanel] = useState(false);
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [quickSearch, setQuickSearch] = useState("");

  // Filter states
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterRole, setFilterRole] = useState<Role | "all">("all");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");

  // Invite form states
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("hr");
  const [showInviteSuccess, setShowInviteSuccess] = useState(false);

  // Role badge colors
  const getRoleBadgeClass = (role: Role) => {
    switch (role) {
      case "admin":
        return "bg-[#2D9596] text-white";
      case "hr":
        return "bg-[#2D9596]/20 text-[#2D9596]";
      case "contributor":
        return "bg-[#9AD0C2] text-[#265073]";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // Role label
  const getRoleLabel = (role: Role) => {
    switch (role) {
      case "admin":
        return "Admin HR";
      case "hr":
        return "HR";
      case "contributor":
        return "Cộng tác viên";
      default:
        return role;
    }
  };

  // Status badge colors
  const getStatusBadgeClass = (status: Status) => {
    return status === "active"
      ? "bg-[#2D9596]/10 text-[#2D9596] border border-[#2D9596]/30"
      : "bg-gray-100 text-gray-600 border border-gray-300";
  };

  // Filter members
  const filteredMembers = teamMembers.filter((member) => {
    const matchesQuickSearch =
      quickSearch === "" ||
      member.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(quickSearch.toLowerCase());

    const matchesName =
      filterName === "" ||
      member.name.toLowerCase().includes(filterName.toLowerCase());

    const matchesEmail =
      filterEmail === "" ||
      member.email.toLowerCase().includes(filterEmail.toLowerCase());

    const matchesRole = filterRole === "all" || member.role === filterRole;

    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;

    return (
      matchesQuickSearch &&
      matchesName &&
      matchesEmail &&
      matchesRole &&
      matchesStatus
    );
  });

  // Handle invite
  const handleInvite = () => {
    setShowInviteSuccess(true);
    setTimeout(() => {
      setShowInviteModal(false);
      setShowInviteSuccess(false);
      setInviteEmail("");
      setInviteRole("hr");
    }, 2000);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilterName("");
    setFilterEmail("");
    setFilterRole("all");
    setFilterStatus("all");
  };

  // Handle member actions
  const handleViewDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-[#265073] mb-2">Team tuyển dụng</h1>
                <p className="text-[#2D9596]">
                  Quản lý các thành viên phụ trách tuyển dụng trong công ty.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setShowPermissionsPanel(true)}
                  variant="outline"
                  className="border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596]/5"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Quản lý phân quyền
                </Button>
                <Button
                  onClick={() => setShowInviteModal(true)}
                  className="bg-[#2D9596] hover:bg-[#265073] text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />+ Mời thành viên
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="Tìm thành viên theo tên hoặc email…"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#9AD0C2] rounded-2xl focus:outline-none focus:border-[#2D9596] transition-colors"
            />
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white border-2 border-[#9AD0C2] rounded-2xl p-4 sm:p-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#2D9596]" />
            <h3 className="text-[#265073]">Bộ lọc</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Tìm theo tên"
              className="px-4 py-2 border border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
            />
            <input
              type="text"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
              placeholder="Tìm theo email"
              className="px-4 py-2 border border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as Role | "all")}
              className="px-4 py-2 border border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors bg-white"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Admin HR</option>
              <option value="hr">HR</option>
              <option value="contributor">Cộng tác viên</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as Status | "all")
              }
              className="px-4 py-2 border border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="suspended">Tạm khóa</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {}}
              className="bg-[#265073] hover:bg-[#265073]/90 text-white"
            >
              Áp dụng
            </Button>
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596]/5"
            >
              Xóa lọc
            </Button>
          </div>
        </motion.div>

        {/* Team Members Table/List */}
        {filteredMembers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border-2 border-[#9AD0C2] rounded-2xl overflow-hidden"
          >
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#ECF4D6]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#265073]">
                      Thành viên
                    </th>
                    <th className="px-6 py-4 text-left text-[#265073]">
                      Vai trò
                    </th>
                    <th className="px-6 py-4 text-left text-[#265073]">
                      Job phụ trách
                    </th>
                    <th className="px-6 py-4 text-left text-[#265073]">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-[#265073]">
                      Ngày tham gia
                    </th>
                    <th className="px-6 py-4 text-left text-[#265073]">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-t border-[#9AD0C2]/30 hover:bg-[#ECF4D6]/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#9AD0C2] flex items-center justify-center text-[#265073]">
                            {member.avatar ? (
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="font-medium">
                                {member.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="text-[#265073] hover:text-[#2D9596] transition-colors cursor-pointer">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getRoleBadgeClass(
                            member.role
                          )}`}
                        >
                          {getRoleLabel(member.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-[#265073]">
                          <Briefcase className="w-4 h-4 text-[#2D9596]" />
                          <span>{member.jobsManaged} job</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(
                            member.status
                          )}`}
                        >
                          {member.status === "active" ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              Hoạt động
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              Tạm khóa
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(member.joinDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative group">
                          <button className="p-2 hover:bg-[#9AD0C2]/30 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-[#265073]" />
                          </button>
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-[#9AD0C2] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button
                              onClick={() => handleViewDetails(member)}
                              className="w-full px-4 py-2.5 text-left hover:bg-[#ECF4D6] transition-colors flex items-center gap-2 text-[#265073] rounded-t-xl"
                            >
                              <Eye className="w-4 h-4" />
                              Xem chi tiết
                            </button>
                            <button className="w-full px-4 py-2.5 text-left hover:bg-[#ECF4D6] transition-colors flex items-center gap-2 text-[#265073]">
                              <UserCog className="w-4 h-4" />
                              Đổi quyền
                            </button>
                            <button className="w-full px-4 py-2.5 text-left hover:bg-[#ECF4D6] transition-colors flex items-center gap-2 text-[#265073]">
                              <Lock className="w-4 h-4" />
                              Tạm khóa
                            </button>
                            <button className="w-full px-4 py-2.5 text-left hover:bg-[#ECF4D6] transition-colors flex items-center gap-2 text-red-600 rounded-b-xl">
                              <Trash2 className="w-4 h-4" />
                              Xóa khỏi team
                            </button>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-[#9AD0C2]/30">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 hover:bg-[#ECF4D6]/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-[#9AD0C2] flex items-center justify-center text-[#265073] flex-shrink-0">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="font-medium">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[#265073] mb-1">{member.name}</div>
                      <div className="text-sm text-gray-500 mb-2 truncate">
                        {member.email}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs ${getRoleBadgeClass(
                            member.role
                          )}`}
                        >
                          {getRoleLabel(member.role)}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${getStatusBadgeClass(
                            member.status
                          )}`}
                        >
                          {member.status === "active" ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Hoạt động
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              Tạm khóa
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-[#9AD0C2]/30 rounded-lg transition-colors flex-shrink-0">
                      <MoreVertical className="w-5 h-5 text-[#265073]" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-[#265073]">
                      <Briefcase className="w-4 h-4 text-[#2D9596]" />
                      <span>{member.jobsManaged} job</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(member.joinDate).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-[#9AD0C2] rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-[#2D9596]" />
            </div>
            <h3 className="text-[#265073] mb-2">
              Chưa có thành viên tuyển dụng nào.
            </h3>
            <p className="text-gray-600 mb-6">
              Hãy mời các thành viên để cùng quản lý tuyển dụng
            </p>
            <Button
              onClick={() => setShowInviteModal(true)}
              className="bg-[#2D9596] hover:bg-[#265073] text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />+ Mời thành viên đầu tiên
            </Button>
          </motion.div>
        )}
      </div>

      {/* Invite Member Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-[#9AD0C2]/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#265073]">Mời thành viên mới</h2>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#265073]" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {showInviteSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-[#2D9596]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-[#2D9596]" />
                    </div>
                    <h3 className="text-[#265073] mb-2">Đã gửi lời mời!</h3>
                    <p className="text-gray-600">
                      Đã gửi lời mời đến:{" "}
                      <span className="text-[#2D9596]">{inviteEmail}</span>
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-5">
                      <label className="block text-[#265073] mb-2">
                        Email người được mời *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                        <input
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="email@company.com"
                          className="w-full pl-11 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[#265073] mb-2">
                        Vai trò *
                      </label>
                      <div className="space-y-3">
                        {/* Admin HR */}
                        <label className="flex items-start gap-3 p-4 border-2 border-[#9AD0C2] rounded-xl cursor-pointer hover:bg-[#ECF4D6]/50 transition-colors">
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={inviteRole === "admin"}
                            onChange={(e) =>
                              setInviteRole(e.target.value as Role)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="text-[#265073] mb-1">Admin HR</div>
                            <p className="text-sm text-gray-600">
                              Toàn quyền quản lý công ty, tuyển dụng, thanh
                              toán
                            </p>
                          </div>
                        </label>

                        {/* HR */}
                        <label className="flex items-start gap-3 p-4 border-2 border-[#9AD0C2] rounded-xl cursor-pointer hover:bg-[#ECF4D6]/50 transition-colors">
                          <input
                            type="radio"
                            name="role"
                            value="hr"
                            checked={inviteRole === "hr"}
                            onChange={(e) =>
                              setInviteRole(e.target.value as Role)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="text-[#265073] mb-1">HR</div>
                            <p className="text-sm text-gray-600">
                              Xem/tạo job, quản lý ứng viên, mời phỏng vấn
                            </p>
                          </div>
                        </label>

                        {/* Contributor */}
                        <label className="flex items-start gap-3 p-4 border-2 border-[#9AD0C2] rounded-xl cursor-pointer hover:bg-[#ECF4D6]/50 transition-colors">
                          <input
                            type="radio"
                            name="role"
                            value="contributor"
                            checked={inviteRole === "contributor"}
                            onChange={(e) =>
                              setInviteRole(e.target.value as Role)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="text-[#265073] mb-1">
                              Cộng tác viên
                            </div>
                            <p className="text-sm text-gray-600">
                              Chỉ xem và lọc CV, không tạo job
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleInvite}
                        disabled={!inviteEmail}
                        className="flex-1 bg-[#2D9596] hover:bg-[#265073] text-white disabled:opacity-50"
                      >
                        Gửi lời mời
                      </Button>
                      <Button
                        onClick={() => setShowInviteModal(false)}
                        variant="outline"
                        className="border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596]/5"
                      >
                        Hủy
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {showMemberDetailModal && selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMemberDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[#9AD0C2]/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#265073]">Thông tin thành viên</h2>
                  <button
                    onClick={() => setShowMemberDetailModal(false)}
                    className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#265073]" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Member Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#9AD0C2]/30">
                  <div className="w-20 h-20 rounded-full bg-[#9AD0C2] flex items-center justify-center text-[#265073] text-2xl">
                    {selectedMember.avatar ? (
                      <img
                        src={selectedMember.avatar}
                        alt={selectedMember.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span>{selectedMember.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#265073] mb-1">
                      {selectedMember.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getRoleBadgeClass(
                          selectedMember.role
                        )}`}
                      >
                        {getRoleLabel(selectedMember.role)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(
                          selectedMember.status
                        )}`}
                      >
                        {selectedMember.status === "active" ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Hoạt động
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Tạm khóa
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#ECF4D6] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[#2D9596] mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">Job đang phụ trách</span>
                    </div>
                    <div className="text-[#265073]">
                      {selectedMember.jobsManaged} job
                    </div>
                  </div>
                  <div className="bg-[#ECF4D6] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[#2D9596] mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Ngày gia nhập</span>
                    </div>
                    <div className="text-[#265073]">
                      {new Date(selectedMember.joinDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                {selectedMember.stats && (
                  <div>
                    <h4 className="text-[#265073] mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#2D9596]" />
                      Thống kê hiệu suất
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="border-2 border-[#9AD0C2] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-sm text-gray-600">
                            Số job đã tạo
                          </span>
                        </div>
                        <div className="text-[#265073]">
                          {selectedMember.stats.jobsCreated}
                        </div>
                      </div>
                      <div className="border-2 border-[#9AD0C2] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <UserCheck className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-sm text-gray-600">
                            Ứng viên đã xử lý
                          </span>
                        </div>
                        <div className="text-[#265073]">
                          {selectedMember.stats.candidatesProcessed}
                        </div>
                      </div>
                      <div className="border-2 border-[#9AD0C2] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Video className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-sm text-gray-600">
                            Buổi phỏng vấn
                          </span>
                        </div>
                        <div className="text-[#265073]">
                          {selectedMember.stats.interviewsConducted}
                        </div>
                      </div>
                      <div className="border-2 border-[#9AD0C2] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-sm text-gray-600">
                            Tỷ lệ chuyển đổi
                          </span>
                        </div>
                        <div className="text-[#265073]">
                          {selectedMember.stats.conversionRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#9AD0C2]/30 flex gap-3">
                <Button
                  className="flex-1 bg-[#265073] hover:bg-[#265073]/90 text-white"
                  onClick={() => setShowMemberDetailModal(false)}
                >
                  Đóng
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permissions Panel */}
      <AnimatePresence>
        {showPermissionsPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPermissionsPanel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Panel Header */}
              <div className="p-6 border-b border-[#9AD0C2]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2D9596]/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#2D9596]" />
                    </div>
                    <div>
                      <h2 className="text-[#265073]">Quản lý phân quyền</h2>
                      <p className="text-sm text-gray-600">
                        Chi tiết quyền hạn cho từng vai trò
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPermissionsPanel(false)}
                    className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#265073]" />
                  </button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[#9AD0C2]">
                        <th className="px-4 py-3 text-left text-[#265073]">
                          Chức năng
                        </th>
                        <th className="px-4 py-3 text-center text-[#265073]">
                          <div className="flex flex-col items-center">
                            <span className="text-sm">Admin HR</span>
                            <span className="text-xs text-[#2D9596] mt-1">
                              Toàn quyền
                            </span>
                          </div>
                        </th>
                        <th className="px-4 py-3 text-center text-[#265073]">
                          <div className="flex flex-col items-center">
                            <span className="text-sm">HR</span>
                            <span className="text-xs text-[#2D9596] mt-1">
                              Tuyển dụng
                            </span>
                          </div>
                        </th>
                        <th className="px-4 py-3 text-center text-[#265073]">
                          <div className="flex flex-col items-center">
                            <span className="text-sm">Cộng tác viên</span>
                            <span className="text-xs text-[#2D9596] mt-1">
                              Hỗ trợ
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1 */}
                      <tr className="border-b border-[#9AD0C2]/30 hover:bg-[#ECF4D6]/30">
                        <td className="px-4 py-4 text-[#265073]">
                          Tạo tin tuyển dụng
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="border-b border-[#9AD0C2]/30 hover:bg-[#ECF4D6]/30">
                        <td className="px-4 py-4 text-[#265073]">
                          Chỉnh sửa tin tuyển dụng
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="border-b border-[#9AD0C2]/30 hover:bg-[#ECF4D6]/30">
                        <td className="px-4 py-4 text-[#265073]">
                          Xem hồ sơ ứng viên
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="border-b border-[#9AD0C2]/30 hover:bg-[#ECF4D6]/30">
                        <td className="px-4 py-4 text-[#265073]">
                          Chuyển trạng thái pipeline
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Row 5 */}
                      <tr className="border-b border-[#9AD0C2]/30 hover:bg-[#ECF4D6]/30">
                        <td className="px-4 py-4 text-[#265073]">
                          Mời phỏng vấn
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Row 6 */}
                      <tr className="border-b border-[#9AD0C2]/30 hover:bg-[#ECF4D6]/30">
                        <td className="px-4 py-4 text-[#265073]">
                          Tạo gói dịch vụ / thanh toán
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Row 7 */}
                      <tr className="hover:bg-[#ECF4D6]/30">
                        <td className="px-4 py-4 text-[#265073]">
                          Chỉnh sửa hồ sơ c��ng ty
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-[#2D9596] rounded-md flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Info Note */}
                <div className="mt-6 bg-[#ECF4D6] border border-[#9AD0C2] rounded-xl p-4">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 bg-[#2D9596]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-3 h-3 text-[#2D9596]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#265073]">
                        <strong>Lưu ý:</strong> Chỉ Admin HR mới có thể thay
                        đổi quyền hạn của các thành viên khác. Cộng tác viên
                        chỉ có quyền xem và lọc CV để hỗ trợ quá trình tuyển
                        dụng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="p-6 border-t border-[#9AD0C2]/30 flex gap-3">
                <Button className="flex-1 bg-[#2D9596] hover:bg-[#265073] text-white">
                  Lưu thay đổi
                </Button>
                <Button
                  onClick={() => setShowPermissionsPanel(false)}
                  variant="outline"
                  className="border-[#2D9596] text-[#2D9596] hover:bg-[#2D9596]/5"
                >
                  Khôi phục mặc định
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecruiterTeamPage;

