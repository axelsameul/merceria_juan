import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioGuardado);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };

  return (
    <nav className="bg-pink-200/90 backdrop-blur-md text-rose-900 px-6 py-4 shadow-lg flex justify-between items-center border-b border-pink-300">
      <div className="flex items-center space-x-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/493/493998.png"
          alt="logo"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-bold tracking-wide font-[cursive]">
          Mercería Dulce Hilo
        </h1>
      </div>

      <div className="space-x-5 flex items-center text-lg font-medium">
        <Link to="/" className="hover:text-rose-700 transition-colors duration-200">
          Inicio
        </Link>
        <Link to="/carrito" className="hover:text-rose-700 transition-colors duration-200">
          Carrito
        </Link>

        {!usuario ? (
          <Link
            to="/login"
            className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-1.5 rounded-full shadow-sm transition-all"
          >
            Iniciar sesión
          </Link>
        ) : (
          <>
            {usuario.rol === "admin" && (
              <>
                <Link
                  to="/admin"
                  className="hover:text-rose-700 transition-colors duration-200"
                >
                  Panel Admin
                </Link>
                <Link
                  to="/movimiento"
                  className="hover:text-rose-700 transition-colors duration-200"
                >
                  Movimientos
                </Link>
              </>
            )}
            <button
              onClick={handleLogout}
              className="bg-rose-300 hover:bg-rose-400 text-white px-3 py-1.5 rounded-full shadow-sm transition-all"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
