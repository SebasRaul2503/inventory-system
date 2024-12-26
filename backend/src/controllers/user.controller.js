const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db.config");

const SECRET_KEY = process.env.JWT_SECRET;

// para login del usuario
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM USUARIOS WHERE USU = ?",
      [username]
    );

    const user = rows[0];
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.PASS);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
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

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO USUARIOS (NOMBRES, APELLIDOS, USU, PASS, ROL) VALUES (?, ?, ?, ?, ?)",
      [nombres, apellidos, usu, hashedPassword, "user"]
    );

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { loginUser, createUser };
