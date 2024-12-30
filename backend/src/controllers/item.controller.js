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
          ITEM.ESTADO AS estado,
          ITEM.ID_UGEL AS idUgel
        FROM ITEM
        LEFT JOIN AMBIENTES ON ITEM.ID_AMBIENTE = AMBIENTES.ID_AMBIENTE
        LEFT JOIN DESCRIPCIONES ON ITEM.ID_DESCRIPCION = DESCRIPCIONES.ID_DESCRIPCION
        LEFT JOIN CATEGORIAS ON ITEM.ID_CATEGORIA = CATEGORIAS.ID_CATEGORIA
        ORDER BY ITEM.ID_ELEMENTO DESC
      `);
  
      res.status(200).json({ items });
    } catch (err) {
      console.error("Error al obtener ítems:", err);
      res.status(500).json({ message: "Error al obtener ítems" });
    }
  };

  const addItem = async (req, res) => {
    const { item, itemQuantity, userId } = req.body;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const insertItemQuery = `
          INSERT INTO ITEM (
            ID_AMBIENTE,
            ID_DESCRIPCION,
            DETALLE,
            ID_CATEGORIA,
            ID_UGEL,
            FECHA_ADQUISICION,
            PRECIO,
            FECHA_INGRESO,
            IMAGEN,
            ESTADO
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const insertAuditQuery = `
          INSERT INTO HISTORIAL_SUCESOS (
            ID_ELEMENTO,
            ID_USUARIO,
            FECHA_MOVIMIENTO,
            DETALLE_MOVIMIENTO
          ) VALUES (?, ?, ?, ?);
        `;

        for (let i = 0; i < itemQuantity; i++) {
            // Insert item
            const [itemResult] = await connection.query(insertItemQuery, [
                item.idAmbiente,
                item.idDescripcion,
                item.detalle,
                item.idcategoria,
                item.idUgel,
                item.fechaAdquisicion,
                item.precio,
                new Date(), // Current timestamp
                item.imagen,
                item.estado
            ]);

            const itemId = itemResult.insertId;

            // Insert audit record
            const auditDetail = `Usuario de ID ${userId} creó el ítem: ${item.detalle}`;
            await connection.query(insertAuditQuery, [
                itemId,
                userId,
                new Date(), // Current timestamp
                auditDetail
            ]);
        }

        await connection.commit();

        res.status(201).json({ message: "Ítems agregados con éxito" });
    } catch (err) {
        await connection.rollback();
        console.error("Error al agregar ítems:", err);
        res.status(500).json({ message: "Error al agregar ítems" });
    } finally {
        connection.release();
    }
};

  module.exports = { getItems, addItem };