"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

export function PricingCards() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Dành cho công ty nhỏ thử nghiệm",
      icon: Star,
      features: [
        "Đăng 1 tin tuyển dụng / tháng",
        "Xem hồ sơ ứng viên (hạn chế)",
        "Quản lý ứng viên cơ bản",
        "Email hỗ trợ",
      ],
      limitations: [
        "Không có AI Matching",
        "Không có phân tích dữ liệu",
      ],
      buttonText: "Bắt đầu miễn phí",
      popular: false,
    },
    {
      name: "Standard",
      price: "2,990,000",
      period: "/tháng",
      description: "Phổ biến cho SME & Startup",
      icon: Check,
      features: [
        "Đăng 10 tin tuyển dụng / tháng",
        "Xem hồ sơ ứng viên không giới hạn",
        "AI gợi ý ứng viên cơ bản",
        "Quản lý ATS đầy đủ",
        "Hỗ trợ email & chat",
        "Dashboard báo cáo",
      ],
      limitations: [],
      buttonText: "Chọn gói Standard",
      popular: true,
    },
    {
      name: "Premium AI",
      price: "5,990,000",
      period: "/tháng",
      description: "Tối ưu cho doanh nghiệp lớn",
      icon: Zap,
      features: [
        "Đăng tin không giới hạn",
        "AI Matching nâng cao",
        "Gợi ý ứng viên theo JD tự động",
        "Dashboard phân tích chuyên sâu",
        "ATS tích hợp đầy đủ",
        "API Integration",
        "Dedicated Account Manager",
        "Hỗ trợ 24/7 ưu tiên",
      ],
      limitations: [],
      buttonText: "Liên hệ tư vấn",
      popular: false,
      gradient: true,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-3xl p-8 border-2 transition-all ${
                  plan.popular
                    ? "border-[#2D9596] shadow-[0_12px_40px_rgba(45,149,150,0.25)]"
                    : plan.gradient
                    ? "border-[#9AD0C2] bg-gradient-to-br from-white via-white to-[#ECF4D6] shadow-[0_12px_40px_rgba(154,208,194,0.25)]"
                    : "border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.15)]"
                } hover:shadow-[0_16px_48px_rgba(45,149,150,0.3)]`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-6 py-2 bg-[#2D9596] text-white rounded-full text-sm shadow-lg">
                      Phổ biến nhất
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.gradient
                    ? "bg-gradient-to-br from-[#2D9596] to-[#265073]"
                    : "bg-[#ECF4D6]"
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.gradient ? "text-white" : "text-[#2D9596]"
                  }`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-[#265073] text-2xl mb-2">
                  {plan.name}
                </h3>
                <p className="text-[#265073]/70 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl text-[#265073]">
                      {plan.price === "0" ? "Miễn phí" : `${plan.price}₫`}
                    </span>
                    {plan.period && (
                      <span className="text-[#265073]/70 mb-2">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#2D9596] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[#265073] text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-50">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5"></div>
                      <span className="text-[#265073]/70 text-sm line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-full transition-all ${
                    plan.popular
                      ? "bg-[#2D9596] text-white hover:bg-[#265073] shadow-lg hover:shadow-xl"
                      : plan.gradient
                      ? "bg-gradient-to-r from-[#265073] to-[#2D9596] text-white hover:shadow-xl"
                      : "bg-[#265073] text-white hover:bg-[#2D9596]"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Additional Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-[#265073]/70">
              Tất cả giá đã bao gồm VAT. Liên hệ với chúng tôi để được tư vấn gói phù hợp nhất.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


