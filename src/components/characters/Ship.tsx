import React, { useState } from 'react'
import { useEffect } from 'react'
import { mathUtil } from '../../util'

type OwnProps = {
  canvasContext: CanvasRenderingContext2D
  x: number
  y: number
  rectSide: number
}

type Props = React.FC<OwnProps>

const Ship: Props = ({ canvasContext, x, y, rectSide }) => {
  const xMax = rectSide
  const yMax = rectSide
  const [currentAxesAngle, setAngle] = useState(0)

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      console.log(e)
      setAngle(getRandomInt(Math.PI * 2))
    }
  }, [])

  useEffect(() => {
    console.log(
      `drawing ship with angle ${currentAxesAngle}, x ${x}, y ${y}, size: ${rectSide}`
    )

    canvasContext.save()

    canvasContext.beginPath()
    canvasContext.translate(x, y)
    canvasContext.clearRect(-xMax, -yMax, rectSide * 2, rectSide * 2)
    canvasContext.rotate(currentAxesAngle)
    drawShip(canvasContext, xMax, xMax)

    canvasContext.restore()
  }, [currentAxesAngle])

  return <></>
}

export default Ship

function drawShip(ctx: CanvasRenderingContext2D, xMax: number, yMax: number) {
  ctx.lineWidth = 2

  drawShipSide(ctx, xMax, yMax)
  ctx.scale(-1, 1)
  drawShipSide(ctx, xMax, yMax)
  drawShipIlluminator(ctx, xMax * 0.15)
}

function drawShipSide(
  ctx: CanvasRenderingContext2D,
  xMax: number,
  yMax: number
) {
  const top = yMax * 0.9
  const bottom = -yMax * 0.85
  const p1x = xMax * 0.4
  const p1y = yMax * 0.3
  const p2x = xMax * 0.7
  const p2y = yMax * 0.8

  ctx.beginPath()
  ctx.moveTo(0, top)
  ctx.bezierCurveTo(p1x, p1y, p2x, p2y, 0, bottom)
  ctx.stroke()

  const stayTopLinePointA = mathUtil.getBezierPoint(
    0.75,
    { x: 0, y: top },
    { x: p1x, y: p1x },
    { x: p2x, y: p2y },
    { x: 0, y: bottom }
  )
  const stayTopLinePointB = {
    x: xMax * Math.cos(Math.PI / 5),
    y: yMax * Math.sin(Math.PI / 5),
  }

  ctx.beginPath()
  ctx.moveTo(stayTopLinePointA.x, stayTopLinePointA.y)
  ctx.lineTo(stayTopLinePointB.x, stayTopLinePointB.y)
  ctx.stroke()

  const stayBottomLinePointA = mathUtil.getBezierPoint(
    0.95,
    { x: 0, y: top },
    { x: p1x, y: p1x },
    { x: p2x, y: p2y },
    { x: 0, y: bottom }
  )

  ctx.beginPath()
  ctx.moveTo(stayBottomLinePointA.x, stayBottomLinePointA.y)
  ctx.lineTo(stayTopLinePointB.x, stayTopLinePointB.y)
  ctx.stroke()
}

function drawShipIlluminator(ctx: CanvasRenderingContext2D, radius: number) {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, Math.PI * 2)
  ctx.closePath()
  ctx.stroke()
}

//TODO: remove when bullet class and shoot method is ready
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
