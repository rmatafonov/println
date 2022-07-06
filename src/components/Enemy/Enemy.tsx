import React, { useEffect, useRef } from 'react'

import { enemySvg } from '@/static/images'
import { EnemyProps } from './types'

const TEXT_SIZE = 20
const TEXT_RECT_PADDING = 15

const Enemy: EnemyProps = ({ canvasContext, enemyModel, rectSide }) => {
  const img = useRef(new Image())
  img.current.src = enemySvg
  if (!enemyModel.stepsCount) {
    throw Error('Не выставлено количество шагов')
  }
  const { x, y } = enemyModel.currentPoint
  const { word } = enemyModel

  useEffect(() => {
    canvasContext.drawImage(
      img.current,
      x - rectSide,
      y - rectSide,
      rectSide * 2,
      rectSide * 2
    )
    drawText(canvasContext, x, y, word, rectSide)

    return () => {
      const size = rectSide * 1.2
      canvasContext.clearRect(x - size, y - size, size * 2, size * 2)
      clearText(canvasContext, x, y, word, rectSide)
    }
  })

  return <></>
}

export default Enemy

function clearText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  word: string,
  size: number
) {
  ctx.save()
  configureForText(ctx)
  const wordWidth = getTextWidth(ctx, word) * 1.1
  ctx.clearRect(x - wordWidth, y + size * 0.9, wordWidth * 1.1, TEXT_SIZE * 1.1)
  ctx.restore()
}

function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  word: string,
  size: number
) {
  ctx.save()
  configureForText(ctx)
  const wordWidth = getTextWidth(ctx, word)
  ctx.fillStyle = 'rgba(0, 0, 0, .7)'
  if (!word) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  }
  ctx.fillRect(x - wordWidth, y + size, wordWidth, TEXT_SIZE)
  ctx.fillStyle = '#e3d212'
  ctx.fillText(word, x - wordWidth + (TEXT_RECT_PADDING / 2), y + size)
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
