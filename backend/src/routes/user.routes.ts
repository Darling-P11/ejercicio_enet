import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 */
router.post('/register', async (req: Request, res: Response) => {
  await UserController.register(req, res);
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso con token
 */
router.post('/login', async (req: Request, res: Response) => {
  await UserController.login(req, res);
});

/**
 * @swagger
 * /api/users/crear:
 *   post:
 *     summary: Crear usuario (gestor o cajero)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post('/crear', authMiddleware, async (req: Request, res: Response) => {
  await UserController.createUser(req, res);
});

/**
 * @swagger
 * /api/users/aprobar/{id}:
 *   put:
 *     summary: Aprobar usuario creado por gestor
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a aprobar
 *     responses:
 *       200:
 *         description: Usuario aprobado
 */
router.put('/aprobar/:id', authMiddleware, async (req: Request, res: Response) => {
  await UserController.aprobarUsuario(req, res);
});

export default router;
