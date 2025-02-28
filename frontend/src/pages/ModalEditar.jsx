import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Agregado para evitar errores
import { registerUser } from "../services/registerService";

function ModalEditar({ usuario, setUsuario }) {
  const [form, setForm] = useState({ ...usuario });
  const navigate = useNavigate(); // Hook de navegación

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    try {
      const response = await registerUser(form);
      localStorage.setItem(
        "userData",
        JSON.stringify(response.usuarioDTO)
      );
      alert("Usuario editado correctamente.");
    } catch (error) {
      alert("Error al registrar usuario.");
    }

    // Actualizar usuario localmente
    localStorage.setItem("userData", JSON.stringify(form));
    setUsuario(form);
  };

  return (
    <div
      className="modal fade"
      id="editarModal"
      tabIndex="-1"
      aria-labelledby="editarModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Encabezado */}
          <div className="modal-header text-center w-100">
            <h5 className="modal-title w-100">Editar perfil</h5>
          </div>

          {/* Cuerpo del modal */}
          <div className="modal-body">
            <form>
              {["nombres", "apellidos", "email", "direccion"].map(
                (field, index) => (
                  <div className="mb-3" key={index}>
                    <label className="form-label">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      className="form-control"
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                    />
                  </div>
                )
              )}
            </form>
          </div>

          {/* Footer del modal */}
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGuardar}
              data-bs-dismiss="modal"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditar;
