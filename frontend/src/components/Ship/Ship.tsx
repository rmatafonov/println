import React, { useState, useEffect, useRef } from 'react'
import { shipSvg } from '@/static/images'
import { ShipProps } from './types'
import { useAppSelector } from '@/redux/store/hooks'
import { enemiesSelector } from '@/redux/enemiesSlice'

const Ship: ShipProps = ({ canvasContext, x, y, rectSide }) => {
  const img = useRef(new Image())
  img.current.src = shipSvg
  const shipRect = rectSide * 0.9
  const xMax = shipRect * 0.95
  const yMax = shipRect * 0.95
  const [currentAxesAngle, setAngle] = useState(0)
  const storeShipAngle = useAppSelector(enemiesSelector).shipAngle

  const drawShip = () => {
    canvasContext.save()

    canvasContext.beginPath()
    canvasContext.translate(x, y)
    canvasContext.clearRect(-rectSide, -rectSide, rectSide * 2, rectSide * 2)
    canvasContext.rotate((currentAxesAngle * Math.PI) / 180)
    canvasContext.drawImage(img.current, -xMax, -yMax, shipRect * 2, shipRect * 2)

    canvasContext.restore()
  }

  useEffect(() => {
    drawShip()
  }, [currentAxesAngle])

  useEffect(() => {
    drawShip()
    setAngle(storeShipAngle)
  }, [storeShipAngle])

  return <></>
}

export default Ship
