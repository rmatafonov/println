import Api from './Api'
import { ChangeUserResponse } from './types'

const profileApi = {
  async changeUserAvatar(req: FormData) {
    const res = await Api.put('user/profile/avatar', req)
    return res
  },
  async changeUserData(req: ChangeUserResponse) {
    const res = await Api.put('user/profile', req)
    return res
  }
}

export default profileApi
