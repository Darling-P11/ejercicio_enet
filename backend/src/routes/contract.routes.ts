import { Router } from 'express';
import {
  getContracts,
  createContract,
  updateContract,
  cancelContract
} from '../controllers/contract.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin', 'gestor'), getContracts);
router.post('/', authenticateJWT, authorizeRoles('admin', 'gestor'), createContract);
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'gestor'), updateContract);
router.put('/:id/cancel', authenticateJWT, authorizeRoles('admin', 'gestor'), cancelContract);

export default router;
