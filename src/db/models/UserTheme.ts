import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export type UserThemeType = {
  id: number,
  userId: number,
  theme: string
}

export const userThemeModel: ModelAttributes<Model, UserThemeType> = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  theme: {
    type: DataType.STRING,
    allowNull: false
  }
}
