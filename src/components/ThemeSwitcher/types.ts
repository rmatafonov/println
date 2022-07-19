import { AppTheme } from '../context/types'

type ThemeSwitcherOwnProps = {
  onThemeChanged: (theme: AppTheme) => void
}

export type ThemeSwitcherProps = React.FC<ThemeSwitcherOwnProps>
