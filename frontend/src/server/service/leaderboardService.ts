import { LeaderBoardDao } from '../db'

export const leaderboardService = {
  findAll: (userId: string) => LeaderBoardDao.findAll({ where: { userId } }),

  create: async (userId: number, date: string, accuracy: number, destroyed: number) => {
    await LeaderBoardDao.create({
      userId, date, accuracy, destroyed
    })
    return 'created'
  },
}
