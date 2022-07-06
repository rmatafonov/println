import Api from './Api'
import { SignInData, AuthResponse, SignUpData, GetUserResponse } from './types'

const authApi = {
  signIn: async (data: SignInData): Promise<AuthResponse> => {
    try {
      await Api.post('auth/signin', data)
      return {
        error: null,
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.reason ?? 'Что-то пошло не так'
      return {
        error: errorMessage,
      }
    }
  },
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    try {
      await Api.post('auth/signUp', data)
      return {
        error: null,
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.reason ?? 'Что-то пошло не так'
      return {
        error: errorMessage,
      }
    }
  },
  getUser: async (): Promise<GetUserResponse> => {
    const response = await Api.get<GetUserResponse>('auth/user')
    if (response.status !== 200) {
      throw Error(JSON.parse(response.statusText).reason)
    }
    return response.data
  },
  isAuthenticated: () =>
    authApi
      .getUser()
      .then((res: GetUserResponse) => Boolean(res))
      .catch(() => false),
  logout: async () => {
    try {
      const response = await Api.post('auth/logout')
      return response
    } catch (error) {
      console.log(error)
    }
  },
}

export default authApi
