import { mathUtil } from 'utils'

const text = 'кот собака рука нога партизан'

export type EnemyModel = {
  word: string
  point: Point
}

export default class EnemiesStore {
  private enemies: Array<EnemyModel>

  private currentIndex = 0

  constructor(xMax: number, yMax: number) {
    const words = text.replace(/[^0-9a-zA-Zа-яА-Я ]/g, '').split(' ')
    this.enemies = words.map((word) => ({
      word,
      point: {
        x: mathUtil.getRandomInt(xMax),
        y: mathUtil.getRandomInt(yMax),
      },
    }))
  }

  getNextEnemies(count: number): Array<EnemyModel> {
    const end = this.currentIndex + count
    const result = this.enemies.slice(this.currentIndex, end)
    if (end > this.enemies.length - 1) {
      const countLeft = end - this.enemies.length - 1
      result.concat(this.enemies.slice(0, countLeft))
      this.currentIndex = countLeft
    } else {
      this.currentIndex += count
    }
    return result
  }

  shoot(letter: string) {
    const targetEnemy = this.enemies.find((enemy) => enemy.word.startsWith(letter))

    if (typeof targetEnemy === 'undefined') {
      console.log('past')
    } else {
      console.log(targetEnemy)
      targetEnemy.word = targetEnemy.word.substring(1, targetEnemy.word.length)
      console.log(targetEnemy)
    }
  }
}
