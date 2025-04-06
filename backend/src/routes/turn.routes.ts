import { countTodayAllTurns,countTurnsByGestorToday } from './../controllers/turn.controller';
import { Router } from 'express';
import { createTurn, getTurns } from '../controllers/turn.controller';
import { authenticateJWT, authorizeRoles} from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, authorizeRoles('admin', 'gestor'), createTurn);
router.get('/', authenticateJWT, authorizeRoles('admin', 'gestor'), getTurns);
router.get('/today', authenticateJWT, authorizeRoles('admin'), countTodayAllTurns);
router.get('/today/:id', authenticateJWT, authorizeRoles('gestor'), countTurnsByGestorToday);



export default router;
