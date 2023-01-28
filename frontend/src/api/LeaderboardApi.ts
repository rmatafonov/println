import { appApi } from './Api'

const leaderboardApi = {
  getLeaderboards: async (userId: number) =>
    appApi
      .get('/api/v1/leaderboard', { params: { userId } })
      .then((resp) => resp.data),

  setLeaderboard: async (
    userId: number,
    date: string,
    accuracy: number,
    destroyed: number
  ) =>
    appApi
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

export default leaderboardApi
