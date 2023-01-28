export const getDate = () => {
  const date = new Date()
  const day = date.getDate()
  const mounth = date.getMonth()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${day}.${mounth}.${year}/${hours}:${minutes}`
}
