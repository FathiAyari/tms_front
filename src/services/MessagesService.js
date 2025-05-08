import api from "./api";

// Fetch messages
export const fetchMessages = async (searchQuery = "", page = 1) => {
    const response = await api.get(
        `/api/messages?search=${searchQuery}&limit=10&page=${page}`
    );
    return response.data;
};

// Fetch dashboard statistics (if needed)
export const fetchMessagesDashboard = async () => {
    const response = await api.get(`/api/messages/dashboard`);
    return response.data.stats;
};

// Fetch a single message by its ID
export const fetchMessageById = async (id) => {
    const response = await api.get(`/api/messages/${id}`);
    return response.data.message;
};

// Delete a message by ID
export const deleteMessage = async (id) => {
    await api.delete(`/api/messages/${id}`);
};
// Add a new vehicle
export const addMessage = async (data) => {
    const response = await api.post("/api/messages", data);
    return response.data.message;
};