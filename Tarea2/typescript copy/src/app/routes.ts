import { Router, json } from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users/routes';
import chatRoutes from './chat/route';


const router = Router();

router.use(json());
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/chat', chatRoutes);

export default router;