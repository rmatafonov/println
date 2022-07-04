import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Request, Response } from 'express'
import App from './components/App'

export default (req: Request, res: Response) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  )
  const reactHtml = renderToString(jsx)
  res.send(getHtml(reactHtml))
}

function getHtml(reactHtml: string) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/png" href="/icons/favicon.png">
            <title>ZType</title>
            <link href="/main.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script src="/main.js"></script>
        </body>
        </html>
    `
}
