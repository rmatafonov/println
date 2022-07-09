import { Api } from '@/api'
import { urlUtils } from './urlUtils'

export const oAuth = {
  yandex: () => {
    Api.get('oauth/yandex/service-id', { params: { redirect_uri: window.location.origin } })
      .then((response) => response.data.service_id as string)
      .then((serviceId) => {
        const params = {
          response_type: 'code',
          client_id: serviceId,
          force_confirm: 'yes',
          redirect_uri: window.location.origin,
          state: JSON.stringify({
            currentPath: window.location.pathname
          })
        }
        const url = `https://oauth.yandex.ru/authorize?${urlUtils.encodeQueryData(params)}`
        window.location.href = url
      })
  },
  authServer: (code: string) =>
    Api.post(
      'oauth/yandex',
      {
        code,
        redirect_uri: window.location.origin
      }
    )
}
