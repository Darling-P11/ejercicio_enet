import { Router } from 'express';
import {
  getUserCash,
  assignUserCash,
  removeUserCash
} from '../controllers/usercash.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getUserCash);
router.post('/', authenticateJWT, authorizeRoles('admin'), assignUserCash);
router.delete('/:userid/:cashid', authenticateJWT, authorizeRoles('admin'), removeUserCash);

export default router;
