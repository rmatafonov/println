import { User } from '../init'

class UserController {
  async create(req: any, res: any) {
    const { id, firstName, lastName } = req.body
    const user = await User.create({ id, firstName, lastName })
    return res.json(user)
  }

  async getOne(req: any, res: any) {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    return res.json(user)
  }
}

export default new UserController()
