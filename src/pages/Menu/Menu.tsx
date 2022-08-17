import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'

import authApi from 'api/AuthApi'
import 'styles/widget.css'
import './menu.css'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { useAppDispatch } from '@/redux/store/hooks'
import { setUser } from '@/redux/userSlice'

function Menu() {
  const dispatch = useAppDispatch()

  const logout = useCallback(async () => {
    await authApi.logout()
    document.cookie = 'user= ; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    dispatch(setUser(null))
  }, [])

  return (
    <div className="menu widget">
      <div className="widget__container container">
        <div className="widget__content">
          <ul className="menu__list">
            <li className="menu__item">
              <ThemeSwitcher></ThemeSwitcher>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/game">
                Играть
              </Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/leaderboard">
                Таблица рекордов
              </Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/profile">
                Профиль
              </Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/forum">
                Форум
              </Link>
            </li>
            <li className="menu__item">
              <div className="menu__link" onClick={logout}>
                Выйти
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Menu
