import { Router } from 'express'
import { themeRoutes } from './theme.controller'
import { leaderboardRoutes } from './leaderboard.controller'
import { forumThemesRoutes } from './forum/forumTheme.contoroller';

const router: Router = Router()

themeRoutes(router)
forumThemesRoutes(router)
leaderboardRoutes(router)
forumThemesRoutes(router)

export default router
