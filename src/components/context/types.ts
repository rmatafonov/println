export enum AppTheme {
  dark = 'dark',
  light = 'light'
}

export type ThemeContextModel = {
  theme: AppTheme,
  changeTheme: (newTheme: AppTheme) => void
}
