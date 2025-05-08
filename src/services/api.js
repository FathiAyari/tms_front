import axios from "axios";

export const backendURL = "http://localhost:5000"; // Use env in production

const api = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you're using cookies (optional for JWT)
});



export default api;
