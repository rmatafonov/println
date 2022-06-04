import Api from './Api'
import { SignInData, AuthResponse, SignUpData } from './types'

class AuthApi {
  async signIn(data: SignInData): Promise<AuthResponse> {
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
  }

  async signUp(data: SignUpData): Promise<AuthResponse> {
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
  }

  async getUser(): Promise<unknown> {
    try {
      const response = await Api.get('auth/user');
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    try {
      const response = await Api.post('auth/logout')
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

export default AuthApi
