import { Router } from 'express'
import { forumThemesRoutes } from './forumTheme.controller';
import { themeRoutes } from './theme.controller'
import { leaderboardRoutes } from './leaderboard.controller'

const router: Router = Router()

themeRoutes(router)
forumThemesRoutes(router)
leaderboardRoutes(router)

export default router
