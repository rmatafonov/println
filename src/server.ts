import path from 'path'
import express, { Router } from 'express'
import compression from 'compression'
import { IS_DEV } from '../webpack/env'
import 'babel-polyfill'
import serverRenderMiddleware from './server-render-middleware'
import hmr from './hmr'
import { startApp } from './db'

const app = express()

app.get('/api/v1/users/:userId/theme', (req: express.Request, resp: express.Response) => {
  console.log('userId', req.params.userId)
  resp.status(200).send('light')
})

app.post('/api/v1/users/:userId/theme', (req: express.Request, resp: express.Response) => {
  console.log('userId', req.body)
  resp.status(200).send('light')
})

if (IS_DEV) {
  app.use(hmr)
}

app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))

app.get('*', serverRenderMiddleware)

export {
  app, startApp
}
