import { Router, Request, Response } from 'express';
import { TurnoController } from '../controllers/turno.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  await TurnoController.crearTurno(req, res);
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  await TurnoController.listarTurnos(req, res);
});

router.put('/:id/finalizar', authMiddleware, async (req: Request, res: Response) => {
  await TurnoController.finalizarTurno(req, res);
});

export default router;

