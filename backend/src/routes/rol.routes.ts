import { Router } from 'express';
import {
  getRoles,
  createRol,
  updateRol,
  deleteRol
} from '../controllers/rol.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getRoles);
router.post('/', authenticateJWT, authorizeRoles('admin'), createRol);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateRol);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteRol);

export default router;
