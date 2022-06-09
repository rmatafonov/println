import Api from './Api'
import { SignInData, AuthResponse, SignUpData } from './types'

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
  getUser: async (): Promise<any> => {
    try {
      const response = await Api.get('auth/user')
      return response
    } catch (error) {
      console.log(error)
    }
  },
  logout: async () => {
    try {
      const response = await Api.post('auth/logout')
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

export default authApi
