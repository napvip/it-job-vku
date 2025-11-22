"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  Shield,
  Globe,
  Trash2,
  Camera,
  Eye,
  EyeOff,
  Monitor,
  Moon,
  Sun,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  MapPin,
  Mail,
  Phone,
  Save,
  LogOut,
  Check,
  X as XIcon,
} from "lucide-react";

type SettingsTab =
  | "account"
  | "security"
  | "notifications"
  | "privacy"
  | "appearance"
  | "danger";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Account Info State
  const [fullName, setFullName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@email.com");
  const [phone, setPhone] = useState("0901234567");
  const [location, setLocation] = useState("Hà Nội");

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification State
  const [emailNotifications, setEmailNotifications] = useState({
    newJobs: true,
    cvViewed: true,
    interviews: true,
    messages: false,
  });
  const [systemNotifications, setSystemNotifications] = useState({
    followedCompanies: true,
    applicationUpdates: true,
    aiRecommendations: false,
  });

  // Privacy State
  const [profileVisibility, setProfileVisibility] = useState("all");
  const [hideSalary, setHideSalary] = useState(false);
  const [hidePhone, setHidePhone] = useState(true);

  // Appearance State
  const [language, setLanguage] = useState("vi");
  const [darkMode, setDarkMode] = useState(false);

  // Delete Account State
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return null;
    if (password.length < 6) return { text: "Yếu", color: "#C9302C" };
    if (password.length < 10)
      return { text: "Trung bình", color: "#FFD700" };
    return { text: "Mạnh", color: "#2D9596" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const sidebarItems = [
    {
      id: "account" as SettingsTab,
      label: "Thông tin tài khoản",
      icon: User,
    },
    {
      id: "security" as SettingsTab,
      label: "Bảo mật & đăng nhập",
      icon: Lock,
    },
    { id: "notifications" as SettingsTab, label: "Thông báo", icon: Bell },
    {
      id: "privacy" as SettingsTab,
      label: "Quyền riêng tư",
      icon: Shield,
    },
    {
      id: "appearance" as SettingsTab,
      label: "Ngôn ngữ & giao diện",
      icon: Globe,
    },
    { id: "danger" as SettingsTab, label: "Xóa tài khoản", icon: Trash2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[#265073] text-2xl mb-2">
                Thông tin tài khoản
              </h2>
              <p className="text-[#265073]/70 text-sm">
                Cập nhật thông tin cá nhân của bạn
              </p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 p-4 bg-[#ECF4D6] rounded-xl">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] flex items-center justify-center text-white text-2xl">
                {fullName.charAt(0)}
              </div>
              <div>
                <button className="px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Thay ảnh đại diện
                </button>
                <p className="text-[#265073]/60 text-xs mt-1">
                  JPG, PNG tối đa 5MB
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-[#265073] mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
                />
              </div>

              <div>
                <label className="block text-[#265073] mb-2">
                  Email đăng nhập
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg bg-[#ECF4D6]/50 text-[#265073]/60 cursor-not-allowed"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D9596] text-xs">
                    Đã xác thực
                  </span>
                </div>
                <p className="text-[#265073]/60 text-xs mt-1">
                  Liên hệ hỗ trợ để đổi email
                </p>
              </div>

              <div>
                <label className="block text-[#265073] mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
                />
              </div>

              <div>
                <label className="block text-[#265073] mb-2">Địa điểm</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP.HCM">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                </select>
              </div>
            </div>

            <button className="px-6 py-2.5 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Lưu thay đổi
            </button>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[#265073] text-2xl mb-2">
                Bảo mật & đăng nhập
              </h2>
              <p className="text-[#265073]/70 text-sm">
                Quản lý mật khẩu và bảo mật tài khoản
              </p>
            </div>

            {/* Change Password */}
            <div className="p-6 bg-[#ECF4D6] rounded-xl space-y-4">
              <h3 className="text-[#265073] text-lg mb-4">Đổi mật khẩu</h3>

              <div>
                <label className="block text-[#265073] mb-2">
                  Mật khẩu hiện tại
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#265073]/50 hover:text-[#265073]"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#265073] mb-2">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#265073]/50 hover:text-[#265073]"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all"
                          style={{
                            width:
                              passwordStrength.text === "Yếu"
                                ? "33%"
                                : passwordStrength.text === "Trung bình"
                                  ? "66%"
                                  : "100%",
                            backgroundColor: passwordStrength.color,
                          }}
                        />
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#265073] mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border-2 border-[#9AD0C2] rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
                  />
                  <button
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#265073]/50 hover:text-[#265073]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button className="px-6 py-2.5 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors">
                Đổi mật khẩu
              </button>
            </div>

            {/* Active Sessions */}
            <div className="p-6 bg-white border-2 border-[#9AD0C2] rounded-xl">
              <h3 className="text-[#265073] text-lg mb-4">
                Thiết bị & phiên đăng nhập
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-[#2D9596]" />
                    <div>
                      <p className="text-[#265073]">Chrome - Windows</p>
                      <p className="text-[#265073]/60 text-xs">
                        IP: 192.168.1.1 • Hà Nội • Vừa xong
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                    Hiện tại
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#265073]/60" />
                    <div>
                      <p className="text-[#265073]">Safari - iPhone</p>
                      <p className="text-[#265073]/60 text-xs">
                        IP: 192.168.1.2 • Hà Nội • 2 giờ trước
                      </p>
                    </div>
                  </div>
                  <button className="text-[#C9302C] text-sm hover:underline">
                    Đăng xuất
                  </button>
                </div>
              </div>

              <button className="mt-4 px-4 py-2 border-2 border-[#C9302C] text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Đăng xuất khỏi tất cả thiết bị khác
              </button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[#265073] text-2xl mb-2">Thông báo</h2>
              <p className="text-[#265073]/70 text-sm">
                Quản lý cách bạn nhận thông báo từ hệ thống
              </p>
            </div>

            {/* Email Notifications */}
            <div className="p-6 bg-[#ECF4D6] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-[#2D9596]" />
                <h3 className="text-[#265073] text-lg">
                  Thông báo qua Email
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: "newJobs",
                    label: "Khi có job mới phù hợp kỹ năng",
                  },
                  { key: "cvViewed", label: "Khi công ty xem CV" },
                  { key: "interviews", label: "Khi có lịch phỏng vấn mới" },
                  {
                    key: "messages",
                    label: "Khi có tin nhắn từ nhà tuyển dụng",
                  },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer hover:bg-[#ECF4D6]/50 transition-colors"
                  >
                    <span className="text-[#265073]">{item.label}</span>
                    <button
                      onClick={() =>
                        setEmailNotifications((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key as keyof typeof prev],
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        emailNotifications[
                          item.key as keyof typeof emailNotifications
                        ]
                          ? "bg-[#2D9596]"
                          : "bg-[#9AD0C2]"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          emailNotifications[
                            item.key as keyof typeof emailNotifications
                          ]
                            ? "translate-x-7"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            {/* System Notifications */}
            <div className="p-6 bg-white border-2 border-[#9AD0C2] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-[#2D9596]" />
                <h3 className="text-[#265073] text-lg">
                  Thông báo trong hệ thống
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: "followedCompanies",
                    label: "Job mới từ công ty đang theo dõi",
                  },
                  {
                    key: "applicationUpdates",
                    label: "Cập nhật trạng thái ứng tuyển",
                  },
                  { key: "aiRecommendations", label: "Đề xuất AI mới" },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-3 bg-[#ECF4D6] rounded-lg cursor-pointer hover:bg-[#ECF4D6]/70 transition-colors"
                  >
                    <span className="text-[#265073]">{item.label}</span>
                    <button
                      onClick={() =>
                        setSystemNotifications((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key as keyof typeof prev],
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        systemNotifications[
                          item.key as keyof typeof systemNotifications
                        ]
                          ? "bg-[#2D9596]"
                          : "bg-[#9AD0C2]"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          systemNotifications[
                            item.key as keyof typeof systemNotifications
                          ]
                            ? "translate-x-7"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            <button className="px-6 py-2.5 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Lưu cài đặt thông báo
            </button>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[#265073] text-2xl mb-2">
                Quyền riêng tư
              </h2>
              <p className="text-[#265073]/70 text-sm">
                Kiểm soát ai có thể xem hồ sơ của bạn
              </p>
            </div>

            {/* Profile Visibility */}
            <div className="p-6 bg-[#ECF4D6] rounded-xl space-y-3">
              <h3 className="text-[#265073] text-lg mb-4">
                Hiển thị hồ sơ
              </h3>

              <label className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#ECF4D6]/50 transition-colors">
                <input
                  type="radio"
                  name="visibility"
                  value="all"
                  checked={profileVisibility === "all"}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="mt-1 w-4 h-4 text-[#2D9596] accent-[#2D9596]"
                />
                <div className="flex-1">
                  <p className="text-[#265073]">
                    Cho phép tất cả nhà tuyển dụng xem hồ sơ
                  </p>
                  <p className="text-[#265073]/60 text-xs mt-1">
                    Hồ sơ của bạn sẽ hiển thị công khai, giúp tăng cơ hội được
                    nhà tuyển dụng chủ động liên hệ
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#ECF4D6]/50 transition-colors">
                <input
                  type="radio"
                  name="visibility"
                  value="applied"
                  checked={profileVisibility === "applied"}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="mt-1 w-4 h-4 text-[#2D9596] accent-[#2D9596]"
                />
                <div className="flex-1">
                  <p className="text-[#265073]">
                    Chỉ nhà tuyển dụng cho các job tôi đã ứng tuyển
                  </p>
                  <p className="text-[#265073]/60 text-xs mt-1">
                    Chỉ những công ty bạn ứng tuyển mới xem được hồ sơ đầy đủ
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#ECF4D6]/50 transition-colors">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={profileVisibility === "private"}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="mt-1 w-4 h-4 text-[#2D9596] accent-[#2D9596]"
                />
                <div className="flex-1">
                  <p className="text-[#265073]">
                    Ẩn hồ sơ, chỉ tôi mới xem được
                  </p>
                  <p className="text-[#265073]/60 text-xs mt-1">
                    Hồ sơ hoàn toàn riêng tư, không ai có thể tìm thấy
                  </p>
                </div>
              </label>
            </div>

            {/* Additional Privacy Options */}
            <div className="p-6 bg-white border-2 border-[#9AD0C2] rounded-xl space-y-3">
              <h3 className="text-[#265073] text-lg mb-4">
                Tùy chọn bổ sung
              </h3>

              <label className="flex items-start gap-3 p-3 bg-[#ECF4D6] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideSalary}
                  onChange={(e) => setHideSalary(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#2D9596] accent-[#2D9596] rounded"
                />
                <div className="flex-1">
                  <p className="text-[#265073]">
                    Ẩn mức lương mong muốn khỏi nhà tuyển dụng
                  </p>
                  <p className="text-[#265073]/60 text-xs mt-1">
                    Nhà tuyển dụng sẽ không thấy mức lương bạn kỳ vọng
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-[#ECF4D6] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={hidePhone}
                  onChange={(e) => setHidePhone(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#2D9596] accent-[#2D9596] rounded"
                />
                <div className="flex-1">
                  <p className="text-[#265073]">
                    Ẩn số điện thoại, chỉ hiển thị email
                  </p>
                  <p className="text-[#265073]/60 text-xs mt-1">
                    Nhà tuyển dụng chỉ có thể liên hệ qua email
                  </p>
                </div>
              </label>
            </div>

            <button className="px-6 py-2.5 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Lưu cài đặt quyền riêng tư
            </button>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[#265073] text-2xl mb-2">
                Ngôn ngữ & giao diện
              </h2>
              <p className="text-[#265073]/70 text-sm">
                Tùy chỉnh ngôn ngữ và chủ đề hiển thị
              </p>
            </div>

            {/* Language */}
            <div className="p-6 bg-[#ECF4D6] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-[#2D9596]" />
                <h3 className="text-[#265073] text-lg">Ngôn ngữ</h3>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-[#9AD0C2] bg-white rounded-lg focus:border-[#2D9596] outline-none transition-colors text-[#265073]"
              >
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>

            {/* Theme */}
            <div className="p-6 bg-white border-2 border-[#9AD0C2] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-[#2D9596]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#2D9596]" />
                )}
                <h3 className="text-[#265073] text-lg">Giao diện</h3>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white border-2 border-[#9AD0C2] rounded-lg flex items-center justify-center">
                      <Sun className="w-6 h-6 text-[#2D9596]" />
                    </div>
                    <div>
                      <p className="text-[#265073]">Light Mode</p>
                      <p className="text-[#265073]/60 text-xs">
                        Giao diện sáng, dễ nhìn ban ngày
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="theme"
                    checked={!darkMode}
                    onChange={() => setDarkMode(false)}
                    className="w-5 h-5 text-[#2D9596] accent-[#2D9596]"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-[#ECF4D6] rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#265073] rounded-lg flex items-center justify-center">
                      <Moon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[#265073]">Dark Mode</p>
                      <p className="text-[#265073]/60 text-xs">
                        Giao diện tối, bảo vệ mắt ban đêm
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="theme"
                    checked={darkMode}
                    onChange={() => setDarkMode(true)}
                    className="w-5 h-5 text-[#2D9596] accent-[#2D9596]"
                  />
                </label>
              </div>
            </div>

            <button className="px-6 py-2.5 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Lưu cài đặt
            </button>
          </div>
        );

      case "danger":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-[#265073] text-2xl mb-2">
                Khu vực nguy hiểm
              </h2>
              <p className="text-[#265073]/70 text-sm">
                Các hành động không thể hoàn tác
              </p>
            </div>

            {/* Deactivate Account */}
            <div className="p-6 bg-[#FDECEC] border-2 border-[#C9302C] rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-[#C9302C] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-[#C9302C] text-lg mb-2">
                    Vô hiệu hóa tài khoản tạm thời
                  </h3>
                  <p className="text-[#265073]/70 text-sm mb-4">
                    Tài khoản sẽ bị ẩn khỏi hệ thống. Bạn có thể kích hoạt lại
                    bất cứ lúc nào bằng cách đăng nhập.
                  </p>
                  <button className="px-6 py-2.5 border-2 border-[#C9302C] text-[#C9302C] rounded-lg hover:bg-[#F8D7DA] transition-colors">
                    Vô hiệu hóa tài khoản
                  </button>
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className="p-6 bg-[#FDECEC] border-2 border-[#C9302C] rounded-xl">
              <div className="flex items-start gap-3">
                <XIcon className="w-6 h-6 text-[#C9302C] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-[#C9302C] text-lg mb-2">
                    Xóa vĩnh viễn tài khoản
                  </h3>
                  <p className="text-[#265073]/70 text-sm mb-4">
                    <strong>Hành động này không thể hoàn tác.</strong> Tất cả
                    dữ liệu của bạn sẽ bị xóa vĩnh viễn khỏi hệ thống, bao gồm:
                  </p>
                  <ul className="text-[#265073]/70 text-sm space-y-1 mb-4 ml-4">
                    <li>• Hồ sơ cá nhân và CV</li>
                    <li>• Lịch sử ứng tuyển</li>
                    <li>• Tin nhắn và thông báo</li>
                    <li>• Công việc đã lưu</li>
                    <li>• Công ty đã theo dõi</li>
                  </ul>

                  <div className="mb-4">
                    <label className="block text-[#265073] mb-2">
                      Nhập <strong>"XÓA"</strong> để xác nhận
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="Nhập XÓA"
                      className="w-full px-4 py-2.5 border-2 border-[#C9302C] rounded-lg focus:border-[#C9302C] outline-none transition-colors text-[#265073]"
                    />
                  </div>

                  <button
                    disabled={deleteConfirmText !== "XÓA"}
                    className={`px-6 py-2.5 rounded-lg transition-colors ${
                      deleteConfirmText === "XÓA"
                        ? "bg-[#C9302C] text-white hover:bg-[#A02020]"
                        : "bg-[#C9302C]/50 text-white cursor-not-allowed"
                    }`}
                  >
                    Xóa vĩnh viễn tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-16">
      {/* Header */}
      <div className="bg-[#ECF4D6] py-6 border-b-2 border-[#9AD0C2]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#265073] text-4xl mb-3">Cài đặt tài khoản</h1>
            <p className="text-[#2D9596] text-lg">
              Quản lý thông tin, bảo mật và cách bạn nhận thông báo từ hệ thống.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Mobile Dropdown */}
        <div className="lg:hidden mb-6">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as SettingsTab)}
            className="w-full px-4 py-3 bg-white border-2 border-[#9AD0C2] rounded-lg text-[#265073] focus:border-[#2D9596] outline-none"
          >
            {sidebarItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-4 sticky top-24"
            >
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                        isActive
                          ? "bg-[#ECF4D6] text-[#265073]"
                          : "text-[#265073]/70 hover:bg-[#ECF4D6]/50"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D9596] rounded-r-full" />
                      )}
                      <Icon
                        className={`w-5 h-5 ${isActive ? "text-[#2D9596]" : ""}`}
                      />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 lg:p-8 shadow-sm"
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

