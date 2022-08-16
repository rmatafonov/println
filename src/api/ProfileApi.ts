import { praktikumApi } from './Api'
import { ChangeUserResponse } from './types'

const profileApi = {
  async changeUserAvatar(req: FormData) {
    const res = await praktikumApi.put('user/profile/avatar', req)
    return res
  },
  async changeUserData(req: ChangeUserResponse) {
    const res = await praktikumApi.put('user/profile', req)
    return res
  }
}

export default profileApi
