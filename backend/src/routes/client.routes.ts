import { Router } from 'express';
import {
  getClients,
  createClient,
  updateClient,
  deleteClient
} from '../controllers/client.controller';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateJWT, authorizeRoles('admin', 'gestor'), getClients);
router.post('/', authenticateJWT, authorizeRoles('admin', 'gestor'), createClient);
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'gestor'), updateClient);
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'gestor'), deleteClient);

export default router;
