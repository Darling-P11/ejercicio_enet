import { Router, Request, Response } from 'express';
import { ClientController } from '../controllers/client.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear cliente
 *     tags: [Clientes]
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
 *               apellidos:
 *                 type: string
 *               identificacion:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               referencia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente registrado
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  await ClientController.create(req, res);
});

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Listar todos los clientes activos
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  await ClientController.getAll(req, res);
});

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar (inactivar) cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  await ClientController.delete(req, res);
});

export default router;
