# 🤖 Hướng dẫn sử dụng Gemini AI trong AI Interview

## ✅ Đã hoàn thành

### 1. Cấu hình Gemini AI

- ✅ Tạo file `.env.local` với API key
- ✅ Cài đặt package `@google/generative-ai`
- ✅ Tạo service `lib/gemini.ts` với 2 chức năng chính:
  - `generateInterviewQuestions()` - Tạo câu hỏi phỏng vấn
  - `evaluateInterviewAnswers()` - Đánh giá câu trả lời

### 2. Tính năng AI Interview

- ✅ **Tạo câu hỏi động**: AI tự động tạo câu hỏi dựa trên:

  - Vị trí (Frontend, Backend, AI/ML, etc.)
  - Level (Intern, Junior, Middle, Senior, Lead)
  - Ngôn ngữ (Tiếng Việt / Tiếng Anh)
  - Số lượng câu hỏi (5-8 câu)

- ✅ **Đánh giá thông minh**:

  - Điểm tổng quan 0-100
  - 3-5 điểm mạnh cụ thể
  - 3-5 điểm cần cải thiện với gợi ý
  - Đánh giá chi tiết từng câu trả lời (0-10 điểm)
  - Nhận xét tổng quan 2-3 đoạn văn

- ✅ **Giao diện hoàn chỉnh**:
  - Loading screen khi tạo câu hỏi
  - Loading feedback khi phân tích
  - Hiển thị điểm số và feedback chi tiết
  - Badge độ khó cho từng câu hỏi
  - Nhận xét AI cho từng câu trả lời

### 3. Cấu trúc dữ liệu

#### InterviewQuestion

```typescript
{
  id: number;
  text: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}
```

#### InterviewFeedback

```typescript
{
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
```

## 🚀 Cách sử dụng

### 1. Chạy ứng dụng

```bash
npm run dev
```

### 2. Truy cập tính năng AI Interview

1. Mở trình duyệt: `http://localhost:3000/candidate/ai-interview`
2. Chọn cấu hình:

   - **Vị trí**: Frontend Developer, Backend Developer, AI/ML Engineer, v.v.
   - **Level**: Intern, Fresher, Junior, Middle, Senior, Lead
   - **Ngôn ngữ**: Tiếng Việt hoặc Tiếng Anh
   - **Thời gian**: 15, 30, hoặc 45 phút
   - **Số câu hỏi**: 5, 6, 7, hoặc 8 câu

3. Click **"Bắt đầu phỏng vấn"**

### 3. Trong buổi phỏng vấn

1. **Đợi AI tạo câu hỏi** (5-10 giây)
2. **Nghe câu hỏi** - AI sẽ tự động đọc bằng Text-to-Speech
3. **Cho phép quyền microphone** khi trình duyệt yêu cầu
4. **Click nút Mic** để bắt đầu trả lời
5. **Nói câu trả lời** - AI sẽ chuyển giọng nói thành văn bản
6. **Click nút Mic lần nữa** để dừng ghi
7. **Click Next** để chuyển câu tiếp theo
8. Lặp lại cho đến hết câu hỏi

### 4. Xem kết quả

- **Đợi AI phân tích** (10-15 giây)
- **Xem điểm tổng**: Từ 0-100
- **Đọc feedback chi tiết**:
  - ✅ Điểm mạnh
  - 📈 Cần cải thiện
  - 💡 Nhận xét từng câu
- **Nghe lại** hoặc **tải xuống** câu trả lời
- **Phỏng vấn lại** hoặc **Gửi kết quả cùng CV**

## 🎯 Ví dụ câu hỏi AI tạo

### Frontend Developer - Junior (Tiếng Việt)

1. **[Giới thiệu - Dễ]** Hãy giới thiệu về bản thân và kinh nghiệm Frontend của bạn.
2. **[Kỹ thuật - Trung bình]** Sự khác biệt giữa React và Vue.js là gì?
3. **[Tình huống - Trung bình]** Bạn xử lý thế nào khi website load chậm?
4. **[Kinh nghiệm - Khó]** Kể về một dự án Frontend phức tạp bạn đã làm.
5. **[Soft skills - Dễ]** Bạn làm việc nhóm như thế nào trong dự án?

### Backend Developer - Senior (English)

1. **[Introduction - Easy]** Tell me about your backend development experience.
2. **[Technical - Hard]** How do you design a scalable microservices architecture?
3. **[Situation - Hard]** Describe how you handled a critical production bug.
4. **[Experience - Medium]** What's your experience with database optimization?
5. **[Development - Medium]** How do you ensure code quality in your team?

## 📊 Ví dụ feedback AI

```
Điểm tổng: 78/100

✅ Điểm mạnh:
- Câu trả lời rõ ràng, có cấu trúc tốt
- Thể hiện kiến thức vững về công nghệ
- Đưa ra ví dụ cụ thể từ dự án thực tế
- Tự tin khi trình bày

📈 Cần cải thiện:
- Nên bổ sung thêm số liệu và kết quả đạt được
- Có thể trả lời ngắn gọn hơn ở một số câu
- Cần giải thích chi tiết hơn về quy trình làm việc
- Nên đề cập đến việc xử lý edge cases

Nhận xét tổng quan:
Bạn đã có một buổi phỏng vấn khá tốt! Câu trả lời thể hiện kinh
nghiệm thực tế và hiểu biết sâu về lĩnh vực. Điểm mạnh của bạn là
khả năng trình bày rõ ràng và đưa ra ví dụ cụ thể.

Để nâng cao chất lượng, hãy bổ sung thêm số liệu, kết quả đo lường
được và cách bạn xử lý các tình huống khó. Điều này sẽ giúp câu trả
lời thuyết phục và chuyên nghiệp hơn. Tiếp tục rèn luyện!
```

## 🔧 Xử lý lỗi

### Nếu không tải được câu hỏi

- ✅ Kiểm tra kết nối internet
- ✅ Kiểm tra API key trong `.env.local`
- ✅ Xem console để biết lỗi cụ thể
- ✅ Hệ thống sẽ tự động dùng câu hỏi fallback

### Nếu không có feedback AI

- ✅ Đợi thêm vài giây (AI cần thời gian phân tích)
- ✅ Kiểm tra đã trả lời đủ câu hỏi chưa
- ✅ Hệ thống sẽ hiển thị feedback mặc định nếu API lỗi

## 🔒 Bảo mật API Key

- ✅ API key được lưu trong `.env.local` (không commit lên Git)
- ✅ File `.gitignore` đã có pattern `.env*`
- ✅ **KHÔNG BAO GIỜ** share API key trong code hoặc pull request

## 📝 Lưu ý khi sử dụng

1. **Quyền microphone**: Trình duyệt sẽ yêu cầu quyền, nhớ cho phép
2. **Trình duyệt hỗ trợ**: Chrome, Edge (khuyến nghị)
3. **Kết nối internet**: Cần ổn định để gọi Gemini API
4. **Thời gian phản hồi**: Gemini AI mất 3-10 giây để tạo câu hỏi/feedback

## 🎓 Tips để có buổi phỏng vấn tốt

1. **Chuẩn bị môi trường**:

   - Nơi yên tĩnh, không ồn
   - Microphone chất lượng tốt
   - Kết nối internet ổn định

2. **Kỹ thuật trả lời**:

   - Nghe kỹ câu hỏi trước khi trả lời
   - Trả lời rõ ràng, không quá nhanh
   - Đưa ra ví dụ cụ thể từ kinh nghiệm
   - Thêm số liệu nếu có thể

3. **Cấu trúc câu trả lời**:
   - **Giới thiệu**: Tóm tắt ngắn gọn
   - **Nội dung chính**: Giải thích chi tiết
   - **Ví dụ**: Case study thực tế
   - **Kết luận**: Tóm tắt lại

## 🚀 Tính năng tiếp theo (Future)

- [ ] Hỗ trợ nhiều ngôn ngữ hơn
- [ ] Video recording
- [ ] Avatar AI động (3D model)
- [ ] Export PDF kết quả phỏng vấn
- [ ] Phân tích giọng nói (tone, confidence)
- [ ] So sánh với benchmark của vị trí
- [ ] Gợi ý câu trả lời mẫu
- [ ] Practice mode với tips realtime

---

**Chúc bạn có buổi phỏng vấn thành công! 🎉**
