import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react'
import { Ship } from '../Ship'
import { EnemiesContainer } from '../EnemiesContainer'
import { domUtil, keyboardUtils } from '@/utils'
import { GameContainerProps } from './types'
import {
  enemiesSelector,
  moveEnemies,
  setEnemies,
  shoot,
} from '@/redux/enemiesSlice'
import EnemiesFactory from '@/service/EnemiesFactory'

import './GameContainer.css'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import Bullet from '../Bullet/Bullet'
import { Screensaver } from '../Screensaver'
import { ThemeContext } from '../context'

const GameContainer: GameContainerProps = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeContext = useContext(ThemeContext)

  const [isLevelLoading, setLevelLoading] = useState(true)
  const [showScreensaver, setShowScreensaver] = useState(false)
  const [screensaverPoint, setScreensaverPoint] = useState<Point>({
    x: 0,
    y: 0,
  })
  const [screensaverText, setScreensaverText] = useState('')

  const [canvasCtx, setCanvasCtx] =
    useState<Nullable<CanvasRenderingContext2D>>(null)
  const [gameLevel, setGameLevel] = useState(1)
  const [shipPoint, setShipPoint] = useState<Point>({ x: 0, y: 0 })
  const [shipSize, setShipSize] = useState(0)
  const [enemySize, setEnemySize] = useState(0)
  const [enemiesFactory, setEnemiesFactory] = useState<EnemiesFactory>()
  const { bullet } = useAppSelector(enemiesSelector)
  const rafIdRef = useRef(0)

  const dispatch = useAppDispatch()

  const handleKeyPress = (e: KeyboardEvent) => {
    if (keyboardUtils.isLetter(e.key)) {
      dispatch(shoot(e.key))
    } else if (keyboardUtils.isEsc(e.key)) {
      cancelAnimationFrame(rafIdRef.current)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) {
      throw Error('canvasRef не инициализировался')
    }
    console.log('Загрузка canvas')

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

    const screensaverX = Math.floor(width * 0.2)
    const screensaverY = Math.floor(height / 2)
    setScreensaverPoint({ x: screensaverX, y: screensaverY })

    setCanvasCtx(canvasContext)
  }, [])

  useEffect(() => {
    if (!enemiesFactory) {
      return undefined
    }
    console.log('Установка keydown event listener')

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [enemiesFactory])

  useEffect(() => {
    if (!enemiesFactory) {
      return
    }
    console.log('Загрузка врагов')

    const enemiesCount = 2 + gameLevel
    const enemies = enemiesFactory.getNextEnemies(enemiesCount, gameLevel)
    dispatch(setEnemies(enemies))
    setLevelLoading(false)
    setShowScreensaver(false)
  }, [enemiesFactory, gameLevel])

  const startEnemiesRaf = () => {
    dispatch(moveEnemies())
    rafIdRef.current = requestAnimationFrame(startEnemiesRaf)
  }

  useEffect(() => {
    if (isLevelLoading) {
      return undefined
    }
    console.log('Старт', gameLevel, 'уровня')
    canvasCtx?.clearRect(0, 0, 200, 200)

    startEnemiesRaf()
    return () => cancelAnimationFrame(rafIdRef.current)
  }, [isLevelLoading, gameLevel])

  let renderScreensaver = <></>
  if (showScreensaver && canvasCtx) {
    renderScreensaver = (
      <Screensaver
        canvasContext={canvasCtx}
        coordinates={screensaverPoint}
        text={screensaverText}
      ></Screensaver>
    )
  }

  let renderCharacters: ReactNode = <></>
  if (!isLevelLoading && canvasCtx) {
    const handleShipKilled = () => {
      cancelAnimationFrame(rafIdRef.current)
      setScreensaverText('Ба-бах!')
      setShowScreensaver(true)
    }
    const handleEnemiesKilled = () => {
      cancelAnimationFrame(rafIdRef.current)
      setScreensaverText('Всех порвал, один остался!')
      setShowScreensaver(true)
      setLevelLoading(true)
      setTimeout(() => {
        console.log('Level up')
        setGameLevel((currentGameLevel) => currentGameLevel + 1)
      }, 3000)
    }

    canvasCtx.shadowColor = 'rgba(0,0,0,0)'

    renderCharacters = (
      <>
        <EnemiesContainer
          canvasContext={canvasCtx}
          enemySize={enemySize}
          shipX={shipPoint.x}
          shipY={shipPoint.y - shipSize / 2}
          onEnemyGotShip={handleShipKilled}
          onAllEnemiesKilled={handleEnemiesKilled}
        />
        <Bullet
          canvasContext={canvasCtx}
          bullet={{
            dx: bullet.dx,
            dy: bullet.dy,
            targetWord: bullet.targetWord,
          }}
        />
        <Ship
          canvasContext={canvasCtx}
          x={shipPoint.x}
          y={shipPoint.y}
          rectSide={shipSize}
        />
      </>
    )
  }
  return (
    <div className='game-container'>
      <canvas ref={canvasRef} className="canvas-ship" />
      {renderCharacters}
      {renderScreensaver}
    </div>
  )
}

export default GameContainer
