import api from "./api";

// Fetch services
export const fetchServices = async (
    searchQuery = "",
    page = 1
) => {
    const response = await api.get(
        `/api/services?search=${searchQuery}&limit=10&page=${page}`
    );
    return response.data;
};

// Fetch dashboard statistics (if needed)
export const fetchServicesDashboard = async () => {
    const response = await api.get(`/api/services/dashboard`);
    return response.data.stats;
};

// Fetch a single service by its ID
export const fetchServiceById = async (id) => {
    const response = await api.get(`/api/services/${id}`);
    return response.data.service;
};

// Add a new service
export const addService = async (data) => {
    const response = await api.post("/api/services", data);
    return response.data.newService;
};

// Update an existing service by ID
export const updateService = async (id, serviceData) => {
    const response = await api.patch(`/api/services/${id}`, serviceData);
    return response.data.service;
};

// Delete a service by ID
export const deleteService = async (id) => {
    await api.delete(`/api/services/${id}`);
};
