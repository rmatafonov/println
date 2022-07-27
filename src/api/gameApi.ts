import axios from 'axios'
import { AppTheme } from '@/components/context/types'

export const gameAxios = axios.create({
  withCredentials: true
})

const gameApi = {
  getTheme: async (userId: number): Promise<AppTheme> =>
    gameAxios.get<AppTheme>(`/api/v1/users/${userId}/theme`).then((resp) => resp.data),

  setTheme: async (userId: number, theme: AppTheme): Promise<AppTheme> =>
    gameAxios.post<AppTheme>(`/api/v1/users/${userId}/theme`, { theme }).then((resp) => resp.data)
}

export default gameApi
