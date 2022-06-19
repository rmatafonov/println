type ShipOwnProps = {
    canvasContext: CanvasRenderingContext2D
    x: number
    y: number
    rectSide: number
}

export type ShipProps = React.FC<ShipOwnProps>
