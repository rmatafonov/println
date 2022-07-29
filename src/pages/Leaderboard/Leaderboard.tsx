import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import Loader from 'components/Loader'
import { useAppSelector } from '@/redux/store/hooks'
import { userSelector } from '@/redux/userSlice'
import { LeaderboardType } from './types'
import gameApi from '@/api/gameApi'
import 'styles/widget.css'
import './Leaderboard.css'

const Leaderboard = () => {
  const {
    data: { user },
  } = useAppSelector(userSelector)
  const [leaderboards, setLeaderboards] = useState<LeaderboardType[] | null>(
    null
  )
  useEffect(() => {
    gameApi.getLeaderboards(user.id).then((data) => {
      setLeaderboards(data)
    })
  }, [])
  const navigate = useNavigate()
  const goToMenu = () => {
    navigate('/menu')
  }

  return (
    <div className="leaderboard widget">
      <div className="widget__container container">
        <div className="widget__content text-center">
          <h1>Таблица рекордов</h1>
          {!leaderboards ? (
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
                {leaderboards.length ? (
                  leaderboards.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.accuracy}</td>
                      <td>{item.destroyed}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Нет данных!</td>
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
