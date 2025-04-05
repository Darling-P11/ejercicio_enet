import { Router } from 'express';
import {
  getMethodPayments,
  createMethodPayment,
  updateMethodPayment,
  deleteMethodPayment
} from '../controllers/methodpayment.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getMethodPayments);
router.post('/', authenticateJWT, authorizeRoles('admin'), createMethodPayment);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateMethodPayment);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteMethodPayment);

export default router;
