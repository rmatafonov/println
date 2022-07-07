import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BulletModel } from '@/components/Bullet/types'
import { RootState } from './store/types'

type EnemiesState = {
  enemies?: Record<string, EnemyModel>
  targetEnemyId?: string
  bullet: BulletModel
  shipAngle: number
}

const initialState: EnemiesState = {
  bullet: {
    dx: 0,
    dy: 0,
    targetWord: null,
  },
  shipAngle: 0
}

const FPS = 60

const enemiesSlice = createSlice({
  name: 'enemies',
  initialState,
  reducers: {
    setEnemies: (state, action: PayloadAction<Array<EnemyModel>>) => {
      state.enemies = {}
      action.payload.forEach((enemy) => { state.enemies![enemy.id] = enemy })
    },
    moveEnemies: (state) => {
      if (!state.enemies) {
        console.log('Нечего двигать')
        return
      }
      const newEnemies: Record<string, EnemyModel> = {}
      Object.entries(state.enemies)
        .forEach(([id, enemy]) => {
          newEnemies[id] = {
            ...enemy,
            currentPoint: {
              x: enemy.currentPoint.x + enemy.dx,
              y: enemy.currentPoint.y + enemy.dy,
            },
            step: enemy.step + 1,
          }
        })
      state.enemies = newEnemies
    },
    destroyEnemy(state) {
      if (state.enemies) {
        const newEnemies: Record<string, EnemyModel> = {}
        Object.entries(state.enemies)
          .filter(([_id, enemy]) => Boolean(enemy.word))
          .forEach(([id, enemy]) => {
            newEnemies[id] = { ...enemy }
          })
        state.enemies = newEnemies
      }
    },
    shoot: (state, action: PayloadAction<string>) => {
      if (!state.enemies || Object.keys(state.enemies).length === 0) {
        throw Error('Не во что стрелять ¯\\_(ツ)_/¯')
      }

      const letter = action.payload

      let targetId = state.targetEnemyId
      if (!targetId) {
        targetId = Object.keys(state.enemies).find((enemyId) => state.enemies?.[enemyId].word.startsWith(letter))
      } else if (!state.enemies[targetId].word.startsWith(letter)) {
        console.log('Не попал ◔_◔')
        return
      }

      if (targetId) {
        state.targetEnemyId = targetId
        const { word } = state.enemies[targetId]
        const newWord = word.substring(1, word.length)
        state.enemies[targetId].word = newWord
        state.bullet.dx =
          state.enemies[targetId].currentPoint.x +
          state.enemies[targetId].dx * FPS
        state.bullet.dy = state.enemies[targetId].currentPoint.y + FPS
        state.bullet.targetWord = word
        const shipAngle =
          (Math.atan2(
            state.enemies[targetId].currentPoint.y,
            state.enemies[targetId].currentPoint.x
          ) *
            45) /
          Math.PI
        if (state.enemies[targetId].currentPoint.x >= 250) {
          state.shipAngle = shipAngle
        } else {
          state.shipAngle = -shipAngle
        }
        if (!newWord) {
          state.targetEnemyId = undefined
        }
      }
    },
  },
})

export const {
  setEnemies, moveEnemies, shoot, destroyEnemy
} =
  enemiesSlice.actions

export const enemiesSelector = (state: RootState) => state.enemiesSlice

export default enemiesSlice.reducer
