import { Router } from 'express';
import { registerUser } from '../controllers/user.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';
import {
  getAllUsers,
  getPendingUsers,
  approveUser, updateUser, deactivateUser
} from '../controllers/user.controller';


const router = Router();

router.post(
  '/register',
  authenticateJWT,
  authorizeRoles('admin', 'gestor'),
  registerUser
);

router.get(
  '/',
  authenticateJWT,
  authorizeRoles('admin'),
  getAllUsers
);

router.get(
  '/pending',
  authenticateJWT,
  authorizeRoles('admin', 'gestor'),
  getPendingUsers
);

router.put(
  '/:id/approve',
  authenticateJWT,
  authorizeRoles('admin'),
  approveUser
);

router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  updateUser
);

router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  deactivateUser
);



export default router;

