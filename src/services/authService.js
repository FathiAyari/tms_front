import api from './api';

// Sign up user

export const signUp = async (userData) => {


    try {
        // Send a POST request with FormData, including the image
        const response = await api.post('/api/auth/signup', userData, {
            headers: {
                "Content-Type": "multipart/form-data", // Ensure that the header is set to multipart/form-data
            },
        });

        const { token, user } = response.data;

        // Store the token and user info in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return user; // Return the user object after successful signup
    } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        throw error; // Rethrow error to be handled in the UI
    }
};

// Sign in user
export const signIn = async (credentials) => {
    const response = await api.post('/api/auth/signin', credentials);
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get current user from local storage
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Get auth token
export const getToken = () => {
    return localStorage.getItem('token');
};
