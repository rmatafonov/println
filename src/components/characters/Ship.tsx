import { shipSvg } from '@/static/images'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ShipProps } from './types'

const img = new Image()
img.src = shipSvg

const Ship: ShipProps = ({ canvasContext, x, y, rectSide }) => {
  const shipRect = rectSide * 0.9
  const xMax = shipRect * 0.95
  const yMax = shipRect * 0.95
  const [currentAxesAngle, _setAngle] = useState(0)

  useEffect(() => {
    console.log(
      `drawing ship with angle ${currentAxesAngle}, x ${x}, y ${y}, size: ${rectSide}`
    )

    canvasContext.save()

    canvasContext.beginPath()
    canvasContext.translate(x, y)
    canvasContext.clearRect(-rectSide, -rectSide, rectSide * 2, rectSide * 2)
    canvasContext.rotate(currentAxesAngle)
    canvasContext.drawImage(img, -xMax, -yMax, shipRect * 2, shipRect * 2)

    canvasContext.restore()
  }, [currentAxesAngle])

  return <></>
}

export default Ship
