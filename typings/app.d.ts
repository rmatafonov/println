declare global {
  export type Nullable<T> = T | null
  export type Point = { x: number, y: number }

  export type EnemyModel = {
    id: string
    step: number
    stepsCount?: number
    word: string
    currentPoint: Point
    dx: number
    dy: number
  }
}

export { }
