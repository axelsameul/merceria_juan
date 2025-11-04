import { useState } from "react";
import Categorias from "../components/Categorias";
import Productos from "../components/Productos";

export default function Home() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  return (
    <div className="bg-pink-50 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-rose-800 font-[cursive] drop-shadow-sm">
        Catálogo de Productos
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* 🩷 Panel de categorías */}
        <div className="md:w-1/3 bg-white/80 rounded-2xl shadow-md p-4 border border-pink-100">
          <h2 className="text-rose-700 text-xl font-semibold mb-4 text-center">
            Categorías
          </h2>
          <Categorias onSelectCategoria={setCategoriaSeleccionada} />
          {categoriaSeleccionada && (
            <button
              onClick={() => setCategoriaSeleccionada(null)}
              className="mt-4 w-full bg-rose-300 hover:bg-rose-400 text-white py-2 rounded-xl transition-all"
            >
              Ver productos destacados
            </button>
          )}
        </div>

        {/* 💅 Listado de productos */}
        <div className="md:w-2/3 bg-white/80 rounded-2xl shadow-md p-4 border border-pink-100">
          {categoriaSeleccionada ? (
            <>
              <h3 className="text-center text-rose-700 font-semibold text-lg mb-4">
                Productos de la categoría seleccionada
              </h3>
              <Productos idCategoria={categoriaSeleccionada} />
            </>
          ) : (
            <>
              <h3 className="text-center text-rose-700 font-semibold text-lg mb-4">
                Productos destacados 💖
              </h3>
              <Productos destacados={true} /> {/* 👈 muestra algunos al inicio */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
