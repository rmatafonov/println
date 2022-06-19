import React from 'react'

import { enemySvg } from '@/static/images'
import { EnemyProps } from './types'

const img = new Image()
img.src = enemySvg

const TEXT_SIZE = 20

const Enemy: EnemyProps = ({
  canvasContext,
  enemyModel,
  rectSide,
}) => {
  if (!enemyModel.stepsCount) {
    throw Error('Не выставлено количество шагов')
  }

  canvasContext.save()
  redrawImage(canvasContext, enemyModel, rectSide)
  redrawText(canvasContext, enemyModel, rectSide)
  canvasContext.restore()

  return <></>
}

export default Enemy

function redrawImage(
  ctx: CanvasRenderingContext2D,
  enemyModel: EnemyModel,
  size: number
) {
  const x = enemyModel.currentPoint.x
  const y = enemyModel.currentPoint.y
  ctx.clearRect(x - size * 1.1, y - size * 1.2, size * 2.1, size * 2.1)
  ctx.drawImage(img, x - size, y - size, size * 2, size * 2)
}

function redrawText(
  ctx: CanvasRenderingContext2D,
  enemyModel: EnemyModel,
  size: number
) {
  const x = enemyModel.currentPoint.x
  const y = enemyModel.currentPoint.y

  ctx.save()
  ctx.font = `${TEXT_SIZE}px helvetica`
  ctx.textBaseline = 'top'
  const wordMetrics = ctx.measureText(enemyModel.word)
  const wordWidth = wordMetrics.width

  ctx.clearRect(x - wordWidth * 1.1, y + size * 0.7, wordWidth * 1.1, TEXT_SIZE)

  ctx.fillStyle = 'black'
  ctx.fillRect(x - wordWidth, y + size, wordWidth, TEXT_SIZE)
  ctx.fillStyle = '#e3d212'
  ctx.fillText(enemyModel.word, x - wordWidth, y + size)
  ctx.restore()
}
