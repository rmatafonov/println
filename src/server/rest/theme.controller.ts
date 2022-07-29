import { Router, Request, Response } from 'express'
import { themeService } from '@/server/service'

export const themeController = {
  find: async (req: Request, resp: Response) => {
    if (!req.query.userId) {
      resp.status(400).send('Missing required param: userId')
      return
    }

    const foundTheme = await themeService.find(req.query.userId)
    if (foundTheme !== null) {
      resp.status(200).send(foundTheme.theme)
    } else {
      resp.status(404).send(`Not found theme for user ${req.query.userId}`)
    }
  },

  createOrUpdate: async (req: Request, resp: Response) => {
    if (!req.body.userId) {
      resp.status(400).send('Missing required body parameter: userId')
      return
    }
    if (!req.body.theme) {
      resp.status(400).send('Missing required body parameter: theme')
      return
    }

    try {
      const status = themeService.createOrUpdate(
        req.body.userId,
        req.body.theme
      )
      resp.status(201).send(status)
    } catch (e) {
      resp.status(500).send('Internal server error')
    }
  }
}

export const themeRoutes = (router: Router) => {
  const themeRouter: Router = Router()

  themeRouter
    .get('/', themeController.find)
    .post('/', themeController.createOrUpdate)

  router.use('/api/v1/theme', themeRouter)
}
