import { Router, Request, Response } from 'express';
import { TurnoController } from '../controllers/turno.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/turnos:
 *   post:
 *     summary: Crear un nuevo turno
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               clienteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Turno creado correctamente
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await TurnoController.crearTurno(req, res);
  });
  
  /**
   * @swagger
   * /api/turnos:
   *   get:
   *     summary: Listar todos los turnos
   *     tags: [Turnos]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de turnos
   */
  router.get('/', authMiddleware, async (req: Request, res: Response) => {
    await TurnoController.listarTurnos(req, res);
  });
  
  /**
   * @swagger
   * /api/turnos/{id}/finalizar:
   *   put:
   *     summary: Finalizar turno
   *     tags: [Turnos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del turno a finalizar
   *     responses:
   *       200:
   *         description: Turno finalizado correctamente
   */
  router.put('/:id/finalizar', authMiddleware, async (req: Request, res: Response) => {
    await TurnoController.finalizarTurno(req, res);
  });

export default router;

