import api from "./api";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/usuarios/perfil", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
