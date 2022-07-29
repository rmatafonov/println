import path from 'path'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import { IS_DEV } from '../webpack/env'
import 'babel-polyfill'
import serverRenderMiddleware from './server-render-middleware'
import hmr from './hmr'
// import { startApp } from './db'
import { dbConnect } from './db/init'
import { themesController } from './server/rest/theme'

dbConnect()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.json())
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))

app.get('/api/v1/users/:userId/theme', themesController.find)

app.post('/api/v1/users/:userId/theme', themesController.createOrUpdate)

if (IS_DEV) {
  app.use(hmr)
}

app.get('*', serverRenderMiddleware)

export {
  app, /* startApp */
}
