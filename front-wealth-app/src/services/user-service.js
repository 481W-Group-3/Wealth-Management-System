import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/loginUser`, credentials);
        return response.data;  // This will contain the user data and status of the login
    } catch (error) {
        // Handle any errors, e.g., if the request fails
        console.error('Login error:', error);
        return {success: false, message: "An error occurred during login."};
    }
};

export const createAccount = async (credentials) => {
    console.log('Creating account:', credentials);
    await axios.post(`${BASE_URL}/register/user`, credentials);
}

export const testConnection = async (data) => {
    return await axios.get(`${BASE_URL}/test`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const createInvestment = async (investmentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/investments/create`, investmentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating investment:', error);
        return { success: false, message: "An error occurred while creating the investment." };
    }
};

export const getAllInvestments = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/investments`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;  // This should return the list of investments
    } catch (error) {
        console.error('Error fetching investments:', error);
        return { success: false, message: "An error occurred while fetching the investments." };
    }
};

