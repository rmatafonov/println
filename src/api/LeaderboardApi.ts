import Api from './Api'
import { DataToLeaderboard, GetFromLeaderboardData } from './types'

const leaderboardApi = {
  add: async (data: DataToLeaderboard) => {
    try {
      return await Api.post('leaderboard', data)
    } catch (error: any) {
      return error
    }
  },
  get: async (data: GetFromLeaderboardData) => {
    try {
      return await Api.post('leaderboard/all', data)
    } catch (error: any) {
      return error
    }
  }
}

export default leaderboardApi
