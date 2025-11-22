"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email hỗ trợ",
      value: "support@itjobsai.com",
      link: "mailto:support@itjobsai.com",
    },
    {
      icon: Phone,
      title: "Hotline",
      value: "1900 1234",
      link: "tel:19001234",
    },
    {
      icon: Clock,
      title: "Thời gian làm việc",
      value: "T2 - T6: 8:00 - 18:00",
      subValue: "T7: 8:00 - 12:00",
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      value: "123 Nguyễn Huệ",
      subValue: "Q.1, TP. HCM",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_8px_32px_rgba(154,208,194,0.2)]"
      >
        <h3 className="text-[#265073] text-xl mb-6">Thông tin liên hệ</h3>

        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 bg-[#ECF4D6] rounded-xl flex items-center justify-center flex-shrink-0">
                <detail.icon className="w-6 h-6 text-[#2D9596]" />
              </div>
              <div className="flex-1">
                <div className="text-[#265073]/70 text-sm mb-1">
                  {detail.title}
                </div>
                {detail.link ? (
                  <a
                    href={detail.link}
                    className="text-[#265073] hover:text-[#2D9596] transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <>
                    <div className="text-[#265073]">{detail.value}</div>
                    {detail.subValue && (
                      <div className="text-[#265073] text-sm">
                        {detail.subValue}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#265073] to-[#2D9596] rounded-2xl p-6 text-white"
      >
        <h3 className="text-xl mb-3">Hỗ trợ nhanh</h3>
        <p className="text-white/90 text-sm mb-4">
          Nếu cần hỗ trợ khẩn cấp, vui lòng gọi hotline hoặc chat trực tiếp với đội ngũ hỗ trợ.
        </p>
        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors border border-white/30">
          Chat ngay
        </button>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden border border-[#9AD0C2] shadow-lg"
      >
        <div className="h-48 bg-gradient-to-br from-[#ECF4D6] to-[#9AD0C2] flex items-center justify-center">
          <MapPin className="w-12 h-12 text-[#265073]" />
        </div>
      </motion.div>
    </div>
  );
}


