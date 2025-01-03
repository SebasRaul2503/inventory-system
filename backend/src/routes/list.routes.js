const express = require("express");
const {
  getCategorias,
  getDescripciones,
  addCategoria,
  addDescripcion,
  getAmbientes
} = require("../controllers/list.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /list/getCategorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Recupera todas las categorías disponibles en la base de datos.
 *     tags:
 *       - Categorías
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categorias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID_CATEGORIA:
 *                         type: integer
 *                         example: 1
 *                       NOMBRE_CATEGORIA:
 *                         type: string
 *                         example: Electrónica
 *       401:
 *         description: Token no válido o no autorizado.
 *       500:
 *         description: Error al obtener categorías.
 */
router.get("/getCategorias", verifyToken, getCategorias);

/**
 * @swagger
 * /list/getDescripciones:
 *   get:
 *     summary: Obtener todas las descripciones
 *     description: Recupera todas las descripciones disponibles en la base de datos.
 *     tags:
 *       - Descripciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de descripciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 descripciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID_DESCRIPCION:
 *                         type: integer
 *                         example: 1
 *                       ID_CATEGORIA:
 *                         type: integer
 *                         example: 1
 *                       NOMBRE_DESCRIPCION:
 *                         type: string
 *                         example: Laptop
 *       401:
 *         description: Token no válido o no autorizado.
 *       500:
 *         description: Error al obtener descripciones.
 */
router.get("/getDescripciones", verifyToken, getDescripciones);

/**
 * @swagger
 * /list/addCategoria:
 *   post:
 *     summary: Agregar una nueva categoría
 *     description: Agrega una nueva categoría a la base de datos y registra la acción en el historial.
 *     tags:
 *       - Categorías
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *                 example: Electrónica
 *     responses:
 *       201:
 *         description: Categoría agregada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoría agregada con éxito
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Datos de entrada no válidos.
 *       401:
 *         description: Token no válido o no autorizado.
 *       500:
 *         description: Error al agregar la categoría.
 */
router.post("/addCategoria", verifyToken, isAdmin, addCategoria);

/**
 * @swagger
 * /list/addDescripcion:
 *   post:
 *     summary: Agregar una nueva descripción
 *     description: Agrega una nueva descripción asociada a una categoría y registra la acción en el historial.
 *     tags:
 *       - Descripciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCategoria:
 *                 type: integer
 *                 example: 1
 *               nombreDescripcion:
 *                 type: string
 *                 example: Laptop
 *     responses:
 *       201:
 *         description: Descripción agregada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Descripción agregada con éxito
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Datos de entrada no válidos.
 *       401:
 *         description: Token no válido o no autorizado.
 *       500:
 *         description: Error al agregar la descripción.
 */
router.post("/addDescripcion", verifyToken, isAdmin, addDescripcion);

/**
 * @swagger
 * /list/getAmbientes:
 *   get:
 *     summary: Obtener todas los ambientes
 *     description: Recupera todas los ambientes disponibles en la base de datos.
 *     tags:
 *       - Ambientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ambientes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ambientes:
 *                   type: array  
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID_AMBIENTE:
 *                         type: integer
 *                         example: 1
 *                       NOMBRE_AMBIENTE:
 *                         type: string
 *                         example: Ambiente 1
 *       401:
 *         description: Token no válido o no autorizado.
 *       500:
 *         description: Error al obtener ambientes.
 */
router.get("/getAmbientes", verifyToken, getAmbientes);

module.exports = router;
