import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/usuarios/registrar", userData);
  return response.data;
};
