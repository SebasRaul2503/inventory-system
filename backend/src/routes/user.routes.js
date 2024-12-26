const express = require("express");
const { loginUser, createUser } = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

//para login
router.post("/login", loginUser);

//creacion de usuarios (limitado solo a admins)
router.post("/crearUsuario", verifyToken, isAdmin, createUser);

module.exports = router;
