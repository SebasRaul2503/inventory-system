const pool = require("../config/db.config");

const getCategorias = async (_, res) => {
  try {
    const [categorias] = await pool.query("SELECT * FROM CATEGORIAS ORDER BY ID_CATEGORIA ASC;");
    res.status(200).json({ categorias });
  } catch (err) {
    console.error("Error al obtener categorías:", err);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
};

const getDescripciones = async (_, res) => {
  try {
    const [descripciones] = await pool.query("SELECT * FROM DESCRIPCIONES ORDER BY ID_DESCRIPCION ASC;");
    res.status(200).json({ descripciones });
  } catch (err) {
    console.error("Error al obtener descripciones:", err);
    res.status(500).json({ message: "Error al obtener descripciones" });
  }
};

const addDescripcion = async (req, res) => {
  const { idCategoria, nombreDescripcion } = req.body;
  const userId = req.user.id;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const insertDescripcionQuery = "INSERT INTO DESCRIPCIONES (ID_CATEGORIA, NOMBRE_DESCRIPCION) VALUES (?, ?);";
    const [result] = await connection.query(insertDescripcionQuery, [idCategoria, nombreDescripcion]);

    const descripcionId = result.insertId;

    const insertHistorialQuery = `
      INSERT INTO HISTORIAL_SUCESOS (
        ID_ELEMENTO,
        ID_USUARIO,
        FECHA_MOVIMIENTO,
        DETALLE_MOVIMIENTO
      ) VALUES (NULL, ?, NOW(), ?);
    `;
    const detalleMovimiento = `Usuario de ID ${userId} agregó la descripción: ${nombreDescripcion} (ID: ${descripcionId}) para la categoría ID: ${idCategoria}`;
    await connection.query(insertHistorialQuery, [userId, detalleMovimiento]);

    await connection.commit();
    res.status(201).json({ message: "Descripción agregada con éxito", id: descripcionId });
  } catch (err) {
    await connection.rollback();
    console.error("Error al agregar descripción:", err);
    res.status(500).json({ message: "Error al agregar descripción" });
  } finally {
    connection.release();
  }
};

const addCategoria = async (req, res) => {
  const { nombreCategoria } = req.body;
  const userId = req.user.id;
  
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const insertCategoriaQuery = "INSERT INTO CATEGORIAS (NOMBRE_CATEGORIA) VALUES (?);";
    const [result] = await connection.query(insertCategoriaQuery, [nombreCategoria]);
    
    const categoriaId = result.insertId;
    
    const insertHistorialQuery = `
      INSERT INTO HISTORIAL_SUCESOS (
        ID_ELEMENTO,
        ID_USUARIO,
        FECHA_MOVIMIENTO,
        DETALLE_MOVIMIENTO
      ) VALUES (NULL, ?, NOW(), ?);
    `;
    const detalleMovimiento = `Usuario de ID ${userId} agregó la categoría: ${nombreCategoria} (ID: ${categoriaId})`;
    await connection.query(insertHistorialQuery, [userId, detalleMovimiento]);

    await connection.commit();
    res.status(201).json({ message: "Categoría agregada con éxito", id: categoriaId });
  } catch (err) {
    await connection.rollback();
    console.error("Error al agregar categoría:", err);
    res.status(500).json({ message: "Error al agregar categoría" });
  } finally {
    connection.release();
  }
};

const getAmbientes = async (_, res) => {
  try {
    const [ambientes] = await pool.query("SELECT * FROM AMBIENTES ORDER BY NOMBRE_AMBIENTE ASC;");
    res.status(200).json({ ambientes });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener ambientes" });
  }
};

module.exports = {
  getCategorias,
  getDescripciones,
  addCategoria,
  addDescripcion,
  getAmbientes,
};
