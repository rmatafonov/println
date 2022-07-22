import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
// @ts-ignore
import hotMiddleware from '@gatsbyjs/webpack-hot-middleware'
import path from 'path'
import express from 'express'
import compression from 'compression'
import { IS_DEV } from '../webpack/env'
import config from '../webpack/client.config'
import 'babel-polyfill'
import serverRenderMiddleware from './server-render-middleware'
import { dbConnect } from './server/db'

dbConnect()

const app = express()

app.get('/api/v1/theme', (_req: express.Request, resp: express.Response) => {
  resp.status(200).send('This will return theme')
})

if (IS_DEV) {
  const compiler = webpack({ ...config, mode: 'development' })
  app.use(
    devMiddleware(compiler, {
      serverSideRender: true,
      index: false,
      publicPath: config.output!.publicPath!,
    })
  )
  app.use(
    hotMiddleware(compiler, {
      path: `/__webpack_hmr`,
      log: false,
      heartbeat: 10 * 1000,
    })
  )
}

// I recommend use it only for development
// In production env you can use Nginx or CDN
app
  .use(compression())
  .use(express.static(path.resolve(__dirname, '../dist')))
  .use(express.static(path.resolve(__dirname, '../static')))

app.get('*', serverRenderMiddleware)

export { app }
