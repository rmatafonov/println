import React, { useState } from 'react'
import { useEffect } from 'react'

const img = new Image()
img.src =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDUxMi4wMDMgNTEyLjAwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMyA1MTIuMDAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHJlY3QgeD0iMjAwLjE3NyIgeT0iNDU0LjkxNSIgc3R5bGU9ImZpbGw6IzVCQUNGNTsiIHdpZHRoPSIzOC45NDUiIGhlaWdodD0iNTcuMDg5Ii8+Cgk8cmVjdCB4PSIyNzIuODgxIiB5PSI0NTQuOTE1IiBzdHlsZT0iZmlsbDojNUJBQ0Y1OyIgd2lkdGg9IjM4Ljk0NSIgaGVpZ2h0PSI1Ny4wODkiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojRTQyMTA1OyIgZD0iTTQyNC4xNjQsMzcwLjAzNGMtMS4xMjEtOS4yMTUtOC40MjItMjAuOTM4LTE2LjE2Ni0yNi4wNThsLTc4LjAyMS01MS41NzlIMTgyLjAyNmwtNzguMDIxLDUxLjU3OQoJYy03Ljc0NCw1LjEyLTE1LjA0NSwxNi44NDMtMTYuMTY2LDI2LjA1OGMtMi45MjIsMjQuMDI1LTExLjQxOCw5Ni4xMjktMTEuNDE4LDk2LjEyOWgxMDYuMjgxbDcyLjMzNi0yMi41MDZsNzQuMjYzLDIyLjUwNmgxMDYuMjgxCglDNDM1LjU4Miw0NjYuMTY0LDQyNy4wODYsMzk0LjA1OSw0MjQuMTY0LDM3MC4wMzR6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkIzNjc7IiBkPSJNMzI5LjMwMSwxNDQuMjY4YzAtNTkuMjY0LTI4Ljg3My0xMTEuNzY1LTczLjI5OS0xNDQuMjY4CgljLTQ0LjQyNiwzMi41MDQtNzMuMjk4LDg1LjAwNC03My4yOTgsMTQ0LjI2OHYyODguMTM3bDczLjI5OSwyMi41MDVsNzMuMjk5LTIyLjUwNVYxNDQuMjY4SDMyOS4zMDF6Ii8+CjxyZWN0IHg9IjE4Mi43MDEiIHk9IjQzMi40MDkiIHN0eWxlPSJmaWxsOiMzRDUxQ0M7IiB3aWR0aD0iMTQ2LjYwMSIgaGVpZ2h0PSIzMy43NTgiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzAzOTsiIGQ9Ik0yMTYuNDYyLDE0NC4yNjhoNzkuMDgxYzAtMTMuNDQxLTEuOTA1LTI2LjY4Ni01LjUxOC0zOS4zODVoLTY4LjA0NQoJQzIxOC4zNjcsMTE3LjU4MiwyMTYuNDYyLDEzMC44MjcsMjE2LjQ2MiwxNDQuMjY4eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K'

type OwnProps = {
  canvasContext: CanvasRenderingContext2D
  x: number
  y: number
  rectSide: number
}

type Props = React.FC<OwnProps>

const Ship: Props = ({ canvasContext, x, y, rectSide }) => {
  const shipRect = rectSide * 0.90
  const xMax = shipRect * 0.95
  const yMax = shipRect * 0.95
  const [currentAxesAngle, setAngle] = useState(0)

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      console.log(e)
      setAngle(getRandomInt(Math.PI * 2))
    }
  }, [])

  useEffect(() => {
    console.log(
      `drawing ship with angle ${currentAxesAngle}, x ${x}, y ${y}, size: ${rectSide}`
    )

    canvasContext.save()

    canvasContext.beginPath()
    canvasContext.translate(x, y)
    canvasContext.clearRect(-rectSide, -rectSide, rectSide * 2, rectSide * 2)
    canvasContext.rotate(currentAxesAngle)
    canvasContext.drawImage(img, -xMax, -yMax, shipRect * 2, shipRect * 2)

    canvasContext.restore()
  }, [currentAxesAngle])

  return <></>
}

export default Ship

//TODO: remove when bullet class and shoot method is ready
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
