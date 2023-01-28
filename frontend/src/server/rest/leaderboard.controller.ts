import { Router, Request, Response } from 'express'
import { leaderboardService } from '@/server/service'
import { HttpStatusCode } from './HttpStatusCodes'

export const leaderboardController = {
  findAll: async (req: Request, res: Response) => {
    if (!req.query.userId) {
      res.status(HttpStatusCode.BAD_REQUEST).send('Missing required param: userId')
      return
    }

    const allLeaderboards = await leaderboardService.findAll(req.query.userId)
    if (allLeaderboards !== null) {
      res.status(HttpStatusCode.OK).send(allLeaderboards)
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).send(`Not found theme for user ${req.query.userId}`)
    }
  },

  create: async (req: Request, res: Response) => {
    if (!req.body.params.userId) {
      res.status(HttpStatusCode.BAD_REQUEST).send('Missing required body parameter: userId')
      console.log(req.body)
      return
    }
    if (!req.body.params.date) {
      res.status(HttpStatusCode.BAD_REQUEST).send('Missing required body parameter: date')
      return
    }
    if (!req.body.params.accuracy) {
      res.status(HttpStatusCode.BAD_REQUEST).send('Missing required body parameter: accuracy')
      return
    }
    if (!req.body.params.destroyed) {
      res.status(HttpStatusCode.BAD_REQUEST).send('Missing required body parameter: destroyed')
      return
    }

    try {
      const status = leaderboardService.create(
        req.body.params.userId,
        req.body.params.date,
        req.body.params.accuracy,
        req.body.params.destroyed,
      )
      res.status(HttpStatusCode.CREATED).send(status)
    } catch (e) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send('Internal server error')
    }
  }
}

export const leaderboardRoutes = (router: Router) => {
  const leaderboardRouter: Router = Router()

  leaderboardRouter
    .get('/', leaderboardController.findAll)
    .post('/', leaderboardController.create)

  router.use('/api/v1/leaderboard', leaderboardRouter)
}
