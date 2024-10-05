import axios from 'axios';

export const BASE_URL = 'http://localhost:8080/api/properties';

axios.defaults.withCredentials = true;

export const getPropertyList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/list`);
        return response.data;  // This will contain the user data and status of the login
    } catch (error) {
        // Handle any errors, e.g., if the request fails
        console.error('Getting property list error:', error);
        return {success: false, message: "An error occurred during getting property list."};
    }
};

export const addNewProperty = async (property) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, property);
        return response.data;
    } catch (error) {
        console.error('Error adding property:', error);
        return { success: false, message: 'Error adding property.' };
    }
};

export const testConnection = async (data) => {
    return await axios.get(`${BASE_URL}/test`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
