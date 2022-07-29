import { Router } from 'express'
import { themeRoutes } from './theme.controller'
import { leaderboardRoutes } from './leaderboard.controller'

const router: Router = Router()

themeRoutes(router)
leaderboardRoutes(router)

export default router
