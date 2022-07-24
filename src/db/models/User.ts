import { ModelAttributes } from 'sequelize/types'
import { DataType, Model } from 'sequelize-typescript'

export type UserType = {
  id: number
  firstName: string
  lastName: string
}

export const userModel: ModelAttributes<Model, UserType> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataType.STRING,
  }
}
