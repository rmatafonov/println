import { ModelAttributes } from 'sequelize/types'
import { DataType, Model } from 'sequelize-typescript'

export type LeaderboardType = {
  id: number
  userId: number
  date: string
  accuracy: number
  destroyed: number
}

export const leaderboardModel: ModelAttributes<Model, LeaderboardType> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  date: {
    type: DataType.STRING,
    allowNull: false
  },
  accuracy: {
    type: DataType.INTEGER,
    allowNull: false
  },
  destroyed: {
    type: DataType.INTEGER,
    allowNull: false
  },
}
