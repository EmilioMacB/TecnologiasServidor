import { Router } from 'express';
import { getUsers, showUploadForm, uploadPic } from './controller';
import { authMiddleware } from '../middlewares/auth';
import {upload} from './../middlewares/upload'

const router = Router();


/**
 * @swagger
 * /users:
 *  get:
 *    tags: [Users]
 *    descripcion: listar usuarios
 *    parameters:
 *      - in: query
 *        name: token
 *        description: auth user token
 *        shcema: 
 *         type: string
 *    responses:
 *     200:
 *      description: success
 *     401:
 *      description: missing token
 */
router.get('', authMiddleware, getUsers)
router.get('/profile', showUploadForm); 
router.get('/profile', upload.single('imagen') ,uploadPic);


router.post('/profile', upload.single('imagen') ,uploadPic);
router.post('/documents', upload.single('documento') ,uploadPic);

export default router;