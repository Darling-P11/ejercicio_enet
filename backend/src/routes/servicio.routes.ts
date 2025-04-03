import { Router, Request, Response } from 'express';
import { ServicioController } from '../controllers/servicio.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/servicios:
 *   post:
 *     summary: Crear nuevo servicio
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               equipos:
 *                 type: string
 *               velocidad:
 *                 type: number
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Servicio creado correctamente
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await ServicioController.crear(req, res);
  });
  
  /**
   * @swagger
   * /api/servicios:
   *   get:
   *     summary: Listar todos los servicios
   *     tags: [Servicios]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de servicios
   */
  router.get('/', authMiddleware, async (req: Request, res: Response) => {
    await ServicioController.listar(req, res);
  });

export default router;
