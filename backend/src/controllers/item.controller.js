const pool = require("../config/db.config");

const getItems = async (req, res) => {
    try {
      const [items] = await pool.query(`
        SELECT 
          ITEM.ID_ELEMENTO AS id,
          AMBIENTES.NOMBRE_AMBIENTE AS ambiente,
          DESCRIPCIONES.NOMBRE_DESCRIPCION AS descripcion,
          CATEGORIAS.NOMBRE_CATEGORIA AS categoria,
          ITEM.DETALLE AS detalle,
          ITEM.FECHA_ADQUISICION AS fechaAdquisicion,
          ITEM.PRECIO AS precio,
          ITEM.FECHA_INGRESO AS fechaIngreso,
          ITEM.IMAGEN AS imagen,
          ITEM.ESTADO AS estado
        FROM ITEM
        LEFT JOIN AMBIENTES ON ITEM.ID_AMBIENTE = AMBIENTES.ID_AMBIENTE
        LEFT JOIN DESCRIPCIONES ON ITEM.ID_DESCRIPCION = DESCRIPCIONES.ID_DESCRIPCION
        LEFT JOIN CATEGORIAS ON ITEM.ID_CATEGORIA = CATEGORIAS.ID_CATEGORIA
      `);
  
      res.status(200).json({ items });
    } catch (err) {
      console.error("Error al obtener ítems:", err);
      res.status(500).json({ message: "Error al obtener ítems" });
    }
  };
  
  module.exports = { getItems };