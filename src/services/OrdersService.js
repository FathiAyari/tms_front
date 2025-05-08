import api from "./api";

// Fetch vehicles
export const fetchOrders = async (
  searchQuery = "",
  status = "",
  page = 1
) => {
  const response = await api.get(
    `/api/orders?search=${searchQuery}&status=${status}&limit=10&page=${page}`
  );
  return response.data;
};

// Fetch dashboard statistics
export const fetchDashboardData = async () => {
  const response = await api.get(`/api/orders/dashboard`);
  return response.data.stats;
};

// Fetch a single vehicle by its ID
export const fetchOrderById = async (id) => {
  const response = await api.get(`/api/orders/${id}`);
  return response.data.order;
};

// Add a new vehicle
export const addOrder = async (data) => {
  console.log(data);
  const response = await api.post("/api/orders", data);
  return response.data.vehicle;
};

// Update an existing vehicle by ID
export const updateOrder = async (id, vehicleData) => {
  const response = await api.patch(`/api/orders/${id}`, vehicleData);
  return response.data.vehicle;
};

// Delete a vehicle by ID
export const deleteOrder = async (id) => {
  await api.delete(`/api/orders/${id}`);
};
