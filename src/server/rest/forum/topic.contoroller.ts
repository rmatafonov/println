import { Router, Request, Response } from 'express'

const forumsStub = [
  {
    title: 'Важное',
    comments: 1,
    date: '16.06.2022',
    id: 1,
  },
  {
    title: 'Флуд',
    comments: 1,
    date: '20.06.2022',
    id: 2,
  }
]

export const themeController = {
  getAll: async (req: Request, resp: Response) => {
    resp.status(200).send(forumsStub)
  },

  getById: async (req: Request, resp: Response) => {
    if (!req.query.forumId) {
      resp.status(400).send('Missing required param: forumId')
      return
    }
    resp.status(200).send(forumsStub.find((f) => f.id === req.query.forumId))
  },

  create: async (req: Request, resp: Response) => {
    if (!req.body.title) {
      resp.status(400).send('Missing required body object: title')
      return
    }

    resp.status(201).send('created')
  }
}

export const themeRoutes = (router: Router) => {
  const themeRouter: Router = Router()

  themeRouter
    .get('/', themeController.getAll)
    .get('/:forumId', themeController.getById)
    .post('/', themeController.create)

  router.use('/api/v1/forum', themeRouter)
}
