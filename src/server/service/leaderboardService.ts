import { LeaderBoardDao } from '../db'

export const leaderboardService = {
  findAll: (userId: string) => LeaderBoardDao.findAll({ where: { userId } }),

  create: async (userId: number, accuracy: number, destroyed: number) => {
    await LeaderBoardDao.create({
      userId, accuracy, destroyed
    })
    return 'created'
  },
}
