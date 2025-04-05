import { Router } from 'express';
import {
  getAttentionStatuses,
  createAttentionStatus,
  updateAttentionStatus,
  deleteAttentionStatus
} from '../controllers/attentionstatus.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getAttentionStatuses);
router.post('/', authenticateJWT, authorizeRoles('admin'), createAttentionStatus);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateAttentionStatus);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteAttentionStatus);

export default router;
