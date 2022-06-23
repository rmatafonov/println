import React, {
  ReactNode, useState, useEffect, useRef
} from 'react'
// import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

import { Ship } from '../Ship'
import { EnemiesContainer } from '../EnemiesContainer'
import { domUtil } from '@/utils'
import { GameContainerProps } from './types'
import { moveEnemies, setEnemies, shoot } from '@/redux/enemiesSlice'
import EnemiesFactory from '@/service/EnemiesFactory'

import './GameContainer.css'
import { useAppDispatch } from '@/redux/store/hooks'
// import { AppDispatch } from '@/redux/store/types'

// const FPS_60_PER_SEC = 1000 / 60

const GameContainer: GameContainerProps = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isGameLoading, setIsGameLoading] = useState(true)

  const [canvasCtx, setCanvasCtx] =
    useState<Nullable<CanvasRenderingContext2D>>(null)
  const [gameLevel, _setGameLevel] = useState(1)
  const [enemiesCount, _setEnemiesCount] = useState(5)
  const [shipPoint, setShipPoint] = useState<Point>({ x: 0, y: 0 })
  const [shipSize, setShipSize] = useState(0)
  const [enemySize, setEnemySize] = useState(0)
  const [enemiesFactory, setEnemiesFactory] = useState<EnemiesFactory>()

  const dispatch = useAppDispatch()
  let rafId: number

  useEffect(() => {
    if (!canvasRef.current) {
      throw Error('canvasRef не инициализировался')
    }

    const canvas = canvasRef.current
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height
    const canvasContext = domUtil.getCanvasContext(canvas)

    const shipX = Math.floor(width / 2)
    const shipY = height * 0.93
    setShipPoint({ x: shipX, y: shipY })

    setShipSize(height * 0.05)
    setEnemySize(height * 0.02)
    setEnemiesFactory(new EnemiesFactory(width, height * 0.15, shipX, shipY))
    setCanvasCtx(canvasContext)
  }, [])

  useEffect(() => {
    if (!enemiesFactory) {
      return
    }
    const enemies = enemiesFactory.getNextEnemies(enemiesCount, gameLevel)
    dispatch(setEnemies(enemies))
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key.search(/^[A-ZА-Я][а-яa-z]/gi) !== 0) {
        dispatch(shoot(e.key))
      }
    }

    setIsGameLoading(false)
  }, [enemiesFactory])

  const startEnemiesRaf = () => {
    dispatch(moveEnemies())
    rafId = requestAnimationFrame(startEnemiesRaf)
  }

  useEffect(() => {
    if (isGameLoading) {
      return
    }
    // startEnemies(dispatch, moveEnemies)
    startEnemiesRaf()
  }, [isGameLoading])

  let renderCharacters: ReactNode = <></>
  if (!isGameLoading && canvasCtx) {
    const handleShipKilled = () => {
      canvasCtx.fillStyle = 'red'
      canvasCtx.font = `24px helvetica`
      canvasCtx.fillText('Ба-бах!', 15, 20)
      cancelAnimationFrame(rafId)
    }
    const handleEnemiesKilled = () => {
      canvasCtx.fillStyle = 'red'
      canvasCtx.font = `24px helvetica`
      canvasCtx.fillText('Всех порвал, один остался!', 15, 20)
      cancelAnimationFrame(rafId)
    }

    canvasCtx.shadowColor = 'rgba(0,0,0,0)'

    renderCharacters = (
      <>
        <Ship
          canvasContext={canvasCtx}
          x={shipPoint.x}
          y={shipPoint.y}
          rectSide={shipSize}
        />

        <EnemiesContainer
          canvasContext={canvasCtx}
          enemySize={enemySize}
          shipX={shipPoint.x}
          shipY={shipPoint.y - shipSize / 2}
          onEnemyGotShip={handleShipKilled}
          onAllEnemiesKilled={handleEnemiesKilled}
        />
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

// function startEnemies(
//   dispatch: AppDispatch,
//   moveEnemies: ActionCreatorWithoutPayload<string>
// ) {
//   setTimeout(() => {
//     dispatch(moveEnemies())
//     startEnemies(dispatch, moveEnemies)
//   }, FPS_60_PER_SEC)
// }
