import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [editId, setEditId] = useState(null);

  // Traer todos los productos
  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/productos");
      setProductos(res.data);
    } catch (err) {
      console.error("Error al traer productos:", err);
    }
  };

  // Traer todas las categorías con console.log para depuración
  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/productos/categorias");
      console.log("Categorías obtenidas:", res.data); // ✅ Verifica si llegan los datos
      setCategorias(res.data);
    } catch (err) {
      console.error("Error al traer categorías:", err.message);
      console.error("Error completo:", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
        console.error("Headers:", err.response.headers);
      } else if (err.request) {
        console.error("Request hecho pero sin respuesta:", err.request);
      } else {
        console.error("Error en la configuración de Axios:", err.message);
      }
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  // Agregar o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    if (!editId) formData.append("id_categoria", idCategoria);
    if (imagen) formData.append("imagen", imagen);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3001/api/productos/editar/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:3001/api/productos/agregar",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // Limpiar campos
      setNombre("");
      setPrecio("");
      setIdCategoria("");
      setImagen(null);
      fetchProductos();
    } catch (err) {
      console.error("Error al agregar/editar producto:", err);
    }
  };

  // Preparar formulario para editar
  const handleEdit = (producto) => {
    setEditId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setIdCategoria(producto.id_categoria);
    setImagen(null);
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:3001/api/productos/eliminar/${id}`);
        fetchProductos();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Panel de Admin</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          className="border p-2 w-full"
          required
        />

        {!editId && (
          <select
            value={idCategoria}
            onChange={e => setIdCategoria(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Selecciona categoría</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        )}

        <input
          type="file"
          onChange={e => setImagen(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded">
          {editId ? "Actualizar" : "Agregar"} Producto
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-amber-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Imagen</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2">${p.precio}</td>
              <td className="border p-2">
                {p.imagen && (
                  <img
                    src={`http://localhost:3001/uploads/${p.imagen}`}
                    alt={p.nombre}
                    className="w-16 h-16 object-cover"
                  />
                )}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
