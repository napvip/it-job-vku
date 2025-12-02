"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code,
  Palette,
  Database,
  TestTube,
  Brain,
  Shield,
  Cloud,
  Globe,
  Clock,
  BookOpen,
  ChevronRight,
  Info,
} from "lucide-react";

export interface SetupConfig {
  position: string;
  level: string;
  language: string;
  duration: string;
  questionCount: string;
}

interface AIInterviewSetupProps {
  onStart: (config: SetupConfig) => void;
}

const positions = [
  { id: "frontend", name: "Frontend Developer", icon: Code, color: "from-blue-500 to-blue-600" },
  { id: "backend", name: "Backend Developer", icon: Database, color: "from-green-500 to-green-600" },
  { id: "fullstack", name: "Fullstack Developer", icon: Cloud, color: "from-purple-500 to-purple-600" },
  { id: "mobile", name: "Mobile Developer", icon: Code, color: "from-orange-500 to-orange-600" },
  { id: "devops", name: "DevOps Engineer", icon: Shield, color: "from-red-500 to-red-600" },
  { id: "ai-ml", name: "AI/ML Engineer", icon: Brain, color: "from-pink-500 to-pink-600" },
  { id: "data", name: "Data Engineer", icon: Database, color: "from-indigo-500 to-indigo-600" },
  { id: "qa", name: "QA/Tester", icon: TestTube, color: "from-yellow-500 to-yellow-600" },
  { id: "uxui", name: "UX/UI Designer", icon: Palette, color: "from-teal-500 to-teal-600" },
];

const levels = [
  { id: "intern", name: "Intern/Thực tập sinh", description: "0-6 tháng kinh nghiệm" },
  { id: "fresher", name: "Fresher", description: "0-1 năm kinh nghiệm" },
  { id: "junior", name: "Junior", description: "1-2 năm kinh nghiệm" },
  { id: "middle", name: "Middle", description: "2-4 năm kinh nghiệm" },
  { id: "senior", name: "Senior", description: "4+ năm kinh nghiệm" },
  { id: "lead", name: "Lead/Manager", description: "5+ năm + quản lý team" },
];

const languages = [
  { id: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { id: "en", name: "English", flag: "🇬🇧" },
];

const durations = [
  { id: "15", name: "15 phút", questions: "5-7 câu hỏi" },
  { id: "30", name: "30 phút", questions: "8-12 câu hỏi" },
  { id: "45", name: "45 phút", questions: "12-15 câu hỏi" },
];

export function AIInterviewSetup({ onStart }: AIInterviewSetupProps) {
  const [config, setConfig] = useState<SetupConfig>({
    position: "",
    level: "",
    language: "vi",
    duration: "30",
    questionCount: "10",
  });

  const [step, setStep] = useState(1);

  const canProceed = () => {
    if (step === 1) return config.position !== "";
    if (step === 2) return config.level !== "";
    if (step === 3) return config.language !== "";
    if (step === 4) return config.duration !== "";
    return false;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onStart(config);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECF4D6] via-[#9AD0C2]/20 to-[#ECF4D6] py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg mb-6">
            <Sparkles className="w-6 h-6 text-[#2D9596]" />
            <span className="text-[#265073] font-medium">AI Interview Practice</span>
          </div>
          <h1 className="text-4xl text-[#265073] mb-3">
            Luyện tập phỏng vấn với AI
          </h1>
          <p className="text-[#2D9596] text-lg">
            Chuẩn bị kỹ lưỡng cho buổi phỏng vấn thật của bạn
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: s * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= s
                    ? "bg-[#2D9596] text-white"
                    : "bg-white text-[#265073] border-2 border-[#9AD0C2]"
                }`}
              >
                {s}
              </motion.div>
              {s < 4 && (
                <div
                  className={`w-16 h-1 transition-all duration-300 ${
                    step > s ? "bg-[#2D9596]" : "bg-[#9AD0C2]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#9AD0C2]"
        >
          {/* Step 1: Position */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl text-[#265073] mb-3 flex items-center gap-3">
                <Code className="w-7 h-7 text-[#2D9596]" />
                Chọn vị trí bạn muốn phỏng vấn
              </h2>
              <p className="text-[#2D9596] mb-8">
                AI sẽ tạo câu hỏi phù hợp với vị trí bạn chọn
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {positions.map((pos) => {
                  const Icon = pos.icon;
                  return (
                    <motion.button
                      key={pos.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfig({ ...config, position: pos.id })}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        config.position === pos.id
                          ? "border-[#2D9596] bg-gradient-to-br from-[#ECF4D6] to-white shadow-lg"
                          : "border-[#9AD0C2] hover:border-[#2D9596] bg-white"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pos.color} flex items-center justify-center mb-4 mx-auto`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-[#265073] font-medium text-center">
                        {pos.name}
                      </h3>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Level */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl text-[#265073] mb-3 flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-[#2D9596]" />
                Cấp độ kinh nghiệm của bạn
              </h2>
              <p className="text-[#2D9596] mb-8">
                Độ khó câu hỏi sẽ được điều chỉnh theo level
              </p>

              <div className="space-y-3">
                {levels.map((lvl) => (
                  <motion.button
                    key={lvl.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setConfig({ ...config, level: lvl.id })}
                    className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${
                      config.level === lvl.id
                        ? "border-[#2D9596] bg-gradient-to-r from-[#ECF4D6] to-white shadow-lg"
                        : "border-[#9AD0C2] hover:border-[#2D9596] bg-white"
                    }`}
                  >
                    <div className="text-left">
                      <h3 className="text-[#265073] font-medium text-lg">
                        {lvl.name}
                      </h3>
                      <p className="text-[#2D9596] text-sm">{lvl.description}</p>
                    </div>
                    {config.level === lvl.id && (
                      <div className="w-6 h-6 bg-[#2D9596] rounded-full flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Language */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl text-[#265073] mb-3 flex items-center gap-3">
                <Globe className="w-7 h-7 text-[#2D9596]" />
                Ngôn ngữ phỏng vấn
              </h2>
              <p className="text-[#2D9596] mb-8">
                Chọn ngôn ngữ bạn muốn thực hiện cuộc phỏng vấn
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setConfig({ ...config, language: lang.id })}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                      config.language === lang.id
                        ? "border-[#2D9596] bg-gradient-to-br from-[#ECF4D6] to-white shadow-lg"
                        : "border-[#9AD0C2] hover:border-[#2D9596] bg-white"
                    }`}
                  >
                    <div className="text-6xl mb-4">{lang.flag}</div>
                    <h3 className="text-[#265073] font-medium text-xl">
                      {lang.name}
                    </h3>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Duration */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl text-[#265073] mb-3 flex items-center gap-3">
                <Clock className="w-7 h-7 text-[#2D9596]" />
                Thời lượng phỏng vấn
              </h2>
              <p className="text-[#2D9596] mb-8">
                Chọn thời gian phù hợp với lịch trình của bạn
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {durations.map((dur) => (
                  <motion.button
                    key={dur.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setConfig({ ...config, duration: dur.id })}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      config.duration === dur.id
                        ? "border-[#2D9596] bg-gradient-to-br from-[#ECF4D6] to-white shadow-lg"
                        : "border-[#9AD0C2] hover:border-[#2D9596] bg-white"
                    }`}
                  >
                    <Clock className="w-10 h-10 text-[#2D9596] mb-3 mx-auto" />
                    <h3 className="text-[#265073] font-medium text-xl mb-2">
                      {dur.name}
                    </h3>
                    <p className="text-[#2D9596] text-sm">{dur.questions}</p>
                  </motion.button>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-[#ECF4D6] to-white rounded-2xl p-6 border-2 border-[#9AD0C2]">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="w-5 h-5 text-[#2D9596] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[#265073] font-medium mb-2">
                      Tổng quan buổi phỏng vấn
                    </h3>
                    <div className="space-y-2 text-sm text-[#2D9596]">
                      <p>
                        🎯 Vị trí:{" "}
                        <span className="font-medium text-[#265073]">
                          {positions.find((p) => p.id === config.position)?.name}
                        </span>
                      </p>
                      <p>
                        📊 Level:{" "}
                        <span className="font-medium text-[#265073]">
                          {levels.find((l) => l.id === config.level)?.name}
                        </span>
                      </p>
                      <p>
                        🌐 Ngôn ngữ:{" "}
                        <span className="font-medium text-[#265073]">
                          {languages.find((l) => l.id === config.language)?.name}
                        </span>
                      </p>
                      <p>
                        ⏱ Thời gian:{" "}
                        <span className="font-medium text-[#265073]">
                          {config.duration} phút
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 bg-white border-2 border-[#9AD0C2] text-[#265073] rounded-xl hover:bg-[#ECF4D6] transition-all duration-300"
              >
                Quay lại
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                canProceed()
                  ? "bg-[#2D9596] text-white hover:bg-[#265073] shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {step === 4 ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  Bắt đầu phỏng vấn
                </>
              ) : (
                <>
                  Tiếp tục
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#9AD0C2]"
        >
          <h3 className="text-[#265073] font-medium mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2D9596]" />
            Lời khuyên trước khi bắt đầu
          </h3>
          <ul className="space-y-2 text-[#2D9596] text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#2D9596]">✓</span>
              <span>Tìm một không gian yên tĩnh để tập trung</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2D9596]">✓</span>
              <span>Chuẩn bị microphone và camera (nếu có)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2D9596]">✓</span>
              <span>Trả lời câu hỏi một cách tự nhiên và chân thành</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2D9596]">✓</span>
              <span>Đừng lo lắng nếu mắc lỗi - đây là buổi luyện tập!</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
