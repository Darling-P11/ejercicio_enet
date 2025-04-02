import { Router, Request, Response } from 'express';
import { ClientController } from '../controllers/client.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  await ClientController.create(req, res);
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  await ClientController.getAll(req, res);
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  await ClientController.delete(req, res);
});

export default router;
