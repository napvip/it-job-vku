"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  Camera,
  Edit3,
  Eye,
  Save,
  X,
  Plus,
  Trash2,
  Star,
  Briefcase,
  Check,
  Award,
  Target,
  Heart,
  Zap,
  Shield,
  DollarSign,
  GraduationCap,
  Plane,
  Home,
  TrendingUp,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CompanyProfilePageProps {
  onNavigateToJobDetail?: (jobId: number) => void;
  onNavigateToJobs?: () => void;
}

export function CompanyProfilePage({
  onNavigateToJobDetail,
  onNavigateToJobs,
}: CompanyProfilePageProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Company data (mock)
  const [companyData, setCompanyData] = useState({
    name: "FPT Software",
    industry: ["Software Development", "AI", "Fintech"],
    size: "51-200 employees",
    type: "Product",
    locations: ["Đà Nẵng", "Hà Nội", "TP.HCM"],
    website: "https://fptsoftware.com",
    email: "careers@fpt.com",
    phone: "+84 236 3737 373",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200",
    about: `FPT Software là công ty công nghệ hàng đầu Việt Nam với hơn 30,000 nhân viên toàn cầu. Chúng tôi chuyên về phát triển phần mềm, AI, Cloud và Digital Transformation.

Với hơn 25 năm kinh nghiệm, FPT Software đã và đang cung cấp giải pháp cho hơn 1000 khách hàng tại 30 quốc gia trên thế giới.`,
    mission: "Tạo ra các giải pháp công nghệ thay đổi cuộc sống con người",
    vision: "Trở thành công ty công nghệ top 3 Đông Nam Á vào năm 2030",
    culture: "Văn hóa làm việc năng động, sáng tạo và đề cao giá trị con người",
    achievements: [
      "Top 100 công ty công nghệ tốt nhất Châu Á 2024",
      "Đối tác vàng của Microsoft, AWS, Google Cloud",
      "Chứng nhận ISO 27001, CMMI Level 5",
    ],
    techStack: [
      "React",
      "Node.js",
      "Python",
      "Java",
      "AWS",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "TypeScript",
      "GraphQL",
    ],
  });

  const coreValues = [
    {
      id: 1,
      icon: Zap,
      title: "Innovation",
      description: "Luôn đổi mới và sáng tạo trong mọi sản phẩm và dịch vụ",
    },
    {
      id: 2,
      icon: Heart,
      title: "Customer First",
      description: "Đặt lợi ích khách hàng và nhân viên lên hàng đầu",
    },
    {
      id: 3,
      icon: Shield,
      title: "Integrity",
      description: "Trung thực, minh bạch trong mọi hoạt động kinh doanh",
    },
    {
      id: 4,
      icon: Target,
      title: "Excellence",
      description: "Cam kết chất lượng cao nhất trong mọi dự án",
    },
    {
      id: 5,
      icon: Users,
      title: "Teamwork",
      description: "Hợp tác chặt chẽ, cùng nhau phát triển",
    },
    {
      id: 6,
      icon: TrendingUp,
      title: "Growth",
      description: "Học hỏi và phát triển không ngừng",
    },
  ];

  const benefits = [
    {
      id: 1,
      icon: DollarSign,
      title: "Lương cạnh tranh",
      description: "Mức lương hấp dẫn theo năng lực",
    },
    {
      id: 2,
      icon: Award,
      title: "Thưởng hiệu quả",
      description: "Thưởng performance 2 lần/năm",
    },
    {
      id: 3,
      icon: Shield,
      title: "Bảo hiểm 100%",
      description: "BHXH, BHYT, BHTN đầy đủ",
    },
    {
      id: 4,
      icon: Plane,
      title: "Du lịch hàng năm",
      description: "Team building, công tác trong nước và ngoài nước",
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Đào tạo nội bộ",
      description: "Chương trình đào tạo và chứng chỉ quốc tế",
    },
    {
      id: 6,
      icon: Home,
      title: "Làm việc linh hoạt",
      description: "Remote 1-2 ngày/tuần, flexible working",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
  ];

  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      salary: "25-30 triệu",
      location: "Hà Nội",
      skills: ["React", "TypeScript", "Next.js"],
      status: "Đang tuyển",
      applications: 24,
    },
    {
      id: 2,
      title: "Backend Developer (NodeJS)",
      salary: "20-28 triệu",
      location: "TP.HCM",
      skills: ["Node.js", "MongoDB", "AWS"],
      status: "Đang tuyển",
      applications: 18,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      salary: "18-25 triệu",
      location: "Đà Nẵng",
      skills: ["Figma", "Adobe XD", "UI Design"],
      status: "Đang tuyển",
      applications: 31,
    },
  ];

  const reviews = [
    {
      id: 1,
      author: "Nguyễn Văn An",
      avatar: "A",
      rating: 5,
      title: "Môi trường làm việc tuyệt vời",
      content:
        "Công ty có văn hóa làm việc cực kỳ tốt, đồng nghiệp thân thiện, cơ hội học hỏi và thăng tiến rõ ràng. Lương thưởng đúng hạn, đầy đủ phúc lợi.",
      date: "2 tuần trước",
      position: "Senior Developer",
    },
    {
      id: 2,
      author: "Trần Thị Mai",
      avatar: "M",
      rating: 4,
      title: "Nơi tốt để phát triển sự nghiệp",
      content:
        "Công ty tạo điều kiện tốt cho nhân viên phát triển. Dự án đa dạng, công nghệ mới. Work-life balance khá ổn.",
      date: "1 tháng trước",
      position: "UI/UX Designer",
    },
    {
      id: 3,
      author: "Lê Hoàng",
      avatar: "H",
      rating: 5,
      title: "Highly recommended!",
      content:
        "Great place to work. Modern tech stack, excellent benefits, and supportive management. The team is very collaborative and talented.",
      date: "3 tuần trước",
      position: "Tech Lead",
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 70, count: 142 },
    { stars: 4, percentage: 20, count: 41 },
    { stars: 3, percentage: 5, count: 10 },
    { stars: 2, percentage: 3, count: 6 },
    { stars: 1, percentage: 2, count: 4 },
  ];

  const averageRating = 4.5;
  const totalReviews = 203;

  const handleSave = () => {
    toast.success("Đã lưu thay đổi hồ sơ công ty!");
    setIsEditMode(false);
  };

  const handleCancel = () => {
    toast.info("Đã hủy chỉnh sửa");
    setIsEditMode(false);
  };

  const handleUploadCover = () => {
    toast.success("Đang tải ảnh bìa...");
  };

  const handleUploadLogo = () => {
    toast.success("Đang tải logo...");
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[#265073] mb-2">Hồ sơ công ty</h1>
              <p className="text-[#2D9596]">
                Quản lý thông tin thương hiệu tuyển dụng hiển thị tới ứng viên.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isEditMode ? (
                <>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="px-6 py-2 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Chỉnh sửa hồ sơ</span>
                  </button>
                  <button className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#9AD0C2] transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Xem như ứng viên</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu thay đổi</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#9AD0C2] transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Hủy</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Cover Image & Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Cover Image */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden group">
            <ImageWithFallback
              src={companyData.coverImage}
              alt="Company Cover"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D9596]/60 to-[#265073]/60" />

            {/* Change Cover Button */}
            {isEditMode && (
              <button
                onClick={handleUploadCover}
                className="absolute top-4 right-4 px-4 py-2 bg-white text-[#2D9596] rounded-full hover:bg-[#ECF4D6] transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100"
              >
                <Camera className="w-4 h-4" />
                <span>Thay ảnh bìa</span>
              </button>
            )}

            {/* Logo */}
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <div className="relative group/logo">
                <div className="w-24 h-24 bg-white rounded-2xl border-4 border-[#ECF4D6] overflow-hidden">
                  <ImageWithFallback
                    src={companyData.logo}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditMode && (
                  <button
                    onClick={handleUploadLogo}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity rounded-2xl"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8 mt-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="text-sm text-[#2D9596] mb-2 block">
                  Tên công ty
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={companyData.name}
                    onChange={(e) =>
                      setCompanyData({ ...companyData, name: e.target.value })
                    }
                    className="w-full text-2xl text-[#265073] border-2 border-[#9AD0C2] rounded-xl px-4 py-2 focus:outline-none focus:border-[#2D9596]"
                  />
                ) : (
                  <h2 className="text-[#265073] text-2xl">{companyData.name}</h2>
                )}
              </div>

              {/* Industry */}
              <div>
                <label className="text-sm text-[#2D9596] mb-2 block">
                  Ngành nghề
                </label>
                <div className="flex flex-wrap gap-2">
                  {companyData.industry.map((ind, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-[#2D9596] text-white rounded-lg text-sm"
                    >
                      {ind}
                    </span>
                  ))}
                  {isEditMode && (
                    <button className="px-3 py-1.5 border-2 border-dashed border-[#2D9596] text-[#2D9596] rounded-lg text-sm hover:bg-[#9AD0C2] transition-colors">
                      + Thêm
                    </button>
                  )}
                </div>
              </div>

              {/* Company Size & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#2D9596] mb-2 block">
                    Quy mô
                  </label>
                  <div className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-xl flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{companyData.size}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#2D9596] mb-2 block">
                    Loại hình
                  </label>
                  <div className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-xl flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{companyData.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Locations */}
              <div>
                <label className="text-sm text-[#2D9596] mb-2 block flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Địa điểm
                </label>
                <p className="text-[#265073]">
                  {companyData.locations.join(" • ")}
                </p>
              </div>

              {/* Website */}
              <div>
                <label className="text-sm text-[#2D9596] mb-2 block flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </label>
                <a
                  href={companyData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2D9596] hover:text-[#265073] flex items-center gap-2"
                >
                  {companyData.website}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-[#2D9596] mb-2 block flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-[#265073]"
                >
                  {companyData.email}
                </a>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-[#2D9596] mb-2 block flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Hotline
                </label>
                <a href={`tel:${companyData.phone}`} className="text-[#265073]">
                  {companyData.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Company */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#265073] text-xl">Giới thiệu công ty</h2>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Chỉnh sửa</span>
              </button>
            )}
          </div>

          {isEditMode ? (
            <textarea
              value={companyData.about}
              onChange={(e) =>
                setCompanyData({ ...companyData, about: e.target.value })
              }
              className="w-full h-40 border-2 border-[#9AD0C2] rounded-xl px-4 py-3 focus:outline-none focus:border-[#2D9596] resize-none"
            />
          ) : (
            <p className="text-[#265073] whitespace-pre-line leading-relaxed">
              {companyData.about}
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Mission */}
            <div className="p-4 bg-[#ECF4D6] rounded-xl">
              <h3 className="text-[#2D9596] mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Sứ mệnh
              </h3>
              <p className="text-[#265073] text-sm">{companyData.mission}</p>
            </div>

            {/* Vision */}
            <div className="p-4 bg-[#ECF4D6] rounded-xl">
              <h3 className="text-[#2D9596] mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tầm nhìn
              </h3>
              <p className="text-[#265073] text-sm">{companyData.vision}</p>
            </div>

            {/* Culture */}
            <div className="p-4 bg-[#ECF4D6] rounded-xl">
              <h3 className="text-[#2D9596] mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Văn hóa
              </h3>
              <p className="text-[#265073] text-sm">{companyData.culture}</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-6">
            <h3 className="text-[#265073] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2D9596]" />
              Thành tựu nổi bật
            </h3>
            <ul className="space-y-2">
              {companyData.achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[#265073]"
                >
                  <Check className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Culture Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#265073] text-xl">Văn hóa & Hoạt động</h2>
            {isEditMode && (
              <button className="px-4 py-2 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Thêm hình ảnh</span>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {isEditMode && (
                  <button className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8"
        >
          <h2 className="text-[#265073] text-xl mb-6">Giá trị cốt lõi</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-[#ECF4D6] rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#2D9596] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[#265073] mb-2">{value.title}</h3>
                  <p className="text-[#265073]/70 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#265073] text-xl">Công nghệ & Tech Stack</h2>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="text-[#2D9596] hover:text-[#265073] transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Chỉnh sửa</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {companyData.techStack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-xl flex items-center gap-2 group"
              >
                {tech}
                {isEditMode && (
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </motion.span>
            ))}
            {isEditMode && (
              <button className="px-4 py-2 border-2 border-dashed border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#9AD0C2] transition-colors">
                + Thêm công nghệ
              </button>
            )}
          </div>
        </motion.div>

        {/* Active Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#265073] text-xl flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Vị trí tuyển dụng đang mở
            </h2>
            <button
              onClick={onNavigateToJobs}
              className="text-[#2D9596] hover:text-[#265073] transition-colors"
            >
              Xem tất cả →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {activeJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-[#ECF4D6] rounded-2xl hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onNavigateToJobDetail?.(job.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[#265073]">{job.title}</h3>
                  <span className="px-2 py-1 bg-[#2D9596] text-white text-xs rounded-full">
                    {job.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#265073]">
                    <DollarSign className="w-4 h-4 text-[#2D9596]" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#265073]">
                    <MapPin className="w-4 h-4 text-[#2D9596]" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#265073]">
                    <Users className="w-4 h-4 text-[#2D9596]" />
                    {job.applications} ứng viên
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white text-[#265073] rounded-lg text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#265073] text-xl">Đánh giá công ty</h2>
            <button className="text-[#2D9596] hover:text-[#265073] transition-colors">
              Quản lý đánh giá →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-5xl text-[#265073] font-bold mb-2">
                {averageRating}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[#265073]/70 text-sm">
                {totalReviews} đánh giá
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="md:col-span-2 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-[#265073]">{item.stars}</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="flex-1 h-3 bg-[#ECF4D6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2D9596] to-[#9AD0C2]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#265073]/70 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 bg-[#ECF4D6] rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#9AD0C2] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {review.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-[#265073]">{review.author}</h3>
                        <p className="text-sm text-[#265073]/70">
                          {review.position}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-[#265073]/70">
                          {review.date}
                        </p>
                      </div>
                    </div>

                    <h4 className="text-[#265073] font-medium mb-2">
                      {review.title}
                    </h4>
                    <p className="text-[#265073]/80 text-sm leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8"
        >
          <h2 className="text-[#265073] text-xl mb-6">Chính sách & Phúc lợi</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-[#ECF4D6] rounded-xl"
                >
                  <div className="w-10 h-10 bg-[#2D9596] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#265073] mb-1">{benefit.title}</h3>
                    <p className="text-[#265073]/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Employer Branding Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={companyData.logo}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl mb-2">{companyData.name}</h2>
                <p className="opacity-90 mb-4">
                  Nơi khởi đầu sự nghiệp của bạn trong lĩnh vực công nghệ
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{activeJobs.length} vị trí đang tuyển</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{averageRating}/5.0 đánh giá</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onNavigateToJobs}
              className="px-6 py-3 bg-white text-[#265073] rounded-xl hover:bg-[#ECF4D6] transition-colors flex items-center gap-2"
            >
              <span>Xem tất cả việc làm</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <ImageWithFallback
                src={selectedImage}
                alt="Gallery Image"
                className="w-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Edit Bar */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#9AD0C2] shadow-2xl z-40"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <p className="text-[#265073]">
                <span className="font-medium">Chế độ chỉnh sửa</span> - Thay đổi
                sẽ được lưu khi bạn nhấn "Lưu thay đổi"
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border-2 border-[#2D9596] text-[#2D9596] rounded-xl hover:bg-[#9AD0C2] transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

