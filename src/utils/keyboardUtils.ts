export const keyboardUtils = {
  isLetter: (key: string) => /^[A-ZА-Яа-яa-z]$/.test(key),
  isEsc: (key: string) => key === 'Escape'
}
