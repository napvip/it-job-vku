# Hướng dẫn Cập nhật ProfilePage với Chức năng Dynamic

## Files đã tạo:

### 1. `/lib/profileService.ts` ✅

Chứa tất cả functions CRUD cho:

- Personal Info
- Experiences
- Education
- Skills
- Certificates
- Projects

### 2. `/app/api/upload/route.ts` ✅

API endpoint để upload ảnh lên Cloudinary

### 3. `/app/components/candidate/profile/CommonComponents.tsx` ✅

Components dùng chung: ProfileSummaryCard, TabNavigation, ProfileCompletionSidebar

## Còn cần làm:

### Bước 1: Tạo Dialogs/Forms Components

Tạo file `/app/components/candidate/profile/FormDialogs.tsx` với các components:

- PersonalInfoForm
- ExperienceDialog
- EducationDialog
- CertificateDialog
- ProjectDialog

### Bước 2: Tạo Tab Components

Tạo file `/app/components/candidate/profile/TabComponents.tsx` với:

- PersonalInfoTab
- ExperienceTab
- EducationTab
- SkillsTab
- CertificatesProjectsTab
- CVOnlineTab
- CVUploadTab
- CVAnalysisTab

### Bước 3: Cập nhật ProfilePage.tsx chính

Thay thế nội dung của `/app/components/candidate/ProfilePage.tsx` bằng code từ `/app/components/candidate/ProfilePageNew.tsx`

## Cách sử dụng nhanh:

Nếu bạn muốn test nhanh, có thể:

1. Import các service vào ProfilePage hiện tại:

```tsx
import { useAuth } from "@/app/contexts/AuthContext";
import { getPersonalInfo, getExperiences, ... } from "@/lib/profileService";
```

2. Thêm useEffect để load data:

```tsx
useEffect(() => {
  if (user) {
    loadAllData();
  }
}, [user]);
```

3. Thêm handlers cho CRUD operations

## Cloud name Cloudinary

**QUAN TRỌNG**: Bạn cần cập nhật `cloud_name` trong file `/app/api/upload/route.ts`:

```typescript
cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME_HERE", // <-- Cập nhật tên cloud của bạn
  api_key: "343377866957869",
  api_secret: "P3Wo-7i5m3edJTpt-S5QuR0bByI",
});
```

Để lấy cloud_name, truy cập: https://cloudinary.com/console

## Firestore Security Rules

Nhớ cập nhật Firestore rules để cho phép user read/write data của họ:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /personalInfo/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /experiences/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    match /education/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    match /skills/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    match /certificates/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    match /projects/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
  }
}
```
