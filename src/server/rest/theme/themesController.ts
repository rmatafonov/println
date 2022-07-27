import { Request, Response } from 'express'
import { themeService } from '@/server/service'

export const themesController = {
  find: async (req: Request, resp: Response) => {
    console.log(req.params)
    const foundTheme = await themeService.find(req.params.userId)
    if (foundTheme !== null) {
      resp.status(200).send(foundTheme.theme)
    } else {
      resp.status(404).send(`Not found theme for user ${req.params.userId}`)
    }
  },

  createOrUpdate: async (req: Request, resp: Response) => {
    try {
      const status = themeService.createOrUpdate(
        req.params.userId,
        req.body.theme
      )
      resp.status(201).send(status)
    } catch (e) {
      resp.status(500).send('Internal server error')
    }
  }
}
