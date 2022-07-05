import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Request, Response } from 'express'
import Helmet, { HelmetData } from 'react-helmet'
import configureAppStore from './redux/store'
import App from './components/App'

export default (req: Request, res: Response) => {
  const store = configureAppStore()
  const helmetData = Helmet.renderStatic()
  const jsx = (
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  const reactHtml = renderToString(jsx)
  res.send(getHtml(reactHtml, store, helmetData))
}

function getHtml(reactHtml: string, appStore: any, helmetData: HelmetData) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="shortcut icon" type="image/png" href="/icons/favicon.png">
          ${helmetData.title.toString()}
          ${helmetData.meta.toString()}
          <link href="/main.css" rel="stylesheet">
        </head>
        <body>
          <script>
            window.__PRELOADED_STATE__=${JSON.stringify(appStore.getState()).replace(/</g, '\\u003c')}
          </script>
          <div id="root">${reactHtml}</div>
          <script src="/main.js"></script>
        </body>
        </html>
    `
}
