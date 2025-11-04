const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "29deMayo.",
  database: "merceria",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 🔍 Probar conexión
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conectado correctamente a la base de datos");
    conn.release();
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:");
    console.error(err.message);
    console.error(err); // para ver el stack completo
  }
})();

module.exports = pool;
