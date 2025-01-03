const express = require("express");
const { loginUser, createUser } = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión para obtener un token JWT
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: admin
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *                 token:
 *                   type: string
 *                   description: Token JWT generado
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombres:
 *                       type: string
 *                     apellidos:
 *                       type: string
 *                     usu:
 *                       type: string
 *                     rol:
 *                       type: string
 *       401:
 *         description: Usuario o contraseña incorrecta
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/crearUsuario:
 *   post:
 *     summary: Crear un nuevo usuario (solo para admins)
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 description: Nombres del nuevo usuario
 *                 example: Juan
 *               apellidos:
 *                 type: string
 *                 description: Apellidos del nuevo usuario
 *                 example: Pérez
 *               usu:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: jperez
 *               password:
 *                 type: string
 *                 description: Contraseña del nuevo usuario
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/crearUsuario", verifyToken, isAdmin, createUser);

module.exports = router;
