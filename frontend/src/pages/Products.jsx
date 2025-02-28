import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { useNavigate } from "react-router-dom";
import AddToCartModal from "./AddToCartModal";
import EditProductModal from "./EditProductModal";
import { addToCart, findCart } from "../services/cartService";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen_url: "",
  });
  const [editProduct, setEditProduct] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    imagen_url: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product, quantity) => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (!user) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        return;
      }

      const orderData = {
        idUsuario: user.id,
        idProducto: product.id,
        cantidad: quantity,
      };

      await addToCart(orderData);
      const updatedOrder = await findCart(user.id);
      localStorage.setItem(
        "ordenActual",
        JSON.stringify(updatedOrder.ordenActual)
      );

      alert("Producto agregado al carrito exitosamente.");
      handleCloseModal();
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      alert("Error al agregar producto al carrito.");
    }
  };

  const handleOpenAddProductModal = () => {
    setShowModal(true);
  };

  const handleCloseAddProductModal = () => {
    setShowModal(false);
    setNewProduct({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen_url: "",
    });
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = async () => {
    try {
      await createProduct(newProduct);
      alert("Producto agregado exitosamente.");
      handleCloseAddProductModal();
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar el producto.");
    }
  };

  // 🔹 Abrir modal de edición con los datos del producto seleccionado
  const handleOpenEditModal = (product) => {
    setEditingProduct({ ...product });
    setShowEditModal(true);
  };

  // 🔹 Manejar cambios en el formulario del modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Guardar cambios del producto editado
  const handleSaveEditProduct = async () => {
    try {
      await updateProduct(editingProduct.id, editingProduct);
      alert("Producto actualizado exitosamente.");
      setShowEditModal(false);

      // Recargar productos actualizados
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        alert("Producto eliminado exitosamente.");
        setProducts(await getProducts());
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto.");
      }
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
      </div>
    );

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/perfil")}
        >
          <i className="fa-solid fa-user me-2"></i> Volver
        </button>
        <h1 className="text-primary">
          <i className="fa-solid fa-boxes-stacked me-2"></i> Productos
        </h1>
        <button className="btn btn-success" onClick={handleOpenAddProductModal}>
          <i className="fa-solid fa-plus me-2"></i> Agregar Producto
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted">No hay productos disponibles.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card shadow-lg">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="card-text text-success fw-bold">
                    ${product.precio}
                  </p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleOpenEditModal(product)}
                  >
                    <i className="fa-solid fa-pen-to-square me-2"></i> Editar
                  </button>
                  <button
                    className="btn btn-danger  me-2"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenModal(product)}
                  >
                    <i className="fa-solid fa-cart-plus me-2"></i> Agregar al
                    carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAdd={handleAddToCart}
        />
      )}

      {/* Modal para agregar producto */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nuevo Producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseAddProductModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={newProduct.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    name="descripcion"
                    value={newProduct.descripcion}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={newProduct.precio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL de Imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    name="imagen_url"
                    value={newProduct.imagen_url}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseAddProductModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveProduct}
                >
                  Guardar Producto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {showEditModal && editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditProduct}
          onChange={handleEditInputChange}
        />
      )}
    </div>
  );
}

export default Products;
