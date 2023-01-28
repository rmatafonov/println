import React from 'react'

import 'styles/widget.css'
import './Game.css'
import { GameContainer } from '@/components/GameContainer'

function Game() {
  return (
    <div className="game">
      <div className="game-background"></div>
      <GameContainer></GameContainer>
    </div>
  )
}
export default Game
