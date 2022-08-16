import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import 'styles/widget.css'

export const Page404 = () => {
  const navigate = useNavigate()
  const goToMenu = () => {
    navigate('/menu')
  }

  return (
    <div className="leaderboard widget">
      <div className="widget__container container">
        <div className="widget__content text-center">
          <h1>404 Кажется, вы потерялись...</h1>
          <Button onClick={goToMenu}>Меню</Button>
        </div>
      </div>
    </div>
  )
}
