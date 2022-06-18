import moment from 'moment';

export const momentConvert = (type: string, value: Date): string => {
  if (type === 'message') {
    return moment(value).format('HH:mm:ss, DD MMM YYYY')
  }
  if (type === 'forum') {
    return moment(value).format('DD.MM.YYYY')
  }
  return moment(value).format('DD.MM.YYYY')
}
