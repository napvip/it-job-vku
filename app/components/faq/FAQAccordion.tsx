"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, User, Building2, Lock, Sparkles, Settings } from "lucide-react";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<string | null>("candidate-0");

  const faqGroups = [
    {
      icon: User,
      title: "Dành cho ứng viên",
      key: "candidate",
      questions: [
        {
          q: "Làm thế nào để tạo hồ sơ trên nền tảng?",
          a: "Bạn chỉ cần click vào nút 'Đăng ký', chọn vai trò 'Ứng viên IT', điền thông tin cá nhân, kỹ năng và kinh nghiệm. Hệ thống AI sẽ tự động phân tích và tối ưu hồ sơ của bạn để phù hợp với các vị trí tuyển dụng.",
        },
        {
          q: "AI Matching hoạt động như thế nào?",
          a: "Hệ thống AI của chúng tôi phân tích kỹ năng, kinh nghiệm, sở thích nghề nghiệp của bạn và so sánh với hàng ngàn JD để tìm ra những vị trí phù hợp nhất. Độ chính xác lên đến 95%.",
        },
        {
          q: "Tôi có thể ứng tuyển bao nhiêu công việc?",
          a: "Không giới hạn! Bạn có thể ứng tuyển vào bất kỳ công việc nào phù hợp. Chúng tôi khuyến khích bạn apply vào 3-5 vị trí cùng lúc để tăng cơ hội.",
        },
        {
          q: "Làm thế nào để theo dõi tiến trình ứng tuyển?",
          a: "Vào Dashboard cá nhân, bạn sẽ thấy tất cả các công việc đã apply, trạng thái xử lý và thông báo từ nhà tuyển dụng.",
        },
      ],
    },
    {
      icon: Building2,
      title: "Dành cho nhà tuyển dụng",
      key: "employer",
      questions: [
        {
          q: "Làm thế nào để đăng tin tuyển dụng?",
          a: "Sau khi tạo tài khoản nhà tuyển dụng, vào Dashboard và click 'Đăng tin mới'. Điền thông tin JD, yêu cầu kỹ năng và hệ thống AI sẽ tự động gợi ý ứng viên phù hợp.",
        },
        {
          q: "Tôi có thể quản lý nhiều vị trí tuyển dụng cùng lúc không?",
          a: "Có, hệ thống ATS của chúng tôi cho phép bạn quản lý không giới hạn vị trí tuyển dụng, theo dõi từng ứng viên ở từng giai đoạn khác nhau.",
        },
        {
          q: "Làm thế nào để xem hồ sơ ứng viên?",
          a: "Với gói Standard trở lên, bạn có thể xem không giới hạn hồ sơ ứng viên. Hệ thống cũng tự động gợi ý những ứng viên phù hợp nhất với JD của bạn.",
        },
        {
          q: "Tôi có thể thay đổi gói dịch vụ không?",
          a: "Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Phần chênh lệch sẽ được tính theo tỷ lệ thời gian sử dụng.",
        },
      ],
    },
    {
      icon: Lock,
      title: "Tài khoản & Bảo mật",
      key: "security",
      questions: [
        {
          q: "Thông tin cá nhân của tôi có được bảo mật không?",
          a: "Tuyệt đối! Chúng tôi sử dụng mã hóa SSL 256-bit và tuân thủ các chuẩn bảo mật quốc tế. Thông tin cá nhân chỉ được chia sẻ với nhà tuyển dụng khi bạn đồng ý.",
        },
        {
          q: "Tôi quên mật khẩu, làm thế nào để khôi phục?",
          a: "Click vào 'Quên mật khẩu' ở trang đăng nhập, nhập email đăng ký. Chúng tôi sẽ gửi link reset mật khẩu trong vòng 5 phút.",
        },
        {
          q: "Tôi có thể xóa tài khoản không?",
          a: "Có, bạn có thể xóa tài khoản bất cứ lúc nào trong Cài đặt. Lưu ý rằng việc này sẽ xóa vĩnh viễn tất cả dữ liệu của bạn.",
        },
      ],
    },
    {
      icon: Sparkles,
      title: "Tính năng AI",
      key: "ai",
      questions: [
        {
          q: "AI gợi ý việc làm có chính xác không?",
          a: "Hệ thống AI của chúng tôi có độ chính xác 95% dựa trên machine learning từ hàng triệu dữ liệu tuyển dụng. AI liên tục học hỏi và cải thiện theo thời gian.",
        },
        {
          q: "Tôi có thể tùy chỉnh tiêu chí AI matching không?",
          a: "Có, trong phần Cài đặt AI, bạn có thể điều chỉnh độ ưu tiên cho các yếu tố như: vị trí, mức lương, kỹ năng, văn hóa công ty...",
        },
        {
          q: "AI có thể phân tích CV của tôi không?",
          a: "Có, AI sẽ tự động phân tích CV, gợi ý cải thiện nội dung, format và highlight những kỹ năng phù hợp với JD.",
        },
      ],
    },
    {
      icon: Settings,
      title: "Kỹ thuật / Hệ thống",
      key: "technical",
      questions: [
        {
          q: "Nền tảng có hỗ trợ mobile không?",
          a: "Có, website được thiết kế responsive hoàn toàn, hoạt động mượt mà trên mọi thiết bị. Chúng tôi cũng đang phát triển app di động.",
        },
        {
          q: "Tôi gặp lỗi khi upload CV, phải làm sao?",
          a: "Vui lòng kiểm tra: 1) File dưới 5MB, 2) Định dạng PDF/DOC/DOCX, 3) Không có mật khẩu bảo vệ. Nếu vẫn lỗi, liên hệ support@itjobsai.com.",
        },
        {
          q: "Có API để tích hợp với hệ thống ATS hiện tại không?",
          a: "Có, gói Premium AI cung cấp API đầy đủ để tích hợp với các hệ thống ATS, HRMS hiện có. Liên hệ team support để được hướng dẫn.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {faqGroups.map((group, groupIndex) => (
        <motion.div
          key={group.key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: groupIndex * 0.1 }}
        >
          {/* Group Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-xl flex items-center justify-center">
              <group.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-[#265073] text-2xl">{group.title}</h2>
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {group.questions.map((item, index) => {
              const itemKey = `${group.key}-${index}`;
              const isOpen = openIndex === itemKey;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-[#9AD0C2] overflow-hidden hover:border-[#2D9596] transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : itemKey)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="text-[#265073] pr-8">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#2D9596] flex-shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 border-t border-[#9AD0C2]"
                    >
                      <p className="text-[#265073]/70 leading-relaxed pt-4">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-2xl p-8 text-center text-white"
      >
        <h3 className="text-2xl mb-3">Không tìm thấy câu trả lời?</h3>
        <p className="text-white/90 mb-6">
          Liên hệ với đội ngũ hỗ trợ của chúng tôi, chúng tôi luôn sẵn sàng giúp đỡ bạn
        </p>
        <button className="px-8 py-3 bg-white text-[#265073] rounded-full hover:bg-[#9AD0C2] transition-all shadow-lg hover:shadow-xl">
          Liên hệ hỗ trợ
        </button>
      </motion.div>
    </div>
  );
}


