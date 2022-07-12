import { nanoid } from 'nanoid'
import { mathUtil } from '@/utils'

const DEFAULT_TEXT = 'сел на кресло стоявшее стола опустился против него на низкий тахта опершись руки колени наклонил голову внимательно стал слушать что говорил ему свободно говоривший сказал что князь хотя знает прошедшее желает от него самого узнать его историю'
const LEVEL_0_STEPS = 1000

export default class EnemiesFactory {
  private words: Array<string>

  private currentIndex = 0

  private xMax: number

  private yMax: number

  private shipX: number

  private shipY: number

  constructor(xMax: number, yMax: number, shipX: number, shipY: number) {
    this.words = DEFAULT_TEXT.replace(/[^0-9a-zA-Zа-яА-Я ]/g, '').split(' ')
    this.xMax = xMax
    this.yMax = yMax
    this.shipX = shipX
    this.shipY = shipY
  }

  getNextEnemies(count: number, gameLevel: number): Array<EnemyModel> {
    const end = this.currentIndex + count
    const result = this.words.slice(this.currentIndex, end)
    if (end > this.words.length - 1) {
      const countLeft = end - this.words.length - 1
      result.concat(this.words.slice(0, countLeft))
      this.currentIndex = countLeft
    } else {
      this.currentIndex += count
    }

    const stepsCount = LEVEL_0_STEPS - gameLevel * 3
    const enemies = result.map((word) => {
      const x = mathUtil.getRandomInt(this.xMax)
      const y = mathUtil.getRandomInt(this.yMax) - this.yMax * 2
      return {
        id: nanoid(6),
        step: 1,
        stepsCount,
        word,
        currentPoint: { x, y },
        dx: (this.shipX - x) / stepsCount,
        dy: (this.shipY - y) / stepsCount,
      }
    })

    return enemies
  }
}
