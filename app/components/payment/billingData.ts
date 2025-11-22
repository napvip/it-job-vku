export interface BillingTransaction {
  id: string;
  transactionCode: string;
  date: string;
  time: string;
  packageName: string;
  amount: number;
  paymentMethod: 'momo' | 'card' | 'bank' | 'zalopay';
  status: 'success' | 'pending' | 'failed';
  invoiceUrl?: string;
  period: string;
  expiryDate: string;
  companyInfo?: {
    name: string;
    taxCode: string;
    address: string;
    email: string;
  };
}

export interface PaymentPackage {
  id: string;
  name: string;
  period: '1-month' | '3-months' | '1-year';
  originalPrice: number;
  discount: number;
  finalPrice: number;
  expiryDate: string;
  features: string[];
}

export const billingTransactions: BillingTransaction[] = [
  {
    id: '1',
    transactionCode: 'TXN-58429',
    date: '21/11/2025',
    time: '10:45 AM',
    packageName: 'Premium',
    amount: 1490000,
    paymentMethod: 'momo',
    status: 'success',
    period: '1 tháng',
    expiryDate: '21/12/2025',
    companyInfo: {
      name: 'Công ty TNHH Công Nghệ ABC',
      taxCode: '0123456789',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      email: 'nhatuyendung@gmail.com',
    },
  },
  {
    id: '2',
    transactionCode: 'TXN-54321',
    date: '15/10/2025',
    time: '03:20 PM',
    packageName: 'Standard',
    amount: 599000,
    paymentMethod: 'card',
    status: 'success',
    period: '1 tháng',
    expiryDate: '15/11/2025',
    companyInfo: {
      name: 'Công ty TNHH Công Nghệ ABC',
      taxCode: '0123456789',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      email: 'nhatuyendung@gmail.com',
    },
  },
  {
    id: '3',
    transactionCode: 'TXN-48932',
    date: '05/09/2025',
    time: '11:15 AM',
    packageName: 'Premium',
    amount: 1490000,
    paymentMethod: 'bank',
    status: 'success',
    period: '1 tháng',
    expiryDate: '05/10/2025',
    companyInfo: {
      name: 'Công ty TNHH Công Nghệ ABC',
      taxCode: '0123456789',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      email: 'nhatuyendung@gmail.com',
    },
  },
  {
    id: '4',
    transactionCode: 'TXN-47123',
    date: '20/08/2025',
    time: '09:30 AM',
    packageName: 'Standard',
    amount: 599000,
    paymentMethod: 'momo',
    status: 'pending',
    period: '1 tháng',
    expiryDate: '20/09/2025',
    companyInfo: {
      name: 'Công ty TNHH Công Nghệ ABC',
      taxCode: '0123456789',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      email: 'nhatuyendung@gmail.com',
    },
  },
  {
    id: '5',
    transactionCode: 'TXN-45678',
    date: '10/07/2025',
    time: '02:45 PM',
    packageName: 'Premium',
    amount: 1490000,
    paymentMethod: 'card',
    status: 'failed',
    period: '1 tháng',
    expiryDate: '10/08/2025',
    companyInfo: {
      name: 'Công ty TNHH Công Nghệ ABC',
      taxCode: '0123456789',
      address: '123 Nguyễn Huệ, Q.1, TP.HCM',
      email: 'nhatuyendung@gmail.com',
    },
  },
];

export const getPaymentMethodLabel = (method: string): string => {
  const labels: { [key: string]: string } = {
    momo: 'MoMo',
    card: 'Thẻ ngân hàng',
    bank: 'Chuyển khoản',
    zalopay: 'ZaloPay',
  };
  return labels[method] || method;
};

export const getStatusLabel = (status: string): string => {
  const labels: { [key: string]: string } = {
    success: 'Thành công',
    pending: 'Chờ xử lý',
    failed: 'Thất bại',
  };
  return labels[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    success: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50',
    failed: 'text-red-600 bg-red-50',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
};
