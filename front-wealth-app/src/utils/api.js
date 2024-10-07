import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your actual API URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/loginUser`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};