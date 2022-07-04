import React, { useState, useEffect } from 'react'
import { shipSvg } from '@/static/images'
import { ShipProps } from './types'
import { useAppSelector } from '@/redux/store/hooks'
import { enemiesSelector } from '@/redux/enemiesSlice'

const img: any = new Image()
img.src = shipSvg

const Ship: ShipProps = ({ canvasContext, x, y, rectSide }) => {
  const shipRect = rectSide * 0.9
  const xMax = shipRect * 0.95
  const yMax = shipRect * 0.95
  const [currentAxesAngle, _setAngle] = useState(0)
  const storeShipAngle = useAppSelector(enemiesSelector).shipAngle

  const drawShip = () => {
    canvasContext.save()

    canvasContext.beginPath()
    canvasContext.translate(x, y)
    canvasContext.clearRect(-rectSide, -rectSide, rectSide * 2, rectSide * 2)
    canvasContext.rotate((currentAxesAngle * Math.PI) / 180)
    canvasContext.drawImage(img, -xMax, -yMax, shipRect * 2, shipRect * 2)

    canvasContext.restore()
  }

  useEffect(() => {
    console.log(
      `drawing ship with angle ${currentAxesAngle}, x ${x}, y ${y}, size: ${rectSide}`
    )

    drawShip()
  }, [currentAxesAngle])

  useEffect(() => {
    drawShip()
    _setAngle(storeShipAngle)
  }, [storeShipAngle])

  return <></>
}

export default Ship
