import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Receipt } from 'lucide-react';
import PricingCard from '../components/packages/PricingCard';
import ComparisonTable from '../components/packages/ComparisonTable';
import DiscountBanner from '../components/packages/DiscountBanner';
import FAQSection from '../components/packages/FAQSection';
import CurrentPlanSidebar from '../components/packages/CurrentPlanSidebar';
import PaymentModal from '../components/packages/PaymentModal';
import { packages } from '../components/packages/packagesData';

const EmployerPackages: React.FC = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
  };

  const handleClosePaymentModal = () => {
    setSelectedPackageId(null);
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-[#265073] mb-2">Gói dịch vụ tuyển dụng</h1>
              <p className="text-[#265073]/70 max-w-3xl">
                Chọn gói phù hợp để đăng tin hiệu quả hơn, tiếp cận nhiều ứng viên chất
                lượng và mở khóa AI tuyển dụng.
              </p>
            </div>
            <button className="px-6 py-2.5 bg-white border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors flex items-center gap-2 whitespace-nowrap">
              <Receipt className="w-5 h-5" />
              Lịch sử thanh toán
            </button>
          </div>
        </motion.div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Pricing Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <PricingCard package={pkg} onSelectPackage={handleSelectPackage} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Discount Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <DiscountBanner />
            </motion.div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ComparisonTable />
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <FAQSection />
            </motion.div>
          </div>

          {/* Sidebar - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-[320px] hidden lg:block"
          >
            <div className="sticky top-24">
              <CurrentPlanSidebar />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPackageId && (
        <PaymentModal packageId={selectedPackageId} onClose={handleClosePaymentModal} />
      )}
    </div>
  );
};

export default EmployerPackages;
