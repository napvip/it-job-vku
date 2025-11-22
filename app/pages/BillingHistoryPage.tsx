import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Download,
  Eye,
  Package,
  Calendar,
  Receipt,
  FileText,
} from 'lucide-react';
import {
  billingTransactions,
  BillingTransaction,
  getPaymentMethodLabel,
  getStatusLabel,
  getStatusColor,
} from '../components/payment/billingData';
import InvoiceModal from '../components/payment/InvoiceModal';

interface BillingHistoryPageProps {
  onNavigateToPackages: () => void;
}

const BillingHistoryPage: React.FC<BillingHistoryPageProps> = ({
  onNavigateToPackages,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<BillingTransaction | null>(null);

  const filterTransactions = () => {
    return billingTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.transactionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.packageName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPackage =
        selectedPackage === 'all' ||
        transaction.packageName.toLowerCase() === selectedPackage.toLowerCase();

      // Simple month filtering - in real app, parse dates properly
      const matchesMonth = selectedMonth === 'all' || transaction.date.includes(selectedMonth);

      return matchesSearch && matchesPackage && matchesMonth;
    });
  };

  const filteredTransactions = filterTransactions();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleDownloadInvoice = (transaction: BillingTransaction) => {
    alert(`Đang tải hóa đơn ${transaction.transactionCode}...`);
  };

  return (
    <div className="min-h-screen bg-[#ECF4D6] pt-20">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-[#265073] mb-2">Lịch sử thanh toán</h1>
          <p className="text-[#265073]/70">
            Theo dõi các giao dịch và hóa đơn của công ty.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
              <input
                type="text"
                placeholder="Tìm theo mã giao dịch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors"
              />
            </div>

            {/* Package Filter */}
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors appearance-none bg-white"
              >
                <option value="all">Tất cả gói</option>
                <option value="free">Free</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            {/* Month Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#265073]/40" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#9AD0C2] rounded-lg focus:outline-none focus:border-[#2D9596] transition-colors appearance-none bg-white"
              >
                <option value="all">Tất cả tháng</option>
                <option value="/11/2025">Tháng 11/2025</option>
                <option value="/10/2025">Tháng 10/2025</option>
                <option value="/09/2025">Tháng 9/2025</option>
                <option value="/08/2025">Tháng 8/2025</option>
                <option value="/07/2025">Tháng 7/2025</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Transactions Table */}
        {filteredTransactions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border-2 border-[#9AD0C2] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#9AD0C2]">
                  <tr>
                    <th className="text-left p-4 text-[#265073]">Ngày thanh toán</th>
                    <th className="text-left p-4 text-[#265073]">Gói sử dụng</th>
                    <th className="text-right p-4 text-[#265073]">Số tiền</th>
                    <th className="text-center p-4 text-[#265073]">Mã giao dịch</th>
                    <th className="text-center p-4 text-[#265073]">Phương thức</th>
                    <th className="text-center p-4 text-[#265073]">Trạng thái</th>
                    <th className="text-center p-4 text-[#265073]">Hóa đơn</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t-2 border-[#9AD0C2] hover:bg-[#ECF4D6] transition-colors"
                    >
                      <td className="p-4 text-[#265073]">
                        <div>
                          <div>{transaction.date}</div>
                          <div className="text-sm text-[#265073]/60">{transaction.time}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#2D9596]" />
                          <span className="text-[#265073]">{transaction.packageName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right text-[#2D9596]">
                        {formatPrice(transaction.amount)}
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 bg-[#ECF4D6] text-[#265073] rounded-full text-sm">
                          {transaction.transactionCode}
                        </span>
                      </td>
                      <td className="p-4 text-center text-[#265073]">
                        {getPaymentMethodLabel(transaction.paymentMethod)}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getStatusLabel(transaction.status)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedInvoice(transaction)}
                            className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
                            title="Xem hóa đơn"
                          >
                            <Eye className="w-5 h-5 text-[#2D9596]" />
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(transaction)}
                            className="p-2 hover:bg-[#9AD0C2]/20 rounded-lg transition-colors"
                            title="Tải PDF"
                          >
                            <Download className="w-5 h-5 text-[#2D9596]" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-12 border-2 border-[#9AD0C2] text-center"
          >
            <div className="w-20 h-20 bg-[#ECF4D6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-10 h-10 text-[#2D9596]" />
            </div>
            <h3 className="text-[#265073] mb-2">Chưa có giao dịch nào</h3>
            <p className="text-[#265073]/70 mb-6">
              Bạn chưa thực hiện giao dịch thanh toán nào.
            </p>
            <button
              onClick={onNavigateToPackages}
              className="px-6 py-3 bg-[#2D9596] text-white rounded-lg hover:bg-[#265073] transition-colors"
            >
              Mua gói dịch vụ
            </button>
          </motion.div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal
          transaction={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default BillingHistoryPage;
