import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/widget.css'
import './menu.css'

function Menu() {
  return (
    <div className="menu widget">
      <div className="widget__container container">
        <div className="widget__content">
          <ul className="menu__list">
            <li className="menu__item">
              <Link className="menu__link" to="#">Играть</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="#">Таблица рекордов</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="#">Профиль</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="#">Настройки</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/">Выйти</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Menu;
