import { Router, Request, Response } from 'express'
import { forumService } from '@/server/service'

export const forumThemesController = {
  getAll: async (req: Request, resp: Response) => {
    const forumThemes = await forumService.getForumsList()
    resp.status(200).send(forumThemes)
  },

  getById: async (req: Request, resp: Response) => {
    if (!req.params.id) {
      resp.status(400).send('Missing required param field: id')
      return
    }

    const forumTheme = await forumService.getForumDetails(req.params.id)
    resp.status(200).send(forumTheme)
  },

  create: async (req: Request, resp: Response) => {
    if (!req.body.userId) {
      resp.status(400).send('Missing required body field: userId')
      return
    }
    if (!req.body.title) {
      resp.status(400).send('Missing required body field: title')
      return
    }

    await forumService.createTheme(req.body.userId, req.body.title, req.body.text)

    resp.status(201).send('created')
  }
}

export const forumThemesRoutes = (router: Router) => {
  const forumThemeRouter: Router = Router()

  forumThemeRouter
    .get('/', forumThemesController.getAll)
    .get('/:id', forumThemesController.getById)
    .post('/', forumThemesController.create)

  router.use('/api/v1/forum/themes', forumThemeRouter)
}
