// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, deleteDoc, orderBy, Timestamp } from "firebase/firestore";

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
  // Candidate fields
  skills?: string[];
  experience?: string;
  location?: string;
  bio?: string;
  education?: string;
  expectedSalary?: string;
  languages?: string[];
  certifications?: string[];
  cvUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  avatar?: string;
  // Employer additional fields
  industry?: string;
  website?: string;
  description?: string;
  address?: string;
  benefits?: string[];
  technologies?: string[];
  images?: string[];
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

// Job data interface
export interface JobData {
  id?: string;
  companyId: string;
  companyName?: string;
  title: string;
  level: string;
  workType: 'onsite' | 'hybrid' | 'remote';
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  hideSalary?: boolean;
  description: string;
  requirements: string;
  benefits: string;
  skills: string[];
  quantity: number;
  deadline: string;
  contractType: string;
  gender?: string;
  education: string;
  status: 'active' | 'paused' | 'closed' | 'draft';
  autoRefresh?: boolean;
  quickApply?: boolean;
  customCV?: boolean;
  applicants?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new job posting
export const createJob = async (jobData: Omit<JobData, 'id' | 'createdAt' | 'updatedAt' | 'applicants'>): Promise<string> => {
  try {
    const newJob = {
      ...jobData,
      applicants: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'jobs'), newJob);
    return docRef.id;
  } catch (error: unknown) {
    console.error('Error creating job:', error);
    throw new Error('Tạo tin tuyển dụng thất bại');
  }
};

// Get all jobs for a company
export const getCompanyJobs = async (companyId: string): Promise<JobData[]> => {
  try {
    const q = query(
      collection(db, 'jobs'),
      where('companyId', '==', companyId)
    );

    const querySnapshot = await getDocs(q);
    const jobs: JobData[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      jobs.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as JobData);
    });

    // Sort by createdAt descending on client side
    jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return jobs;
  } catch (error: unknown) {
    console.error('Error getting company jobs:', error);
    throw new Error('Lấy danh sách công việc thất bại');
  }
};

// Get a single job by ID
export const getJob = async (jobId: string): Promise<JobData | null> => {
  try {
    const jobDoc = await getDoc(doc(db, 'jobs', jobId));

    if (!jobDoc.exists()) {
      return null;
    }

    const data = jobDoc.data();
    return {
      id: jobDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as JobData;
  } catch (error) {
    console.error('Error getting job:', error);
    return null;
  }
};

// Update a job posting
export const updateJob = async (jobId: string, jobData: Partial<JobData>): Promise<void> => {
  try {
    const updateData = {
      ...jobData,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(doc(db, 'jobs', jobId), updateData);
  } catch (error: unknown) {
    console.error('Error updating job:', error);
    throw new Error('Cập nhật tin tuyển dụng thất bại');
  }
};

// Delete a job posting
export const deleteJob = async (jobId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'jobs', jobId));
  } catch (error: unknown) {
    console.error('Error deleting job:', error);
    throw new Error('Xóa tin tuyển dụng thất bại');
  }
};

// Get all active jobs (for job listing page)
export const getActiveJobs = async (): Promise<JobData[]> => {
  try {
    const q = query(
      collection(db, 'jobs'),
      where('status', '==', 'active')
    );

    const querySnapshot = await getDocs(q);
    const jobs: JobData[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      jobs.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as JobData);
    });

    // Sort by createdAt descending on client side
    jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return jobs;
  } catch (error: unknown) {
    console.error('Error getting active jobs:', error);
    throw new Error('Lấy danh sách công việc thất bại');
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

// ==================== SAVED JOBS FUNCTIONS ====================

export interface SavedJob {
  id?: string;
  userId: string;
  jobId: string;
  savedAt: Date;
}

// Save a job
export const saveJob = async (userId: string, jobId: string): Promise<void> => {
  try {
    const savedJobsRef = collection(db, 'savedJobs');
    const q = query(savedJobsRef, where('userId', '==', userId), where('jobId', '==', jobId));
    const existingDocs = await getDocs(q);
    
    if (!existingDocs.empty) {
      throw new Error('Công việc đã được lưu');
    }

    await addDoc(savedJobsRef, {
      userId,
      jobId,
      savedAt: Timestamp.now(),
    });
  } catch (error: unknown) {
    console.error('Error saving job:', error);
    if (error instanceof Error && error.message === 'Công việc đã được lưu') {
      throw error;
    }
    throw new Error('Lưu công việc thất bại');
  }
};

// Unsave a job
export const unsaveJob = async (userId: string, jobId: string): Promise<void> => {
  try {
    const savedJobsRef = collection(db, 'savedJobs');
    const q = query(savedJobsRef, where('userId', '==', userId), where('jobId', '==', jobId));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, 'savedJobs', docSnapshot.id));
    });
  } catch (error: unknown) {
    console.error('Error unsaving job:', error);
    throw new Error('Bỏ lưu công việc thất bại');
  }
};

// Check if job is saved
export const isJobSaved = async (userId: string, jobId: string): Promise<boolean> => {
  try {
    const savedJobsRef = collection(db, 'savedJobs');
    const q = query(savedJobsRef, where('userId', '==', userId), where('jobId', '==', jobId));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error: unknown) {
    console.error('Error checking saved job:', error);
    return false;
  }
};

// Get user's saved jobs
export const getSavedJobs = async (userId: string): Promise<JobData[]> => {
  try {
    const savedJobsRef = collection(db, 'savedJobs');
    const q = query(savedJobsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const jobIds: string[] = [];
    querySnapshot.forEach((doc) => {
      jobIds.push(doc.data().jobId);
    });

    if (jobIds.length === 0) {
      return [];
    }

    const jobs: JobData[] = [];
    for (const jobId of jobIds) {
      const job = await getJob(jobId);
      if (job) {
        jobs.push(job);
      }
    }

    return jobs;
  } catch (error: unknown) {
    console.error('Error getting saved jobs:', error);
    throw new Error('Lấy danh sách công việc đã lưu thất bại');
  }
};

// ==================== COMPANY INFO FUNCTIONS ====================

export interface CompanyInfo {
  id?: string;
  name: string;
  logo?: string;
  industry?: string;
  size?: string;
  location?: string;
  website?: string;
  description?: string;
  founded?: string;
  benefits?: string[];
  images?: string[];
}

// Get company info
export const getCompanyInfo = async (companyId: string): Promise<CompanyInfo | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', companyId));
    
    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    return {
      id: userDoc.id,
      name: userData.companyName || userData.displayName || 'Công ty',
      logo: userData.companyLogo,
      industry: userData.industry,
      size: userData.companySize,
      location: userData.location,
      website: userData.website,
      description: userData.companyDescription,
      founded: userData.founded,
      benefits: userData.benefits || [],
      images: userData.images || [],
    };
  } catch (error) {
    console.error('Error getting company info:', error);
    return null;
  }
};

// ==================== JOB APPLICATION FUNCTIONS ====================

export interface JobApplication {
  id?: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  cvUrl?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  appliedAt: Date;
}

// Apply for a job
export const applyForJob = async (applicationData: Omit<JobApplication, 'id' | 'appliedAt'>): Promise<string> => {
  try {
    // Check if already applied
    const applicationsRef = collection(db, 'applications');
    const q = query(
      applicationsRef,
      where('jobId', '==', applicationData.jobId),
      where('candidateId', '==', applicationData.candidateId)
    );
    const existingDocs = await getDocs(q);
    
    if (!existingDocs.empty) {
      throw new Error('Bạn đã ứng tuyển công việc này');
    }

    // Remove undefined values to prevent Firebase error
    const cleanedData: Record<string, unknown> = {
      jobId: applicationData.jobId,
      candidateId: applicationData.candidateId,
      candidateName: applicationData.candidateName,
      candidateEmail: applicationData.candidateEmail,
      status: 'pending' as const,
      appliedAt: Timestamp.now(),
    };

    // Only add optional fields if they have values
    if (applicationData.candidatePhone) {
      cleanedData.candidatePhone = applicationData.candidatePhone;
    }
    if (applicationData.cvUrl) {
      cleanedData.cvUrl = applicationData.cvUrl;
    }
    if (applicationData.coverLetter) {
      cleanedData.coverLetter = applicationData.coverLetter;
    }

    const docRef = await addDoc(collection(db, 'applications'), cleanedData);
    
    // Update job applicants count
    const jobRef = doc(db, 'jobs', applicationData.jobId);
    const jobDoc = await getDoc(jobRef);
    if (jobDoc.exists()) {
      const currentApplicants = jobDoc.data().applicants || 0;
      await updateDoc(jobRef, {
        applicants: currentApplicants + 1,
      });
    }

    return docRef.id;
  } catch (error: unknown) {
    console.error('Error applying for job:', error);
    if (error instanceof Error && error.message === 'Bạn đã ứng tuyển công việc này') {
      throw error;
    }
    throw new Error('Ứng tuyển thất bại');
  }
};

// Check if user has applied for a job
export const hasAppliedForJob = async (candidateId: string, jobId: string): Promise<boolean> => {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(
      applicationsRef,
      where('jobId', '==', jobId),
      where('candidateId', '==', candidateId)
    );
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error: unknown) {
    console.error('Error checking application:', error);
    return false;
  }
};

// Get all applications for a specific job
export const getJobApplications = async (jobId: string): Promise<(JobApplication & { candidateInfo?: UserData })[]> => {
  try {
    const applicationsRef = collection(db, 'applications');
    // Query without orderBy to avoid needing composite index
    const q = query(
      applicationsRef,
      where('jobId', '==', jobId)
    );
    const querySnapshot = await getDocs(q);
    
    const applications: (JobApplication & { candidateInfo?: UserData })[] = [];
    
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      const application: JobApplication = {
        id: docSnap.id,
        jobId: data.jobId,
        candidateId: data.candidateId,
        candidateName: data.candidateName,
        candidateEmail: data.candidateEmail,
        candidatePhone: data.candidatePhone,
        cvUrl: data.cvUrl,
        coverLetter: data.coverLetter,
        status: data.status,
        appliedAt: data.appliedAt?.toDate ? data.appliedAt.toDate() : new Date(data.appliedAt),
      };
      
      // Get candidate info
      const candidateDoc = await getDoc(doc(db, 'users', data.candidateId));
      if (candidateDoc.exists()) {
        applications.push({
          ...application,
          candidateInfo: candidateDoc.data() as UserData,
        });
      } else {
        applications.push(application);
      }
    }
    
    // Sort by appliedAt descending (newest first) on client side
    applications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    
    return applications;
  } catch (error: unknown) {
    console.error('Error getting job applications:', error);
    return [];
  }
};

// Update application status
export const updateApplicationStatus = async (
  applicationId: string, 
  status: JobApplication['status']
): Promise<void> => {
  try {
    const applicationRef = doc(db, 'applications', applicationId);
    await updateDoc(applicationRef, { 
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error: unknown) {
    console.error('Error updating application status:', error);
    throw new Error('Cập nhật trạng thái thất bại');
  }
};

// Get all applications for employer (all jobs)
export const getEmployerApplications = async (employerId: string): Promise<(JobApplication & { jobInfo?: JobData; candidateInfo?: UserData })[]> => {
  try {
    // First get all jobs of this employer
    const jobsRef = collection(db, 'jobs');
    const jobsQuery = query(jobsRef, where('companyId', '==', employerId));
    const jobsSnapshot = await getDocs(jobsQuery);
    
    const jobIds = jobsSnapshot.docs.map(doc => doc.id);
    const jobsMap = new Map<string, JobData>();
    jobsSnapshot.docs.forEach(doc => {
      jobsMap.set(doc.id, { id: doc.id, ...doc.data() } as JobData);
    });
    
    if (jobIds.length === 0) return [];
    
    // Get applications for these jobs
    const applications: (JobApplication & { jobInfo?: JobData; candidateInfo?: UserData })[] = [];
    
    for (const jobId of jobIds) {
      const applicationsRef = collection(db, 'applications');
      // Query without orderBy to avoid needing composite index
      const q = query(
        applicationsRef,
        where('jobId', '==', jobId)
      );
      const querySnapshot = await getDocs(q);
      
      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const application: JobApplication = {
          id: docSnap.id,
          jobId: data.jobId,
          candidateId: data.candidateId,
          candidateName: data.candidateName,
          candidateEmail: data.candidateEmail,
          candidatePhone: data.candidatePhone,
          cvUrl: data.cvUrl,
          coverLetter: data.coverLetter,
          status: data.status,
          appliedAt: data.appliedAt?.toDate ? data.appliedAt.toDate() : new Date(data.appliedAt),
        };
        
        // Get candidate info
        const candidateDoc = await getDoc(doc(db, 'users', data.candidateId));
        applications.push({
          ...application,
          jobInfo: jobsMap.get(data.jobId),
          candidateInfo: candidateDoc.exists() ? candidateDoc.data() as UserData : undefined,
        });
      }
    }
    
    // Sort by appliedAt
    applications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    
    return applications;
  } catch (error: unknown) {
    console.error('Error getting employer applications:', error);
    return [];
  }
};

// Get all applications for a candidate
export const getCandidateApplications = async (candidateId: string): Promise<(JobApplication & { jobInfo?: JobData })[]> => {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(
      applicationsRef,
      where('candidateId', '==', candidateId)
    );
    const querySnapshot = await getDocs(q);
    
    const applications: (JobApplication & { jobInfo?: JobData })[] = [];
    
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      const application: JobApplication = {
        id: docSnap.id,
        jobId: data.jobId,
        candidateId: data.candidateId,
        candidateName: data.candidateName,
        candidateEmail: data.candidateEmail,
        candidatePhone: data.candidatePhone,
        cvUrl: data.cvUrl,
        coverLetter: data.coverLetter,
        status: data.status,
        appliedAt: data.appliedAt?.toDate ? data.appliedAt.toDate() : new Date(data.appliedAt),
      };
      
      // Get job info
      const jobDoc = await getDoc(doc(db, 'jobs', data.jobId));
      applications.push({
        ...application,
        jobInfo: jobDoc.exists() ? { id: jobDoc.id, ...jobDoc.data() } as JobData : undefined,
      });
    }
    
    // Sort by appliedAt
    applications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    
    return applications;
  } catch (error: unknown) {
    console.error('Error getting candidate applications:', error);
    return [];
  }
};

// ==================== MESSAGING FUNCTIONS ====================

export interface MessageData {
  id?: string;
  conversationId: string;
  senderId: string;
  senderType: 'candidate' | 'employer';
  content: string;
  timestamp: Date;
  read: boolean;
  fileAttachment?: {
    name: string;
    type: string;
    url: string;
  };
}

export interface ConversationData {
  id?: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  employerId: string;
  companyName: string;
  jobId?: string; // Optional - conversation can be about multiple jobs
  jobTitle?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCountCandidate: number; // Unread messages for candidate
  unreadCountEmployer: number; // Unread messages for employer
  createdAt: Date;
  updatedAt: Date;
}

// Get or create conversation between candidate and employer
export const getOrCreateConversation = async (
  candidateId: string,
  employerId: string,
  jobId?: string
): Promise<string> => {
  try {
    // Check if conversation exists between candidate and employer (not per job)
    const conversationsRef = collection(db, 'conversations');
    const q = query(
      conversationsRef,
      where('candidateId', '==', candidateId),
      where('employerId', '==', employerId)
    );
    const existingDocs = await getDocs(q);
    
    if (!existingDocs.empty) {
      // Return existing conversation
      return existingDocs.docs[0].id;
    }

    // Get user info
    const [candidateDoc, employerDoc] = await Promise.all([
      getDoc(doc(db, 'users', candidateId)),
      getDoc(doc(db, 'users', employerId))
    ]);

    let jobTitle = '';
    if (jobId) {
      const jobDoc = await getDoc(doc(db, 'jobs', jobId));
      if (jobDoc.exists()) {
        jobTitle = jobDoc.data().title;
      }
    }

    // Create new conversation
    const newConversation: Omit<ConversationData, 'id'> = {
      candidateId,
      candidateName: candidateDoc.data()?.displayName || 'Ứng viên',
      candidateEmail: candidateDoc.data()?.email || '',
      employerId,
      companyName: employerDoc.data()?.companyName || employerDoc.data()?.displayName || 'Công ty',
      jobId: jobId || '',
      jobTitle,
      lastMessage: '',
      lastMessageTime: Timestamp.now() as unknown as Date,
      unreadCountCandidate: 0,
      unreadCountEmployer: 0,
      createdAt: Timestamp.now() as unknown as Date,
      updatedAt: Timestamp.now() as unknown as Date,
    };

    const docRef = await addDoc(conversationsRef, newConversation);
    return docRef.id;
  } catch (error) {
    console.error('Error getting/creating conversation:', error);
    throw new Error('Không thể tạo cuộc trò chuyện');
  }
};

// Send message
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  senderType: 'candidate' | 'employer',
  content: string,
  fileAttachment?: { name: string; type: string; url: string }
): Promise<string> => {
  try {
    const messagesRef = collection(db, 'messages');
    const newMessage: Record<string, unknown> = {
      conversationId,
      senderId,
      senderType,
      content,
      timestamp: Timestamp.now(),
      read: false,
    };

    // Only add fileAttachment if it exists
    if (fileAttachment) {
      newMessage.fileAttachment = fileAttachment;
    }

    const docRef = await addDoc(messagesRef, newMessage);

    // Update conversation
    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationDoc = await getDoc(conversationRef);
    
    if (conversationDoc.exists()) {
      const updateData: Record<string, unknown> = {
        lastMessage: content,
        lastMessageTime: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      // Increment unread count for the receiver
      if (senderType === 'candidate') {
        updateData.unreadCountEmployer = (conversationDoc.data().unreadCountEmployer || 0) + 1;
      } else {
        updateData.unreadCountCandidate = (conversationDoc.data().unreadCountCandidate || 0) + 1;
      }

      await updateDoc(conversationRef, updateData);
    }

    return docRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Gửi tin nhắn thất bại');
  }
};

// Get messages for a conversation
export const getMessages = async (conversationId: string): Promise<MessageData[]> => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('conversationId', '==', conversationId)
    );
    const querySnapshot = await getDocs(q);

    const messages = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        conversationId: data.conversationId,
        senderId: data.senderId,
        senderType: data.senderType,
        content: data.content,
        timestamp: data.timestamp?.toDate() || new Date(),
        read: data.read || false,
        fileAttachment: data.fileAttachment,
      };
    });

    // Sort by timestamp ascending (oldest first)
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

// Get conversations for user
export const getConversations = async (
  userId: string,
  userType: 'candidate' | 'employer'
): Promise<ConversationData[]> => {
  try {
    const conversationsRef = collection(db, 'conversations');
    const fieldName = userType === 'candidate' ? 'candidateId' : 'employerId';
    
    // Query without orderBy to avoid index requirement
    const q = query(
      conversationsRef,
      where(fieldName, '==', userId)
    );
    const querySnapshot = await getDocs(q);

    // Map and sort manually by updatedAt
    const conversations = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        candidateId: data.candidateId,
        candidateName: data.candidateName,
        candidateEmail: data.candidateEmail,
        employerId: data.employerId,
        companyName: data.companyName,
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        lastMessage: data.lastMessage,
        lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
        unreadCountCandidate: data.unreadCountCandidate || 0,
        unreadCountEmployer: data.unreadCountEmployer || 0,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });

    // Sort by updatedAt descending
    return conversations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  } catch (error) {
    console.error('Error getting conversations:', error);
    return [];
  }
};

// Mark messages as read
export const markMessagesAsRead = async (
  conversationId: string,
  userType: 'candidate' | 'employer'
): Promise<void> => {
  try {
    // Update conversation unread count
    const conversationRef = doc(db, 'conversations', conversationId);
    const updateData: Record<string, unknown> = {
      updatedAt: Timestamp.now(),
    };

    if (userType === 'candidate') {
      updateData.unreadCountCandidate = 0;
    } else {
      updateData.unreadCountEmployer = 0;
    }

    await updateDoc(conversationRef, updateData);

    // Mark all unread messages as read
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('conversationId', '==', conversationId),
      where('senderType', '==', userType === 'candidate' ? 'employer' : 'candidate'),
      where('read', '==', false)
    );
    const querySnapshot = await getDocs(q);

    const updatePromises = querySnapshot.docs.map(messageDoc =>
      updateDoc(doc(db, 'messages', messageDoc.id), { read: true })
    );

    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};

// Get conversation by ID
export const getConversation = async (conversationId: string): Promise<ConversationData | null> => {
  try {
    const conversationDoc = await getDoc(doc(db, 'conversations', conversationId));
    
    if (!conversationDoc.exists()) {
      return null;
    }

    const data = conversationDoc.data();
    return {
      id: conversationDoc.id,
      candidateId: data.candidateId,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      employerId: data.employerId,
      companyName: data.companyName,
      jobId: data.jobId,
      jobTitle: data.jobTitle,
      lastMessage: data.lastMessage,
      lastMessageTime: data.lastMessageTime?.toDate() || new Date(),
      unreadCountCandidate: data.unreadCountCandidate || 0,
      unreadCountEmployer: data.unreadCountEmployer || 0,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error('Error getting conversation:', error);
    return null;
  }
};

// Delete conversation and all its messages
export const deleteConversation = async (conversationId: string): Promise<void> => {
  try {
    // Delete all messages in the conversation
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('conversationId', '==', conversationId));
    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map(messageDoc =>
      deleteDoc(doc(db, 'messages', messageDoc.id))
    );

    await Promise.all(deletePromises);

    // Delete the conversation
    await deleteDoc(doc(db, 'conversations', conversationId));
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw new Error('Xóa cuộc trò chuyện thất bại');
  }
};

