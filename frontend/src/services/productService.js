import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

export const getProducts = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/listar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token"); // Asegúrate de tener el token guardado

    const response = await fetch(`${API_URL}/crearEditar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregar el token JWT
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await fetch(`${API_URL}/crearEditar`, {
      method: "POST", // Mantiene el mismo endpoint de creación y edición
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: productId, ...updatedData }), // Enviar el ID junto con los nuevos datos
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await fetch(`${API_URL}/eliminar/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    return true;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
