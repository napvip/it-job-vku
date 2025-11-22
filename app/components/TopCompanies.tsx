"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const companies = [
  { id: 1, name: "FPT Software", positions: 45, logo: "💼" },
  { id: 2, name: "VNG Corporation", positions: 32, logo: "🎮" },
  { id: 3, name: "Viettel Digital", positions: 28, logo: "📡" },
  { id: 4, name: "TechCombank", positions: 23, logo: "🏦" },
  { id: 5, name: "Grab Vietnam", positions: 19, logo: "🚗" },
  { id: 6, name: "Shopee Vietnam", positions: 34, logo: "🛍️" },
  { id: 7, name: "Momo", positions: 27, logo: "💳" },
  { id: 8, name: "Tiki", positions: 21, logo: "📦" },
  { id: 9, name: "VinID", positions: 18, logo: "🔐" },
];

interface TopCompaniesProps {
  onCompanyClick?: (companyId: number) => void;
}

export function TopCompanies({ onCompanyClick }: TopCompaniesProps) {
  return (
    <section className="py-16 bg-[#ECF4D6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-[#265073] mb-4">Top công ty IT đang tuyển nhiều</h2>
          <p className="text-[#2D9596] text-lg">Những công ty hàng đầu đang tìm kiếm nhân tài</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => onCompanyClick?.(company.id)}
              className="bg-white rounded-2xl p-6 cursor-pointer transition-all border-2 border-[#9AD0C2] hover:border-[#2D9596] group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ECF4D6] rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {company.logo}
                </div>
                <h3 className="text-[#265073] mb-2">{company.name}</h3>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#2D9596] text-white text-sm rounded-full">
                  Đang tuyển {company.positions} vị trí
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => onCompanyClick?.(0)}
            className="px-8 py-3 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-all inline-flex items-center gap-2"
          >
            Xem tất cả công ty
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

