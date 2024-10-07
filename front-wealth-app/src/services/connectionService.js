// src/services/connectionService.js

import apiClient from './apiClient';

export const testConnection = async () => {
    try {
        const response = await apiClient.get('/test');
        return response.data;
    } catch (error) {
        console.error('Error testing connection:', error);
        throw error;  // Let the calling function handle the error
    }
};
