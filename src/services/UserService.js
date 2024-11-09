import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888/api/users'; // Use environment variable or default to localhost

export const registerUser = async (userDTO) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userDTO);
    return response.data; // Return response data directly
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Rethrow the error for handling in components
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; // Return response data directly
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Rethrow the error for handling in components
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/allusers`);
    return response.data; // Return response data directly
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error for handling in components
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/${username}`);
    return response.data; // Return response data directly
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    throw error; // Rethrow the error for handling in components
  }
};

export const updateUser = async (username, userDTO) => {
  try {
    const response = await axios.put(`${API_URL}/${username}`, userDTO);
    return response.data; // Return response data directly
  } catch (error) {
    console.error(`Error updating user ${username}:`, error);
    throw error; // Rethrow the error for handling in components
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/${username}`);
    return response.data; // Return response data directly
  } catch (error) {
    console.error(`Error deleting user ${username}:`, error);
    throw error; // Rethrow the error for handling in components
  }
};
