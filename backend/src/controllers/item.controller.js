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
    const { item, itemQuantity } = req.body;

    const userId = req.user.id;
    
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

            // Insert audit record (item)
            const insertAuditItemQuery =`
            INSERT INTO HISTORIAL_ITEM(
            ID_ELEMENTO,
            ID_AMBIENTE,
            ID_DESCRIPCION,
            ID_CATEGORIA,
            ID_USUARIO_MODIF,
            DETALLE,
            ID_UGEL,
            FECHA_ADQUISICION,
            PRECIO,
            FECHA_INGRESO,
            IMAGEN,
            ESTADO,
            FECHA_MODIF,
            ACCION
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?, ?, now(), 'Ingreso de Item');
            `
            await connection.query(insertAuditItemQuery, [
                itemId,
                item.idAmbiente,
                item.idDescripcion,
                item.idcategoria,
                userId,
                item.detalle,
                item.idUgel,
                item.fechaAdquisicion,
                item.precio,
                item.imagen,
                item.estado,
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

const updateItem = async (req, res) => {
  const { id, updatedItem, userId } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Actualizar el ítem en la tabla ITEM
    const updateItemQuery = `
      UPDATE ITEM
      SET 
        ID_AMBIENTE = ?,
        ID_DESCRIPCION = ?,
        DETALLE = ?,
        ID_CATEGORIA = ?,
        ID_UGEL = ?,
        FECHA_ADQUISICION = ?,
        PRECIO = ?,
        FECHA_INGRESO = ?,
        IMAGEN = ?,
        ESTADO = ?
      WHERE ID_ELEMENTO = ?;
    `;

    await connection.query(updateItemQuery, [
      updatedItem.idAmbiente,
      updatedItem.idDescripcion,
      updatedItem.detalle,
      updatedItem.idCategoria,
      updatedItem.idUgel,
      updatedItem.fechaAdquisicion,
      updatedItem.precio,
      updatedItem.fechaIngreso,
      updatedItem.imagen,
      updatedItem.estado,
      id, // ID del ítem a actualizar
    ]);

    // Insertar el registro en la tabla HISTORIAL_ITEM
    const insertAuditItemQuery = `
      INSERT INTO HISTORIAL_ITEM(
        ID_ELEMENTO,
        ID_AMBIENTE,
        ID_DESCRIPCION,
        ID_CATEGORIA,
        ID_USUARIO_MODIF,
        DETALLE,
        ID_UGEL,
        FECHA_ADQUISICION,
        PRECIO,
        FECHA_INGRESO,
        IMAGEN,
        ESTADO,
        FECHA_MODIF,
        ACCION
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?);
    `;

    await connection.query(insertAuditItemQuery, [
      id,
      updatedItem.idAmbiente,
      updatedItem.idDescripcion,
      updatedItem.idCategoria,
      userId,
      updatedItem.detalle,
      updatedItem.idUgel,
      updatedItem.fechaAdquisicion,
      updatedItem.precio,
      updatedItem.fechaIngreso,
      updatedItem.imagen,
      updatedItem.estado,
      "Actualizacion de Item", // Acción registrada
    ]);

    await connection.commit();

    res.status(200).json({ message: "Ítem actualizado con éxito" });
  } catch (err) {
    await connection.rollback();
    console.error("Error al actualizar ítem:", err);
    res.status(500).json({ message: "Error al actualizar ítem" });
  } finally {
    connection.release();
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();

  try {
    const [item] = await connection.query(`
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
      WHERE ITEM.ID_ELEMENTO = ?;
    `, [id]);

    res.status(200).json({ item });
  } catch (err) {
    console.error("Error al obtener ítem:", err);
    res.status(500).json({ message: "Error al obtener ítem" });
  } finally { 
    connection.release();
  }
};


  module.exports = { getItems, addItem, updateItem, getItemById };