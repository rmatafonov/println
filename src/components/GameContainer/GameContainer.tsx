import React, {
  ReactNode, useState, useEffect, useRef
} from 'react'

import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { Ship } from '../Ship'
import { EnemiesContainer } from '../EnemiesContainer'
import { domUtil } from '@/utils'
import { GameContainerProps } from './types'
import {
  enemiesSelector, moveEnemies, setEnemies, shoot
} from '@/redux/enemiesSlice'
import EnemiesFactory from '@/service/EnemiesFactory'

import './GameContainer.css'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { AppDispatch } from '@/redux/store/types'
import Bullet from '../Bullet/Bullet'

const FPS_60_PER_SEC = 1000 / 60

const GameContainer: GameContainerProps = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isGameLoading, setIsGameLoading] = useState(true)

  const [canvasCtx, setCanvasCtx] =
    useState<Nullable<CanvasRenderingContext2D>>(null)
  const [gameLevel] = useState(1)
  const [enemiesCount] = useState(5)
  const [shipPoint, setShipPoint] = useState<Point>({ x: 0, y: 0 })
  const [shipSize, setShipSize] = useState(0)
  const [enemySize, setEnemySize] = useState(0)
  const [enemiesFactory, setEnemiesFactory] = useState<EnemiesFactory>()
  const { bullet } = useAppSelector(enemiesSelector)

  const dispatch = useAppDispatch()
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

  useEffect(() => {
    if (isGameLoading) {
      return
    }
    startEnemies(dispatch, moveEnemies)
  }, [isGameLoading])

  let renderCharacters: ReactNode = <></>
  if (!isGameLoading && canvasCtx) {
    const handleShipKilled = () => {
      canvasCtx.fillStyle = 'red'
      canvasCtx.font = '24px helvetica'
      canvasCtx.fillText('Ба-бах!', 15, 20)
    }
    const handleEnemiesKilled = () => {
      canvasCtx.fillStyle = 'red'
      canvasCtx.font = '24px helvetica'
      canvasCtx.fillText('Всех порвал, один остался!', 15, 20)
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
        <Bullet
          canvasContext={canvasCtx}
          bullet={{
            dx: bullet.dx,
            dy: bullet.dy,
            targetWord: bullet.targetWord,
          }}
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
    <>
      <div className="blur blur_left"></div>
      <div className="blur blur_top"></div>
      <div className="blur blur_bottom"></div>
      <div className="blur blur_right"></div>
      <div className="game-container">
        <canvas ref={canvasRef} className="canvas-ship" />
        {renderCharacters}
      </div>
    </>
  )
}

export default GameContainer

function startEnemies(
  dispatch: AppDispatch,
  moveEnemiesParam: ActionCreatorWithoutPayload<string>
) {
  setTimeout(() => {
    dispatch(moveEnemies())
    startEnemies(dispatch, moveEnemiesParam)
  }, FPS_60_PER_SEC)
}
