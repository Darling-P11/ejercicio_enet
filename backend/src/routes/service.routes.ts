import { Router } from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService
} from '../controllers/service.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getServices);
router.post('/', authenticateJWT, authorizeRoles('admin'), createService);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateService);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteService);

export default router;
