import { Router, Request, Response } from 'express'
import { leaderboardService } from '@/server/service'

export const leaderboardController = {
  findAll: async (req: Request, res: Response) => {
    if (!req.query.userId) {
      res.status(400).send('Missing required param: userId')
      return
    }

    const allLeaderboards = await leaderboardService.findAll(req.query.userId)
    if (allLeaderboards !== null) {
      res.status(200).send(allLeaderboards)
    } else {
      res.status(400).send(`Not found theme for user ${req.query.userId}`)
    }
  },

  create: async (req: Request, res: Response) => {
    if (!req.body.params.userId) {
      res.status(400).send('Missing required body parameter: userId')
      console.log(req.body)
      return
    }
    if (!req.body.params.date) {
      res.status(400).send('Missing required body parameter: date')
      return
    }
    if (!req.body.params.accuracy) {
      res.status(400).send('Missing required body parameter: accuracy')
      return
    }
    if (!req.body.params.destroyed) {
      res.status(400).send('Missing required body parameter: destroyed')
      return
    }

    try {
      const status = leaderboardService.create(
        req.body.params.userId,
        req.body.params.date,
        req.body.params.accuracy,
        req.body.params.destroyed,
      )
      res.status(201).send(status)
    } catch (e) {
      res.status(500).send('Internal server error')
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
