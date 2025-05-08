import api from './api';

// Sign up user
export const signUp = async (userData) => {
    const response = await api.post('/api/auth/signup', userData);
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
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
