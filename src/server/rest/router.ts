import { Router } from 'express';
import { themesRoutes } from './themesRouter';

const router: Router = Router();

themesRoutes(router);

export default router;
