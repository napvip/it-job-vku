"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Bell,
  User,
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  BookmarkCheck,
  Building2,
  Sparkles,
  Calendar,
  Heart,
  Users,
  Cpu,
  BriefcaseBusiness,
  Eye,
  X,
  Send,
} from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { logoutUser } from "@/lib/firebase";

export function CandidateHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { userData, loading } = useAuth();
  
  const getCurrentPage = () => {
    if (pathname === "/candidate/dashboard") return "dashboard";
    if (pathname === "/candidate/profile") return "profile";
    if (pathname === "/candidate/ai-recommendations") return "recommendations";
    if (pathname === "/candidate/submit-cv-with-ai") return "submit-cv-with-ai";
    if (pathname === "/candidate/applications") return "applications";
    if (pathname === "/candidate/messages") return "messages";
    if (pathname === "/candidate/saved-jobs") return "saved-jobs";
    if (pathname === "/candidate/following-companies") return "following-companies";
    if (pathname === "/candidate/settings") return "settings";
    if (pathname === "/jobs") return "jobs";
    if (pathname === "/companies") return "companies";
    return "dashboard";
  };
  
  const currentPage = getCurrentPage();
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      type: "view",
      title: "Hồ sơ được xem",
      message: "Công ty TechViet Solutions đã xem CV của bạn",
      time: "5 phút trước",
      unread: true,
      icon: Eye,
    },

    {
      id: 3,
      type: "match",
      title: "Việc làm mới phù hợp",
      message: "Có 3 công vi���c Senior React phù hợp với kỹ năng của bạn",
      time: "2 giờ trước",
      unread: true,
      icon: Sparkles,
    },
    {
      id: 4,
      type: "saved",
      title: "Công việc đã lưu có cập nhật",
      message: "Senior Frontend Developer tại VNG - Hạn nộp còn 3 ngày",
      time: "5 giờ trước",
      unread: false,
      icon: BookmarkCheck,
    },
  ];

  const messages = [
    {
      id: 1,
      company: "TechViet Solutions",
      avatar: "T",
      message: "Chào bạn! Chúng tôi rất ấn tượng với hồ sơ của bạn...",
      time: "10 phút trước",
      unread: true,
    },
    {
      id: 2,
      company: "FPT Software",
      avatar: "F",
      message: "Xin chào, bạn có thể sắp xếp lịch phỏng vấn không?",
      time: "2 giờ trước",
      unread: true,
    },
    {
      id: 3,
      company: "VNG Corporation",
      avatar: "V",
      message: "Cảm ơn bạn đã ứng tuyển vị trí Senior Frontend...",
      time: "1 ngày trước",
      unread: false,
    },
  ];

  const unreadNotifications = notifications.filter((n) => n.unread).length;
  const unreadMessages = messages.filter((m) => m.unread).length;

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close all dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setIsNotificationOpen(false);
    setIsMessagesOpen(false);
    setIsProfileMenuOpen(false);
  };

  const isAnyDropdownOpen = isNotificationOpen || isMessagesOpen || isProfileMenuOpen;

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isAnyDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllDropdowns}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 bg-[#265073] z-50 shadow-lg shadow-[#9AD0C2]/20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* ========== A. LOGO + ROLE (TRÁI) ========== */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => router.push("/candidate/dashboard")}
            >
              {/* Logo với AI Icon */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-[#9AD0C2]/50 transition-shadow duration-300">
                  <BriefcaseBusiness className="w-5 h-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Cpu className="w-2.5 h-2.5 text-[#2D9596]" />
                  </div>
                </div>
              </div>

              {/* Logo Text + Role */}
              <div>
                <h1 className="text-white text-lg">AIJobs</h1>
                <p className="text-[#ECF4D6] text-xs">Ứng viên</p>
              </div>
            </motion.div>

            {/* ========== B. MENU CHÍNH GIỮA (CHỈ 4 MỤC) ========== */}
            <nav className="hidden lg:flex items-center gap-2">
              {/* Dashboard */}
              <button
                onClick={() => router.push("/candidate/dashboard")}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  currentPage === "dashboard"
                    ? "bg-[#2D9596] text-white shadow-md"
                    : "text-white hover:bg-white/10 hover:text-[#9AD0C2]"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              {/* Việc làm */}
              <button
                onClick={() => router.push("/jobs")}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  currentPage === "jobs"
                    ? "bg-[#2D9596] text-white shadow-md"
                    : "text-white hover:bg-white/10 hover:text-[#9AD0C2]"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Việc làm</span>
              </button>

              {/* Công ty */}
              <button
                onClick={() => router.push("/companies")}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  currentPage === "companies"
                    ? "bg-[#2D9596] text-white shadow-md"
                    : "text-white hover:bg-white/10 hover:text-[#9AD0C2]"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Công ty</span>
              </button>

              {/* Gửi CV với AI */}
              <button
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 relative ${
                  currentPage === "submit-cv-with-ai"
                    ? "bg-[#2D9596] text-white shadow-md"
                    : "text-white hover:bg-white/10 hover:text-[#9AD0C2]"
                }`}
                onClick={() => router.push("/candidate/submit-cv-with-ai")}
              >
                <Send className="w-4 h-4" />
                <span>Gửi CV</span>
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#9AD0C2] text-[#265073] text-[9px] rounded-full border border-white/30">
                  AI
                </span>
              </button>
            </nav>

            {/* ========== C. KHU VỰC PHẢI (ICONS + AVATAR) ========== */}
            <div className="flex items-center gap-3">
              {/* 1) Icon Thông báo */}
              <div className="relative z-[100]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsMessagesOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                  className="relative p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-white"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#2D9596] text-white text-xs rounded-full flex items-center justify-center px-1.5 border-2 border-[#265073]"
                    >
                      {unreadNotifications}
                    </motion.span>
                  )}
                </motion.button>

                {/* Dropdown Notifications */}
                <AnimatePresence>
                  {isNotificationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl border-2 border-[#9AD0C2] shadow-2xl overflow-hidden z-[200]"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-[#265073] to-[#2D9596] px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-5 h-5 text-white" />
                          <h3 className="text-white">Thông báo</h3>
                        </div>
                        <button
                          onClick={() => setIsNotificationOpen(false)}
                          className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* List */}
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => {
                          const Icon = notif.icon;
                          return (
                            <motion.div
                              key={notif.id}
                              whileHover={{ backgroundColor: "#ECF4D6" }}
                              onClick={() => {
                                setIsNotificationOpen(false);
                              }}
                              className={`px-5 py-4 border-b border-[#9AD0C2]/30 cursor-pointer transition-colors ${
                                notif.unread ? "bg-[#ECF4D6]/30" : "bg-white"
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className="text-[#265073] text-sm">
                                      {notif.title}
                                    </p>
                                    {notif.unread && (
                                      <span className="w-2 h-2 bg-[#2D9596] rounded-full flex-shrink-0 mt-1.5" />
                                    )}
                                  </div>
                                  <p className="text-[#265073]/70 text-xs mb-2">
                                    {notif.message}
                                  </p>
                                  <p className="text-[#2D9596] text-xs">
                                    {notif.time}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-3 bg-[#ECF4D6] border-t-2 border-[#9AD0C2]">
                        <button className="text-[#2D9596] text-sm hover:text-[#265073] transition-colors">
                          Xem tất cả thông báo →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2) Icon Tin nhắn */}
              <div className="relative z-[100]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsMessagesOpen(!isMessagesOpen);
                    setIsNotificationOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                  className="relative p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 text-white"
                >
                  <MessageSquare className="w-5 h-5" />
                  {unreadMessages > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#2D9596] text-white text-xs rounded-full flex items-center justify-center px-1.5 border-2 border-[#265073]"
                    >
                      {unreadMessages}
                    </motion.span>
                  )}
                </motion.button>

                {/* Dropdown Messages */}
                <AnimatePresence>
                  {isMessagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl border-2 border-[#9AD0C2] shadow-2xl overflow-hidden z-[200]"
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-[#265073] to-[#2D9596] px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-white" />
                          <h3 className="text-white">Tin nhắn</h3>
                        </div>
                        <button
                          onClick={() => setIsMessagesOpen(false)}
                          className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      {/* List */}
                      <div className="max-h-96 overflow-y-auto">
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            whileHover={{ backgroundColor: "#ECF4D6" }}
                            className={`px-5 py-4 border-b border-[#9AD0C2]/30 cursor-pointer transition-colors ${
                              msg.unread ? "bg-[#ECF4D6]/30" : "bg-white"
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="flex-shrink-0">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center text-white">
                                  {msg.avatar}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <p className="text-[#265073] text-sm">
                                    {msg.company}
                                  </p>
                                  {msg.unread && (
                                    <span className="w-2 h-2 bg-[#2D9596] rounded-full flex-shrink-0 mt-1.5" />
                                  )}
                                </div>
                                <p className="text-[#265073]/70 text-xs mb-2 line-clamp-2">
                                  {msg.message}
                                </p>
                                <p className="text-[#2D9596] text-xs">{msg.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-3 bg-[#ECF4D6] border-t-2 border-[#9AD0C2]">
                        <button
                          onClick={() => {
                            setIsMessagesOpen(false);
                            router.push("/candidate/messages");
                          }}
                          className="text-[#2D9596] text-sm hover:text-[#265073] transition-colors"
                        >
                          Xem tất cả tin nhắn →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3) Icon AI Hub */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/ai-matching")}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2D9596] hover:bg-[#37A8A7] transition-all duration-300 text-white shadow-md"
              >
                <Cpu className="w-4 h-4" />
                <span className="text-sm">AI Hub</span>
              </motion.button>

              {/* 4) Avatar + Dropdown */}
              <div className="relative z-[100]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                    setIsNotificationOpen(false);
                    setIsMessagesOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] p-[2px] ring-2 ring-[#9AD0C2]/30">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <User className="w-4 h-4 text-[#265073]" />
                    </div>
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-white text-sm">
                      {loading ? "..." : userData?.displayName || "Người dùng"}
                    </p>
                    <p className="text-[#9AD0C2] text-xs">
                      {loading ? "" : userData?.position || "Ứng viên IT"}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-300 hidden xl:block ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                {/* Avatar Dropdown Menu */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl border-2 border-[#9AD0C2] shadow-2xl overflow-hidden z-[200]"
                    >
                      {/* Profile Header */}
                      <div className="bg-gradient-to-br from-[#265073] to-[#2D9596] p-5 text-white">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 rounded-full bg-white p-0.5">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center">
                              <User className="w-7 h-7 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-white mb-1">
                              {loading ? "Đang tải..." : userData?.displayName || "Người dùng"}
                            </p>
                            <p className="text-xs text-white/80">
                              {loading ? "" : userData?.email || ""}
                            </p>
                          </div>
                        </div>
                        {/* Profile Progress */}
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-white/90">
                              Hoàn thành hồ sơ
                            </span>
                            <span className="text-sm text-white">75%</span>
                          </div>
                          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-[#9AD0C2] to-white rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/candidate/profile");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <FileText className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <span className="text-sm">Hồ sơ & CV</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/candidate/applications");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <Briefcase className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <span className="text-sm">Lịch sử ứng tuyển</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/candidate/messages");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <MessageSquare className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <div className="flex items-center justify-between flex-1">
                            <span className="text-sm">Tin nhắn</span>
                            {unreadMessages > 0 && (
                              <span className="ml-auto bg-[#2D9596] text-white text-xs px-2 py-0.5 rounded-full">
                                {unreadMessages}
                              </span>
                            )}
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/candidate/saved-jobs");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <Heart className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <span className="text-sm">Công việc đã lưu</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/candidate/following-companies");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <Users className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <span className="text-sm">Công ty theo dõi</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/candidate/settings");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <Settings className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <span className="text-sm">Cài đặt tài khoản</span>
                        </button>

                        <div className="border-t-2 border-[#9AD0C2] my-2" />

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 text-red-600 group border-t border-gray-100 mt-2 pt-4"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="text-sm font-medium">Đăng xuất</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ========== MOBILE NAVIGATION ========== */}
        <div className="lg:hidden border-t border-white/10 px-4 py-2 bg-[#265073]">
          <div className="flex items-center justify-around">
            <button
              onClick={() => router.push("/candidate/dashboard")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                currentPage === "dashboard"
                  ? "text-[#9AD0C2]"
                  : "text-white/70"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px]">Dashboard</span>
            </button>

            <button
              onClick={() => router.push("/jobs")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                currentPage === "jobs" ? "text-[#9AD0C2]" : "text-white/70"
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="text-[10px]">Việc làm</span>
            </button>

            <button
              onClick={() => router.push("/companies")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                currentPage === "companies" ? "text-[#9AD0C2]" : "text-white/70"
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-[10px]">Công ty</span>
            </button>

            <button
              onClick={() => router.push("/candidate/profile")}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                currentPage === "profile"
                  ? "text-[#9AD0C2]"
                  : "text-white/70"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px]">Hồ sơ</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}








