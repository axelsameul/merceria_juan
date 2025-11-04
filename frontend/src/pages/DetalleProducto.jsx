import { useEffect, useState } from "react";
import axios from "axios";

export default function Productos({ idCategoria, destacados = false }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    let url = "http://localhost:3001/api/productos";

    if (idCategoria) {
      url += `/categoria/${idCategoria}`;
    }

    axios
      .get(url)
      .then((res) => {
        let data = res.data;

        // ✅ Si son productos destacados, mostrar solo algunos
        if (destacados) {
          data = data.slice(0, 6); // muestra los primeros 6
        }

        setProductos(data);
      })
      .catch((err) => console.error("Error al traer productos:", err));
  }, [idCategoria, destacados]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.length > 0 ? (
        productos.map((p) => (
          <div
            key={p.id_producto}
            className="bg-pink-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <img
              src={`http://localhost:3001/${p.imagen}`}
              alt={p.nombre}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-rose-800">{p.nombre}</h3>
              <p className="text-rose-600 font-bold mt-2">${p.precio}</p>
              <button className="mt-3 bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg text-sm transition-all">
                Agregar al carrito 🧵
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      )}
    </div>
  );
}
