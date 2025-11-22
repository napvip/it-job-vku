"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Phone, Briefcase, Building2, Users, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface RegisterFormProps {
  onNavigateToLogin?: () => void;
}

type UserRole = "candidate" | "employer" | null;
type PasswordStrength = "weak" | "medium" | "strong";

export function RegisterForm({ onNavigateToLogin }: RegisterFormProps) {
  const [role, setRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    position: "",
    level: "",
    companyType: "",
    companySize: "",
    representative: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (password.length === 0) return "weak";
    if (password.length < 6) return "weak";
    if (password.length < 10 && /[A-Za-z]/.test(password) && /[0-9]/.test(password)) return "medium";
    if (password.length >= 10 && /[A-Za-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) return "strong";
    return "medium";
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Vui lòng chọn vai trò");
      return;
    }

    if (!agreeTerms) {
      setError("Vui lòng đồng ý với điều khoản");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registration successful", { role, ...formData });
      // Would show success modal or redirect
    }, 1500);
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`Register with ${provider}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl"
    >
      <div className="bg-white rounded-[24px] border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)] p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[#265073] text-3xl mb-3">
            Tạo tài khoản để bắt đầu
          </h2>
          <p className="text-[#2D9596]">
            Chọn vai trò phù hợp để hệ thống tối ưu trải nghiệm của bạn.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole("candidate")}
              className={`p-6 rounded-2xl border-2 transition-all ${
                role === "candidate"
                  ? "border-[#2D9596] bg-[#ECF4D6] shadow-[0_4px_16px_rgba(45,149,150,0.2)]"
                  : "border-[#9AD0C2] bg-[#ECF4D6] hover:border-[#2D9596]"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-3 ${
                  role === "candidate" ? "bg-[#2D9596]" : "bg-[#9AD0C2]"
                }`}>
                  <User className={`w-8 h-8 ${role === "candidate" ? "text-white" : "text-[#265073]"}`} />
                </div>
                <h3 className="text-[#265073] mb-1">Ứng viên IT</h3>
                <p className="text-sm text-[#265073]/70">Tìm việc làm phù hợp</p>
              </div>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setRole("employer")}
              className={`p-6 rounded-2xl border-2 transition-all ${
                role === "employer"
                  ? "border-[#2D9596] bg-[#ECF4D6] shadow-[0_4px_16px_rgba(45,149,150,0.2)]"
                  : "border-[#9AD0C2] bg-[#ECF4D6] hover:border-[#2D9596]"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-3 ${
                  role === "employer" ? "bg-[#2D9596]" : "bg-[#9AD0C2]"
                }`}>
                  <Building2 className={`w-8 h-8 ${role === "employer" ? "text-white" : "text-[#265073]"}`} />
                </div>
                <h3 className="text-[#265073] mb-1">Nhà tuyển dụng</h3>
                <p className="text-sm text-[#265073]/70">Tìm ứng viên tài năng</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <p className="text-red-600 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        {role && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name / Company Name */}
            <div>
              <label className="block text-[#265073] mb-2">
                {role === "candidate" ? "Họ và tên" : "Tên công ty"}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={role === "candidate" ? "Nguyễn Văn A" : "Tên công ty"}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none focus:shadow-[0_0_0_3px_rgba(154,208,194,0.2)] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#265073] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none focus:shadow-[0_0_0_3px_rgba(154,208,194,0.2)] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#265073] mb-2">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none focus:shadow-[0_0_0_3px_rgba(154,208,194,0.2)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D9596] hover:text-[#265073] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    <div className={`h-1 flex-1 rounded ${passwordStrength === "weak" ? "bg-red-400" : passwordStrength === "medium" ? "bg-yellow-400" : "bg-[#2D9596]"}`} />
                    <div className={`h-1 flex-1 rounded ${passwordStrength === "medium" || passwordStrength === "strong" ? "bg-yellow-400" : "bg-gray-200"} ${passwordStrength === "strong" ? "bg-[#2D9596]" : ""}`} />
                    <div className={`h-1 flex-1 rounded ${passwordStrength === "strong" ? "bg-[#2D9596]" : "bg-gray-200"}`} />
                  </div>
                  <p className={`text-xs ${passwordStrength === "weak" ? "text-red-500" : passwordStrength === "medium" ? "text-yellow-600" : "text-[#2D9596]"}`}>
                    {passwordStrength === "weak" && "Mật khẩu yếu"}
                    {passwordStrength === "medium" && "Mật khẩu trung bình"}
                    {passwordStrength === "strong" && "Mật khẩu mạnh"}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#265073] mb-2">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none focus:shadow-[0_0_0_3px_rgba(154,208,194,0.2)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D9596] hover:text-[#265073] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#2D9596]" />
                      <p className="text-sm text-[#2D9596]">Mật khẩu khớp</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <p className="text-sm text-red-500">Mật khẩu không khớp</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Role-specific fields */}
            {role === "candidate" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#265073] mb-2">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0123456789"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#265073] mb-2">Vị trí mong muốn</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D9596]" />
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Frontend Developer"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#265073] mb-2">Cấp độ</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all bg-white text-[#265073]"
                  >
                    <option value="">Chọn cấp độ</option>
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                    <option value="middle">Middle</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead/Manager</option>
                  </select>
                </div>
              </div>
            )}

            {role === "employer" && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#265073] mb-2">Đại diện tuyển dụng</label>
                    <input
                      type="text"
                      value={formData.representative}
                      onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                      placeholder="Tên người liên hệ"
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#265073] mb-2">Số điện thoại liên hệ</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0123456789"
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#265073] mb-2">Loại hình công ty</label>
                    <select
                      value={formData.companyType}
                      onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all bg-white text-[#265073]"
                    >
                      <option value="">Chọn loại hình</option>
                      <option value="product">Product Company</option>
                      <option value="outsourcing">Outsourcing</option>
                      <option value="startup">Startup</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#265073] mb-2">Quy mô công ty</label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:border-[#2D9596] focus:outline-none transition-all bg-white text-[#265073]"
                    >
                      <option value="">Chọn quy mô</option>
                      <option value="1-10">1-10 nhân viên</option>
                      <option value="11-50">11-50 nhân viên</option>
                      <option value="51-200">51-200 nhân viên</option>
                      <option value="201-500">201-500 nhân viên</option>
                      <option value="500+">500+ nhân viên</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-[#9AD0C2] text-[#2D9596] focus:ring-[#2D9596]"
                />
                <span className="text-sm text-[#265073] flex-1">
                  Tôi đồng ý với{" "}
                  <a href="/terms" className="text-[#2D9596] hover:text-[#265073] transition-colors">
                    Điều khoản sử dụng
                  </a>{" "}
                  &{" "}
                  <a href="/privacy" className="text-[#2D9596] hover:text-[#265073] transition-colors">
                    Chính sách bảo mật
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="w-full py-3 bg-[#265073] text-white rounded-full hover:bg-[#2D9596] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                role === "candidate" ? "Đăng ký tài khoản ứng viên" : "Tạo tài khoản nhà tuyển dụng"
              )}
            </button>
          </motion.form>
        )}

        {/* Social Register */}
        {role && (
          <>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#9AD0C2]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-[#265073]/70">
                  Hoặc đăng ký nhanh
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSocialRegister("google")}
                className="w-full py-3 bg-white border-2 border-[#9AD0C2] rounded-xl hover:border-[#2D9596] hover:shadow-md transition-all flex items-center justify-center gap-3 text-[#265073]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Đăng ký với Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialRegister("linkedin")}
                className="w-full py-3 bg-white border-2 border-[#9AD0C2] rounded-xl hover:border-[#2D9596] hover:shadow-md transition-all flex items-center justify-center gap-3 text-[#265073]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Đăng ký với LinkedIn
              </button>
            </div>
          </>
        )}

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-[#265073]/70">
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#2D9596] hover:text-[#265073] transition-colors"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}


