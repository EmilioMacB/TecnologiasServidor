
import { Router } from 'express';
import { getSources, getTopHeadlines, getEverything } from '../controllers/news.controller';

const router = Router();

router.get('/sources', getSources);
router.get('/top-headlines', getTopHeadlines);
router.get('/everything', getEverything);

export default router;