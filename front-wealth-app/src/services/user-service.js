/*
import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/loginUser`, credentials);
        if (response.data.success && response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token);
            
            const token = response.data.token;
            console.log(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            console.error('Login successful, but token is missing.');
        }


        return response.data;  // This will contain the user data and status of the login
    } catch (error) {
        // Handle any errors, e.g., if the request fails
        console.error('Login error:', error);
        return { success: false, message: "An error occurred during login." };
    }
};



export const createAccount = async (credentials) => {
    try {
        await axios.post(`${BASE_URL}/register/user`, credentials);
    }catch(error) {
        console.log("Error Occured: " + error);
        return error;
    }
}

export const testConnection = async (data) => {
    return await axios.get(`${BASE_URL}/test`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const fetchInvestments = async () => {
    try {
        const token = localStorage.getItem('token'); // Adjust as necessary for where you store your token
        const response = await axios.get(`${BASE_URL}/api/investments`, {
            headers: { Authorization: `Bearer ${token}` } // Include token in header
            
        });
        return response.data;  // This will contain the array of investments
    } catch (error) {
        console.error('Error fetching investments:', error);
        return [];  // Return an empty array or handle the error as needed
    }
};



export const addInvestment = async (investment) => {
    try {
        const token = localStorage.getItem('token'); // Adjust as necessary for where you store your token
        const response = await axios.post(`${BASE_URL}/api/investments/create`, investment, {
            headers: { Authorization: `Bearer ${token}` } // Include token in header
        });
        return response.data;  // This will contain the created investment data
    } catch (error) {
        console.error('Error adding investment:', error.response || error);  // Log the full response if available
        return null;  // Handle the error as needed
    }
};






export const deleteInvestment = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/investments/${id}`); // Adjust the endpoint
        return true;  // Return true on success
    } catch (error) {
        console.error('Error deleting investment:', error);
        return false;  // Return false or handle the error as needed
    }
};

*/

// src/services/userService.js

import apiClient from './apiClient';
export const getUserProfile = async () => {
    try {
        const response = (await apiClient.get('/user/details'));
        return response.data;  
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (userData) => {
    try {
        const response = await apiClient.put('/user/update-email', userData);
        console.log(response.data)
        // return response.data;  
        // Returns updated user profile data
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const getUserProfiles = async () => {
    try{
        const response = (await apiClient.get('/user/display-all'));
        return response.data;
    }catch(error){
        console.error('Error fetching user profiles:', error);
        throw error;
    }
    
}

export const setUserAdmin = async (userId) => {
    try{
        const response = await apiClient.put(`/user/set-admin`, userId);
        return response.data;
    }catch(error){
        console.log("Error setting user: " + error)
        throw error;
    }
}

export const deleteUserProfile = async (userId) => {
    try{
        const response = await apiClient.post(`/user/delete-account`, userId);
        console.log(response.data);
    }catch (error) {
        console.error('Error deleting user profile:', error);
        throw error;
    }
}

export const setUserImage = async (imageArr) => {
    try {
        const response = await apiClient.post(`/user/set-image`, imageArr);
        console.log(response.data);
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const getUserImage = async () => {
    try{
        const response = await apiClient.get('/user/get-image');
        console.log(response.data);
    }catch(error){
        console.log(error);
        throw error;
    }
}

