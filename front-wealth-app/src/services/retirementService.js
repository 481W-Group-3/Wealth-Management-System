// src/services/retirementService.js

import apiClient from './apiClient';

//Fetch variables
export const fetchRetirementVariables = async () => {
    try {
        const response = await apiClient.get('/api/retirement');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching retirement assets:', error);
        return [];
    }
};

//Updates and Stores variables
export const storeRetirementVariables = async (retirement, user) => {
    try {
        const response = await apiClient.post(`/api/retirement/${id}`, retirement, user);
        return response.data;
    } catch (error) {
        console.error('Error storing retirement variables:', error.response || error);
        throw error;
    }
};

// Add a Record to store variables (use if one does not exist)
export const addRetirementRecord = async (retirement, user) => {
    try {
        const response = await apiClient.post('/api/retirement/add', retirement, user);
        return response.data;
    } catch (error) {
        console.error('Error adding variables:', error.response || error);
        throw error;
    }
};