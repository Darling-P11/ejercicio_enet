import { Router } from 'express';
import {
  getStatusContracts,
  createStatusContract,
  updateStatusContract,
  deleteStatusContract
} from '../controllers/statuscontract.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getStatusContracts);
router.post('/', authenticateJWT, authorizeRoles('admin'), createStatusContract);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateStatusContract);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteStatusContract);

export default router;
