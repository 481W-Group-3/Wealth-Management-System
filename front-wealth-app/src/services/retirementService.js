// src/services/retirementService.js

import apiClient from './apiClient';

//Fetch variables
export const fetchVariables = async (propertyData, user) => {
    try {
        const response = await apiClient.post('/api/properties/add', propertyData, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Store variables
export const storeVariables = async (propertyData, user) => {
    try {
        const response = await apiClient.post('/api/properties/add', propertyData, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};