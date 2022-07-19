import React, { useContext } from 'react'

import './ThemeSwitcher.css'
import Button from '../Button'
import { ThemeContext } from '../context'
import { AppTheme } from '../context/types'
import { ThemeSwitcherProps } from './types'
// import { useAppSelector } from '@/redux/store/hooks'
// import { userSelector } from '@/redux/userSlice'

const ThemeSwitcher: ThemeSwitcherProps = ({ onThemeChanged }) => {
  // const { data: userData } = useAppSelector(userSelector)
  const themeContext = useContext(ThemeContext)

  const changeTheme = () => {
    const newTheme =
      themeContext.theme === AppTheme.dark ? AppTheme.light : AppTheme.dark

    // if (userData !== null) {
    // }

    onThemeChanged(newTheme)
  }

  return <Button onClick={changeTheme}>Сменить тему</Button>
}

export default ThemeSwitcher
