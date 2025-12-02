# Hướng dẫn sử dụng Firebase Authentication

## 📋 Tổng quan

Dự án đã được tích hợp Firebase Authentication với các tính năng:

- ✅ Đăng ký tài khoản (Ứng viên & Nhà tuyển dụng)
- ✅ Đăng nhập/Đăng xuất
- ✅ Lưu thông tin người dùng vào Firestore
- ✅ Hiển thị thông tin người dùng trên Header
- ✅ Quản lý trạng thái xác thực toàn cục

## 🗂️ Cấu trúc files đã tạo/cập nhật

### 1. Firebase Configuration

**File:** `lib/firebase.ts`

- Khởi tạo Firebase App
- Cấu hình Authentication & Firestore
- Các hàm helper:
  - `registerUser()` - Đăng ký người dùng mới
  - `loginUser()` - Đăng nhập
  - `logoutUser()` - Đăng xuất
  - `getUserData()` - Lấy thông tin người dùng
  - `updateUserData()` - Cập nhật thông tin

### 2. Auth Context

**File:** `app/contexts/AuthContext.tsx`

- Quản lý state xác thực toàn cục
- Tự động lắng nghe thay đổi auth state
- Cung cấp `useAuth()` hook cho components

### 3. Components đã cập nhật

- `app/components/login/LoginForm.tsx` - Form đăng nhập với Firebase
- `app/components/register/RegisterForm.tsx` - Form đăng ký với Firebase
- `app/components/Header.tsx` - Hiển thị tên user/nút đăng xuất
- `app/components/candidate/CandidateHeader.tsx` - Header candidate với user info
- `app/components/employer/EmployerHeader.tsx` - Header employer với user info
- `app/layout.tsx` - Wrap app với AuthProvider

## 🚀 Cách sử dụng

### Đăng ký tài khoản mới

1. Truy cập `/register`
2. Chọn vai trò: **Ứng viên** hoặc **Nhà tuyển dụng**
3. Điền thông tin:
   - **Ứng viên**: Họ tên, Email, Mật khẩu, SĐT, Vị trí mong muốn, Cấp độ
   - **Nhà tuyển dụng**: Tên công ty, Email, Mật khẩu, Đại diện, SĐT, Loại hình, Quy mô
4. Đồng ý điều khoản và nhấn "Đăng ký"
5. Tự động chuyển đến dashboard tương ứng

### Đăng nhập

1. Truy cập `/login`
2. Nhập Email và Mật khẩu
3. Nhấn "Đăng nhập"
4. Hệ thống tự động phân biệt vai trò và chuyển đến:
   - Ứng viên → `/candidate/dashboard`
   - Nhà tuyển dụng → `/employer/dashboard`

### Đăng xuất

Nhấn nút "Đăng xuất" ở:

- Header trang chủ
- Dropdown menu ở CandidateHeader/EmployerHeader

## 💾 Cấu trúc dữ liệu Firestore

### Collection: `users`

```typescript
{
  uid: string;              // Firebase Auth UID
  email: string;            // Email người dùng
  displayName: string;      // Tên hiển thị
  role: 'candidate' | 'employer';  // Vai trò

  // Ứng viên (candidate)
  phone?: string;           // Số điện thoại
  position?: string;        // Vị trí mong muốn
  level?: string;           // Cấp độ (fresher, junior, etc.)

  // Nhà tuyển dụng (employer)
  companyName?: string;     // Tên công ty
  representative?: string;  // Người đại diện
  companyType?: string;     // Loại hình (product, outsourcing, etc.)
  companySize?: string;     // Quy mô (1-10, 11-50, etc.)

  createdAt: Date;          // Ngày tạo
  updatedAt: Date;          // Ngày cập nhật
}
```

## 🔧 Sử dụng trong Components

### Hook useAuth()

```tsx
import { useAuth } from "@/app/contexts/AuthContext";

function MyComponent() {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!user) {
    return <div>Chưa đăng nhập</div>;
  }

  return (
    <div>
      <h1>Xin chào, {userData?.displayName}!</h1>
      <p>Email: {userData?.email}</p>
      <p>Vai trò: {userData?.role}</p>
    </div>
  );
}
```

### Đăng nhập thủ công

```tsx
import { loginUser } from "@/lib/firebase";

async function handleLogin() {
  try {
    const { user, userData } = await loginUser(email, password);
    console.log("Đăng nhập thành công:", userData);
    // Chuyển trang hoặc cập nhật UI
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
  }
}
```

### Đăng ký thủ công

```tsx
import { registerUser } from "@/lib/firebase";

async function handleRegister() {
  try {
    const { user, userData } = await registerUser(
      email,
      password,
      displayName,
      "candidate", // hoặc 'employer'
      { phone: "0123456789", position: "Frontend Developer" }
    );
    console.log("Đăng ký thành công:", userData);
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
  }
}
```

## 🎯 Các trang đã hỗ trợ hiển thị user info

1. **Trang chủ** (`/`) - Header.tsx

   - Hiển thị tên user và nút Dashboard khi đã đăng nhập
   - Hiển thị nút Đăng nhập/Đăng ký khi chưa đăng nhập

2. **Dashboard Ứng viên** (`/candidate/dashboard`) - CandidateHeader.tsx

   - Hiển thị tên ứng viên
   - Hiển thị vị trí công việc
   - Menu dropdown với thông tin chi tiết

3. **Dashboard Nhà tuyển dụng** (`/employer/dashboard`) - EmployerHeader.tsx
   - Hiển thị tên công ty
   - Logo công ty (chữ cái đầu)
   - Menu dropdown với các tùy chọn

## 📱 Thử nghiệm

### Test Đăng ký Ứng viên

1. Vào `/register`
2. Chọn "Ứng viên IT"
3. Điền:
   - Họ tên: Nguyễn Văn A
   - Email: test@example.com
   - Mật khẩu: 123456
   - SĐT: 0123456789
   - Vị trí: Frontend Developer
   - Cấp độ: Junior
4. Đăng ký → Tự động vào `/candidate/dashboard`

### Test Đăng ký Nhà tuyển dụng

1. Vào `/register`
2. Chọn "Nhà tuyển dụng"
3. Điền:
   - Tên công ty: ABC Tech
   - Email: hr@abc.com
   - Mật khẩu: 123456
   - Đại diện: Trần Thị B
   - SĐT: 0987654321
   - Loại hình: Product Company
   - Quy mô: 51-200
4. Đăng ký → Tự động vào `/employer/dashboard`

## ⚠️ Lưu ý quan trọng

1. **Firebase Rules**: Cần cấu hình Firestore Security Rules phù hợp

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

2. **Email Verification**: Hiện tại chưa bắt buộc xác thực email. Có thể thêm sau nếu cần.

3. **Password Reset**: Chưa implement tính năng quên mật khẩu. Có thể thêm sau.

4. **Social Login**: Google/LinkedIn login đã có UI nhưng chưa implement logic. Cần thêm sau nếu cần.

## 🐛 Xử lý lỗi phổ biến

### Lỗi: "Email đã được sử dụng"

- Người dùng đã đăng ký với email này
- Sử dụng email khác hoặc đăng nhập

### Lỗi: "Mật khẩu quá yếu"

- Mật khẩu phải có ít nhất 6 ký tự
- Đề xuất: 8-20 ký tự, có chữ, số và ký tự đặc biệt

### Lỗi: "Không tìm thấy thông tin người dùng"

- Dữ liệu Firestore chưa được tạo
- Kiểm tra Firebase Console → Firestore Database

## 📚 Tài nguyên

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)

## 🎉 Hoàn thành!

Hệ thống xác thực đã sẵn sàng sử dụng. Người dùng có thể:

- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập vào hệ thống
- ✅ Xem thông tin cá nhân
- ✅ Đăng xuất an toàn
- ✅ Dữ liệu được lưu trữ bền vững trên Firebase

Chúc bạn phát triển dự án thành công! 🚀
