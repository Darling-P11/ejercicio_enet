import { Router, Request, Response } from 'express';
import { ContratoController } from '../controllers/contrato.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/contratos:
 *   post:
 *     summary: Crear nuevo contrato
 *     tags: [Contratos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *               servicioId:
 *                 type: integer
 *               formaPago:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *               fechaFin:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contrato creado correctamente
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await ContratoController.crearContrato(req, res);
  });
  
  /**
   * @swagger
   * /api/contratos/{id}/cambiar-servicio:
   *   put:
   *     summary: Cambiar servicio del contrato
   *     tags: [Contratos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del contrato actual
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nuevoServicioId:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Servicio cambiado correctamente
   */
  router.put('/:id/cambiar-servicio', authMiddleware, async (req: Request, res: Response) => {
    await ContratoController.cambiarServicio(req, res);
  });
  
  /**
   * @swagger
   * /api/contratos/{id}/cambiar-pago:
   *   put:
   *     summary: Cambiar forma de pago del contrato
   *     tags: [Contratos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del contrato
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nuevaFormaPago:
   *                 type: string
   *     responses:
   *       200:
   *         description: Forma de pago actualizada
   */
  router.put('/:id/cambiar-pago', authMiddleware, async (req: Request, res: Response) => {
    await ContratoController.cambiarFormaPago(req, res);
  });
  
  /**
   * @swagger
   * /api/contratos/{id}/cancelar:
   *   put:
   *     summary: Cancelar contrato
   *     tags: [Contratos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del contrato
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fechaFin:
   *                 type: string
   *     responses:
   *       200:
   *         description: Contrato cancelado correctamente
   */
  router.put('/:id/cancelar', authMiddleware, async (req: Request, res: Response) => {
    await ContratoController.cancelarContrato(req, res);
  });

export default router;
