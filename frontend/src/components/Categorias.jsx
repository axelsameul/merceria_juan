import { useEffect, useState } from "react";
import { getCategorias } from "../api/api";

export default function Categorias({ onSelectCategoria }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getCategorias();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  return (
    <div className="bg-amber-100 shadow-md rounded-xl p-4 border border-amber-200">
      <h2 className="text-xl font-semibold mb-3 text-amber-800">Categorías</h2>
      <select
        onChange={(e) => onSelectCategoria(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
