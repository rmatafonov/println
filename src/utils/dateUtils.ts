import moment from 'moment'

export const dateUtils = {
  fullTime: (value: Date): string => moment(value).locale('ru').format('HH:mm:ss, DD MMM YYYY'),
  shortDate: (value: Date): string => moment(value).locale('ru').format('DD.MM.YYYY')
}
