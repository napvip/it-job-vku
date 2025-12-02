"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  FileText,
  LogOut,
  User,
  Circle,
  Check,
  Sparkles,
  Clock,
  Download,
  Play,
  Send,
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  category: string;
}

interface Answer {
  questionId: number;
  text: string;
  duration: number;
}

interface SetupConfig {
  position: string;
  level: string;
  language: string;
  duration: string;
  questionCount: string;
}

interface AIInterviewPageProps {
  config: SetupConfig;
  onExit: () => void;
  onNavigateToSubmitCV?: () => void;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Hãy giới thiệu về bản thân và kinh nghiệm làm việc của bạn.",
    category: "Giới thiệu",
  },
  {
    id: 2,
    text: "Bạn đã từng sử dụng Firebase như thế nào trong dự án của mình?",
    category: "Kỹ thuật",
  },
  {
    id: 3,
    text: "Kể về một thử thách lớn bạn đã vượt qua trong công việc.",
    category: "Kinh nghiệm",
  },
  {
    id: 4,
    text: "Tại sao bạn muốn làm việc ở vị trí này?",
    category: "Động lực",
  },
  {
    id: 5,
    text: "Bạn làm gì để cập nhật kiến thức công nghệ mới?",
    category: "Phát triển",
  },
];

interface AIInterviewPageProps {
  onNavigateToSubmitCV?: () => void;
}

export function AIInterviewPage({ config, onExit, onNavigateToSubmitCV }: AIInterviewPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const currentTranscriptRef = useRef("");

  const currentQuestion = questions[currentQuestionIndex];
  const maxRecordingTime = 30;

  // Speech Synthesis - đọc câu hỏi
  const speakQuestion = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Đọc câu hỏi khi chuyển câu
  useEffect(() => {
    if (currentQuestion && !isCompleted) {
      speakQuestion(currentQuestion.text);
    }
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentQuestionIndex, isCompleted]);

  // Kiểm tra quyền microphone
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Dừng stream ngay sau khi kiểm tra
      stream.getTracks().forEach(track => track.stop());
      setMicPermission("granted");
      return true;
    } catch (error: any) {
      // Không log lỗi nữa để tránh spam console
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError" || error.name === "NotFoundError") {
        setMicPermission("denied");
        setShowPermissionModal(true);
      } else {
        // Chỉ log các lỗi không liên quan đến permission
        console.warn("Microphone access issue:", error.name);
      }
      return false;
    }
  };

  // Bắt đầu ghi âm
  const startRecording = async () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Trình duyệt không hỗ trợ ghi âm. Vui lòng sử dụng Chrome.");
      return;
    }

    // Kiểm tra quyền microphone trước
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "vi-VN";

    currentTranscriptRef.current = "";

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      currentTranscriptRef.current = finalTranscript || interimTranscript;
    };

    recognitionRef.current.onerror = (event: any) => {
      if (event.error === "not-allowed" || event.error === "permission-denied") {
        setMicPermission("denied");
        setShowPermissionModal(true);
      } else if (event.error !== "aborted" && event.error !== "no-speech") {
        // Chỉ log các lỗi nghiêm trọng, bỏ qua lỗi thông thường
        console.warn("Speech recognition warning:", event.error);
      }
      stopRecording();
    };

    try {
      recognitionRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Bắt đầu đếm thời gian
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= maxRecordingTime - 1) {
            stopRecording();
            return maxRecordingTime;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error: any) {
      console.warn("Failed to start speech recognition:", error.name);
      setShowPermissionModal(true);
    }
  };

  // Dừng ghi âm
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);

    // Lưu câu trả lời
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      text: currentTranscriptRef.current || "(Không có câu trả lời)",
      duration: recordingTime,
    };

    setAnswers((prev) => {
      const updated = [...prev, newAnswer];
      console.log("Đã lưu câu trả lời:", updated.length, "/", questions.length);
      
      // Chuyển câu hỏi tiếp theo sau 2s
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          console.log("Chuyển sang câu hỏi tiếp theo");
          setCurrentQuestionIndex((prev) => prev + 1);
          setRecordingTime(0);
          currentTranscriptRef.current = "";
        } else {
          // Hoàn thành buổi phỏng vấn
          console.log("Hoàn thành buổi phỏng vấn!");
          setIsCompleted(true);
        }
      }, 2000);
      
      return updated;
    });
  };

  // Hỏi lại câu hỏi
  const repeatQuestion = () => {
    if (currentQuestion) {
      speakQuestion(currentQuestion.text);
    }
  };

  // Thoát phỏng vấn
  const exitInterview = () => {
    if (window.confirm("Bạn có chắc muốn thoát buổi phỏng vấn?")) {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      window.location.reload();
    }
  };

  // Giao diện kết quả
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#ECF4D6] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#265073] to-[#2D9596] text-white p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-[#2D9596]" />
              </motion.div>
              <h2 className="text-3xl mb-2">Hoàn thành buổi phỏng vấn!</h2>
              <p className="text-[#9AD0C2]">
                Bạn đã trả lời {answers.length}/{questions.length} câu hỏi
              </p>
            </div>

            {/* Feedback AI */}
            <div className="p-8">
              <div className="mb-8 p-6 bg-gradient-to-br from-[#ECF4D6] to-white rounded-xl border-2 border-[#9AD0C2]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#2D9596] rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[#265073]">Đánh giá từ AI</h3>
                    <p className="text-sm text-[#2D9596]">Phản hồi tổng quan</p>
                  </div>
                </div>
                <p className="text-[#265073] leading-relaxed mb-4">
                  Bạn đã thể hiện tốt trong buổi phỏng vấn! Câu trả lời của bạn khá rõ ràng và
                  mạch lạc. Tuy nhiên, một số câu còn thiếu ví dụ cụ thể ở câu 3. Hãy cố gắng bổ sung
                  thêm các case study hoặc số liệu thực tế để câu trả lời thuyết phục hơn.
                </p>
                
                {/* Detailed Feedback */}
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[#265073]">
                        <strong>Điểm mạnh:</strong> Câu trả lời rõ ràng, tự tin, có cấu trúc tốt
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <div>
                      <p className="text-sm text-[#265073]">
                        <strong>Cần cải thiện:</strong> Nên bổ sung thêm ví dụ thực tế và số liệu cụ thể
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danh sách câu trả lời */}
              <div className="space-y-4">
                <h3 className="text-[#265073] flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5" />
                  Câu trả lời của bạn ({answers.length} câu)
                </h3>
                {answers.length > 0 ? (
                  answers.map((answer, index) => {
                    const question = questions.find((q) => q.id === answer.questionId);
                    return (
                      <motion.div
                        key={answer.questionId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-5 bg-[#ECF4D6] rounded-xl border border-[#9AD0C2]"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="flex-shrink-0 w-7 h-7 bg-[#2D9596] text-white rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <p className="text-[#265073]">{question?.text}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const utterance = new SpeechSynthesisUtterance(answer.text);
                                utterance.lang = "vi-VN";
                                window.speechSynthesis.speak(utterance);
                              }}
                              className="p-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-all"
                              title="Nghe lại"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                const blob = new Blob([answer.text], { type: "text/plain" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `cau-tra-loi-${index + 1}.txt`;
                                a.click();
                              }}
                              className="p-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-all"
                              title="Tải xuống"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="ml-10 mt-3 p-4 bg-white rounded-lg">
                          <p className="text-sm text-[#265073] leading-relaxed">
                            {answer.text || "(Chưa có câu trả lời)"}
                          </p>
                          <div className="flex items-center gap-2 mt-3 text-xs text-[#2D9596]">
                            <Clock className="w-3 h-3" />
                            <span>Thời gian: {answer.duration}s</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>Chưa có câu trả lời nào được ghi lại</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-all duration-300"
                >
                  Phỏng vấn lại
                </button>
                <button
                  onClick={() => {
                    if (onNavigateToSubmitCV) {
                      onNavigateToSubmitCV();
                    } else {
                      alert("Chức năng gửi kết quả sẽ được phát triển!");
                    }
                  }}
                  className="flex-1 py-3 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Gửi kết quả cùng CV
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Giao diện phỏng vấn
  return (
    <div className="min-h-screen bg-[#ECF4D6] flex flex-col">
      {/* Header */}
      <header className="h-[60px] bg-[#265073] flex items-center justify-between px-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2D9596] rounded-lg flex items-center justify-center">
            <span className="text-white">AI</span>
          </div>
          <span className="text-white">AIJobs</span>
        </div>
        <h1 className="text-white text-lg">Phỏng vấn cùng Trợ lý AI</h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#9AD0C2] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#265073]" />
          </div>
          <span className="text-white text-sm">Ứng viên</span>
        </div>
      </header>

      {/* Main Interview Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* AI Interviewer Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl mb-8"
        >
          {/* AI Video Frame */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              animate={isSpeaking ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: isSpeaking ? Infinity : 0, duration: 1 }}
              className="w-80 h-60 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-2xl flex items-center justify-center mb-4 shadow-2xl border-4 border-white relative overflow-hidden"
            >
              {/* Video placeholder with user icon */}
              <User className="w-24 h-24 text-white/80" />
              
              {/* Speaking indicator - pulsing border */}
              {isSpeaking && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-[#2D9596] rounded-xl"
                  />
                  {/* Speaking icon */}
                  <div className="absolute top-4 left-4 bg-red-500 rounded-full px-3 py-1.5 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-white text-xs">Đang nói...</span>
                  </div>
                </>
              )}
              
              {/* Name tag at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-4">
                <p className="text-white text-lg">AI Interviewer – Viet Toan</p>
                <p className="text-[#9AD0C2] text-sm">
                  {isSpeaking ? "Đang đọc câu hỏi..." : "Vui lòng trả lời to và rõ ràng"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Question Bubble */}
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border-4 border-[#2D9596] relative"
          >
            <div className="flex items-start gap-4 mb-4">
              <Volume2
                className={`w-6 h-6 flex-shrink-0 ${
                  isSpeaking ? "text-[#2D9596] animate-pulse" : "text-gray-400"
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-[#2D9596] text-white px-3 py-1 rounded-full">
                    Câu {currentQuestionIndex + 1}/{questions.length}
                  </span>
                  <span className="text-xs text-[#2D9596]">{currentQuestion.category}</span>
                </div>
                <p className="text-xl text-[#265073] leading-relaxed">{currentQuestion.text}</p>
              </div>
            </div>

            {/* Gợi ý */}
            <div className="mt-6 pt-6 border-t border-[#9AD0C2] space-y-2">
              <p className="text-sm text-[#2D9596]">
                🎯 Trả lời mạch lạc – tập trung 1-2 ý chính
              </p>
              <p className="text-sm text-[#2D9596]">
                ⏱ Bạn có 30 giây, cố gắng giữ bình tĩnh
              </p>
              <p className="text-sm text-[#2D9596]">
                🎤 Hãy trả lời ngay sau khi nghe xong câu hỏi
              </p>
            </div>

            {/* Timer khi đang ghi */}
            {isRecording && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-4 right-8"
              >
                <div className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
                  <Circle className="w-3 h-3 fill-white animate-pulse" />
                  <span className="text-lg tabular-nums">
                    00:{recordingTime.toString().padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Candidate Video (fake) - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-32 right-8 w-64 h-48 bg-gradient-to-br from-[#9AD0C2] to-[#2D9596] rounded-2xl shadow-2xl border-4 border-white overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center relative">
            {/* User placeholder */}
            <User className="w-20 h-20 text-white/80" />
            
            {/* Recording indicator */}
            {isRecording && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-red-500 rounded-xl"
                />
                <div className="absolute top-3 left-3 bg-red-500 rounded-full px-3 py-1.5 flex items-center gap-2">
                  <Circle className="w-3 h-3 fill-white animate-pulse" />
                  <span className="text-white text-xs">REC</span>
                </div>
              </>
            )}
            
            {/* Name tag at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-3 px-4">
              <p className="text-white">Bạn (Ứng viên)</p>
              {isRecording && (
                <p className="text-red-300 text-xs">Đang ghi âm...</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-full shadow-2xl px-8 py-4 flex items-center gap-6 border-2 border-[#9AD0C2]"
        >
          {/* Record Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isSpeaking}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : isSpeaking
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#265073] hover:bg-[#2D9596]"
            }`}
          >
            {isRecording ? (
              <MicOff className="w-7 h-7 text-white" />
            ) : (
              <Mic className="w-7 h-7 text-white" />
            )}
          </motion.button>

          {/* Repeat Question */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={repeatQuestion}
            disabled={isRecording || isSpeaking}
            className="w-14 h-14 bg-[#265073] hover:bg-[#2D9596] rounded-full flex items-center justify-center transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            title="Hỏi lại"
          >
            <RotateCcw className="w-6 h-6 text-white" />
          </motion.button>

          {/* View Transcript */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-14 h-14 bg-[#265073] hover:bg-[#2D9596] rounded-full flex items-center justify-center transition-all duration-300"
            title="Xem câu đã hỏi"
          >
            <FileText className="w-6 h-6 text-white" />
          </motion.button>

          {/* Exit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exitInterview}
            className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300"
            title="Thoát phỏng vấn"
          >
            <LogOut className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>

        {/* Transcript Modal */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setShowTranscript(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto p-6"
              >
                <h3 className="text-2xl text-[#265073] mb-4">Danh sách câu hỏi</h3>
                <div className="space-y-3">
                  {questions.map((q, index) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border-2 ${
                        index === currentQuestionIndex
                          ? "bg-[#2D9596] border-[#2D9596] text-white"
                          : index < currentQuestionIndex
                          ? "bg-[#ECF4D6] border-[#9AD0C2] text-[#265073]"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <p className="text-sm">{q.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowTranscript(false)}
                  className="w-full mt-6 py-3 bg-[#265073] text-white rounded-xl hover:bg-[#2D9596] transition-all duration-300"
                >
                  Đóng
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Microphone Permission Modal */}
        <AnimatePresence>
          {showPermissionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MicOff className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl text-[#265073] mb-3">Cần quyền truy cập Microphone</h3>
                  <p className="text-[#2D9596] mb-6 leading-relaxed">
                    Để sử dụng tính năng phỏng vấn bằng giọng nói, bạn cần cấp quyền truy cập microphone cho trang web này.
                  </p>
                  
                  <div className="bg-[#ECF4D6] rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm text-[#265073] mb-3">📋 Hướng dẫn cấp quyền:</p>
                    <ol className="text-sm text-[#265073] space-y-2 ml-4 list-decimal">
                      <li>Nhấp vào biểu tượng <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded">🔒 hoặc 🎤</span> trên thanh địa chỉ (bên trái URL)</li>
                      <li>Tìm mục <strong>"Microphone"</strong> và chọn <strong>"Cho phép"</strong></li>
                      <li>Nhấn nút <strong>"Tải lại trang"</strong> bên dưới để áp dụng</li>
                    </ol>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6 text-left">
                    <p className="text-xs text-yellow-800">
                      💡 <strong>Lưu ý:</strong> Nếu không thấy popup xin quyền, có thể bạn đã từ chối trước đó. Hãy làm theo hướng dẫn trên để cấp quyền thủ công.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPermissionModal(false)}
                      className="flex-1 py-3 bg-gray-200 text-[#265073] rounded-xl hover:bg-gray-300 transition-all duration-300"
                    >
                      Đóng
                    </button>
                    <button
                      onClick={() => {
                        setShowPermissionModal(false);
                        window.location.reload();
                      }}
                      className="flex-1 py-3 bg-[#2D9596] text-white rounded-xl hover:bg-[#265073] transition-all duration-300"
                    >
                      Tải lại trang
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
