import { Router } from 'express';
import {
  getUserStatuses,
  createUserStatus,
  updateUserStatus,
  deleteUserStatus
} from '../controllers/userstatus.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getUserStatuses);
router.post('/', authenticateJWT, authorizeRoles('admin'), createUserStatus);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateUserStatus);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteUserStatus);

export default router;
