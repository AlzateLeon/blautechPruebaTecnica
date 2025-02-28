import React from "react";

function EditProductModal({ product, onClose, onSave, onChange }) {
  if (!product) return null; // Evita renderizar si no hay producto seleccionado

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Producto</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={product.nombre}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={product.descripcion}
                onChange={onChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                value={product.precio}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">URL de Imagen</label>
              <input
                type="text"
                className="form-control"
                name="imagen_url"
                value={product.imagen_url}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={onSave}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
