import { ModelAttributes } from 'sequelize/types'
import { DataType, Model } from 'sequelize-typescript'

export type LeaderboardType = {
  id: string
  date: string
  accuracy: string
  destroyed: string
}

export const leaderboardModel: ModelAttributes<Model, LeaderboardType> = {
  id: {
    type: DataType.STRING,
    primaryKey: true,
  },
  date: DataType.DATE,
  accuracy: DataType.STRING,
  destroyed: DataType.STRING || DataType.NUMBER,
}
