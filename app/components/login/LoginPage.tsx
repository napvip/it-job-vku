"use client";

import { useRouter } from "next/navigation";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { LoginForm } from "./LoginForm";
import { LoginIllustration } from "./LoginIllustration";

export function LoginPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#ECF4D6] flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-[#2D9596] rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#265073] text-xl">IT Jobs AI</span>
          </button>

          {/* Register Link */}
          <div className="text-[#265073]">
            Chưa có tài khoản?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-[#2D9596] hover:text-[#265073] transition-colors"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch min-h-[600px] bg-white rounded-[32px] shadow-[0_20px_60px_rgba(154,208,194,0.25)] overflow-hidden">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
              <LoginForm />
            </div>

            {/* Right Side - Illustration (Desktop only) */}
            <LoginIllustration />
          </div>
        </div>
      </main>

      {/* Footer Info (Mobile) */}
      <div className="lg:hidden py-8 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-lg"
          >
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl text-[#2D9596] mb-1">10,000+</div>
                <div className="text-sm text-[#265073]/70">Việc làm IT</div>
              </div>
              <div>
                <div className="text-2xl text-[#2D9596] mb-1">1,000+</div>
                <div className="text-sm text-[#265073]/70">Công ty</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

