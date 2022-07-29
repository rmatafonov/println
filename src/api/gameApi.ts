import axios from 'axios'
import { AppTheme } from '@/components/context/types'

export const gameAxios = axios.create({
  withCredentials: true,
})

const gameApi = {
  getTheme: async (userId: number): Promise<AppTheme> =>
    gameAxios
      .get<AppTheme>('/api/v1/theme', { params: { userId } })
      .then((resp) => resp.data),

  setTheme: async (userId: number, theme: AppTheme): Promise<AppTheme> =>
    gameAxios
      .post<AppTheme>('/api/v1/theme', { userId, theme })
      .then((resp) => resp.data),

  getLeaderboards: async (userId: number) =>
    gameAxios
      .get('/api/v1/leaderboard', { params: { userId } })
      .then((resp) => resp.data),

  setLeaderboard: async (
    userId: number,
    date: string,
    accuracy: number,
    destroyed: number
  ) =>
    gameAxios
      .post('/api/v1/leaderboard', {
        params: {
          userId,
          date,
          accuracy,
          destroyed,
        },
      })
      .then((resp) => resp.data),
}

export default gameApi
