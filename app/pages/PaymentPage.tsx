import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import PackageSummaryCard from '../components/payment/PackageSummaryCard';
import PaymentMethodsCard from '../components/payment/PaymentMethodsCard';
import PaymentSuccessModal from '../components/payment/PaymentSuccessModal';

interface PaymentPageProps {
  onNavigateToBillingHistory: () => void;
  onNavigateToPackages: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  onNavigateToBillingHistory,
  onNavigateToPackages,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'momo' | 'bank'>('card');
  const [sendInvoice, setSendInvoice] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock package data - in real app, this would come from route params or context
  const packageData = {
    name: 'PREMIUM',
    period: '1-month' as const,
    originalPrice: 1490000,
    discount: 0,
    finalPrice: 1490000,
    expiryDate: '22/12/2025',
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccess(true);
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getPaymentMethodLabel = () => {
    switch (selectedMethod) {
      case 'card':
        return 'Thẻ ngân hàng';
      case 'momo':
        return 'MoMo';
      case 'bank':
        return 'Chuyển khoản';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 pb-32">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-[#265073] mb-2">Thanh toán</h1>
              <p className="text-[#265073]/70 max-w-2xl">
                Hoàn tất giao dịch để kích hoạt gói dịch vụ tuyển dụng.
              </p>
            </div>
            <button
              onClick={onNavigateToBillingHistory}
              className="px-6 py-2.5 bg-white border-2 border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596]/10 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Clock className="w-5 h-5" />
              Lịch sử thanh toán
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Package Summary */}
          <div className="lg:col-span-1">
            <PackageSummaryCard
              packageName={packageData.name}
              period={packageData.period}
              originalPrice={packageData.originalPrice}
              discount={packageData.discount}
              finalPrice={packageData.finalPrice}
              expiryDate={packageData.expiryDate}
              onChangePackage={onNavigateToPackages}
            />
          </div>

          {/* Right Column - Payment Methods */}
          <div className="lg:col-span-2">
            <PaymentMethodsCard
              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
              sendInvoice={sendInvoice}
              onSendInvoiceChange={setSendInvoice}
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Payment Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-[#9AD0C2] shadow-lg z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-[#265073]/70 mb-1">Tổng tiền</p>
                  <p className="text-2xl text-[#2D9596]">
                    {formatPrice(packageData.finalPrice)}
                  </p>
                </div>
                <div className="h-12 w-px bg-[#9AD0C2]" />
                <div>
                  <p className="text-sm text-[#265073]/70 mb-1">Phương thức</p>
                  <p className="text-[#265073]">{getPaymentMethodLabel()}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="px-8 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors shadow-lg text-lg"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <PaymentSuccessModal
          transactionCode="TXN-58429"
          date="22/11/2025 - 10:45 AM"
          amount={packageData.finalPrice}
          packageName={packageData.name}
          expiryDate={packageData.expiryDate}
          onViewHistory={onNavigateToBillingHistory}
          onBackToPackages={onNavigateToPackages}
        />
      )}
    </div>
  );
};

export default PaymentPage;
