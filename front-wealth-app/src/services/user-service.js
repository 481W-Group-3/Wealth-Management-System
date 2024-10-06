import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/loginUser`, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
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
