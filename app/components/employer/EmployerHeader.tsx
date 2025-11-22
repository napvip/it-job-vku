"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Eye,
  UserPlus,
  CheckCircle,
  BarChart3,
  Building2,
} from "lucide-react";

export function EmployerHeader() {
  const router = useRouter();
  const pathname = usePathname();
  
  const getCurrentPage = () => {
    if (pathname === "/employer/dashboard") return "employer-dashboard";
    if (pathname === "/employer/jobs") return "employer-jobs";
    if (pathname === "/employer/applicants") return "employer-applicants";
    if (pathname === "/employer/interviews") return "employer-interviews";
    if (pathname === "/employer/messages") return "employer-messages";
    if (pathname === "/employer/settings") return "employer-settings";
    if (pathname === "/employer/analytics") return "employer-analytics";
    if (pathname === "/") return "home";
    return "employer-dashboard";
  };
  
  const currentPage = getCurrentPage();
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Mock company data
  const companyInfo = {
    name: "FPT Software",
    logo: "F",
    role: "Nhà tuyển dụng",
  };

  // Notifications
  const notifications = [
    {
      id: 1,
      type: "applicant",
      title: "Ứng viên mới",
      message: "Nguyễn Văn An đã nộp hồ sơ cho vị trí Senior Frontend Developer",
      time: "5 phút trước",
      unread: true,
      icon: UserPlus,
    },
    {
      id: 2,
      type: "view",
      title: "Tin tuyển dụng được xem",
      message: "Tin 'Backend Developer' đã được xem 50 lần trong ngày hôm nay",
      time: "1 giờ trước",
      unread: true,
      icon: Eye,
    },
    {
      id: 3,
      type: "interview",
      title: "Lịch phỏng vấn sắp tới",
      message: "Bạn có lịch phỏng vấn với Trần Thị Bình vào 14:00 hôm nay",
      time: "2 giờ trước",
      unread: false,
      icon: Calendar,
    },
    {
      id: 4,
      type: "match",
      title: "AI tìm thấy ứng viên phù hợp",
      message: "3 ứng viên có match score cao cho vị trí UI/UX Designer",
      time: "3 giờ trước",
      unread: false,
      icon: CheckCircle,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#9AD0C2] shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[#265073] font-bold">ITJobs Portal</div>
              <div className="text-xs text-[#2D9596]">Employer</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => router.push("/employer/dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentPage === "employer-dashboard"
                  ? "bg-[#2D9596] text-white"
                  : "text-[#265073] hover:bg-[#ECF4D6]"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => router.push("/employer/jobs")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentPage === "employer-jobs"
                  ? "bg-[#2D9596] text-white"
                  : "text-[#265073] hover:bg-[#ECF4D6]"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Tin tuyển dụng</span>
            </button>

            <button
              onClick={() => router.push("/employer/applicants")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentPage === "employer-applicants"
                  ? "bg-[#2D9596] text-white"
                  : "text-[#265073] hover:bg-[#ECF4D6]"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Ứng viên</span>
            </button>

            <button
              onClick={() => router.push("/employer/interviews")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentPage === "employer-interviews"
                  ? "bg-[#2D9596] text-white"
                  : "text-[#265073] hover:bg-[#ECF4D6]"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Lịch phỏng vấn</span>
            </button>

            <button
              onClick={() => router.push("/employer/messages")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentPage === "employer-messages"
                  ? "bg-[#2D9596] text-white"
                  : "text-[#265073] hover:bg-[#ECF4D6]"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Tin nhắn</span>
            </button>

            <button
              onClick={() => router.push("/employer/analytics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                currentPage === "employer-analytics"
                  ? "bg-[#2D9596] text-white"
                  : "text-[#265073] hover:bg-[#ECF4D6]"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Thống kê</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-[#265073] hover:bg-[#ECF4D6] rounded-xl transition-colors"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-[#C9302C] text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotificationOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border-2 border-[#9AD0C2] overflow-hidden z-50"
                    >
                      <div className="p-5 border-b-2 border-[#9AD0C2] bg-[#ECF4D6]">
                        <h3 className="text-[#265073] font-bold">Thông báo</h3>
                        <p className="text-[#265073]/70 text-sm">
                          Bạn có {unreadCount} thông báo mới
                        </p>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => {
                          const Icon = notif.icon;
                          return (
                            <motion.div
                              key={notif.id}
                              whileHover={{ backgroundColor: "#ECF4D6" }}
                              className={`px-5 py-4 border-b border-[#9AD0C2]/30 cursor-pointer transition-colors ${
                                notif.unread ? "bg-[#ECF4D6]/30" : "bg-white"
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className="w-10 h-10 bg-[#2D9596]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-5 h-5 text-[#2D9596]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-[#265073] text-sm font-medium">
                                      {notif.title}
                                    </h4>
                                    {notif.unread && (
                                      <span className="w-2 h-2 bg-[#2D9596] rounded-full flex-shrink-0 ml-2 mt-1" />
                                    )}
                                  </div>
                                  <p className="text-[#265073]/70 text-sm mb-2">
                                    {notif.message}
                                  </p>
                                  <span className="text-[#265073]/50 text-xs">
                                    {notif.time}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="p-4 border-t-2 border-[#9AD0C2] bg-[#ECF4D6]">
                        <button className="w-full text-center text-[#2D9596] hover:text-[#265073] transition-colors text-sm">
                          Xem tất cả thông báo
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[#ECF4D6] transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {companyInfo.logo}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-[#265073] text-sm font-medium">
                    {companyInfo.name}
                  </div>
                  <div className="text-[#265073]/70 text-xs">
                    {companyInfo.role}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#265073] transition-transform ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-[#9AD0C2] overflow-hidden z-50"
                    >
                      <div className="p-5 border-b-2 border-[#9AD0C2] bg-[#ECF4D6]">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full flex items-center justify-center text-white text-xl">
                            {companyInfo.logo}
                          </div>
                          <div>
                            <div className="text-[#265073] font-medium">
                              {companyInfo.name}
                            </div>
                            <div className="text-[#265073]/70 text-xs">
                              {companyInfo.role}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/employer/dashboard");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <Home className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <span className="text-sm">Dashboard</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/employer/settings");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#ECF4D6] transition-all duration-300 text-[#265073] group"
                        >
                          <Settings className="w-5 h-5 group-hover:text-[#2D9596] transition-colors" />
                          <span className="text-sm">Cài đặt công ty</span>
                        </button>

                        <div className="border-t-2 border-[#9AD0C2] my-2" />

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            router.push("/");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FEE] transition-all duration-300 text-[#C9302C] group"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="text-sm">Đăng xuất</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



