import path from 'path'
import express from 'express'
import compression from 'compression'
import { IS_DEV } from '../webpack/env'
import 'babel-polyfill'
import serverRenderMiddleware from './server-render-middleware'
import hmr from './hmr'
import { startApp } from './db'

const app = express()

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
