/* eslint-disable import/no-import-module-exports */
/* eslint-disable global-require */

import express from 'express'
import { findAll } from '../controllers/forum.controller'

export const ForumRoutes = (app: {
  use: (arg0: string, arg1: any) => void
}) => {
  const router = express.Router()

  router.get('/test ', findAll)

  app.use('/forum', router)
}
