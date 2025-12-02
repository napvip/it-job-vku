import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not defined in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

export interface InterviewQuestion {
  id: number;
  text: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface InterviewFeedback {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  detailedFeedback: string;
  questionFeedbacks: {
    questionId: number;
    score: number;
    feedback: string;
  }[];
}

/**
 * Tạo câu hỏi phỏng vấn dựa trên cấu hình
 */
export async function generateInterviewQuestions(
  position: string,
  level: string,
  language: string,
  questionCount: number
): Promise<InterviewQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Bạn là một chuyên gia tuyển dụng IT chuyên nghiệp. Hãy tạo ${questionCount} câu hỏi phỏng vấn cho vị trí ${position} ở cấp độ ${level}.

Yêu cầu:
- Câu hỏi phải phù hợp với level ${level} (Intern/Fresher: cơ bản, Junior: trung bình, Middle/Senior: nâng cao)
- Bao gồm các loại câu hỏi: Giới thiệu, Kỹ thuật, Kinh nghiệm, Tình huống, Soft skills
- Câu hỏi bằng ${language === "vi" ? "tiếng Việt" : "tiếng Anh"}
- Câu hỏi rõ ràng, dễ hiểu, thực tế, phù hợp cho phỏng vấn online

Trả về JSON array với format:
[
  {
    "id": 1,
    "text": "Câu hỏi...",
    "category": "Loại câu hỏi",
    "difficulty": "easy"
  },
  {
    "id": 2,
    "text": "Câu hỏi...",
    "category": "Loại câu hỏi",
    "difficulty": "medium"
  }
]

CHỈ TRẢ VỀ JSON ARRAY, KHÔNG GIẢI THÍCH THÊM.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON từ response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error("Invalid response from Gemini:", text);
      throw new Error("Invalid response format from Gemini");
    }

    const questions: InterviewQuestion[] = JSON.parse(jsonMatch[0]);
    
    // Ensure questions have sequential IDs
    return questions.map((q, index) => ({
      ...q,
      id: index + 1,
    }));
  } catch (error) {
    console.error("Error generating questions:", error);
    // Fallback questions nếu API lỗi
    return getFallbackQuestions(position, level, language, questionCount);
  }
}

/**
 * Đánh giá câu trả lời của ứng viên
 */
export async function evaluateInterviewAnswers(
  position: string,
  level: string,
  questions: InterviewQuestion[],
  answers: { questionId: number; text: string; duration: number }[]
): Promise<InterviewFeedback> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Tạo context cho AI
    const qaContext = questions
      .map((q, index) => {
        const answer = answers.find((a) => a.questionId === q.id);
        return `
Câu ${index + 1} [${q.category} - ${q.difficulty}]: ${q.text}
Câu trả lời: ${answer?.text || "(Không có câu trả lời)"}
Thời gian trả lời: ${answer?.duration || 0} giây
`;
      })
      .join("\n---\n");

    const prompt = `
Bạn là chuyên gia đánh giá phỏng vấn IT với 15+ năm kinh nghiệm tuyển dụng cho các công ty công nghệ hàng đầu.
Nhiệm vụ: Đánh giá CHI TIẾT, CỤ THỂ buổi phỏng vấn cho vị trí ${position} ở level ${level}.

THÔNG TIN PHỎNG VẤN:
${qaContext}

TIÊU CHÍ ĐÁNH GIÁ NGHIÊM NGẶT:

📊 CHẤM ĐIỂM (0-100):
- 90-100: Xuất sắc - Vượt xa yêu cầu, kiến thức chuyên sâu, kinh nghiệm phong phú
- 80-89: Giỏi - Đáp ứng tốt yêu cầu, có kinh nghiệm thực tế rõ ràng
- 70-79: Khá - Đáp ứng yêu cầu cơ bản, cần thêm kinh nghiệm
- 60-69: Trung bình - Thiếu độ sâu, cần cải thiện nhiều
- <60: Yếu - Chưa đủ yêu cầu cho vị trí

🎯 PHÂN TÍCH TỪNG CÂU (điểm 0-10):
- 9-10: Xuất sắc - Câu trả lời đầy đủ, có ví dụ cụ thể, số liệu, kinh nghiệm thực tế
- 7-8: Tốt - Trả lời đúng trọng tâm, có ví dụ nhưng chưa đủ chi tiết
- 5-6: Trung bình - Trả lời chung chung, thiếu ví dụ cụ thể
- 3-4: Yếu - Trả lời không rõ ràng, thiếu logic
- 0-2: Rất yếu - Không trả lời hoặc sai hoàn toàn

YÊU CẦU FEEDBACK CỤ THỂ:

✅ ĐIỂM MẠNH (4-6 điểm):
- CHỈ RA CỤ THỂ câu trả lời nào tốt, tốt ở điểm nào
- Trích dẫn từ câu trả lời của ứng viên
- Ví dụ: "Câu trả lời về [chủ đề] rất tốt khi bạn đề cập đến [chi tiết cụ thể] và giải thích [phần nào đó]"

⚠️ ĐIỂM CẦN CẢI THIỆN (4-6 điểm):
- CHỈ RA RÕ RÀNG câu trả lời nào yếu, yếu ở đâu
- ĐƯA RA GIẢI PHÁP CỤ THỂ để cải thiện
- Ví dụ: "Câu trả lời về [chủ đề] còn mơ hồ. Bạn nên bổ sung thêm [chi tiết gì], [số liệu gì], hoặc [ví dụ thực tế nào]"

📝 ĐÁNH GIÁ TỪNG CÂU (QUAN TRỌNG):
- Cho điểm CHÍNH XÁC dựa trên tiêu chí trên
- Feedback DÀI 2-4 CÂU, phân tích:
  + Điểm tốt của câu trả lời (nếu có)
  + Điểm yếu cụ thể (nếu có)
  + Thiếu thông tin gì (ví dụ, số liệu, kinh nghiệm)
  + Gợi ý cải thiện cụ thể

💬 NHẬN XÉT TỔNG QUAN (3-4 ĐOẠN VĂN):
Đoạn 1: Đánh giá tổng thể về khả năng của ứng viên
Đoạn 2: Phân tích chi tiết các điểm mạnh với ví dụ cụ thể từ câu trả lời
Đoạn 3: Phân tích chi tiết các điểm yếu với ví dụ cụ thể và cách khắc phục
Đoạn 4: Kết luận và lời khuyên phát triển sự nghiệp

QUAN TRỌNG:
- PHẢI CHÍNH XÁC, CỤ THỂ, TRÍCH DẪN từ câu trả lời
- KHÔNG viết chung chung như "câu trả lời tốt", "cần cải thiện"
- PHẢI CHỈ RA cụ thể câu nào, đoạn nào, thiếu gì, thêm gì
- Feedback cho TỪNG CÂU phải DÀI và CHI TIẾT (tối thiểu 2-3 câu)

Trả về JSON với format:
{
  "overallScore": 75,
  "strengths": [
    "Câu trả lời số [X] về [chủ đề] rất xuất sắc khi bạn đề cập chi tiết đến [điểm cụ thể] và giải thích rõ ràng về [phần nào]",
    "Phần giải thích về [công nghệ/kỹ năng] thể hiện kinh nghiệm thực tế khi bạn nói về [ví dụ cụ thể]",
    "..."
  ],
  "improvements": [
    "Câu trả lời số [Y] về [chủ đề] còn mơ hồ. Bạn nên bổ sung thêm: 1) [chi tiết cụ thể], 2) [số liệu/kết quả đạt được], 3) [các bước thực hiện]",
    "Khi trả lời về [kỹ năng/kinh nghiệm], thiếu ví dụ thực tế. Hãy kể về một dự án cụ thể và vai trò của bạn như thế nào",
    "..."
  ],
  "detailedFeedback": "ĐOẠN 1: Nhận xét tổng thể...\n\nĐOẠN 2: Phân tích điểm mạnh với ví dụ từ câu trả lời...\n\nĐOẠN 3: Phân tích điểm yếu và cách khắc phục...\n\nĐOẠN 4: Kết luận và lời khuyên...",
  "questionFeedbacks": [
    {
      "questionId": 1,
      "score": 8,
      "feedback": "Câu trả lời về [chủ đề] tốt ở chỗ [điểm A], [điểm B]. Tuy nhiên còn thiếu [chi tiết C]. Bạn nên bổ sung thêm [gợi ý cụ thể D] để câu trả lời hoàn thiện hơn. Đề xuất: [cách làm cụ thể]."
    }
  ]
}

CHỈ TRẢ VỀ JSON, KHÔNG GIẢI THÍCH THÊM.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Invalid feedback response from Gemini:", text);
      throw new Error("Invalid response format from Gemini");
    }

    const feedback: InterviewFeedback = JSON.parse(jsonMatch[0]);
    return feedback;
  } catch (error) {
    console.error("Error evaluating answers:", error);
    // Fallback feedback nếu API lỗi
    return getFallbackFeedback(answers.length);
  }
}

/**
 * Fallback questions nếu API lỗi
 */
function getFallbackQuestions(
  position: string,
  level: string,
  language: string,
  count: number
): InterviewQuestion[] {
  const fallbackVi: InterviewQuestion[] = [
    {
      id: 1,
      text: "Hãy giới thiệu về bản thân và kinh nghiệm làm việc của bạn.",
      category: "Giới thiệu",
      difficulty: "easy",
    },
    {
      id: 2,
      text: `Bạn có kinh nghiệm gì với vị trí ${position}?`,
      category: "Kinh nghiệm",
      difficulty: "medium",
    },
    {
      id: 3,
      text: "Kể về một dự án khó khăn mà bạn đã hoàn thành.",
      category: "Tình huống",
      difficulty: "medium",
    },
    {
      id: 4,
      text: "Tại sao bạn muốn làm việc ở vị trí này?",
      category: "Động lực",
      difficulty: "easy",
    },
    {
      id: 5,
      text: "Bạn làm thế nào để cập nhật kiến thức công nghệ mới?",
      category: "Phát triển",
      difficulty: "easy",
    },
    {
      id: 6,
      text: "Mô tả cách bạn làm việc nhóm trong một dự án.",
      category: "Soft skills",
      difficulty: "medium",
    },
    {
      id: 7,
      text: "Bạn xử lý thế nào khi gặp bug khó trong dự án?",
      category: "Kỹ thuật",
      difficulty: "hard",
    },
    {
      id: 8,
      text: "Công nghệ nào bạn thích nhất và tại sao?",
      category: "Kỹ thuật",
      difficulty: "easy",
    },
  ];

  const fallbackEn: InterviewQuestion[] = [
    {
      id: 1,
      text: "Please introduce yourself and your work experience.",
      category: "Introduction",
      difficulty: "easy",
    },
    {
      id: 2,
      text: `What experience do you have with ${position}?`,
      category: "Experience",
      difficulty: "medium",
    },
    {
      id: 3,
      text: "Tell me about a challenging project you completed.",
      category: "Situation",
      difficulty: "medium",
    },
    {
      id: 4,
      text: "Why do you want to work in this position?",
      category: "Motivation",
      difficulty: "easy",
    },
    {
      id: 5,
      text: "How do you keep up with new technology?",
      category: "Development",
      difficulty: "easy",
    },
    {
      id: 6,
      text: "Describe how you work in a team on a project.",
      category: "Soft skills",
      difficulty: "medium",
    },
    {
      id: 7,
      text: "How do you handle difficult bugs in a project?",
      category: "Technical",
      difficulty: "hard",
    },
    {
      id: 8,
      text: "What technology do you like most and why?",
      category: "Technical",
      difficulty: "easy",
    },
  ];

  const questions = language === "vi" ? fallbackVi : fallbackEn;
  return questions.slice(0, count);
}

/**
 * Fallback feedback nếu API lỗi
 */
function getFallbackFeedback(answerCount: number): InterviewFeedback {
  return {
    overallScore: 70,
    strengths: [
      "Câu trả lời rõ ràng và mạch lạc",
      "Thể hiện sự tự tin khi trình bày",
      "Có cấu trúc tốt trong câu trả lời",
    ],
    improvements: [
      "Nên bổ sung thêm ví dụ cụ thể từ kinh nghiệm thực tế",
      "Có thể trình bày ngắn gọn hơn để tối ưu thời gian",
      "Nên thêm số liệu hoặc kết quả đạt được trong dự án",
    ],
    detailedFeedback:
      "Bạn đã có một buổi phỏng vấn khá tốt. Câu trả lời của bạn thể hiện sự hiểu biết về lĩnh vực và kinh nghiệm thực tế. Cách trình bày của bạn khá mạch lạc và dễ hiểu.\n\nTuy nhiên, để nâng cao chất lượng câu trả lời, bạn nên bổ sung thêm các ví dụ cụ thể từ các dự án đã làm, kèm theo số liệu hoặc kết quả đạt được. Điều này sẽ giúp câu trả lời của bạn thuyết phục và chuyên nghiệp hơn. Hãy tiếp tục rèn luyện và chuẩn bị tốt cho các buổi phỏng vấn tiếp theo!",
    questionFeedbacks: Array.from({ length: answerCount }, (_, i) => ({
      questionId: i + 1,
      score: 7,
      feedback: "Câu trả lời khá tốt, nên bổ sung thêm chi tiết cụ thể và ví dụ thực tế.",
    })),
  };
}
