import path from 'path'
import express from 'express'
import compression from 'compression'
import { IS_DEV } from '../webpack/env'
import 'babel-polyfill'
import serverRenderMiddleware from './server-render-middleware'
import hmr from './hmr'
// import { startApp } from './db'

const app = express()

app.get('/api/v1/theme', (_req: express.Request, resp: express.Response) => {
  resp.status(200).send('This will return theme')
})

// I recommend use it only for development
// In production env you can use Nginx or CDN

if (IS_DEV) {
  app.use(hmr)
}

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))

app.get('*', serverRenderMiddleware)

export {
  app, /* startApp */
}
