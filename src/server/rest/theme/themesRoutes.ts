import { Router } from 'express';
import { themesController } from './themesController';

export const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router();

  themesRouter
    .post('/', themesController.createOrUpdate)
    .get('/', themesController.find);

  router.use('/api/v1/users/:userId/theme', themesRouter);
};
