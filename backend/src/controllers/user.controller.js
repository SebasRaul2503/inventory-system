const jwt = require("jsonwebtoken");
const pool = require("../config/db.config");
const { comparePassword, hashPassword } = require("../utils/encryption");

const SECRET_KEY = process.env.JWT_SECRET;

// para login del usuario
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM USUARIOS WHERE USU = ?", [
      username,
    ]);

    const user = rows[0];
    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrecta" });
    }

    const isPasswordValid = await comparePassword(password, user.PASS);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.ID_USUARIO, rol: user.ROL }, // Payload
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.ID_USUARIO,
        nombres: user.NOMBRES,
        apellidos: user.APELLIDOS,
        usu: user.USU,
        rol: user.ROL,
      },
    });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const createUser = async (req, res) => {
  const { nombres, apellidos, usu, password } = req.body;

  // Extraer userCreating desde el token decodificado
  const userCreating = req.user?.id;

  if (!userCreating) {
    return res
      .status(403)
      .json({ message: "Acceso denegado: Usuario no autenticado" });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const hashedPassword = await hashPassword(password);

    const [userResult] = await connection.query(
      "INSERT INTO USUARIOS (NOMBRES, APELLIDOS, USU, PASS, ROL) VALUES (?, ?, ?, ?, ?)",
      [nombres, apellidos, usu, hashedPassword, "user"]
    );

    const userId = userResult.insertId;

    const auditDetail = `Usuario creado: ${nombres} ${apellidos} (usuario: ${usu}) por el admin ID: ${userCreating}`;

    await connection.query(
      "INSERT INTO HISTORIAL_SUCESOS (ID_USUARIO, FECHA_MOVIMIENTO, DETALLE_MOVIMIENTO) VALUES (?, ?, ?)",
      [userCreating, new Date(), auditDetail]
    );

    await connection.commit();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (err) {
    await connection.rollback();
    console.error("Error al crear usuario:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    connection.release();
  }
};

module.exports = { loginUser, createUser };
