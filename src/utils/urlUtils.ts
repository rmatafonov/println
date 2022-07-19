import { YandexOAuthSearchParams } from '@/api/types'

export const urlUtils = {
  encodeQueryData: (data: Indexed<string>): string => Object
    .keys(data)
    .map((value) => `${value}=${encodeURIComponent(data[value])}`)
    .join('&'),

  getUrlParams: (): YandexOAuthSearchParams => {
    const search = window.location.search.substring(1)
    return Object.fromEntries(new URLSearchParams(search)) as YandexOAuthSearchParams
  }
}
