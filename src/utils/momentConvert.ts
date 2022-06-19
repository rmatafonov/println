import moment from 'moment';

export const momentConvert = (type: string, value: Date): string => {
  if (type === 'message') {
    return moment(value).locale('ru').format('HH:mm:ss, DD MMM YYYY')
  }
  if (type === 'forum') {
    return moment(value).locale('ru').format('DD.MM.YYYY')
  }
  return moment(value).locale('ru').format('DD.MM.YYYY')
}
