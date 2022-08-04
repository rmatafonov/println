import { ModelAttributes } from 'sequelize/types'
import { DataType, Model } from 'sequelize-typescript'

export type ForumModelType = {
  id: number;
  name: string;
  role_id: null | number;
}

export const ForumModel: ModelAttributes<Model, ForumModelType> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataType.INTEGER,
    allowNull: true,
  }
}
