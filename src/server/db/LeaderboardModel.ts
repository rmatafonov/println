import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export interface LeaderboardModel extends Model<InferAttributes<LeaderboardModel>, InferCreationAttributes<LeaderboardModel>> {
  id: CreationOptional<number>
  userId: number
  accuracy: number
  destroyed: number

  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}
