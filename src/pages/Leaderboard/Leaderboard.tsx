import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import 'styles/widget.css'
import './Leaderboard.css'

const Leaderboard = () => {
  const [state] = useState([
    { date: '2022, 23 мая, 10:00', accuracy: '75.5%', destroyed: 10 },
    { date: '2022, 23 мая, 10:00', accuracy: '75.5%', destroyed: 10 },
    { date: '2022, 23 мая, 10:00', accuracy: '75.5%', destroyed: 10 },
  ])
  const navigate = useNavigate()

  const goToMenu = () => {
    navigate('/menu')
  }

  return (
    <div className="leaderboard widget">
      <div className="widget__container container">
        <div className="widget__content text-center">
          <h1>Таблица рекордов</h1>
          <table className="leaderboard__table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Точность</th>
                <th>Уничтожено</th>
              </tr>
            </thead>
            <tbody>
              {state.map((data, index) => (
                <tr key={index}>
                  <td>{data.date}</td>
                  <td>{data.accuracy}</td>
                  <td>{data.destroyed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={goToMenu}>Меню</Button>
        </div>
      </div>
    </div>
  )
}
export default Leaderboard
