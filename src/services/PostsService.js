import api from "./api";
import axios from "axios";

// Fetch posts
export const fetchPosts = async (searchQuery = "", status = "", page = 1) => {
    const response = await api.get(
        `/api/posts?search=${searchQuery}&status=${status}&limit=10&page=${page}`
    );
    return response.data;
};

// Fetch dashboard statistics (if needed)
export const fetchPostsDashboard = async () => {
    const response = await api.get(`/api/posts/dashboard`);
    return response.data.stats;
};

// Fetch a single post by its ID
export const fetchPostById = async (id) => {
    const response = await api.get(`/api/posts/${id}`);
    return response.data.post;
};

// Add a new post
export const addPost = async (data) => {
    try {
        // Log formData before sending it to ensure it's correctly populated


        // Send the FormData to the backend
        const response = await api.post("/api/posts", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.post;
    } catch (error) {
        console.error("Error while adding post:", error);
    }
};

// Update an existing post by ID
export const updatePost = async (id, data) => {
    try {
        const response = await api.patch(`/api/posts/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.post;
    } catch (error) {
        console.error("Error while updating post:", error);
        throw error; // rethrow for higher-level handling
    }
};

// Delete a post by ID
export const deletePost = async (id) => {
    await api.delete(`/api/posts/${id}`);
};

export const updatePostStatus = async (id, status) => {
    const response = await api.patch(`/api/posts/${id}/status`, { status });
    return response.data.post;
};

