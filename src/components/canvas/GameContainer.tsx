import React, { ReactNode, useState } from 'react'
import { useEffect, useRef } from 'react'

import EnemyEventBus from '@/service/eventBus/EnemyEventBus'
import { domUtil, mathUtil } from '@/util'
import { Enemy, Ship } from '../characters'

import './GameContainer.css'

type OwnProps = {}

type Props = React.FC<OwnProps>

const GameContainer: Props = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasCtx, setCanvasCtx] =
    useState<Nullable<CanvasRenderingContext2D>>(null)
  const [shipPoint, setShipPoint] = useState<Point>({ x: 0, y: 0 })
  const [shipSize, setShipSize] = useState(0)
  const [enemyPoint, setEnemyPoint] = useState<Point>({ x: 0, y: 0 })
  const [enemySize, setEnemySize] = useState(0)
  const [gameLevel, _setGameLevel] = useState(1)

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      //TODO: Probably using EventBus here to emit shoot event
    }

    if (!canvasRef.current) {
      throw Error('Something wrong with ref')
    }

    const canvas = canvasRef.current
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height
    const canvasContext = domUtil.getCanvasContext(canvas)

    setShipPoint({x: Math.floor(width / 2), y: height * 0.95})
    setShipSize(height * 0.05)

    setEnemyPoint({x: mathUtil.getRandomInt(width), y: mathUtil.getRandomInt(height * 0.05)})
    setEnemySize(height * 0.01)

    setCanvasCtx(canvasContext)

    EnemyEventBus.getInstance().on(EnemyEventBus.EVENTS.ENEMY_GOT_SHIP, () => {
      canvasContext.fillText('Ба-бах!', width / 2, height / 2)
    })
  }, [])

  let renderCharacters: ReactNode = <></>
  if (canvasCtx) {
    renderCharacters = (
      <>
        <Ship
          canvasContext={canvasCtx}
          x={shipPoint.x}
          y={shipPoint.y}
          rectSide={shipSize}
        />

        <Enemy
          canvasContext={canvasCtx}
          x={enemyPoint.x}
          y={enemyPoint.y}
          rectSide={enemySize}
          word='textable'
          shipX={shipPoint.x}
          shipY={shipPoint.y}
          gameLevel={gameLevel}
        />
      </>
    )
  }

  return (
    <>
      <canvas ref={canvasRef} className="canvas-ship" />
      {renderCharacters}
    </>
  )
}

export default GameContainer
