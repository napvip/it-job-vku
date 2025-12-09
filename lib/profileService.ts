import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

// Interfaces
export interface PersonalInfo {
  uid: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  phone?: string;
  email: string;
  location?: string;
  desiredPosition?: string;
  desiredSalary?: string;
  bio?: string;
  avatarUrl?: string;
  cvFileUrl?: string;
  cvFileName?: string;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  uid: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  uid: string;
  school: string;
  degree: string;
  major: string;
  gpa?: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  uid: string;
  name: string;
  category?: string;
  level?: string;
  createdAt: Date;
}

export interface Certificate {
  id: string;
  uid: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  uid: string;
  name: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Personal Info Operations
export const getPersonalInfo = async (uid: string): Promise<PersonalInfo | null> => {
  try {
    const docRef = doc(db, 'personalInfo', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
      } as PersonalInfo;
    }
    return null;
  } catch (error) {
    console.error('Error getting personal info:', error);
    throw error;
  }
};export const updatePersonalInfo = async (uid: string, data: Partial<PersonalInfo>): Promise<void> => {
  try {
    const docRef = doc(db, 'personalInfo', uid);
    await setDoc(
      docRef,
      {
        ...data,
        uid,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating personal info:', error);
    throw error;
  }
};

// Experience Operations
export const getExperiences = async (uid: string): Promise<Experience[]> => {
  try {
    const q = query(collection(db, 'experiences'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    const experiences: Experience[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      experiences.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
      } as Experience);
    });

    return experiences.sort((a, b) => {
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  } catch (error) {
    console.error('Error getting experiences:', error);
    throw error;
  }
};

export const addExperience = async (uid: string, data: Omit<Experience, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = doc(collection(db, 'experiences'));
    await setDoc(docRef, {
      ...data,
      uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding experience:', error);
    throw error;
  }
};

export const updateExperience = async (id: string, data: Partial<Experience>): Promise<void> => {
  try {
    const docRef = doc(db, 'experiences', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    throw error;
  }
};

export const deleteExperience = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'experiences', id));
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};

// Education Operations
export const getEducations = async (uid: string): Promise<Education[]> => {
  try {
    const q = query(collection(db, 'education'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    const educations: Education[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      educations.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
      } as Education);
    });

    return educations.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  } catch (error) {
    console.error('Error getting educations:', error);
    throw error;
  }
};

export const addEducation = async (uid: string, data: Omit<Education, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = doc(collection(db, 'education'));
    await setDoc(docRef, {
      ...data,
      uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding education:', error);
    throw error;
  }
};

export const updateEducation = async (id: string, data: Partial<Education>): Promise<void> => {
  try {
    const docRef = doc(db, 'education', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating education:', error);
    throw error;
  }
};

export const deleteEducation = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'education', id));
  } catch (error) {
    console.error('Error deleting education:', error);
    throw error;
  }
};

// Skills Operations
export const getSkills = async (uid: string): Promise<Skill[]> => {
  try {
    const q = query(collection(db, 'skills'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    const skills: Skill[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      skills.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
      } as Skill);
    });

    return skills;
  } catch (error) {
    console.error('Error getting skills:', error);
    throw error;
  }
};

export const addSkill = async (uid: string, data: Omit<Skill, 'id' | 'uid' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = doc(collection(db, 'skills'));
    await setDoc(docRef, {
      ...data,
      uid,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

export const deleteSkill = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'skills', id));
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
};

// Certificates Operations
export const getCertificates = async (uid: string): Promise<Certificate[]> => {
  try {
    const q = query(collection(db, 'certificates'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    const certificates: Certificate[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      certificates.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
      } as Certificate);
    });

    return certificates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting certificates:', error);
    throw error;
  }
};

export const addCertificate = async (uid: string, data: Omit<Certificate, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = doc(collection(db, 'certificates'));
    await setDoc(docRef, {
      ...data,
      uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding certificate:', error);
    throw error;
  }
};

export const updateCertificate = async (id: string, data: Partial<Certificate>): Promise<void> => {
  try {
    const docRef = doc(db, 'certificates', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating certificate:', error);
    throw error;
  }
};

export const deleteCertificate = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'certificates', id));
  } catch (error) {
    console.error('Error deleting certificate:', error);
    throw error;
  }
};

// Projects Operations
export const getProjects = async (uid: string): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
      } as Project);
    });

    return projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

export const addProject = async (uid: string, data: Omit<Project, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = doc(collection(db, 'projects'));
    await setDoc(docRef, {
      ...data,
      uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<void> => {
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
