import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import AdminMovimientos from "./pages/AdminMovimientos";
import { CarritoProvider } from "./context/CarritoContext";
import Navbar from "./components/Navbar"; // ✅ Importamos el navbar que ya creaste

function App() {
  // 🧠 Verificamos si hay usuario logueado
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <CarritoProvider>
      <div className="min-h-screen bg-amber-100 text-gray-800 flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow max-w-5xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />

            {/* 🔒 Rutas protegidas solo para ADMIN */}
            {usuario?.rol === "admin" && (
              <>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/movimiento" element={<AdminMovimientos />} />
              </>
            )}
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-amber-700 text-white py-4 mt-10 text-center">
          © 2025 Mercería Dulce Hilo — Todos los derechos reservados
        </footer>
      </div>
    </CarritoProvider>
  );
}

export default App;
