import api from '../lib/axios';
import {
  Student,
  Course,
  Grade,
  Statistics,
  AuthResponse,
  LoginCredentials,
  PageResponse,
} from '../types';

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),
  
  register: (credentials: LoginCredentials) =>
    api.post<string>('/auth/register', credentials),
};

// Students API
export const studentsAPI = {
  getAll: (params?: { page?: number; size?: number; sortBy?: string; sortDir?: string }) =>
    api.get<PageResponse<Student>>('/students', { params }),
  
  getAllWithoutPagination: () =>
    api.get<Student[]>('/students/all'),
  
  getById: (id: string) =>
    api.get<Student>(`/students/${id}`),
  
  search: (query: string, page = 0, size = 10) =>
    api.get<PageResponse<Student>>('/students/search', {
      params: { query, page, size },
    }),
  
  create: (student: Partial<Student>) =>
    api.post<Student>('/students', student),
  
  update: (id: string, student: Partial<Student>) =>
    api.put<Student>(`/students/${id}`, student),
  
  delete: (id: string) =>
    api.delete(`/students/${id}`),
  
  deactivate: (id: string) =>
    api.patch(`/students/${id}/deactivate`),
};

// Courses API
export const coursesAPI = {
  getAll: () =>
    api.get<Course[]>('/courses'),
  
  getById: (id: string) =>
    api.get<Course>(`/courses/${id}`),
  
  getByCode: (code: string) =>
    api.get<Course>(`/courses/code/${code}`),
  
  create: (course: Partial<Course>) =>
    api.post<Course>('/courses', course),
  
  update: (id: string, course: Partial<Course>) =>
    api.put<Course>(`/courses/${id}`, course),
  
  delete: (id: string) =>
    api.delete(`/courses/${id}`),
};

// Grades API
export const gradesAPI = {
  getAll: () =>
    api.get<Grade[]>('/grades'),
  
  getById: (id: string) =>
    api.get<Grade>(`/grades/${id}`),
  
  getByStudentId: (studentId: string) =>
    api.get<Grade[]>(`/grades/student/${studentId}`),
  
  getByStudentIdPaginated: (studentId: string, page = 0, size = 10) =>
    api.get<PageResponse<Grade>>(`/grades/student/${studentId}/paginated`, {
      params: { page, size },
    }),
  
  getByCourseId: (courseId: string) =>
    api.get<Grade[]>(`/grades/course/${courseId}`),
  
  create: (grade: Partial<Grade>) =>
    api.post<Grade>('/grades', grade),
  
  update: (id: string, grade: Partial<Grade>) =>
    api.put<Grade>(`/grades/${id}`, grade),
  
  delete: (id: string) =>
    api.delete(`/grades/${id}`),
};

// Statistics API
export const statisticsAPI = {
  getOverall: () =>
    api.get<Statistics>('/statistics'),
  
  getStudent: (studentId: string) =>
    api.get<Record<string, any>>(`/statistics/student/${studentId}`),
};

// Export API
export const exportAPI = {
  studentsCSV: () =>
    api.get('/export/students/csv', { responseType: 'blob' }),
  
  gradesCSV: () =>
    api.get('/export/grades/csv', { responseType: 'blob' }),
  
  studentGradesCSV: (studentId: string) =>
    api.get(`/export/student/${studentId}/csv`, { responseType: 'blob' }),
  
  gradesPDF: () =>
    api.get('/export/grades/pdf', { responseType: 'blob' }),
  
  studentGradesPDF: (studentId: string) =>
    api.get(`/export/student/${studentId}/pdf`, { responseType: 'blob' }),
};
