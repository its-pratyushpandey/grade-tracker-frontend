export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  enrollmentId?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  averageGrade?: number;
  totalGrades?: number;
  status?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  averageGrade?: number;
  enrolledStudents?: number;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  numericScore: number;
  gradeDate: string;
  description?: string;
  assessment?: string;
  weight: number;
  createdAt?: string;
  updatedAt?: string;
  studentName?: string;
  courseName?: string;
  courseCode?: string;
  letterGrade?: string;
  gradeStatus?: string;
}

export interface Statistics {
  totalStudents: number;
  totalCourses: number;
  totalGrades: number;
  activeStudents: number;
  overallAverage: number;
  median: number;
  highestScore: number;
  lowestScore: number;
  standardDeviation: number;
  distribution: {
    gradeA: number;
    gradeB: number;
    gradeC: number;
    gradeD: number;
    gradeF: number;
  };
  topStudents: {
    studentId: string;
    studentName: string;
    averageGrade: number;
    totalGrades: number;
  }[];
  coursePerformances: {
    courseId: string;
    courseName: string;
    courseCode: string;
    averageGrade: number;
    totalStudents: number;
  }[];
}

export interface User {
  username: string;
  fullName: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  fullName: string;
  role: string;
  expiresIn: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
  fullName?: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  validationErrors?: Record<string, string>;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
