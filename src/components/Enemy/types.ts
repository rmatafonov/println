type EnemyOwnProps = {
    canvasContext: CanvasRenderingContext2D
    enemyModel: EnemyModel
    rectSide: number
    shipX: number
    shipY: number
}

export type EnemyProps = React.FC<EnemyOwnProps>
