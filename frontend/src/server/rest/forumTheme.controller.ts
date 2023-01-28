import { Router, Request, Response } from 'express'
import { forumService } from '@/server/service'
import { HttpStatusCode } from './HttpStatusCodes'

export const forumThemesController = {
  getAll: async (req: Request, resp: Response) => {
    const forumThemes = await forumService.getForumsList()
    resp.status(HttpStatusCode.OK).send(forumThemes)
  },

  getById: async (req: Request, resp: Response) => {
    if (!req.params.id) {
      resp.status(HttpStatusCode.BAD_REQUEST).send('Missing required param field: id')
      return
    }

    const forumTheme = await forumService.getForumDetails(req.params.id)
    resp.status(forumTheme ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND).send(forumTheme)
  },

  create: async (req: Request, resp: Response) => {
    if (!req.body.userId) {
      resp.status(HttpStatusCode.BAD_REQUEST).send('Missing required body field: userId')
      return
    }
    if (!req.body.title) {
      resp.status(HttpStatusCode.BAD_REQUEST).send('Missing required body field: title')
      return
    }

    await forumService.createTheme(req.body.userId, req.body.title, req.body.text)

    resp.status(HttpStatusCode.CREATED).send('created')
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
