import React, { useEffect } from 'react'

import { ScreensaverProps } from './types'

const TEXT_SIZE = 20
const TEXT_RECT_PADDING = 15

const Screensaver: ScreensaverProps = ({
  canvasContext,
  text,
  coordinates,
}) => {
  const { x, y } = coordinates

  useEffect(() => {
    drawText(canvasContext, x, y, text)
    return () => {
      clearText(canvasContext, x, y, text)
    }
  })

  return <></>
}

export default Screensaver

function clearText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  word: string
) {
  ctx.save()
  configureForText(ctx)
  const wordWidth = getTextWidth(ctx, word) * 1.1
  ctx.clearRect(x, y, wordWidth, TEXT_SIZE)
  ctx.restore()
}

function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  word: string
) {
  ctx.save()
  configureForText(ctx)
  const wordWidth = getTextWidth(ctx, word)
  ctx.fillStyle = 'rgba(0, 0, 0, .7)'
  if (!word) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  }
  ctx.fillRect(x, y, wordWidth, TEXT_SIZE)
  ctx.fillStyle = '#e3d212'
  ctx.fillText(word, x, y)
  ctx.restore()
}

function configureForText(ctx: CanvasRenderingContext2D) {
  ctx.font = `${TEXT_SIZE}px helvetica`
  ctx.textBaseline = 'top'
}

function getTextWidth(ctx: CanvasRenderingContext2D, word: string): number {
  const wordMetrics = ctx.measureText(word)
  return wordMetrics.width + TEXT_RECT_PADDING
}
