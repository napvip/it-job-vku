# Hướng Dẫn Sử Dụng Profile Page Dynamic

## Tổng Quan

ProfilePage.tsx đã được cập nhật từ giao diện tĩnh thành hệ thống quản lý hồ sơ đầy đủ với chức năng CRUD (Create, Read, Update, Delete) kết nối Firebase Firestore.

## Các Tính Năng Đã Hoàn Thành

### 1. Avatar Upload ✅

- **Vị trí**: Profile Summary Card (phía trên cùng)
- **Chức năng**:
  - Click vào icon Camera để tải ảnh lên
  - Ảnh được upload lên Cloudinary tự động
  - URL ảnh được lưu vào Firebase Firestore
  - Hiển thị spinner khi đang upload

### 2. Thông Tin Cá Nhân (Personal Info) ✅

- **Chế độ xem**: Hiển thị thông tin đã lưu
- **Chế độ chỉnh sửa**: Click nút "Chỉnh sửa hồ sơ"
- **Các trường**:
  - Họ và tên (bắt buộc)
  - Email (bắt buộc)
  - Số điện thoại
  - Vị trí mong muốn
  - Địa điểm làm việc
  - Mức lương kỳ vọng
  - Mô tả bản thân
- **Lưu**: Click "Lưu thay đổi" để cập nhật Firebase

### 3. Kinh Nghiệm Làm Việc (Experience) ✅

- **Thêm mới**: Click "Thêm kinh nghiệm"
  - Vị trí (bắt buộc)
  - Công ty (bắt buộc)
  - Ngày bắt đầu (bắt buộc)
  - Ngày kết thúc (hoặc check "Đang làm việc tại đây")
  - Mô tả công việc (bắt buộc)
- **Xóa**: Click icon thùng rác trên từng mục
- **Hiển thị**: Badge "Hiện tại" cho công việc đang làm

### 4. Học Vấn (Education) ✅

- **Thêm mới**: Click "Thêm học vấn"
  - Trường học (bắt buộc)
  - Bằng cấp (bắt buộc)
  - Chuyên ngành (bắt buộc)
  - GPA (tùy chọn)
  - Ngày bắt đầu (bắt buộc)
  - Ngày kết thúc (bắt buộc)
- **Xóa**: Click icon thùng rác trên từng mục
- **Hiển thị**: Thông tin trường, bằng cấp, GPA

### 5. Kỹ Năng (Skills) ✅

- **Thêm mới**:
  - Nhập tên kỹ năng và nhấn Enter hoặc click "Thêm"
  - Click vào kỹ năng gợi ý từ AI để thêm nhanh
- **Xóa**: Click icon X trên từng kỹ năng
- **Hiển thị**: Danh sách kỹ năng dạng tags

## Cấu Trúc Dữ Liệu Firebase

### Collections:

```
/personalInfo/{userId} - Thông tin cá nhân
/experiences/{experienceId} - Kinh nghiệm (có uid field)
/educations/{educationId} - Học vấn (có uid field)
/skills/{skillId} - Kỹ năng (có uid field)
/certificates/{certificateId} - Chứng chỉ (có uid field)
/projects/{projectId} - Dự án (có uid field)
```

## Cách Sử Dụng

### 1. Đăng Nhập

- Đảm bảo đã đăng nhập vào hệ thống (useAuth hook)
- ProfilePage sẽ tự động load dữ liệu của user hiện tại

### 2. Upload Avatar

```tsx
1. Click vào icon Camera ở góc avatar
2. Chọn ảnh từ máy tính
3. Đợi upload (hiển thị spinner)
4. Ảnh mới sẽ hiển thị tự động
```

### 3. Cập Nhật Thông Tin Cá Nhân

```tsx
1. Click nút "Chỉnh sửa hồ sơ"
2. Form edit sẽ hiển thị với dữ liệu hiện tại
3. Chỉnh sửa các trường cần thiết
4. Click "Lưu thay đổi" hoặc "Hủy"
5. Dữ liệu được lưu vào Firebase và UI cập nhật
```

### 4. Thêm Kinh Nghiệm/Học Vấn

```tsx
1. Chuyển sang tab tương ứng
2. Click nút "Thêm kinh nghiệm" hoặc "Thêm học vấn"
3. Form thêm mới sẽ hiển thị
4. Điền đầy đủ thông tin (trường có dấu * là bắt buộc)
5. Click "Lưu" để lưu hoặc "Hủy" để đóng form
6. Item mới sẽ xuất hiện trong danh sách
```

### 5. Xóa Item

```tsx
1. Click icon thùng rác (Trash2) trên item muốn xóa
2. Xác nhận trong dialog
3. Item sẽ bị xóa khỏi Firebase và UI
```

### 6. Quản Lý Kỹ Năng

```tsx
// Thêm kỹ năng tự nhập
1. Nhập tên kỹ năng vào ô input
2. Nhấn Enter hoặc click nút "Thêm"

// Thêm kỹ năng gợi ý
1. Click vào bất kỳ kỹ năng nào trong danh sách gợi ý từ AI
2. Kỹ năng sẽ được thêm tự động nếu chưa tồn tại

// Xóa kỹ năng
1. Click icon X trên kỹ năng cần xóa
```

## Trạng Thái Loading

- **Page load**: Hiển thị "Đang tải..." khi load dữ liệu ban đầu
- **Avatar upload**: Hiển thị spinner trên nút upload
- **Form submit**: Form tự động reload data sau khi lưu thành công

## Profile Completion

Thanh tiến độ hoàn thành hồ sơ được tính dựa trên:

- ✅ Thông tin cá nhân: Có fullName
- ✅ Kinh nghiệm: Có ít nhất 1 experience
- ✅ Học vấn: Có ít nhất 1 education
- ✅ Kỹ năng: Có ít nhất 1 skill
- ✅ Chứng chỉ: Có ít nhất 1 certificate
- ❌ CV Upload: Chưa implement

## Các Handler Chính

```typescript
// Avatar
handleAvatarUpload(e) - Upload ảnh lên Cloudinary và update Firebase

// Personal Info
handleSavePersonal(e) - Lưu thông tin cá nhân

// Skills
handleAddSkill() - Thêm kỹ năng mới
handleRemoveSkill(id) - Xóa kỹ năng
handleAddSuggestedSkill(name) - Thêm kỹ năng từ gợi ý

// Experience
handleAddExperience(e) - Thêm kinh nghiệm mới
handleDeleteExperience(id) - Xóa kinh nghiệm

// Education
handleAddEducation(e) - Thêm học vấn mới
handleDeleteEducation(id) - Xóa học vấn

// Certificate (chưa UI)
handleAddCertificate(e)
handleUpdateCertificate(id, data)
handleDeleteCertificate(id)

// Project (chưa UI)
handleAddProject(e)
handleUpdateProject(id, data)
handleDeleteProject(id)
```

## Các Tab Chưa Hoàn Thành

### Certificates Tab

- Cần thêm UI tương tự Experience/Education
- Đã có handlers sẵn sàng
- Các trường: name, issuer, date

### Projects Tab (trong Certificates tab)

- Cần thêm UI tương tự Experience/Education
- Đã có handlers sẵn sàng
- Các trường: name, technologies[], githubUrl, demoUrl, description

### CV Online Tab

- Hiện đang hiển thị dữ liệu dynamic
- Có thể thêm template selector
- Export PDF functionality

### CV Upload Tab

- Chưa implement upload CV file
- Có thể dùng Cloudinary tương tự avatar

### CV Analysis (AI) Tab

- Chưa implement
- Có thể tích hợp Gemini AI để phân tích CV

## Environment Variables Required

```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=dle6cwujy
CLOUDINARY_API_KEY=343377866957869
CLOUDINARY_API_SECRET=P3Wo-7i5m3edJTpt-S5QuR0bByI
```

## Troubleshooting

### Lỗi "Đang tải..." không biến mất

- Kiểm tra Firebase connection
- Kiểm tra user đã login chưa
- Xem console log errors

### Upload avatar không hoạt động

- Kiểm tra .env.local có đủ Cloudinary credentials
- Kiểm tra API route /api/upload
- Kiểm tra network tab trong DevTools

### Dữ liệu không lưu

- Kiểm tra Firebase Firestore rules
- Kiểm tra user có uid không
- Xem console log errors
- Kiểm tra network requests

### Form không hiển thị

- Kiểm tra state của show form flags
- Kiểm tra handlers đã được wire đúng chưa

## Next Steps

1. **Hoàn thiện Certificates & Projects tabs** với UI CRUD
2. **CV Upload** functionality với Cloudinary
3. **CV Export PDF** từ CV Online tab
4. **AI Analysis** integration với Gemini
5. **Form validation** chi tiết hơn với react-hook-form hoặc zod
6. **Image optimization** cho avatar với Next.js Image
7. **Error handling** và toast notifications
8. **Loading states** cho từng operation
9. **Optimistic updates** cho UX tốt hơn
10. **Edit functionality** cho Experience/Education (hiện chỉ có Add/Delete)

## Demo Flow

1. Đăng nhập vào app
2. Navigate đến /candidate/profile
3. Upload avatar mới
4. Điền thông tin cá nhân
5. Thêm 2-3 kinh nghiệm làm việc
6. Thêm học vấn
7. Thêm 5-10 kỹ năng
8. Xem profile completion tăng lên
9. Chuyển sang CV Online tab để xem bản tóm tắt đẹp

## Kết Luận

ProfilePage.tsx hiện đã là một component hoàn chỉnh với khả năng quản lý hồ sơ ứng viên, tích hợp Firebase cho persistence, Cloudinary cho image hosting, và giữ nguyên giao diện đẹp mắt ban đầu. Các chức năng CRUD cơ bản đã hoàn thành, sẵn sàng để mở rộng thêm các tính năng nâng cao.
