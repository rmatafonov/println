import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import authApi from 'api/AuthApi'
import 'styles/widget.css'
import './menu.css'

function Menu() {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    const response = await authApi.logout();
    if (response) {
      navigate('/');
    }
  }, [])

  return (
    <div className="menu widget">
      <div className="widget__container container">
        <div className="widget__content">
          <ul className="menu__list">
            <li className="menu__item">
              <Link className="menu__link" to="/game">Играть</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/leaderboard">Таблица рекордов</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/profile">Профиль</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="#">Настройки</Link>
            </li>
            <li className="menu__item">
              <div className="menu__link" onClick={logout}>Выйти</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Menu;
