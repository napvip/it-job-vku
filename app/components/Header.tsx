"use client";

import { Briefcase, Moon, Sun, User } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { logoutUser } from "@/lib/firebase";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, userData, loading } = useAuth();
  
  const getCurrentPage = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/job")) return "jobs";
    if (pathname.startsWith("/company")) return "companies";
    if (pathname.startsWith("/companies")) return "companies";
    return pathname.slice(1) as string;
  };
  
  const currentPage = getCurrentPage();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDashboardNavigation = () => {
    if (userData?.role === 'employer') {
      router.push("/employer/dashboard");
    } else {
      router.push("/candidate/dashboard");
    }
  };

  return (
    <header className="bg-[#265073] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#2D9596] rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xl">IT Jobs AI</span>
          </button>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => router.push("/")}
              className={`hover:text-[#9AD0C2] transition-colors ${
                currentPage === "home" ? "text-[#9AD0C2]" : ""
              }`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => router.push("/jobs")}
              className={`hover:text-[#9AD0C2] transition-colors ${
                currentPage === "jobs" ? "text-[#9AD0C2]" : ""
              }`}
            >
              Việc làm
            </button>
            <button 
              onClick={() => router.push("/companies")}
              className={`hover:text-[#9AD0C2] transition-colors ${
                currentPage === "companies" || currentPage === "company-detail" ? "text-[#9AD0C2]" : ""
              }`}
            >
              Công ty
            </button>
            <button 
              onClick={() => router.push("/ai-matching")}
              className={`hover:text-[#9AD0C2] transition-colors ${
                currentPage === "ai-matching" ? "text-[#9AD0C2]" : ""
              }`}
            >
              Tính năng AI
            </button>
            <button 
              onClick={() => router.push("/blog")}
              className={`hover:text-[#9AD0C2] transition-colors ${
                currentPage === "blog" ? "text-[#9AD0C2]" : ""
              }`}
            >
              Blog
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {!loading && (
              <>
                {user && userData ? (
                  // User is logged in - show user info and dashboard button
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDashboardNavigation}
                      className="px-4 py-2 bg-[#2D9596] rounded-lg hover:bg-[#37a8a7] transition-colors"
                    >
                      Dashboard
                    </button>
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                      <User className="w-5 h-5" />
                      <span className="hidden md:inline">{userData.displayName}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 border border-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  // User not logged in - show login/register buttons
                  <>
                    <button 
                      onClick={() => router.push("/login")}
                      className="px-4 py-2 border border-white rounded-lg hover:bg-[#9AD0C2] hover:text-[#265073] hover:border-[#9AD0C2] transition-all"
                    >
                      Đăng nhập
                    </button>
                    <button 
                      onClick={() => router.push("/register")}
                      className="px-4 py-2 bg-[#2D9596] rounded-lg hover:bg-[#37a8a7] transition-colors"
                    >
                      Đăng ký
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

