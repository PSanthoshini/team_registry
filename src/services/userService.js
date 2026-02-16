import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
        return { success: true };
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};
