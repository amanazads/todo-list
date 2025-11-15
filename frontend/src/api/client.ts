import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5003/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    const errorStatus = error.response?.status;
    console.error('API Error:', {
      status: errorStatus,
      message: errorMessage,
      url: error.config?.url,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default api;
