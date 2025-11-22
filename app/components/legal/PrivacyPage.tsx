"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function PrivacyPage() {
  const sections = [
    {
      title: "1. Thông tin chúng tôi thu thập",
      content: [
        "Chúng tôi thu thập các loại thông tin sau khi bạn sử dụng dịch vụ:",
        "• Thông tin cá nhân: Họ tên, email, số điện thoại, địa chỉ",
        "• Thông tin nghề nghiệp: CV, kinh nghiệm làm việc, kỹ năng, học vấn",
        "• Thông tin công ty: Tên công ty, quy mô, lĩnh vực hoạt động (đối với nhà tuyển dụng)",
        "• Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, thiết bị, thời gian truy cập",
        "• Dữ liệu sử dụng: Lịch sử tìm kiếm, việc làm đã xem, ứng tuyển",
      ],
    },
    {
      title: "2. Mục đích sử dụng dữ liệu",
      content: [
        "Chúng tôi sử dụng dữ liệu của bạn cho các mục đích sau:",
        "• Cung cấp và cải thiện dịch vụ tuyển dụng",
        "• Vận hành hệ thống AI Matching để gợi ý việc làm/ứng viên phù hợp",
        "• Gửi thông báo về cơ hội việc làm, cập nhật hồ sơ",
        "• Phân tích và báo cáo thống kê (dữ liệu được ẩn danh)",
        "• Bảo mật tài khoản và ngăn chặn gian lận",
        "• Tuân thủ các yêu cầu pháp lý",
      ],
    },
    {
      title: "3. Chia sẻ thông tin",
      content: [
        "Chúng tôi cam kết không bán hoặc cho thuê thông tin cá nhân của bạn.",
        "Thông tin có thể được chia sẻ trong các trường hợp sau:",
        "• Với nhà tuyển dụng: Khi bạn ứng tuyển vào một vị trí",
        "• Với ứng viên: Khi nhà tuyển dụng xem hồ sơ (chỉ thông tin cơ bản)",
        "• Với nhà cung cấp dịch vụ: Email marketing, phân tích dữ liệu (tuân thủ NDA)",
        "• Theo yêu cầu pháp lý: Khi có lệnh từ cơ quan có thẩm quyền",
      ],
    },
    {
      title: "4. Bảo mật dữ liệu",
      content: [
        "Chúng tôi áp dụng các biện pháp bảo mật tiên tiến:",
        "• Mã hóa SSL 256-bit cho mọi giao dịch",
        "• Lưu trữ dữ liệu trên máy chủ an toàn với tường lửa đa lớp",
        "• Kiểm soát truy cập nghiêm ngặt với xác thực 2 yếu tố",
        "• Sao lưu dữ liệu định kỳ",
        "• Giám sát an ninh 24/7 và phát hiện xâm nhập",
        "• Tuân thủ các tiêu chuẩn bảo mật quốc tế (ISO 27001)",
      ],
    },
    {
      title: "5. Lưu trữ dữ liệu",
      content: [
        "Dữ liệu của bạn được lưu trữ:",
        "• Trong thời gian bạn sử dụng dịch vụ",
        "• Sau khi xóa tài khoản: lưu trữ thêm 30 ngày để xử lý các yêu cầu còn tồn đọng",
        "• Dữ liệu ẩn danh có thể được giữ lại lâu hơn cho mục đích phân tích và cải thiện dịch vụ",
        "• Theo yêu cầu pháp luật: lưu trữ tối thiểu theo quy định",
      ],
    },
    {
      title: "6. Quyền của người dùng",
      content: [
        "Bạn có các quyền sau đối với dữ liệu cá nhân:",
        "• Quyền truy cập: Xem dữ liệu chúng tôi đang lưu trữ về bạn",
        "• Quyền chỉnh sửa: Cập nhật hoặc sửa đổi thông tin cá nhân",
        "• Quyền xóa: Yêu cầu xóa dữ liệu cá nhân (trừ khi pháp luật yêu cầu lưu giữ)",
        "• Quyền hạn chế xử lý: Giới hạn cách thức sử dụng dữ liệu",
        "• Quyền từ chối: Từ chối việc xử lý dữ liệu cho mục đích marketing",
        "• Quyền di chuyển: Nhận dữ liệu ở định dạng có thể chuyển đổi",
      ],
    },
    {
      title: "7. Cookies và công nghệ theo dõi",
      content: [
        "Chúng tôi sử dụng cookies và công nghệ tương tự để:",
        "• Ghi nhớ đăng nhập và tùy chọn của bạn",
        "• Phân tích lưu lượng truy cập và hành vi người dùng",
        "• Cải thiện trải nghiệm người dùng",
        "• Hiển thị quảng cáo phù hợp (nếu có)",
        "Bạn có thể quản lý cookies trong cài đặt trình duyệt. Lưu ý rằng việc vô hiệu hóa cookies có thể ảnh hưởng đến chức năng của nền tảng.",
      ],
    },
    {
      title: "8. Dịch vụ bên thứ ba",
      content: [
        "Nền tảng có thể tích hợp với các dịch vụ bên thứ ba:",
        "• Đăng nhập qua Google, LinkedIn",
        "• Thanh toán qua cổng payment gateway",
        "• Phân tích qua Google Analytics",
        "Các dịch vụ này có chính sách bảo mật riêng. Chúng tôi khuyến khích bạn đọc kỹ trước khi sử dụng.",
      ],
    },
    {
      title: "9. Quyền riêng tư của trẻ em",
      content: [
        "Dịch vụ của chúng tôi không dành cho người dưới 16 tuổi.",
        "Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em.",
        "Nếu phát hiện dữ liệu của trẻ em, chúng tôi sẽ xóa ngay lập tức.",
      ],
    },
    {
      title: "10. Thay đổi chính sách",
      content: [
        "Chúng tôi có thể cập nhật Chính sách bảo mật định kỳ.",
        "Mọi thay đổi quan trọng sẽ được thông báo qua email hoặc thông báo trên nền tảng.",
        "Ngày cập nhật sẽ được ghi rõ ở đầu trang.",
        "Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc chấp nhận chính sách mới.",
      ],
    },
    {
      title: "11. Liên hệ",
      content: [
        "Nếu bạn có câu hỏi hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:",
        "• Email: privacy@itjobsai.com",
        "• Hotline: 1900 1234",
        "• Địa chỉ: 123 Nguyễn Huệ, Q.1, TP. Hồ Chí Minh",
        "• Data Protection Officer: dpo@itjobsai.com",
        "Chúng tôi cam kết phản hồi trong vòng 7 ngày làm việc.",
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
                <Shield className="w-10 h-10 text-[#2D9596]" />
              </div>
              <h1 className="text-[#265073] text-5xl mb-4">
                Chính sách bảo mật
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
              <div className="mb-8 p-6 bg-[#ECF4D6] rounded-2xl border border-[#9AD0C2]">
                <p className="text-[#265073] leading-relaxed">
                  Tại IT Jobs AI, chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn.
                  Chính sách này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn.
                </p>
              </div>

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

              {/* Footer Note */}
              <div className="mt-12 p-6 bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-2xl text-white">
                <h3 className="text-xl mb-2">Cam kết của chúng tôi</h3>
                <p className="text-white/90">
                  Chúng tôi luôn đặt quyền riêng tư của bạn lên hàng đầu và không ngừng cải thiện
                  các biện pháp bảo mật để đảm bảo dữ liệu của bạn được an toàn tuyệt đối.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

