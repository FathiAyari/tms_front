import api from "./api";

// Fetch all reviews
export const fetchReviews = async (searchQuery = "", page = 1) => {
    const response = await api.get(
        `/api/reviews?search=${searchQuery}&limit=10&page=${page}`
    );
    return response.data;
};

// Fetch a single review by ID
export const fetchReviewById = async (id) => {
    const response = await api.get(`/api/reviews/${id}`);
    return response.data.review;
};

// Add a new review
export const addReview = async (data) => {
    const response = await api.post("/api/reviews", data);
    return response.data.newReview;
};

// Update an existing review by ID
export const updateReview = async (id, reviewData) => {
    const response = await api.patch(`/api/reviews/${id}`, reviewData);
    return response.data.review;
};

// Delete a review by ID
export const deleteReview = async (id) => {
    await api.delete(`/api/reviews/${id}`);
};
