import path from 'path'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import 'babel-polyfill'
import serverRenderMiddleware from '../../server-render-middleware'
import { router } from '../rest'
import { IS_DEV } from '@/../webpack/env'
import { sequelize } from '../db'

const app = express()

async function runHmr() {
  if (IS_DEV) {
    const hmr = await import('@/hmr')
    app.use(hmr.default)
  }
}

async function runServer() {
  await runHmr()
  app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(express.json())
    .use(router)
    .use(compression())
    .use(express.static(path.resolve(__dirname, '../dist')))
    .use(express.static(path.resolve(__dirname, '../static')))
  app.get('*', serverRenderMiddleware)
}
runServer()

export { app, sequelize }
