export interface Package {
  id: string;
  name: string;
  price: number | null; // null for "Contact us"
  period: string;
  isFeatured: boolean;
  isCurrentPlan: boolean;
  badge?: string;
  features: {
    text: string;
    included: boolean;
  }[];
  ctaText: string;
  ctaType: 'current' | 'primary' | 'secondary' | 'outline';
}

export const packages: Package[] = [
  {
    id: 'free',
    name: 'FREE',
    price: 0,
    period: 'tháng',
    isFeatured: false,
    isCurrentPlan: true,
    features: [
      { text: 'Đăng 1 tin miễn phí mỗi tháng', included: true },
      { text: 'Ứng viên ứng tuyển không giới hạn', included: true },
      { text: 'Không xem được hồ sơ ứng viên chủ động', included: false },
      { text: 'Không dùng AI Matching', included: false },
      { text: 'Không báo cáo nâng cao', included: false },
      { text: 'Không làm mới tin tự động', included: false },
    ],
    ctaText: 'Đang sử dụng',
    ctaType: 'current',
  },
  {
    id: 'standard',
    name: 'STANDARD',
    price: 599000,
    period: 'tháng',
    isFeatured: false,
    isCurrentPlan: false,
    features: [
      { text: 'Đăng 5 tin tuyển dụng', included: true },
      { text: 'Làm mới tin thủ công', included: true },
      { text: 'Xem 20 hồ sơ ứng viên trong hệ thống', included: true },
      { text: 'Bộ lọc nâng cao', included: true },
      { text: 'Không có AI Matching', included: false },
      { text: 'Không có phân tích JD', included: false },
    ],
    ctaText: 'Nâng cấp Standard',
    ctaType: 'secondary',
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 1490000,
    period: 'tháng',
    isFeatured: true,
    isCurrentPlan: false,
    badge: 'Most Popular',
    features: [
      { text: 'Đăng không giới hạn job', included: true },
      { text: 'AI gợi ý ứng viên (AI Matching)', included: true },
      { text: 'AI phân tích JD', included: true },
      { text: 'Làm mới tin tự động', included: true },
      { text: 'Xem không giới hạn hồ sơ', included: true },
      { text: 'Gắn nhãn "Tin tuyển dụng nổi bật"', included: true },
      { text: 'Hỗ trợ trực tiếp từ CSKH', included: true },
    ],
    ctaText: 'Dùng gói PREMIUM',
    ctaType: 'primary',
  },
  {
    id: 'premium-plus',
    name: 'PREMIUM PLUS',
    price: null,
    period: 'Liên hệ',
    isFeatured: false,
    isCurrentPlan: false,
    badge: 'Enterprise',
    features: [
      { text: 'Tất cả tính năng PREMIUM', included: true },
      { text: 'Quản lý team HR nâng cao', included: true },
      { text: 'Phân quyền đa cấp', included: true },
      { text: 'Lọc ứng viên theo hành vi', included: true },
      { text: 'Công cụ phân tích dữ liệu doanh nghiệp', included: true },
      { text: 'SLA hỗ trợ 1–1', included: true },
    ],
    ctaText: 'Liên hệ tư vấn',
    ctaType: 'outline',
  },
];

export interface ComparisonFeature {
  name: string;
  free: string | boolean;
  standard: string | boolean;
  premium: string | boolean;
  premiumPlus: string | boolean;
}

export const comparisonFeatures: ComparisonFeature[] = [
  {
    name: 'Số tin đăng mỗi tháng',
    free: '1',
    standard: '5',
    premium: 'Unlimited',
    premiumPlus: 'Unlimited',
  },
  {
    name: 'Xem hồ sơ ứng viên',
    free: '0',
    standard: '20',
    premium: 'Unlimited',
    premiumPlus: 'Unlimited',
  },
  {
    name: 'AI Gợi ý ứng viên',
    free: false,
    standard: false,
    premium: true,
    premiumPlus: true,
  },
  {
    name: 'AI Phân tích JD',
    free: false,
    standard: false,
    premium: true,
    premiumPlus: true,
  },
  {
    name: 'Làm mới tin tự động',
    free: false,
    standard: false,
    premium: true,
    premiumPlus: true,
  },
  {
    name: 'Hỗ trợ doanh nghiệp',
    free: 'Cơ bản',
    standard: 'Cơ bản',
    premium: 'Cao',
    premiumPlus: 'Enterprise',
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'Gói Premium có hoàn tiền không?',
    answer:
      'Chúng tôi có chính sách hoàn tiền trong vòng 7 ngày đầu tiên nếu bạn không hài lòng với dịch vụ. Vui lòng liên hệ với bộ phận CSKH để được hỗ trợ.',
  },
  {
    question: 'Tài khoản HR có dùng chung với team không?',
    answer:
      'Gói Standard và Premium hỗ trợ tối đa 3 tài khoản HR. Gói Premium Plus cho phép quản lý team HR không giới hạn với phân quyền đa cấp.',
  },
  {
    question: 'Dùng AI Matching như thế nào?',
    answer:
      'AI Matching tự động phân tích JD của bạn và gợi ý các ứng viên phù hợp nhất trong hệ thống. Bạn chỉ cần tạo tin tuyển dụng, AI sẽ làm phần còn lại!',
  },
  {
    question: 'Có giảm giá khi mua theo năm không?',
    answer:
      'Có! Khi đăng ký gói theo năm, bạn sẽ được giảm 20% tổng chi phí và nhận thêm 10 lượt xem hồ sơ miễn phí. Đây là ưu đãi tốt nhất của chúng tôi.',
  },
];
