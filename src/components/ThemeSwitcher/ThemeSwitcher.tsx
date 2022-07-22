import React from 'react'

import './ThemeSwitcher.css'
import Button from '../Button'
import { ThemeSwitcherProps } from './types'
import { AppTheme } from '../App/types'

const ThemeSwitcher: ThemeSwitcherProps = ({ currentTheme, onThemeChange }) => {
  const changeTheme = () => {
    const newTheme =
      currentTheme === AppTheme.dark ? AppTheme.light : AppTheme.dark

    onThemeChange(newTheme)
  }

  return <Button onClick={changeTheme}>Сменить тему</Button>
}

export default ThemeSwitcher
