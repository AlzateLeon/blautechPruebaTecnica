import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AddToCartModal({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAdd(product, quantity);
  };

  return (
    <div
      className="modal fade show d-block"
      id="addCart"
      tabIndex="-1"
      aria-labelledby="modalAddcart"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Encabezado */}
          <div className="modal-header">
            <div className="modal-header text-center w-100">
              <h5 className="modal-title w-100">Agregar al carrito</h5>
            </div>
          </div>

          {/* Cuerpo */}
          <div className="modal-body">
            <p>
              <strong>Producto:</strong> {product.nombre}
            </p>
            <p>
              <strong>Precio:</strong> ${product.precio}
            </p>
            <div className="mb-3 d-flex align-items-center justify-content-center gap-2">
              <label className="form-label mb-0">Cantidad:</label>
              <input
                type="number"
                className="form-control w-25"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Pie con botones */}
          <div className="modal-footer d-flex justify-content-center">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-plus me-2"></i> Agregar
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              <i className="fa-solid fa-xmark me-2"></i> Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModal;
