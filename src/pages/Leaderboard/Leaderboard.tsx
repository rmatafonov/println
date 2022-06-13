import React from 'react'
import { useNavigate } from 'react-router-dom'

import Alert from 'components/Alert'
import Button from 'components/Button'
import Loader from 'components/Loader'
import { useGetFromLeaderboard } from '@/services/LeaderboardService'
import { useAppSelector } from '@/redux/store/hooks'
import { appSelector } from '@/redux/appSlice'
import 'styles/widget.css'
import './Leaderboard.css'

const Leaderboard = () => {
  const appStore = useAppSelector(appSelector)
  const leaderboards = useGetFromLeaderboard({
    ratingFieldName: 'ratingFieldName',
    cursor: 0,
    limit: 100,
  })

  const navigate = useNavigate()
  const goToMenu = () => {
    navigate('/menu')
  }

  return (
    <div className="leaderboard widget">
      <div className="widget__container container">
        <div className="widget__content text-center">
          {appStore.alert && <Alert text={appStore.alert} />}
          <h1>Таблица рекордов</h1>
          {appStore.loading ? (
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
                {leaderboards ? leaderboards.map(({ data }) => (
                  <tr key={data.id}>
                    <td>{data.date}</td>
                    <td>{data.accuracy}</td>
                    <td>{data.destroyed}</td>
                  </tr>
                )) : <p>Данных нет</p>}
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
