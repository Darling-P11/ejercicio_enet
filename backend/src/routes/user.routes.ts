import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Registro y login
router.post('/register', async (req: Request, res: Response) => {
  await UserController.register(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await UserController.login(req, res);
});

// Crear usuario (admin o gestor)
router.post('/crear', authMiddleware, async (req: Request, res: Response) => {
  await UserController.createUser(req, res);
});

// Aprobar usuario (solo admin)
router.put('/aprobar/:id', authMiddleware, async (req: Request, res: Response) => {
  await UserController.aprobarUsuario(req, res);
});

export default router;


