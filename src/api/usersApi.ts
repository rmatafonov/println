import { praktikumApi } from './Api'

export const usersApi = {
  getUser: async (id: number) => praktikumApi.get(`user/${id}`)
}
