import { EnemyEvents, EnemyModel, EventBus } from '@/service'
import { enemySvg } from '@/static/images'
import React from 'react'
import { useEffect } from 'react'
import { EnemyProps } from './types'

const img = new Image()
img.src = enemySvg

const FPS_60_PER_SEC = 1000 / 60
const LEVEL_0_STEPS = 1000

const Enemy: EnemyProps = ({
  canvasContext,
  enemyModel,
  rectSide,
  shipX,
  shipY,
  gameLevel,
}) => {
  const xMax = rectSide
  const yMax = rectSide

  useEffect(() => {
    canvasContext.save()

    canvasContext.clearRect(-xMax, -yMax, rectSide * 2, rectSide * 2)
    flyToShip(
      canvasContext,
      enemyModel,
      rectSide,
      shipX,
      shipY,
      LEVEL_0_STEPS - gameLevel * 3
    )

    canvasContext.restore()
  }, [])

  return <></>
}

export default Enemy

function flyToShip(
  ctx: CanvasRenderingContext2D,
  enemyModel: EnemyModel,
  size: number,
  shipX: number,
  shipY: number,
  stepsCount: number
) {
  const textSize = 20

  const dx = (shipX - enemyModel.point.x) / stepsCount
  const dy = (shipY - enemyModel.point.y) / stepsCount
  let currentStep = 1

  let start = performance.now()

  const redrawImage = () => {
    const x = enemyModel.point.x
    const y = enemyModel.point.y
    ctx.clearRect(x - size * 1.1, y - size * 1.2, size * 2.1, size * 2.1)
    ctx.drawImage(img, x - size, y - size, size * 2, size * 2)
  }

  const redrawText = () => {
    const x = enemyModel.point.x
    const y = enemyModel.point.y

    ctx.save()
    ctx.font = `${textSize}px helvetica`
    ctx.textBaseline = 'top'
    const wordMetrics = ctx.measureText(enemyModel.word)
    const wordWidth = wordMetrics.width

    ctx.clearRect(
      x - wordWidth * 1.1,
      y + size * 0.7,
      wordWidth * 1.1,
      textSize
    )

    ctx.fillStyle = 'black'
    ctx.fillRect(x - wordWidth, y + size, wordWidth, textSize)
    ctx.fillStyle = '#e3d212'
    ctx.fillText(enemyModel.word, x - wordWidth, y + size)
    ctx.restore()
  }

  const step = (timestamp: DOMHighResTimeStamp) => {
    const dt = timestamp - start
    if (dt < FPS_60_PER_SEC) {
      requestAnimationFrame(step)
      return
    }
    start = timestamp

    if (currentStep > stepsCount) {
      EventBus.getInstance().emit(EnemyEvents.EnemyGotShip)
      return
    }

    redrawImage()
    redrawText()

    enemyModel.point.x += dx
    enemyModel.point.y += dy
    currentStep++

    requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}
