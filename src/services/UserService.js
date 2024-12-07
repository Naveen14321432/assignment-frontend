import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888/api/users'; 

export const registerUser = async (userDTO) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userDTO, {
      withCredentials: true,  // Allow cookies to be sent with the request
    });
    return response.data; 
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData, {
      withCredentials: true, // Ensure session cookie is sent
    });

    // Extract the required data
    const { studentId } = response.data;
    
    // Store the studentId securely
    sessionStorage.setItem('studentId', studentId); // Use sessionStorage for temporary storage

    return response.data; // Return the response for further processing
  } catch (error) {
    console.error("Error logging in:", error);

    // Provide a user-friendly error message
    throw new Error(error.response?.data?.message || "Login failed. Please check your credentials and try again.");
  }
};



export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/allusers`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; 
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/${username}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    throw error; 
  }
};

export const updateUser = async (username, userDTO) => {
  try {
    const response = await axios.put(`${API_URL}/${username}`, userDTO);
    return response.data; 
  } catch (error) {
    console.error(`Error updating user ${username}:`, error);
    throw error; 
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${username}:`, error);
    throw error; 
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('studentId');
    sessionStorage.clear(); 
    alert("You have been logged out!");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

