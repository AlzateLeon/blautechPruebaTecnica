import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Ajusta según tu backend
});

// Interceptor para agregar el token automáticamente en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token enviado:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
