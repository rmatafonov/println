import EnemyEventBus from '@/service/eventBus/EnemyEventBus'
import React from 'react'
import { useEffect } from 'react'

type OwnProps = {
  canvasContext: CanvasRenderingContext2D
  x: number
  y: number
  rectSide: number
  word: string
  shipX: number
  shipY: number
  gameLevel: number
}

type Props = React.FC<OwnProps>

const FPS_60_PER_SEC = 1000 / 60
const LEVEL_0_STEPS = 2000

const Enemy: Props = ({
  canvasContext,
  x,
  y,
  rectSide,
  word,
  shipX,
  shipY,
  gameLevel
}) => {
  const xMax = rectSide
  const yMax = rectSide

  useEffect(() => {
    console.log(`Enemy coordinates ${x}, ${y}, radius ${rectSide}`)
  }, [])

  useEffect(() => {
    canvasContext.save()

    canvasContext.clearRect(-xMax, -yMax, rectSide * 2, rectSide * 2)
    flyToShip(
      canvasContext,
      word,
      x,
      y,
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
  word: string,
  enemyX: number,
  enemyY: number,
  size: number,
  shipX: number,
  shipY: number,
  stepsCount: number
) {
  ctx.lineWidth = 2

  const textSize = 20

  let x = enemyX
  let y = enemyY
  let currentStep = 1
  const dx = (shipX - x) / stepsCount
  const dy = (shipY - y) / stepsCount

  const wordMetrics = ctx.measureText(word)
  const wordWidth = wordMetrics.width

  let start = performance.now()
  window.requestAnimationFrame(step)

  function step(timestamp: DOMHighResTimeStamp) {
    const dt = timestamp - start
    if (dt < FPS_60_PER_SEC) {
      requestAnimationFrame(step)
      return
    }
    start = timestamp

    if (currentStep > stepsCount) {
      EnemyEventBus.getInstance().emit(EnemyEventBus.EVENTS.ENEMY_GOT_SHIP)
      return
    }

    ctx.clearRect(
      x - wordWidth * 2.2,
      y - size * 1.2,
      wordWidth * 2.1 + size * 2,
      textSize + size * 2
    )

    ctx.beginPath()
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()

    ctx.font = `${textSize}px helvetica`
    ctx.fillText(word, x - wordWidth * 2.1, y + textSize)

    x += dx
    y += dy
    currentStep++

    requestAnimationFrame(step)
  }
}
