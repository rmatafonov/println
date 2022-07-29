import { Router } from 'express';
import { themeRoutes } from './theme.controller';

const router: Router = Router()

themeRoutes(router)

export default router
