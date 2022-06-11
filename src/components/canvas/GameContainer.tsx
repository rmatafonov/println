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
  const [enemiesStore, setEnemiesStore] = useState<EnemiesStore>()

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
    setEnemySize(height * 0.02)

    setEnemiesStore(new EnemiesStore(width, height * 0.05))

    setCanvasCtx(canvasContext)

    EventBus.getInstance().on(EnemyEvents.EnemyGotShip, () => {
      canvasContext.fillText('Ба-бах!', width / 2, height / 2)
    })
  }, [])

  useEffect(() => {
    if (typeof enemiesStore === 'undefined') {
      return
    }
    setEnemies(enemiesStore.getNextEnemies(5))
  }, [enemiesStore])

  useEffect(() => {
    if (enemies.length === 0 || typeof enemiesStore === 'undefined') {
      return
    }
    window.onkeydown = (e: KeyboardEvent) => {
      enemiesStore.shoot(e.key)
    }
  }, [enemies, enemiesStore])

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

        {enemies.map((enemyModel) => (
          <Enemy
            canvasContext={canvasCtx}
            enemyModel={enemyModel}
            rectSide={enemySize}
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
