import { Router } from 'express';
import {
  getPayments,
  createPayment,
  deletePayment
} from '../controllers/payment.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin', 'gestor'), getPayments);
router.post('/', authenticateJWT, authorizeRoles('admin', 'gestor'), createPayment);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deletePayment);

export default router;
