// src/services/apiClient.js

import axios from 'axios';

// const BASE_URL = 'http://localhost:8080';  // Adjust as per your backend URL
const BASE_URL = 'https://wealth-management-system-3.onrender.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to automatically include Authorization header if token exists
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
