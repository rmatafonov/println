import { Leaderboard } from '../db/dao'

export const leaderboardService = {
  findAll: (userId: string) => Leaderboard.findAll({ where: { userId } }),

  create: async (userId: string, date: string, accuracy: number, destroyed: number) => {
    await Leaderboard.create({
      userId, date, accuracy, destroyed
    })
    return 'created'
  },
}
