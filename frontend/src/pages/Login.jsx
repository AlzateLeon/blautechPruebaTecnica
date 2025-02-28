import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // Importamos la función login
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar error previo

    try {
      const response = await login({ username, password }); // Usamos la función login correctamente

      localStorage.setItem("userData", JSON.stringify(response.usuarioDTO));
      localStorage.setItem("ordenActual", JSON.stringify(response.ordenActual));
      localStorage.setItem("ordenesPagadas", JSON.stringify(response.ordenesPagadas));
      localStorage.setItem("token", response.token.token);

      console.log("Data:", response);
      
      navigate("/perfil"); // Redirigir al perfil después del login
    } catch (errorMessage) {
      setError(errorMessage); // Mostrar el mensaje de error
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar error si existe */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu correo"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center mt-3">
          ¿No tienes cuenta?{" "}
          <button className="btn btn-link p-0" onClick={() => navigate("/registro")}>
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
