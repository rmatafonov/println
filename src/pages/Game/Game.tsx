import React, { useContext } from 'react'

import 'styles/widget.css'
import './game.css'
import { GameContainer } from '@/components/GameContainer'

function Game() {
  return (
    <div className="game">
      <div className="game-background"></div>
      <GameContainer className="game-container"></GameContainer>
    </div>
  )
}
export default Game
