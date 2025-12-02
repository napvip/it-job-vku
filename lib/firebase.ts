// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7Vo0Cdt5m11i46oXEQVtiQPq40yXVbDk",
  authDomain: "doanchuyennganh2-b57af.firebaseapp.com",
  projectId: "doanchuyennganh2-b57af",
  storageBucket: "doanchuyennganh2-b57af.firebasestorage.app",
  messagingSenderId: "377274213198",
  appId: "1:377274213198:web:35d7f5ec4971632f2d741f",
  measurementId: "G-P04B3KRRHW"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// User data interface
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'candidate' | 'employer';
  phone?: string;
  position?: string;
  level?: string;
  companyName?: string;
  companyType?: string;
  companySize?: string;
  representative?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Register new user
export const registerUser = async (
  email: string,
  password: string,
  displayName: string,
  role: 'candidate' | 'employer',
  additionalData?: Record<string, string | number | boolean>
): Promise<{ user: User; userData: UserData }> => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...additionalData
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    return { user, userData };
  } catch (error: unknown) {
    console.error('Error registering user:', error);
    const errorCode = (error as { code?: string })?.code || '';
    throw new Error(getErrorMessage(errorCode));
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<{ user: User; userData: UserData }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Không tìm thấy thông tin người dùng');
    }

    const userData = userDoc.data() as UserData;

    return { user, userData };
  } catch (error: unknown) {
    console.error('Error logging in:', error);
    const errorCode = (error as { code?: string })?.code || '';
    throw new Error(getErrorMessage(errorCode));
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    console.error('Error logging out:', error);
    throw new Error('Đăng xuất thất bại');
  }
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as UserData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Update user data in Firestore
export const updateUserData = async (uid: string, data: Partial<UserData>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    throw new Error('Cập nhật thông tin thất bại');
  }
};

// Error message mapping
const getErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng';
    case 'auth/invalid-email':
      return 'Email không hợp lệ';
    case 'auth/operation-not-allowed':
      return 'Tài khoản chưa được kích hoạt';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu (tối thiểu 6 ký tự)';
    case 'auth/user-disabled':
      return 'Tài khoản đã bị vô hiệu hóa';
    case 'auth/user-not-found':
      return 'Email không tồn tại';
    case 'auth/wrong-password':
      return 'Mật khẩu không chính xác';
    case 'auth/too-many-requests':
      return 'Quá nhiều lần thử. Vui lòng thử lại sau';
    default:
      return 'Đã có lỗi xảy ra. Vui lòng thử lại';
  }
};

export { auth, db, analytics };
