import { Router } from 'express';
import {
  getAttentions,
  createAttention
} from '../controllers/attention.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin', 'gestor'), getAttentions);
router.post('/', authenticateJWT, authorizeRoles('admin', 'gestor'), createAttention);

export default router;
