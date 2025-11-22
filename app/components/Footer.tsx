"use client";

import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();
  
  return (
    <footer className="bg-[#2D9596] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl mb-4">Về chúng tôi</h3>
            <p className="opacity-90 mb-4 text-sm">
              Nền tảng tuyển dụng IT thông minh, kết nối nhân tài với cơ hội việc làm thông qua công nghệ AI tiên tiến.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#2D9596] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#2D9596] transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#2D9596] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#2D9596] transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => router.push("/")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/about")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Giới thiệu
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/pricing")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Bảng giá
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/blog")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/faq")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/contact")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl mb-4">Pháp lý</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => router.push("/legal/terms")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Điều khoản sử dụng
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/legal/privacy")} className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Chính sách bảo mật
                </button>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Quy định thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:text-[#ECF4D6] transition-colors">
                  Giải quyết khiếu nại
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="opacity-90">
                  Tầng 10, Tòa nhà ABC, Đường XYZ, Hà Nội
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="opacity-90">0123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="opacity-90">contact@itjobsai.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-90">
          <p>© 2025 IT Jobs AI. All rights reserved. Made with ❤️ for IT Community</p>
        </div>
      </div>
    </footer>
  );
}

