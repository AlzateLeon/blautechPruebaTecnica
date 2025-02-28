import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/registerService";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    direccion: "",
    email: "",
    fechaNacimiento: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Limpiar error cuando el usuario cambia los valores
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await registerUser(form);
      alert("Usuario registrado correctamente. Ahora inicia sesión.");
      navigate("/login");
    } catch (error) {
      alert("Error al registrar usuario.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4">Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input type="text" className="form-control" name="nombres" placeholder="Nombres" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="apellidos" placeholder="Apellidos" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="direccion" placeholder="Dirección" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" name="email" placeholder="Correo" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="date" className="form-control" name="fechaNacimiento" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" placeholder="Contraseña" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="confirmPassword" placeholder="Confirmar Contraseña" onChange={handleChange} required />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes cuenta?{" "}
          <button className="btn btn-link p-0" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
