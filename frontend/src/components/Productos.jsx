import { useEffect, useState } from "react";
import { getProductosPorCategoria, getProductos } from "../api/api"; // ✅ agregamos getProductos para traer todos
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

export default function Productos({ idCategoria }) {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // ✅ Si no hay categoría seleccionada → traer todos los productos
        let data;
        if (idCategoria) {
          data = await getProductosPorCategoria(idCategoria);
        } else {
          data = await getProductos();
        }
        setProductos(data);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    fetchProductos();
  }, [idCategoria]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-amber-800 mb-4">
        {idCategoria ? "Productos por categoría" : "Todos los productos disponibles 🧵"}
      </h2>

      {productos.length === 0 ? (
        <p className="text-gray-500 text-center">
          No hay productos disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productos.map((p) => (
            <div
              key={p.id}
              className="bg-amber-100 border border-amber-200 shadow-sm rounded-xl p-4 hover:shadow-lg transition-transform hover:scale-[1.03]"
            >
              <h3 className="text-lg font-bold text-amber-900 mb-2">
                {p.nombre}
              </h3>
              <p className="text-gray-700 mb-2">💲 Precio: ${p.precio}</p>

              <div className="flex gap-2">
                <Link
                  to={`/producto/${p.id}`}
                  className="bg-amber-600 text-white px-3 py-1 rounded-md hover:bg-amber-700 transition"
                >
                  Ver Detalle
                </Link>
                <button
                  onClick={() => agregarAlCarrito(p)}
                  className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                >
                  Agregar 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
