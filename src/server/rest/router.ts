import { Router } from 'express';
import { themesRoutes } from './theme/themesRoutes';

const router: Router = Router()

themesRoutes(router)

export default router
