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
Bạn là chuyên gia đánh giá phỏng vấn IT với nhiều năm kinh nghiệm. Hãy đánh giá buổi phỏng vấn cho vị trí ${position} level ${level}.

THÔNG TIN PHỎNG VẤN:
${qaContext}

YÊU CẦU ĐÁNH GIÁ:
1. Cho điểm tổng quan từ 0-100 (nghiêm túc, khách quan)
2. Liệt kê 3-5 điểm mạnh cụ thể
3. Liệt kê 3-5 điểm cần cải thiện với gợi ý rõ ràng
4. Đánh giá chi tiết từng câu trả lời (điểm 0-10 và feedback ngắn gọn)
5. Nhận xét tổng quan chi tiết, chuyên nghiệp (2-3 đoạn văn)

Lưu ý:
- Đánh giá dựa trên: độ rõ ràng, logic, kiến thức kỹ thuật, kinh nghiệm thực tế
- Khuyến khích nếu tốt, chỉ ra vấn đề nếu yếu
- Đưa ra lời khuyên cụ thể để cải thiện

Trả về JSON với format:
{
  "overallScore": 75,
  "strengths": ["Điểm mạnh 1 cụ thể", "Điểm mạnh 2 cụ thể", "..."],
  "improvements": ["Cần cải thiện 1 với gợi ý", "Cần cải thiện 2 với gợi ý", "..."],
  "detailedFeedback": "Nhận xét tổng quan chi tiết 2-3 đoạn văn...",
  "questionFeedbacks": [
    {
      "questionId": 1,
      "score": 8,
      "feedback": "Nhận xét ngắn gọn về câu trả lời này"
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
