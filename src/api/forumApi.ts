import { ForumTheme } from '@/redux/types/forumTypes'
import { appApi } from './Api'

export const forumApi = {
  getAllThemes: async (): Promise<Array<ForumTheme>> => {
    const response = await appApi.get<Array<ForumTheme>>('/api/v1/forum/themes')
    return response.data
  },

  getById: async (id: number): Promise<ForumTheme> => {
    const response = await appApi.get<ForumTheme>(`/api/v1/forum/themes/${id}`)
    return response.data
  },

  addTheme: async (userId: number, title: string, text: string): Promise<void> => {
    const newTheme = { userId, title, text }
    appApi.post<void>('/api/v1/forum/themes', newTheme).then((resp) => resp.data)
  }
}
