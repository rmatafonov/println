import { Leaderboard } from '../init'

class LeaderboardController {
  async create(req: any, res: any) {
    const {
      UserId, date, accuracy, destroyed
    } = req.body
    const leaderboard = await Leaderboard.create({
      UserId,
      date,
      accuracy,
      destroyed,
    })
    return res.json(leaderboard)
  }

  async getAll(req: any, res: any) {
    const { UserId } = req.query
    const leaderboards = await Leaderboard.findAll({ where: { UserId } })
    return res.json(leaderboards)
  }
}

export default new LeaderboardController()
