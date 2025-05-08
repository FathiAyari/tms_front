import api from "./api";

// Increment visit count
export const incrementVisit = async () => {
    try {
        const response = await api.get("/api/increment-visit");
        return response.data; // Returns the updated visit count or a success message
    } catch (error) {
        console.error("Error incrementing visit count:", error);
        throw error; // Propagate the error for higher-level handling
    }
};
