import React from 'react'
import { AppTheme, ThemeContextModel } from './types'

const ThemeContext = React.createContext<ThemeContextModel>(
  {
    theme: AppTheme.dark,
    changeTheme: () => { console.warn('Нет имплементации смены темы') }
  }
)

export default ThemeContext
