import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [resumen, setResumen] = useState({});
  const [nuevo, setNuevo] = useState({
    tipo: "",
    descripcion: "",
    monto: "",
  });

  const [editando, setEditando] = useState(null);
  // 🔹 Traer todos los movimientos
  const fetchMovimientos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/movimientos");
      setMovimientos(res.data);
    } catch (err) {
      console.error("Error al traer movimientos:", err);
    }
  };

  // 🔹 Traer resumen contable
  const fetchResumen = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/movimientos/resumen");
      setResumen(res.data);
    } catch (err) {
      console.error("Error al traer resumen:", err);
    }
  };

  // 🔹 Cargar al inicio
  useEffect(() => {
    fetchMovimientos();
    fetchResumen();
  }, []);

  // 🔹 Agregar nuevo movimiento
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!nuevo.tipo || !nuevo.descripcion || !nuevo.monto) {
    alert("Completa todos los campos");
    return;
  }

  try {
    let res; // 🔹 Defino res aquí para usarlo en todo el try

    if (editando) {
      console.log("🔹 Editando movimiento ID:", editando);
      console.log("🔹 Datos a enviar:", nuevo);

      res = await axios.put(
        `http://localhost:3001/api/movimientos/editar/${editando}`,
        nuevo
      );
    } else {
      console.log("🔹 Agregando nuevo movimiento:", nuevo);

      res = await axios.post(
        "http://localhost:3001/api/movimientos",
        nuevo
      );
    }

    console.log("✅ Respuesta del backend:", res.data);

    setEditando(null);
    setNuevo({ tipo: "", descripcion: "", monto: "" });
    fetchMovimientos();
    fetchResumen();
  } catch (err) {
    if (err.response) {
      console.error("💡 Respuesta del servidor:", err.response.data);
      console.error("💡 Status:", err.response.status);
    } else {
      console.error("💡 Error al preparar la petición:", err.message);
    }
  }
};




   const editarMovimiento = (mov) => {
    setEditando(mov.id_movimiento);
    setNuevo({
      tipo: mov.tipo,
      descripcion: mov.descripcion,
      monto: mov.monto,
    });
  };


  const cancelarEdicion = () => {
    setEditando(null);
    setNuevo({ tipo: "", descripcion: "", monto: "" });
  };








 const eliminarMovimiento = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este movimiento?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/movimientos/eliminar/${id}`);
      fetchMovimientos();
      fetchResumen();
    } catch (err) {
      console.error("Error al eliminar movimiento:", err);
    }
  };



  






  return (
  <div style={{ padding: "20px" }}>
    <h2>💰 Panel de Movimientos</h2>

    {/* 🔹 Formulario para agregar o editar */}
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <select
        value={nuevo.tipo}
        onChange={(e) => setNuevo({ ...nuevo, tipo: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      >
        <option value="">Seleccionar tipo</option>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>

      <input
        type="text"
        placeholder="Descripción"
        value={nuevo.descripcion}
        onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <input
        type="number"
        placeholder="Monto"
        value={nuevo.monto}
        onChange={(e) => setNuevo({ ...nuevo, monto: e.target.value })}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      <button type="submit" style={{ marginRight: "10px" }}>
        {editando ? "Guardar cambios" : "Agregar"}
      </button>

      {editando && (
        <button
          type="button"
          onClick={cancelarEdicion}
          style={{
            backgroundColor: "#aaa",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      )}
    </form>

    {/* 🔹 Resumen */}
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "20px",
        width: "fit-content",
      }}
    >
      <p>
        <strong>Total Ingresos:</strong> ${resumen.total_ingresos || 0}
      </p>
      <p>
        <strong>Total Gastos:</strong> ${resumen.total_gastos || 0}
      </p>
      <p>
        <strong>Saldo Actual:</strong> ${resumen.saldo || 0}
      </p>
    </div>

    {/* 🔹 Lista de movimientos */}
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Descripción</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {movimientos.map((m) => (
          <tr key={m.id_movimiento}>
            <td>{new Date(m.fecha).toLocaleString()}</td>
            <td style={{ color: m.tipo === "ingreso" ? "green" : "red" }}>
              {m.tipo}
            </td>
            <td>{m.descripcion}</td>
            <td>${m.monto}</td>
            <td>
              <button
                onClick={() => editarMovimiento(m)}
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
              >
                Editar
              </button>

              <button
                onClick={() => eliminarMovimiento(m.id_movimiento)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
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

    
};

export default AdminMovimientos;
