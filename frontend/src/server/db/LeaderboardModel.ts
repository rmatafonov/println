import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export interface LeaderboardModel extends Model<InferAttributes<LeaderboardModel>, InferCreationAttributes<LeaderboardModel>> {
  id: CreationOptional<number>
  userId: number
  date: string
  accuracy: number
  destroyed: number
}
