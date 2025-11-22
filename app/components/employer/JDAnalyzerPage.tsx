"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Sparkles,
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  Copy,
  Edit3,
  DollarSign,
  Users,
  Target,
  Zap,
  BarChart3,
  FileCheck,
  Code,
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Star,
  TrendingDown,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";

interface JDAnalyzerPageProps {
  onNavigateToEditJob?: (jobId: number) => void;
  onNavigateToJobs?: () => void;
}

export function JDAnalyzerPage({
  onNavigateToEditJob,
  onNavigateToJobs,
}: JDAnalyzerPageProps) {
  const [jdText, setJdText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("optimized");

  // Mock analysis results
  const analysisResults = {
    qualityScore: 82,
    clarityMetrics: [
      { name: "Rõ ràng", score: 75 },
      { name: "Trách nhiệm", score: 60 },
      { name: "Quyền lợi", score: 90 },
      { name: "Ngôn ngữ", score: 82 },
    ],
    weaknesses: [
      "Mô tả trách nhiệm quá chung chung",
      "Thiếu yêu cầu kỹ năng bắt buộc (Docker, Testing)",
      "Không ghi rõ hình thức làm việc",
      "Không có mức lương đề xuất",
    ],
    missingSkills: ["Docker", "CI/CD", "TypeScript", "REST API Testing"],
    unnecessarySkills: [
      "Photoshop",
      "Figma nâng cao (không cần cho Backend)",
      "Excel nâng cao",
    ],
    suggestedSkills: [
      "ReactJS",
      "Redux",
      "Docker",
      "REST API",
      "TypeScript",
      "Git",
      "Agile",
      "Unit Testing",
    ],
    salaryData: [
      { level: "Junior", min: 10, max: 15 },
      { level: "Middle", min: 18, max: 25 },
      { level: "Senior", min: 30, max: 40 },
    ],
    suggestions: [
      {
        icon: Plus,
        text: "Thêm kỹ năng Docker để tăng match score +12%",
        impact: "+12%",
      },
      {
        icon: Edit3,
        text: "Bổ sung mô tả 'Quyền lợi – Công ty hỗ trợ đào tạo'",
        impact: "+8%",
      },
      {
        icon: FileText,
        text: "Viết mô tả trách nhiệm cụ thể hơn để tránh nhầm lẫn",
        impact: "+15%",
      },
      {
        icon: DollarSign,
        text: "Thêm mức lương để tăng ứng viên +30%",
        impact: "+30%",
      },
    ],
    optimizedJD: `**Senior Backend Developer**

**Về chúng tôi:**
FPT Software là công ty công nghệ hàng đầu tại Việt Nam với hơn 30,000 nhân viên toàn cầu.

**Trách nhiệm công việc:**
• Thiết kế và phát triển RESTful APIs sử dụng Node.js/Express
• Xây dựng và tối ưu hệ thống database (PostgreSQL, MongoDB)
• Triển khai CI/CD pipeline và Docker containerization
• Code review và mentoring junior developers
• Tham gia sprint planning và technical discussions

**Yêu cầu:**
• 3+ năm kinh nghiệm Backend development
• Thành thạo Node.js, TypeScript, Express
• Kinh nghiệm với Docker, Kubernetes, CI/CD
• Hiểu biết về microservices architecture
• Kỹ năng làm việc nhóm và giao tiếp tốt

**Quyền lợi:**
• Lương: 25-30 triệu (thỏa thuận theo năng lực)
• Thưởng performance 2 lần/năm
• Bảo hiểm sức khỏe cao cấp
• Hỗ trợ đào tạo và chứng chỉ quốc tế
• Môi trường làm việc hiện đại, flexible working

**Hình thức làm việc:** Hybrid (3 ngày office / 2 ngày WFH)`,
    marketInsights: {
      demand: "Cao",
      trend: "Tăng 15%",
      similarJobs: 127,
      competitiveness: 4.5,
    },
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`Đã tải lên file: ${file.name}`);
      // Mock reading file content
      setTimeout(() => {
        setJdText(
          "Senior Backend Developer\n\nMô tả công việc:\n- Phát triển backend API\n- Làm việc với database\n- Code review\n\nYêu cầu:\n- 3 năm kinh nghiệm\n- Node.js, Express\n- Database skills"
        );
      }, 500);
    }
  };

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      toast.error("Vui lòng nhập mô tả công việc trước khi phân tích");
      return;
    }

    setIsAnalyzing(true);
    toast.info("Đang phân tích JD bằng AI...");

    // Mock AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      toast.success("Phân tích hoàn tất!");
    }, 2000);
  };

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(analysisResults.optimizedJD);
    toast.success("Đã copy JD tối ưu vào clipboard!");
  };

  const handleDownloadPDF = () => {
    toast.success("Đang tải xuống JD tối ưu dạng PDF...");
  };

  const handleApplyToJob = () => {
    toast.success("Đã áp dụng JD tối ưu vào form chỉnh sửa job!");
    if (onNavigateToEditJob) {
      onNavigateToEditJob(1);
    }
  };

  const qualityScoreData = [
    { name: "Score", value: analysisResults.qualityScore },
    { name: "Remaining", value: 100 - analysisResults.qualityScore },
  ];

  const COLORS = ["#2D9596", "#ECF4D6"];

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-[72px] pb-12">
      {/* Header */}
      <div className="bg-[#ECF4D6] border-b-2 border-[#9AD0C2]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-[#265073]">
                  AI Phân tích mô tả công việc (JD Analyzer)
                </h1>
              </div>
              <p className="text-[#2D9596] max-w-3xl">
                Tối ưu mô tả công việc của bạn bằng trí tuệ nhân tạo: cải thiện
                skill, tăng chất lượng ứng viên và tối ưu mức lương.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="px-4 py-2 bg-white text-[#265073] rounded-xl border-2 border-[#9AD0C2] hover:bg-[#9AD0C2] transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Tải JD (File PDF/DOC)</span>
                </div>
              </label>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-6 py-2 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isAnalyzing ? "Đang phân tích..." : "Phân tích bằng AI"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            {!hasAnalyzed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8">
                  <h2 className="text-[#265073] mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Nhập mô tả công việc
                  </h2>

                  <div className="space-y-6">
                    {/* Upload Zone */}
                    <div className="border-2 border-dashed border-[#9AD0C2] rounded-xl p-8 text-center hover:border-[#2D9596] transition-colors">
                      <Upload className="w-12 h-12 text-[#2D9596] mx-auto mb-4" />
                      <p className="text-[#265073] mb-2">
                        Kéo thả file JD vào đây
                      </p>
                      <p className="text-sm text-[#2D9596] mb-4">
                        Hỗ trợ PDF, DOCX, TXT
                      </p>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <span className="px-4 py-2 bg-[#9AD0C2] text-[#265073] rounded-lg hover:bg-[#2D9596] hover:text-white transition-colors inline-block">
                          Chọn file
                        </span>
                      </label>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-[#9AD0C2]" />
                      <span className="text-[#2D9596]">hoặc</span>
                      <div className="flex-1 h-px bg-[#9AD0C2]" />
                    </div>

                    {/* Text Input */}
                    <div>
                      <textarea
                        value={jdText}
                        onChange={(e) => setJdText(e.target.value)}
                        placeholder="Dán mô tả công việc của bạn tại đây để AI phân tích..."
                        className="w-full h-64 px-4 py-3 border-2 border-[#9AD0C2] rounded-xl focus:outline-none focus:border-[#2D9596] resize-none"
                      />
                    </div>

                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full px-6 py-3 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Brain className="w-5 h-5" />
                      <span>
                        {isAnalyzing ? "Đang phân tích..." : "Phân tích JD ngay"}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Analysis Results */}
            <AnimatePresence>
              {hasAnalyzed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Quality Score */}
                  <div className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-8 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-6 h-6" />
                      <h2>Kết quả phân tích AI</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Pie Chart */}
                      <div className="text-center">
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={qualityScoreData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {qualityScoreData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4">
                          <div className="text-4xl font-bold">
                            {analysisResults.qualityScore}/100
                          </div>
                          <p className="text-sm opacity-90 mt-2">
                            JD Quality Score
                          </p>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="flex flex-col justify-center">
                        <div className="flex items-start gap-3 mb-4">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-medium mb-1">
                              JD của bạn ở mức tốt
                            </p>
                            <p className="text-sm opacity-90">
                              AI khuyến nghị cải thiện 4 mục dưới đây để đạt
                              điểm tối đa
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4" />
                          <span>
                            Potential improvement: +18 points
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clarity Metrics */}
                  <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8">
                    <h3 className="text-[#265073] mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Mức độ rõ ràng mô tả
                    </h3>

                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={analysisResults.clarityMetrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#9AD0C2" />
                        <XAxis dataKey="name" stroke="#265073" />
                        <YAxis stroke="#265073" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "2px solid #9AD0C2",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="score" fill="#2D9596" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-[#FBEAEA] rounded-2xl border-2 border-red-200 p-8">
                    <h3 className="text-[#265073] mb-6 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Các điểm yếu cần cải thiện
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResults.weaknesses.map((weakness, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-white rounded-xl border border-red-200"
                        >
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-[#265073] text-sm">{weakness}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Missing Skills */}
                    <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6">
                      <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                        <Minus className="w-5 h-5 text-red-500" />
                        Kỹ năng thiếu
                      </h3>
                      <p className="text-sm text-[#2D9596] mb-4">
                        Kỹ năng này thiếu khiến JD hút ứng viên yếu hơn
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.missingSkills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Unnecessary Skills */}
                    <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6">
                      <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-yellow-600" />
                        Kỹ năng dư thừa
                      </h3>
                      <p className="text-sm text-[#2D9596] mb-4">
                        Không cần thiết cho vị trí này
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.unnecessarySkills.map(
                          (skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm border border-yellow-200"
                            >
                              {skill}
                            </motion.span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* AI Optimization */}
                  <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8">
                    <h3 className="text-[#265073] mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#2D9596]" />
                      Gợi ý tối ưu mô tả
                    </h3>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="optimized">
                          Mô tả đã tối ưu
                        </TabsTrigger>
                        <TabsTrigger value="skills">Skill phù hợp</TabsTrigger>
                        <TabsTrigger value="market">Chuẩn thị trường</TabsTrigger>
                      </TabsList>

                      <TabsContent value="optimized">
                        <div className="bg-[#ECF4D6] rounded-xl p-6 border-2 border-[#9AD0C2]">
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-[#2D9596]">
                              AI đã tối ưu lại mô tả công việc cho bạn:
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={handleCopyOptimized}
                                className="p-2 text-[#2D9596] hover:bg-white rounded-lg transition-colors"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="prose prose-sm max-w-none">
                            <pre className="whitespace-pre-wrap text-[#265073] text-sm leading-relaxed">
                              {analysisResults.optimizedJD}
                            </pre>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="skills">
                        <div className="flex flex-wrap gap-3">
                          {analysisResults.suggestedSkills.map((skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="px-4 py-2 bg-[#2D9596] text-white rounded-xl flex items-center gap-2"
                            >
                              <Code className="w-4 h-4" />
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="market">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-[#ECF4D6] rounded-xl">
                              <p className="text-sm text-[#2D9596] mb-1">
                                JD của bạn
                              </p>
                              <p className="text-2xl text-[#265073]">
                                {analysisResults.qualityScore}/100
                              </p>
                            </div>
                            <div className="p-4 bg-[#ECF4D6] rounded-xl">
                              <p className="text-sm text-[#2D9596] mb-1">
                                Trung bình thị trường
                              </p>
                              <p className="text-2xl text-[#265073]">75/100</p>
                            </div>
                          </div>
                          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                            <div className="flex items-center gap-2 text-green-700">
                              <TrendingUp className="w-5 h-5" />
                              <p className="font-medium">
                                JD của bạn tốt hơn 68% các JD cùng vị trí
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Salary Analysis */}
                  <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8">
                    <h3 className="text-[#265073] mb-6 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#2D9596]" />
                      Mức lương gợi ý theo thị trường
                    </h3>

                    <div className="space-y-6">
                      {analysisResults.salaryData.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#265073] font-medium">
                              {item.level}
                            </span>
                            <span className="text-[#2D9596]">
                              {item.min}-{item.max} triệu
                            </span>
                          </div>
                          <div className="h-3 bg-[#ECF4D6] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.max / 40) * 100}%` }}
                              transition={{ delay: index * 0.2 }}
                              className="h-full bg-gradient-to-r from-[#2D9596] to-[#265073] rounded-full"
                            />
                          </div>
                        </div>
                      ))}

                      <div className="p-4 bg-[#ECF4D6] rounded-xl border-2 border-[#2D9596]">
                        <p className="text-[#265073] font-medium mb-2">
                          AI gợi ý:
                        </p>
                        <p className="text-[#2D9596] mb-4">
                          "Dựa trên yêu cầu skill của bạn, mức lương phù hợp nhất:{" "}
                          <span className="font-bold text-[#265073]">
                            25-30 triệu
                          </span>
                          "
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-[#265073]">
                              Tính cạnh tranh: 4.5/5
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-[#265073]">
                              Nhu cầu: Cao
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Suggestions */}
                  <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8">
                    <h3 className="text-[#265073] mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#2D9596]" />
                      Đề xuất chỉnh sửa
                    </h3>

                    <div className="space-y-3">
                      {analysisResults.suggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-[#ECF4D6] rounded-xl hover:bg-[#9AD0C2] transition-colors cursor-pointer group"
                        >
                          <div className="w-10 h-10 bg-[#2D9596] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#265073] transition-colors">
                            <suggestion.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[#265073]">{suggestion.text}</p>
                          </div>
                          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex-shrink-0">
                            {suggestion.impact}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <button className="w-full mt-6 px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span>Áp dụng tất cả gợi ý AI</span>
                    </button>
                  </div>

                  {/* Export Options */}
                  <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-8">
                    <h3 className="text-[#265073] mb-6 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-[#2D9596]" />
                      Xuất JD tối ưu
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={handleDownloadPDF}
                        className="px-6 py-4 bg-[#ECF4D6] text-[#265073] rounded-xl hover:bg-[#9AD0C2] transition-colors flex items-center justify-center gap-2 border-2 border-[#9AD0C2]"
                      >
                        <Download className="w-5 h-5" />
                        <span>Tải JD (PDF)</span>
                      </button>

                      <button
                        onClick={handleCopyOptimized}
                        className="px-6 py-4 bg-[#ECF4D6] text-[#265073] rounded-xl hover:bg-[#9AD0C2] transition-colors flex items-center justify-center gap-2 border-2 border-[#9AD0C2]"
                      >
                        <Copy className="w-5 h-5" />
                        <span>Copy JD</span>
                      </button>

                      <button
                        onClick={handleApplyToJob}
                        className="px-6 py-4 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-5 h-5" />
                        <span>Áp dụng vào Job</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {!hasAnalyzed && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-12 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-[#265073] mb-3">
                  Chưa có mô tả nào được phân tích
                </h3>
                <p className="text-[#2D9596] mb-6 max-w-md mx-auto">
                  Nhập mô tả công việc của bạn ở trên và nhấn "Phân tích bằng AI"
                  để nhận được insights chi tiết
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="px-6 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-colors inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Bắt đầu phân tích</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Job */}
            <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6 sticky top-24">
              <h3 className="text-[#265073] mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Job đang phân tích
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#2D9596] mb-1">Vị trí</p>
                  <p className="text-[#265073] font-medium">
                    Senior Backend Developer
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#2D9596] mb-1">Kinh nghiệm</p>
                  <p className="text-[#265073]">3+ năm</p>
                </div>

                <div>
                  <p className="text-sm text-[#2D9596] mb-1">Mức lương gợi ý</p>
                  <p className="text-[#265073] font-medium">25-30 triệu</p>
                </div>

                <div>
                  <p className="text-sm text-[#2D9596] mb-1">Hình thức</p>
                  <p className="text-[#265073]">Hybrid</p>
                </div>

                <div className="pt-4 border-t-2 border-[#ECF4D6]">
                  <div className="flex items-center gap-2 text-sm text-[#2D9596] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Hà Nội</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2D9596]">
                    <Clock className="w-4 h-4" />
                    <span>Full-time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl p-6 text-white">
              <h3 className="mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Thị trường hiện tại
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <span className="text-sm">Nhu cầu tuyển dụng</span>
                  <span className="font-bold">
                    {analysisResults.marketInsights.demand}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <span className="text-sm">Trend công nghệ</span>
                  <span className="font-bold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {analysisResults.marketInsights.trend}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <span className="text-sm">Job tương tự</span>
                  <span className="font-bold">
                    {analysisResults.marketInsights.similarJobs}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <span className="text-sm">Competitiveness</span>
                  <span className="font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {analysisResults.marketInsights.competitiveness}/5
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border-2 border-[#9AD0C2] p-6">
              <h3 className="text-[#265073] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={onNavigateToJobs}
                  className="w-full px-4 py-2 text-left text-[#265073] hover:bg-[#ECF4D6] rounded-lg transition-colors flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Xem tất cả job</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-[#265073] hover:bg-[#ECF4D6] rounded-lg transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Xem ứng viên</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-[#265073] hover:bg-[#ECF4D6] rounded-lg transition-colors flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

