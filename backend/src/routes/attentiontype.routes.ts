import { Router } from 'express';
import {
  getAttentionTypes,
  createAttentionType,
  updateAttentionType,
  deleteAttentionType
} from '../controllers/attentiontype.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getAttentionTypes);
router.post('/', authenticateJWT, authorizeRoles('admin'), createAttentionType);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateAttentionType);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteAttentionType);

export default router;
