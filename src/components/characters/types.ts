import { EnemyModel } from '@/service'

type ShipOwnProps = {
    canvasContext: CanvasRenderingContext2D
    x: number
    y: number
    rectSide: number
}

export type ShipProps = React.FC<ShipOwnProps>

type EnemyOwnProps = {
    canvasContext: CanvasRenderingContext2D
    enemyModel: EnemyModel
    rectSide: number
    shipX: number
    shipY: number
    gameLevel: number
}

export type EnemyProps = React.FC<EnemyOwnProps>
