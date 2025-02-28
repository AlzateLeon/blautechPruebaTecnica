import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { payCart, deleteProduct, findCart } from "../services/cartService";
import { registerUser } from "../services/registerService";
import ModalEditar from "./ModalEditar";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [orden, setOrden] = useState(null);
  const [ordenesPagadas, setOrdenes] = useState([]);
  const navigate = useNavigate();
  const [mensajePago, setMensajePago] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const ordenData = JSON.parse(localStorage.getItem("ordenActual")) || {};
    const ordenesPagadas = JSON.parse(localStorage.getItem("ordenesPagadas"));

    setUsuario(userData);
    setOrden(ordenData);
    setOrdenes(ordenesPagadas);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePagarCarrito = async () => {
    if (!usuario) return;

    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres pagar el carrito?"
    );
    if (!confirmacion) return;

    try {
      await payCart(usuario.id);
      setMensajePago("Pago realizado con éxito.");
      setOrden(null);
      localStorage.removeItem("ordenActual");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setMensajePago("Error al procesar el pago. Inténtalo de nuevo.");
    }
  };

  const handleEliminarProducto = async (idOrdenDetalle) => {
    const confirmacion = window.confirm("¿Deseas eliminar este producto?");
    if (!confirmacion) return;

    try {
      await deleteProduct(idOrdenDetalle);
      const updatedOrder = await findCart(usuario.id);
      localStorage.setItem(
        "ordenActual",
        JSON.stringify(updatedOrder.ordenActual)
      );
      setOrden(updatedOrder.ordenActual);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Hubo un error al eliminar el producto.");
    }
  };

  if (!usuario) {
    return <p className="text-center mt-5">Cargando perfil...</p>;
  }

  const handleEditarPerfil = async () => {
    try {
      await registerUser(form);
      alert("Perfil actualizado correctamente.");
      localStorage.setItem("userData", JSON.stringify(form));
      setUsuario(form);
      setEditando(false);
    } catch (error) {
      alert("Error al actualizar perfil.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Perfil - Izquierda */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center">
              <i className="fa-solid fa-user me-2"></i> Perfil
            </h2>
            <div className="card-body">
              <p>
                <strong>Nombre:</strong> {usuario.nombres} {usuario.apellidos}
              </p>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
              <p>
                <strong>Dirección:</strong> {usuario.direccion}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}
              </p>
            </div>

            <button
              className="btn btn-warning w-100 mt-3"
              data-bs-toggle="modal"
              data-bs-target="#editarModal"
            >
              Editar Perfil
            </button>

            <ModalEditar usuario={usuario} setUsuario={setUsuario} />

            {/* Botón Cerrar Sesión dentro del perfil */}
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Carrito - Derecha */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-center">Carrito de compra</h3>
              <i className="fa-solid fa-cart-shopping fa-2x text-primary"></i>
            </div>
            {orden ? (
              <>
                <p>
                  <strong>Total del carrito:</strong> ${orden.total}
                </p>
                <div className="d-flex gap-3 align-items-center">
                  {/* Botón con Badge rojo 🔴 */}
                  <button
                    className="btn btn-primary position-relative"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    Ver Productos
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                      {orden?.ordenes?.length || 0}
                    </span>
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={handlePagarCarrito}
                  >
                    <i className="fa-solid fa-dollar-sign me-1"></i> Pagar
                    Carrito
                  </button>
                </div>

                {mensajePago && (
                  <p className="text-success mt-2">{mensajePago}</p>
                )}
              </>
            ) : (
              <p className="text-muted">No tienes productos agregados.</p>
            )}
            {/* Botón Agregar Productos debajo del carrito alineado a la derecha */}
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/productos")}
              >
                Agregar Productos
              </button>
            </div>
          </div>
          {}
          {/* Órdenes Pagadas */}
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-3">Compras realizadas</h2>
            {ordenesPagadas.length > 0 ? (
              <ul className="list-group">
                {ordenesPagadas.map((orden) => (
                  <li
                    key={orden.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <strong>{orden.fechaPago}</strong> - $
                      {orden.total.toFixed(2)}
                    </span>
                    <button
                      className="btn btn-info btn-sm"
                      title="Ver detalles"
                    >
                      <i className="fa-solid fa-info-circle"></i>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No tienes órdenes pagadas.</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL Bootstrap */}
      <div
        className="modal fade"
        id="cartModal"
        tabIndex="-1"
        aria-labelledby="cartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center w-100" id="cartModalLabel">
                Productos en el carrito
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {orden?.ordenes?.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.productoDTO.nombre}</td>
                      <td>${producto.productoDTO.precio}</td>
                      <td>{producto.cantidad}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminarProducto(producto.id)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Eliminar"
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
