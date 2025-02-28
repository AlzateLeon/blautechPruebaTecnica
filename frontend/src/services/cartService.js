import api from "./api";

export const addToCart = async (orderData) => {
  try {
    const response = await api.post("/orden/guardar", orderData);
    return response.data;
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    throw error;
  }
};

export const payCart = async (idUsuario) => {
  try {
    const response = await api.post("/orden/pagar", null, {
      params: { idUsuario }, // Enviamos el idUsuario como un parámetro en la URL
    });
    return response.data;
  } catch (error) {
    console.error("Error al pagar el carrito:", error);
    throw error.response?.data || "Error al procesar el pago";
  }
};

export const deleteProduct = async (idOrdenDetalle) => {
  try {
    const response = await api.post("/orden/eliminarDelCarrito", null, {
      params: { idOrdenDetalle },
    });
    return response.data;
  } catch (error) {
    console.error("Error al pagar el carrito:", error);
    throw error.response?.data || "Error al procesar el pago";
  }
};

export const findCart = async (idUsuario) => {
  try {
    const response = await api.get("/orden/consultarCarrito", {
      params: { idUsuario }, // Se pasa directamente en el objeto de configuración
    });
    return response.data;
  } catch (error) {
    console.error("Error al consultar el carrito:", error);
    throw error;
  }
};
