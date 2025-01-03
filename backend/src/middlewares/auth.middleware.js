const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

// verificacion del token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error al verificar el token:", err);
    res.status(401).json({ message: "No autorizado" });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
