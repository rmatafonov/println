import path from 'path'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import 'babel-polyfill'
import serverRenderMiddleware from '../../server-render-middleware'
import { router } from '../rest'
import { sequelize } from '../db'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.json())
  .use(router)
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))

app.get('*', serverRenderMiddleware)

export { app, sequelize }
