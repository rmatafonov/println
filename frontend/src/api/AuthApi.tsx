import { AppTheme } from '@/components/context/types'
import { praktikumApi } from './Api'
import themeApi from './themeApi'
import {
  SignInData,
  AuthResponse,
  SignUpData,
  GetUserResponse,
  UserEnrichedData,
} from './types'

const authApi = {
  signIn: async (data: SignInData): Promise<AuthResponse> => {
    try {
      await praktikumApi.post('auth/signin', data)
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
      await praktikumApi.post('auth/signUp', data)
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
    const response = await praktikumApi.get<GetUserResponse>('auth/user')
    return response.data
  },
  getEnrichedUser: async (): Promise<UserEnrichedData> =>
    authApi.getUser().then((user) =>
      themeApi
        .getTheme(user.id)
        .then((theme) => ({ user, theme }))
        .catch(() => ({ user, theme: AppTheme.dark }))
    ),
  isAuthenticated: () =>
    authApi
      .getUser()
      .then((res: GetUserResponse) => Boolean(res))
      .catch(() => false),
  logout: async () => {
    try {
      const response = await praktikumApi.post('auth/logout')
      return response
    } catch (error) {
      console.log(error)
    }
  },
}

export default authApi
