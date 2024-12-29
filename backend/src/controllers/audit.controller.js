const pool = require("../config/db.config");

const getAudits = async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT
    H.ID_MOVIMIENTO as idMovimiento,
    D.NOMBRE_DESCRIPCION AS descripcionItem,
    H.ID_ELEMENTO as idItem,
    CONCAT(U.NOMBRES, " ", U.APELLIDOS) AS usuario,
    H.ID_USUARIO as idUsuario,
    H.FECHA_MOVIMIENTO as fechaMovimiento,
    H.DETALLE_MOVIMIENTO as detalleMovimiento
    FROM HISTORIAL_SUCESOS H
    LEFT JOIN ITEM I ON H.ID_ELEMENTO = I.ID_ELEMENTO
    LEFT JOIN USUARIOS U ON H.ID_USUARIO = U.ID_USUARIO
    LEFT JOIN DESCRIPCIONES D ON I.ID_DESCRIPCION = D.ID_DESCRIPCION;`
      );

      res.status(200).json({ audits: rows });
    } catch (err) {
      console.error("Error al obtener registros de Auditoria:", err);
      res.status(500).json({ message: "Error al obtener registros de Auditoria" }); 
    }    
};

module.exports = { getAudits };