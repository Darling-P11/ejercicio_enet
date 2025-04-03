import { Router, Request, Response } from 'express';
import { ContratoController } from '../controllers/contrato.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  await ContratoController.crearContrato(req, res);
});

router.put('/:id/cambiar-servicio', authMiddleware, async (req: Request, res: Response) => {
  await ContratoController.cambiarServicio(req, res);
});

router.put('/:id/cambiar-pago', authMiddleware, async (req: Request, res: Response) => {
  await ContratoController.cambiarFormaPago(req, res);
});

router.put('/:id/cancelar', authMiddleware, async (req: Request, res: Response) => {
  await ContratoController.cancelarContrato(req, res);
});

export default router;
