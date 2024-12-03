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

export const getUserDetails = async (userId) => {
    try {
        const response = (await apiClient.get(`/user/details/${userId}`));
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

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

