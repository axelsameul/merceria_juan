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
      await axios.post("http://localhost:3001/api/movimientos", nuevo);
      setNuevo({ tipo: "", descripcion: "", monto: "" });
      fetchMovimientos();
      fetchResumen();
    } catch (err) {
      console.error("Error al agregar movimiento:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 Panel de Movimientos</h2>

      {/* 🔹 Formulario para agregar */}
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

        <button type="submit">Agregar</button>
      </form>

      {/* 🔹 Resumen */}
      <div style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "20px",
        width: "fit-content"
      }}>
        <p><strong>Total Ingresos:</strong> ${resumen.total_ingresos || 0}</p>
        <p><strong>Total Gastos:</strong> ${resumen.total_gastos || 0}</p>
        <p><strong>Saldo Actual:</strong> ${resumen.saldo || 0}</p>
      </div>

      {/* 🔹 Lista de movimientos */}
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Monto</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMovimientos;
