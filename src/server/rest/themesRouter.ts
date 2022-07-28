import { Router } from 'express';
import ThemeAPI from './controller/ThemeAPI';

export const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router();

  themesRouter
    .post('/', ThemeAPI.create)
    .get('/', ThemeAPI.find);

  router.use('/theme', themesRouter);
};
