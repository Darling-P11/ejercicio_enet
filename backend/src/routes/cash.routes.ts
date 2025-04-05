import { Router } from 'express';
import {
  getCashList,
  createCash,
  updateCash,
  deleteCash
} from '../controllers/cash.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getCashList);
router.post('/', authenticateJWT, authorizeRoles('admin'), createCash);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateCash);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteCash);

export default router;
