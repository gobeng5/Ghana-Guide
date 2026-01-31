import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

// Notes API
export const notesAPI = {
  getAll: (params) => axios.get(`${API_URL}/api/notes`, { params }),
  getById: (id) => axios.get(`${API_URL}/api/notes/${id}`),
  create: (data) => axios.post(`${API_URL}/api/notes`, data),
  update: (id, data) => axios.put(`${API_URL}/api/notes/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/api/notes/${id}`),
  getSubjects: (gradeLevel) => axios.get(`${API_URL}/api/notes/subjects/${gradeLevel}`),
  getTopics: (gradeLevel, subject) => axios.get(`${API_URL}/api/notes/topics/${gradeLevel}/${subject}`)
};

// Quizzes API
export const quizzesAPI = {
  getAll: (params) => axios.get(`${API_URL}/api/quizzes`, { params }),
  getById: (id) => axios.get(`${API_URL}/api/quizzes/${id}`),
  submit: (id, answers) => axios.post(`${API_URL}/api/quizzes/${id}/submit`, { answers }),
  create: (data) => axios.post(`${API_URL}/api/quizzes`, data),
  update: (id, data) => axios.put(`${API_URL}/api/quizzes/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/api/quizzes/${id}`)
};

// Progress API
export const progressAPI = {
  getAll: (params) => axios.get(`${API_URL}/api/progress`, { params }),
  save: (data) => axios.post(`${API_URL}/api/progress`, data),
  getStats: () => axios.get(`${API_URL}/api/progress/stats`),
  getSubjectProgress: (subject) => axios.get(`${API_URL}/api/progress/subject/${subject}`)
};

// Users API
export const usersAPI = {
  getProfile: () => axios.get(`${API_URL}/api/users/profile`),
  updateProfile: (data) => axios.put(`${API_URL}/api/users/profile`, data)
};
