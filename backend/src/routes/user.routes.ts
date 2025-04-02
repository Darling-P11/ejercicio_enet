import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  await UserController.register(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await UserController.login(req, res);
});

export default router;

