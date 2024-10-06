// src/services/authService.js

import apiClient from './apiClient';

export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/loginUser', credentials);
        if (response.data.success && response.data.token) {
            localStorage.setItem('token', response.data.token);
            return response.data;  // Contains user data and login status
        } else {
            console.error('Login successful, but token is missing.');
            return { success: false, message: 'Login successful, but token is missing.' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred during login.' };
    }
};

export const createAccount = async (credentials) => {
    try {
        const response = await apiClient.post('/register/user', credentials);
        return response.data;
    } catch (error) {
        console.error('Account creation error:', error);
        throw error;  // Let the calling function handle the error
    }
};
