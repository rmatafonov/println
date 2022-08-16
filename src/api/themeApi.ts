import { AppTheme } from '@/components/context/types'
import { appApi } from './Api'

const themeApi = {
  getTheme: async (userId: number): Promise<AppTheme> =>
    appApi.get<AppTheme>('/api/v1/theme', { params: { userId } }).then((resp) => resp.data),

  setTheme: async (userId: number, theme: AppTheme): Promise<AppTheme> =>
    appApi.post<AppTheme>('/api/v1/theme', { userId, theme }).then((resp) => resp.data)
}

export default themeApi
