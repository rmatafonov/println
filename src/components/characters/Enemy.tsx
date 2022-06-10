import { EnemyEvents, EnemyModel, EventBus } from '@/service'
import React from 'react'
import { useEffect } from 'react'

const img = new Image()
img.src =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSI+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkQ5ODA4OyIgZD0iTTI1NSwzMTQuNzMzYy03NS45NDcsMC0xNDMuMzYtOS4zODctMTg4LjU4Ny0yMy44OTNDOTAuMzA3LDM0My43NDcsMTY1LjQsMzgzLDI1NSwzODMKCQlzMTY0LjY5My0zOS4yNTMsMTg4LjU4Ny05Mi4xNkMzOTguMzYsMzA1LjM0NywzMzAuMDkzLDMxNC43MzMsMjU1LDMxNC43MzMiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkREMDk7IiBkPSJNMjM4Ljc4NywzMTQuNzMzYy02NC44NTMsMC0xMjMuNzMzLTkuMzg3LTE2Mi45ODctMjMuODkzQzk2LjI4LDM0My43NDcsMTYxLjEzMywzODMsMjM4Ljc4NywzODMKCQlzMTQyLjUwNy0zOS4yNTMsMTYyLjk4Ny05Mi4xNkMzNjIuNTIsMzA1LjM0NywzMDMuNjQsMzE0LjczMywyMzguNzg3LDMxNC43MzMiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMTEzLjM0NywzMDIuNzg3YzI0Ljc0Nyw0NS4yMjcsODEuOTIsNzcuNjUzLDE1MC4xODcsODAuMjEzYy0yLjU2LDAtNS45NzMsMC04LjUzMywwCgkJYy04OS42LDAtMTY0LjY5My0zOS4yNTMtMTg4LjU4Ny05Mi4xNkM4MC4wNjcsMjk1LjEwNyw5Ni4yOCwyOTkuMzczLDExMy4zNDcsMzAyLjc4NyIvPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGREQwOTsiIGQ9Ik0zODIuMTQ3LDE4Ny41ODdjMCwzLjQxMywwLjg1Myw1Ljk3MywwLjg1Myw5LjM4N2MwLDEuNzA3LDAsMy40MTMsMCw2LjgyN2wtMzEuNTczLDEwLjI0CgkJCWMtNjMuMTQ3LDIwLjQ4LTEzMC41NiwyMC40OC0xOTMuNzA3LDBMMTI3LDIwMy44YzAtMy40MTMsMC01LjEyLDAtNi44MjdjMC0zLjQxMywwLTUuOTczLDAuODUzLTkuMzg3CgkJCWMtNzEuNjgsMTEuOTQ3LTEyMC4zMiwzNC4xMzMtMTIwLjMyLDU4Ljg4YzAsMzcuNTQ3LDExMC45MzMsNjguMjY3LDI0Ny40NjcsNjguMjY3czI0Ny40NjctMzAuNzIsMjQ3LjQ2Ny02OC4yNjcKCQkJQzUwMi40NjcsMjIxLjcyLDQ1My44MjcsMTk5LjUzMywzODIuMTQ3LDE4Ny41ODciLz4KCQk8cG9seWdvbiBzdHlsZT0iZmlsbDojRkZERDA5OyIgcG9pbnRzPSIyMzcuOTMzLDQxLjY2NyAyNzIuMDY3LDQxLjY2NyAyNzIuMDY3LDcuNTMzIDIzNy45MzMsNy41MzMgCQkiLz4KCTwvZz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRDk4MDg7IiBkPSJNMzgzLDIwMy44YzAtNzAuODI3LTU3LjE3My0xMTkuNDY3LTEyOC0xMTkuNDY3UzEyNywxMzIuOTczLDEyNywyMDMuOGwzMS41NzMsMTAuMjQKCQljNjMuMTQ3LDIwLjQ4LDEzMC41NiwyMC40OCwxOTMuNzA3LDBMMzgzLDIwMy44eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGREQwOTsiIGQ9Ik0zNTcuNCwyMDMuOGMwLTcwLjgyNy01MS4yLTExOS40NjctMTE1LjItMTE5LjQ2N1MxMjcsMTMyLjk3MywxMjcsMjAzLjhsMjguMTYsMTAuMjQKCQljNTYuMzIsMjAuNDgsMTE3Ljc2LDIwLjQ4LDE3NC4wOCwwTDM1Ny40LDIwMy44eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yNTYuNzA3LDg0LjMzM2MyLjU2LDAsNC4yNjcsMCw2LjgyNywwYy02MC41ODcsMy40MTMtMTA5LjIyNyw1MS4yLTEwOS4yMjcsMTE5LjQ2N2wyOC4xNiwxMC4yNAoJCWMyNi40NTMsOS4zODcsNTMuNzYsMTQuNTA3LDgxLjA2NywxNS4zNmMtMzQuOTg3LDAuODUzLTY5Ljk3My00LjI2Ny0xMDMuMjUzLTE1LjM2bC0zMS41NzMtMTAuMjQKCQlDMTI4LjcwNywxMzIuOTczLDE4NS44OCw4NC4zMzMsMjU2LjcwNyw4NC4zMzMiLz4KCTxwYXRoIGQ9Ik0yNjMuNTMzLDQ1OS44YzAsNS4xMi0zLjQxMyw4LjUzMy04LjUzMyw4LjUzM3MtOC41MzMtMy40MTMtOC41MzMtOC41MzNzMy40MTMtOC41MzMsOC41MzMtOC41MzMKCQlTMjYzLjUzMyw0NTQuNjgsMjYzLjUzMyw0NTkuOCIvPgoJPHBhdGggZD0iTTI1NSw0MzQuMmMtNS4xMiwwLTguNTMzLTMuNDEzLTguNTMzLTguNTMzdi04LjUzM2MwLTUuMTIsMy40MTMtOC41MzMsOC41MzMtOC41MzNzOC41MzMsMy40MTMsOC41MzMsOC41MzN2OC41MzMKCQlDMjYzLjUzMyw0MzAuNzg3LDI2MC4xMiw0MzQuMiwyNTUsNDM0LjJ6Ii8+Cgk8cGF0aCBkPSJNMjU1LDUxMWMtNS4xMiwwLTguNTMzLTMuNDEzLTguNTMzLTguNTMzdi04LjUzM2MwLTUuMTIsMy40MTMtOC41MzMsOC41MzMtOC41MzNzOC41MzMsMy40MTMsOC41MzMsOC41MzN2OC41MzMKCQlDMjYzLjUzMyw1MDcuNTg3LDI2MC4xMiw1MTEsMjU1LDUxMXoiLz4KCTxwYXRoIGQ9Ik0zMDYuMiw0MzQuMmMtNS4xMiwwLTguNTMzLTMuNDEzLTguNTMzLTguNTMzVjQwOC42YzAtNS4xMiwzLjQxMy04LjUzMyw4LjUzMy04LjUzM3M4LjUzMywzLjQxMyw4LjUzMyw4LjUzM3YxNy4wNjcKCQlDMzE0LjczMyw0MzAuNzg3LDMxMS4zMiw0MzQuMiwzMDYuMiw0MzQuMnoiLz4KCTxwYXRoIGQ9Ik0zMDYuMiw0OTMuOTMzYy01LjEyLDAtOC41MzMtMy40MTMtOC41MzMtOC41MzN2LTI1LjZjMC01LjEyLDMuNDEzLTguNTMzLDguNTMzLTguNTMzczguNTMzLDMuNDEzLDguNTMzLDguNTMzdjI1LjYKCQlDMzE0LjczMyw0OTAuNTIsMzExLjMyLDQ5My45MzMsMzA2LjIsNDkzLjkzM3oiLz4KCTxwYXRoIGQ9Ik0yMDMuOCw1MDIuNDY3Yy01LjEyLDAtOC41MzMtMy40MTMtOC41MzMtOC41MzN2LTI1LjZjMC01LjEyLDMuNDEzLTguNTMzLDguNTMzLTguNTMzYzUuMTIsMCw4LjUzMywzLjQxMyw4LjUzMyw4LjUzMwoJCXYyNS42QzIxMi4zMzMsNDk5LjA1MywyMDguOTIsNTAyLjQ2NywyMDMuOCw1MDIuNDY3eiIvPgoJPHBhdGggZD0iTTIwMy44LDQ0Mi43MzNjLTUuMTIsMC04LjUzMy0zLjQxMy04LjUzMy04LjUzM3YtMjUuNmMwLTUuMTIsMy40MTMtOC41MzMsOC41MzMtOC41MzNjNS4xMiwwLDguNTMzLDMuNDEzLDguNTMzLDguNTMzCgkJdjI1LjZDMjEyLjMzMyw0MzkuMzIsMjA4LjkyLDQ0Mi43MzMsMjAzLjgsNDQyLjczM3oiLz4KCTxwYXRoIGQ9Ik0xODYuNzMzLDE4Ni43MzNjLTUuMTIsMC04LjUzMy0zLjQxMy04LjUzMy04LjUzM2MwLTMzLjI4LDI2LjQ1My01OS43MzMsNTkuNzMzLTU5LjczM2M1LjEyLDAsOC41MzMsMy40MTMsOC41MzMsOC41MzMKCQlzLTMuNDEzLDguNTMzLTguNTMzLDguNTMzYy0yMy44OTMsMC00Mi42NjcsMTguNzczLTQyLjY2Nyw0Mi42NjdDMTk1LjI2NywxODMuMzIsMTkxLjg1MywxODYuNzMzLDE4Ni43MzMsMTg2LjczM3oiLz4KCTxwYXRoIGQ9Ik0yNTUsMzkxLjUzM2MtOTEuMzA3LDAtMTcwLjY2Ny0zOS4yNTMtMTk2LjI2Ny05Ny4yOGwtNy42OC0xNy4wNjdsMTcuOTIsNS45NzNDMTE1LjkwNywyOTcuNjY3LDE4My4zMiwzMDYuMiwyNTUsMzA2LjIKCQlzMTM5LjA5My04LjUzMywxODYuMDI3LTIzLjg5M2wxNy45Mi01Ljk3M2wtNy42OCwxNy4wNjdDNDI1LjY2NywzNTIuMjgsMzQ2LjMwNywzOTEuNTMzLDI1NSwzOTEuNTMzeiBNODQuMzMzLDMwNC40OTMKCQljMzAuNzIsNDEuODEzLDk2LjQyNyw2OS45NzMsMTcwLjY2Nyw2OS45NzNjNzMuMzg3LDAsMTM5Ljk0Ny0yOC4xNiwxNzAuNjY3LTY5Ljk3M2MtNDYuMDgsMTEuOTQ3LTEwNy41MiwxOC43NzMtMTcwLjY2NywxOC43NzMKCQlTMTMwLjQxMywzMTYuNDQsODQuMzMzLDMwNC40OTN6Ii8+Cgk8cGF0aCBkPSJNMjU1LDIzNy45MzNjLTMzLjI4LDAtNjcuNDEzLTUuMTItOTguOTg3LTE2LjIxM2wtMzcuNTQ3LTExLjk0N1YyMDMuOGMwLTczLjM4Nyw1OC44OC0xMjgsMTM2LjUzMy0xMjgKCQlzMTM2LjUzMyw1NC42MTMsMTM2LjUzMywxMjh2NS45NzNsLTM3LjU0NywxMi44QzMyMi40MTMsMjMyLjgxMywyODguMjgsMjM3LjkzMywyNTUsMjM3LjkzM3ogTTEzNS41MzMsMTk3LjgyN2wyNS42LDguNTMzCgkJYzYwLjU4NywyMC40OCwxMjcuMTQ3LDIwLjQ4LDE4Ny43MzMsMGwyNS42LTguNTMzQzM3MS4wNTMsMTM3LjI0LDMyMC43MDcsOTIuODY3LDI1NSw5Mi44NjdTMTM4Ljk0NywxMzcuMjQsMTM1LjUzMywxOTcuODI3eiIvPgoJPHBhdGggZD0iTTI3Mi4wNjcsNTAuMmgtMzQuMTMzbC04LjUzMy04LjUzM1Y3LjUzM0wyMzcuOTMzLTFoMzQuMTMzbDguNTMzLDguNTMzdjM0LjEzM0wyNzIuMDY3LDUwLjJ6IE0yNDYuNDY3LDMzLjEzM2gxNy4wNjcKCQlWMTYuMDY3aC0xNy4wNjdWMzMuMTMzeiIvPgoJPHBhdGggZD0iTTI1NSw5Mi44NjdjLTUuMTIsMC04LjUzMy0zLjQxMy04LjUzMy04LjUzM1Y0MS42NjdjMC01LjEyLDMuNDEzLTguNTMzLDguNTMzLTguNTMzczguNTMzLDMuNDEzLDguNTMzLDguNTMzdjQyLjY2NwoJCUMyNjMuNTMzLDg5LjQ1MywyNjAuMTIsOTIuODY3LDI1NSw5Mi44Njd6Ii8+Cgk8cGF0aCBkPSJNMjYzLjUzMywyNzIuMDY3YzAsNS4xMi0zLjQxMyw4LjUzMy04LjUzMyw4LjUzM3MtOC41MzMtMy40MTMtOC41MzMtOC41MzNzMy40MTMtOC41MzMsOC41MzMtOC41MzMKCQlTMjYzLjUzMywyNjYuOTQ3LDI2My41MzMsMjcyLjA2NyIvPgoJPHBhdGggZD0iTTM0MC4zMzMsMjYzLjUzM2MwLDUuMTItMy40MTMsOC41MzMtOC41MzMsOC41MzNzLTguNTMzLTMuNDEzLTguNTMzLTguNTMzYzAtNS4xMiwzLjQxMy04LjUzMyw4LjUzMy04LjUzMwoJCVMzNDAuMzMzLDI1OC40MTMsMzQwLjMzMywyNjMuNTMzIi8+Cgk8cGF0aCBkPSJNNDA4LjYsMjQ2LjQ2N2MwLDUuMTItMy40MTMsOC41MzMtOC41MzMsOC41MzNzLTguNTMzLTMuNDEzLTguNTMzLTguNTMzYzAtNS4xMiwzLjQxMy04LjUzMyw4LjUzMy04LjUzMwoJCVM0MDguNiwyNDEuMzQ3LDQwOC42LDI0Ni40NjciLz4KCTxwYXRoIGQ9Ik0xMTguNDY3LDI0Ni40NjdjMCw1LjEyLTMuNDEzLDguNTMzLTguNTMzLDguNTMzcy04LjUzMy0zLjQxMy04LjUzMy04LjUzM2MwLTUuMTIsMy40MTMtOC41MzMsOC41MzMtOC41MzMKCQlTMTE4LjQ2NywyNDEuMzQ3LDExOC40NjcsMjQ2LjQ2NyIvPgoJPHBhdGggZD0iTTE2OS42NjcsMjYzLjUzM2MwLDUuMTIsMy40MTMsOC41MzMsOC41MzMsOC41MzNjNS4xMiwwLDguNTMzLTMuNDEzLDguNTMzLTguNTMzYzAtNS4xMi0zLjQxMy04LjUzMy04LjUzMy04LjUzMwoJCUMxNzMuMDgsMjU1LDE2OS42NjcsMjU4LjQxMywxNjkuNjY3LDI2My41MzMiLz4KCTxwYXRoIGQ9Ik0yNTUsMzIzLjI2N2MtMTIzLjczMywwLTI1Ni0yNy4zMDctMjU2LTc2LjhjMC00MS44MTMsODkuNi02MC41ODcsMTI4LTY3LjQxM2wxMS4wOTMtMS43MDdsLTEuNzA3LDExLjA5MwoJCWMwLDIuNTYtMC44NTMsNS45NzMtMC44NTMsOC41MzNsMjUuNiw4LjUzM2M2MC41ODcsMjAuNDgsMTI3LjE0NywyMC40OCwxODcuNzMzLDBsMjUuNi04LjUzM2MwLTMuNDEzLDAtNS45NzMtMC44NTMtOC41MzMKCQlsLTEuNzA3LTExLjA5M0wzODMsMTc5LjA1M2MzOC40LDUuOTczLDEyOCwyNS42LDEyOCw2Ny40MTNDNTExLDI5NS45NiwzNzguNzMzLDMyMy4yNjcsMjU1LDMyMy4yNjd6IE0xMTguNDY3LDE5Ny44MjcKCQljLTY5Ljk3MywxMi44LTEwMi40LDM0LjEzMy0xMDIuNCw0OC42NGMwLDI0Ljc0Nyw5MS4zMDcsNTkuNzMzLDIzOC45MzMsNTkuNzMzczIzOC45MzMtMzQuOTg3LDIzOC45MzMtNTkuNzMzCgkJYzAtMTQuNTA3LTMyLjQyNy0zNC45ODctMTAyLjQtNDguNjRjMCwwLjg1MywwLDMuNDEzLDAsNS45NzN2NS45NzNsLTM3LjU0NywxMi44Yy02NCwyMS4zMzMtMTM0LjgyNywyMS4zMzMtMTk4LjgyNywwCgkJbC0zNi42OTMtMTIuOFYyMDMuOEMxMTguNDY3LDIwMS4yNCwxMTguNDY3LDE5OS41MzMsMTE4LjQ2NywxOTcuODI3eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo='

type OwnProps = {
  canvasContext: CanvasRenderingContext2D
  enemyModel: EnemyModel
  rectSide: number
  shipX: number
  shipY: number
  gameLevel: number
}

type Props = React.FC<OwnProps>

const FPS_60_PER_SEC = 1000 / 60
const LEVEL_0_STEPS = 1000

const Enemy: Props = ({
  canvasContext,
  enemyModel,
  rectSide,
  shipX,
  shipY,
  gameLevel,
}) => {
  const xMax = rectSide
  const yMax = rectSide

  useEffect(() => {
    canvasContext.save()

    canvasContext.clearRect(-xMax, -yMax, rectSide * 2, rectSide * 2)
    flyToShip(
      canvasContext,
      enemyModel,
      rectSide,
      shipX,
      shipY,
      LEVEL_0_STEPS - gameLevel * 3
    )

    canvasContext.restore()
  }, [])

  return <></>
}

export default Enemy

function flyToShip(
  ctx: CanvasRenderingContext2D,
  enemyModel: EnemyModel,
  size: number,
  shipX: number,
  shipY: number,
  stepsCount: number
) {
  const textSize = 20

  const dx = (shipX - enemyModel.point.x) / stepsCount
  const dy = (shipY - enemyModel.point.y) / stepsCount
  let currentStep = 1

  let start = performance.now()

  const redrawImage = () => {
    const x = enemyModel.point.x
    const y = enemyModel.point.y
    ctx.clearRect(x - size * 1.1, y - size * 1.2, size * 2.1, size * 2.1)
    ctx.drawImage(img, x - size, y - size, size * 2, size * 2)
  }

  const redrawText = () => {
    const x = enemyModel.point.x
    const y = enemyModel.point.y

    ctx.save()
    ctx.font = `${textSize}px helvetica`
    ctx.textBaseline = 'top'
    const wordMetrics = ctx.measureText(enemyModel.word)
    const wordWidth = wordMetrics.width

    ctx.clearRect(
      x - wordWidth * 1.1,
      y + size * 0.7,
      wordWidth * 1.1,
      textSize
    )

    ctx.fillStyle = 'black'
    ctx.fillRect(x - wordWidth, y + size, wordWidth, textSize)
    ctx.fillStyle = '#e3d212'
    ctx.fillText(enemyModel.word, x - wordWidth, y + size)
    ctx.restore()
  }

  const step = (timestamp: DOMHighResTimeStamp) => {
    const dt = timestamp - start
    if (dt < FPS_60_PER_SEC) {
      requestAnimationFrame(step)
      return
    }
    start = timestamp

    if (currentStep > stepsCount) {
      EventBus.getInstance().emit(EnemyEvents.EnemyGotShip)
      return
    }

    redrawImage()
    redrawText()

    enemyModel.point.x += dx
    enemyModel.point.y += dy
    currentStep++

    requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}
