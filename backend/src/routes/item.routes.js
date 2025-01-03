const express = require("express");
const {
  getItems,
  addItem,
  updateItem,
  getItemById,
} = require("../controllers/item.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /items/getItems:
 *   get:
 *     summary: Obtener todos los ítems
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ítems obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del ítem
 *                       ambiente:
 *                         type: string
 *                         description: Nombre del ambiente asociado
 *                       descripcion:
 *                         type: string
 *                         description: Descripción del ítem
 *                       categoria:
 *                         type: string
 *                         description: Categoría del ítem
 *                       detalle:
 *                         type: string
 *                         description: Detalle adicional del ítem
 *                       fechaAdquisicion:
 *                         type: string
 *                         format: date
 *                         description: Fecha de adquisición del ítem
 *                       precio:
 *                         type: number
 *                         format: float
 *                         description: Precio del ítem
 *                       fechaIngreso:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de ingreso del ítem
 *                       imagen:
 *                         type: string
 *                         description: URL de la imagen del ítem
 *                       estado:
 *                         type: string
 *                         description: Estado del ítem
 *                       idUgel:
 *                         type: integer
 *                         description: ID de la UGEL asociada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener ítems
 */
router.get("/getItems", verifyToken, getItems);

/**
 * @swagger
 * /items/addItem:
 *   post:
 *     summary: Agregar nuevos ítems
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: object
 *                 properties:
 *                   idAmbiente:
 *                     type: integer
 *                     description: ID del ambiente asociado
 *                   idDescripcion:
 *                     type: integer
 *                     description: ID de la descripción
 *                   detalle:
 *                     type: string
 *                     description: Detalle del ítem
 *                   idcategoria:
 *                     type: integer
 *                     description: ID de la categoría
 *                   idUgel:
 *                     type: integer
 *                     description: ID de la UGEL
 *                   fechaAdquisicion:
 *                     type: string
 *                     format: date
 *                     description: Fecha de adquisición
 *                   precio:
 *                     type: number
 *                     format: float
 *                     description: Precio del ítem
 *                   imagen:
 *                     type: string
 *                     description: URL de la imagen
 *                   estado:
 *                     type: string
 *                     description: Estado del ítem
 *               itemQuantity:
 *                 type: integer
 *                 description: Cantidad de ítems a agregar
 *     responses:
 *       201:
 *         description: Ítems agregados con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al agregar ítems
 */
router.post("/addItem", verifyToken, addItem);

/**
 * @swagger
 * /items/getItemById/{id}:
 *   get:
 *     summary: Obtener un ítem por ID
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ítem
 *     responses:
 *       200:
 *         description: Ítem obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del ítem
 *                     ambiente:
 *                       type: string
 *                       description: Nombre del ambiente asociado
 *                     descripcion:
 *                       type: string
 *                       description: Descripción del ítem
 *                     categoria:
 *                       type: string
 *                       description: Categoría del ítem
 *                     detalle:
 *                       type: string
 *                       description: Detalle adicional del ítem
 *                     fechaAdquisicion:
 *                       type: string
 *                       format: date
 *                       description: Fecha de adquisición del ítem
 *                     precio:
 *                       type: number
 *                       description: Precio del ítem
 *                     fechaIngreso:
 *                       type: string
 *                       format: date
 *                       description: Fecha de ingreso del ítem
 *                     imagen:
 *                       type: string
 *                       description: URL de la imagen del ítem
 *                     estado:
 *                       type: string
 *                       description: Estado del ítem
 *                     idUgel:
 *                       type: integer
 *                       description: ID de la UGEL asociada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener ítem
 */
router.get("/getItemById/:id", verifyToken, getItemById);

/**
 * @swagger
 * /items/updateItem:
 *   post:
 *     summary: Actualizar un ítem
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del ítem a actualizar
 *               updatedItem:
 *                 type: object
 *                 properties:
 *                   idAmbiente:
 *                     type: integer
 *                     description: ID del ambiente asociado
 *                   idDescripcion:
 *                     type: integer
 *                     description: ID de la descripción
 *                   detalle:
 *                     type: string
 *                     description: Detalle del ítem
 *                   idcategoria:
 *                     type: integer
 *                     description: ID de la categoría
 *                   idUgel:
 *                     type: integer
 *                     description: ID de la UGEL
 *                   fechaAdquisicion:
 *                     type: string
 *                     format: date
 *                     description: Fecha de adquisición
 *                   precio:
 *                     type: number
 *                     format: float
 *                     description: Precio del ítem
 *                   imagen:
 *                     type: string
 *                     description: URL de la imagen
 *                   estado:
 *                     type: string
 *                     description: Estado del ítem
 *     responses:
 *       200:
 *         description: Ítem actualizado con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al actualizar ítem
 */
router.post("/updateItem", verifyToken, updateItem);

module.exports = router;
