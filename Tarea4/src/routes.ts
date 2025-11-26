import { Router } from 'express';
import { renderForm, sendSantaLetter } from './controller';

const router = Router();


router.get('/', renderForm);                // Ruta para ver el formulario
router.post('/enviar-carta', sendSantaLetter); // Ruta para procesar el envío

export default router;