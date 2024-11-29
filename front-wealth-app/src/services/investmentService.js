// src/services/investmentService.js

import apiClient from './apiClient';

export const fetchInvestments = async () => {
    try {
        const response = await apiClient.get('/api/investments');
        return response.data;  // Returns the array of investments
    } catch (error) {
        console.error('Error fetching investments:', error);
        return [];  // Return an empty array if there's an error
    }
};

export const fetchAssets = async () => {
    try {
        const response = await apiClient.get('/api/assets'); // Updated endpoint
        console.log(response);
        return response.data;  // Assuming the API returns the array of assets
    } catch (error) {
        console.error('Error fetching assets:', error);
        return [];  // Return an empty array if there's an error
    }
};

export const calculateReturn = async ({ principalInitial, currentValue }) => {
    try {
        const response = await apiClient.post('/api/investments/calculate-return', {
            principalInitial,
            currentValue,
        });
        return response.data;  // Returns the calculated return data
    } catch (error) {
        console.error('Error calculating return:', error.response || error);
        throw error;  // Let the calling function handle the error
    }
};

export const addInvestment = async (investment) => {
    try {
        const response = await apiClient.post('/api/investments/create', investment);
        return response.data;  // Returns the created investment data
    } catch (error) {
        console.error('Error adding investment:', error.response || error);
        throw error;  // Let the calling function handle the error
    }
};

export const fetchInvestmentById = async (id) => {
    try {
        const response = await apiClient.get(`/api/investments/${id}`);
        return response.data;  // Returns the specified investment
    } catch (error) {
        console.error('Error fetching investments:', error);
        return [];  // Return an empty array if there's an error
    }
};

export const deleteInvestment = async (id) => {
    try {
        await apiClient.delete(`/api/investments/${id}`);
        return true;  // Return true on successful delete
    } catch (error) {
        console.error('Error deleting investment:', error);
        return false;  // Return false or handle the error as needed
    }
};

export const addAsset = async (asset) => {
    try {
        const response = await apiClient.post('/api/assets/create', asset);
        return response.data;  // Returns the created investment data
    } catch (error) {
        console.error('Error adding asset:', error.response || error);
        throw error;  // Let the calling function handle the error
    }
};

export const deleteAsset = async (id) => {
    try {
        await apiClient.delete(`/api/assets/${id}`);
        return true;  // Return true on successful delete
    } catch (error) {
        console.error('Error deleting asset:', error);
        return false;  // Return false or handle the error as needed
    }
};


export const fetchMarketPredictions = async () => {
    try {
        // const testdata = await apiClient.post('/api/stocks/fetch-data');
        // console.log("fetch data", testdata);
        const response = await apiClient.get('/api/stocks');
        console.log("recent", response);
        return true;  // Return true on successful delete
    } catch (error) {
        console.error('Error fetching market predictions:', error);
        return false;  // Return false or handle the error as needed
    }
};



export const fetchStockData = async (symbol) => {
    try {
        const response = await apiClient.get(`/api/stocks/${symbol}`);
        console.log("fetched", response)
        return response.data;  // Returns the specified investment
    } catch (error) {
        console.error('Error fetching investments:', error);
        return [];  // Return an empty array if there's an error
    }
};

