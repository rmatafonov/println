import React from 'react'
import { GameContainerProps } from './types'

import './GameContainer.css'

const BackgroundBubbles: GameContainerProps = () => (
  <div className="bubbles">
    <span className="bubble"></span>
    <span className="bubble"></span>
    <span className="bubble"></span>
  </div>
)

export default BackgroundBubbles
