# Cấu hình Firebase Security Rules

## Firestore Database Rules

Truy cập Firebase Console → Firestore Database → Rules và áp dụng rules sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rules cho collection users
    match /users/{userId} {
      // Cho phép đọc nếu đã đăng nhập
      allow read: if request.auth != null;

      // Cho phép tạo user mới khi đăng ký
      allow create: if request.auth != null
                    && request.auth.uid == userId
                    && request.resource.data.uid == userId
                    && request.resource.data.email == request.auth.token.email;

      // Cho phép user cập nhật thông tin của chính mình
      allow update: if request.auth != null
                    && request.auth.uid == userId
                    && request.resource.data.uid == userId;

      // Không cho phép xóa user
      allow delete: if false;
    }
  }
}
```

## Firebase Authentication Settings

### 1. Bật Email/Password Authentication

1. Vào Firebase Console
2. Chọn Authentication → Sign-in method
3. Tìm "Email/Password" và click "Enable"
4. Bật "Email/Password" (required)
5. Bật "Email link (passwordless sign-in)" (optional)
6. Save

### 2. Cấu hình Domain được phép (Authorized Domains)

1. Vào Authentication → Settings → Authorized domains
2. Thêm domain của bạn:
   - `localhost` (đã có sẵn cho development)
   - Domain production của bạn (ví dụ: `yourapp.com`)

### 3. Email Templates (Optional)

Tùy chỉnh email templates tại Authentication → Templates:

- **Password reset**: Email khôi phục mật khẩu
- **Email address verification**: Email xác thực tài khoản
- **Email address change**: Email thông báo thay đổi email

### 4. Cấu hình bảo mật nâng cao

#### Settings → User actions

- **Account enumeration protection**: Bật để bảo vệ khỏi tấn công dò tìm email
- **Email enumeration protection**: Bật để ẩn thông tin về email đã tồn tại

#### Settings → Password policy (optional)

```
Độ dài tối thiểu: 8 ký tự
Yêu cầu: Chữ thường, chữ hoa, số, ký tự đặc biệt
```

## Firestore Database Indexes

Nếu cần query phức tạp, tạo indexes:

```javascript
// Index ví dụ cho việc tìm kiếm users theo role và email
Collection: users
Fields: role (Ascending), email (Ascending)
Query scope: Collection
```

### Tạo Index tự động

Khi chạy query và gặp lỗi thiếu index, Firebase sẽ cung cấp link để tự động tạo index.

## Storage Rules (Nếu dùng Firebase Storage cho CV/Avatar)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User avatars
    match /avatars/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // Max 5MB
                   && request.resource.contentType.matches('image/.*');
    }

    // CVs
    match /cvs/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024 // Max 10MB
                   && request.resource.contentType.matches('(application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document)');
    }
  }
}
```

## Kiểm tra Rules

### Test trong Firebase Console

1. Vào Firestore Database → Rules
2. Click tab "Rules Playground"
3. Test các scenarios:
   ```
   Operation: get
   Location: /users/someUserId
   Authenticated: Yes
   ```

### Test trong code

```typescript
// Test đọc user data
const testReadUser = async (userId: string) => {
  try {
    const userData = await getUserData(userId);
    console.log("✅ Read success:", userData);
  } catch (error) {
    console.error("❌ Read failed:", error);
  }
};

// Test cập nhật user data
const testUpdateUser = async (userId: string) => {
  try {
    await updateUserData(userId, { displayName: "New Name" });
    console.log("✅ Update success");
  } catch (error) {
    console.error("❌ Update failed:", error);
  }
};
```

## Monitoring & Logs

### 1. Authentication Logs

- Firebase Console → Authentication → Users
- Xem danh sách users đã đăng ký
- Theo dõi last sign-in time

### 2. Firestore Logs

- Firebase Console → Firestore Database → Data
- Xem trực tiếp dữ liệu trong database
- Monitor read/write operations

### 3. Usage & Billing

- Firebase Console → Usage and billing
- Theo dõi:
  - Authentication users count
  - Firestore reads/writes
  - Storage usage

## Giới hạn Free Tier

### Spark Plan (Free)

- **Authentication**: 50,000 MAU (Monthly Active Users)
- **Firestore**:
  - 50,000 reads/day
  - 20,000 writes/day
  - 20,000 deletes/day
  - 1 GiB storage
- **Storage**: 5 GB
- **Bandwidth**: 1 GB/day

Nâng cấp lên Blaze Plan khi cần:

- Pay as you go
- Không giới hạn

## Backup & Recovery

### Tự động Backup (Blaze Plan only)

```bash
# Export Firestore data
gcloud firestore export gs://[BUCKET_NAME]

# Import Firestore data
gcloud firestore import gs://[BUCKET_NAME]/[EXPORT_FOLDER]
```

### Manual Backup

1. Firebase Console → Firestore Database
2. Export data manually
3. Lưu trữ local hoặc cloud storage khác

## Troubleshooting

### Lỗi: "Missing or insufficient permissions"

- Kiểm tra Firestore Rules
- Đảm bảo user đã authenticated
- Verify userId match với request.auth.uid

### Lỗi: "QUOTA_EXCEEDED"

- Đã vượt quá giới hạn free tier
- Upgrade lên Blaze Plan
- Hoặc đợi reset vào ngày mới

### Lỗi: "Network error"

- Kiểm tra Firebase configuration
- Verify API key và project ID
- Kiểm tra internet connection

## Best Practices

1. **Không lưu sensitive data trong Firestore**

   - Mật khẩu → Firebase Auth tự động hash
   - Thông tin nhạy cảm → Encrypt trước khi lưu

2. **Sử dụng Security Rules đúng cách**

   - Luôn validate input
   - Giới hạn quyền truy cập
   - Test kỹ lưỡng

3. **Optimize queries**

   - Sử dụng indexes
   - Giới hạn số lượng documents
   - Cache khi có thể

4. **Monitor usage**
   - Theo dõi thường xuyên
   - Set up alerts
   - Plan upgrade khi cần

## Tài nguyên bổ sung

- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Authentication Best Practices](https://firebase.google.com/docs/auth/web/best-practices)
- [Firebase Pricing Calculator](https://firebase.google.com/pricing)
