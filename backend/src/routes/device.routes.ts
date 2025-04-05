import { Router } from 'express';
import {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice
} from '../controllers/device.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin'), getDevices);
router.post('/', authenticateJWT, authorizeRoles('admin'), createDevice);
router.put('/:id', authenticateJWT, authorizeRoles('admin'), updateDevice);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), deleteDevice);

export default router;
