import Api from './Api'
import { AddToLeaderboardData, GetFromLeaderboardData } from './types'

const leaderboardApi = {
  add: async (data: AddToLeaderboardData) => {
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
