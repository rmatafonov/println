import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize'

export interface UserThemeModel extends Model<InferAttributes<UserThemeModel>, InferCreationAttributes<UserThemeModel>> {
  id: CreationOptional<number>
  userId: number
  theme: string

  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}
