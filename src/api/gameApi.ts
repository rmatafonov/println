import axios from 'axios'
import { AppTheme } from '@/components/context/types'

export const gameAxios = axios.create({
  withCredentials: true
})

const gameApi = {
  getTheme: async (userId: number): Promise<AppTheme> => gameAxios.get<AppTheme>(`/api/v1/users/${userId}/theme`).then((resp) => resp.data)
}

export default gameApi
