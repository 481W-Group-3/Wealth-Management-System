import axios from 'axios';
export const BASE_URL = 'http://localhost:8080';



export const login = async (credentials) => {
    try {
        
        const response = await axios.post(`${BASE_URL}/loginUser`, credentials);

        
        return response.data;  // This will contain the user data and status of the login
    } catch (error) {
        // Handle any errors, e.g., if the request fails
        console.error('Login error:', error);
        return { success: false, message: "An error occurred during login." };
    }
};

export const testConnection = async (data) => {
    return await axios.get(`${BASE_URL}/test`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
