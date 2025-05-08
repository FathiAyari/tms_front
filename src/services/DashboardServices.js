import api from "./api";

export const fetchDashboardData = async (userId) => {
    const url = userId ? `/api/dashboard?userId=${userId}` : "/api/dashboard";
    const response = await api.get(url);
    return response.data;
};
