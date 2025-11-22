"use client";

import { Briefcase } from "lucide-react";
import { RegisterForm } from "./RegisterForm";
import { RegisterIllustration } from "./RegisterIllustration";

interface RegisterPageProps {
  onNavigateToHome?: () => void;
  onNavigateToLogin?: () => void;
}

export function RegisterPage({ onNavigateToHome, onNavigateToLogin }: RegisterPageProps) {
  return (
    <div className="min-h-screen bg-[#ECF4D6] flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#2D9596] rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#265073] text-xl">IT Jobs AI</span>
          </button>

          {/* Login Link */}
          <div className="text-[#265073]">
            Đã có tài khoản?{" "}
            <button
              onClick={onNavigateToLogin}
              className="text-[#2D9596] hover:text-[#265073] transition-colors"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch min-h-[700px] bg-white rounded-[32px] shadow-[0_20px_60px_rgba(154,208,194,0.25)] overflow-hidden">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
              <RegisterForm onNavigateToLogin={onNavigateToLogin} />
            </div>

            {/* Right Side - Illustration (Desktop only) */}
            <RegisterIllustration />
          </div>
        </div>
      </main>
    </div>
  );
}

