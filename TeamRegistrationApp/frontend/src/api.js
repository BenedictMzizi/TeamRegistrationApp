import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
let token = null;

export const setToken = (newToken) => { token = newToken; };

const axiosInstance = axios.create({ baseURL: API_BASE });
axiosInstance.interceptors.request.use((config) => {
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adminLogin = (email, password) => axiosInstance.post('/admin/login', { email, password });
export const fetchRegistrations = () => axiosInstance.get('/registrations');
export const updateRegistrationStatus = (id, status) => axiosInstance.patch(`/registrations/${id}`, { status });
export const registerUser = (name) => axiosInstance.post('/register', { name });