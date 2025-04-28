import api from "./api";

// Fetch vehicles
export const fetchVehicles = async (
  searchQuery = "",
  status = "",
  page = 1
) => {
  const response = await api.get(
    `/api/vehicles?search=${searchQuery}&status=${status}&limit=10&page=${page}`
  );
  return response.data;
};

// Fetch dashboard statistics
export const fetchDashboardData = async () => {
  const response = await api.get(`/api/vehicles/dashboard`);
  return response.data.stats;
};

// Fetch a single vehicle by its ID
export const fetchVehicleById = async (id) => {
  const response = await api.get(`/api/vehicles/${id}`);
  return response.data.vehicle;
};

// Add a new vehicle
export const addVehicle = async (vehicleData) => {
  const response = await api.post("/api/vehicles", vehicleData);
  return response.data.vehicle;
};

// Update an existing vehicle by ID
export const updateVehicle = async (id, vehicleData) => {
  const response = await api.patch(`/api/vehicles/${id}`, vehicleData);
  return response.data.vehicle;
};

// Delete a vehicle by ID
export const deleteVehicle = async (id) => {
  await api.delete(`/api/vehicles/${id}`);
};
