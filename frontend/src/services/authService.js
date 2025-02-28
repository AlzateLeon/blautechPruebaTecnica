import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:8081/api/auth/login", credentials);
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message || "Error en la autenticación";
  }
};
