"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Camera,
  Save,
  X,
  Check,
  Briefcase,
  Calendar,
  FileText,
  Image as ImageIcon,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { auth, getUserData, updateUserData, UserData } from "../../../lib/firebase";

interface CompanyData {
  companyName: string;
  companyType: string;
  companySize: string;
  industry: string;
  founded: string;
  taxCode: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  address: string;
  description: string;
  benefits: string[];
  images: string[];
  logo: string;
}

export function CompanySettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [newBenefit, setNewBenefit] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CompanyData>({
    companyName: "",
    companyType: "",
    companySize: "",
    industry: "",
    founded: "",
    taxCode: "",
    phone: "",
    email: "",
    website: "",
    location: "",
    address: "",
    description: "",
    benefits: [],
    images: [],
    logo: "",
  });

  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = async () => {
    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const userData = await getUserData(auth.currentUser.uid);
      
      if (userData) {
        setFormData({
          companyName: userData.companyName || "",
          companyType: userData.companyType || "",
          companySize: userData.companySize || "",
          industry: (userData as unknown as CompanyData).industry || "",
          founded: (userData as unknown as CompanyData).founded || "",
          taxCode: (userData as unknown as CompanyData).taxCode || "",
          phone: userData.phone || "",
          email: userData.email || "",
          website: (userData as unknown as CompanyData).website || "",
          location: (userData as unknown as CompanyData).location || "",
          address: (userData as unknown as CompanyData).address || "",
          description: (userData as unknown as CompanyData).description || "",
          benefits: (userData as unknown as CompanyData).benefits || [],
          images: (userData as unknown as CompanyData).images || [],
          logo: (userData as unknown as CompanyData).logo || "",
        });
      }
    } catch (error) {
      console.error("Error loading company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CompanyData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    setSaving(true);
    try {
      await updateUserData(auth.currentUser.uid, {
        ...formData,
      } as Partial<UserData>);

      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error("Error saving company data:", error);
      alert("Cập nhật thông tin thất bại!");
    } finally {
      setSaving(false);
    }
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh!");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Kích thước ảnh tối đa là 2MB!");
      return;
    }

    setUploadingLogo(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        setFormData((prev) => ({ ...prev, logo: url }));
      } else {
        alert("Tải ảnh lên thất bại!");
      }
    } finally {
      setUploadingLogo(false);
      // Reset input
      if (logoInputRef.current) {
        logoInputRef.current.value = "";
      }
    }
  };

  // Handle company image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh!");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước ảnh tối đa là 5MB!");
      return;
    }

    // Max 8 images
    if (formData.images.length >= 8) {
      alert("Tối đa 8 ảnh!");
      return;
    }

    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
      } else {
        alert("Tải ảnh lên thất bại!");
      }
    } finally {
      setUploadingImage(false);
      // Reset input
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  // Handle remove image
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const companySizes = [
    "1-10 nhân viên",
    "11-50 nhân viên",
    "51-200 nhân viên",
    "201-500 nhân viên",
    "501-1000 nhân viên",
    "1000+ nhân viên",
  ];

  const companyTypes = [
    "Công ty TNHH",
    "Công ty Cổ phần",
    "Công ty tư nhân",
    "Doanh nghiệp nhà nước",
    "Công ty nước ngoài",
    "Startup",
    "Tổ chức phi lợi nhuận",
  ];

  const industries = [
    "Công nghệ thông tin",
    "Phần mềm",
    "E-commerce",
    "Fintech",
    "AI / Machine Learning",
    "Game",
    "EdTech",
    "HealthTech",
    "Logistics",
    "Marketing",
    "Tư vấn",
    "Khác",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2D9596] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#265073]">Đang tải thông tin công ty...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#265073] mb-2">
            Cài đặt công ty
          </h1>
          <p className="text-[#2D9596]">
            Quản lý và cập nhật thông tin công ty của bạn
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo & Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#265073] mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#2D9596]" />
                Thông tin cơ bản
              </h2>

              {/* Logo Upload */}
              <div className="mb-8">
                <label className="block text-sm text-[#265073] mb-3">
                  Logo công ty
                </label>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {formData.logo ? (
                      <img
                        src={formData.logo}
                        alt="Company Logo"
                        className="w-24 h-24 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2D9596] to-[#265073] flex items-center justify-center text-white text-3xl font-bold">
                        {formData.companyName.charAt(0) || "C"}
                      </div>
                    )}
                    <button 
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploadingLogo}
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#2D9596] rounded-full flex items-center justify-center text-white hover:bg-[#265073] transition-colors shadow-lg disabled:opacity-50"
                    >
                      {uploadingLogo ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <button 
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploadingLogo}
                      className="px-4 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg hover:bg-[#9AD0C2]/30 transition-colors text-sm mb-2 disabled:opacity-50 flex items-center gap-2"
                    >
                      {uploadingLogo && <Loader2 className="w-4 h-4 animate-spin" />}
                      {uploadingLogo ? "Đang tải..." : "Tải ảnh lên"}
                    </button>
                    <p className="text-xs text-[#265073]/60">
                      JPG, PNG. Tối đa 2MB. Kích thước 200x200px
                    </p>
                    {formData.logo && (
                      <button
                        onClick={() => setFormData((prev) => ({ ...prev, logo: "" }))}
                        className="text-xs text-red-500 hover:text-red-700 mt-1"
                      >
                        Xóa logo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div className="mb-6">
                <label className="block text-sm text-[#265073] mb-2">
                  Tên công ty <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                  placeholder="Nhập tên công ty"
                />
              </div>

              {/* Company Type & Size */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    Loại hình công ty
                  </label>
                  <select
                    value={formData.companyType}
                    onChange={(e) => handleChange("companyType", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors bg-white"
                  >
                    <option value="">Chọn loại hình</option>
                    {companyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    Quy mô công ty
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleChange("companySize", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors bg-white"
                  >
                    <option value="">Chọn quy mô</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Industry & Founded */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    Ngành nghề
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors bg-white"
                  >
                    <option value="">Chọn ngành nghề</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    Năm thành lập
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
                    <input
                      type="text"
                      value={formData.founded}
                      onChange={(e) => handleChange("founded", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                      placeholder="VD: 2020"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Code */}
              <div>
                <label className="block text-sm text-[#265073] mb-2">
                  Mã số thuế
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
                  <input
                    type="text"
                    value={formData.taxCode}
                    onChange={(e) => handleChange("taxCode", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                    placeholder="Nhập mã số thuế"
                  />
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#265073] mb-6 flex items-center gap-2">
                <Phone className="w-6 h-6 text-[#2D9596]" />
                Thông tin liên hệ
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                      placeholder="0123 456 789"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#265073] mb-2">
                    Email công ty
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                      placeholder="contact@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-[#265073] mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                    placeholder="https://company.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-[#265073] mb-2">
                  Tỉnh/Thành phố
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                    placeholder="VD: Hồ Chí Minh, Hà Nội..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#265073] mb-2">
                  Địa chỉ chi tiết
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors resize-none"
                  placeholder="Số nhà, đường, quận/huyện..."
                />
              </div>
            </motion.div>

            {/* Company Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#265073] mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#2D9596]" />
                Giới thiệu công ty
              </h2>

              <div>
                <label className="block text-sm text-[#265073] mb-2">
                  Mô tả về công ty
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors resize-none"
                  placeholder="Giới thiệu về công ty, văn hóa, sứ mệnh, tầm nhìn..."
                />
                <p className="text-xs text-[#265073]/60 mt-2">
                  {formData.description.length}/2000 ký tự
                </p>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#265073] mb-6 flex items-center gap-2">
                <Check className="w-6 h-6 text-[#2D9596]" />
                Phúc lợi công ty
              </h2>

              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddBenefit();
                      }
                    }}
                    className="flex-1 px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] transition-colors"
                    placeholder="Nhập phúc lợi (VD: Bảo hiểm sức khỏe, Du lịch hàng năm...)"
                  />
                  <button
                    onClick={handleAddBenefit}
                    className="px-4 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ECF4D6] text-[#265073] rounded-lg"
                  >
                    <Check className="w-4 h-4 text-[#2D9596]" />
                    <span>{benefit}</span>
                    <button
                      onClick={() => handleRemoveBenefit(index)}
                      className="ml-1 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                {formData.benefits.length === 0 && (
                  <p className="text-[#265073]/60 text-sm">
                    Chưa có phúc lợi nào. Thêm phúc lợi để thu hút ứng viên.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Company Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#265073] mb-6 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-[#2D9596]" />
                Hình ảnh công ty
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video bg-[#ECF4D6] rounded-xl overflow-hidden group"
                  >
                    <img
                      src={img}
                      alt={`Company ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.images.length < 8 && (
                  <button 
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="aspect-video border-2 border-dashed border-[#9AD0C2] rounded-xl flex flex-col items-center justify-center gap-2 text-[#2D9596] hover:border-[#2D9596] hover:bg-[#ECF4D6] transition-colors disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="text-sm">Đang tải...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-8 h-8" />
                        <span className="text-sm">Thêm ảnh</span>
                      </>
                    )}
                  </button>
                )}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-[#265073]/60 mt-4">
                Tải lên hình ảnh văn phòng, team, sự kiện... (Tối đa 8 ảnh, mỗi ảnh 5MB) - Đã có {formData.images.length}/8 ảnh
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Save Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg sticky top-24"
            >
              <h3 className="font-bold text-[#265073] mb-4">Lưu thay đổi</h3>
              <p className="text-sm text-[#265073]/70 mb-6">
                Đừng quên lưu các thay đổi của bạn trước khi rời khỏi trang.
              </p>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Lưu thông tin
                  </>
                )}
              </button>
            </motion.div>

            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="font-bold text-[#265073] mb-4">Hoàn thiện hồ sơ</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#265073]">Tiến độ</span>
                  <span className="text-sm font-bold text-[#2D9596]">
                    {Math.round(
                      ((formData.companyName ? 1 : 0) +
                        (formData.companyType ? 1 : 0) +
                        (formData.companySize ? 1 : 0) +
                        (formData.phone ? 1 : 0) +
                        (formData.email ? 1 : 0) +
                        (formData.location ? 1 : 0) +
                        (formData.description ? 1 : 0) +
                        (formData.benefits.length > 0 ? 1 : 0)) /
                        8 *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="h-2 bg-[#ECF4D6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2D9596] to-[#265073] transition-all duration-500"
                    style={{
                      width: `${
                        ((formData.companyName ? 1 : 0) +
                          (formData.companyType ? 1 : 0) +
                          (formData.companySize ? 1 : 0) +
                          (formData.phone ? 1 : 0) +
                          (formData.email ? 1 : 0) +
                          (formData.location ? 1 : 0) +
                          (formData.description ? 1 : 0) +
                          (formData.benefits.length > 0 ? 1 : 0)) /
                        8 *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-[#265073]/70">
                Hồ sơ hoàn thiện giúp thu hút nhiều ứng viên hơn.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] shadow-lg"
            >
              <h3 className="font-bold text-[#265073] mb-4">Thống kê</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#265073]/70">Tin tuyển dụng</span>
                  <span className="font-bold text-[#265073]">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#265073]/70">Lượt xem hồ sơ</span>
                  <span className="font-bold text-[#265073]">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#265073]/70">Ứng viên tiềm năng</span>
                  <span className="font-bold text-[#265073]">0</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Cập nhật thành công!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
