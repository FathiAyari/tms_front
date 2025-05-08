import api from "./api";
import axios from "axios";

// Fetch users with role 'client' and pagination
export const fetchUsers = async (page = 1, limit = 10) => {
    const response = await api.get(
        `/api/users?limit=${limit}&page=${page}`
    );
    return response.data;
};

// Fetch a single user by their ID
export const fetchUserById = async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data.user;
};

// Update user status (active/inactive)
export const updateUserStatus = async (id, status) => {
    try {
        const response = await api.patch(`/api/users/${id}/status`, { status });
        return response.data.user;
    } catch (error) {
        console.error("Error while updating user status:", error);
    }
};

// Add a new user
export const addUser = async (data) => {
    try {
        const response = await api.post("/api/users", data);
        return response.data.user;
    } catch (error) {
        console.error("Error while adding user:", error);
    }
};

// Update an existing user by ID
export const updateUser = async (id, data) => {
    try {
        const response = await api.patch(`/api/users/${id}`, data);
        return response.data.user;
    } catch (error) {
        console.error("Error while updating user:", error);
        throw error; // rethrow for higher-level handling
    }
};

// Delete a user by ID
export const deleteUser = async (id) => {
    await api.delete(`/api/users/${id}`);
};
