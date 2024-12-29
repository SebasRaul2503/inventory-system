const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const { getAudits } = require("../controllers/audit.controller");

const router = express.Router();

/**
 * @swagger
 * /api/audit/getAudits:
 *   get:
 *     summary: Obtener registros de auditoría
 *     tags:
 *       - Auditoría
 *     security:
 *       - bearerAuth: [] # Requiere autenticación con token JWT
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 audits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idMovimiento:
 *                         type: integer
 *                         description: ID del movimiento en el historial
 *                       descripcionItem:
 *                         type: string
 *                         description: Descripción del ítem asociado
 *                       idItem:
 *                         type: integer
 *                         description: ID del ítem asociado
 *                       usuario:
 *                         type: string
 *                         description: Nombre completo del usuario que realizó el movimiento
 *                       idUsuario:
 *                         type: integer
 *                         description: ID del usuario que realizó el movimiento
 *                       fechaMovimiento:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora del movimiento
 *                       detalleMovimiento:
 *                         type: string
 *                         description: Detalle del movimiento realizado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (solo admins pueden acceder)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/getAudits", verifyToken, isAdmin, getAudits);

module.exports = router;