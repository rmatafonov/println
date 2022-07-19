import React, { useContext } from 'react'

import 'styles/widget.css'
import './game.css'
import { GameContainer } from '@/components/GameContainer'
import { ThemeContext } from '@/components/context'

function Game() {
  const themeContext = useContext(ThemeContext)
  return (
    <div className='game'>
      <div className={`game-background game-background__${themeContext.theme}`}></div>
      <GameContainer className='game-container'></GameContainer>
    </div>
  )
}
export default Game;
