import React from 'react'
import { enemiesSelector } from '@/redux/enemiesSlice'
import { useAppSelector } from '@/redux/store/hooks'
import { Enemy } from '../Enemy'
import { EnemiesContainerProps } from './types'

const EnemiesContainer: EnemiesContainerProps = ({
  canvasContext,
  enemySize,
  shipX,
  shipY,
  onEnemyGotShip,
  onAllEnemiesKilled,
}) => {
  const { enemies } = useAppSelector(enemiesSelector)
  if (!enemies) {
    console.error('Враги не инициализированы')
    return <></>
  }

  if (Object.values(enemies).length === 0) {
    onAllEnemiesKilled()
  }

  if (
    Object.values(enemies).some(
      (enemy) => enemy.stepsCount && enemy.step > enemy.stepsCount
    )
  ) {
    onEnemyGotShip()
  }

  return (
    <>
      {Object.values(enemies).map((enemyModel) => (
        <Enemy
          key={enemyModel.id}
          canvasContext={canvasContext}
          enemyModel={enemyModel}
          rectSide={enemySize}
          shipX={shipX}
          shipY={shipY}
        />
      ))}
    </>
  )
}

export default EnemiesContainer
