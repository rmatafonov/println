type EnemiesContainerOwnProps = {
  canvasContext: CanvasRenderingContext2D
  enemySize: number
  shipX: number
  shipY: number
  onEnemyGotShip: () => void
  onAllEnemiesKilled: () => void
}

export type EnemiesContainerProps = React.FC<EnemiesContainerOwnProps>
