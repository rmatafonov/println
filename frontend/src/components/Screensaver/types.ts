type ScreensaverOwnProps = {
  canvasContext: CanvasRenderingContext2D
  text: string
  coordinates: Point
}

export type ScreensaverProps = React.FC<ScreensaverOwnProps>
