import { Router, Request, Response } from 'express';
import { ServicioController } from '../controllers/servicio.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  await ServicioController.crear(req, res);
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  await ServicioController.listar(req, res);
});

export default router;
