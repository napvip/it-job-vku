"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export function TermsPage() {
  const sections = [
    {
      title: "1. Điều khoản chung",
      content: [
        "Chào mừng bạn đến với IT Jobs AI. Bằng việc truy cập và sử dụng nền tảng của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được quy định dưới đây.",
        "Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.",
      ],
    },
    {
      title: "2. Đăng ký tài khoản",
      content: [
        "Người dùng phải cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký tài khoản.",
        "Bạn chịu trách nhiệm bảo mật thông tin đăng nhập và tất cả các hoạt động diễn ra dưới tài khoản của mình.",
        "Không được chia sẻ, chuyển nhượng tài khoản cho bên thứ ba mà không có sự đồng ý bằng văn bản từ chúng tôi.",
      ],
    },
    {
      title: "3. Quyền và nghĩa vụ của người dùng",
      content: [
        "Người dùng có quyền sử dụng các tính năng được cung cấp theo gói dịch vụ đã đăng ký.",
        "Cam kết không sử dụng nền tảng cho mục đích bất hợp pháp hoặc vi phạm quyền của bên thứ ba.",
        "Không đăng tải nội dung có tính chất spam, lừa đảo, phỉ báng hoặc vi phạm pháp luật.",
        "Tuân thủ mọi quy định pháp luật hiện hành liên quan đến tuyển dụng và lao động.",
      ],
    },
    {
      title: "4. Quyền sở hữu trí tuệ",
      content: [
        "Tất cả nội dung, logo, thiết kế, mã nguồn và công nghệ trên nền tảng đều thuộc quyền sở hữu của IT Jobs AI.",
        "Người dùng không được sao chép, sửa đổi, phân phối hoặc khai thác thương mại bất kỳ phần nào của nền tảng mà không có sự cho phép.",
        "Người dùng giữ quyền sở hữu đối với nội dung họ đăng tải (CV, JD, thông tin công ty).",
      ],
    },
    {
      title: "5. Thanh toán và hoàn tiền",
      content: [
        "Các gói dịch vụ trả phí sẽ được thanh toán theo chu kỳ đã chọn (tháng/năm).",
        "Giá đã bao gồm VAT và các loại thuế hiện hành.",
        "Chính sách hoàn tiền: Trong vòng 7 ngày kể từ ngày thanh toán nếu chưa sử dụng dịch vụ.",
        "Chúng tôi có quyền thay đổi giá dịch vụ với thông báo trước 30 ngày.",
      ],
    },
    {
      title: "6. Chấm dứt dịch vụ",
      content: [
        "Người dùng có thể hủy tài khoản bất cứ lúc nào trong phần Cài đặt.",
        "Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản nếu phát hiện vi phạm điều khoản.",
        "Khi tài khoản bị chấm dứt, tất cả dữ liệu sẽ được xóa sau 30 ngày.",
      ],
    },
    {
      title: "7. Giới hạn trách nhiệm",
      content: [
        "Chúng tôi không chịu trách nhiệm đối với bất kỳ tổn thất nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.",
        "Không đảm bảo rằng dịch vụ sẽ không bị gián đoạn hoặc không có lỗi.",
        "Không chịu trách nhiệm về nội dung do người dùng tạo ra hoặc các giao dịch giữa người dùng với nhau.",
      ],
    },
    {
      title: "8. Thay đổi điều khoản",
      content: [
        "Chúng tôi có quyền thay đổi, bổ sung các điều khoản bất cứ lúc nào.",
        "Mọi thay đổi sẽ được thông báo trước ít nhất 15 ngày qua email hoặc thông báo trên nền tảng.",
        "Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc chấp nhận các điều khoản mới.",
      ],
    },
    {
      title: "9. Luật áp dụng",
      content: [
        "Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam.",
        "Mọi tranh chấp phát sinh sẽ được giải quyết thông qua thương lượng. Nếu không đạt được thỏa thuận, tranh chấp sẽ được giải quyết tại Tòa án có thẩm quyền tại TP. Hồ Chí Minh.",
      ],
    },
    {
      title: "10. Liên hệ",
      content: [
        "Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng, vui lòng liên hệ:",
        "Email: legal@itjobsai.com",
        "Hotline: 1900 1234",
        "Địa chỉ: 123 Nguyễn Huệ, Q.1, TP. Hồ Chí Minh",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ECF4D6]">
      {/* Hero */}
      <section className="pt-20 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#ECF4D6] rounded-2xl mb-6 border border-[#9AD0C2]">
                <FileText className="w-10 h-10 text-[#2D9596]" />
              </div>
              <h1 className="text-[#265073] text-5xl mb-4">
                Điều khoản sử dụng
              </h1>
              <p className="text-[#2D9596] text-lg">
                Cập nhật lần cuối: 15/11/2025
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)]"
            >
              <div className="prose max-w-none">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="mb-8 last:mb-0"
                  >
                    <h2 className="text-[#2D9596] text-2xl mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-[#265073]/80 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

