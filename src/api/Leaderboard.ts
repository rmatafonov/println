import Api from './Api'
import { AddToLeaderboardData, GetFromLeaderboardData } from './types'

class Leaderboard {
  async add(data: AddToLeaderboardData) {
    try {
      return await Api.post('leaderboard', data)
    } catch (error: any) {
      return error
    }
  }

  async get(data: GetFromLeaderboardData) {
    try {
      return await Api.post('leaderboard/all', data)
    } catch (error: any) {
      return error
    }
  }
}

export default Leaderboard
