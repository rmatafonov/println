import React, { useState } from 'react'
import './Leaderboard.css'

const Leaderboard = () => {
  const [state] = useState([
    { date: '2022, 23 мая, 10:00', accuracy: '75.5%', destroyed: 10 },
    { date: '2022, 23 мая, 10:00', accuracy: '75.5%', destroyed: 10 },
    { date: '2022, 23 мая, 10:00', accuracy: '75.5%', destroyed: 10 },
  ])

  return (
    <div className="container mx-auto px-4 leaderboard">
      <h1 className="text-center
                     font-bold
                     mb-8
                     mt-8
                   text-indigo-900">
        Таблица достижений
      </h1>
      <table className="table-auto
                        mx-auto
                        w-full
                        text-center
                        rounded
                      text-indigo-800
                        border
                      border-sky-500">
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
    </div>
  )
}
export default Leaderboard
