import axios from "axios";

const api = axios.create({
  baseURL: "https://novaedge-digital.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("novaedgeToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;