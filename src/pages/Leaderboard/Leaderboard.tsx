import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import Loader from 'components/Loader'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { leaderboardSelector, fetchLeaderboard } from '@/redux/leaderboardSlice'
import 'styles/widget.css'
import './Leaderboard.css'

const Leaderboard = () => {
  const dispatcher = useAppDispatch()
  useEffect(() => {
    dispatcher(fetchLeaderboard({
      ratingFieldName: 'ratingFieldName',
      cursor: 0,
      limit: 100,
    }))
  }, [])
  const { items, loading } = useAppSelector(leaderboardSelector)
  const navigate = useNavigate()
  const goToMenu = () => {
    navigate('/menu')
  }

  return (
    <div className="leaderboard widget">
      <div className="widget__container container">
        <div className="widget__content text-center">
          <h1>Таблица рекордов</h1>
          {loading ? (
            <Loader />
          ) : (
            <table className="leaderboard__table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Точность</th>
                  <th>Уничтожено</th>
                </tr>
              </thead>
              <tbody>
                {items ? (
                  items.map((item) => (
                    <tr key={item.data.id}>
                      <td>{item.data.date}</td>
                      <td>{item.data.accuracy}</td>
                      <td>{item.data.destroyed}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Данных нет</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <Button onClick={goToMenu}>Меню</Button>
        </div>
      </div>
    </div>
  )
}
export default Leaderboard
