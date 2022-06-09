import React, { ReactNode, useState } from 'react'
import { useEffect, useRef } from 'react'

import { domUtil } from '@/util'
import { Enemy, Ship } from '../characters'

import './GameContainer.css'
import { EnemyModel, EnemyEvents, EventBus, EnemiesStore } from '@/service'

type OwnProps = {}

type Props = React.FC<OwnProps>

const GameContainer: Props = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasCtx, setCanvasCtx] =
    useState<Nullable<CanvasRenderingContext2D>>(null)
  const [shipPoint, setShipPoint] = useState<Point>({ x: 0, y: 0 })
  const [shipSize, setShipSize] = useState(0)
  const [enemySize, setEnemySize] = useState(0)
  const [gameLevel, _setGameLevel] = useState(1)
  const [enemies, setEnemies] = useState<Array<EnemyModel>>([])

  const enemiesStore = EnemiesStore.getInstance()

  useEffect(() => {
    if (!canvasRef.current) {
      throw Error('Something wrong with ref')
    }

    const canvas = canvasRef.current
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height
    const canvasContext = domUtil.getCanvasContext(canvas)

    setShipPoint({ x: Math.floor(width / 2), y: height * 0.93 })
    setShipSize(height * 0.05)

    setEnemies(enemiesStore.getNextEnemies(5, width, height * 0.05))
    setEnemySize(height * 0.02)

    setCanvasCtx(canvasContext)

    EventBus.getInstance().on(EnemyEvents.EnemyGotShip, () => {
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

        {enemies.map((enemy) => (
          <Enemy
            canvasContext={canvasCtx}
            x={enemy.point.x}
            y={enemy.point.y}
            rectSide={enemySize}
            word={enemy.word}
            shipX={shipPoint.x}
            shipY={shipPoint.y - shipSize / 2}
            gameLevel={gameLevel}
          />
        ))}
      </>
    )
  }

  return (
    <div className="game-container">
      <canvas ref={canvasRef} className="canvas-ship" />
      {renderCharacters}
    </div>
  )
}

export default GameContainer
