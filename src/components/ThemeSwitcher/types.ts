import { AppTheme } from '../App/types'

type ThemeSwitcherOwnProps = {
  currentTheme: AppTheme
  onThemeChange: (newTheme: AppTheme) => void
}

export type ThemeSwitcherProps = React.FC<ThemeSwitcherOwnProps>
