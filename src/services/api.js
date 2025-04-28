import axios from "axios";

const backendURL = " http://localhost:5000"; // or whatever port your backend is on

const api = axios.create({
  baseURL: backendURL , // Correct: calling backend, not frontend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
