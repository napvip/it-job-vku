"use client";

import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyContactSidebarProps {
  contact: {
    email: string;
    phone: string;
    address: string;
    website: string;
  };
}

export function CompanyContactSidebar({ contact }: CompanyContactSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-6 border border-[#9AD0C2] shadow-[0_4px_20px_rgba(154,208,194,0.1)] mb-6"
    >
      <h3 className="text-[#265073] text-lg mb-4">Thông tin liên hệ</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-[#2D9596] mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#265073]/70 mb-1">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-[#2D9596] hover:underline break-all"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-[#2D9596] mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#265073]/70 mb-1">Số điện thoại</p>
            <a
              href={`tel:${contact.phone}`}
              className="text-[#2D9596] hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#2D9596] mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#265073]/70 mb-1">Địa chỉ</p>
            <p className="text-[#265073]">{contact.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-[#2D9596] mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#265073]/70 mb-1">Website</p>
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D9596] hover:underline break-all"
            >
              {contact.website}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


