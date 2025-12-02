# 🚀 Quick Start - Firebase Authentication

## Bước 1: Cài đặt Dependencies (Đã xong)

```bash
npm install firebase
```

✅ Package `firebase` đã được cài đặt trong project.

## Bước 2: Cấu hình Firebase Rules

### 2.1. Firestore Security Rules

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Chọn project: **doanchuyennganh2-b57af**
3. Vào **Firestore Database** → **Rules**
4. Copy và paste rules sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false;
    }
  }
}
```

5. Click **"Publish"**

### 2.2. Authentication Email/Password (Đã bật)

✅ Bạn đã bật Email/Password authentication.

## Bước 3: Chạy ứng dụng

```bash
npm run dev
```

Truy cập: http://localhost:3000

## Bước 4: Test chức năng

### Test 1: Đăng ký Ứng viên

1. Vào http://localhost:3000/register
2. Chọn **"Ứng viên IT"**
3. Điền thông tin:
   ```
   Họ và tên: Nguyễn Văn An
   Email: candidate@test.com
   Mật khẩu: 123456
   Xác nhận mật khẩu: 123456
   Số điện thoại: 0123456789
   Vị trí mong muốn: Frontend Developer
   Cấp độ: Junior
   ```
4. Tick ✓ "Tôi đồng ý với Điều khoản..."
5. Click **"Đăng ký tài khoản ứng viên"**
6. ✅ Tự động chuyển đến `/candidate/dashboard`

### Test 2: Đăng ký Nhà tuyển dụng

1. Vào http://localhost:3000/register
2. Chọn **"Nhà tuyển dụng"**
3. Điền thông tin:
   ```
   Tên công ty: ABC Technology
   Email: employer@test.com
   Mật khẩu: 123456
   Xác nhận mật khẩu: 123456
   Đại diện tuyển dụng: Trần Thị B
   Số điện thoại: 0987654321
   Loại hình công ty: Product Company
   Quy mô công ty: 51-200 nhân viên
   ```
4. Tick ✓ "Tôi đồng ý với Điều khoản..."
5. Click **"Tạo tài khoản nhà tuyển dụng"**
6. ✅ Tự động chuyển đến `/employer/dashboard`

### Test 3: Đăng nhập

1. Vào http://localhost:3000/login
2. Nhập:
   ```
   Email: candidate@test.com (hoặc employer@test.com)
   Mật khẩu: 123456
   ```
3. Click **"Đăng nhập"**
4. ✅ Tự động chuyển đến dashboard tương ứng

### Test 4: Kiểm tra Header

1. Sau khi đăng nhập, vào trang chủ: http://localhost:3000
2. ✅ Header hiển thị:
   - Tên người dùng
   - Nút "Dashboard"
   - Nút "Đăng xuất"

### Test 5: Đăng xuất

1. Click **"Đăng xuất"** ở Header
2. ✅ Tự động về trang chủ
3. ✅ Header hiển thị lại "Đăng nhập" và "Đăng ký"

## Bước 5: Kiểm tra dữ liệu Firebase

### 5.1. Kiểm tra Authentication

1. Vào Firebase Console → **Authentication** → **Users**
2. ✅ Thấy danh sách users đã đăng ký
3. ✅ Có email và thời gian tạo

### 5.2. Kiểm tra Firestore

1. Vào Firebase Console → **Firestore Database** → **Data**
2. ✅ Thấy collection **"users"**
3. ✅ Click vào document → Xem thông tin chi tiết:
   ```
   uid: "..."
   email: "candidate@test.com"
   displayName: "Nguyễn Văn An"
   role: "candidate"
   phone: "0123456789"
   position: "Frontend Developer"
   level: "junior"
   createdAt: Timestamp
   updatedAt: Timestamp
   ```

## 🎯 Checklist hoàn thành

- [x] Firebase SDK đã được cài đặt
- [x] Firebase config đã được setup
- [x] Authentication Email/Password đã được bật
- [x] Firestore Database đã được tạo
- [x] Firestore Rules đã được cấu hình
- [x] Component Login/Register đã tích hợp Firebase
- [x] Auth Context đã được tạo
- [x] Headers đã hiển thị thông tin user
- [x] Đăng ký/Đăng nhập/Đăng xuất hoạt động

## 📊 Tính năng đã hoàn thành

✅ **Đăng ký**

- Phân biệt Ứng viên / Nhà tuyển dụng
- Validation form (email, mật khẩu, xác nhận mật khẩu)
- Hiển thị độ mạnh mật khẩu
- Lưu thông tin vào Firestore
- Tự động đăng nhập sau khi đăng ký

✅ **Đăng nhập**

- Xác thực email/password
- Tự động phân biệt role và chuyển trang
- Lưu session (persistent login)
- Xử lý lỗi và hiển thị thông báo

✅ **Hiển thị thông tin user**

- Header trang chủ: Tên user, nút Dashboard, Đăng xuất
- CandidateHeader: Tên, vị trí, avatar, menu dropdown
- EmployerHeader: Tên công ty, logo, menu dropdown

✅ **Đăng xuất**

- Clear session
- Redirect về trang chủ
- Reset UI về trạng thái guest

✅ **Quản lý state**

- Auth Context toàn cục
- Tự động lắng nghe auth state
- Loading state khi fetch data
- Persistent login (tự động đăng nhập lại)

## 🔄 Flow hoạt động

```
┌─────────────────────────────────────────────────────┐
│  1. User vào trang Register/Login                   │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  2. Nhập thông tin → Submit form                    │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  3. Call registerUser() hoặc loginUser()            │
│     → Firebase Authentication                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  4. Lưu/Lấy user data từ Firestore                  │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  5. Update Auth Context với user data               │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  6. Redirect đến Dashboard tương ứng                │
│     - Candidate → /candidate/dashboard              │
│     - Employer → /employer/dashboard                │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  7. Headers tự động hiển thị user info              │
└─────────────────────────────────────────────────────┘
```

## 🐛 Xử lý lỗi thường gặp

### Lỗi 1: "Email already in use"

**Nguyên nhân:** Email đã được đăng ký
**Giải pháp:**

- Sử dụng email khác
- Hoặc đăng nhập với email đó
- Hoặc xóa user trong Firebase Console → Authentication

### Lỗi 2: "Weak password"

**Nguyên nhân:** Mật khẩu < 6 ký tự
**Giải pháp:** Sử dụng mật khẩu ít nhất 6 ký tự

### Lỗi 3: "Missing or insufficient permissions"

**Nguyên nhân:** Firestore Rules chưa được cấu hình
**Giải pháp:** Apply rules như Bước 2.1

### Lỗi 4: "Network error"

**Nguyên nhân:** Không kết nối được Firebase
**Giải pháp:**

- Kiểm tra internet
- Verify Firebase config trong `lib/firebase.ts`
- Kiểm tra API key còn valid

## 📖 Tài liệu chi tiết

- **Hướng dẫn đầy đủ:** `FIREBASE_AUTHENTICATION_GUIDE.md`
- **Cấu hình Rules:** `FIREBASE_RULES_SETUP.md`

## 💡 Tips

1. **Development Mode:**

   - Sử dụng Chrome DevTools → Application → IndexedDB
   - Xem Firebase cache và session data

2. **Testing:**

   - Tạo nhiều accounts với vai trò khác nhau
   - Test chuyển trang giữa candidate/employer
   - Test persistent login (reload page)

3. **Production:**
   - Thêm email verification
   - Implement forgot password
   - Add rate limiting
   - Setup monitoring

## ✨ Next Steps (Tùy chọn)

1. **Email Verification**

   - Gửi email xác thực khi đăng ký
   - Bắt buộc verify trước khi login

2. **Password Reset**

   - Implement "Quên mật khẩu"
   - Gửi email reset password

3. **Social Login**

   - Google OAuth
   - LinkedIn OAuth

4. **Profile Management**

   - Upload avatar
   - Update profile
   - Change password

5. **Security**
   - 2FA (Two-Factor Authentication)
   - Login history
   - Session management

## 🎉 Chúc mừng!

Bạn đã hoàn thành tích hợp Firebase Authentication!

Hệ thống đăng nhập/đăng ký đã sẵn sàng sử dụng với đầy đủ tính năng:

- ✅ Đăng ký an toàn
- ✅ Đăng nhập bảo mật
- ✅ Lưu trữ dữ liệu
- ✅ Hiển thị thông tin
- ✅ Quản lý session

Happy coding! 🚀
